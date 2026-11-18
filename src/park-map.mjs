import { escape, link } from './components.mjs';

// Positions follow the illustrated artwork, not geographic coordinates.
export const parkPlaces = [
  { id: 'garden', name: 'Osaka Garden', short: 'Osaka Garden', note: '1935 · Japanese stroll garden', year: '1935',
    x: 43.75, y: 51, pinX: 58, pinY: 40,
    fact: 'A Japanese stroll garden opened here in 1935, beside the Phoenix Pavilion. The Osaka name followed in 1993, honoring Chicago’s sister-city friendship.',
    detail: 'Find the garden on the northeast side of Wooded Island. Admission is free; the garden has its own seasonal hours.',
    href: '/visit/', action: 'Garden hours & directions', source: 'https://www.gardenofthephoenix.org/', sourceName: 'Garden of the Phoenix Foundation' },
  { id: 'skylanding', name: 'SKYLANDING', short: 'SKYLANDING', note: 'Yoko Ono · 2016', year: '2016',
    x: 35.7, y: 46.1, pinX: 16, pinY: 58,
    fact: 'Twelve lotus petals rise from the former Phoenix Pavilion site. Yoko Ono’s sculpture was dedicated in 2016 as a symbol of peace.',
    detail: 'Look just west of Osaka Garden, in the open lawn on Wooded Island.',
    href: 'https://www.chicagoparkdistrict.com/parks-facilities/sky-landing-artwork', action: 'Explore the artwork', source: 'https://www.chicagoparkdistrict.com/parks-facilities/sky-landing-artwork', sourceName: 'Chicago Park District' },
  { id: 'museum', name: 'Griffin Museum of Science and Industry', short: 'Griffin MSI', note: '1893 · Palace of Fine Arts', year: '1893',
    x: 37.8, y: 10.7, pinX: 13, pinY: 6,
    fact: 'The museum occupies the Palace of Fine Arts from the 1893 World’s Fair. Its classical exterior was rebuilt in stone in the early 1930s.',
    detail: 'The museum stands directly north of the Columbian Basin. Museum tickets and hours are separate from the park.',
    href: 'https://www.griffinmsi.org/', action: 'Visit the museum website', source: 'https://webapps1.chicago.gov/landmarksweb/web/landmarkdetails.htm?lanId=1376', sourceName: 'City of Chicago Landmarks' },
  { id: 'basin', name: 'Columbian Basin', short: 'Cherry blossoms', note: 'Around the Columbian Basin', year: 'Spring',
    x: 35.8, y: 24.6, pinX: 14, pinY: 32,
    fact: 'The basin’s banks are the heart of Jackson Park’s cherry blossom display. More trees grow beside the museum and on northern Wooded Island.',
    detail: 'The bloom window changes with the weather. Use the tree-area map and dated reports to plan a spring visit.',
    href: '/cherry-blossoms/', action: 'Find the cherry trees', source: 'https://www.chicagoparkdistrict.com/cherry-blossoms', sourceName: 'Chicago Park District' },
  { id: 'meadow', name: 'Bobolink Meadow', short: 'Bobolink Meadow', note: 'Birds & prairie habitat', year: 'Nature',
    x: 59.9, y: 55.6, pinX: 78, pinY: 59,
    fact: 'Tallgrass prairie and woodland beside the lagoon offer habitat for birds and butterflies. It is a place to slow down and watch for wildlife.',
    detail: 'Find the meadow east of Wooded Island, across the East Lagoon. Regular bird walks explore this part of the park.',
    href: '/events/', action: 'Find a bird walk', source: 'https://sites.google.com/view/bobolinkvolunteers/history', sourceName: 'Bobolink Meadow volunteers' },
  { id: 'republic', name: 'Statue of the Republic', short: 'The Golden Lady', note: '1918 · A World’s Fair memorial', year: '1918',
    x: 71, y: 80, pinX: 52, pinY: 84,
    fact: 'The 24-foot gilded bronze statue commemorates the 1893 World’s Fair. Installed in 1918, it is a smaller version of the fair’s original monument.',
    detail: 'Look farther south, at Hayes and Richards Drives. This landmark is beyond the garden and basin area.',
    href: 'https://www.chicagoparkdistrict.com/parks-facilities/statue-republic', action: 'Read the monument’s story', source: 'https://www.chicagoparkdistrict.com/parks-facilities/statue-republic', sourceName: 'Chicago Park District' }
];

export function parkMap() {
  return `<section class="park-hero wrap" aria-labelledby="park-title">
    <div class="park-heading"><h1 id="park-title">Osaka Garden &amp; <em>Jackson Park.</em></h1><p>Art, wildlife, and traces of the 1893 World’s Fair. <br>Choose a place to explore.</p></div>
    <div class="park-explorer" data-park-explorer>
      <div class="park-map-figure">
        <div class="park-map-canvas">
          <img src="/images/jackson-park-map.webp" srcset="/images/jackson-park-map-768.webp 768w, /images/jackson-park-map.webp 1536w" sizes="(max-width: 800px) calc(100vw - 44px), (max-width: 1100px) 65vw, 980px" width="1536" height="1024" alt="Watercolor map of Jackson Park, north at the top. The museum and Columbian Basin lie north of Wooded Island. Osaka Garden and SKYLANDING sit close together on the island; Bobolink Meadow is across the lagoon to the east, and the Statue of the Republic is farther south. Lake Michigan borders the east." fetchpriority="high" decoding="async">
          <svg class="park-map-leaders" viewBox="0 0 100 66.6667" aria-hidden="true">${parkPlaces.map((p, i) => `<g data-map-leader="${p.id}"${i === 0 ? ' class="is-selected"' : ''}><path d="M${p.x} ${p.y * 2 / 3} L${p.pinX} ${p.pinY * 2 / 3}"/><circle cx="${p.x}" cy="${p.y * 2 / 3}" r=".4"/></g>`).join('')}</svg>
          <div class="park-pins" aria-label="Places on the map">${parkPlaces.map((p, i) => `<button type="button" class="park-pin${p.pinX > 55 ? ' park-pin-right' : ''}" style="--pin-x:${p.pinX}%;--pin-y:${p.pinY}%" data-park-place="${p.id}" aria-label="Explore ${escape(p.name)}" aria-controls="park-place-${p.id}" aria-pressed="${i === 0}" disabled><span class="park-pin-number">${i + 1}</span><span class="park-pin-label"><strong>${p.short}</strong><small>${p.note}</small></span></button>`).join('')}</div>
        </div>
        <div class="park-map-caption"><span>Garden &amp; nearby landmarks · Illustrated guide</span><a href="/images/jackson-park-map.webp" target="_blank" rel="noopener">View artwork ↗</a></div>
      </div>
      <div class="park-guide">
        <div class="park-picker"><label for="park-place-picker">Explore a place</label><select id="park-place-picker" disabled>${parkPlaces.map((p, i) => `<option value="${p.id}">${String(i + 1).padStart(2, '0')} · ${p.name}</option>`).join('')}</select></div>
        <div class="park-place-panels">${parkPlaces.map((p, i) => `<article class="park-place" id="park-place-${p.id}" aria-labelledby="park-place-title-${p.id}"><p class="park-place-era">${p.year}</p><h2 id="park-place-title-${p.id}">${p.name}</h2><p>${p.fact}</p><p class="park-place-tip">${p.detail}</p>${link(p.href, p.action)}<a class="park-place-source" href="${escape(p.source)}">Source: ${p.sourceName} ↗</a></article>`).join('')}</div>
        <p class="visually-hidden" role="status" aria-live="polite" data-park-announcement></p>
      </div>
    </div>
  </section>`;
}
