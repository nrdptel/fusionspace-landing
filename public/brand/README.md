# Fusion Space brand assets

Official Fusion Space logo variations, converted from the source Illustrator files to
optimized SVG. Each `viewBox` is cropped tight to the artwork (no surrounding whitespace), so
they scale cleanly with `height` + `width: auto` in CSS. All four share the same warm-to-cool
gradient (amber -> lavender -> blue) and read well on both the dark and light themes.

| File | Variation | Aspect | Where it's used |
| --- | --- | --- | --- |
| `fusion-space-wordmark.svg` | Horizontal "FusionSpace" + sparkle cluster | ~5.7 : 1 | Header + footer |
| `fusion-space-mark.svg` | Sparkle cluster only | ~1.08 : 1 | Hero accent (also the favicon art) |
| `fusion-space-stacked.svg` | Two-line "Fusion / Space" + sparkles | ~2.4 : 1 | Spare — social cards, denser layouts |
| `fusion-space-vertical.svg` | Sparkles stacked over "FusionSpace" | ~1.8 : 1 | Spare — centered / square placements |

To swap which lockup appears in a slot, change the `src` (and matching `width`/`height` for
the intrinsic aspect ratio) on the `<img>` in `app/page.tsx`.
