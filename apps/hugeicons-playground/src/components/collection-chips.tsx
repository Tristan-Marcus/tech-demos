import type { Collection } from '@/data/icons.generated'
import { cn } from '@/lib/utils'

type Props = {
  collections: Collection[]
  total: number
  active: string | null
  onChange: (id: string | null) => void
}

export function CollectionChips({ collections, total, active, onChange }: Props) {
  return (
    <div className="no-scrollbar -mx-1 flex items-center gap-1 overflow-x-auto px-1 py-0.5">
      <Chip label="All" count={total} active={active === null} onClick={() => onChange(null)} />
      <span className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden />
      {collections.map((c) => (
        <Chip
          key={c.id}
          label={c.label}
          count={c.count}
          active={active === c.id}
          onClick={() => onChange(active === c.id ? null : c.id)}
        />
      ))}
    </div>
  )
}

function Chip({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'group flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[13px] transition-all outline-none',
        'focus-visible:ring-3 focus-visible:ring-ring/30',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-transparent text-muted-foreground hover:border-border hover:bg-card hover:text-foreground',
      )}
    >
      <span className="font-medium tracking-[-0.005em]">{label}</span>
      <span
        className={cn(
          'font-mono text-[11px] tabular-nums',
          active ? 'text-background/60' : 'text-muted-foreground/60 group-hover:text-muted-foreground',
        )}
      >
        {count}
      </span>
    </button>
  )
}
