import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon, Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import type { Collection } from '@/data/icons.generated'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useCopy } from '@/hooks/use-copy'
import type { IndexedIcon } from '@/lib/search'
import { reactSnippet, svgSnippet, type IconSettings } from '@/lib/snippet'
import { cn } from '@/lib/utils'

type Props = {
  icon: IndexedIcon
  collections: Collection[]
  settings: IconSettings
  onSettings: (patch: Partial<IconSettings>) => void
  onClose: () => void
}

const SIZE_PRESETS = [16, 20, 24, 32, 48]
const STROKE_PRESETS = [1, 1.5, 2]
const SWATCHES: Array<{ value: string; label: string }> = [
  { value: 'currentColor', label: 'currentColor' },
  { value: '#F5B942', label: 'Amber' },
  { value: '#F97066', label: 'Coral' },
  { value: '#3ECF8E', label: 'Mint' },
  { value: '#4CB3FF', label: 'Sky' },
]

export function DetailPanel({ icon, collections, settings, onSettings, onClose }: Props) {
  const [tab, setTab] = useState<'react' | 'svg'>('react')
  const { copied, copy } = useCopy()
  const previewColor = settings.color === 'currentColor' ? undefined : settings.color
  const code = tab === 'react' ? reactSnippet(icon.name, settings) : svgSnippet(icon.icon, settings)
  const isCustom = !SWATCHES.some((s) => s.value === settings.color)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
        <div className="min-w-0">
          <h2 className="truncate text-[15px] font-medium tracking-[-0.01em]">{icon.label}</h2>
          <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">{icon.name}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {icon.collections.map((id) => {
              const c = collections.find((x) => x.id === id)
              return c ? (
                <span key={id} className="rounded-full border bg-card px-2 py-0.5 text-[11px] text-muted-foreground">
                  {c.label}
                </span>
              ) : null
            })}
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close panel" className="-mt-1 -mr-1.5 shrink-0">
              <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            Close <kbd className="ml-1 rounded-[4px] bg-background/20 px-1 font-mono text-[10px]">esc</kbd>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="quiet-scroll flex-1 overflow-y-auto px-5 pb-5">
        <div className="dot-canvas relative grid h-40 place-items-center overflow-hidden rounded-xl border">
          <HugeiconsIcon
            key={icon.name}
            icon={icon.icon}
            size={settings.size}
            strokeWidth={settings.strokeWidth}
            color={previewColor}
            className="animate-in fade-in zoom-in-95 duration-200"
          />
          <span className="absolute right-2.5 bottom-2 font-mono text-[10px] text-muted-foreground/70 tabular-nums">
            {settings.size}px · {settings.strokeWidth}
          </span>
        </div>

        <div className="mt-2.5 flex items-end justify-between rounded-xl border bg-card/40 px-4 py-2.5" style={{ color: previewColor }}>
          {SIZE_PRESETS.map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <HugeiconsIcon icon={icon.icon} size={s} strokeWidth={settings.strokeWidth} />
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{s}</span>
            </div>
          ))}
        </div>

        <Field label="Size" value={`${settings.size}px`}>
          <Slider min={12} max={96} step={1} value={[settings.size]} onValueChange={([v]) => onSettings({ size: v })} />
          <Presets values={SIZE_PRESETS} current={settings.size} onPick={(v) => onSettings({ size: v })} />
        </Field>

        <Field label="Stroke" value={String(settings.strokeWidth)}>
          <Slider
            min={0.5}
            max={3}
            step={0.25}
            value={[settings.strokeWidth]}
            onValueChange={([v]) => onSettings({ strokeWidth: v })}
          />
          <Presets values={STROKE_PRESETS} current={settings.strokeWidth} onPick={(v) => onSettings({ strokeWidth: v })} />
        </Field>

        <Field label="Color" value={settings.color}>
          <div className="flex items-center gap-1.5">
            {SWATCHES.map((s) => (
              <Tooltip key={s.value}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={s.label}
                    aria-pressed={settings.color === s.value}
                    onClick={() => onSettings({ color: s.value })}
                    className={cn(
                      'grid size-7 place-items-center rounded-full border transition-[box-shadow,transform] hover:scale-105',
                      settings.color === s.value ? 'ring-2 ring-ring ring-offset-2 ring-offset-background' : '',
                    )}
                    style={s.value === 'currentColor' ? undefined : { background: s.value }}
                  >
                    {s.value === 'currentColor' ? (
                      <span className="size-3 rounded-full bg-foreground" />
                    ) : null}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">{s.label}</TooltipContent>
              </Tooltip>
            ))}
            <label
              className={cn(
                'relative grid size-7 cursor-pointer place-items-center overflow-hidden rounded-full border transition-transform hover:scale-105',
                isCustom ? 'ring-2 ring-ring ring-offset-2 ring-offset-background' : '',
              )}
              style={{
                background: isCustom
                  ? settings.color
                  : 'conic-gradient(from 90deg, #F97066, #F5B942, #3ECF8E, #4CB3FF, #F97066)',
              }}
              title="Custom color"
            >
              <input
                type="color"
                value={isCustom ? settings.color : '#F5B942'}
                onChange={(e) => onSettings({ color: e.target.value.toUpperCase() })}
                className="absolute inset-0 cursor-pointer opacity-0"
                aria-label="Custom color"
              />
            </label>
          </div>
        </Field>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5 rounded-md bg-card p-0.5">
              {(['react', 'svg'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cn(
                    'h-6 rounded-[5px] px-2 text-xs font-medium transition-colors',
                    tab === t ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t === 'react' ? 'React' : 'SVG'}
                </button>
              ))}
            </div>
            <Button
              size="sm"
              variant={copied ? 'default' : 'outline'}
              onClick={() => copy(code)}
              className={cn('min-w-[86px] transition-colors', copied && 'bg-amber text-amber-foreground hover:bg-amber')}
            >
              <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={14} strokeWidth={2} data-icon="inline-start" />
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>

          <pre className="mt-2 rounded-xl border bg-card/60 p-4 font-mono text-[12px] leading-[1.65] whitespace-pre-wrap break-words text-foreground/85">
            {tab === 'react' ? <ReactCode name={icon.name} s={settings} /> : <code>{code}</code>}
          </pre>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div className="mt-3.5">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-[0.08em]">{label}</span>
        <span className="font-mono text-xs text-foreground/80 tabular-nums">{value}</span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Presets({ values, current, onPick }: { values: number[]; current: number; onPick: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {values.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onPick(v)}
          aria-pressed={v === current}
          className={cn(
            'h-6 min-w-8 rounded-md border px-1.5 font-mono text-[11px] tabular-nums transition-colors',
            v === current
              ? 'border-foreground/20 bg-foreground text-background'
              : 'border-transparent bg-card text-muted-foreground hover:border-border hover:text-foreground',
          )}
        >
          {v}
        </button>
      ))}
    </div>
  )
}

/** Same content as reactSnippet(), rendered with the user's values lit up. */
function ReactCode({ name, s }: { name: string; s: IconSettings }) {
  const kw = 'text-muted-foreground'
  const hi = 'text-amber'
  return (
    <code>
      <span className={kw}>import</span> {'{ HugeiconsIcon }'} <span className={kw}>from</span>{' '}
      <span className={kw}>'@hugeicons/react'</span>
      {'\n'}
      <span className={kw}>import</span> {'{ '}
      <span className={hi}>{name}</span>
      {' }'} <span className={kw}>from</span> <span className={kw}>'@hugeicons/core-free-icons'</span>
      {'\n\n'}
      <span className={kw}>{'<'}</span>HugeiconsIcon <span className={kw}>icon=</span>
      {'{'}
      <span className={hi}>{name}</span>
      {'}'} <span className={kw}>size=</span>
      {'{'}
      <span className={hi}>{s.size}</span>
      {'}'} <span className={kw}>color=</span>
      <span className={hi}>"{s.color}"</span> <span className={kw}>strokeWidth=</span>
      {'{'}
      <span className={hi}>{s.strokeWidth}</span>
      {'}'} <span className={kw}>{'/>'}</span>
    </code>
  )
}
