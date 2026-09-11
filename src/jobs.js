// Ledige stillinger. Ét objekt pr. opslag. Fjern objektet når stillingen er besat,
// og lad nginx svare 410 på URL'en, så Google for Jobs dropper opslaget igen.
export const jobs = [
  {
    slug: 'job/hudlaege',
    name: 'Speciallægekonsulent i hudsygdomme',
    h1: 'Speciallægekonsulent i hudsygdomme søges til Klinik Sirius i Varde',
    metaTitle: 'Speciallægekonsulent i hudsygdomme | Klinik Sirius, Varde',
    metaDesc: 'Klinik Sirius i Varde søger en speciallæge i dermatologi til en fleksibel konsulentrolle. Du tilrettelægger selv din arbejdsindsats. Ingen vagter.',
    lead: 'Klinik Sirius søger en dygtig og engageret speciallæge i dermatologi, der ønsker en fleksibel konsulentrolle med stor frihed, fagligt fokus og mulighed for selv at tilrettelægge sin arbejdsindsats.',
    datePosted: '2026-09-11',
    validThrough: '2026-12-01',
    employmentType: ['CONTRACTOR', 'PART_TIME'],
    omfang: 'Omfang efter aftale',
    occupationalCategory: '2212 Speciallæger',
    workHours: 'Du tilrettelægger selv dine konsultationsdage. Hverdage mellem 8 og 16, ingen vagter og ingen weekendarbejde.',
    applyEmail: 'info@kliniksirius.dk',
    applyPhone: '32 22 32 24',
    contactName: 'Jalal Taha Saadi',
    facts: [
      { label: 'Speciale', value: 'Dermatologi, hudsygdomme' },
      { label: 'Form', value: 'Konsulentaftale, omfang efter aftale' },
      { label: 'Arbejdssted', value: 'Søndertoften 22, 6800 Varde' },
      { label: 'Tiltrædelse', value: 'Efter aftale' },
      { label: 'Ansøgning', value: 'Løbende, sidste frist 1. december 2026' },
      { label: 'Kontaktperson', value: 'Jalal Taha Saadi, speciallæge' },
      { label: 'Kontakt', value: 'info@kliniksirius.dk' },
    ],
    sections: [
      {
        h2: 'Om rollen',
        paragraphs: [
          'Hudsygdomme er et af klinikkens tre specialer, og patienterne står allerede i kalenderen. Som konsulent overtager du konsultationerne og bestemmer selv, hvor stort et omfang du ønsker.',
          'Du er ikke bundet af en fast ansættelse. Nogle vil have en enkelt dag om ugen, andre flere. Vi tilpasser samarbejdet efter dine ønsker og din tilgængelighed, og aftalen kan justeres undervejs.',
          'Arbejdet er ambulant og ligger på hverdage. Der er ingen vagter og ingen weekender.',
        ],
      },
      {
        h2: 'Dine opgaver',
        bullets: [
          'Udredning og behandling af eksem, psoriasis, rosacea, akne, nældefeber og hyperhidrose',
          'Dermatoskopi og kontrol af modermærker',
          'Vurdering af hudforandringer ved mistanke om hudkræft',
          'Mindre hudkirurgiske indgreb i lokalbedøvelse',
          'Behandling af fnat, kondylomer og vorter',
          'Sparring med klinikkens ØNH-speciallæge om allergiudredning',
        ],
      },
      {
        h2: 'Det forventer vi',
        bullets: [
          'Dansk autorisation som læge og speciallægeanerkendelse i dermato-venerologi',
          'Erfaring med dermatoskopi og selvstændig ambulant funktion',
          'Dansk på et niveau, der bærer konsultationen',
          'Lyst til at arbejde selvstændigt i en lille klinik',
        ],
      },
      {
        h2: 'Det tilbyder vi',
        bullets: [
          'Stor frihed til selv at tilrettelægge omfang og konsultationsdage',
          'Honorar aftales individuelt ud fra omfang og opgaver',
          'Fagligt fokus uden administration og uden vagtbyrde',
          'Sekretær, der tager telefon, booking og afregning',
          'Kolleger inden for øre, næse og hals, håndkirurgi og anæstesi under samme tag',
          'Patienter fra Varde, Esbjerg og hele Sydvestjylland',
        ],
      },
      {
        h2: 'Om Klinik Sirius',
        paragraphs: [
          'Klinik Sirius er en privat speciallægepraksis på Søndertoften 22 i Varde. Klinikken behandler hudsygdomme, sygdomme i øre, næse og hals samt håndkirurgi.',
          'Patienterne kommer som privatbetalende, gennem deres sundhedsforsikring eller som ventetidsgaranti-patienter fra regionen. Bag klinikken står speciallæger med baggrund fra OUH, Sydvestjysk Sygehus i Esbjerg, Aarhus Universitetshospital og Sygehus Sønderjylland.',
        ],
      },
      {
        h2: 'Sådan søger du',
        paragraphs: [
          'Send en kort ansøgning til info@kliniksirius.dk, att. Jalal Taha Saadi, eller ring på 32 22 32 24 for en uforpligtende samtale.',
          'Vi tager løbende imod ansøgere og tilpasser samarbejdet til den enkelte speciallæges ønsker og tilgængelighed.',
        ],
      },
    ],
    faq: [
      { q: 'Hvor stort et omfang skal jeg binde mig til?', a: 'Det bestemmer du selv. Nogle konsulenter har en enkelt dag om ugen, andre flere. Vi aftaler omfanget med dig og justerer det undervejs, hvis dine forhold ændrer sig.' },
      { q: 'Kan rollen kombineres med et sygehusjob?', a: 'Ja, og det er netop tanken bag en konsulentaftale. Klinikkens håndkirurg er samtidig overlæge ved Sygehus Sønderjylland, og konsultationsdagene lægges, så de passer med en anden ansættelse.' },
      { q: 'Er det en ansættelse eller en konsulentaftale?', a: 'En konsulentaftale. Du arbejder selvstændigt og fakturerer for dit arbejde, og du er ikke bundet af en fast ansættelse.' },
      { q: 'Hvad er honoraret?', a: 'Honoraret aftales individuelt ud fra omfang og opgaver. Vi drøfter det ved den første samtale.' },
      { q: 'Hvilke patienter kommer i klinikken?', a: 'Patienterne kommer som privatbetalende, gennem deres sundhedsforsikring eller som ventetidsgaranti-patienter fra regionen. De fleste bor i Varde, Esbjerg og det øvrige Sydvestjylland.' },
      { q: 'Hvornår kan jeg starte?', a: 'Efter aftale. Vi holder samtaler løbende og har ikke en fast startdato, så det afhænger af hvornår du kan.' },
    ],
  },
];

export const SITE_URL = 'https://kliniksirius.dk';

const DANSKE_MAANEDER = ['januar','februar','marts','april','maj','juni','juli','august','september','oktober','november','december'];

export const formatDanishDate = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${parseInt(d, 10)}. ${DANSKE_MAANEDER[parseInt(m, 10) - 1]} ${y}`;
};

export const jobDescriptionHtml = (job) => `<p>${job.lead}</p>` + job.sections.map(s =>
  `<h2>${s.h2}</h2>` +
  (s.paragraphs ? s.paragraphs.map(p => `<p>${p}</p>`).join('') : '') +
  (s.bullets ? `<ul>${s.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : '')
).join('');

export const buildJobPostingSchema = (job, id) => ({
  ...(id ? { '@id': id } : { '@context': 'https://schema.org' }),
  '@type': 'JobPosting',
  'title': job.name,
  'description': jobDescriptionHtml(job),
  'identifier': { '@type': 'PropertyValue', 'name': 'Klinik Sirius', 'value': job.slug.replace('job/', '') + '-' + job.datePosted.slice(0, 4) },
  'datePosted': job.datePosted,
  'validThrough': `${job.validThrough}T23:59:59+01:00`,
  'employmentType': job.employmentType,
  'occupationalCategory': job.occupationalCategory,
  'workHours': job.workHours,
  'directApply': false,
  'industry': 'Sundhedsvæsen',
  'url': `${SITE_URL}/${job.slug}`,
  'hiringOrganization': {
    '@type': 'MedicalClinic',
    'name': 'Klinik Sirius',
    'url': SITE_URL,
    'sameAs': SITE_URL,
    'logo': `${SITE_URL}/img/hero-1600.webp`,
    'telephone': '+4532223224',
    'email': 'info@kliniksirius.dk',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Søndertoften 22',
      'addressLocality': 'Varde',
      'postalCode': '6800',
      'addressRegion': 'Syddanmark',
      'addressCountry': 'DK'
    }
  },
  'jobLocation': {
    '@type': 'Place',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Søndertoften 22',
      'addressLocality': 'Varde',
      'postalCode': '6800',
      'addressRegion': 'Syddanmark',
      'addressCountry': 'DK'
    }
  },
  'applicationContact': {
    '@type': 'ContactPoint',
    'contactType': 'Ansøgning',
    'name': job.contactName,
    'email': job.applyEmail,
    'telephone': '+4532223224'
  }
});
