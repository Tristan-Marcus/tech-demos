# higgsfield-motion

RetireMe motion playground: type a short prompt, generate a looping motion clip, play it in the browser.

```bash
bun install && bun run dev
```

Open the printed URL (default `http://localhost:5173`).

## Which generation path is active

| Condition | Adapter | Output |
| --- | --- | --- |
| No `VITE_HF_API_KEY_*` set (default, and what this MVP was validated with) | **Mock** — canvas-rendered RetireMe chart motion encoded with `MediaRecorder` | WebM object URL, playable + downloadable |
| `VITE_HF_API_KEY_ID` and `VITE_HF_API_KEY_SECRET` set | **Higgsfield API** — `POST https://platform.higgsfield.ai/{model}`, polls `status_url` | CDN URL from Higgsfield |

The header badge shows which adapter is live. Copy `.env.example` to `.env.local` to configure.

## Swapping in the real service

Everything the UI knows about generation is the `MotionAdapter` interface. The selector lives in one file:

```
src/lib/higgsfield/adapter.ts          # picks mock vs Higgsfield from env
src/lib/higgsfield/higgsfield-adapter.ts   # real API client
src/lib/higgsfield/mock-adapter.ts     # canvas + MediaRecorder renderer
src/lib/motion/chart-scene.ts          # prompt → scene, frame painter
src/lib/motion/record-canvas.ts        # captureStream/MediaRecorder helper
```

Higgsfield keys are server-side credentials; for anything beyond a local playground, point `VITE_HF_API_BASE` at a proxy that injects the `Authorization` header.

## Scripts

- `bun run dev` — Vite dev server
- `bun run build` — typecheck + production build
- `bun run lint` — oxlint

See `PLAN.md` for scope, rationale, and deferred work.
