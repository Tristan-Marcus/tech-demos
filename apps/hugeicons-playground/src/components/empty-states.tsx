import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowRight01Icon,
  ChartLineIcon,
  CursorPointer01Icon,
  GitBranchIcon,
  Search01Icon,
  SparklesIcon,
  WalletIcon,
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'

const SUGGESTIONS = ['arrow', 'chart', 'wallet', 'git', 'lock', 'sparkles']

export function NoResults({
  query,
  collectionLabel,
  onTry,
  onClear,
  onClearCollection,
}: {
  query: string
  collectionLabel: string | null
  onTry: (q: string) => void
  onClear: () => void
  onClearCollection: () => void
}) {
  return (
    <div className="flex flex-col items-center px-6 pt-24 pb-16 text-center">
      <div className="relative mb-6 grid size-16 place-items-center rounded-2xl border bg-card">
        <HugeiconsIcon icon={Search01Icon} size={26} strokeWidth={1.5} className="text-muted-foreground" />
        <span className="absolute -right-1.5 -bottom-1.5 grid size-6 place-items-center rounded-full border bg-background font-mono text-[11px] text-muted-foreground">
          0
        </span>
      </div>
      <h2 className="text-[15px] font-medium tracking-[-0.01em]">
        Nothing matches <span className="font-mono text-amber">“{query}”</span>
        {collectionLabel ? (
          <>
            {' '}
            in <span className="text-foreground">{collectionLabel}</span>
          </>
        ) : null}
      </h2>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
        The curated set is picked for product UI. Try a shorter word, a synonym, or widen the collection.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
        {SUGGESTIONS.filter((s) => s !== query.toLowerCase()).slice(0, 5).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onTry(s)}
            className="h-7 rounded-full border bg-card/60 px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2">
        {collectionLabel ? (
          <Button variant="outline" size="sm" onClick={onClearCollection}>
            Search all collections
          </Button>
        ) : null}
        <Button variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground">
          Clear search
          <kbd className="ml-1 rounded-[4px] border bg-background px-1 font-mono text-[10px]">esc</kbd>
        </Button>
      </div>
    </div>
  )
}

const LINEUP = [WalletIcon, GitBranchIcon, SparklesIcon, ChartLineIcon]

export function NothingSelected({ loading }: { loading: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <div className="mb-7 flex items-end gap-2.5">
        {LINEUP.map((icon, i) => (
          <div
            key={i}
            className="grid place-items-center rounded-xl border bg-card text-muted-foreground"
            style={{
              width: i === 1 ? 56 : 44,
              height: i === 1 ? 56 : 44,
              opacity: loading ? 0.45 : 1,
              transition: 'opacity 300ms',
            }}
          >
            <HugeiconsIcon icon={icon} size={i === 1 ? 26 : 20} strokeWidth={1.5} className={i === 1 ? 'text-amber' : ''} />
          </div>
        ))}
      </div>
      <h2 className="text-[15px] font-medium tracking-[-0.01em]">{loading ? 'Loading the set' : 'Pick an icon'}</h2>
      <p className="mt-1.5 max-w-[26ch] text-[13px] leading-relaxed text-muted-foreground">
        {loading
          ? 'Pulling in the curated Stroke Rounded icons.'
          : 'Preview it large, tune size, stroke and color, then copy the exact snippet.'}
      </p>
      {!loading ? (
        <ul className="mt-7 w-full max-w-[240px] space-y-2 text-left text-[12.5px] text-muted-foreground">
          <Hint icon={CursorPointer01Icon} text="Click any tile to inspect it" />
          <Hint icon={Search01Icon} text="Press" kbd="/" tail="to jump to search" />
          <Hint icon={ArrowRight01Icon} text="Press" kbd="esc" tail="to clear and close" />
        </ul>
      ) : null}
    </div>
  )
}

function Hint({
  icon,
  text,
  kbd,
  tail,
}: {
  icon: typeof Search01Icon
  text: string
  kbd?: string
  tail?: string
}) {
  return (
    <li className="flex items-center gap-2.5">
      <HugeiconsIcon icon={icon} size={14} strokeWidth={1.75} className="shrink-0 text-muted-foreground/70" />
      <span>
        {text}
        {kbd ? (
          <kbd className="mx-1.5 inline-grid h-5 min-w-5 place-items-center rounded-[5px] border bg-card px-1.5 font-mono text-[11px] text-foreground/80">
            {kbd}
          </kbd>
        ) : null}
        {tail}
      </span>
    </li>
  )
}
