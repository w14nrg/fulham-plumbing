# Fulham Plumbing

Zero-dependency Node static site for **Fulham Plumbing**, built from `src/config/site.json` and content modules. The review branch is deliberately **noindex**.

## Commands

- `npm run build` — build the site into `dist/`
- `npm run check` — build then run the supplied QA checker
- `npm run preview` — build and serve locally, then open `http://localhost:4173`

Node 20+ is required. There are no npm dependencies.

## Real business facts

All changeable facts live in `src/config/site.json`. Unknown values remain `null`; templates must hide them or show the exact approved `[PLACEHOLDER: …]` text. Do not invent contact details, qualifications, reviews, job history, rates or photos.

## Switch a service on or off

Change the service object's `enabled` value in `src/config/site.json`. The build emits pages, tiles, links and Service schema only for enabled services.

## Add an area note

Find the area in `site.json` and fill its `note` field with a short first-hand plumber observation. Keep the five area landing pages distinct; the checker rejects repeated long sentences.

## Add a recent job

Copy `src/content/jobs/_example.mjs` to a new slug file. Use only a real permissioned job, set `example:false`, use area/road only (never a house number), add real photos with dimensions, and set `permission:true`. The build refuses a real job without permission. Recent Jobs remains noindex and outside the sitemap until at least six real permissioned photographed jobs exist and `recentJobs.indexable` is deliberately changed.

## Indexing

`site.indexable` must stay `false` until every item in `docs/pre-launch.md` is complete. In review, `robots.txt` blocks all crawling and `_headers` sends `X-Robots-Tag: noindex, nofollow`.

See `docs/preview.md` for the preview-deployment instructions. Do not connect the real domain during review.
