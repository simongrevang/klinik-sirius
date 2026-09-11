// Én kilde til titler, beskrivelser og JSON-LD. Bruges både af appen i browseren
// og af prerenderen ved build, så de aldrig kan komme ud af trit.
import { services } from './services.js';
import { jobs, SITE_URL, buildJobPostingSchema } from './jobs.js';
import { byer } from './byer.js';
import { forsikring } from './forsikring.js';
import { staff } from './staff.js';
import { sdType, kropsdel, speciale } from './sdtyper.js';

export { SITE_URL };

// Sættes ved build. Bruges som lastReviewed på hver side.
export const SIDST_OPDATERET = new Date().toISOString().slice(0, 10);

export const allServicesFlat = [
  ...services.hud,
  ...services.onhUndersogelser,
  ...services.onhOperationer,
  ...services.haandkirurgi,
];

export const staticMeta = {
  forside:          { title: 'Klinik Sirius | Speciallæger i Varde, hud og ØNH', desc: 'Privat speciallægeklinik i Varde med hudsygdomme, øre, næse og hals samt håndkirurgi. Kort ventetid for patienter fra Varde, Esbjerg og Sydvestjylland.' },
  patientinfo:      { title: 'Patientinfo | Klinik Sirius, Varde', desc: 'Praktisk information til patienter hos Klinik Sirius i Varde. Priser, forsikring, åbningstider og hvad du skal medbringe.' },
  personale:        { title: 'Speciallægerne i Varde | Klinik Sirius', desc: 'Mød speciallægerne bag Klinik Sirius i Varde. Jalal Taha Saadi varetager øre, næse og hals, og Jerzy Stiasny varetager håndkirurgi.' },
  'find-os':        { title: 'Find os i Varde | Klinik Sirius, Søndertoften 22', desc: 'Klinik Sirius ligger på Søndertoften 22 i Varde med gratis parkering ved døren. Se køretid fra Esbjerg, Ribe, Grindsted og resten af området.' },
  privacypolitik:   { title: 'Privatlivspolitik | Klinik Sirius, Varde', desc: 'Sådan behandler Klinik Sirius i Varde dine personoplysninger og helbredsdata, hvor længe vi gemmer dem, og hvilke rettigheder du har.' },
  hudsygdomme:      { title: 'Hudsygdomme i Varde | Klinik Sirius', desc: 'Speciallægevurdering og behandling af eksem, psoriasis, rosacea, akne og modermærker. Klinik Sirius i Varde, ring 32 22 32 24.' },
  'ore-naese-hals': { title: 'Øre, Næse & Hals i Varde | Klinik Sirius', desc: 'Undersøgelser og operationer inden for øre, næse og hals ved speciallæge Jalal Taha Saadi. Klinik Sirius i Varde, ring 32 22 32 24.' },
  haandkirurgi:     { title: 'Håndkirurgi i Varde | Klinik Sirius', desc: 'Nerveafklemninger, springfinger, ganglion og Dupuytrens kontraktur behandlet af dr. med. Jerzy Stiasny. Klinik Sirius i Varde.' },
  sundhedsforsikring: { title: forsikring.metaTitle, desc: forsikring.metaDesc },
  job:              { title: 'Ledige stillinger | Klinik Sirius, Varde', desc: 'Ledige stillinger hos Klinik Sirius, privat speciallægepraksis i Varde. Se de stillinger vi søger at besætte lige nu.' },
  'ikke-fundet':    { title: 'Siden findes ikke | Klinik Sirius, Varde', desc: 'Siden findes ikke. Find i stedet vej til Klinik Sirius i Varde, vores specialer eller kontaktoplysninger.' },
};


// Titler og beskrivelser bygges efter faste regler, så de holder sig inden for
// det Google viser: titel op til 60 tegn, beskrivelse mellem 120 og 158.
const BRAND = ' | Klinik Sirius';

const titelFor = (service) => {
  const kort = `${service.name} i Varde${BRAND}`;
  const lang = `${service.title} i Varde${BRAND}`;
  if (kort.length < 42 && lang.length <= 60) return lang;
  if (kort.length <= 60) return kort;
  return `${service.name}${BRAND}`;
};

// Klipper ved sidste hele sætning inden for grænsen
const heleSaetninger = (tekst, graense) => {
  if (tekst.length <= graense) return tekst;
  const klip = tekst.slice(0, graense + 1);
  const punkt = Math.max(klip.lastIndexOf('. '), klip.lastIndexOf('! '), klip.lastIndexOf('? '));
  return punkt > 60 ? tekst.slice(0, punkt + 1) : '';
};

const beskrivelseFor = (service) => {
  if (service.metaDesc) return service.metaDesc;
  const intro = service.shortIntro.trim();
  const base = heleSaetninger(intro, 132) || intro.slice(0, 132).replace(/[\s,]+\S*$/, '') + '.';
  const harVarde = /Varde/.test(base);
  const harBrand = /Klinik Sirius/.test(base);
  const hale = harVarde && harBrand ? ' Ring 32 22 32 24.'
    : harBrand ? ' Klinikken ligger i Varde.'
    : harVarde ? ' Klinik Sirius, privat speciallægepraksis.'
    : ' Klinik Sirius, speciallæge i Varde.';
  const fuld = base + hale;
  return fuld.length <= 160 ? fuld : base;
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
  if (service) return { title: titelFor(service), desc: beskrivelseFor(service) };

  return staticMeta[slug] || staticMeta.forside;
};

export const ogFor = (slug) => {
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

const ID = {
  website: `${SITE_URL}/#website`,
  klinik: `${SITE_URL}/#klinik`,
  sted: `${SITE_URL}/#sted`,
};

const laegeId = (navn) => `${SITE_URL}/personale#${navn.toLowerCase().replace(/\s+/g, '-').replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa')}`;

const adresse = {
  '@type': 'PostalAddress',
  streetAddress: 'Søndertoften 22',
  addressLocality: 'Varde',
  postalCode: '6800',
  addressRegion: 'Syddanmark',
  addressCountry: 'DK',
};

const physicianNode = (p) => {
  const felt = (label) => p.details?.find((d) => d.label === label)?.items || [];
  const uddannelse = [...felt('Uddannelse'), ...felt('Baggrund')];
  const medlem = [...felt('Medlemskaber'), ...felt('Autoritet')];
  return {
    // Person, ikke Physician. Physician er en organisationstype i schema.org,
    // og så er jobTitle, worksFor og alumniOf ikke gyldige egenskaber.
    '@type': 'Person',
    '@id': laegeId(p.name),
    name: p.name,
    jobTitle: p.role,
    description: p.summary,
    knowsAbout: p.expertise,
    worksFor: { '@id': ID.klinik },
    hasOccupation: {
      '@type': 'Occupation',
      name: p.role,
      occupationalCategory: '2212 Speciallæger',
    },
    ...(p.image ? { image: `${SITE_URL}${p.image}` } : {}),
    ...(uddannelse.length ? { alumniOf: uddannelse.map((u) => ({ '@type': 'EducationalOrganization', name: u })) } : {}),
    ...(medlem.length ? { memberOf: medlem.map((m) => ({ '@type': 'Organization', name: m })) } : {}),
  };
};

const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': ID.website,
  url: `${SITE_URL}/`,
  name: 'Klinik Sirius',
  inLanguage: 'da-DK',
  publisher: { '@id': ID.klinik },
});

const klinikNode = () => ({
  '@type': 'MedicalClinic',
  '@id': ID.klinik,
  name: 'Klinik Sirius',
  url: `${SITE_URL}/`,
  telephone: '+4532223224',
  email: 'info@kliniksirius.dk',
  vatID: 'DK43033018',
  address: adresse,
  geo: { '@type': 'GeoCoordinates', latitude: 55.6038, longitude: 8.4839 },
  hasMap: 'https://maps.google.com/?q=S%C3%B8ndertoften+22,+6800+Varde',
  image: `${SITE_URL}/img/hero-1600.webp`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/img/hero-1600.webp` },
  knowsLanguage: ['da', 'en'],
  medicalSpecialty: ['Dermatology', 'Otolaryngologic', 'PlasticSurgery'],
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 55.6038, longitude: 8.4839 },
    geoRadius: '50000',
    description: 'Varde og omegn inden for 50 kilometer, herunder Esbjerg, Ribe, Bramming, Ølgod, Oksbøl, Grindsted og Billund',
  },
  serviceArea: ['Varde', 'Esbjerg', 'Ribe', 'Bramming', 'Ølgod', 'Oksbøl', 'Grindsted', 'Billund']
    .map((n) => ({ '@type': 'City', name: n })),
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '16:00',
  }],
  employee: staff.map((p) => ({ '@id': laegeId(p.name) })),
  availableService: [
    { '@type': 'MedicalTherapy', name: 'Hudsygdomme', url: `${SITE_URL}/hudsygdomme` },
    { '@type': 'MedicalTherapy', name: 'Øre, næse og hals', url: `${SITE_URL}/ore-naese-hals` },
    { '@type': 'MedicalTherapy', name: 'Håndkirurgi', url: `${SITE_URL}/haandkirurgi` },
  ],
});

const emneNode = (service, canonical) => {
  const id = `${canonical}#emne`;
  const faelles = {
    '@id': id,
    name: service.name,
    description: service.shortIntro,
    relevantSpecialty: speciale[service.category],
  };
  const type = sdType[service.slug];
  if (type === 'condition') {
    return {
      ...faelles,
      '@type': 'MedicalCondition',
      associatedAnatomy: { '@type': 'AnatomicalStructure', name: kropsdel[service.category] },
    };
  }
  if (type === 'test') {
    return { ...faelles, '@type': 'MedicalTest' };
  }
  return {
    ...faelles,
    '@type': 'MedicalProcedure',
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: kropsdel[service.category],
  };
};

const crumbNode = (canonical, items) => ({
  '@type': 'BreadcrumbList',
  '@id': `${canonical}#brodkrumme`,
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    ...(it.item ? { item: it.item } : {}),
  })),
});

const sideNode = (slug, canonical, { faq = null, emne = null, sidstOpdateret } = {}) => {
  const { title, desc } = metaFor(slug);
  return {
    '@type': faq ? ['MedicalWebPage', 'FAQPage'] : 'MedicalWebPage',
    '@id': `${canonical}#side`,
    url: canonical,
    name: title,
    description: desc,
    inLanguage: 'da-DK',
    isPartOf: { '@id': ID.website },
    about: emne ? { '@id': emne['@id'] } : { '@id': ID.klinik },
    breadcrumb: { '@id': `${canonical}#brodkrumme` },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/img/hero-1600.webp` },
    lastReviewed: sidstOpdateret,
    ...(faq ? {
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    } : {}),
  };
};

// Ét samlet @graph pr. side. Alle noder har @id, så Google kan se at det er
// samme klinik og samme læger på tværs af sider.
export const graphFor = (slug, sidstOpdateret = SIDST_OPDATERET) => {
  const canonical = canonicalFor(slug);
  const noder = [websiteNode(), klinikNode()];
  const crumbs = [{ name: 'Forside', item: `${SITE_URL}/` }];

  const service = allServicesFlat.find((s) => s.slug === slug);
  const by = byer.find((b) => b.slug === slug);
  const job = jobs.find((j) => j.slug === slug);

  if (service) {
    const kat = service.category === 'hud' ? ['Hudsygdomme', 'hudsygdomme']
      : service.category === 'haand' ? ['Håndkirurgi', 'haandkirurgi']
      : ['Øre, Næse & Hals', 'ore-naese-hals'];
    crumbs.push({ name: kat[0], item: `${SITE_URL}/${kat[1]}` }, { name: service.name, item: canonical });
    const emne = emneNode(service, canonical);
    noder.push(emne, crumbNode(canonical, crumbs), sideNode(slug, canonical, { faq: service.faq, emne, sidstOpdateret }));
    return { '@context': 'https://schema.org', '@graph': noder };
  }

  if (by) {
    crumbs.push({ name: 'Find os', item: `${SITE_URL}/find-os` }, { name: by.by, item: canonical });
    noder.push(crumbNode(canonical, crumbs), sideNode(slug, canonical, { faq: by.faq, sidstOpdateret }));
    return { '@context': 'https://schema.org', '@graph': noder };
  }

  if (job) {
    crumbs.push({ name: 'Job', item: `${SITE_URL}/job` }, { name: job.name, item: canonical });
    noder.push(
      buildJobPostingSchema(job, `${canonical}#stilling`),
      crumbNode(canonical, crumbs),
      sideNode(slug, canonical, { faq: job.faq, sidstOpdateret }),
    );
    return { '@context': 'https://schema.org', '@graph': noder };
  }

  if (slug === forsikring.slug) {
    crumbs.push({ name: 'Sundhedsforsikring', item: canonical });
    noder.push(crumbNode(canonical, crumbs), sideNode(slug, canonical, { faq: forsikring.faq, sidstOpdateret }));
    return { '@context': 'https://schema.org', '@graph': noder };
  }

  if (slug === 'personale') {
    crumbs.push({ name: 'Personale', item: canonical });
    noder.push(...staff.map(physicianNode), crumbNode(canonical, crumbs), sideNode(slug, canonical, { sidstOpdateret }));
    return { '@context': 'https://schema.org', '@graph': noder };
  }

  if (slug !== 'forside') {
    crumbs.push({ name: metaFor(slug).title.split(' | ')[0], item: canonical });
    noder.push(crumbNode(canonical, crumbs));
  }
  noder.push(sideNode(slug, canonical, { sidstOpdateret }));
  return { '@context': 'https://schema.org', '@graph': noder };
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
