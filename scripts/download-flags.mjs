import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const dataJsPath = path.join(ROOT, 'assets', 'data.js');
const outDir = path.join(ROOT, 'assets', 'flags');

async function main() {
  if (!fs.existsSync(dataJsPath)) {
    console.error('assets/data.js not found:', dataJsPath);
    process.exit(1);
  }
  const txt = fs.readFileSync(dataJsPath, 'utf8');
  const codes = Array.from(txt.matchAll(/\bcode:\s*'([A-Z]{2})'/g))
    .map(m => m[1])
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  if (!codes.length) {
    console.error('No country codes found in assets/data.js');
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const results = [];
  for (const code of codes) {
    const lc = code.toLowerCase();
    const url = `https://flagcdn.com/${lc}.svg`;
    const file = path.join(outDir, `${lc}.svg`);
    try {
      const res = await fetch(url, { redirect: 'follow' });
      if (!res.ok) {
        results.push({ code, ok: false, status: res.status });
        continue;
      }
      const svg = await res.text();
      fs.writeFileSync(file, svg, 'utf8');
      results.push({ code, ok: true });
    } catch (e) {
      results.push({ code, ok: false, err: e.message });
    }
  }

  const okCnt = results.filter(r => r.ok).length;
  const fail = results.filter(r => !r.ok);
  console.log(`Downloaded flags: ${okCnt}/${results.length}`);
  if (fail.length) {
    console.warn('Failed:', fail);
    process.exitCode = 2;
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
