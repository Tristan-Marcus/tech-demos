# higgsfield-motion — PLAN

## Goal

A single-user MVP playground that turns a short RetireMe-themed prompt into a motion clip via Higgsfield-style generation, then plays it in-browser.

Source bookmark: [Higgsfield MCP (with Fable 5.1) for motion graphics](https://x.com/adilinthewild/status/2095177775422538130).

## MVP

- One screen: prompt textarea (RetireMe promo / chart-motion presets), length picker, Generate, status line, looping player, download.
- Generation goes through a single adapter contract (`MotionAdapter`), selected in one file: `src/lib/higgsfield/adapter.ts`.
- **Provider used in this build: mock.** No Higgsfield credentials were available in the cloud environment, so the mock adapter renders a deterministic RetireMe chart-motion scene (candles, EMA ribbon, signal marker, headline) to a canvas and encodes it with `MediaRecorder` into a WebM clip. The prompt drives the scene: seed, bullish/bearish bias, quoted headline, ticker.
- Real adapter (`higgsfield-adapter.ts`) is written against the documented API (`POST https://platform.higgsfield.ai/{model}`, `Authorization: Key id:secret`, poll `status_url`) and activates when `VITE_HF_API_KEY_ID` + `VITE_HF_API_KEY_SECRET` are set. Untested end-to-end for lack of keys.

## Outs (explicitly not in MVP)

- Auth, multi-user, billing, persistence/history.
- Cloudflare deploy wiring, RetireMe production integration.
- Server-side proxy for the Higgsfield key (a browser-only playground ships the secret to the client; fine locally, not for deployment).
- Image-to-video, audio, multiple aspect ratios.
- New GitHub repos.

## Tasks

- [x] Scaffold with `bunx create-vite --template react-ts`, `bunfig.toml` with `minimumReleaseAge = 259200` before `bun install`.
- [x] Tailwind v4 + shadcn/ui (`button`, `textarea`, `card`, `badge`), dark, neutral palette.
- [x] `MotionAdapter` contract + selector (`adapter.ts`).
- [x] Mock adapter: prompt → scene spec → canvas frames → `MediaRecorder` → WebM object URL, with live preview and progress.
- [x] Higgsfield API adapter matching the documented async lifecycle.
- [x] UI: presets, prompt, length, generate/reset, status, player with loop + download.
- [x] Typecheck, lint, build clean.
- [x] Run app, capture screenshot + screen recording for the PR.

## Stack rationale

- **Bun** — monorepo convention; `bunfig.toml` release-age gate mitigates fresh-package supply-chain risk.
- **Vite + React + TS** — fast dev loop, no server needed for the mock path.
- **shadcn/ui (minimal set)** — four primitives, no design-system sprawl; matches the "sharp, minimal" brand hint.
- **Canvas + MediaRecorder for the mock** — produces a real playable/downloadable file in-browser with zero dependencies or ffmpeg, so the player path is exercised exactly as it would be with a CDN URL from Higgsfield.

## Deferred

- Verify the real adapter with live keys; handle model-specific body fields (duration presets, `image_url` for DoP).
- Same-origin proxy (`VITE_HF_API_BASE`) so the secret never reaches the browser.
- Higgsfield MCP server (`mcp.higgsfield.ai`) path as an alternative adapter for agent-driven generation.
- Convert WebM → MP4 for broader sharing (ffmpeg.wasm or server-side).
- Prompt history, seed pinning, brand color tokens sourced from retireme.app.
