// Hvilken schema.org-type hver ydelsesside beskriver. En side om eksem beskriver
// en tilstand, en side om bihuleoperation beskriver et indgreb, og en høreprøve
// er en undersøgelse. Det er tre forskellige typer, ikke én.
export const sdType = {
  // Hudsygdomme, alle tilstande
  eksem: 'condition', naeldefeber: 'condition', psoriasis: 'condition', modermaerker: 'condition',
  hudkraeft: 'condition', rosacea: 'condition', akne: 'condition', fnat: 'condition',
  hyperhidrose: 'condition', kondylomer: 'condition',

  // ØNH, undersøgelser
  allergi: 'test', hoere: 'test', laryngoskopi: 'test', struboskopi: 'test', svimmelhed: 'test',
  // ØNH, tilstande der udredes
  bihulebetaendelse: 'condition', halsbetaendelse: 'condition', mellemoereproblem: 'condition',
  naeseblodning: 'condition', stritoere: 'condition',

  // ØNH, indgreb
  'naese-operation': 'procedure', naeseskillevaeg: 'procedure', 'mandler-fjernelse': 'procedure',
  'mandler-reduktion': 'procedure', naesepolypper: 'procedure', 'bihuler-operation': 'procedure',
  'stritoere-operation': 'procedure', bornepolypper: 'procedure', draenanlaeggelse: 'procedure',

  // Håndkirurgi, tilstande
  karpaltunnelsyndrom: 'condition', kubitaltunnelsyndrom: 'condition',
  'perifere-nerveafklemninger': 'condition', springfinger: 'condition', 'de-quervains': 'condition',
  seneskedebetaendelser: 'condition', ganglion: 'condition', 'dupuytrens-kontraktur': 'condition',
  'godartede-tumorer-haand': 'condition',
};

export const kropsdel = {
  hud: 'Huden',
  onh: 'Øre, næse og hals',
  haand: 'Hånd, håndled og underarm',
};

export const speciale = {
  hud: 'https://schema.org/Dermatology',
  onh: 'https://schema.org/Otolaryngologic',
  haand: 'https://schema.org/PlasticSurgery',
};
