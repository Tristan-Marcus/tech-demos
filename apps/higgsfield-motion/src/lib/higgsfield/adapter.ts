/**
 * Higgsfield adapter — the single swap point between mock and real generation.
 *
 * The UI only imports `adapter` from this file. To move to the real service:
 *   1. Set VITE_HF_API_KEY_ID and VITE_HF_API_KEY_SECRET (see .env.example).
 *   2. Point VITE_HF_API_BASE at a same-origin proxy if the browser is blocked by CORS.
 * Nothing in the UI changes.
 */
import { createHiggsfieldAdapter } from './higgsfield-adapter'
import { createMockAdapter } from './mock-adapter'
import type { MotionAdapter } from './types'

const keyId = import.meta.env.VITE_HF_API_KEY_ID as string | undefined
const keySecret = import.meta.env.VITE_HF_API_KEY_SECRET as string | undefined
const apiBase =
  (import.meta.env.VITE_HF_API_BASE as string | undefined) ??
  'https://platform.higgsfield.ai'
const model =
  (import.meta.env.VITE_HF_MODEL as string | undefined) ??
  'higgsfield-ai/dop/standard'

export const adapter: MotionAdapter =
  keyId && keySecret
    ? createHiggsfieldAdapter({ keyId, keySecret, apiBase, model })
    : createMockAdapter()

export type { GenerationStatus, MotionRequest, MotionResult, Provider } from './types'
