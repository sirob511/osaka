import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { build, root } from './build.mjs';

await build();
const dist = resolve(root, 'dist');
const { redirects = [] } = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.json': 'application/json' };
const port = Number(process.env.PORT || 4173);
const server = createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const redirect = redirects.find(rule => rule.source.replace(/\/$/, '') === pathname.replace(/\/$/, ''));
    if (redirect) {
      const destination = new URL(redirect.destination, url);
      destination.search = url.search;
      res.writeHead(redirect.permanent ? 308 : 307, { Location: destination.pathname + destination.search + destination.hash });
      res.end(); return;
    }
    let file = resolve(dist, '.' + pathname);
    if (file !== dist && !file.startsWith(dist + sep)) { res.writeHead(403); res.end('Forbidden'); return; }
    try {
      if ((await stat(file)).isDirectory()) {
        if (!pathname.endsWith('/')) { res.writeHead(308, { Location: url.pathname + '/' + url.search }); res.end(); return; }
        file = resolve(file, 'index.html');
      }
      const data = await readFile(file);
      res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch (error) {
      if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error;
      const data = await readFile(resolve(dist, '404.html'));
      res.writeHead(404, { 'Content-Type': mime['.html'] }); res.end(req.method === 'HEAD' ? undefined : data);
    }
  } catch { res.writeHead(400); res.end('Bad request'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Osaka Garden preview: http://127.0.0.1:${port}`));
