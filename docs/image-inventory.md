# Image inventory

No real brand or job photography has been supplied. The current build therefore uses honest placeholder boxes and never stock photography.

When real images are supplied, pre-optimise them as WebP, plus AVIF where available, at practical 480 / 960 / 1440 widths. Use `srcset`, `sizes`, explicit `width` and `height`, descriptive alt text, lazy loading below the fold and `fetchpriority="high"` only for the hero photograph.

| Slot | Page(s) | Photograph needed |
|---|---|---|
| Homepage hero | Home | Real plumber at work in a customer's property; clean, natural daylight, no staged stock pose |
| Service hero | Every enabled service page | Real plumber working on that type of fitting or fault |
| About portrait/work image | About | Real plumber at work or clear working portrait |
| Recent job card | Home + Recent Jobs | Real completed job photograph with permission |
| Recent job detail gallery | Future job pages | Before/problem, repair in progress where useful, and finished repair |
| Local proof | Area pages if added later | Real work in that area, not generic street stock |

## Brand graphics

`public/brand/mark.svg` and `public/favicon.svg` are local SVG assets. A real `og-default.png`, `apple-touch-icon.png` and self-hosted Figtree WOFF2 have not been supplied, so the build does not reference nonexistent files. The site uses the documented system font fallback until a genuine font file is added.
