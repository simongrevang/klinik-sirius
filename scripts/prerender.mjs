// Prerenderer hver rute til statisk HTML. Uden det leverer sitet en tom div til
// alle crawlere der ikke kører JavaScript, og det gælder de fleste AI-crawlere.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ssr = await import(resolve(root, 'dist-ssr/entry-server.js'));
const { render, allRoutes, metaFor, ogFor, canonicalFor, schemasFor, SITE_URL } = ssr;

const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8');

const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

const build = (slug, { noindex = false } = {}) => {
  const { title, desc } = metaFor(slug);
  const og = ogFor(slug);
  const canonical = canonicalFor(slug);

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content="[\s\S]*?" \/>/, `<meta name="description" content="${escape(desc)}" />`)
    .replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${escape(og.title)}" />`)
    .replace(/<meta property="og:description" content="[\s\S]*?" \/>/, `<meta property="og:description" content="${escape(og.desc)}" />`)
    .replace(/<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[\s\S]*?" \/>/, `<meta name="twitter:title" content="${escape(og.title)}" />`)
    .replace(/<meta name="twitter:description" content="[\s\S]*?" \/>/, `<meta name="twitter:description" content="${escape(og.desc)}" />`)
    .replace('<div id="root"></div>', `<div id="root">${render(slug)}</div>`);

  if (noindex) {
    html = html.replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />');
  }

  for (const [id, schema] of Object.entries(schemasFor(slug))) {
    const tag = `<script type="application/ld+json" id="${id}">`;
    if (!html.includes(tag)) throw new Error(`Mangler placeholder for ${id} i index.html`);
    html = html.replace(`${tag}</script>`, `${tag}${schema ? ld(schema) : ''}</script>`);
  }

  return html;
};

const write = (relPath, html) => {
  const out = resolve(root, 'dist', relPath);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, 'utf-8');
};

const routes = allRoutes();
for (const slug of routes) {
  // Filer skrives som sti.html, så nginx slipper for at redirecte til skråstreg til sidst
  write(slug === 'forside' ? 'index.html' : `${slug}.html`, build(slug));
}
write('404.html', build('ikke-fundet', { noindex: true }));

// sitemap.xml genereres ud fra de samme ruter, så den aldrig kan komme bagud
const idag = new Date().toISOString().slice(0, 10);
const prioritet = (slug) =>
  slug === 'forside' ? '1.0'
  : ['hudsygdomme', 'ore-naese-hals', 'haandkirurgi', 'find-os'].includes(slug) ? '0.8'
  : slug === 'privacypolitik' ? '0.3'
  : slug.startsWith('speciallaege-') ? '0.7'
  : slug.startsWith('job') ? '0.6'
  : '0.9';
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((slug) => {
    const loc = slug === 'forside' ? `${SITE_URL}/` : `${SITE_URL}/${slug}`;
    return `  <url><loc>${loc}</loc><lastmod>${idag}</lastmod><priority>${prioritet(slug)}</priority></url>`;
  }),
  '</urlset>',
  '',
].join('\n');
write('sitemap.xml', sitemap);

// llms.txt hjælper AI-crawlere med at finde rundt uden at gætte
const grupper = [
  ['Specialer', ['hudsygdomme', 'ore-naese-hals', 'haandkirurgi']],
  ['Praktisk', ['find-os', 'patientinfo', 'personale', 'job']],
  ['Områder', routes.filter((r) => r.startsWith('speciallaege-'))],
  ['Hudsygdomme', routes.filter((r) => ssr.schemasFor(r)['dynamic-schema']?.relevantSpecialty === 'Dermatology')],
];
const llms = [
  '# Klinik Sirius',
  '',
  '> Privat speciallægepraksis på Søndertoften 22, 6800 Varde. Hudsygdomme, øre, næse og hals samt håndkirurgi. Telefon 32 22 32 24, info@kliniksirius.dk. Åbent hverdage 8 til 16. Dækker Varde og omegn inden for cirka 50 kilometer, herunder Esbjerg, Ribe, Bramming, Ølgod, Oksbøl, Grindsted og Billund.',
  '',
  ...grupper.flatMap(([titel, slugs]) => [
    `## ${titel}`,
    '',
    ...slugs.map((slug) => `- [${metaFor(slug).title.split(' | ')[0]}](${SITE_URL}/${slug}): ${metaFor(slug).desc}`),
    '',
  ]),
].join('\n');
write('llms.txt', llms);

console.log(`prerenderede ${routes.length} sider plus 404, sitemap.xml og llms.txt`);
