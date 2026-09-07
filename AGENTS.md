# AGENTS.md

Operating rules for cloud agents working in this monorepo.

## Scope

- Cloud agents ONLY add or update files under `apps/<slug>/`. Do not modify other apps, root files, or shared tooling unless the task explicitly asks for a bootstrap file that is missing.
- One demo = one folder = one PR. Never create a new GitHub repository per demo.
- Never merge to `main`. Open a PR and stop.

## Runtime

- Bun is the package manager and script runner everywhere. No npm, yarn, or pnpm lockfiles.
- Every app is self-contained: `cd apps/<slug> && bun install && bun run dev` must be enough to run it. No shared root `package.json`, no workspace hoisting.
- Add a `bunfig.toml` with `[install] minimumReleaseAge = 259200` (3 days) to each app before the first `bun install`.

## Each app must ship

- `PLAN.md` written before code: goal, MVP in / out, stack, open questions.
- `README.md`: what it is, how to run, notable decisions (e.g. curated data subsets and how they were chosen).
- A working `bun run build`.

## Every PR must attach

- At least one screenshot of the running app.
- At least one screen recording of the running app being used end-to-end.

Both belong in the PR body, not just in a comment.

## Taste

Demos are meant to be shown, not just to compile. Tight spacing, intentional typography, one accent color, no placeholder copy, no lorem, no gradient soup. If it looks like an unstyled starter template, it is not done.
