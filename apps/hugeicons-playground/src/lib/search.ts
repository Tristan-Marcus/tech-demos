import type { Collection, IconEntry } from '@/data/icons.generated'

export type IndexedIcon = IconEntry & {
  /** Human label: "Search01Icon" → "Search 01" */
  label: string
  words: string[]
  haystack: string
}

const CAMEL = /([a-z])([A-Z])|([A-Za-z])(\d)|(\d)([A-Za-z])/g

export function splitName(name: string): string[] {
  return name
    .replace(/Icon$/, '')
    .replace(CAMEL, '$1$3$5 $2$4$6')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
}

export function labelFor(name: string): string {
  return splitName(name)
    .map((w) => (/^\d+$/.test(w) ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ')
}

export function buildIndex(icons: IconEntry[], collections: Collection[]): IndexedIcon[] {
  const byId = new Map(collections.map((c) => [c.id, c]))
  return icons.map((entry) => {
    const words = splitName(entry.name)
    const colWords = entry.collections.flatMap((id) => {
      const c = byId.get(id)
      return c ? [c.label.toLowerCase(), ...c.keywords] : []
    })
    return {
      ...entry,
      label: labelFor(entry.name),
      words,
      haystack: [...words, ...entry.synonyms, ...colWords].join(' '),
    }
  })
}

function scoreOne(icon: IndexedIcon, token: string): number {
  if (icon.words[0] === token) return 100
  if (icon.words.includes(token)) return 80
  if (icon.synonyms.includes(token)) return 70
  if (icon.words[0]?.startsWith(token)) return 60
  if (icon.words.some((w) => w.startsWith(token))) return 45
  if (icon.name.toLowerCase().includes(token)) return 30
  if (icon.haystack.includes(token)) return 15
  return 0
}

export function search(index: IndexedIcon[], query: string, collectionId: string | null): IndexedIcon[] {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  const pool = collectionId ? index.filter((i) => i.collections.includes(collectionId)) : index
  if (tokens.length === 0) return pool

  const scored: Array<{ icon: IndexedIcon; score: number }> = []
  for (const icon of pool) {
    let total = 0
    for (const t of tokens) {
      const s = scoreOne(icon, t)
      if (s === 0) {
        total = 0
        break
      }
      total += s
    }
    if (total > 0) {
      // Shorter names win ties: "Search01Icon" over "SearchVisualIcon".
      scored.push({ icon, score: total - icon.words.length * 0.5 })
    }
  }
  scored.sort((a, b) => b.score - a.score || a.icon.name.localeCompare(b.icon.name))
  return scored.map((s) => s.icon)
}
