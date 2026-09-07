# PLAN — Hugeicons Playground

## Goal

A single-user MVP icon browser that makes Hugeicons feel premium: search and filter the free Stroke Rounded set, tweak size / stroke / color live, and copy a React snippet that uses the exact icon name and props on screen.

The bar is "would this be embarrassing next to hugeicons.com or linear.app?" If yes, it is not done.

## MVP in

- **Instant search** over a curated set of free icons (name + keyword tokens), no debounce theatre.
- **Curated collection chips** — Interface, Arrows, Charts, Media, Finance, Files, Devices, Development, Editor, Security, AI, Brands. Lists are hand-picked from `@hugeicons/core-free-icons`, not scraped from a taxonomy.
- **Dense, breathable icon grid** with an intentional hover (lift + label reveal) and a clear selected state.
- **Detail panel** — large preview on a dot canvas, size / strokeWidth / color controls, live snippet with one-click copy.
- **Keyboard** — `/` focuses search, `Esc` clears search (then closes the panel).
- **One theme toggle** (dark default, light available). Nothing beyond that.

## MVP out

- Pro icon styles (Solid, Duotone, Bulk, Twotone) and Pro packs.
- Auth, accounts, favourites persistence, i18n.
- Cloudflare / deploy config.
- Virtualization — only if the curated set makes the grid janky. It should not at ~600 icons.
- Any new GitHub repository. This lives in `apps/hugeicons-playground/` only.

## Stack

- `bunx create-vite` — React 19 + TypeScript, Vite-only single screen. No Next.js.
- `bunfig.toml` with `[install] minimumReleaseAge = 259200` written **before** `bun install`.
- `@hugeicons/react` + `@hugeicons/core-free-icons` (official). Never the deprecated `hugeicons-react` package.
- Tailwind v4 + a minimal shadcn/ui surface (button, slider, tooltip). Everything else is plain markup.
- Geist / Geist Mono via fontsource (self-hosted, no runtime font fetch).

## Usage pattern the snippet mirrors

```tsx
import { HugeiconsIcon } from '@hugeicons/react'
import { SearchIcon } from '@hugeicons/core-free-icons'

<HugeiconsIcon icon={SearchIcon} size={24} color="currentColor" strokeWidth={1.5} />
```

## Curation approach

`@hugeicons/core-free-icons` 4.x exports ~6.7k canonical `*Icon` names (plus aliases). Rendering all of them wrecks the grid and the bundle. `scripts/curate.ts` holds explicit per-collection name lists, validates every name against the package at generation time, and writes `src/data/icons.generated.ts` with named imports so Vite tree-shakes to just what is used. Numbered variants (`Home01Icon`, `Home02Icon`, …) are dropped in favour of the base name unless a specific variant is clearly the canonical one.

## Craft rules

- Dark neutral palette (warm zinc), one accent: **amber**. No gradients.
- Typography: Geist. Product title with weight, subtitle quiet, mono for names and code.
- Custom empty / loading / no-results states — composed from icons in the set, not a spinner and a sad face.
- The snippet must always reflect the selected icon name, size, strokeWidth and color.
