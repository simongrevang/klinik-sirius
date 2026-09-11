// Ledige stillinger. Ét objekt pr. opslag. Fjern objektet når stillingen er besat,
// og lad nginx svare 410 på URL'en, så Google for Jobs dropper opslaget igen.
export const jobs = [
  {
    slug: 'job/hudlaege',
    name: 'Speciallæge i hudsygdomme',
    h1: 'Hudlæge søges til Klinik Sirius i Varde',
    metaTitle: 'Hudlæge søges i Varde | Klinik Sirius',
    metaDesc: 'Klinik Sirius i Varde søger en speciallæge i hudsygdomme. Fast stilling på fuldtid eller deltid, ingen vagter, tiltrædelse efter aftale.',
    lead: 'Klinik Sirius søger en speciallæge i hudsygdomme til klinikken i Varde. Du får dit eget speciale, dine egne konsultationsdage og sekretærstøtte fra første dag.',
    datePosted: '2026-09-11',
    validThrough: '2026-12-01',
    employmentType: ['FULL_TIME', 'PART_TIME'],
    occupationalCategory: '2212 Speciallæger',
    workHours: 'Hverdage mellem 8 og 16. Ingen vagter og ingen weekendarbejde.',
    applyEmail: 'info@kliniksirius.dk',
    contactName: 'Jalal Taha Saadi',
    applyPhone: '32 22 32 24',
    facts: [
      { label: 'Speciale', value: 'Dermato-venerologi' },
      { label: 'Ansættelse', value: 'Fast stilling, fuldtid eller deltid' },
      { label: 'Arbejdssted', value: 'Søndertoften 22, 6800 Varde' },
      { label: 'Tiltrædelse', value: 'Efter aftale' },
      { label: 'Ansøgningsfrist', value: '1. december 2026' },
      { label: 'Kontaktperson', value: 'Jalal Taha Saadi, speciallæge' },
      { label: 'Kontakt', value: 'info@kliniksirius.dk' },
    ],
    sections: [
      {
        h2: 'Om stillingen',
        paragraphs: [
          'Hudsygdomme er et af klinikkens tre specialer, og patienterne står allerede i kalenderen. Du overtager konsultationerne og tilrettelægger dit ambulatorium sammen med os.',
          'Arbejdet er ambulant. Der er ingen vagter og ingen weekender, og du aftaler selv, hvor mange dage om ugen du er her. Både fuldtid og deltid kan lade sig gøre.',
          'Klinikken er lille nok til, at beslutninger bliver truffet samme dag, og stor nok til at du har kolleger i andre specialer at spørge.',
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
          'Lyst til at bygge specialet videre op i en privat klinik',
        ],
      },
      {
        h2: 'Det tilbyder vi',
        bullets: [
          'Fast ansættelse med løn efter kvalifikationer',
          'Fuldtid eller deltid, hvor konsultationsdagene aftales med dig',
          'Ingen vagter og ingen weekendarbejde',
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
          'Send din ansøgning og dit CV til info@kliniksirius.dk, att. Jalal Taha Saadi. Skriv gerne, hvor mange dage om ugen du ønsker, og hvornår du kan starte.',
          'Samtaler holdes løbende, og opslaget lukker, når den rette kandidat er fundet. Spørgsmål til stillingen stilles til speciallæge Jalal Taha Saadi på 32 22 32 24.',
        ],
      },
    ],
    faq: [
      { q: 'Kan stillingen kombineres med et sygehusjob?', a: 'Ja. Klinikkens håndkirurg er samtidig overlæge ved Sygehus Sønderjylland, og konsultationsdagene i Klinik Sirius lægges, så de passer med en anden ansættelse. Det kan være fra én dag om ugen og op til fuldtid.' },
      { q: 'Hvor mange dage om ugen skal jeg arbejde?', a: 'Det aftaler vi med dig. Både deltid med faste ugedage og en fuldtidsstilling kan lade sig gøre.' },
      { q: 'Hvilke patienter kommer i klinikken?', a: 'Patienterne kommer som privatbetalende, gennem deres sundhedsforsikring eller som ventetidsgaranti-patienter fra regionen. De fleste bor i Varde, Esbjerg og det øvrige Sydvestjylland.' },
      { q: 'Er der vagter eller weekendarbejde?', a: 'Nej. Arbejdet er ambulant og ligger på hverdage i klinikkens åbningstid mellem 8 og 16.' },
      { q: 'Hvad er lønnen?', a: 'Lønnen aftales efter kvalifikationer og efter hvor mange dage om ugen du ønsker. Vilkårene drøftes ved samtalen.' },
      { q: 'Hvornår er ansøgningsfristen?', a: 'Ansøgninger behandles løbende frem til 1. december 2026. Stillingen lukkes, så snart den rette kandidat er fundet.' },
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
