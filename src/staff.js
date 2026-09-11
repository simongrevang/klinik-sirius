// Speciallægerne i klinikken. Bruges både på personalesiden og i Physician-schema.
export const staff = [
  {
    name: 'Jalal Taha Saadi',
    image: '/img/jalal-taha-saadi.webp',
    role: 'Øre-, Næse-, Halsspecialist',
    expertise: 'Ekspert i kirurgiske indgreb, skjoldbruskkirtel og rhinoplastik.',
    summary: 'Uddannet læge ved Syddansk Universitet 2009. Arbejdet i forskellige kirurgiske specialer i Danmark samt i almen praksis i Danmark og Norge.',
    details: [
      { label: 'Uddannelse', items: ['Læge fra Syddansk Universitet (2009)', 'Speciallæge i ØNH fra Sønderborg og OUH Afdeling F'] },
      { label: 'Erfaring', items: ['Tidligere afdelingslæge på ØNH-afdelingen ved SVS Esbjerg', 'Specialist i skjoldbruskkirtel, bihulekirurgi og rhinoplastik'] },
      { label: 'Medlemskaber', items: ['Dansk Rhinologisk Selskab', 'Dansk Øre-Næse-Halslægers Organisation', 'Forening af Praktiserende Speciallæger'] }
    ]
  },
  {
    name: 'Ricardo Sanchez',
    role: 'Speciallæge i anæstesi',
    expertise: 'Overlæge og ekspert i anæstesiologi, intensiv medicin og sundhedsledelse.',
    summary: 'Tidligere direktør og lægefaglig ansvarlig ved Hjertecenter Varde gennem 20 år (1997-2017).',
    image: '/img/ricardo-sanchez.webp',
    details: [
      { label: 'Baggrund', items: ['Læge fra Univ. Valencia (1976)', 'Speciallæge i anæstesiologi og intensiv medicin (1988)', 'Master of Health Management fra CBS (2006)'] },
      { label: 'Karriere', items: ['Direktør v. Hjertecenter Varde (1997-2017)', 'Overlæge ved anæstesi og intensiv afd., SVS Esbjerg'] },
      { label: 'Videnskab', items: ['Ekstern lektor ved Københavns og Odense Universitet', 'Omfattende videnskabelig publikationsliste'] }
    ]
  },
  {
    name: 'Jerzy Stiasny',
    image: '/img/jerzy-stiasny.webp',
    role: 'Dr. med., Speciallæge i ortopædkirurgi & overlæge i håndkirurgi',
    expertise: 'Ekspert i håndkirurgi, nerveskader, rekonstruktiv kirurgi og plexus brachialis læsioner.',
    summary: 'Dr. med. og speciallæge i ortopædkirurgi med mange års erfaring inden for håndkirurgi. Overlæge ved Håndkirurgisk sektor, Sygehus Sønderjylland siden 2017. Har haft ophold ved førende internationale centre inden for hånd- og nerveskirurgi.',
    details: [
      { label: 'Erfaring', items: ['Overlæge, Håndkirurgisk sektor, Sygehus Sønderjylland (2017 til nu)', 'Overlæge, Ortopædkirurgisk afdeling, Odense Universitetshospital (2012 til 2017)', 'Afdelingslæge, Håndkirurgisk sektor, OUH (2007 til 2012)'] },
      { label: 'Internationale ophold', items: ['Hånd- og Mikrokirurgi, Rikshospitalet, Oslo (2011)', 'Peripheral Nerve Injury Unit, Royal National Orthopaedic Hospital, London (2010)'] },
      { label: 'Forskning & publikationer', items: ['Internationalt randomiseret studie om TFCC-rupturer, REINFORCER (2022 til nu)', 'Randomiseret studie om CMC-1 artrose, Weilby projekt (2017 til 2023)', 'Publikationer i The Danish Medical Journal, Ugeskrift for Læger m.fl.'] }
    ]
  }
];
