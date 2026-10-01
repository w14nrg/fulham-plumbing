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
