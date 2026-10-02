# Fulham Plumbing — V6 front-end rebuild (Claude)

Built from `redesign/v5-badboiler-inspired` @ 56781fd. Commit this folder to a new branch (suggested `redesign/v6-claude`) in `w14nrg/fulham-plumbing`. Do not merge to main; staging stays noindex.

## Result
- `npm run check`: **0 errors**, 42 pages built (1 pre-existing warning: `/recent-jobs/` is short until real jobs exist).
- Titles and descriptions unique on all 42 pages; canonicals on `https://fulhamplumbing.co.uk/…`; every page `noindex,nofollow`; sitemap 36 URLs.
- Schema emitted: Plumber (full on home/about/contact, referenced elsewhere), WebSite, WebPage / AboutPage / ContactPage / CollectionPage, Service (21, with £75 first-hour Offer), Offer (pricing), BreadcrumbList (40), FAQPage (31, all visible), Article (8 guides). No ratings, reviews, hours or other invented facts.
- Weight: homepage 19 KB gzipped HTML (CSS inline, 42 KB raw), JavaScript 4.1 KB gzipped, no web fonts, no third-party requests.

## Postcode isolation correction
- An unrelated business postcode was removed from the V6 source and QA pack and must never be used by Fulham Plumbing.
- The homepage checker placeholder is now `e.g. SW6`; browser QA uses the Fulham Plumbing base postcode `SW6 3RQ` only where a complete test postcode is required.
- No address, postcode, phone number or business details from the separate bathroom business are included in this V6 source.

## What changed
**Rebuilt (replaced, not patched):** `src/styles/site.css`, `src/scripts/site.js`, `src/lib/layout.mjs`, `src/pages/index.mjs`, `src/lib/map.mjs`.
**Edited:** `src/lib/icons.mjs` (WhatsApp glyph, menu, camera), `src/lib/schema.mjs` (PNG article image), `src/config/site.json`, `src/config/pages.mjs` and content files (positioning + route only), `docs/decisions.md`, `docs/keywords.md`.
**Assets:** new `public/brand/mark.svg` + `public/favicon.svg` (blue, replaces the old copper mark), `public/brand/og-default.png` (1200×630), `public/brand/apple-touch-icon.png` (180×180). Old SVG OG/touch icons removed (not supported by WhatsApp/Facebook/iOS).
**Untouched:** all service, guide and area SEO copy (except "small jobs" phrases), `tools/check.mjs`, build output structure, robots/sitemap/_headers logic, internal-link targets other than the renamed route.

## Decisions
1. **Homepage H1 restored** to the specified "Plumber in Fulham, SW6" (V5 had replaced it), shown in the Bad Boiler two-colour style. "Plumbing playing up?" leads the lede.
2. **General plumbing positioning.** All "small plumbing / small jobs" positioning removed. `/small-plumbing-jobs/` → **`/general-plumbing/`** (never indexed, so no redirect needed; all links, sitemap and schema updated).
3. **Fonts:** platform heavy sans (Roboto / SF / Segoe UI) at weight 900; no Arial Black, 0 KB. Archivo can be added later with one `@font-face` rule.
4. **Photo/video:** a website cannot attach a file to a `wa.me` chat. The checker opens the chat with postcode + problem written, and if a file was chosen shows clear steps to attach it in WhatsApp, plus a share-sheet option where the phone supports it. It never claims the file was attached.

## Homepage (mobile order)
Header (wordmark, round call, round menu) → angled white area strip (two lines; every configured area in a scrolling ticker, wraps statically with reduced motion) → giant two-colour H1 → white rule → lede → **WhatsApp job checker** (postcode with area hint, "What's wrong?", photo/video box, green Send to WhatsApp) → two Book-direct cards → navy trust strip → regular-job cards (£75 first hour + typical time, Book this on WhatsApp, link to service page) → more services list → landlords / inspections cards → navy map section with the base address → guides + FAQ → final CTA → footer. Green sticky "WhatsApp a plumbing job" bar on phones and tablets.

## Map
Pins are positioned against a fixed-ratio artwork so they line up at every width. Five anchor labels (Parsons Green, Fulham Broadway, Hurlingham, Sands End, Imperial Wharf) are always visible; all labels show on desktop; label positions are hand-set per breakpoint. Tapping a pin, a chip or pressing Enter updates the info card (homes, common calls linking to services, area link, contextual WhatsApp). Arrow keys move between pins; Escape resets. Area pages show only their own pin label (duplicate-content protection preserved).

## Browser QA (Chromium, real interactions)
- No element overflows the screen at 320, 360, 390, 430, 768 or 1440 px.
- Map pin tap updates the card and selected state at every width; keyboard (ArrowDown + Enter) and Escape work; area chips work.
- Drawer opens and closes; backdrop dims; links close it.
- Checker: `sw63rq` → `SW6 3RQ`, hint "SW6 · our core area"; sticky bar and all WhatsApp links pick up the message; no-file submit opens `wa.me/447340274956` with the message; file submit shows the attach steps; empty problem shows a prompt.
- JavaScript off: menu link falls back to the footer menu; the footer menu is hidden when JavaScript runs.
- Sticky bar shown below 1024 px, hidden on desktop and while the drawer is open.

Screenshots are in `/screenshots`. **Note:** the test machine only has DejaVu fonts, so headings render wider than on real phones and Windows.

## Still to do (next pass)
- Inner pages now inherit the new brand via the shared stylesheet; a dedicated pass on each template (service, area, guide, pricing, about, contact) for spacing and section rhythm.
- Plumber-confirmed "plumbing we often see" notes for map areas; About facts; real photos.
- Optional: Archivo subset font.
