import fs from 'fs';
import vm from 'vm';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = resolve(__dirname, '../assets/data.js');
const code = fs.readFileSync(dataPath, 'utf8');

// Extract GLS_ITEMS array literal and eval it in a sandbox
let items = [];
const match = code.match(/(?:const|let|var)\s+GLS_ITEMS\s*=\s*(\[[\s\S]*?\]);/);
if (match) {
  try {
    items = vm.runInNewContext('(' + match[1] + ')');
  } catch (e) {
    console.error('Failed to parse GLS_ITEMS:', e.message);
  }
} else {
  console.error('GLS_ITEMS not found in data.js');
}

const urls = [...new Set((items || []).map(it => it && it.url).filter(Boolean))];

function check(url) {
  return new Promise(resolve => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'LinkCheck/1.0 (+https://example.com)' } }, res => {
      const ok = res.statusCode >= 200 && res.statusCode < 400;
      resolve({ url, status: res.statusCode, ok });
      res.resume();
    });
    req.on('error', err => resolve({ url, error: err.message, ok: false }));
    req.setTimeout(10000, () => { req.destroy(new Error('timeout')); });
  });
}

(async () => {
  if (urls.length === 0) {
    console.warn('No URLs found in GLS_ITEMS. Please verify data.js structure.');
  }
  const results = await Promise.all(urls.map(check));
  const bad = results.filter(r => !r.ok);
  if (bad.length) {
    console.log('Broken URLs:');
    for (const r of bad) console.log('-', r.url, r.status || r.error);
    process.exitCode = 1;
  } else {
    console.log('All URLs passed (200–399). Count:', urls.length);
  }
})();
