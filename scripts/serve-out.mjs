import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, '..', process.env.OUT_DIR ?? 'out');
const port = Number(process.env.PORT ?? 3000);
const basePath = (process.env.BASE_PATH ?? '/modern-prototype').replace(/\/$/, '');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function stripBasePath(urlPathname) {
  if (urlPathname === basePath) return '/';
  if (urlPathname.startsWith(basePath + '/')) return urlPathname.slice(basePath.length);
  return urlPathname;
}

function safeJoin(root, requestPath) {
  const normalized = path.posix.normalize(requestPath);
  const withoutLeadingSlash = normalized.replace(/^\/+/, '');
  const resolved = path.resolve(root, withoutLeadingSlash);
  const relative = path.relative(root, resolved);
  if (relative === '') return resolved;
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return resolved;
}

async function readFileIfExists(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data;
  } catch {
    return null;
  }
}

async function resolveExportedPath(pathname) {
  if (pathname === '/' || pathname === '') {
    return path.join(outDir, 'index.html');
  }

  const candidateBase = pathname.replace(/^\/+/, '');

  // If request is for a concrete file (has extension), try directly.
  if (path.posix.extname(candidateBase)) {
    return safeJoin(outDir, '/' + candidateBase);
  }

  // Next static export with trailingSlash usually uses /route/index.html
  const indexHtml = safeJoin(outDir, '/' + candidateBase + '/index.html');
  if (indexHtml) return indexHtml;

  // Fallback: /route.html
  const htmlFile = safeJoin(outDir, '/' + candidateBase + '.html');
  if (htmlFile) return htmlFile;

  return null;
}

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);

    // Normalize and apply basePath mapping (so /modern-prototype/... maps into out/)
    const originalPath = reqUrl.pathname;
    const mappedPath = stripBasePath(originalPath);

    // Redirect bare basePath to basePath/ (useful when typing the URL)
    if (originalPath === basePath) {
      res.statusCode = 301;
      res.setHeader('Location', basePath + '/');
      res.end();
      return;
    }

    const target = await resolveExportedPath(mappedPath);
    if (!target) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Not found');
      return;
    }

    const data = await readFileIfExists(target);
    if (!data) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Not found');
      return;
    }

    const ext = path.extname(target);
    res.statusCode = 200;
    res.setHeader('Content-Type', mimeTypes[ext] ?? 'application/octet-stream');
    res.end(data);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Internal server error');
  }
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Serving ${outDir}`);
  // eslint-disable-next-line no-console
  console.log(`Base path: ${basePath}`);
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${port}${basePath}/`);
});
