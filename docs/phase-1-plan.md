# SUPERSEDED

This Phase 1 planning document is superseded by **FULHAM-PLUMBING-BUILD-THE-COMPLETE-SITE.md** and the authoritative amendment approving the fourth Chelsea Harbour checker fix.

The original Phase 1 plan remains below for history.


# Phase 1 plan

No site code is built in Phase 1. This document records the agreed architecture and the visual directions to approve before foundations begin.

## Planned file tree

```
fulham-plumbing/
├─ .github/workflows/check.yml
├─ .gitignore
├─ README.md
├─ package.json
├─ build.mjs
├─ serve.mjs
├─ docs/
│  ├─ decisions.md
│  ├─ keywords.md
│  ├─ pre-launch.md
│  └─ image-inventory.md
├─ public/
│  ├─ favicon.svg
│  ├─ apple-touch-icon.png
│  ├─ brand/
│  ├─ fonts/
│  └─ images/{team,jobs,local}/
├─ src/
│  ├─ config/site.json
│  ├─ lib/
│  │  ├─ util.mjs
│  │  ├─ layout.mjs
│  │  ├─ schema.mjs
│  │  ├─ pricing.mjs
│  │  ├─ map.mjs
│  │  ├─ service-page.mjs
│  │  ├─ area-page.mjs
│  │  ├─ guide-page.mjs
│  │  └─ job-page.mjs
│  ├─ content/
│  │  ├─ services/<slug>.mjs
│  │  ├─ areas/<slug>.mjs
│  │  ├─ guides/<slug>.mjs
│  │  └─ jobs/<slug>.mjs
│  ├─ pages/
│  ├─ scripts/site.js
│  └─ styles/site.css
└─ tools/check.mjs
```

`build.mjs` will generate service, area, guide and job pages from `site.json` plus `src/content/*`, so enabling a service or adding a job does not require new page wiring.

## Palette options

### Option A — River blue + copper
- Warm paper: `#F7F4EE`
- River-blue ink: `#15283A`
- Copper: `#B4683A`
- Pale Thames blue: `#D9E7EA`
- Park green, map only: `#7E9775`
- Soft rule: `#D8D2C8`

This is the closest to the brief: practical, daylight and recognisably plumbing-led without looking like a trade-template site.

### Option B — Slate + burnt copper
- Warm cream: `#FAF7F1`
- Deep slate: `#20313A`
- Burnt copper: `#A85E38`
- Mist blue: `#DDE8EB`
- Sage, map only: `#879B7D`
- Soft rule: `#DAD4CA`

This is slightly softer and more domestic while keeping the same copper-pipe cue.

## Font pairing options

### Pairing 1 — Manrope + Inter
- Headings/wordmark: Manrope, self-hosted WOFF2
- Body/UI: Inter, self-hosted WOFF2
- Both are sans-serif, sturdy and highly readable on mobile.

### Pairing 2 — IBM Plex Sans + Source Sans 3
- Headings/wordmark: IBM Plex Sans, self-hosted WOFF2
- Body/UI: Source Sans 3, self-hosted WOFF2
- More utilitarian and trade-like, but still polished.

No Libre Baskerville and no serif-led luxury treatment.

## Homepage wireframe — mobile 390px

```
┌──────────────────────────────────────┐
│ FULHAM PLUMBING       [phone] [Menu] │
├──────────────────────────────────────┤
│ Local plumber · Fulham SW6           │
│                                      │
│ PLUMBER IN FULHAM, SW6               │
│                                      │
│ Leaks, toilets, taps, showers,       │
│ pumps and small plumbing jobs.       │
│                                      │
│ [ £75 first hour · no separate       │
│   call-out fee ]                     │
│                                      │
│ [ CALL — strongest CTA ]             │
│ [ WhatsApp a photo ]                 │
│ hours / availability if configured   │
│ trust line only when real            │
└──────────────────────────────────────┘
       first screen ends by 844px

[ What's the problem? ]
2-column service tiles

[ Pricing ]
price line + worked examples

[ Recent jobs in SW6 ]
real cards only; placeholder until available

[ Reviews ]
hidden while empty

[ How it works ]
1 Send a photo/call
2 We confirm likely time/availability
3 Fixed + itemised invoice

[ Parsons Green + Hurlingham ]
base/local relevance + plumber-note placeholder

[ Where we work ]
~300px illustrated map
mobile accordion area list underneath

[ Useful guides ]

[ Questions ]

[ What we don't do ]
single allowed exclusions aside

[ Send us a photo of the problem ]
Call / WhatsApp / hours

[ Footer ]

Sticky Call · WhatsApp bar appears only after hero and only when configured.
```

## Homepage wireframe — desktop

```
┌───────────────────────────────────────────────────────────────┐
│ WORDMARK        Services  Pricing  Areas  Guides  About Menu  │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Local plumber · Fulham SW6     ┌──────────────────────────┐  │
│                                 │ real plumber-at-work     │  │
│  PLUMBER IN FULHAM, SW6         │ photo when configured   │  │
│                                 │ neutral placeholder      │  │
│  Leaks, toilets, taps...        │ otherwise               │  │
│                                 └──────────────────────────┘  │
│  [ £75 first hour ]                                          │
│  [ CALL ] [ WhatsApp a photo ]                               │
│  hours / trust only when real                                │
├───────────────────────────────────────────────────────────────┤
│ WHAT'S THE PROBLEM? — 4-column tiles                         │
├───────────────────────────────────────────────────────────────┤
│ Pricing / recent jobs / how it works                         │
├───────────────────────────────────────────────────────────────┤
│ Parsons Green + Hurlingham local section                     │
├───────────────────────────────────────────────────────────────┤
│ WHERE WE WORK — large daylight Fulham map + area lists       │
├───────────────────────────────────────────────────────────────┤
│ Guides / FAQs / exclusions / final CTA / footer              │
└───────────────────────────────────────────────────────────────┘
```

The desktop hero uses a real plumber-at-work photograph on the right when configured. The map is deliberately below the fold.

## Map artwork

The map is a light daylight illustration in a `viewBox="0 0 1000 740"`, not a street survey.

The Thames is the dominant form. It drops down the west side by Bishop's Park and Fulham Palace, reaches Putney Bridge, then curves along the south past Hurlingham and Wandsworth Bridge before running east towards Imperial Wharf and Chelsea Harbour. Fulham sits visually inside that bend.

Parks are soft green shapes: Bishop's Park, Fulham Palace grounds, Hurlingham Park, South Park, Eel Brook Common and Parsons Green. Main roads are thin river-blue/slate lines with restrained small-caps labels. Stations are small symbols rather than large labels.

Core pins use copper. Nearby pins are lighter or outlined. The "We're here" marker is fixed at approximately `[51,55]`, on Hurlingham Road just south of Parsons Green, with two soft copper rings.

The same map component is reused on the homepage, the areas hub and area pages.

### Rough sketch

```
                    Fulham Broadway ●
              Munster ●      Eel Brook ●
      Crabtree ●                                                             Chelsea Harbour ○
  Bishop's Park ●    Parsons Green ●      Sands End ●
          ╲             ★ WE'RE HERE        /
           ╲          Hurlingham ●         /
            ╲                             /
             ╲        THAMES             /
              ╲~~~~ Putney Bridge ~~~~~~/
                ○ Putney       ○ Wandsworth Town
```

`●` = core service area, `○` = nearby area, `★` = operating base.

## Map interaction and motion plan

- Inline SVG, map-point buttons and panels on desktop.
- Mobile map panels are disabled; tapping a pin opens and scrolls to its matching accordion row.
- Escape closes open desktop panels and restores focus.
- Static and fully visible with JavaScript off.
- `prefers-reduced-motion: reduce` disables animation.
- With motion allowed, IntersectionObserver adds `is-drawn` when the below-fold map enters view.
- River draws first for about 0.9s, roads for about 0.8s, parks/labels fade, pins drop over about 0.8s, then the base rings pulse.
- No other page content animates on initial load.
