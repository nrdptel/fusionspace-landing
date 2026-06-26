# Fusion Space — landing page

The landing page for [**fusionspace.co**](https://fusionspace.co): a hub for the free,
open hobby-rocketry tools built under the Fusion Space name, starting with the
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
page is where the outbound "visit site" / "source" links live. The understated
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
  manifest.ts           web app manifest (installable / add-to-home-screen)
  icon.svg, apple-icon.png   favicons (the Fusion Space sparkle mark)
  robots.ts, sitemap.ts, not-found.tsx
lib/
  projects.ts           the project catalog — edit this to add a tool
public/
  brand/                     Fusion Space logo variations (see brand/README.md)
    fusion-space-wordmark.svg   horizontal wordmark (header + footer)
    fusion-space-mark.svg       sparkle mark (hero)
    fusion-space-stacked.svg    two-line lockup (spare)
    fusion-space-vertical.svg   vertical lockup (spare)
  og.png                     social share card (1200×630) — see assets/gen-og.sh
  icon-192.png, icon-512.png  PWA / manifest icons
  _headers                   Cloudflare Pages security headers
assets/
  gen-og.sh                  regenerates public/og.png from the brand lockup
```

The brand SVGs are svgo-optimized (~45% of the raw Illustrator export). To regenerate the
social card after a brand change, run `bash assets/gen-og.sh` (needs `librsvg2-bin`).

## License

Source code is [MIT](./LICENSE). The Fusion Space name and the brand assets in
`public/brand/` are trademarks and are not covered by that license.
