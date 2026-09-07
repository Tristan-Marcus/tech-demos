import { memo } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IndexedIcon } from '@/lib/search'
import { cn } from '@/lib/utils'

type Props = {
  icons: IndexedIcon[]
  selected: string | null
  onSelect: (name: string) => void
}

export function IconGrid({ icons, selected, onSelect }: Props) {
  return (
    <div
      role="listbox"
      aria-label="Icons"
      className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-1.5"
    >
      {icons.map((icon) => (
        <Tile key={icon.name} icon={icon} selected={icon.name === selected} onSelect={onSelect} />
      ))}
    </div>
  )
}

const Tile = memo(function Tile({
  icon,
  selected,
  onSelect,
}: {
  icon: IndexedIcon
  selected: boolean
  onSelect: (name: string) => void
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      title={icon.name}
      onClick={() => onSelect(icon.name)}
      className={cn(
        'group relative flex aspect-square flex-col items-center justify-center rounded-lg border outline-none transition-[background-color,border-color,color,transform] duration-150',
        'focus-visible:ring-3 focus-visible:ring-ring/40',
        selected
          ? 'border-amber/60 bg-amber/12 text-amber'
          : 'border-transparent text-foreground/80 hover:border-border hover:bg-card hover:text-foreground active:scale-[0.97]',
      )}
    >
      <HugeiconsIcon
        icon={icon.icon}
        size={22}
        strokeWidth={1.5}
        className={cn('transition-transform duration-200 ease-out', !selected && 'group-hover:-translate-y-1.5')}
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-x-1.5 bottom-1.5 truncate text-center font-mono text-[10px] leading-none transition-[opacity,transform] duration-200',
          selected
            ? 'text-amber/80 opacity-100'
            : 'translate-y-1 text-muted-foreground opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
        )}
      >
        {icon.label}
      </span>
    </button>
  )
})

export function GridSkeleton({ count = 96 }: { count?: number }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-1.5" aria-busy>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex aspect-square animate-pulse items-center justify-center rounded-lg bg-card/60"
          style={{ animationDelay: `${(i % 12) * 60}ms` }}
        >
          <div className="size-5 rounded-[5px] border border-dashed border-foreground/15" />
        </div>
      ))}
    </div>
  )
}
