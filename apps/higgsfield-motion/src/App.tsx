import { useCallback, useEffect, useRef, useState } from 'react'
import { Download, Loader2, Play, RotateCcw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { adapter, type GenerationStatus, type MotionResult } from '@/lib/higgsfield/adapter'

const PRESETS: Array<{ name: string; prompt: string }> = [
  {
    name: 'Promo',
    prompt:
      'RetireMe promo: dark institutional trading chart, indicator ribbon fading in over price candles, a single long entry signal firing, headline "Retire on your terms". Sharp, minimal, no hype.',
  },
  {
    name: 'Chart motion',
    prompt:
      'Chart-motion loop for RetireMe: SPY daily candles drawing left to right, fast/slow EMA ribbon trailing price, calm bullish drift, subtle grid, wordmark only.',
  },
  {
    name: 'Risk-off',
    prompt:
      'RetireMe risk-off reveal: bearish drawdown on QQQ, ribbon rolls over, exit signal fires, headline "Know when to step aside".',
  },
]

const DURATIONS = [3, 4, 6] as const

type UiState =
  | { kind: 'idle' }
  | { kind: 'generating'; status: GenerationStatus }
  | { kind: 'done'; result: MotionResult }
  | { kind: 'error'; message: string }

const formatBytes = (n?: number) =>
  n === undefined ? '—' : n > 1_000_000 ? `${(n / 1_000_000).toFixed(1)} MB` : `${Math.round(n / 1000)} KB`

export default function App() {
  const [prompt, setPrompt] = useState(PRESETS[0].prompt)
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>(4)
  const [state, setState] = useState<UiState>({ kind: 'idle' })
  const abortRef = useRef<AbortController | null>(null)
  const previewHostRef = useRef<HTMLDivElement>(null)

  const preview = state.kind === 'generating' ? state.status.preview : undefined
  useEffect(() => {
    const host = previewHostRef.current
    if (!host || !preview) return
    if (preview.parentElement !== host) host.replaceChildren(preview)
  }, [preview])

  useEffect(() => {
    return () => {
      if (state.kind === 'done' && state.result.url.startsWith('blob:')) {
        URL.revokeObjectURL(state.result.url)
      }
    }
  }, [state])

  const generate = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setState({ kind: 'generating', status: { phase: 'queued', progress: 0, message: 'Starting…' } })
    try {
      const result = await adapter.generate(
        { prompt: prompt.trim(), durationSec: duration, aspectRatio: '16:9' },
        (status) => {
          if (!controller.signal.aborted) setState({ kind: 'generating', status })
        },
        controller.signal,
      )
      if (!controller.signal.aborted) setState({ kind: 'done', result })
    } catch (err) {
      if (controller.signal.aborted) return
      setState({ kind: 'error', message: err instanceof Error ? err.message : String(err) })
    }
  }, [prompt, duration])

  const reset = () => {
    abortRef.current?.abort()
    setState({ kind: 'idle' })
  }

  const busy = state.kind === 'generating'
  const statusText =
    state.kind === 'generating'
      ? state.status.message
      : state.kind === 'done'
        ? `Completed in ${(state.result.elapsedMs / 1000).toFixed(1)}s`
        : state.kind === 'error'
          ? state.message
          : 'Ready'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-3">
            <span className="text-base font-semibold tracking-tight">RetireMe</span>
            <span className="text-sm text-muted-foreground">Motion playground</span>
          </div>
          <Badge variant={adapter.provider === 'higgsfield' ? 'default' : 'outline'} className="font-mono">
            {adapter.label}
          </Badge>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[minmax(0,26rem)_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Prompt</CardTitle>
            <CardDescription>Describe the clip. Quoted text becomes the headline.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <Button
                  key={p.name}
                  size="xs"
                  variant={prompt === p.prompt ? 'secondary' : 'ghost'}
                  onClick={() => setPrompt(p.prompt)}
                  disabled={busy}
                >
                  {p.name}
                </Button>
              ))}
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={busy}
              rows={7}
              className="resize-none font-mono text-xs leading-relaxed"
              aria-label="Motion prompt"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="mr-1">Length</span>
                {DURATIONS.map((d) => (
                  <Button
                    key={d}
                    size="xs"
                    variant={duration === d ? 'secondary' : 'ghost'}
                    onClick={() => setDuration(d)}
                    disabled={busy}
                  >
                    {d}s
                  </Button>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">16:9 · 1280×720</span>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={generate} disabled={busy || prompt.trim().length === 0} className="flex-1">
                {busy ? <Loader2 className="animate-spin" /> : <Play />}
                {busy ? 'Generating' : 'Generate'}
              </Button>
              {state.kind !== 'idle' && (
                <Button variant="outline" size="icon" onClick={reset} aria-label="Reset">
                  <RotateCcw />
                </Button>
              )}
            </div>
            <p
              className={`text-xs ${state.kind === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}
              role="status"
              aria-live="polite"
            >
              {statusText}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>
              {state.kind === 'done'
                ? `${state.result.mimeType} · ${state.result.durationSec}s · ${formatBytes(state.result.byteSize)}`
                : 'Generated clip plays here and loops.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-neutral-950">
              {state.kind === 'done' && (
                <video
                  key={state.result.url}
                  src={state.result.url}
                  className="h-full w-full"
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                />
              )}
              {state.kind === 'generating' && (
                <>
                  <div ref={previewHostRef} className="h-full w-full [&>canvas]:h-full [&>canvas]:w-full" />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                    <div
                      className="h-full bg-emerald-400 transition-[width] duration-150"
                      style={{ width: `${Math.round(state.status.progress * 100)}%` }}
                    />
                  </div>
                  <div className="absolute right-3 bottom-4">
                    <Badge variant="secondary" className="font-mono uppercase">
                      {state.status.phase}
                    </Badge>
                  </div>
                </>
              )}
              {(state.kind === 'idle' || state.kind === 'error') && (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  {state.kind === 'error' ? 'Generation failed' : 'No clip yet'}
                </div>
              )}
            </div>
            {state.kind === 'done' && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">
                  {state.result.provider} · {state.result.requestId}
                </span>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={state.result.url}
                    download={`retireme-motion.${state.result.mimeType.includes('mp4') ? 'mp4' : 'webm'}`}
                  >
                    <Download />
                    Download
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-8 text-xs text-muted-foreground">
        Generation goes through <code className="font-mono">src/lib/higgsfield/adapter.ts</code>. Set{' '}
        <code className="font-mono">VITE_HF_API_KEY_ID</code> and <code className="font-mono">VITE_HF_API_KEY_SECRET</code> to
        switch from the mock renderer to the Higgsfield API.
      </footer>
    </div>
  )
}
