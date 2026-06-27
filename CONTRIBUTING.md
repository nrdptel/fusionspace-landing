# Contributing

Thanks for your interest! This is a personal hobby project — the landing page for
[fusionspace.co](https://fusionspace.co) — but issues and PRs are welcome.

## Project layout

- `app/` — Next.js App Router pages, layout, and components.
- `lib/` — framework-free logic (the project catalog, the live-stats formatter).
- `public/` — static assets (brand SVGs, icons, OG image, Cloudflare `_headers`).
- `e2e/` — Playwright end-to-end smoke tests.

See `DEVELOPMENT.md` for a fuller tour.

## Setup

```bash
npm install
npm run dev   # http://localhost:3000
```

## Checks (run before opening a PR)

These mirror CI (`.github/workflows/test.yml`); all must pass.

```bash
npm run typecheck   # tsc --noEmit
npm test            # vitest unit tests
npm run build       # static export -> out/

# End-to-end (needs a build first; downloads Chromium on first run):
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

## Conventions

- Keep the look and theme consistent with the sub-sites (Geist type, zinc on
  near-black with an indigo accent, dark default). Match the existing patterns
  rather than introducing new colors or components.
- Adding a project is a single entry in `lib/projects.ts` — see `DEVELOPMENT.md`.
- No emoji glyphs in the UI; use the SVG icons in `app/components/icons.tsx`.
