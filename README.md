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

- `/` — visual introduction and main journeys
- `/visit/` — seasonal hours, directions, parking, access guidance, and FAQ
- `/cherry-blossoms/` — evergreen blossom guide
- `/cherry-blossoms/2027/` — dated seasonal notebook
- `/history/` — selective history timeline
- `/updates/` — expansion, restoration, and visitor notices
- `/credits/` — sources, image licenses, and independence statement

## Editing and maintenance

- `src/data.mjs`: source URLs, editorial review date, bloom record, timeline, and FAQ.
- `src/pages.mjs`: page content and layouts.
- `src/components.mjs`: shared navigation, footer, image markup, metadata, and structured data.
- `public/styles.css`: responsive visual system, print styles, and reduced-motion support.
- `public/main.js`: accessible navigation, keyboard-operated directions tabs, clipboard feedback, and back-to-top behavior. Core content remains available without JavaScript.

Visitor information was checked **November 17, 2026**. The garden’s own Park District page takes precedence over older general park and blossom pages for operating hours. Hours are Chicago local time; they must be rechecked before publishing a seasonal update. Do not label this guide “live.”

The 2027 tracker deliberately starts with no observation date or confirmed peak date. Record an observation only when a dated source supports it, and distinguish the source’s report date from this site’s editorial review date. The April 14, 2026 report is historical context. Replace seasonal copy and the tracker’s visible stage only after reviewing the source; changing `bloom` alone does not update all editorial prose.

Expansion concepts, completed restoration, and visitor notices are presented separately. Do not infer construction milestones or an opening date from a concept plan. No automatic update service or schedule is configured.

The canonical origin is configured in `src/data.mjs`; set it to the actual public origin before hosting elsewhere.

## Assets

Photographs show the actual Osaka Garden at various dates, not current conditions. Attribution and license details are in `public/images/credits.json` and the generated credits page. Resized/cropped CC BY-SA images retain their stated share-alike license. License terms apply to the photographs independently of site code.

The decorative blossom watercolor was generated with the built-in OpenAI image tool; its prompt and provenance are in `docs/blossom-prompt.txt`. The final local asset is `public/images/blossom-branch.webp`. It is explicitly identified as illustration, not location photography.

Fonts are hosted locally. SIL Open Font License copies accompany Italiana and DM Sans in `public/fonts/`.

## Checks

`npm test` builds the site and checks route metadata, unique headings and IDs, structured data, internal links and anchors, assets and font references, the sitemap, 404 indexing, photo attribution, and the distinction between future and historical bloom data. Browser QA should also cover phone widths, keyboard navigation, the directions tabs, clipboard-denied feedback, and the no-JavaScript fallback.

Optional: with `agent-browser` and Chromium installed, start the preview and run `npm run test:browser`. It checks every route at 1440, 390, and 320 pixels, then exercises navigation, keyboard tabs, FAQs, clipboard success/denial, HTTP status codes, 404 recovery, and reduced motion. Screenshots go to ignored `test-results/`. Set `PREVIEW_URL` if the preview uses another port, and `AGENT_BROWSER_EXECUTABLE_PATH` if Chromium is installed in a custom location. Check the no-JavaScript fallback separately by disabling page JavaScript in browser settings and reloading `/visit/`; the navigation and all three directions sections should remain visible.
