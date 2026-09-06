export type Provider = 'mock' | 'higgsfield'

export interface MotionRequest {
  prompt: string
  /** Clip length in seconds. Mock renders exactly this; Higgsfield rounds to model presets. */
  durationSec: number
  aspectRatio: '16:9'
}

export type GenerationPhase =
  | 'queued'
  | 'rendering'
  | 'encoding'
  | 'completed'
  | 'failed'

export interface GenerationStatus {
  phase: GenerationPhase
  /** 0..1, best-effort. */
  progress: number
  message: string
  /** Optional live preview surface while rendering (mock adapter streams its canvas here). */
  preview?: HTMLCanvasElement
}

export interface MotionResult {
  provider: Provider
  /** Playable URL: an object URL for mock output, a CDN URL for Higgsfield output. */
  url: string
  mimeType: string
  durationSec: number
  byteSize?: number
  requestId: string
  elapsedMs: number
}

export interface MotionAdapter {
  readonly provider: Provider
  readonly label: string
  generate(
    request: MotionRequest,
    onStatus: (status: GenerationStatus) => void,
    signal?: AbortSignal,
  ): Promise<MotionResult>
}
