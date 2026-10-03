# FusionSpace brand assets

Official FusionSpace logo variations, converted from the source Illustrator files to
optimized SVG. Each `viewBox` is cropped tight to the artwork (no surrounding whitespace), so
they scale cleanly with `height` + `width: auto` in CSS. They use the brand's warm-to-cool
gradient and read well on both the dark and light themes.

| File | Variation | Aspect | Where it's used |
| --- | --- | --- | --- |
| `fusion-space-wordmark.svg` | Rev C horizontal lockup: mark, then "FusionSpace" | ~5.9 : 1 | Header + footer |
| `logo-on-white@2x.png` | Rev C lockup on white, PNG | — | Email signature (loads from `https://fusionspace.co/brand/logo-on-white@2x.png`) |
| `fusion-space-mark.svg` | Sparkle cluster only | ~1.08 : 1 | Favicon art; spare for accents |
| `fusion-space-stacked.svg` | Two-line "Fusion / Space" + sparkles | ~2.4 : 1 | Spare — social cards, denser layouts |
| `fusion-space-vertical.svg` | Sparkles stacked over "FusionSpace" | ~1.8 : 1 | Spare — centered / square placements |

To swap which lockup appears in a slot, change the `src` (and matching `width`/`height` for
the intrinsic aspect ratio) on the `<img>` in `app/components/SiteHeader.tsx` / `SiteFooter.tsx`.
