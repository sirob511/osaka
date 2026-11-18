import { eventGuide } from './data.mjs';
import { link, pageIntro } from './components.mjs';

export const lanternSources = {
  temple: 'https://daiyuzenji.org/news/2026/7/18/honoring-remembrance-through-the-tradition-of-toro-nagashi',
  firstChicago: 'https://www.japaneseartsfoundation.org/upcoming-festivals/toro-nagashi-2023',
  calendar: eventGuide.sources.toro,
  tradition: 'https://www.mlit.go.jp/tagengo-db/common/001560970.pdf',
  hiroshima: 'https://www.chushinren.jp/tourou/en/history.html'
};

function hotspot(group, position, number, title, description) {
  return `<details class="lantern-hotspot lantern-marker-${position}" name="${group}"><summary aria-label="${number}. ${title}"><span class="lantern-hotspot-number" aria-hidden="true">${number}</span></summary><div class="lantern-hotspot-card"><strong>${title}</strong><p>${description}</p><button type="button" class="lantern-hotspot-close" aria-label="Close ${title}" hidden>×</button></div></details>`;
}

export const lanternPage = {
  path: '/toro-nagashi/',
  title: 'Toro Nagashi — Chicago’s Lantern Ceremony at Osaka Garden',
  description: 'Discover Chicago’s Toro Nagashi lantern ceremony: its meaning, the Osaka Garden and SKYLANDING setting, and organizer links for dates and participation.',
  className: 'lantern-page', imageName: 'toro-nagashi-lantern', styles: ['/lantern.css'],
  content: `${pageIntro('Toro Nagashi.<br><em>Lantern ceremony.</em>', 'Floating lanterns, remembrance, and wishes for peace at Osaka Garden in Jackson Park.')}
  <section class="lantern-lead wrap" aria-label="The lantern tradition and Chicago ceremony information">
    <figure class="lantern-figure">
      <div class="lantern-art">
        <img src="/images/toro-nagashi-lantern.webp" srcset="/images/toro-nagashi-lantern-768.webp 768w, /images/toro-nagashi-lantern.webp 1536w" sizes="(max-width: 800px) calc(100vw - 44px), 63vw" width="1536" height="1024" fetchpriority="high" decoding="async" alt="Watercolor study of a glowing paper lantern on a wooden floating base, with two smaller lanterns drifting behind it.">
        <svg class="lantern-leaders lantern-art-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M61 43L68 28M63 59L87 53M71 72L68 83"/></svg>
        ${hotspot('lantern-parts', 'message', 1, 'A message', 'Names, memories, or hopes for peace.')}
        ${hotspot('lantern-parts', 'light', 2, 'A light', 'In the Obon tradition, a guide for returning spirits.')}
        ${hotspot('lantern-parts', 'water', 3, 'On the water', 'Paper lanterns float on a small base.')}
        <div class="lantern-art-note" aria-hidden="true"><span>Tōrō nagashi</span><strong>“Lantern floating”</strong></div>
      </div>
      <figcaption class="lantern-key"><p class="small-note">An illustrated guide to the tradition. Chicago’s lanterns and arrangements depend on the organizers.</p></figcaption>
    </figure>
    <aside class="lantern-attend" aria-labelledby="ceremony-info-title"><h2 id="ceremony-info-title">Join the <em>ceremony.</em></h2><p>Find dates, admission, lantern availability, and event access in the organizers’ announcements.</p>${link(lanternSources.calendar, 'Daiyuzenji event calendar', 'button dark')}<a class="subtle-link" href="${eventGuide.sources.parkEvents}">Park District calendar ↗</a><a class="lantern-participation-link" href="#chicago-program">Taking part ↓</a></aside>
  </section>
  <section class="lantern-meaning wrap" aria-labelledby="lantern-meaning-title"><div class="section-heading"><h2 id="lantern-meaning-title">What the lanterns <em>mean.</em></h2></div><div class="lantern-meaning-grid">
    <article><h3>Remembering loved ones</h3><p>Tōrō nagashi means “lantern floating.” Lighted paper lanterns are placed on water in remembrance of people who have died. A name or message makes each light personal.</p><p>Chicago’s participating temple, Daiyuzenji, describes the ceremony as a time for remembrance and hopes for peace, welcoming people of all backgrounds.</p><a href="${lanternSources.temple}">Daiyuzenji on the tradition ↗</a></article>
    <article><h3>The connection to Obon</h3><p>Lantern floating is often associated with the end of Obon, the Buddhist season when ancestral spirits are believed to return home. The lights guide their return journey.</p><p>Dates and customs vary by community. Toro Nagashi is a ceremony, rather than a single fixed national holiday.</p><a href="${lanternSources.tradition}">Japan’s cultural guide (PDF) ↗</a></article>
    <article><h3>Wishes for peace</h3><p>In Hiroshima, lanterns float on August 6 to remember victims of the atomic bombing. Participants write names and wishes for peace on the lanterns.</p><p>Each community gives the tradition its own setting. The garden’s inaugural ceremony was held in 2023.</p><a href="${lanternSources.hiroshima}">Hiroshima’s ceremony history ↗</a><a href="${lanternSources.firstChicago}">The garden’s inaugural event ↗</a></article>
  </div></section>
  <section class="lantern-program" id="chicago-program" aria-labelledby="chicago-program-title"><div class="wrap"><div class="lantern-program-heading"><h2 id="chicago-program-title">Taking <em>part.</em></h2></div><ol class="lantern-program-list"><li><span>01</span><div><h3>Make it personal</h3><p>A name, memory, or wish for peace gives a lantern meaning. Use the organizers’ guidance for materials and decorating.</p></div></li><li><span>02</span><div><h3>Listen & reflect</h3><p>The gathering offers time to remember loved ones together. Leave room for quiet reflection and for other participants.</p></div></li><li><span>03</span><div><h3>Follow the ceremony</h3><p>Follow the event team’s directions on when and where to place a lantern. Arrangements vary with each program.</p></div></li></ol></div></section>
  <section class="lantern-location wrap" aria-labelledby="lantern-location-title"><div><h2 id="lantern-location-title">Where it <em>takes place.</em></h2><p>Osaka Garden is on the northeast side of Wooded Island. SKYLANDING sits just west of the garden, making both places part of the same small setting.</p>${link('/visit/', 'Garden directions & access')}</div><figure class="lantern-location-map"><div class="lantern-art"><img src="/images/jackson-park-map.webp" srcset="/images/jackson-park-map-768.webp 768w, /images/jackson-park-map.webp 1536w" sizes="(max-width: 800px) calc(100vw - 44px), 55vw" width="1536" height="1024" loading="lazy" alt="Illustrated Jackson Park map. Marker 1 locates Osaka Garden on northeastern Wooded Island; marker 2 locates SKYLANDING just west of the garden."><svg class="lantern-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M43.75 51L67 62M35.7 46.1L22 36"/><circle cx="43.75" cy="51" r=".6"/><circle cx="35.7" cy="46.1" r=".6"/></svg>${hotspot('lantern-places', 'garden', 1, 'Osaka Garden pond', 'The garden’s water setting on northern Wooded Island.')}${hotspot('lantern-places', 'skylanding', 2, 'Yoko Ono’s SKYLANDING', 'Twelve rising petals beside the garden entrance.')}</div><figcaption><a href="/#park-title">Explore the park map ↗</a></figcaption></figure></section>
  <aside class="source-note"><p>Tradition: <a href="${lanternSources.temple}">Daiyuzenji</a>, <a href="${lanternSources.tradition}">Japan’s cultural guide</a>, and <a href="${lanternSources.hiroshima}">Hiroshima’s organizers</a>.</p></aside>`
};
