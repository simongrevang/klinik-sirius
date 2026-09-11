// Prerenderer jobsiderne til statisk HTML, så Google for Jobs og de AI-crawlere,
// der ikke kører JavaScript, kan læse indhold og JSON-LD direkte i kilden.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { render, jobs, SITE_URL, buildJobPostingSchema } = await import(resolve(root, 'dist-ssr/entry-server.js'));

const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8');

const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

const crumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.item })),
});

const pages = [
  {
    path: 'job',
    title: 'Ledige stillinger | Klinik Sirius, Varde',
    desc: 'Ledige stillinger hos Klinik Sirius, privat speciallægepraksis i Varde. Se de stillinger vi søger at besætte lige nu.',
    schemas: {
      'breadcrumb-schema': crumb([
        { name: 'Forside', item: `${SITE_URL}/` },
        { name: 'Job', item: `${SITE_URL}/job` },
      ]),
    },
  },
  ...jobs.map((job) => ({
    path: job.slug,
    title: job.metaTitle,
    desc: job.metaDesc,
    schemas: {
      'job-schema': buildJobPostingSchema(job),
      'faq-schema': {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: job.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      'breadcrumb-schema': crumb([
        { name: 'Forside', item: `${SITE_URL}/` },
        { name: 'Job', item: `${SITE_URL}/job` },
        { name: job.name, item: `${SITE_URL}/${job.slug}` },
      ]),
    },
  })),
];

for (const page of pages) {
  const canonical = `${SITE_URL}/${page.path}`;
  const markup = render(page.path);

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/<meta name="description" content="[\s\S]*?" \/>/, `<meta name="description" content="${escape(page.desc)}" />`)
    .replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${escape(page.title)}" />`)
    .replace(/<meta property="og:description" content="[\s\S]*?" \/>/, `<meta property="og:description" content="${escape(page.desc)}" />`)
    .replace(/<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[\s\S]*?" \/>/, `<meta name="twitter:title" content="${escape(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[\s\S]*?" \/>/, `<meta name="twitter:description" content="${escape(page.desc)}" />`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

  for (const [id, schema] of Object.entries(page.schemas)) {
    const tag = `<script type="application/ld+json" id="${id}">`;
    if (!html.includes(tag)) throw new Error(`Mangler placeholder for ${id} i index.html`);
    html = html.replace(`${tag}</script>`, `${tag}${ld(schema)}</script>`);
  }

  // Skrives som fil.html frem for mappe/index.html, så nginx slipper for at
  // redirecte til sti med skråstreg til sidst.
  const out = resolve(root, 'dist', `${page.path}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, 'utf-8');
  console.log('prerendered /' + page.path);
}
