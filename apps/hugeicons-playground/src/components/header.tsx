import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon, Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type Props = {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  curatedCount: number | null
  totalCount: number | null
}

const fmt = (n: number) => n.toLocaleString('en-US')

export function Header({ theme, onToggleTheme, curatedCount, totalCount }: Props) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-5">
      <div className="flex items-center gap-3">
        <div className="grid size-7 place-items-center rounded-md bg-amber text-amber-foreground shadow-[inset_0_1px_0_0_rgb(255_255_255/0.35)]">
          <span className="font-mono text-[13px] leading-none font-semibold tracking-tight">H</span>
        </div>
        <div className="flex items-baseline gap-2.5">
          <h1 className="text-[15px] font-medium tracking-[-0.01em]">Hugeicons Playground</h1>
          <p className="text-[13px] text-muted-foreground">
            Free Stroke Rounded
            <span className="mx-1.5 text-muted-foreground/40">·</span>
            <span className="font-mono text-xs tabular-nums">
              {curatedCount === null ? '—' : fmt(curatedCount)} curated
              {totalCount ? ` of ${fmt(totalCount)}` : ''}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onToggleTheme} aria-label="Toggle theme">
              <HugeiconsIcon icon={theme === 'dark' ? Sun01Icon : Moon02Icon} size={16} strokeWidth={1.5} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Switch to {theme === 'dark' ? 'light' : 'dark'}</TooltipContent>
        </Tooltip>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <a href="https://hugeicons.com" target="_blank" rel="noreferrer">
            hugeicons.com
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={1.75} data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </header>
  )
}
