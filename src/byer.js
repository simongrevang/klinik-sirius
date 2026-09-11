// Bysider. Hver side bygger på målte tal for ruten fra byen til Søndertoften 22:
// afstand og køretid er hentet fra OSRM, stationerne er slået op i OpenStreetMap.
// Teksten er skrevet pr. by. Brug ikke samme afsnit to steder.

export const STATION_VARDE_KM = 2.6;

export const byer = [
  {
    slug: 'speciallaege-esbjerg',
    by: 'Esbjerg',
    naboer: [{ navn: 'Hjerting', km: 14, minutter: 16 }, { navn: 'Tjæreborg', km: 22, minutter: 23 }, { navn: 'Guldager', km: 13, minutter: 14 }, { navn: 'Sædding', km: 17, minutter: 18 }],
    kommune: 'Esbjerg Kommune',
    km: 17,
    minutter: 21,
    rute: 'rute 12',
    station: 'Esbjerg Station',
    h1: 'Speciallæge i Varde for patienter fra Esbjerg',
    metaTitle: 'Speciallæge tæt på Esbjerg | Klinik Sirius i Varde',
    metaDesc: 'Fra Esbjerg er der 17 km til Klinik Sirius i Varde, omkring 21 minutter i bil ad rute 12. Hudsygdomme, øre, næse og hals samt håndkirurgi uden lang ventetid.',
    lead: 'Der er 17 kilometer fra Esbjerg til Klinik Sirius på Søndertoften 22 i Varde. Turen tager omkring 21 minutter i bil.',
    sections: [
      {
        h2: 'Turen fra Esbjerg',
        paragraphs: [
          'Ruten går nordpå fra Stormgade og videre ad rute 12 mod Varde. De 17 kilometer tager omkring 21 minutter uden for myldretiden. Der er gratis parkering lige uden for døren, og du skal bruge P-skive, som gælder to timer.',
          'Kommer du med tog, kører du fra Esbjerg Station til Varde Station. Derfra er der 2,6 kilometer til klinikken.',
        ],
      },
      {
        h2: 'Når sygehuset i Esbjerg har ventetid',
        paragraphs: [
          'Sydvestjysk Sygehus ligger i Esbjerg, og de fleste henvisninger går dertil. Er ventetiden længere, end din tilstand kan vente på, kan din egen læge henvise dig til en privat speciallæge i stedet.',
          'Klinik Sirius tager imod patienter på ventetidsgaranti fra regionen. Du kan også komme som privatbetalende eller gennem din sundhedsforsikring. Esbjerg hører til Region Syddanmark, ligesom Varde.',
        ],
      },
    ],
    faq: [
      { q: 'Hvor lang tid tager turen fra Esbjerg til Klinik Sirius?', a: 'Omkring 21 minutter i bil. Der er 17 kilometer ad rute 12 fra Esbjerg centrum til Søndertoften 22 i Varde.' },
      { q: 'Kan jeg komme til klinikken med tog fra Esbjerg?', a: 'Ja. Der går tog fra Esbjerg Station til Varde Station, og fra stationen i Varde er der 2,6 kilometer til klinikken.' },
      { q: 'Skal jeg have en henvisning fra min egen læge i Esbjerg?', a: 'Til de fleste ydelser sender din egen læge en henvisning, og vi kontakter dig, når vi har modtaget den. Kommer du gennem en sundhedsforsikring, skal du kontakte selskabet først.' },
    ],
  },
  {
    slug: 'speciallaege-ribe',
    by: 'Ribe',
    naboer: [{ navn: 'Gredstedbro', km: 31, minutter: 30 }, { navn: 'Egebæk-Hviding', km: 46, minutter: 45 }, { navn: 'Obbekær', km: 45, minutter: 44 }, { navn: 'Vester Vedsted', km: 48, minutter: 49 }],
    kommune: 'Esbjerg Kommune',
    km: 39,
    minutter: 41,
    rute: 'rute 11',
    station: 'Ribe Station',
    h1: 'Speciallæge i Varde for patienter fra Ribe',
    metaTitle: 'Speciallæge for patienter fra Ribe | Klinik Sirius i Varde',
    metaDesc: 'Fra Ribe er der 39 km til Klinik Sirius i Varde, omkring 41 minutter ad rute 11. Undersøgelse og indgreb ligger på samme adresse, så turen skal kun køres én gang.',
    lead: 'Fra Ribe er der 39 kilometer til Klinik Sirius i Varde. Turen tager omkring 41 minutter ad rute 11.',
    sections: [
      {
        h2: 'Turen fra Ribe',
        paragraphs: [
          'Ruten følger rute 11 nordpå forbi Bramming og videre mod Varde. Det er den længste køretur af de tre byer i Esbjerg Kommune, som klinikken oftest ser patienter fra.',
          'Med tog kræver turen skift undervejs, fordi Ribe og Varde ligger på hver sin bane. Kører du selv, er der gratis parkering ved klinikken mod P-skive i to timer.',
        ],
      },
      {
        h2: 'Kør turen én gang i stedet for tre',
        paragraphs: [
          'Når der er 39 kilometer hver vej, betyder det noget, hvor mange gange du skal af sted. Klinik Sirius har både konsultation, undersøgelse og operation på adressen i Varde, og der er anæstesilæge tilknyttet klinikken.',
          'Det betyder, at en udredning og et efterfølgende indgreb sjældent kræver, at du skal videre til et andet sted i regionen.',
        ],
      },
    ],
    faq: [
      { q: 'Hvor langt er der fra Ribe til Klinik Sirius?', a: '39 kilometer ad rute 11. Køreturen tager omkring 41 minutter til Søndertoften 22 i Varde.' },
      { q: 'Kan jeg nå frem og hjem igen på en formiddag?', a: 'Ja. Med 41 minutters kørsel hver vej og en almindelig konsultation kan turen ligge inden for en formiddag.' },
      { q: 'Hvilken kommune og region hører Ribe til?', a: 'Ribe ligger i Esbjerg Kommune og hører til Region Syddanmark, som Klinik Sirius også ligger i.' },
    ],
  },
  {
    slug: 'speciallaege-bramming',
    by: 'Bramming',
    naboer: [{ navn: 'Gørding', km: 32, minutter: 28 }, { navn: 'Vejrup', km: 27, minutter: 26 }, { navn: 'Darum', km: 27, minutter: 28 }],
    kommune: 'Esbjerg Kommune',
    km: 23,
    minutter: 24,
    rute: 'rute 11',
    station: 'Bramming Station',
    h1: 'Speciallæge i Varde for patienter fra Bramming',
    metaTitle: 'Speciallæge for patienter fra Bramming | Klinik Sirius i Varde',
    metaDesc: 'Fra Bramming er der 23 km til Klinik Sirius i Varde, omkring 24 minutter ad rute 11. Hudsygdomme, øre, næse og hals samt håndkirurgi under samme tag.',
    lead: 'Fra Bramming er der 23 kilometer til Klinik Sirius i Varde, og turen tager omkring 24 minutter.',
    sections: [
      {
        h2: 'Turen fra Bramming',
        paragraphs: [
          'Ruten går vestpå ad rute 11 og videre mod Varde. 23 kilometer og omkring 24 minutter i bil. Bramming har egen station, men til Varde kræver togturen skift i Esbjerg.',
          'Ved klinikken er der gratis parkering uden for døren. Husk P-skive, den gælder to timer.',
        ],
      },
      {
        h2: 'Tre specialer på én adresse',
        paragraphs: [
          'Bramming har egen lægepraksis og tandlæger, men ingen speciallægepraksis inden for hudsygdomme, øre, næse og hals eller håndkirurgi. De tre specialer ligger samlet hos Klinik Sirius 23 kilometer væk.',
          'En konsultation tager typisk mindre tid end køreturen frem og tilbage, så de fleste kan nå det inden for et par timer.',
        ],
      },
    ],
    faq: [
      { q: 'Hvor lang er køreturen fra Bramming?', a: 'Omkring 24 minutter. Der er 23 kilometer ad rute 11 til Søndertoften 22 i Varde.' },
      { q: 'Går der direkte tog fra Bramming til Varde?', a: 'Nej. Bramming har egen station, men turen til Varde kræver skift i Esbjerg.' },
      { q: 'Koster det noget at parkere ved klinikken?', a: 'Nej. Der er gratis parkering lige uden for klinikken, og du skal blot bruge P-skive, som gælder i to timer.' },
    ],
  },
  {
    slug: 'speciallaege-oelgod',
    by: 'Ølgod',
    naboer: [{ navn: 'Tistrup', km: 18, minutter: 19 }, { navn: 'Horne', km: 16, minutter: 17 }, { navn: 'Skovlund', km: 24, minutter: 25 }, { navn: 'Agerbæk', km: 25, minutter: 26 }],
    kommune: 'Varde Kommune',
    km: 28,
    minutter: 29,
    rute: 'rute 12',
    station: 'Ølgod Station',
    h1: 'Speciallæge i Varde for patienter fra Ølgod',
    metaTitle: 'Speciallæge for patienter fra Ølgod | Klinik Sirius i Varde',
    metaDesc: 'Fra Ølgod er der 28 km til Klinik Sirius i Varde, omkring 29 minutter i bil. Ølgod og Varde ligger på samme togbane, så turen kan også klares uden bil.',
    lead: 'Fra Ølgod er der 28 kilometer til Klinik Sirius i Varde. Turen tager omkring 29 minutter i bil.',
    sections: [
      {
        h2: 'Turen fra Ølgod',
        paragraphs: [
          'Ruten går sydpå ad rute 12 mod Varde. 28 kilometer, omkring 29 minutter. Ølgod og Varde ligger på samme jernbane, så turen kan også klares med tog, og fra Varde Station er der 2,6 kilometer til klinikken.',
        ],
      },
      {
        h2: 'Samme kommune som klinikken',
        paragraphs: [
          'Ølgod hører til Varde Kommune, ligesom klinikken selv. Det ændrer ikke på henvisningen, som stadig kommer fra din egen læge, men det betyder, at du bliver behandlet i din egen kommune i stedet for at skulle til Esbjerg eller længere væk.',
          'Klinikken tager imod patienter på ventetidsgaranti fra regionen, privatbetalende og patienter med sundhedsforsikring.',
        ],
      },
    ],
    faq: [
      { q: 'Hvor langt er der fra Ølgod til Klinik Sirius?', a: '28 kilometer ad rute 12. Køreturen tager omkring 29 minutter.' },
      { q: 'Kan jeg tage toget fra Ølgod til Varde?', a: 'Ja. Ølgod og Varde ligger på samme bane. Fra Varde Station er der 2,6 kilometer videre til klinikken på Søndertoften 22.' },
      { q: 'Ligger klinikken i samme kommune som Ølgod?', a: 'Ja. Både Ølgod og Klinik Sirius ligger i Varde Kommune.' },
    ],
  },
  {
    slug: 'speciallaege-oksboel',
    by: 'Oksbøl',
    naboer: [{ navn: 'Janderup', km: 11, minutter: 12 }, { navn: 'Billum', km: 13, minutter: 15 }, { navn: 'Ho', km: 26, minutter: 29 }, { navn: 'Henne', km: 26, minutter: 27 }],
    kommune: 'Varde Kommune',
    km: 16,
    minutter: 19,
    rute: 'rute 431',
    station: 'Oksbøl Station',
    h1: 'Speciallæge i Varde for patienter fra Oksbøl og vestkysten',
    metaTitle: 'Speciallæge for patienter fra Oksbøl | Klinik Sirius i Varde',
    metaDesc: 'Fra Oksbøl er der 16 km til Klinik Sirius i Varde, omkring 19 minutter ad rute 431. Også kort vej fra Blåvand, Nørre Nebel og resten af vestkysten.',
    lead: 'Oksbøl ligger 16 kilometer fra Klinik Sirius i Varde. Det er den korteste tur af alle byerne uden for Varde, omkring 19 minutter i bil.',
    sections: [
      {
        h2: 'Turen fra Oksbøl',
        paragraphs: [
          'Ruten går østpå ad rute 431 fra Østergade og videre mod Varde. Vestbanen kører mellem Nørre Nebel og Varde med stop i Oksbøl, så turen kan også klares med tog.',
        ],
      },
      {
        h2: 'Afstande fra resten af vestkysten',
        paragraphs: [
          'Klinikken er nærmeste speciallægepraksis for en stor del af kysten. Fra Nørre Nebel er der 26 kilometer og omkring 27 minutter. Fra Blåvand er der 32 kilometer og omkring 37 minutter.',
          'Er du sommerhusgæst i området og får brug for en vurdering af en hudforandring, en ørebetændelse eller en skade i hånden, kan du komme som privatbetalende uden at være tilknyttet en læge i kommunen.',
        ],
      },
    ],
    faq: [
      { q: 'Hvor langt er der fra Oksbøl til Klinik Sirius?', a: '16 kilometer ad rute 431. Køreturen tager omkring 19 minutter.' },
      { q: 'Kører Vestbanen til Varde?', a: 'Ja. Vestbanen kører mellem Nørre Nebel og Varde med stop i Oksbøl. Fra Varde Station er der 2,6 kilometer til klinikken.' },
      { q: 'Hvor langt er der fra Blåvand og Nørre Nebel?', a: 'Fra Blåvand er der 32 kilometer og omkring 37 minutters kørsel. Fra Nørre Nebel er der 26 kilometer og omkring 27 minutter.' },
    ],
  },
  {
    slug: 'speciallaege-grindsted',
    by: 'Grindsted',
    naboer: [{ navn: 'Hejnsvig', km: 40, minutter: 40 }, { navn: 'Sønder Omme', km: 47, minutter: 48 }, { navn: 'Vorbasse', km: 42, minutter: 42 }, { navn: 'Ansager', km: 23, minutter: 24 }],
    kommune: 'Billund Kommune',
    km: 38,
    minutter: 39,
    rute: 'rute 30',
    station: null,
    h1: 'Speciallæge i Varde for patienter fra Grindsted',
    metaTitle: 'Speciallæge for patienter fra Grindsted | Klinik Sirius i Varde',
    metaDesc: 'Fra Grindsted er der 38 km til Klinik Sirius i Varde, omkring 39 minutter ad rute 30 og 475. Hudsygdomme, øre, næse og hals samt håndkirurgi på én adresse.',
    lead: 'Fra Grindsted er der 38 kilometer til Klinik Sirius i Varde, og turen tager omkring 39 minutter.',
    sections: [
      {
        h2: 'Turen fra Grindsted',
        paragraphs: [
          'Ruten går vestpå ad rute 30 og videre ad rute 475 mod Varde. 38 kilometer og omkring 39 minutter i bil.',
          'Grindsted har ikke længere persontog, så bilen er den realistiske vej frem. Til gengæld er der gratis parkering uden for klinikken mod P-skive i to timer, så turen slutter ikke med at lede efter en plads.',
        ],
      },
      {
        h2: 'Grindsted ligger i Billund Kommune',
        paragraphs: [
          'Grindsted hører til Billund Kommune og til Region Syddanmark, som Varde også gør. Henvisningen kommer fra din egen læge i Grindsted, og du kan komme som privatbetalende, gennem sundhedsforsikring eller på ventetidsgaranti fra regionen.',
        ],
      },
    ],
    faq: [
      { q: 'Hvor lang tid tager turen fra Grindsted?', a: 'Omkring 39 minutter. Der er 38 kilometer ad rute 30 og rute 475 til Søndertoften 22 i Varde.' },
      { q: 'Går der tog fra Grindsted til Varde?', a: 'Nej. Grindsted har ikke persontog i dag, så turen foregår i bil eller med bus.' },
      { q: 'Kan jeg bruge klinikken, når jeg bor i Billund Kommune?', a: 'Ja. Klinikken tager imod patienter fra hele Region Syddanmark og fra resten af landet, uanset hvilken kommune du bor i.' },
    ],
  },
  {
    slug: 'speciallaege-billund',
    by: 'Billund',
    naboer: [{ navn: 'Vorbasse', km: 42, minutter: 42 }, { navn: 'Hejnsvig', km: 40, minutter: 40 }, { navn: 'Filskov', km: 47, minutter: 46 }, { navn: 'Sønder Omme', km: 47, minutter: 48 }],
    kommune: 'Billund Kommune',
    km: 50,
    minutter: 50,
    rute: 'rute 28',
    station: null,
    h1: 'Speciallæge i Varde for patienter fra Billund',
    metaTitle: 'Speciallæge for patienter fra Billund | Klinik Sirius i Varde',
    metaDesc: 'Fra Billund er der 50 km til Klinik Sirius i Varde, omkring 50 minutter ad rute 28, 30 og 475. Tre specialer samlet på én adresse i Varde.',
    lead: 'Billund ligger 50 kilometer fra Klinik Sirius i Varde. Turen tager omkring 50 minutter og går ad rute 28, 30 og 475.',
    sections: [
      {
        h2: 'Turen fra Billund',
        paragraphs: [
          'Billund ligger i den østlige ende af det område, klinikken dækker. De 50 kilometer vestpå tager omkring 50 minutter i bil.',
          'Der er ingen persontog i Billund. De tog, byen er kendt for, kører inde i Legoland.',
        ],
      },
      {
        h2: 'Hvornår turen giver mening',
        paragraphs: [
          'Med 50 minutters kørsel hver vej er det værd at vide, hvad du får ud af turen. Klinikken samler hudsygdomme, øre, næse og hals samt håndkirurgi på én adresse, og både undersøgelse og operation foregår samme sted.',
          'Er ventetiden på dit lokale sygehus lang, kan din egen læge henvise dig hertil i stedet. Klinikken tager imod patienter på ventetidsgaranti fra regionen.',
        ],
      },
    ],
    faq: [
      { q: 'Hvor langt er der fra Billund til Klinik Sirius?', a: '50 kilometer. Køreturen tager omkring 50 minutter ad rute 28, 30 og 475.' },
      { q: 'Er der offentlig transport fra Billund til Varde?', a: 'Der er ingen persontogsforbindelse fra Billund. Turen foregår i bil eller med bus.' },
      { q: 'Kan jeg få både undersøgelse og operation samme sted?', a: 'Ja. Klinikken har både konsultation og indgreb på adressen i Varde, og der er anæstesilæge tilknyttet.' },
    ],
  },
];

export const byFor = (slug) => byer.find((b) => b.slug === slug);
