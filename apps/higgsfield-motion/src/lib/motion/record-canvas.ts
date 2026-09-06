/**
 * Records a canvas animation to a video Blob using captureStream + MediaRecorder.
 * Output is WebM (VP9/VP8) in Chromium/Firefox and MP4 where the browser prefers it (Safari).
 */

const MIME_CANDIDATES = [
  'video/webm;codecs=vp9',
  'video/webm;codecs=vp8',
  'video/webm',
  'video/mp4',
]

export function pickMimeType(): string | null {
  if (typeof MediaRecorder === 'undefined') return null
  return MIME_CANDIDATES.find((m) => MediaRecorder.isTypeSupported(m)) ?? null
}

export interface RecordOptions {
  canvas: HTMLCanvasElement
  durationMs: number
  fps: number
  /** Called every frame with normalized time t in [0, 1]; paint the frame here. */
  draw: (t: number) => void
  onProgress?: (t: number) => void
  signal?: AbortSignal
}

export function recordCanvas({
  canvas,
  durationMs,
  fps,
  draw,
  onProgress,
  signal,
}: RecordOptions): Promise<{ blob: Blob; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const mimeType = pickMimeType()
    if (!mimeType) {
      reject(new Error('MediaRecorder is not supported in this browser'))
      return
    }

    // Paint the first frame before capturing so the track has content immediately.
    draw(0)
    const stream = canvas.captureStream(fps)
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 6_000_000,
    })
    const chunks: BlobPart[] = []
    let raf = 0
    let stopped = false

    const cleanup = () => {
      cancelAnimationFrame(raf)
      stream.getTracks().forEach((track) => track.stop())
    }

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data)
    }
    recorder.onerror = () => {
      cleanup()
      reject(new Error('MediaRecorder failed'))
    }
    recorder.onstop = () => {
      cleanup()
      if (signal?.aborted) {
        reject(new DOMException('Aborted', 'AbortError'))
        return
      }
      resolve({ blob: new Blob(chunks, { type: mimeType }), mimeType })
    }

    signal?.addEventListener(
      'abort',
      () => {
        if (!stopped) {
          stopped = true
          recorder.stop()
        }
      },
      { once: true },
    )

    const start = performance.now()
    const tick = (now: number) => {
      if (stopped) return
      const t = Math.min(1, (now - start) / durationMs)
      draw(t)
      onProgress?.(t)
      if (t >= 1) {
        stopped = true
        // Give the capture track one more frame to flush the final paint.
        setTimeout(() => recorder.stop(), 1000 / fps)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    recorder.start(250)
    raf = requestAnimationFrame(tick)
  })
}
