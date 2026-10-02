# Locked decisions — final specification

This file follows the authoritative complete-site specification.

- Brand: **Fulham Plumbing**. Review branch only; `site.indexable` remains false.
- Homepage alone owns the standalone "plumber Fulham" and "plumber SW6" terms.
- Each enabled service page owns one hire-intent service cluster; guides own question intent.
- Five area pages only: Fulham Broadway; Sands End & Imperial Wharf; Chelsea Harbour & Lots Road; Putney; Wandsworth Town.
- Parsons Green and Hurlingham belong to the homepage. Other SW6 neighbourhoods are anchored sections on `/areas-we-cover/`.
- Area pages are not doorway pages: 450–750 words, area-specific content, and no repeated sentence longer than 60 characters.
- Pricing is generated from `site.json`; unknown rate, VAT, parking and inspection price are never guessed.
- Recent jobs stay noindex and out of the sitemap until there are six real, permissioned, photographed jobs and `recentJobs.indexable` is explicitly changed.
- Unknown business facts remain null and are hidden or shown as an exact `[PLACEHOLDER: …]`.
- Banned trade terms and excluded locations are permitted only in the two explicit exemption blocks required by the specification.
- The single sister-service referral appears only on Contact and Areas. It never appears in the footer.
- No custom domain setup, no merge to main, and no change to another repository as part of this build.
- The approved fourth checker amendment allows both "Chelsea Harbour" and the required `chelsea-harbour` URL slug while plain Chelsea remains banned.

## V6 decisions (Claude, front-end rebuild)

- **Positioning:** Fulham Plumbing is a general local plumber, not a "small jobs" plumber. All "small plumbing jobs / small jobs welcome" positioning has been removed from titles, descriptions, headings, navigation and copy. Physical uses of "small" (a small leak, a small valve) are unaffected.
- **Route decision:** `/small-plumbing-jobs/` is replaced by **`/general-plumbing/`**. The site has never been indexable and the real domain is not live, so there are no external links or indexed URLs to preserve; a redirect stub would only add a thin duplicate URL. Every internal link, the sitemap, schema `hasOfferCatalog`, quick answers and content cross-links now point to `/general-plumbing/`. If any external link to the old preview URL appears later, add a host-level 301.
- **Homepage H1:** restored to the specified SEO H1 "Plumber in Fulham, SW6" (V5 had replaced it with "Is your plumbing playing up?"). It is set in the Bad Boiler two-colour display style; the "playing up?" line moves to the lede.
- **Fonts:** no web font is shipped. Archivo could not be obtained in the build environment. The display style uses the platform's own heavy sans at weight 900 (Roboto on Android, SF on iPhone, Segoe UI on Windows), which renders much closer to the reference than Arial Black and costs 0 KB. Archivo can be added later by placing a subset woff2 in `public/fonts/` and adding one `@font-face` rule at the top of `site.css`.
- **Social images:** Open Graph and Apple touch icons are now PNG (`og-default.png`, `apple-touch-icon.png`); SVG is not supported by Facebook, WhatsApp, LinkedIn or iOS for these.
- **Photo/video in WhatsApp:** a website cannot attach a file to a `wa.me` chat. The checker opens the chat with the postcode and problem prefilled and tells the customer exactly how to attach the photo in WhatsApp. Where the browser supports sharing files, a secondary "Share the photo instead" option uses the phone's share sheet and says plainly that they must then pick WhatsApp and Fulham Plumbing.
- **Stylesheet:** `site.css` was replaced, not patched. One token set, one type system, no V2–V5 leftovers.
