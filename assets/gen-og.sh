#!/usr/bin/env bash
# Regenerates public/og.png (1200x630 social share card) from the brand lockup.
# Requires: librsvg2-bin (rsvg-convert). Run from the repo root: bash assets/gen-og.sh
set -euo pipefail
cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
# 1. Render the vertical lockup to a transparent PNG (librsvg blocks external
#    SVG <image> refs, so we rasterize then embed as a data URI).
rsvg-convert public/brand/fusion-space-vertical.svg -w 1000 -o "$tmp/vert.png"
b64="$(base64 -w0 "$tmp/vert.png")"
# 2. Compose: dark bg + indigo glow + lockup + tagline + domain.
cat > "$tmp/og.svg" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="32%" r="58%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#09090b"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <image xlink:href="data:image/png;base64,$b64" x="370" y="84" width="460" height="253"/>
  <text x="600" y="452" text-anchor="middle" font-family="Liberation Sans, DejaVu Sans, sans-serif" font-size="40" font-weight="600" fill="#e4e4e7">Free, polished tools for high-power rocketry</text>
  <text x="600" y="522" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-size="26" fill="#818cf8">fusionspace.co</text>
</svg>
SVG
rsvg-convert "$tmp/og.svg" -w 1200 -h 630 -o public/og.png
rm -rf "$tmp"
echo "Wrote public/og.png"
