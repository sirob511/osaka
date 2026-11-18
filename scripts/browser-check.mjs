// Optional integration check. Requires agent-browser and an already-running local preview.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const routes = ['/', '/visit/', '/cherry-blossoms/', '/history/', '/events/', '/toro-nagashi/', '/credits/'];
const sessionBase = `osaka-qa-${process.pid}`;
function browser(...args) {
  const result = JSON.parse(execFileSync('agent-browser', ['--session', sessionBase, '--json', ...args], { encoding: 'utf8', timeout: 45000 }));
  assert(result.success, result.error || `Failed: ${args[0]}`);
  return result.data;
}
function evaluate(code) { return browser('eval', code).result; }
function click(selector) {
  browser('scrollintoview', selector);
  browser('click', selector);
}
const lanternCases = [
  ['message', 'A message', 'Names, memories, or hopes for peace.'],
  ['light', 'A light', 'In the Obon tradition, a guide for returning spirits.'],
  ['water', 'On the water', 'Paper lanterns float on a small base.'],
  ['garden', 'Osaka Garden pond', 'The garden’s water setting on northern Wooded Island.'],
  ['skylanding', 'Yoko Ono’s SKYLANDING', 'Twelve rising petals beside the garden entrance.']
];
const lanternSelector = place => `.lantern-hotspot.lantern-marker-${place}`;
function focusLantern(place) {
  evaluate(`(() => { const summary = document.querySelector(${JSON.stringify(lanternSelector(place) + ' summary')}); summary.scrollIntoView({block:'center',behavior:'instant'}); summary.focus({preventScroll:true}); })()`);
}
function lanternIsOpen(place) { return evaluate(`document.querySelector(${JSON.stringify(lanternSelector(place))}).open`); }
function lanternPins() {
  return evaluate(`Array.from(document.querySelectorAll('.lantern-hotspot'), hotspot => {
    const pin = hotspot.querySelector('summary').getBoundingClientRect();
    const art = hotspot.closest('.lantern-art').getBoundingClientRect();
    return {group:hotspot.name,x:pin.x-art.x,y:pin.y-art.y,w:pin.width,h:pin.height};
  })`);
}
function assertLanternCard(place, title, description, context) {
  const state = evaluate(`(() => {
    const hotspot = document.querySelector(${JSON.stringify(lanternSelector(place))});
    const card = hotspot.querySelector('.lantern-hotspot-card');
    const bounds = card.getBoundingClientRect();
    return {open:hotspot.open,title:card.querySelector('strong').textContent,description:card.querySelector('p').textContent,
      visible:card.checkVisibility(),left:bounds.left,right:bounds.right,top:bounds.top,bottom:bounds.bottom,
      viewportWidth:innerWidth,viewportHeight:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth};
  })()`);
  assert.equal(state.open, true, `${context}: ${place} did not open`);
  assert.equal(state.visible, true, `${context}: ${place} card is hidden`);
  assert.equal(state.title, title, `${context}: incorrect marker title`);
  assert.equal(state.description, description, `${context}: incorrect marker explanation`);
  assert(state.left >= -1 && state.right <= state.viewportWidth + 1, `${context}: ${place} card exceeds viewport width`);
  assert(state.top >= -1 && state.bottom <= state.viewportHeight + 1, `${context}: ${place} card exceeds viewport height`);
  assert.equal(state.overflow, false, `${context}: ${place} caused horizontal overflow`);
}
function checkLanternLayout(width) {
  const pins = lanternPins();
  assert.equal(pins.length, 5, 'Expected three lantern and two location markers');
  for (const pin of pins) assert(pin.w >= 44 && pin.h >= 44, `Lantern target below 44px at ${width}px`);
  for (let i=0;i<pins.length;i++) for (let j=i+1;j<pins.length;j++) {
    const a=pins[i], b=pins[j];
    if (a.group !== b.group) continue;
    assert(!(a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y), `Overlapping lantern targets ${i}/${j} at ${width}px`);
  }
  for (const [place, title, description] of lanternCases) {
    focusLantern(place);
    const before = lanternPins();
    browser('click', lanternSelector(place) + ' summary');
    assertLanternCard(place, title, description, `${width}px`);
    const after = lanternPins();
    after.forEach((pin, index) => {
      assert(Math.abs(pin.x-before[index].x) < 1 && Math.abs(pin.y-before[index].y) < 1,
        `Opening ${place} moved marker ${index} at ${width}px`);
    });
    browser('click', lanternSelector(place) + ' summary');
    assert.equal(lanternIsOpen(place), false, `Clicking ${place} again must close its card`);
  }
}
mkdirSync('test-results', { recursive: true });

try {
  for (const width of process.argv.includes('--interactions-only') ? [] : [1440, 390, 320]) {
    browser('set', 'viewport', String(width), '900');
    for (const route of routes) {
      browser('open', origin + route);
      evaluate('document.fonts.ready.then(() => true)');
      evaluate('document.querySelectorAll("img").forEach(image => image.loading = "eager")');
      browser('wait', '--fn', 'Array.from(document.images).every(image => image.complete && image.naturalWidth > 0)');
      const state = evaluate(`({overflow:document.documentElement.scrollWidth>innerWidth,headings:document.querySelectorAll('h1').length,js:document.documentElement.classList.contains('js'),fonts:document.fonts.check('16px "Yuji Syuku"')&&document.fonts.check('24px Italiana')&&document.fonts.check('18px "Zen Old Mincho"')&&document.fonts.check('16px "DM Sans"')})`);
      assert.equal(state.overflow, false, `Horizontal overflow on ${route} at ${width}px`);
      assert.equal(state.headings, 1, route);
      assert.equal(state.js, true, `Script not running on ${route}`);
      assert.equal(state.fonts, true, `Font failure on ${route}`);
      if (route === '/') {
        const map = evaluate(`({visible:document.querySelectorAll('.park-place:not([hidden])').length,selected:document.querySelector('[data-park-place][aria-pressed=true]').dataset.parkPlace,pins:[...document.querySelectorAll('.park-pin')].map(pin=>{const r=pin.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})})`);
        assert.equal(map.visible, 1);
        assert.equal(map.selected, 'garden');
        for (const pin of map.pins) assert(pin.w >= 44 && pin.h >= 44, 'Map target below 44px');
        if (width <= 390) for (let i=0;i<map.pins.length;i++) for (let j=i+1;j<map.pins.length;j++) {
          const a=map.pins[i], b=map.pins[j];
          assert(!(a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y), `Overlapping map targets ${i}/${j} at ${width}px`);
        }
      }
      if (route === '/toro-nagashi/') checkLanternLayout(width);
      if (['/', '/visit/', '/cherry-blossoms/', '/toro-nagashi/'].includes(route) && width !== 320) {
        browser('screenshot', '--full', `test-results/${route === '/' ? 'home' : route.replaceAll('/', '-')}-${width}.png`);
      }
      console.log(`PASS ${width}px ${route}`);
    }
  }

  browser('set', 'viewport', '390', '900');
  browser('open', origin + '/');
  for (const place of ['skylanding', 'museum', 'basin', 'meadow', 'republic', 'obama-center', 'garden']) {
    click(`[data-park-place="${place}"]`);
    assert.equal(evaluate('document.querySelector(".park-place:not([hidden])").id'), `park-place-${place}`);
    assert.equal(evaluate('document.querySelector("#park-place-picker").value'), place);
    assert.equal(evaluate('document.querySelectorAll("[data-park-place][aria-pressed=true]").length'), 1);
  }
  browser('press', 'ArrowRight');
  assert.equal(evaluate('document.activeElement.dataset.parkPlace'), 'skylanding');
  browser('press', 'End');
  assert.equal(evaluate('document.activeElement.dataset.parkPlace'), 'obama-center');
  browser('press', 'Home');
  assert.equal(evaluate('document.activeElement.dataset.parkPlace'), 'garden');
  browser('select', '#park-place-picker', 'skylanding');
  assert.equal(evaluate('document.querySelector(".park-place:not([hidden])").id'), 'park-place-skylanding');
  browser('set', 'media', 'light', 'reduced-motion');
  assert.equal(evaluate('getComputedStyle(document.querySelector(".park-pin[aria-pressed=true] .park-pin-number"),"::after").animationName'), 'none');
  browser('network', 'route', origin + '/main.js', '--abort');
  browser('open', origin + '/?fallback-check=1');
  assert.equal(evaluate('document.documentElement.classList.contains("js")'), false);
  assert.equal(evaluate('[...document.querySelectorAll(".park-place")].filter(panel=>getComputedStyle(panel).display!=="none").length'), 7);
  // Header enhancement must not wait for, or depend on, the deferred content script.
  assert.equal(evaluate('document.documentElement.classList.contains("nav-ready")'), true);
  assert.equal(evaluate('document.querySelector(".site-header").getBoundingClientRect().height'), 66);
  click('.menu-toggle');
  assert.equal(evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'true');
  browser('press', 'Escape');
  assert.equal(evaluate('document.activeElement.classList.contains("menu-toggle")'), true);
  assert.equal(evaluate('document.querySelector(".site-header").getBoundingClientRect().height'), 66);
  browser('network', 'unroute', origin + '/main.js');
  console.log('PASS map hotspots, keyboard selection, place picker, reduced motion, script-free facts, and independent header initialization.');

  browser('open', origin + '/toro-nagashi/');
  evaluate('document.fonts.ready.then(() => true)');
  focusLantern('message');
  browser('press', 'Enter');
  assert.equal(lanternIsOpen('message'), true, 'Enter must open a lantern disclosure');
  browser('press', 'Space');
  assert.equal(lanternIsOpen('message'), false, 'Space must close an open disclosure');
  browser('press', 'Space');
  assert.equal(lanternIsOpen('message'), true, 'Space must open a closed disclosure');
  browser('press', 'Tab');
  assert.equal(evaluate('document.activeElement.matches(".lantern-marker-message .lantern-hotspot-close")'), true);
  browser('press', 'Escape');
  assert.equal(lanternIsOpen('message'), false, 'Escape from card controls must close the disclosure');
  assert.equal(evaluate('document.activeElement.matches(".lantern-marker-message summary")'), true, 'Escape must return focus to its marker');
  browser('press', 'Enter');
  click('.lantern-marker-message .lantern-hotspot-card p');
  assert.equal(lanternIsOpen('message'), true, 'Clicking explanation text must keep its card open');
  browser('press', 'Escape');
  assert.equal(lanternIsOpen('message'), false, 'Escape must also work after clicking non-focusable explanation text');
  assert.equal(evaluate('document.activeElement.matches(".lantern-marker-message summary")'), true);
  browser('press', 'Enter');
  click('.lantern-marker-message .lantern-hotspot-close');
  assert.equal(lanternIsOpen('message'), false);
  assert.equal(evaluate('document.activeElement.matches(".lantern-marker-message summary")'), true, 'Close button must return focus to its marker');
  for (const [first, second] of [['message', 'light'], ['garden', 'skylanding']]) {
    focusLantern(first);
    browser('press', 'Enter');
    focusLantern(second);
    browser('press', 'Enter');
    assert.equal(lanternIsOpen(first), false, 'Opening another marker in the same image must close the previous card');
    assert.equal(lanternIsOpen(second), true);
    browser('press', 'Escape');
    assert.equal(lanternIsOpen(second), false);
  }
  focusLantern('water');
  browser('press', 'Enter');
  click('.menu-toggle');
  assert.equal(evaluate('document.querySelectorAll(".lantern-hotspot[open]").length'), 0, 'Outside click must dismiss the card');
  assert.equal(evaluate('document.activeElement.matches(".menu-toggle")'), true, 'Outside dismissal must not steal focus');
  browser('press', 'Escape');

  browser('network', 'route', origin + '/main.js', '--abort');
  browser('open', origin + '/toro-nagashi/?fallback-check=1');
  assert.equal(evaluate('document.documentElement.classList.contains("js")'), false);
  evaluate('document.fonts.ready.then(() => true)');
  evaluate('document.querySelectorAll("img").forEach(image => image.loading = "eager")');
  browser('wait', '--fn', 'Array.from(document.images).every(image => image.complete && image.naturalWidth > 0)');
  assert.equal(evaluate('[...document.querySelectorAll(".lantern-hotspot-close")].every(button=>button.hidden)'), true,
    'Script-only close buttons must remain hidden when JavaScript fails');
  for (const [place, title, description] of lanternCases) {
    focusLantern(place);
    browser('press', 'Enter');
    assertLanternCard(place, title, description, 'Without main.js');
    browser('press', 'Space');
    assert.equal(lanternIsOpen(place), false, `Native summary must close ${place} without JavaScript`);
  }
  focusLantern('message');
  browser('press', 'Enter');
  focusLantern('light');
  browser('press', 'Enter');
  assert.equal(lanternIsOpen('message'), false, 'Native same-image exclusivity must work without main.js');
  assert.equal(lanternIsOpen('light'), true);
  browser('press', 'Space');
  click('.lantern-location-map figcaption a');
  assert.equal(evaluate('location.pathname + location.hash'), '/#park-title', 'The full park map link must remain functional');
  browser('network', 'unroute', origin + '/main.js');
  console.log('PASS lantern marker explanations, keyboard disclosure controls, dismissal focus, same-image exclusivity, and script-free interaction.');

  browser('open', origin + '/updates/');
  assert.equal(evaluate('location.pathname + location.hash'), '/history/#garden-plans');
  browser('open', origin + '/cherry-blossoms/2027/');
  assert.equal(evaluate('location.pathname + location.hash'), '/cherry-blossoms/#bloom-updates');
  assert.equal(evaluate('document.querySelector(location.hash) !== null'), true);
  browser('open', origin + '/visit/');
  browser('set', 'media', 'light', 'reduced-motion');
  assert.equal(evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches'), true);
  assert.equal(evaluate('getComputedStyle(document.documentElement).scrollBehavior'), 'auto');
  click('.menu-toggle');
  assert.equal(evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'true');
  browser('press', 'Escape');
  assert.equal(evaluate('document.activeElement.classList.contains("menu-toggle")'), true);
  assert.equal(evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false');
  click('.menu-toggle');
  browser('set', 'viewport', '1440', '900');
  browser('wait', '--fn', 'document.querySelector(".menu-toggle").getAttribute("aria-expanded")==="false"');
  browser('set', 'viewport', '390', '900');
  assert.equal(evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false');

  click('#tab-car');
  assert.equal(evaluate('document.querySelector("#panel-car").hidden'), false);
  browser('press', 'ArrowLeft');
  assert.equal(evaluate('document.activeElement.id'), 'tab-transit');
  assert.equal(evaluate('document.querySelector("#panel-transit").hidden'), false);
  browser('press', 'Home');
  assert.equal(evaluate('document.activeElement.id'), 'tab-walk');
  browser('press', 'End');
  assert.equal(evaluate('document.activeElement.id'), 'tab-car');
  assert.equal(evaluate('Array.from(document.querySelectorAll("[role=tab]")).filter(tab=>tab.tabIndex===0).length'), 1);

  click('.faqs details:first-child summary');
  assert.equal(evaluate('document.querySelector(".faqs details").open'), true);
  click('.faqs details:first-child summary');
  assert.equal(evaluate('document.querySelector(".faqs details").open'), false);

  // Verify both browser capability outcomes, including explicit permission denial.
  evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.copiedAddress=text}}})');
  click('[data-copy-address]');
  browser('wait', '--fn', 'document.querySelector(".copy-feedback").textContent.includes("Address copied")');
  assert.equal(evaluate('window.copiedAddress'), '5900 S. Cornell Dr., Chicago, IL 60637');
  evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async()=>{throw new Error("Denied")}}})');
  click('[data-copy-address]');
  browser('wait', '--fn', 'document.querySelector(".copy-feedback").textContent.includes("Copy this address:")');

  const status = evaluate(`(async()=>({missing:(await fetch('/missing-page/')).status,head:(await fetch('/visit/',{method:'HEAD'})).status,post:(await fetch('/visit/',{method:'POST'})).status,redirect:(await fetch('/visit')).url}))()`);
  assert.equal(status.missing, 404); assert.equal(status.head, 200); assert.equal(status.post, 405);
  assert.equal(status.redirect, origin + '/visit/');
  browser('open', origin + '/missing-page/');
  assert(evaluate('document.querySelector("h1").textContent.includes("Page not found")'));
  click('.not-found .button');
  assert.equal(evaluate('location.pathname'), '/');

  console.log('PASS retired-page redirects, mobile navigation, keyboard tabs, FAQs, clipboard outcomes, HTTP responses, 404 recovery, and reduced motion.');
} finally {
  browser('close');
}
