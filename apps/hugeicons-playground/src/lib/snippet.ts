import type { IconSvgElement } from '@hugeicons/react'

export type IconSettings = {
  size: number
  strokeWidth: number
  color: string
}

export const DEFAULT_SETTINGS: IconSettings = { size: 24, strokeWidth: 1.5, color: 'currentColor' }

export function reactSnippet(name: string, s: IconSettings): string {
  const color = s.color === 'currentColor' ? '"currentColor"' : `"${s.color}"`
  return [
    `import { HugeiconsIcon } from '@hugeicons/react'`,
    `import { ${name} } from '@hugeicons/core-free-icons'`,
    ``,
    `<HugeiconsIcon icon={${name}} size={${s.size}} color=${color} strokeWidth={${s.strokeWidth}} />`,
  ].join('\n')
}

const toKebab = (k: string) => k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

export function svgSnippet(icon: IconSvgElement, s: IconSettings): string {
  const body = icon
    .map(([tag, attrs]) => {
      const attr = Object.entries(attrs)
        .filter(([k]) => k !== 'key')
        .map(([k, v]) => {
          if (k === 'strokeWidth') return `stroke-width="${s.strokeWidth}"`
          if (k === 'stroke' && v === 'currentColor') return `stroke="${s.color}"`
          return `${toKebab(k)}="${v}"`
        })
        .join(' ')
      return `  <${tag} ${attr} />`
    })
    .join('\n')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${s.size}" height="${s.size}" fill="none">\n${body}\n</svg>`
}
