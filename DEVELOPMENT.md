# Development guide

Quick reference for working in this repo.

## What this is

The landing page for **fusionspace.co** — a hub linking to the Fusion Space hobby-rocketry
tools (currently the [HPR Motor Finder](https://motor.fusionspace.co)). It deliberately shares
the look and theme system of the sub-sites so the family reads as one product.

Static **Next.js 16** (App Router) + **React 19** + **Tailwind v4**, exported to static HTML
(`output: "export"`) and served by **Cloudflare Pages**. Same stack as the motor site.

## Commands

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # static export → out/
npm run typecheck   # tsc --noEmit
```

## Deploy

Push to `main` → GitHub Action (`.github/workflows/deploy-cloudflare.yml`) builds and pushes a
production deploy to Cloudflare Pages. Feature branches / PRs run `ci.yml` (typecheck + build).

## Common tasks

- **Add a project to the grid:** append one entry to `lib/projects.ts`. It renders on the home
  page and in the sitemap automatically — no other file changes. Keep unannounced projects out;
  the static "More on the way" card is the only forward-looking copy and stays intentionally
  vague (no names, no dates).
- **Change a logo / lockup:** the four brand variations live in `public/brand/` (see its
  README). Header + footer use the wordmark, the hero uses the sparkle mark. Each SVG's
  `viewBox` is cropped tight to the artwork and svgo-optimized.
- **Regenerate the social card:** `bash assets/gen-og.sh` (needs `librsvg2-bin`) rewrites
  `public/og.png` from the brand lockup.

## Conventions

- Theme: dark default, with a System/Light/Dark toggle persisted to `localStorage`
  (`fusionspace.theme`). The flash-free first paint is driven by CSS + an inline script in
  `app/layout.tsx` — mirror any change to the toggle in both places.
- Palette: zinc on near-black (`#09090b`), indigo-500 (`#6366f1`) accent, Geist Sans/Mono.
  Match this rather than introducing new colors, to stay consistent with the sub-sites.
- Keep the page lean and text-led (the motor site's house style); avoid over-designing.
