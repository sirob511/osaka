# Osaka Garden Chicago

A responsive, independent guide to Osaka Garden, Garden of the Phoenix, and Jackson Park cherry blossoms. Built directly in this repository on `main` with static HTML, CSS, and a small amount of browser JavaScript. No framework, runtime packages, account system, or database is required.

## Run locally

Requires Node.js 20 or newer. No dependency installation is needed.

```sh
npm run dev
```

Open `http://127.0.0.1:4173`. The server builds the site on startup; rerun `npm run build` after source edits and refresh the browser. Set `PORT` to use another local port.

```sh
npm run build
npm test
```

The build writes a complete static website to `dist/`, including individual route directories, locally hosted assets, a sitemap, robots.txt, and a custom 404 page. Publish `dist/` with any static host configured to serve directory indexes and use `404.html` for missing paths. The included server is for local preview.

For Vercel, `vercel.json` selects the Other framework preset, runs `npm run build`, and publishes `dist/`. Trailing slashes match the generated directory routes. Keep this output setting: `public/` contains only source assets, so publishing it would leave the homepage and other pages missing. The GitHub repository is connected to Vercel, which deploys pushes to `main`.

## Pages

- `/` — interactive illustrated park map and main journeys
- `/visit/` — directions, parking, access guidance, FAQ, and official visitor updates
- `/cherry-blossoms/` — evergreen blossom guide
- `/toro-nagashi/` — lantern ceremony tradition, Chicago gathering, location map, and organizer links
- `/history/` — selective history timeline and a short, sourced project note
- `/events/` — recurring Jackson Park traditions and organizer links
- `/credits/` — sources, image licenses, and independence statement

## Editing and maintenance

- `src/data.mjs`: source URLs, modification metadata, event references, timeline, and FAQ.
- `src/pages.mjs`: page content and layouts.
- `src/lantern-page.mjs` and `public/lantern.css`: the dedicated Toro Nagashi guide and annotated lantern illustration.
- `src/garden-details.mjs` and `public/garden-details.css`: the annotated garden view and compact homepage visual guides.
- `src/park-map.mjs` and `public/park-map.css`: illustrated park explorer, sourced landmark facts, and responsive hotspot positions.
- `src/components.mjs`: shared navigation, footer, image markup, metadata, and structured data.
- `src/navigation.mjs`: tiny menu initializer in the document head; keeps the header stable before deferred page scripts load. Header fallback uses `.nav-ready`, independently of the content's `.js` state.
- `public/styles.css`: responsive visual system, print styles, and reduced-motion support.
- `public/main.js`: park hotspots, keyboard-operated directions tabs, clipboard feedback, and back-to-top behavior. Core content remains available without JavaScript.

Keep visitor-facing guidance evergreen: explain typical seasons, recurring traditions, locations, and what visitors can expect. Link to the Park District or event organizer for changing hours, closures, dates, registration, and bloom conditions. Do not publish year-specific trackers, expired event programs, or next-edition placeholders. Meaningful historical dates belong in the garden's story; internal research and review dates remain useful for maintenance. The full policy is in `docs/evergreen-content-policy.txt`.

Keep visible copy useful and spare. Avoid decorative captions, redundant labels, and slogans; add text only when it helps visitors understand a place, choose an action, or plan a visit.

Keep reference lists on the Sources & Image Credits page rather than repeating them above each footer. Retain contextual visitor links for current hours, bloom reports, organizer details, and directions.

The garden’s own Park District page takes precedence over older general park and blossom pages for operating hours. Event-specific admission and participation rules can differ from ordinary visiting rules, so direct visitors to the organizer's current instructions. No automatic calendar or update service is configured; do not label this guide “live.”

Retired pages permanently redirect in Vercel and the local server: `/updates/` to `/history/#garden-plans`, and `/cherry-blossoms/2027/` to `/cherry-blossoms/#bloom-updates`. Configure the same redirects when deploying to another static host. Do not infer construction milestones or an opening date from fundraising copy or a concept plan. Research records remain in `docs/events-and-revitalization-review.txt` and `docs/toro-nagashi-research.txt`.

The canonical origin is configured in `src/data.mjs`; set it to the actual public origin before hosting elsewhere.

## Assets

Photographs show the actual Osaka Garden and Jackson Park landmarks at various dates, not current conditions. Attribution and license details are in `public/images/credits.json` and the generated credits page. Resized/cropped CC BY-SA images retain their stated share-alike license. License terms apply to the photographs independently of site code.

The decorative blossom watercolor and muted pine ink study were generated with the built-in OpenAI image tool. Their prompts and provenance are in `docs/blossom-prompt.txt` and `docs/ink-pine-prompt.txt`; the local assets are `public/images/blossom-branch.webp` and `public/images/ink-pine.webp`. Both are identified as illustrations, not location photography. The transparent pine artwork is a decorative background, kept away from the main text and reduced in opacity on mobile.

The custom cherry blossom map is `public/images/cherry-blossom-map.webp`, with a 768px responsive variant. Its generation prompt, geographic references, and review notes are in `docs/cherry-blossom-map-prompt.txt`. The map shows approximate tree areas and simplified distances. Direct visitors to official sources for current bridge access and bloom conditions; the artwork is not a live report. The blossom guide includes a full-size image link and a readable location key.

The homepage park map uses `public/images/jackson-park-map.webp` and its responsive 768px variant. Its prompt and geography review are in `docs/jackson-park-map-prompt.txt`. Hotspot positions are relative to this exact uncropped 3:2 artwork. Keep labels and facts in HTML, and re-check pin placement if changing the image. The map represents selected garden-area and central-park landmarks, not current access or a walking route. All seven source-linked facts remain visible when JavaScript is unavailable; animation stops after two cycles and is disabled for reduced motion.

Each map detail panel includes an actual landmark photograph and a link to its credit. Park photos use local 640px and 320px WebP variants; the garden uses the existing bridge photograph. Source and identity notes are in `docs/park-photo-sources.json`. Keep the full Statue of the Republic visible in its image frame.

The original lantern study uses `public/images/toro-nagashi-lantern.webp` and its 768px variant. Its built-in image-generation prompt and provenance are in `docs/toro-nagashi-lantern-prompt.txt`. It illustrates the tradition, not the Chicago event or its supplied materials. Both lantern-page images use native HTML disclosure hotspots, which work without JavaScript. Each marker has a 44px touch target; mobile leader lines preserve the image locations while separating targets. JavaScript adds close buttons, Escape, and outside-click dismissal.

Fonts are hosted locally. Italiana is used for the wordmark and headings, DM Sans for navigation and body text, and Georgia italic for emphasized phrases in headings. SIL Open Font License copies accompany the locally hosted fonts in `public/fonts/`. Navigation switches to the menu below 1101px to preserve readable spacing. Standard page links use native view transitions where supported, with fading and movement disabled.

## Checks

`npm test` builds the site and checks route metadata, unique headings and IDs, structured data, internal links and anchors, assets and font references, the sitemap, 404 indexing, photo attribution, and retirement of the seasonal tracker. Browser QA should also cover phone widths, keyboard navigation, the directions tabs, clipboard-denied feedback, and the no-JavaScript fallback.

Optional: with `agent-browser` and Chromium installed, start the preview and run `npm run test:browser`. It checks every route at 1440, 390, and 320 pixels, then exercises map hotspots, keyboard selection, the place picker, script-free map facts, retired-page redirects, navigation, keyboard tabs, FAQs, clipboard success/denial, HTTP status codes, 404 recovery, and reduced motion. Screenshots go to ignored `test-results/`. Set `PREVIEW_URL` if the preview uses another port, and `AGENT_BROWSER_EXECUTABLE_PATH` if Chromium is installed in a custom location. Check the no-JavaScript fallback separately by disabling page JavaScript in browser settings and reloading `/visit/`; the navigation and all three directions sections should remain visible.
