import { eventGuide } from './data.mjs';
import { link, pageIntro } from './components.mjs';

export const lanternSources = {
  temple: 'https://daiyuzenji.org/news/2026/7/18/honoring-remembrance-through-the-tradition-of-toro-nagashi',
  firstChicago: 'https://www.japaneseartsfoundation.org/upcoming-festivals/toro-nagashi-2023',
  calendar: eventGuide.sources.toro,
  tradition: 'https://www.mlit.go.jp/tagengo-db/common/001560970.pdf',
  hiroshima: 'https://www.chushinren.jp/tourou/en/history.html'
};

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
        <span class="lantern-marker lantern-marker-message" aria-hidden="true">1</span>
        <span class="lantern-marker lantern-marker-light" aria-hidden="true">2</span>
        <span class="lantern-marker lantern-marker-water" aria-hidden="true">3</span>
        <div class="lantern-art-note" aria-hidden="true"><span>Tōrō nagashi</span><strong>“Lantern floating”</strong></div>
      </div>
      <figcaption class="lantern-key"><ol><li><span>1</span><div><strong>A message</strong><p>Names, memories, or hopes for peace.</p></div></li><li><span>2</span><div><strong>A light</strong><p>In the Obon tradition, a guide for returning spirits.</p></div></li><li><span>3</span><div><strong>On the water</strong><p>Paper lanterns float on a small base.</p></div></li></ol><p class="small-note">An illustrated guide to the tradition. Chicago’s lanterns and arrangements depend on the organizers.</p></figcaption>
    </figure>
    <aside class="lantern-attend" aria-labelledby="ceremony-info-title"><h2 id="ceremony-info-title">Join the <em>ceremony.</em></h2><p>Find dates, admission, lantern availability, and event access in the organizers’ announcements.</p>${link(lanternSources.calendar, 'Daiyuzenji event calendar', 'button dark')}<a class="subtle-link" href="${eventGuide.sources.parkEvents}">Park District calendar ↗</a><a class="lantern-participation-link" href="#chicago-program">Taking part ↓</a></aside>
  </section>
  <section class="lantern-meaning wrap" aria-labelledby="lantern-meaning-title"><div class="section-heading"><h2 id="lantern-meaning-title">What the lanterns <em>mean.</em></h2></div><div class="lantern-meaning-grid">
    <article><h3>Remembering loved ones</h3><p>Tōrō nagashi means “lantern floating.” Lighted paper lanterns are placed on water in remembrance of people who have died. A name or message makes each light personal.</p><p>Chicago’s participating temple, Daiyuzenji, describes the ceremony as a time for remembrance and hopes for peace, welcoming people of all backgrounds.</p><a href="${lanternSources.temple}">Daiyuzenji on the tradition ↗</a></article>
    <article><h3>The connection to Obon</h3><p>Lantern floating is often associated with the end of Obon, the Buddhist season when ancestral spirits are believed to return home. The lights guide their return journey.</p><p>Dates and customs vary by community. Toro Nagashi is a ceremony, rather than a single fixed national holiday.</p><a href="${lanternSources.tradition}">Japan’s cultural guide (PDF) ↗</a></article>
    <article><h3>Wishes for peace</h3><p>In Hiroshima, lanterns float on August 6 to remember victims of the atomic bombing. Participants write names and wishes for peace on the lanterns.</p><p>Each community gives the tradition its own setting. The garden’s inaugural ceremony was held in 2023.</p><a href="${lanternSources.hiroshima}">Hiroshima’s ceremony history ↗</a><a href="${lanternSources.firstChicago}">The garden’s inaugural event ↗</a></article>
  </div></section>
  <section class="lantern-program" id="chicago-program" aria-labelledby="chicago-program-title"><div class="wrap"><div class="lantern-program-heading"><h2 id="chicago-program-title">Taking <em>part.</em></h2></div><ol class="lantern-program-list"><li><span>01</span><div><h3>Make it personal</h3><p>A name, memory, or wish for peace gives a lantern meaning. Use the organizers’ guidance for materials and decorating.</p></div></li><li><span>02</span><div><h3>Listen & reflect</h3><p>The gathering offers time to remember loved ones together. Leave room for quiet reflection and for other participants.</p></div></li><li><span>03</span><div><h3>Follow the ceremony</h3><p>Follow the event team’s directions on when and where to place a lantern. Arrangements vary with each program.</p></div></li></ol></div></section>
  <section class="lantern-location wrap" aria-labelledby="lantern-location-title"><div><h2 id="lantern-location-title">Where it <em>takes place.</em></h2><p>Osaka Garden is on the northeast side of Wooded Island. SKYLANDING sits just west of the garden, making both places part of the same small setting.</p><ol class="lantern-location-key"><li><span>1</span><div><h3>Osaka Garden pond</h3><p>The garden’s water setting on northern Wooded Island.</p></div></li><li><span>2</span><div><h3>Yoko Ono’s SKYLANDING</h3><p>Twelve rising petals beside the garden entrance.</p></div></li></ol>${link('/visit/', 'Garden directions & access')}</div><figure class="lantern-location-map"><a href="/#park-title" aria-label="Explore Osaka Garden and SKYLANDING on the interactive park map"><img src="/images/jackson-park-map.webp" srcset="/images/jackson-park-map-768.webp 768w, /images/jackson-park-map.webp 1536w" sizes="(max-width: 800px) calc(100vw - 44px), 55vw" width="1536" height="1024" loading="lazy" alt="Illustrated Jackson Park map. Marker 1 locates Osaka Garden on northeastern Wooded Island; marker 2 locates SKYLANDING just west of the garden."><span class="lantern-location-pin lantern-location-garden" aria-hidden="true">1</span><span class="lantern-location-pin lantern-location-skylanding" aria-hidden="true">2</span></a><figcaption>Explore the park map ↗</figcaption></figure></section>
  <aside class="source-note"><p>Tradition: <a href="${lanternSources.temple}">Daiyuzenji</a>, <a href="${lanternSources.tradition}">Japan’s cultural guide</a>, and <a href="${lanternSources.hiroshima}">Hiroshima’s organizers</a>.</p></aside>`
};
