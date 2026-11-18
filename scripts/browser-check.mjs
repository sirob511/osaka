// Optional integration check. Requires agent-browser and an already-running local preview.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const routes = ['/', '/visit/', '/cherry-blossoms/', '/cherry-blossoms/2027/', '/history/', '/events/', '/credits/'];
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
mkdirSync('test-results', { recursive: true });

try {
  for (const width of process.argv.includes('--interactions-only') ? [] : [1440, 390, 320]) {
    browser('set', 'viewport', String(width), '900');
    for (const route of routes) {
      browser('open', origin + route);
      evaluate('document.fonts.ready.then(() => true)');
      evaluate('document.querySelectorAll("img").forEach(image => image.loading = "eager")');
      browser('wait', '--fn', 'Array.from(document.images).every(image => image.complete && image.naturalWidth > 0)');
      const state = evaluate(`({overflow:document.documentElement.scrollWidth>innerWidth,headings:document.querySelectorAll('h1').length,js:document.documentElement.classList.contains('js'),fonts:document.fonts.check('16px Italiana')&&document.fonts.check('16px "DM Sans"')})`);
      assert.equal(state.overflow, false, `Horizontal overflow on ${route} at ${width}px`);
      assert.equal(state.headings, 1, route);
      assert.equal(state.js, true, `Script not running on ${route}`);
      assert.equal(state.fonts, true, `Font failure on ${route}`);
      if (['/', '/visit/', '/cherry-blossoms/2027/'].includes(route) && width !== 320) {
        browser('screenshot', '--full', `test-results/${route === '/' ? 'home' : route.replaceAll('/', '-')}-${width}.png`);
      }
      console.log(`PASS ${width}px ${route}`);
    }
  }

  browser('set', 'viewport', '390', '900');
  browser('open', origin + '/updates/');
  assert.equal(evaluate('location.pathname + location.hash'), '/history/#garden-plans');
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

  console.log('PASS mobile navigation, keyboard tabs, FAQs, clipboard outcomes, HTTP responses, 404 recovery, and reduced motion.');
} finally {
  browser('close');
}
