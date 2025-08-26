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

const sandbox = { console, GLS_COUNTRIES: undefined, GLS_ITEMS: undefined };
vm.createContext(sandbox);
vm.runInContext(code, sandbox, { filename: 'data.js' });

const items = sandbox.GLS_ITEMS || [];
const urls = [...new Set(items.map(it => it.url).filter(Boolean))];

function check(url) {
  return new Promise(resolve => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, res => {
      resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
      res.resume();
    });
    req.on('error', err => resolve({ url, error: err.message, ok: false }));
    req.setTimeout(10000, () => { req.destroy(new Error('timeout')); });
  });
}

(async () => {
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
