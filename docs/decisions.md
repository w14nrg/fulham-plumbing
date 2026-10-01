# Locked decisions

1. Brand name is exactly **Fulham Plumbing** everywhere. Domain `https://fulhamplumbing.co.uk`.
2. Homepage owns "plumber Fulham", "plumber SW6", "local plumber Fulham", "plumber Parsons Green", "plumber Hurlingham".
3. Each service page owns one service cluster. No two pages target the same primary keyword.
4. **Five area pages**: Fulham Broadway, Sands End & Imperial Wharf, Chelsea Harbour & Lots Road, Putney, Wandsworth Town. Area pages never target "plumber Fulham" and never repeat service-page copy. No sentence may be shared between area pages.
5. Parsons Green and Hurlingham are covered by the homepage. Munster Village, Peterborough Estate, Eel Brook Common & Walham Green, Bishop's Park & Fulham Palace, and Crabtree & Fulham Reach are sections on `/areas-we-cover/`. No other location pages.
6. Guides answer questions and link to the service page that fixes the problem. Guides never target "[service] Fulham".
7. Urgent intent is handled honestly by the Leak Repairs page ("same-day where possible during working hours"). No emergency page, no 24/7 claims.
8. Price is shown on the homepage, pricing page, every service page and every area page, generated from `site.json`.
9. The plumber's name and photo appear in the homepage hero and on every service page when configured.
10. Recent Jobs hub and job pages are `noindex` and out of the sitemap until `recentJobs.indexable` is true, after 6 real, permissioned, photographed jobs.
11. Services can be switched off in `site.json`; switched-off services produce no page, tile, link or schema.
12. Unvented cylinder work appears only if `plumber.g3Unvented` is true.
13. The only place banned trade terms may appear is one `<aside data-exclusions>` "What we don't do" block on the homepage, services hub and pricing page. It links to En-Suites & Bathrooms using that brand name as the link text.
14. The only place excluded areas may appear is one `<p data-sister>` line on the contact page and areas page: "Outside our area? Our sister service Kensington Plumbing Services may be able to help." Brand name as link text. Not in the footer.
15. The site is `noindex` and robots-blocked until `site.indexable` is true. At launch, robots.txt allows search engines and AI search crawlers.
16. All text, links and schema are in the raw HTML. The site must be fully readable with JavaScript switched off.
17. The map is an illustration, not a street survey. "We're here" sits on Hurlingham Road just south of Parsons Green.
18. Invent nothing. Missing facts are `null` and hidden, or `[PLACEHOLDER: …]`.
