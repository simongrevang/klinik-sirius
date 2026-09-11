// Bruges kun til staging. Sætter noindex på alle HTML-filer og lukker robots.txt,
// så testmiljøet aldrig havner i et søgeindeks.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf-8').replace(
    /<meta name="robots" content="[^"]*" \/>/,
    '<meta name="robots" content="noindex, nofollow" />',
  );
  writeFileSync(file, html, 'utf-8');
}

writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf-8');
console.log('staging: noindex sat på alle sider');
