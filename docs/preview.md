# Preview — no real domain

The review build works at the root of any host. Links are root-relative. Canonicals and schema deliberately continue to use `https://fulhamplumbing.co.uk` from `site.json`.

The review build is protected from indexing in three places: `site.indexable:false`, `robots.txt` with `Disallow: /`, and `dist/_headers` with `X-Robots-Tag: noindex, nofollow`.

## Cloudflare Pages preview

The owner performs these clicks once:

1. Log in to Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorise GitHub for **only** `w14nrg/fulham-plumbing`.
3. Project name: `fulham-plumbing`. **Production branch: `main`.**
4. Build command: `npm run build`. Build output directory: `dist`. Environment variable: `NODE_VERSION` = `20`.
5. Under **Preview deployments**, choose **All non-production branches**.
6. Save and deploy. **Do not add a custom domain.**
7. The branch preview will be at a `pages.dev` address similar to `https://feature-chatgpt-build.fulham-plumbing.pages.dev`; Cloudflare shows the exact address under Deployments. Every push to `feature/chatgpt-build` updates it.
8. The production deployment from `main` may be empty because `main` is intentionally not the review branch. That is harmless.

## GitHub Actions artifact

Every push runs `npm run check` and, when it passes, uploads the built `dist/` folder as the **fulham-plumbing-dist** artifact for 14 days.

## Local preview

Run:

```bash
npm run preview
```

Then open `http://localhost:4173` or the port printed by `serve.mjs`.

## Launch is separate

Do not connect `fulhamplumbing.co.uk` during review. Launch steps are recorded in `docs/pre-launch.md`.
