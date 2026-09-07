# Hugeicons Playground

A single-screen icon browser for the free [Hugeicons](https://hugeicons.com) Stroke Rounded set. Search a curated 1,124-icon subset, filter by hand-picked collections, preview any icon at scale, tune size / stroke / color, and copy a React (or raw SVG) snippet that uses the exact icon name and props on screen.

Dark by default, warm neutral palette, one amber accent. Geist for type, Geist Mono for names and code.

## Run

```bash
bun install
bun run dev        # http://localhost:5173
```

```bash
bun run build      # tsc -b && vite build
bun run preview
bun run curate     # regenerate src/data/icons.generated.ts from scripts/curate.ts
```

Bun only. `bunfig.toml` pins `minimumReleaseAge = 259200` (3 days) so freshly published package versions are skipped on install.

## What you can do

- **Search** — instant, over icon-name words, a small synonym list (`trash`, `gear`, `hamburger`, `openai`, ...) and collection names. Multi-word queries must match every word.
- **Collections** — 12 chips: Interface, Arrows, Charts, Media, Finance, Files, Devices, Development, Editor, Security, AI, Brands. Combine a chip with a search.
- **Detail panel** — dot-canvas preview, a 16 / 20 / 24 / 32 / 48 scale row, size (12–96), stroke width (0.5–3), five swatches plus a custom color picker.
- **Snippet** — React tab mirrors the official usage pattern; SVG tab emits inline markup with your stroke and color baked in. One click copies.
- **Keyboard** — `/` focuses search. `Esc` clears the search, then blurs, then closes the panel.
- **Theme** — one toggle, dark ↔ light, remembered in `localStorage`.

## How the icon set was chosen

`@hugeicons/core-free-icons` 4.x ships 6,704 canonical `*Icon` exports (plus aliases). Rendering every one makes the grid a wall and pulls several megabytes into the bundle, so this app ships a curated subset:

- **1,124 icons across 12 collections**, listed explicitly in [`scripts/curate.ts`](scripts/curate.ts). Lists were built by grepping the package's export names by domain (interface, arrows, charts, media, finance, files, devices, development, editor, security, AI, brands) and then hand-pruning to the shapes a product team actually reaches for.
- **Base names over numbered variants.** `WalletIcon` is in, `Wallet01Icon`…`Wallet05Icon` are not, unless a numbered variant is the canonical form (e.g. `Home01Icon`, `Search01Icon`, `Settings01Icon`).
- **Validated at generation time.** The script imports the package and exits non-zero on any unknown name, so a typo or an upstream rename fails in CI rather than as a blank tile.
- **Tree-shaken.** The generated file uses named imports, and Vite emits it as one lazy chunk (~260 KB gzipped) that loads behind a skeleton grid. The rest of the app is ~105 KB gzipped.

An icon can live in more than one collection (e.g. `GithubIcon` is in both Development and Brands); the header count is the unique total.

## Stack

- Vite 8 + React 19 + TypeScript
- `@hugeicons/react` + `@hugeicons/core-free-icons` (official packages — not the deprecated `hugeicons-react`)
- Tailwind CSS v4, shadcn/ui (`button`, `slider`, `tooltip` only)
- `@fontsource-variable/geist`, `@fontsource-variable/geist-mono` (self-hosted)

## Layout

```
scripts/curate.ts            hand-picked collection lists → generator
src/data/icons.generated.ts  generated; do not edit
src/lib/search.ts            name tokenizer + scoring
src/lib/snippet.ts           React / SVG snippet builders
src/components/              header, search-bar, collection-chips, icon-grid, detail-panel, empty-states
src/components/ui/           shadcn primitives
```

See [`PLAN.md`](PLAN.md) for scope decisions.
