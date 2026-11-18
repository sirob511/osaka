import { eventGuide, site, timeline } from './data.mjs';
import { escape, link, pageIntro, photo } from './components.mjs';

const milestoneImages = {
  '1893': {
    file: 'history-phoenix-pavilion', format: 'jpg', width: 1280, height: 874, smallWidth: 640,
    alt: 'Visitors outside Japan’s Phoenix Pavilion on Wooded Island at the 1893 World’s Columbian Exposition.',
    caption: 'The Phoenix Pavilion at the 1893 World’s Fair.', priority: true
  },
  '1981': {
    file: 'garden-bridge', width: 1600, height: 900, smallWidth: 720,
    alt: 'A later view of Osaka Garden’s pond, moon bridge, and planted shoreline, photographed in 2013.',
    caption: 'The garden’s pond and moon bridge, photographed in 2013.'
  },
  '2016': {
    file: 'park-skylanding', width: 640, height: 480, smallWidth: 320,
    alt: 'The twelve steel lotus petals of Yoko Ono’s SKYLANDING beside the garden, photographed in 2018.',
    caption: 'SKYLANDING beside the garden, photographed in 2018.'
  }
};

function milestone([year, title, text]) {
  const image = milestoneImages[year];
  return `<li class="history-milestone${image ? ' has-image' : ''}">
    <time class="history-year" datetime="${year}">${year}</time>
    <article aria-labelledby="history-${year}" class="history-milestone-content">
      <div class="history-milestone-copy"><h2 id="history-${year}">${title}</h2><p>${text}</p></div>
      ${image ? `<figure class="history-image">${photo(image.file, image.alt, { ...image, sizes: '(max-width: 700px) calc(100vw - 76px), (max-width: 1000px) calc(100vw - 250px), 40vw' })}<figcaption>${escape(image.caption)}</figcaption></figure>` : ''}
    </article>
  </li>`;
}

export const historyPage = {
  path: '/history/', title: 'Osaka Garden History — From the 1893 World’s Fair to Today',
  description: 'The essential story of Osaka Garden and the Garden of the Phoenix: the 1893 World’s Fair, renewal, Chicago’s Osaka friendship, and SKYLANDING.',
  className: 'history-page', styles: ['/history.css'],
  content: `${pageIntro('The garden’s <em>story.</em>', 'From the 1893 World’s Fair to the garden on Wooded Island today.')}
    <section class="history-timeline-section wrap" aria-label="Garden history timeline"><ol class="history-timeline" role="list">${timeline.map(milestone).join('')}</ol></section>
    <section class="garden-plans wrap section-space" id="garden-plans" aria-labelledby="garden-plans-title"><div><h2 id="garden-plans-title">Expansion plans</h2></div><div><p>The <a href="${site.sources.garden}">Chicago Park District</a> and <a href="${eventGuide.sources.expansion}">Chicago Parks Foundation</a> publicly describe a revitalization and expansion intended to nearly double the garden’s size. The Parks Foundation identifies itself as the project’s fundraising partner.</p><p>Follow the project partners for fundraising news, design updates, and any construction announcements.</p><p>The separate <a href="${eventGuide.sources.vision}">Vision 130 guide from 2023</a> records design goals and ideas. It should not be treated as a final construction plan or evidence that the expansion is complete.</p></div></section>
    <section class="history-closing wrap section-space"><h2>Two names, one place</h2><p>“Osaka Garden” marks Chicago’s sister-city relationship with Osaka. “Garden of the Phoenix” recalls the original Phoenix Pavilion.</p>${link('/events/', 'Discover park traditions')}</section>`
};
