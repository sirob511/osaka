import { mkdir, rm, cp, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, creditsPage, notFoundPage } from '../src/pages.mjs';
import { layout } from '../src/components.mjs';
import { site } from '../src/data.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export async function build() {
  const dist = join(root, 'dist');
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(join(root, 'public'), dist, { recursive: true });
  const credits = JSON.parse(await readFile(join(root, 'public/images/credits.json'), 'utf8'));
  const all = [...pages, creditsPage(credits)];
  for (const page of all) {
    const output = join(dist, page.path, 'index.html');
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, layout(page));
  }
  await writeFile(join(dist, '404.html'), layout(notFoundPage));
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`);
  await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${all.map(p => `<url><loc>${site.origin}${p.path}</loc><lastmod>${site.modified}</lastmod></url>`).join('')}</urlset>\n`);
  return all.map(p => p.path);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const paths = await build();
  console.log(`Built ${paths.length} pages and a 404 page into dist/.`);
}
