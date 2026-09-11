// Én kilde til titler, beskrivelser og JSON-LD. Bruges både af appen i browseren
// og af prerenderen ved build, så de aldrig kan komme ud af trit.
import { services } from './services.js';
import { jobs, SITE_URL, buildJobPostingSchema } from './jobs.js';
import { byer } from './byer.js';
import { forsikring } from './forsikring.js';

export { SITE_URL };

export const allServicesFlat = [
  ...services.hud,
  ...services.onhUndersogelser,
  ...services.onhOperationer,
  ...services.haandkirurgi,
];

export const staticMeta = {
  forside:          { title: 'Klinik Sirius | Speciallæger i Varde, hud og ØNH', desc: 'Klinik Sirius er en privat speciallægeklinik i Varde med speciale i hudsygdomme og øre-, næse- og halssygdomme. Vi betjener patienter fra Varde, Esbjerg og hele Sydvestjylland.' },
  patientinfo:      { title: 'Patientinfo | Klinik Sirius, Varde', desc: 'Praktisk information til patienter hos Klinik Sirius i Varde. Priser, forsikring, åbningstider og hvad du skal medbringe.' },
  personale:        { title: 'Vores personale | Klinik Sirius, Varde', desc: 'Mød speciallægerne bag Klinik Sirius i Varde. Jalal Taha Saadi varetager øre, næse og hals, og Jerzy Stiasny varetager håndkirurgi.' },
  'find-os':        { title: 'Find os | Klinik Sirius, Søndertoften 22, Varde', desc: 'Find Klinik Sirius på Søndertoften 22, 6800 Varde. Book tid online eller ring på 32 22 32 24.' },
  privacypolitik:   { title: 'Privatlivspolitik | Klinik Sirius, Varde', desc: 'Privatlivspolitik for Klinik Sirius, privat speciallægepraksis i Varde.' },
  hudsygdomme:      { title: 'Hudsygdomme i Varde | Klinik Sirius', desc: 'Klinik Sirius tilbyder speciallægevurdering og behandling af alle former for hudsygdomme i Varde. Vi udreder eksem, psoriasis, modermærker, hudkræft og meget mere.' },
  'ore-naese-hals': { title: 'Øre, Næse & Hals i Varde | Klinik Sirius', desc: 'Klinik Sirius tilbyder et bredt spektrum af ØNH-undersøgelser og operationer i Varde. Speciallæge Jalal Taha Saadi varetager alt fra allergiudredning til avanceret kirurgi.' },
  haandkirurgi:     { title: 'Håndkirurgi i Varde | Klinik Sirius', desc: 'Klinik Sirius tilbyder specialiseret håndkirurgi i Varde med Dr. med. Jerzy Stiasny. Vi behandler nerveafklemninger, seneskedebetændelse, ganglion, Dupuytrens kontraktur og meget mere.' },
  sundhedsforsikring: { title: forsikring.metaTitle, desc: forsikring.metaDesc },
  job:              { title: 'Ledige stillinger | Klinik Sirius, Varde', desc: 'Ledige stillinger hos Klinik Sirius, privat speciallægepraksis i Varde. Se de stillinger vi søger at besætte lige nu.' },
  'ikke-fundet':    { title: 'Siden findes ikke | Klinik Sirius, Varde', desc: 'Siden findes ikke. Find i stedet vej til Klinik Sirius i Varde, vores specialer eller kontaktoplysninger.' },
};

export const pathFor = (slug) => (slug === 'forside' ? '/' : `/${slug}`);
export const canonicalFor = (slug) => `${SITE_URL}${pathFor(slug)}`;

const categoryName = (cat) =>
  cat === 'hud' ? 'Hudsygdomme' : cat === 'haand' ? 'Håndkirurgi' : 'Øre, Næse & Hals';

const categorySlug = (cat) =>
  cat === 'hud' ? 'hudsygdomme' : cat === 'haand' ? 'haandkirurgi' : 'ore-naese-hals';

export const metaFor = (slug) => {
  if (slug === forsikring.slug) return { title: forsikring.metaTitle, desc: forsikring.metaDesc };

  const by = byer.find((b) => b.slug === slug);
  if (by) return { title: by.metaTitle, desc: by.metaDesc };

  const job = jobs.find((j) => j.slug === slug);
  if (job) return { title: job.metaTitle, desc: job.metaDesc };

  const service = allServicesFlat.find((s) => s.slug === slug);
  if (service) {
    return {
      title: `${service.title} i Varde | Klinik Sirius`,
      desc: `${service.shortIntro} Klinik Sirius er en privat speciallægepraksis i Varde, der betjener patienter fra Esbjerg og hele Sydvestjylland.`,
    };
  }

  return staticMeta[slug] || staticMeta.forside;
};

export const ogFor = (slug) => {
  const service = allServicesFlat.find((s) => s.slug === slug);
  if (service && !jobs.some((j) => j.slug === slug)) {
    return { title: `${service.title} i Varde | Klinik Sirius`, desc: `${service.shortIntro} Klinik Sirius, Varde.` };
  }
  return metaFor(slug);
};

const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

const crumbs = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    ...(it.item ? { item: it.item } : {}),
  })),
});

// Returnerer indholdet til de fire faste JSON-LD-pladser i index.html.
// null betyder tom plads.
export const schemasFor = (slug) => {
  const out = { 'dynamic-schema': null, 'job-schema': null, 'faq-schema': null, 'breadcrumb-schema': null };
  const job = jobs.find((j) => j.slug === slug);
  const service = allServicesFlat.find((s) => s.slug === slug);

  if (job) {
    out['job-schema'] = buildJobPostingSchema(job);
    if (job.faq?.length) out['faq-schema'] = faqSchema(job.faq);
    out['breadcrumb-schema'] = crumbs([
      { name: 'Forside', item: `${SITE_URL}/` },
      { name: 'Job', item: `${SITE_URL}/job` },
      { name: job.name, item: canonicalFor(slug) },
    ]);
    return out;
  }

  if (service) {
    out['dynamic-schema'] = {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: service.title,
      description: service.shortIntro,
      procedureType: 'https://schema.org/TherapeuticProcedure',
      relevantSpecialty: service.category === 'hud' ? 'Dermatology' : service.category === 'haand' ? 'PlasticSurgery' : 'Otolaryngology',
      recognizingAuthority: { '@type': 'Organization', name: 'Klinik Sirius, Varde' },
    };
    if (service.faq?.length) out['faq-schema'] = faqSchema(service.faq);
    out['breadcrumb-schema'] = crumbs([
      { name: 'Forside', item: `${SITE_URL}/` },
      { name: categoryName(service.category), item: `${SITE_URL}/${categorySlug(service.category)}` },
      { name: service.title, item: canonicalFor(slug) },
    ]);
    return out;
  }

  const by = byer.find((b) => b.slug === slug);
  if (by) {
    out['faq-schema'] = faqSchema(by.faq);
    out['breadcrumb-schema'] = crumbs([
      { name: 'Forside', item: `${SITE_URL}/` },
      { name: 'Find os', item: `${SITE_URL}/find-os` },
      { name: `Speciallæge for patienter fra ${by.by}`, item: canonicalFor(slug) },
    ]);
    out['dynamic-schema'] = {
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      name: 'Klinik Sirius',
      url: canonicalFor(slug),
      telephone: '+4532223224',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Søndertoften 22',
        addressLocality: 'Varde',
        postalCode: '6800',
        addressRegion: 'Syddanmark',
        addressCountry: 'DK',
      },
      areaServed: [
        { '@type': 'City', name: by.by },
        ...by.naboer.map((n) => ({ '@type': 'Place', name: n.navn })),
      ],
      medicalSpecialty: ['Dermatology', 'Otolaryngology', 'PlasticSurgery'],
    };
    return out;
  }

  if (slug === forsikring.slug) {
    out['faq-schema'] = faqSchema(forsikring.faq);
    out['breadcrumb-schema'] = crumbs([
      { name: 'Forside', item: `${SITE_URL}/` },
      { name: 'Sundhedsforsikring', item: canonicalFor(slug) },
    ]);
    return out;
  }

  if (slug === 'job') {
    out['breadcrumb-schema'] = crumbs([
      { name: 'Forside', item: `${SITE_URL}/` },
      { name: 'Job', item: `${SITE_URL}/job` },
    ]);
    return out;
  }

  if (['hudsygdomme', 'ore-naese-hals', 'haandkirurgi', 'patientinfo', 'personale', 'find-os', 'privacypolitik'].includes(slug)) {
    out['breadcrumb-schema'] = crumbs([
      { name: 'Forside', item: `${SITE_URL}/` },
      { name: staticMeta[slug].title.split(' | ')[0], item: canonicalFor(slug) },
    ]);
  }

  return out;
};

// Alle ruter der skal prerenderes til statisk HTML.
export const allRoutes = () => [
  'forside',
  'hudsygdomme',
  'ore-naese-hals',
  'haandkirurgi',
  'patientinfo',
  'personale',
  'find-os',
  'privacypolitik',
  'job',
  'sundhedsforsikring',
  ...jobs.map((j) => j.slug),
  ...allServicesFlat.map((s) => s.slug),
  ...byer.map((b) => b.slug),
];
