---
name: project-planning
description: Plan and scaffold a Bun + shadcn/ui MVP demo app in this monorepo. Use before building any apps/<slug>/ demo.
---

# Project planning (Bun / shadcn MVP)

## 1. Write `PLAN.md` first

Sections, in order: **Goal** (one sentence), **MVP** (the smallest thing that demonstrates the tech), **Outs** (what is explicitly not built), **Tasks** (checkbox list), **Stack rationale**, **Deferred**.

MVP-first means: one screen, one happy path, real output visible in the UI. If an external service has no credentials, build a clean mock behind an adapter interface and say so in `PLAN.md` and `README.md`.

## 2. Scaffold with `bunx create-*`

```bash
cd apps
bunx create-vite@latest <slug> --template react-ts   # or the framework's create-* CLI
cd <slug>
```

Before the first install, add `bunfig.toml`:

```toml
[install]
minimumReleaseAge = 259200   # 3 days; skip freshly published package versions
```

Then `bun install`.

## 3. shadcn/ui, minimalist

```bash
bunx shadcn@latest init -y -b radix --no-monorepo <components...>
```

- Add only the primitives the screen needs (typically `button`, `card`, `textarea`, `badge`). No sidebar/nav shells for a single-screen demo.
- Neutral palette, dark by default, no gradients or decorative chrome. Sharp and minimal.
- Keep integration logic out of components: one `src/lib/<service>/adapter.ts` that selects the real client or a mock from env.

## 4. Finish

- `bun run build` and `bun run lint` clean.
- `README.md` opens with `bun install && bun run dev`.
- Run it, capture a screenshot and a short screen recording, attach both to the PR.
