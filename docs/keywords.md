# SEO ownership — final specification

SEO titles, H1s, descriptions, search intent and schema are implemented in `src/config/pages.mjs`, which is the source templates read.

## Ownership rules

- Home: plumber Fulham; plumber SW6; local plumber Fulham; plumber Parsons Green; plumber Hurlingham.
- Services hub: plumbing services Fulham.
- Service pages: one hire-intent cluster each, never duplicated.
- Pricing: plumber prices Fulham and cost intent.
- Small plumbing jobs: small plumbing jobs Fulham.
- Landlords: landlord plumber Fulham.
- Five area pages own only their named place searches.
- Guides own question searches rather than "[service] Fulham" searches.
- Parsons Green and Hurlingham do not receive separate landing pages.
- All page-specific primary/secondary terms, titles, H1s, metas, intents and schema are stored in `src/config/pages.mjs`.

## Internal-link model

Home links to every enabled service, Pricing, Areas, all five area pages, three guides, Recent jobs, About, Contact and Landlords. Service pages link to Pricing, Contact, related services, related guides and selected relevant area pages. Guides link to their primary service, related services/guides, Pricing and Contact. Area pages link to their selected services, guide, Pricing, Contact and Areas hub. Breadcrumbs are present on all inner pages.

Keyword Planner sanity-check remains a pre-launch task; nothing in this build claims live search volume.
