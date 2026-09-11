// Siden om sundhedsforsikring. Formålet er at patienter selv kan bede deres
// selskab om at blive henvist til Klinik Sirius.
export const forsikring = {
  slug: 'sundhedsforsikring',
  h1: 'Sådan bruger du din sundhedsforsikring hos Klinik Sirius',
  metaTitle: 'Speciallæge på sundhedsforsikring | Klinik Sirius i Varde',
  metaDesc: 'Har du en sundhedsforsikring gennem dit arbejde eller din fagforening, kan du bede selskabet om at henvise dig til Klinik Sirius i Varde. Se hvordan du gør.',
  lead: 'Har du en sundhedsforsikring gennem dit arbejde, din fagforening eller privat, dækker den ofte en tid hos speciallæge. Du må selv foreslå, hvilken klinik du vil henvises til, og du må gerne sige Klinik Sirius.',
  sections: [
    {
      h2: 'Mange ved ikke, at de har en',
      paragraphs: [
        'Sundhedsforsikringer følger ofte med jobbet eller med et medlemskab, og de bliver sjældent brugt. Står der en sundhedsordning på din lønseddel, i personalehåndbogen eller i dine medlemsfordele, har du sandsynligvis en.',
        'Er du i tvivl, så spørg din arbejdsgiver eller din fagforening. Det tager fem minutter og kan spare dig for både ventetid og egenbetaling.',
      ],
    },
    {
      h2: 'Fire trin fra henvisning til tid',
      trin: [
        { nr: '01', titel: 'Få en henvisning', tekst: 'Din egen læge skriver en henvisning til speciallæge. Det er samme henvisning, som bruges i det offentlige.' },
        { nr: '02', titel: 'Kontakt dit selskab', tekst: 'De fleste selskaber tager imod anmeldelser i deres app eller på telefonen. Du skal bruge henvisningen og en kort beskrivelse af, hvad det drejer sig om.' },
        { nr: '03', titel: 'Bed om Klinik Sirius', tekst: 'Sig, at du ønsker at blive henvist til Klinik Sirius i Varde. Du har lov til at foreslå en klinik, og selskabet tager stilling til den.' },
        { nr: '04', titel: 'Vi kontakter dig', tekst: 'Når vi har modtaget godkendelsen fra selskabet, ringer vi og aftaler en tid.' },
      ],
    },
    {
      h2: 'Det spørger selskabet om',
      paragraphs: [
        'Når du anmelder, beder selskabet typisk om klinikkens navn, adresse og CVR-nummer. Oplysningerne står samlet i boksen her på siden, så du kan læse dem op eller skrive dem af direkte.',
        'Hvad din police dækker, står i policen. Spørg selskabet, om netop din undersøgelse eller dit indgreb er omfattet, inden du booker. Nogle policer har selvrisiko, andre har ikke.',
      ],
    },
  ],
  fakta: [
    { label: 'Klinik', value: 'Klinik Sirius' },
    { label: 'Adresse', value: 'Søndertoften 22, 6800 Varde' },
    { label: 'CVR', value: '43033018' },
    { label: 'Telefon', value: '32 22 32 24' },
    { label: 'Mail', value: 'info@kliniksirius.dk' },
    { label: 'Specialer', value: 'Hudsygdomme, øre, næse og hals samt håndkirurgi' },
  ],
  faq: [
    { q: 'Kan jeg selv vælge, hvilken klinik jeg bliver henvist til?', a: 'Du kan foreslå en klinik, og mange selskaber følger ønsket, hvis klinikken har den rette specialist. Sig Klinik Sirius i Varde, når du taler med dit selskab.' },
    { q: 'Skal jeg have en henvisning fra min egen læge?', a: 'Til de fleste forløb ja. Selskabet vil normalt se en henvisning, før de godkender behandling hos en speciallæge.' },
    { q: 'Hvad kommer det til at koste mig?', a: 'Det afhænger af din police. Nogle policer dækker fuldt, andre har selvrisiko. Spørg dit selskab om det, inden du får en tid.' },
    { q: 'Dækker forsikringen også operation?', a: 'Ofte ja, hvis indgrebet er omfattet af policen. Klinik Sirius udfører både undersøgelse og operation på adressen i Varde, og der er anæstesilæge tilknyttet.' },
    { q: 'Hvad hvis jeg ikke har en sundhedsforsikring?', a: 'Så kan du komme som privatbetalende eller blive henvist af regionen, hvis ventetiden på sygehuset overskrider fristen. Begge dele er velkomne hos os.' },
    { q: 'Hvor lang tid går der, før jeg hører fra jer?', a: 'Vi kontakter dig, så snart godkendelsen fra selskabet er modtaget. Hører du ingenting, må du gerne ringe på 32 22 32 24.' },
  ],
};
