import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { build, root } from '../scripts/build.mjs';
import { bloom, site } from '../src/data.mjs';

let routes;
const dist = join(root, 'dist');
const load = path => readFile(join(dist, path, 'index.html'), 'utf8');
before(async () => { routes = await build(); });

test('every page has one heading, unique metadata, valid structured data, and navigation', async () => {
  const titles = new Set();
  for (const path of routes) {
    const html = await load(path);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert(!titles.has(title), `Duplicate title: ${title}`); titles.add(title);
    assert(html.includes(`<link rel="canonical" href="${site.origin}${path}">`), path);
    assert.match(html, /<meta name="description" content="[^"]{30,}/);
    assert.match(html, /<nav[^>]+aria-label="Main navigation"/);
    assert.match(html, /href="#main"/);
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema.url, site.origin + path);
    assert.equal(schema.about.isAccessibleForFree, true);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate IDs on ${path}`);
  }
});

test('all internal links, anchors, responsive images, fonts, and scripts resolve', async () => {
  for (const path of routes) {
    const html = await load(path);
    const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(match => match[1]);
    for (const match of html.matchAll(/srcset="([^"]+)"/g)) refs.push(...match[1].split(',').map(item => item.trim().split(' ')[0]));
    for (const ref of refs) {
      if (!ref.startsWith('/') && !ref.startsWith('#')) continue;
      const url = new URL(ref.replaceAll('&amp;', '&'), site.origin + path);
      const target = join(dist, url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
      assert((await stat(target)).isFile(), `Missing ${ref} on ${path}`);
      if (url.hash) {
        const targetHtml = await readFile(target, 'utf8');
        assert(targetHtml.includes(`id="${url.hash.slice(1)}"`), `Broken anchor ${ref} on ${path}`);
      }
    }
    for (const image of html.matchAll(/<img\b[^>]*>/g)) assert.match(image[0], /\salt="[^"]+"/, `Missing image alt on ${path}`);
  }
  const css = await readFile(join(dist, 'styles.css'), 'utf8');
  for (const match of css.matchAll(/url\('([^']+)'\)/g)) assert((await stat(join(dist, match[1]))).isFile());
});

test('future bloom tracker never substitutes historical observations for live data', async () => {
  const html = await load('/cherry-blossoms/2027/');
  assert.equal(bloom.observationDate, null);
  assert.equal(bloom.peakDate, null);
  assert.match(html, /PRE-SEASON · NO OBSERVATION YET/);
  assert.match(html, /Previous season · For context only/);
  assert.match(html, /historical report, not a forecast for 2027/);
  assert.match(html, /manual, not a live sensor feed/);
});

test('sitemap covers every public page and the error page is not indexed', async () => {
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  for (const path of routes) assert(sitemap.includes(`<loc>${site.origin}${path}</loc>`));
  const errorPage = await readFile(join(dist, '404.html'), 'utf8');
  assert.match(errorPage, /name="robots" content="noindex"/);
  assert.match(errorPage, /Back to the garden/);
  assert(!sitemap.includes('/404/'));
});

test('photographs retain source attribution and license links', async () => {
  const credits = JSON.parse(await readFile(join(root, 'public/images/credits.json'), 'utf8'));
  const html = await load('/credits/');
  for (const credit of credits) {
    assert(credit.artist && credit.source && credit.licenseUrl && credit.changes);
    assert(html.includes(credit.source.replaceAll('&', '&amp;')));
    assert(credit.licenseUrl.startsWith('https://creativecommons.org/'));
  }
});
