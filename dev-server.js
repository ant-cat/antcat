// dev-server.js — local write server for inline post editing
// Runs on port 4322 alongside `astro dev`. Never ships to production.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, 'src/content/blog');
const PORT = 4322;

const server = http.createServer((req, res) => {
  // CORS for localhost
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4321');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { slug, markdown } = JSON.parse(body);
        if (!slug || !markdown) throw new Error('Missing slug or markdown');

        // Find the file matching this slug (date-prefixed filenames)
        const files = fs.readdirSync(CONTENT_DIR);
        const match = files.find(f => {
          const name = f.replace(/\.mdx?$/, '');
          // slug may be the full filename or the date-stripped version
          return name === slug || name.endsWith('-' + slug) || name === slug.replace(/\//g, '-');
        });

        if (!match) throw new Error(`No file found for slug: ${slug}`);

        const filePath = path.join(CONTENT_DIR, match);
        const existing = fs.readFileSync(filePath, 'utf8');

        // Preserve frontmatter, replace everything after the closing ---
        const fmEnd = existing.indexOf('---', 3);
        if (fmEnd === -1) throw new Error('No frontmatter found');
        const frontmatter = existing.slice(0, fmEnd + 3);
        const newContent = frontmatter + '\n\n' + markdown.trim() + '\n';

        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`[edit] saved ${match}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, file: match }));
      } catch (e) {
        console.error('[edit] error:', e.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404); res.end();
});

server.listen(PORT, () => {
  console.log(`[edit server] listening on http://localhost:${PORT}`);
});
