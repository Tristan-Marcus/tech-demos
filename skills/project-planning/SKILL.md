---
name: project-planning
description: Plan and scaffold a small Bun + shadcn/ui demo app as an MVP. Use before starting any new app under apps/<slug>/.
---

# Project planning (Bun + shadcn MVP)

## 1. Write PLAN.md first

Before any code, create `apps/<slug>/PLAN.md` with four sections:

- **Goal** — one sentence, states who it is for and what "feels good" means.
- **MVP in** — the 4 to 6 things that must work in a single screen.
- **MVP out** — everything explicitly deferred (auth, i18n, deploy, pro tiers, extra pages).
- **Stack** — exact packages, official names only. Check for deprecated packages before adding.

If a feature is not in "MVP in", do not build it.

## 2. Scaffold with the official generators

```bash
cd apps
bunx create-vite <slug> --template react-ts     # or another bunx create-* for the framework
cd <slug>
```

Prefer a Vite single-page app unless the demo needs server rendering. Do not reach for Next.js by default.

## 3. Lock supply-chain age BEFORE installing

Create `bunfig.toml` in the app root before the first `bun install`:

```toml
[install]
minimumReleaseAge = 259200
```

Three days of release age filters out freshly-published malicious versions.

## 4. Tailwind + shadcn, minimalist

```bash
bun add tailwindcss @tailwindcss/vite
bunx --bun shadcn@latest init
bunx --bun shadcn@latest add button   # add only what you will render
```

Rules:

- Add only the shadcn components you actually render. Two or three is normal.
- One neutral palette, one accent. Set it once in CSS variables.
- Use `cn()` and Tailwind utilities; avoid new abstraction layers for a demo.

## 5. Ship criteria

- `bun run build` passes with no type errors.
- `bun run dev` works from a clean clone with only `bun install`.
- README documents any curated data and how it was chosen.
- Screenshot and video captured from the running app for the PR.
