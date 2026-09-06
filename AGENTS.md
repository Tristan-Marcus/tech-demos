# AGENTS.md — tech-demos monorepo

Rules for cloud agents working in this repository.

## Scope

- Only add or update files under `apps/<slug>/`. Do not modify other apps or root files unless the task explicitly asks for a root/bootstrap change.
- One demo = one directory under `apps/`. Never create a new GitHub repository per demo.
- Record each demo in `tracking/seen-bookmarks.json` (`proposed` → `built`) when it ships.

## Toolchain

- **Bun** for everything: `bun install`, `bun run dev`, `bunx create-*` for scaffolding.
- Each app is self-contained: `cd apps/<slug> && bun install && bun run dev` must work with no root-level setup.
- Each app ships its own `bunfig.toml` with `[install] minimumReleaseAge = 259200` **before** the first `bun install`.
- Follow `skills/project-planning/SKILL.md`: MVP-first, minimalist shadcn/ui, write `PLAN.md` before building.

## Deliverables per app

- `apps/<slug>/PLAN.md` — goal, MVP + outs, tasks, stack rationale, deferred.
- `apps/<slug>/README.md` — starts with `bun install && bun run dev`.
- Typecheck, lint, and build must pass.

## Pull requests

- Exactly one PR per demo.
- Every PR must attach **at least one screenshot and at least one video** of the running app, embedded in the PR description.
- PR description states which integrations are real vs mocked.
