# Security Policy

This is a small static marketing site, but security reports are welcome.

## Reporting a vulnerability

Please **report privately** — do not open a public issue for security problems.

Use GitHub's private vulnerability reporting:
[**Report a vulnerability**](https://github.com/nrdptel/fusionspace-landing/security/advisories/new)

Please include steps to reproduce and the impact you observed. I'll acknowledge
as soon as I can and work on a fix; since this is a side project, response times
are best-effort.

## Scope

In scope: this repository and the static site it deploys (fusionspace.co),
including the response headers in `public/_headers` and the client-side
`<LiveStats>` fetch.

Out of scope: third-party services (Cloudflare Pages, the Motor Finder API at
motor.fusionspace.co) — report those to the respective project. There is no
backend, no authentication, and no user data collected by this site.

## Known advisories

`npm audit` reports a **moderate** advisory in `postcss`, pulled in transitively
by Next.js. It concerns PostCSS's CSS *stringify* output and only affects
**build-time** processing of CSS. This project builds only its own first-party
Tailwind CSS (no untrusted CSS is processed), so there is no runtime exposure.
There is no fix in the current Next.js major; it will clear when a Next.js
release bundles a patched PostCSS. Tracked, not a release blocker.
