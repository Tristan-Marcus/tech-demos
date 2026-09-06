/**
 * Real Higgsfield API adapter (https://docs.higgsfield.ai/docs).
 *
 * Lifecycle: POST {apiBase}/{model} -> { request_id, status_url }
 *            GET  status_url         -> { status: queued|in_progress|completed|failed|nsfw, video?: { url } }
 *
 * This runs in the browser for the MVP. Higgsfield keys are server-side credentials,
 * so in anything beyond a local playground route this through a proxy (VITE_HF_API_BASE)
 * that injects the Authorization header instead of shipping the secret to the client.
 */
import type {
  GenerationStatus,
  MotionAdapter,
  MotionRequest,
  MotionResult,
} from './types'

export interface HiggsfieldConfig {
  keyId: string
  keySecret: string
  apiBase: string
  model: string
  pollIntervalMs?: number
}

interface SubmitResponse {
  request_id: string
  status_url: string
  status: string
}

interface StatusResponse {
  status: 'queued' | 'in_progress' | 'completed' | 'failed' | 'nsfw' | string
  video?: { url: string; content_type?: string; file_size?: number }
  images?: Array<{ url: string }>
  error?: string
}

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms)
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(t)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })

export function createHiggsfieldAdapter(config: HiggsfieldConfig): MotionAdapter {
  const headers = {
    Authorization: `Key ${config.keyId}:${config.keySecret}`,
    'Content-Type': 'application/json',
  }
  const pollIntervalMs = config.pollIntervalMs ?? 2500

  return {
    provider: 'higgsfield',
    label: `Higgsfield API · ${config.model}`,

    async generate(
      request: MotionRequest,
      onStatus: (s: GenerationStatus) => void,
      signal?: AbortSignal,
    ): Promise<MotionResult> {
      const startedAt = performance.now()
      onStatus({ phase: 'queued', progress: 0, message: 'Submitting to Higgsfield…' })

      const submit = await fetch(`${config.apiBase}/${config.model}`, {
        method: 'POST',
        headers,
        signal,
        body: JSON.stringify({
          prompt: request.prompt,
          aspect_ratio: request.aspectRatio,
          duration: request.durationSec,
        }),
      })
      if (!submit.ok) {
        throw new Error(`Higgsfield submit failed: ${submit.status} ${await submit.text()}`)
      }
      const job = (await submit.json()) as SubmitResponse
      onStatus({ phase: 'queued', progress: 0.05, message: `Queued · ${job.request_id}` })

      // No progress percentage from the API; ramp toward 90% while in_progress.
      let ticks = 0
      for (;;) {
        await sleep(pollIntervalMs, signal)
        const res = await fetch(job.status_url, { headers, signal })
        if (!res.ok) throw new Error(`Status check failed: ${res.status}`)
        const status = (await res.json()) as StatusResponse

        if (status.status === 'completed') {
          const url = status.video?.url ?? status.images?.[0]?.url
          if (!url) throw new Error('Completed without an output URL')
          onStatus({ phase: 'completed', progress: 1, message: 'Completed' })
          return {
            provider: 'higgsfield',
            url,
            mimeType: status.video?.content_type ?? 'video/mp4',
            durationSec: request.durationSec,
            byteSize: status.video?.file_size,
            requestId: job.request_id,
            elapsedMs: performance.now() - startedAt,
          }
        }
        if (status.status === 'failed' || status.status === 'nsfw') {
          throw new Error(status.error ?? `Generation ${status.status}`)
        }
        ticks += 1
        onStatus({
          phase: status.status === 'queued' ? 'queued' : 'rendering',
          progress: Math.min(0.9, 0.05 + ticks * 0.05),
          message: status.status === 'queued' ? 'Waiting in queue…' : 'Rendering on Higgsfield…',
        })
      }
    },
  }
}
