/**
 * Mock adapter — used when no Higgsfield credentials are configured.
 *
 * Produces a real, playable clip entirely in the browser: a deterministic RetireMe
 * chart-motion scene derived from the prompt, painted to a canvas and encoded with
 * MediaRecorder. Same MotionAdapter contract as the real service, so the UI is unaware.
 */
import { drawFrame, generateSeries, parsePrompt } from '@/lib/motion/chart-scene'
import { recordCanvas } from '@/lib/motion/record-canvas'
import type {
  GenerationStatus,
  MotionAdapter,
  MotionRequest,
  MotionResult,
} from './types'

const WIDTH = 1280
const HEIGHT = 720
const FPS = 30
const CANDLES = 48

const wait = (ms: number, signal?: AbortSignal) =>
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

export function createMockAdapter(): MotionAdapter {
  return {
    provider: 'mock',
    label: 'Mock adapter · canvas → MediaRecorder',

    async generate(
      request: MotionRequest,
      onStatus: (s: GenerationStatus) => void,
      signal?: AbortSignal,
    ): Promise<MotionResult> {
      const startedAt = performance.now()
      const requestId = `mock_${startedAt.toString(36).replace('.', '')}`

      onStatus({ phase: 'queued', progress: 0, message: 'Queued on mock adapter' })
      await wait(450, signal)

      const spec = parsePrompt(request.prompt)
      const series = generateSeries(spec, CANDLES)
      const canvas = document.createElement('canvas')
      canvas.width = WIDTH
      canvas.height = HEIGHT
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('2D canvas unavailable')

      onStatus({
        phase: 'rendering',
        progress: 0,
        message: `Rendering ${CANDLES} candles · ${spec.bias === 'up' ? 'bullish' : 'bearish'} bias`,
        preview: canvas,
      })

      const { blob, mimeType } = await recordCanvas({
        canvas,
        durationMs: request.durationSec * 1000,
        fps: FPS,
        signal,
        draw: (t) => drawFrame(ctx, spec, series, t, WIDTH, HEIGHT),
        onProgress: (t) =>
          onStatus({
            phase: 'rendering',
            progress: t,
            message: `Rendering · ${Math.round(t * 100)}%`,
            preview: canvas,
          }),
      })

      onStatus({ phase: 'encoding', progress: 1, message: 'Finalizing container…' })
      await wait(200, signal)

      onStatus({ phase: 'completed', progress: 1, message: 'Completed' })
      return {
        provider: 'mock',
        url: URL.createObjectURL(blob),
        mimeType,
        durationSec: request.durationSec,
        byteSize: blob.size,
        requestId,
        elapsedMs: performance.now() - startedAt,
      }
    },
  }
}
