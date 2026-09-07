import { forwardRef } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

type Props = {
  value: string
  onChange: (v: string) => void
  onClear: () => void
  disabled?: boolean
}

export const SearchBar = forwardRef<HTMLInputElement, Props>(function SearchBar(
  { value, onChange, onClear, disabled },
  ref,
) {
  return (
    <div
      className={cn(
        'group relative flex h-10 items-center rounded-lg border bg-card/60 transition-colors',
        'focus-within:border-ring/60 focus-within:bg-card focus-within:ring-3 focus-within:ring-ring/15',
        disabled && 'opacity-60',
      )}
    >
      <HugeiconsIcon
        icon={Search01Icon}
        size={16}
        strokeWidth={1.75}
        className="pointer-events-none absolute left-3 text-muted-foreground transition-colors group-focus-within:text-foreground"
      />
      <input
        ref={ref}
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search icons — try “arrow”, “wallet”, “git”"
        spellCheck={false}
        autoComplete="off"
        className="h-full w-full bg-transparent pr-16 pl-9.5 text-sm outline-none placeholder:text-muted-foreground/70"
      />
      <div className="absolute right-2 flex items-center gap-1">
        {value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={13} strokeWidth={2} />
          </button>
        ) : (
          <kbd className="pointer-events-none grid h-5 min-w-5 place-items-center rounded-[5px] border bg-background px-1.5 font-mono text-[11px] text-muted-foreground">
            /
          </kbd>
        )}
      </div>
    </div>
  )
})
