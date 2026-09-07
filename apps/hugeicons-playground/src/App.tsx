import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CollectionChips } from '@/components/collection-chips'
import { DetailPanel } from '@/components/detail-panel'
import { NoResults, NothingSelected } from '@/components/empty-states'
import { Header } from '@/components/header'
import { GridSkeleton, IconGrid } from '@/components/icon-grid'
import { SearchBar } from '@/components/search-bar'
import type { Collection } from '@/data/icons.generated'
import { useTheme } from '@/hooks/use-theme'
import { buildIndex, search, type IndexedIcon } from '@/lib/search'
import { DEFAULT_SETTINGS, type IconSettings } from '@/lib/snippet'

type Pack = { index: IndexedIcon[]; collections: Collection[]; total: number }

export default function App() {
  const { theme, toggle } = useTheme()
  const [pack, setPack] = useState<Pack | null>(null)
  const [query, setQuery] = useState('')
  const [collection, setCollection] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [settings, setSettings] = useState<IconSettings>(DEFAULT_SETTINGS)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let alive = true
    import('@/data/icons.generated').then((m) => {
      if (!alive) return
      setPack({ index: buildIndex(m.icons, m.collections), collections: m.collections, total: m.TOTAL_FREE_ICONS })
    })
    return () => {
      alive = false
    }
  }, [])

  const results = useMemo(() => (pack ? search(pack.index, query, collection) : []), [pack, query, collection])
  const selectedIcon = useMemo(
    () => (pack && selected ? pack.index.find((i) => i.name === selected) ?? null : null),
    [pack, selected],
  )
  const activeCollection = pack?.collections.find((c) => c.id === collection) ?? null

  const clearSearch = useCallback(() => setQuery(''), [])
  const patchSettings = useCallback((patch: Partial<IconSettings>) => setSettings((s) => ({ ...s, ...patch })), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
        return
      }
      if (e.key === 'Escape') {
        if (query) {
          setQuery('')
          return
        }
        if (typing) {
          ;(target as HTMLInputElement).blur()
          return
        }
        if (selected) setSelected(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [query, selected])

  const loading = pack === null

  return (
    <div className="flex h-dvh flex-col">
      <Header theme={theme} onToggleTheme={toggle} curatedCount={pack?.index.length ?? null} totalCount={pack?.total ?? null} />

      <div className="flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="shrink-0 space-y-3 border-b px-5 pt-4 pb-3">
            <SearchBar ref={searchRef} value={query} onChange={setQuery} onClear={clearSearch} disabled={loading} />
            {pack ? (
              <CollectionChips
                collections={pack.collections}
                total={pack.index.length}
                active={collection}
                onChange={setCollection}
              />
            ) : (
              <div className="flex gap-1 py-0.5">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="h-7 animate-pulse rounded-full bg-card" style={{ width: 56 + (i % 3) * 18 }} />
                ))}
              </div>
            )}
          </div>

          <div className="quiet-scroll min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-10">
            {pack ? (
              <>
                <div className="mb-3 flex items-baseline justify-between">
                  <p className="text-[13px] text-muted-foreground">
                    {activeCollection ? (
                      <>
                        <span className="text-foreground">{activeCollection.label}</span>
                        <span className="mx-1.5 text-muted-foreground/40">·</span>
                        {activeCollection.blurb}
                      </>
                    ) : query ? (
                      <>
                        Results for <span className="font-mono text-foreground">“{query}”</span>
                      </>
                    ) : (
                      'Every collection, alphabetical.'
                    )}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground tabular-nums">
                    {results.length.toLocaleString('en-US')} {results.length === 1 ? 'icon' : 'icons'}
                  </p>
                </div>
                {results.length ? (
                  <IconGrid icons={results} selected={selected} onSelect={setSelected} />
                ) : (
                  <NoResults
                    query={query}
                    collectionLabel={activeCollection?.label ?? null}
                    onTry={setQuery}
                    onClear={clearSearch}
                    onClearCollection={() => setCollection(null)}
                  />
                )}
              </>
            ) : (
              <>
                <div className="mb-3 flex items-baseline justify-between">
                  <div className="h-4 w-48 animate-pulse rounded bg-card" />
                  <div className="h-3.5 w-16 animate-pulse rounded bg-card" />
                </div>
                <GridSkeleton />
              </>
            )}
          </div>
        </main>

        <aside className="hidden w-[380px] shrink-0 border-l bg-background lg:block xl:w-[400px]">
          {selectedIcon && pack ? (
            <DetailPanel
              icon={selectedIcon}
              collections={pack.collections}
              settings={settings}
              onSettings={patchSettings}
              onClose={() => setSelected(null)}
            />
          ) : (
            <NothingSelected loading={loading} />
          )}
        </aside>
      </div>
    </div>
  )
}
