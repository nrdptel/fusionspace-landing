# FusionSpace — landing page

The landing page for [**fusionspace.co**](https://fusionspace.co): a hub for the free,
open hobby-rocketry tools built under the FusionSpace name, starting with the
[HPR Motor Finder](https://motor.fusionspace.co).

It shares the look and theme system of the sub-sites (Geist type, zinc-on-near-black with an
indigo accent, dark default + System/Light/Dark toggle) so the whole family feels like one
product.

## Tech stack

- **Next.js 16** (App Router) + **React 19**, static-exported (`output: "export"`)
- **Tailwind CSS v4**
- **TypeScript**
- Hosted on **Cloudflare Pages**

Same stack as `motor.fusionspace.co`, so patterns carry over between the two repos.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> out/
```

`npm run build` writes the deployable static site to `out/`.

## Testing

```bash
npm run typecheck   # tsc --noEmit
npm test            # vitest unit tests (lib/)
npm run test:e2e    # Playwright smoke tests (build first)
```

Unit tests cover the framework-free logic (the project catalog and the live-stats
formatter). End-to-end tests in `e2e/` drive the built static export in a headless browser
(hero renders, project navigation, theme toggle). CI (`.github/workflows/test.yml`) runs all of
these on every PR and on pushes to `main`. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Adding a project

The project catalog is driven entirely by **`lib/projects.ts`**. To add a tool, append one entry
to the `projects` array:

```ts
{
  id: "my-tool",                         // slug -> /projects/my-tool
  name: "My Tool",
  description: "One line shown on the home-page card.",
  tagline: "Slightly longer lead for the detail page.",        // optional
  longDescription: ["Paragraph one.", "Paragraph two."],       // optional
  href: "https://my-tool.fusionspace.co",
  domain: "my-tool.fusionspace.co",
  repo: "https://github.com/nrdptel/my-tool",                  // optional
  status: "live",
  tags: ["Tag one", "Tag two"],
  features: [{ title: "Feature", detail: "What it does." }],   // optional
}
```

That single entry renders the home-page card, a statically-generated **`/projects/<id>`** detail
page, and a sitemap entry — no other file changes. The card links to the detail page; the detail
page is where the outbound "visit site" / "source" links live. Use `status: "live"` for a shipped
tool (green "Live" badge) or `status: "in-progress"` for one that's announced but still being built
(amber "In development" badge). The understated
**“More on the way”** card is always shown last and is intentionally vague, so the page never
makes a promise about an unannounced project.

## Deployment — push to `main` goes live

Deploys run through GitHub Actions (`.github/workflows/deploy-cloudflare.yml`): every push to
`main` (and manual runs from the Actions tab) builds the static export and pushes a **production**
deployment to Cloudflare Pages. This mirrors the deploy setup on `motor.fusionspace.co`.

### One-time setup

1. **Cloudflare API token** — create a token with the **Cloudflare Pages: Edit** permission
   (My Profile -> API Tokens, or the "Edit Cloudflare Workers" template scoped to Pages).
2. **GitHub secrets** — in this repo (or org-wide), add:
   - `CLOUDFLARE_API_TOKEN` — the token above
   - `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID (Workers & Pages -> Account ID)
3. **Pages project** — the first deploy creates a project named `fusionspace-landing`
   automatically. (You can also pre-create it in the dashboard as a "Direct Upload" project with
   that exact name.)
4. **Custom domain** — in the Pages project -> **Custom domains**, add `fusionspace.co`
   (and `www` if you want it). Since the domain is already on Cloudflare, DNS is wired up for you.
   Make sure the domain points at the **production** deployment.

After that, `git push` to `main` -> the site is live.

### Alternative: Cloudflare Git integration (no secrets)

If you'd rather not manage GitHub secrets, connect this repo directly in the Cloudflare dashboard
(**Workers & Pages -> Create -> Pages -> Connect to Git**) with:

- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Environment variable:** `NEXT_PUBLIC_SITE_URL = https://fusionspace.co`

Cloudflare then builds and deploys on every push to the production branch on its own. If you take
this route, you can delete `.github/workflows/deploy-cloudflare.yml` to avoid two deploy paths.

## Project layout

```
app/
  layout.tsx            root layout, fonts, theme-init script, metadata, OG/manifest
  page.tsx              home page (header, hero, projects grid, footer)
  globals.css           Tailwind v4 + the shared dark/light theme system
  components/
    ThemeToggle.tsx     System -> Light -> Dark cycle (localStorage)
    ProjectCard.tsx     project tile + "More on the way" teaser
    ServiceWorker.tsx   registers public/sw.js (offline) + a refresh-on-update toast
  icon.svg, apple-icon.png, favicon.ico   favicons (Rev C mark on a Void tile)
  robots.ts, sitemap.ts, not-found.tsx
lib/
  projects.ts           the project catalog — edit this to add a tool
public/
  brand/                     FusionSpace logo variations (see brand/README.md)
    fusion-space-wordmark.svg   Rev C horizontal lockup, mark + wordmark (header + footer)
    logo-on-white@2x.png        email-signature logo (loaded from fusionspace.co)
    fusion-space-mark.svg       sparkle mark (hero)
    fusion-space-stacked.svg    two-line lockup (spare)
    fusion-space-vertical.svg   vertical lockup (spare)
  sw.js                      service worker (offline / PWA)
  manifest.webmanifest       web app manifest (installable / add-to-home-screen)
  og.png                     social share card (1200×630), from the brand kit
  og/<id>.png                per-tool social cards for /projects/<id>
  icon-192.png, icon-512.png  PWA / manifest icons ("any")
  icon-maskable-*.png        PWA / manifest icons ("maskable")
  _headers                   Cloudflare Pages security headers
```

The icons, header lockup and social cards come from the FusionSpace brand kit
(Rev C); replace them with the kit's files rather than editing them here.

## License

Source code is [MIT](./LICENSE). The FusionSpace name and the brand assets in
`public/brand/` are trademarks and are not covered by that license.
