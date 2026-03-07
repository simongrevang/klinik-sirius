import { useState, useEffect } from 'react';
import {
  Stethoscope, User, MapPin, ChevronDown, ExternalLink, Clock, Phone, Mail,
  Menu, X, Shield, Award, Users, Info, CreditCard, HeartPulse, Plus, Minus,
  CheckCircle, ChevronRight, ArrowRight, Ear, Search, FileText, Activity,
  AlertCircle, Wallet, GraduationCap, Briefcase, Layers, BookOpen, Microscope,
  Check, Navigation, Scale, Calendar, Heart, Undo2, ChevronLeft
} from 'lucide-react';
import './App.css';

const App = () => {
  const [activePage, setActivePage] = useState('forside');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setIsServicesOpen(null);
  }, [activePage]);

  const colors = {
    primary: 'text-slate-900',
    secondary: 'text-slate-600',
    accent: 'bg-emerald-700 hover:bg-emerald-800',
    softBg: 'bg-slate-50',
    cardBg: 'bg-white',
    siriusBlue: 'text-blue-900'
  };

  const services = {
    hud: [
      {
        name: 'Eksem hos børn og voksne',
        slug: 'eksem',
        category: 'hud',
        title: 'Behandling af eksem hos både børn og voksne',
        h2Title: 'Forståelse og effektiv behandling af eksem',
        shortIntro: 'Vi hjælper både børn og voksne med at få bugt med kløe og irritation gennem en målrettet indsats.',
        narrative: 'Når huden bliver tør, rød og begynder at klø, er det ofte det første tegn på eksem. Det er en tilstand, som vi ser hos rigtig mange af vores patienter i klinikken, og det er noget, vi har mange års erfaring i at behandle. Eksem er en betændelsestilstand, hvor hudens naturlige barriere er svækket, og det kan ramme alle aldersgrupper fra de mindste babyer til voksne i alle aldre.\n\nVores speciallæge i hudsygdomme, Kawa Ajgeiy, har en bred og dyb erfaring med eksem fra sine år på de store hudafdelinger i Odense og Aarhus. Det betyder, at du fra første konsultation møder en læge, der kender alle aspekter af sygdommen og ved, hvornår det kræver en enkel lokal behandling, og hvornår der er behov for noget mere.\n\nNår du kommer til os med eksem, begynder vi altid med en grundig samtale. Vi spørger til, hvornår generne opstod, hvad der gør det bedre eller værre, og hvordan det påvirker din hverdag. Mange patienter har gået med gener i lang tid og prøvet en masse selv, og det er helt fint. Vi samler trådene og laver en samlet plan, der tager udgangspunkt i netop din situation.\n\nHos børn kræver det lidt ekstra opmærksomhed, fordi huden reagerer anderledes, og fordi det kan påvirke søvn og trivsel for hele familien. Vi er vant til at se børn med eksem og til at tale med forældre om, hvad der er realistisk at forvente, og hvilke redskaber man kan bruge derhjemme. Vi sørger for, at I forlader konsultationen med en klar forståelse af, hvad I skal gøre, og ikke bare med en recept i hånden.\n\nMålet er ikke kun at dæmpe det aktuelle udbrud. Vi arbejder på at lære dig at kende din hud bedre, så du på sigt kan forebygge udbrud og håndtere hverdagen uden at eksem styrer den.',
        extraInfo: {
          col1Title: 'Helhedsorienteret tilgang',
          col1Text: 'Vi ser ikke kun på det aktuelle udbrud, men arbejder målrettet på at forstå, hvad der reelt trigger din hud i hverdagen. Det handler om at skabe en holdbar balance.',
          col2Title: 'Din sparringspartner',
          col2Text: 'Hos Klinik Sirius vægter vi den personlige relation højt. Tillid er fundamentet for en god og tryg behandling gennem hele dit forløb.'
        },
        faq: [
          { q: "Hvad er den hyppigste årsag til eksem?", a: "Det afhænger af, hvilken type eksem der er tale om. Ved atopisk eksem, som er den mest udbredte form, spiller arvelighed en stor rolle. Det ses ofte i familier, hvor der også er astma eller høfeber. Kontakteksem derimod opstår, fordi huden reagerer på noget udefra, det kan være kemikalier, parfume, latex eller metaller som nikkel. Til tider ser vi begge typer hos den samme patient, og det er netop derfor, en grundig udredning er vigtig." },
          { q: "Smitter eksem?", a: "Nej, eksem er ikke smitsomt. Det er en reaktion i din egen hud og har ingen forbindelse til bakterier eller virus, der kan overføres til andre. Du kan sagtens kramme din familie, gå i svømmehallen og leve et helt normalt socialt liv." },
          { q: "Kan børn vokse fra eksem?", a: "Mange børn oplever faktisk, at eksemet bliver markant bedre eller forsvinder helt, efterhånden som de bliver ældre. Det sker typisk i løbet af skolealderen. Ikke alle er så heldige, og nogle bærer eksemet med sig ind i voksenlivet, men det ændrer ikke på, at vi allerede fra starten kan hjælpe med at minimere generne og give barnet de bedste betingelser for en god hud." },
          { q: "Hvad kan jeg selv gøre for at forebygge udbrud?", a: "Det vigtigste redskab er en god og regelmæssig fugtighedspleje, som styrker hudens naturlige barriere. Derudover handler det om at kende sine egne triggere. For nogen er det stress, for andre er det visse tekstiler, parfumerede produkter eller hurtige temperaturskift. Vi hjælper dig med at identificere netop dine udløsende faktorer, så du kan tage aktivt ejerskab over din hud." },
          { q: "Hvor lang tid tager et behandlingsforløb?", a: "Det varierer meget fra person til person. Nogle mærker stor forbedring allerede efter de første uger med den rette behandling og pleje. Andre har brug for et længere forløb, hvor vi justerer og tilpasser undervejs. Vi sætter ikke en fast slutdato fra begyndelsen, men vi følger dig tæt og holder løbende øje med, hvordan det går." }
        ]
      },
      {
        name: 'Nældefeber',
        slug: 'naeldefeber',
        category: 'hud',
        title: 'Akut og kronisk nældefeber',
        h2Title: 'Effektiv lindring af nældefeberudbrud',
        shortIntro: 'Få hurtig hjælp til at identificere årsagen bag dine udslæt og opnå effektiv lindring.',
        narrative: 'Nældefeber opstår ofte helt ud af det blå som kløende hævelser. Behandlingen tager altid udgangspunkt i at give dig ro med det samme, typisk gennem moderne antihistaminer.',
        extraInfo: {
          col1Title: 'Udløsende faktorer',
          col1Text: 'Det kan være komplekst, da udløserne spænder vidt fra infektioner til fysiske påvirkninger.',
          col2Title: 'Hurtig diagnosticering',
          col2Text: 'Vi prioriterer hurtig indsats, så du kan få ro på huden med det samme.'
        },
        faq: [
          { q: "Hvor længe varer et anfald?", a: "Enkelte hævelser forsvinder normalt inden for 24 timer, men nye kan opstå." }
        ]
      },
      {
        name: 'Psoriasis',
        slug: 'psoriasis',
        category: 'hud',
        title: 'Moderne behandling af psoriasis',
        h2Title: 'Vejen til en bedre hverdag med psoriasis',
        shortIntro: 'Vi tilbyder de nyeste behandlingsformer, så du kan opnå en hverdag med færre symptomer.',
        narrative: 'Psoriasis skyldes, at hudcellerne fornyer sig alt for hurtigt. I dag behøver man ikke acceptere en hud, der altid er dækket af skæl.\n\nVi arbejder med alt fra specialudviklede cremer til de nyeste medicinske løsninger.',
        extraInfo: {
          col1Title: 'Livsstil',
          col1Text: 'Stress og miljø kan have en mærkbar indflydelse på sygdommens aktivitet.',
          col2Title: 'Behandlingstrin',
          col2Text: 'Vi starter med de mest skånsomme løsninger og følger din udvikling tæt.'
        },
        faq: [
          { q: "Er det arveligt?", a: "Ja, der er en stærk genetisk komponent involveret i psoriasis." }
        ]
      },
      {
        name: 'Modermærker',
        slug: 'modermaerker',
        category: 'hud',
        title: 'Tryghed gennem professionel kontrol',
        h2Title: 'Specialiseret gennemgang med dermatoskopi',
        shortIntro: 'Få foretaget en grundig gennemgang af dine modermærker for rettidig omhu.',
        narrative: 'Modermærkekræft er en af de sygdomme, der bedst kan behandles, hvis den opdages tidligt. Hvis et mærke skal fjernes, gør vi det her på stedet under lokalbedøvelse.',
        extraInfo: {
          col1Title: 'Egenkontrol',
          col1Text: 'Lær dine egne mærker at kende, så du hurtigt opdager forandringer.',
          col2Title: 'Analyse',
          col2Text: 'Vævet bliver altid sendt til en grundig analyse for din sikkerhed.'
        },
        faq: [
          { q: "Hvor tit skal de tjekkes?", a: "Vi anbefaler en årlig kontrol, hvis du har mange mærker." }
        ]
      }
    ],
    onh: [
      {
        name: 'Allergiudredning',
        slug: 'allergi',
        category: 'onh',
        title: 'Allergiudredning med priktest',
        h2Title: 'Find årsagen til dine allergiske gener',
        shortIntro: 'Vi tilbyder grundig udredning gennem priktest og moderne rådgivning om behandling.',
        narrative: 'Mange går rundt med gener uden at kende den præcise årsag. Vi anvender priktest på huden, som giver et svar på de mest almindelige allergier på 15 minutter.',
        extraInfo: {
          col1Title: 'Priktesten',
          col1Text: 'En hurtig og sikker metode. Svaret foreligger med det samme.',
          col2Title: 'Vaccination',
          col2Text: 'Tabletbehandling er en nem vej for mange, da det kan foregå hjemme.'
        },
        faq: [
          { q: "Gør testen ondt?", a: "Det føles som en let prikken i huden og er hurtigt overstået." }
        ]
      },
      {
        name: 'Høreprøve',
        slug: 'hoere',
        category: 'onh',
        title: 'Audiometri ved høretab og tinnitus',
        h2Title: 'Præcis måling af din hørelse',
        shortIntro: 'Vi udreder hørenedsættelse og tinnitus gennem avancerede målinger.',
        narrative: 'Problemer med hørelsen påvirker ofte både arbejdsliv og socialt samvær. Til små børn anvender vi specialiseret hørescreening (OAE), der er smertefrit.',
        extraInfo: {
          col1Title: 'Hørescreening',
          col1Text: 'OAE måler det svar, som det indre øre sender tilbage.',
          col2Title: 'Tinnitus',
          col2Text: 'Vi gennemgår dit høremønster for at finde den bedste lindring.'
        },
        faq: [
          { q: "Hvad er tympanometri?", a: "Det måler trykket i dit mellemøre og viser væske." }
        ]
      }
    ]
  };

  const staff = [
    {
      name: 'Jalal Taha Saadi',
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
      image: '/Ricardo%20Sanchez.webp',
      details: [
        { label: 'Baggrund', items: ['Læge fra Univ. Valencia (1976)', 'Speciallæge i anæstesiologi og intensiv medicin (1988)', 'Master of Health Management fra CBS (2006)'] },
        { label: 'Karriere', items: ['Direktør v. Hjertecenter Varde (1997-2017)', 'Overlæge ved anæstesi og intensiv afd., SVS Esbjerg'] },
        { label: 'Videnskab', items: ['Ekstern lektor ved Københavns og Odense Universitet', 'Omfattende videnskabelig publikationsliste'] }
      ]
    },
    {
      name: 'Kawa Ajgeiy',
      role: 'Speciallæge i hudsygdomme',
      expertise: 'Specialist i hudsygdomme, allergologi og dermatoskopi.',
      summary: 'Uddannet læge fra SDU med specialisering fra de førende hudafdelinger i Odense og Aarhus.',
      details: [
        { label: 'Uddannelse', items: ['Læge fra Syddansk Universitet (2013)', 'Speciallægeuddannet ved OUH og Aarhus Universitetshospital (2019)'] },
        { label: 'Fagligt virke', items: ['Speciallæge ved Hudafdeling og Allergicentret på OUH', 'Bred erfaring indenfor diagnosticering af hudsygdomme'] },
        { label: 'Autoritet', items: ['Medlem af Dansk Dermatologisk Selskab', 'Videnskabelige publikationer om hudsygdomme'] }
      ]
    }
  ];

  const NavItemComponent = ({ title, items, id }) => (
    <div className="relative group">
      <button
        className={`flex items-center space-x-1 py-2 font-black transition-colors uppercase tracking-tight text-xs ${isServicesOpen === id ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}
        onClick={() => setIsServicesOpen(isServicesOpen === id ? null : id)}
      >
        <span>{title}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen === id ? 'rotate-180' : ''}`} />
      </button>
      <div className={`absolute left-0 mt-4 w-72 bg-white border border-slate-100 shadow-2xl rounded-[2rem] py-6 z-50 transition-all duration-300 transform origin-top ${isServicesOpen === id ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
        <div className="px-4 space-y-1">
          {items.map((item, idx) => (
            <button
              key={idx}
              className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-900 transition-all flex items-center justify-between group rounded-xl"
              onClick={() => { setActivePage(item.slug); setIsServicesOpen(null); setOpenFaq(null); }}
            >
              {item.name}
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const ServiceLandingPage = ({ service }) => (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-50 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <button onClick={() => setActivePage('forside')} className="hover:text-blue-900 transition-colors">Forside</button>
              <span className="mx-3">/</span>
              <span className="text-blue-900">{service.category === 'hud' ? 'Hudsygdomme' : 'Øre, Næse, Hals'}</span>
            </nav>
            <h1 className="text-4xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight uppercase italic tracking-tighter">{service.title}</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light border-l-8 border-emerald-700 pl-8 italic">
              {service.shortIntro}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="https://www.patientportalen.dk" target="_blank" rel="noopener noreferrer" className={`px-10 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl hover:-translate-y-1 transition-all inline-flex items-center ${colors.accent}`}>
                Book tid online
              </a>
              <div className="flex items-center px-6 text-slate-500 font-black uppercase text-xs tracking-widest italic">
                <Phone size={18} className="mr-3 text-blue-900" /> 32 22 32 24
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white">
              <h2 className="text-3xl font-black mb-8 text-blue-900 uppercase italic tracking-tight">{service.h2Title}</h2>
              <div className="text-xl text-slate-600 leading-relaxed font-light space-y-8">
                {service.narrative.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="pt-16 border-t border-slate-100">
              <h3 className="text-3xl font-black mb-10 text-slate-900 uppercase italic tracking-tight">Ofte stillede spørgsmål</h3>
              <div className="grid gap-4">
                {service.faq.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-[2rem] transition-all border border-transparent hover:border-slate-200 shadow-sm">
                    <button
                      className="w-full flex justify-between items-center p-8 text-left"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    >
                      <span className="font-bold text-slate-800 uppercase tracking-tight">{item.q}</span>
                      <div className={`p-2 rounded-full transition-colors ${openFaq === idx ? 'bg-blue-900 text-white' : 'bg-white text-slate-300'}`}>
                        {openFaq === idx ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>
                    {openFaq === idx && (
                      <div className="px-8 pb-8 text-slate-500 leading-relaxed font-medium">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-10 -translate-y-10"></div>
                <div className="flex items-center space-x-5 mb-10 relative z-10">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-black text-2xl uppercase italic shadow-inner">
                    {service.category === 'hud' ? 'KA' : 'JS'}
                  </div>
                  <div>
                    <p className="font-black text-xl leading-none uppercase italic text-slate-900">{service.category === 'hud' ? 'Kawa Ajgeiy' : 'Jalal Taha Saadi'}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Speciallægeansvarlig</p>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center text-sm font-bold text-slate-700 uppercase tracking-tight italic">
                    <CheckCircle size={18} className="text-emerald-500 mr-4" /> Certificeret specialist
                  </div>
                  <div className="flex items-center text-sm font-bold text-slate-700 uppercase tracking-tight italic">
                    <CheckCircle size={18} className="text-emerald-500 mr-4" /> Akkrediteret klinik
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-2xl font-black mb-4 uppercase tracking-tight italic">Book tid nu</h4>
                  <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium italic">Få en specialistvurdering hurtigt uden unødig ventetid.</p>
                  <a href="https://www.patientportalen.dk" target="_blank" rel="noopener noreferrer" className={`w-full py-5 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95 inline-block text-center ${colors.accent}`}>
                    Gå til selvbetjening
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2.5 px-6 text-xs font-medium hidden md:flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <span className="flex items-center font-black uppercase tracking-widest text-[10px]">
            <Phone size={12} className="mr-2 text-emerald-400" /> 32 22 32 24
          </span>
          <span className="flex items-center font-black uppercase tracking-widest text-[10px]">
            <Clock size={12} className="mr-2 text-emerald-400" /> Tlf: Man-Tor 11-13 & 14-15 · Fre 10-12
          </span>
          <span className="flex items-center font-black uppercase tracking-widest text-[10px]">
            <Mail size={12} className="mr-2 text-emerald-400" /> info@kliniksirius.dk
          </span>
        </div>
        <div className="flex items-center font-black uppercase tracking-widest text-[10px]">
          <MapPin size={12} className="mr-2 text-emerald-400" /> Søndertoften 22, 6800 Varde
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => setActivePage('forside')}>
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center mr-4 shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-3">
              <span className="text-white font-bold text-xl italic">S</span>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-extrabold tracking-tight text-blue-900 leading-none italic uppercase">KLINIK SIRIUS</h2>
              <p className="uppercase tracking-[0.25em] text-slate-400 font-bold mt-1.5 leading-none text-[8px]">SPECIALLÆGECENTER</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => setActivePage('forside')} className={`font-black text-xs transition-colors uppercase tracking-tight ${activePage === 'forside' ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}>Forside</button>
            <NavItemComponent title="Hudsygdomme" items={services.hud} id="hud" />
            <NavItemComponent title="Øre, Næse, Hals" items={services.onh} id="onh" />
            <button onClick={() => setActivePage('patientinfo')} className={`font-black text-xs transition-colors uppercase tracking-tight ${activePage === 'patientinfo' ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}>Patientinfo</button>
            <button onClick={() => setActivePage('personale')} className={`font-black text-xs transition-colors uppercase tracking-tight ${activePage === 'personale' ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}>Personale</button>
            <button onClick={() => setActivePage('find-os')} className={`font-black text-xs transition-colors uppercase tracking-tight ${activePage === 'find-os' ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}>Find os</button>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="https://www.patientportalen.dk" target="_blank" rel="noopener noreferrer" className={`hidden sm:flex items-center px-6 py-3 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 ${colors.accent}`}>
              Selvbetjening <ExternalLink size={14} className="ml-2" />
            </a>
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobil Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-6 h-20 border-b border-slate-100 shrink-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold text-xl italic">S</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-extrabold tracking-tight text-blue-900 leading-none italic uppercase">KLINIK SIRIUS</span>
                <span className="uppercase tracking-[0.25em] text-slate-400 font-bold mt-1.5 leading-none text-[8px]">SPECIALLÆGECENTER</span>
              </div>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-50 rounded-xl">
              <X size={24} className="text-slate-600" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col px-4 py-4 flex-1">
            {/* Forside */}
            <button
              onClick={() => setActivePage('forside')}
              className={`flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors ${activePage === 'forside' ? 'bg-blue-50 text-blue-900' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              Forside
              <ChevronRight size={16} className="text-slate-300" />
            </button>

            {/* Hudsygdomme accordion */}
            <div>
              <button
                onClick={() => setIsServicesOpen(isServicesOpen === 'hud' ? null : 'hud')}
                className="w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Hudsygdomme</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isServicesOpen === 'hud' ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen === 'hud' && (
                <div className="ml-4 mb-2 border-l-2 border-blue-100 pl-4 space-y-1">
                  {services.hud.map(s => (
                    <button
                      key={s.slug}
                      onClick={() => setActivePage(s.slug)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      {s.name}
                      <ChevronRight size={12} className="text-slate-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ØNH accordion */}
            <div>
              <button
                onClick={() => setIsServicesOpen(isServicesOpen === 'onh' ? null : 'onh')}
                className="w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Øre, Næse, Hals</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isServicesOpen === 'onh' ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen === 'onh' && (
                <div className="ml-4 mb-2 border-l-2 border-emerald-100 pl-4 space-y-1">
                  {services.onh.map(s => (
                    <button
                      key={s.slug}
                      onClick={() => setActivePage(s.slug)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                    >
                      {s.name}
                      <ChevronRight size={12} className="text-slate-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Øvrige sider */}
            {[
              { label: 'Patientinfo', page: 'patientinfo' },
              { label: 'Personale', page: 'personale' },
              { label: 'Find os', page: 'find-os' },
            ].map(item => (
              <button
                key={item.page}
                onClick={() => setActivePage(item.page)}
                className={`flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors ${activePage === item.page ? 'bg-blue-50 text-blue-900' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                {item.label}
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="px-6 pb-8 pt-4 border-t border-slate-100 shrink-0">
            <a
              href="https://www.patientportalen.dk"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-full py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-lg ${colors.accent}`}
            >
              Selvbetjening <ExternalLink size={14} className="ml-2" />
            </a>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-grow">
        {activePage === 'forside' && (
          <>
            {/* Hero */}
            <section className="relative bg-white py-20 lg:py-32 overflow-hidden border-b border-slate-50">
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="z-10 text-center lg:text-left">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm border border-blue-100">
                    <Shield size={14} className="text-blue-600" />
                    <span>Høj faglighed & trygge rammer</span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.05] tracking-tight uppercase italic">
                    Speciallæger <br />
                    <span className="text-blue-900">tæt på dig i Varde.</span>
                  </h1>
                  <div className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-light mx-auto lg:mx-0 italic border-l-8 border-emerald-500 pl-8">
                    <p className="mb-4 text-slate-700 font-bold">Klinik Sirius er stiftet med en vision om at gøre specialistbehandling tilgængelig og tryg. Vi forener årtiers erfaring med en moderne patientfokuseret tilgang.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 justify-center lg:justify-start font-black uppercase tracking-widest text-[10px]">
                    <a href="https://www.patientportalen.dk" target="_blank" rel="noopener noreferrer" className={`px-10 py-5 rounded-[2rem] text-white font-bold shadow-xl hover:-translate-y-1 transition-all active:scale-95 inline-block text-center ${colors.accent}`}>
                      Book tid nu
                    </a>
                    <button
                      onClick={() => setActivePage('patientinfo')}
                      className="px-10 py-5 rounded-[2rem] bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95 italic"
                    >
                      Patientrettigheder
                    </button>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="w-full h-[650px] bg-slate-100 rounded-[3rem] shadow-2xl relative overflow-hidden group border-8 border-white flex flex-col items-center justify-center text-slate-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent"></div>
                    <MapPin size={100} className="mb-6 opacity-20" />
                    <p className="uppercase tracking-[0.3em] font-black text-xs opacity-40 italic">Klinik Sirius, Varde</p>
                  </div>
                  <div className="absolute -bottom-6 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-50 max-w-xs">
                    <div className="flex items-center space-x-4 mb-3">
                      <Award size={24} className="text-emerald-700" />
                      <span className="font-extrabold text-blue-900 uppercase tracking-widest text-[12px] italic">Akkrediteret</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium italic leading-relaxed">Vi lever op til de nationale standarder for kvalitet og patientsikkerhed (IKAS).</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Specialties */}
            <section className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
                <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 group relative overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-12 -translate-y-12"></div>
                  <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform shadow-lg">
                    <Stethoscope size={32} />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-6 text-slate-900 uppercase tracking-tight italic">Hudsygdomme</h3>
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light italic">Speciallæge Kawa Ajgeiy varetager udredning og behandling af alle hudlidelser, herunder modermærkekontrol og akne.</p>
                  <button onClick={() => setActivePage('eksem')} className="flex items-center font-black text-blue-900 uppercase text-[10px] tracking-[0.3em] group italic">
                    Se ydelser <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform text-emerald-600" />
                  </button>
                </div>

                <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 group relative overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full translate-x-12 -translate-y-12"></div>
                  <div className="w-16 h-16 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform shadow-lg">
                    <Ear size={32} />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-6 text-slate-900 uppercase tracking-tight italic">Øre, Næse, Hals</h3>
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light italic">Speciallæge Jalal Taha Saadi varetager vores ØNH-afdeling med fokus på alt fra høreprøver til avanceret kirurgi.</p>
                  <button onClick={() => setActivePage('allergi')} className="flex items-center font-black text-emerald-800 uppercase text-[10px] tracking-[0.3em] group italic">
                    Se ydelser <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform text-blue-900" />
                  </button>
                </div>
              </div>
            </section>

            {/* Journey */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                <h2 className="text-4xl font-black text-blue-900 uppercase tracking-tight italic mb-4">Dit forløb hos os</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light italic">Vi har gjort det nemt og overskueligt at blive patient. Her er de fire trin i din behandling.</p>
              </div>
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
                {[
                  { step: "01", title: "Henvisning", desc: "Du får en henvisning fra din læge eller kontakter din forsikring.", icon: <FileText size={24}/> },
                  { step: "02", title: "Booking", desc: "Book tid via vores selvbetjening eller ring til os.", icon: <Clock size={24}/> },
                  { step: "03", title: "Undersøgelse", desc: "Du møder din speciallæge til en grundig udredning.", icon: <Search size={24}/> },
                  { step: "04", title: "Behandling", desc: "Vi lægger en plan eller udfører indgrebet med det samme.", icon: <Activity size={24}/> }
                ].map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 transition-all group-hover:bg-blue-900 group-hover:text-white group-hover:-translate-y-2 shadow-sm h-full">
                      <div className="text-blue-900 font-black text-5xl mb-6 opacity-20 group-hover:text-white group-hover:opacity-40 italic">{item.step}</div>
                      <div className="mb-6 flex justify-center text-emerald-600 group-hover:text-white transition-colors">{item.icon}</div>
                      <h4 className="text-xl font-bold mb-3 uppercase tracking-tight italic">{item.title}</h4>
                      <p className="text-sm opacity-70 leading-relaxed font-medium italic">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Dynamic service pages */}
        {[...services.hud, ...services.onh].some(s => s.slug === activePage) && (
          <ServiceLandingPage service={[...services.hud, ...services.onh].find(s => s.slug === activePage)} />
        )}

        {/* Patientinfo */}
        {activePage === 'patientinfo' && (
          <div className="animate-in fade-in duration-700">
            <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-900/5 -skew-x-12 translate-x-1/2"></div>
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <nav className="mb-8 text-xs font-black uppercase tracking-widest text-slate-400">
                  <button onClick={() => setActivePage('forside')} className="hover:text-blue-900 transition-colors flex items-center italic">
                    <ChevronLeft size={16} className="mr-1" /> Forside
                  </button>
                </nav>
                <div className="max-w-4xl">
                  <h1 className="text-3xl sm:text-4xl lg:text-8xl font-black text-blue-900 mb-8 uppercase tracking-tight lg:tracking-tighter italic break-words">Patientinformation</h1>
                  <p className="text-xl text-slate-600 leading-relaxed font-light border-l-8 border-emerald-700 pl-8 italic">
                    Få overblik over dine rettigheder som patient, uanset om du kommer via det offentlige, din forsikring eller som privatbetalende.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-12 lg:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                  <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
                    <div className="bg-blue-50 p-8 lg:p-12 rounded-[2rem] lg:rounded-[3rem] border border-blue-100 shadow-sm relative overflow-hidden">
                      <HeartPulse className="text-blue-900 mb-6" size={40} />
                      <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight mb-4 leading-tight italic">Patient i det offentlige?</h2>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium italic">
                        Hvis ventetiden i det offentlige er lang, har du ofte ret til at blive undersøgt og behandlet hos os via lovbestemte garantier.
                      </p>
                      <div className="pt-6 border-t border-blue-200">
                        <p className="text-xs font-black uppercase text-blue-400 tracking-widest mb-2 italic">Kontakt først</p>
                        <p className="text-sm font-bold text-blue-900 uppercase italic">Patientvejledningen i din region</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-2/3 space-y-8 lg:space-y-16">
                    <div className="bg-slate-50 p-8 lg:p-16 rounded-[2rem] lg:rounded-[4rem] border border-slate-100 space-y-8 lg:space-y-10 shadow-sm">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 shrink-0 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black italic text-xl shadow-xl">30</div>
                          <h3 className="text-xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-tight">Udredningsret & Garanti</h3>
                        </div>
                        <p className="text-base lg:text-xl text-slate-600 leading-relaxed font-light italic mb-6">
                          Som patient har du ret til at blive udredt inden for <span className="font-black text-slate-900 underline decoration-emerald-500 underline-offset-4">30 dage</span> efter din henvisning er modtaget.
                        </p>
                        <ul className="space-y-4 lg:space-y-6">
                          <li className="flex items-start">
                            <div className="mt-1.5 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                            <p className="text-sm text-slate-500 italic font-bold uppercase tracking-tight leading-relaxed">Hvis fristen ikke kan overholdes, skal regionen henvise dig til et privat behandlingssted som Klinik Sirius.</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1.5 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                            <p className="text-sm text-slate-500 italic font-bold uppercase tracking-tight leading-relaxed">Kontakt Patientvejledningen/Patientkontoret i din region for at benytte din ret.</p>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-8 lg:pt-10 border-t border-slate-200">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 shrink-0 bg-emerald-700 text-white rounded-2xl flex items-center justify-center font-black italic text-xl shadow-xl">25</div>
                          <h3 className="text-xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-tight">Behandlingsgaranti (2025)</h3>
                        </div>
                        <p className="text-base lg:text-xl text-slate-600 leading-relaxed font-light italic mb-6">
                          Fra og med <span className="font-black text-blue-900">2025</span> har du ret til behandling inden for 30 dage fra diagnosetidspunktet, når behandlingsbehovet er vurderet.
                        </p>
                        <ul className="space-y-4 lg:space-y-6">
                          <li className="flex items-start">
                            <div className="mt-1.5 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                            <p className="text-sm text-slate-500 italic font-bold uppercase tracking-tight leading-relaxed">Du skal være færdigudredt — en diagnose skal foreligge.</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1.5 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                            <p className="text-sm text-slate-500 italic font-bold uppercase tracking-tight leading-relaxed">Klinik Sirius skal have aftale med din region om behandling af den pågældende lidelse.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-12 lg:py-24 bg-slate-900 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/10 mb-6 shadow-sm">
                      <Shield className="text-emerald-400" size={20} />
                      <span className="text-xs font-black uppercase tracking-[0.3em] italic">Forsikring & Privat</span>
                    </div>
                    <h2 className="text-3xl lg:text-7xl font-black uppercase tracking-tight mb-6 lg:mb-10 italic leading-tight lg:leading-[0.95]">Brug din forsikring.</h2>
                    <p className="text-base lg:text-xl text-blue-100 font-light leading-relaxed mb-8 italic">
                      Klinik Sirius samarbejder med en række danske forsikringsselskaber og kan i mange tilfælde tilbyde både diagnostik og behandling inden for forsikringsdækningen.
                    </p>
                    <div className="space-y-5 lg:space-y-8">
                      <p className="text-sm font-bold uppercase tracking-widest italic flex items-start lg:items-center"><CheckCircle size={18} className="text-emerald-400 mr-4 shrink-0 mt-0.5 lg:mt-0" /> Undersøg om du er dækket via din arbejdsgiver</p>
                      <p className="text-sm font-bold uppercase tracking-widest italic flex items-start lg:items-center"><CheckCircle size={18} className="text-emerald-400 mr-4 shrink-0 mt-0.5 lg:mt-0" /> Kontakt selskabet og få godkendelse inden booking</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] lg:rounded-[4rem] border border-white/20 relative shadow-2xl">
                    <Wallet className="text-emerald-400 mb-6" size={48} />
                    <h3 className="text-2xl font-black uppercase mb-4 italic tracking-tight">Privatbetaling</h3>
                    <p className="text-blue-100 font-light leading-relaxed mb-8 italic text-base lg:text-lg">
                      Som privatbetalende får du direkte adgang til speciallæge med <span className="font-bold text-white uppercase italic underline decoration-emerald-500">minimal ventetid</span>.
                    </p>
                    <a href="mailto:info@kliniksirius.dk" className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-xl active:scale-95 italic transition-all hover:bg-slate-100 block text-center">
                      Kontakt os for priser
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Personale */}
        {activePage === 'personale' && (
          <section className="py-24 bg-white animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-4xl mb-12 lg:mb-32">
                <div className="inline-flex items-center space-x-3 bg-blue-50 text-blue-800 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-blue-100">
                  <Microscope size={14} className="text-emerald-600" />
                  <span>Klinik Sirius Specialister</span>
                </div>
                <h2 className="text-4xl lg:text-9xl font-black text-blue-900 mb-6 lg:mb-10 uppercase tracking-tighter italic leading-tight lg:leading-[0.85]">Ekspertise <br />& Erfaring.</h2>
                <p className="text-lg lg:text-2xl text-slate-500 font-light leading-relaxed italic border-l-4 lg:border-l-8 border-emerald-500 pl-6 lg:pl-10">
                  Mød holdet bag Klinik Sirius i Varde. Vores læger kombinerer mange års praksis i det danske sygehusvæsen med dedikeret patientkontakt.
                </p>
              </div>

              <div className="space-y-16 lg:space-y-48">
                {staff.map((p, i) => (
                  <div key={i} className="grid lg:grid-cols-12 gap-8 lg:gap-24 items-start group">
                    <div className="lg:col-span-4 relative">
                      <div className="aspect-[4/5] bg-slate-100 rounded-[2rem] lg:rounded-[3.5rem] overflow-hidden shadow-xl lg:shadow-2xl relative border-4 lg:border-[10px] border-white group-hover:shadow-blue-900/10 transition-all duration-700">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" />
                        ) : (
                          <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center text-slate-400 font-black p-12 text-center italic group-hover:bg-slate-50 transition-colors uppercase tracking-[0.3em] text-xs">
                            <User size={80} className="mb-8 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                            [Professionelt Portræt]
                          </div>
                        )}
                        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 bg-white/90 backdrop-blur-md px-4 py-2 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl shadow-xl border border-white/50">
                          <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest italic">Specialist</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-8 lg:pt-8">
                      <div className="mb-8 lg:mb-14">
                        <h3 className="text-3xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter italic mb-3 leading-tight">{p.name}</h3>
                        <p className="text-blue-900 font-black uppercase text-xs tracking-[0.3em] flex items-center">
                          <span className="w-8 lg:w-12 h-1 bg-emerald-500 mr-4 lg:mr-6 inline-block shrink-0"></span> {p.role}
                        </p>
                      </div>

                      <div className="mb-8 lg:mb-16">
                        <p className="text-lg lg:text-2xl font-black text-slate-800 leading-tight mb-6 italic uppercase tracking-tighter border-b-4 border-slate-50 pb-8">{p.expertise}</p>
                        <p className="text-base lg:text-xl text-slate-500 font-light leading-relaxed italic">
                          "{p.summary}"
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                        {p.details.map((detail, dIdx) => (
                          <div key={dIdx} className="space-y-4 lg:space-y-8">
                            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-900/30">{detail.label}</h4>
                            <ul className="space-y-4 lg:space-y-6">
                              {detail.items.map((item, iIdx) => (
                                <li key={iIdx} className="flex items-start">
                                  <div className="mt-2 mr-4 lg:mr-5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                  <p className="text-sm text-slate-600 font-bold uppercase tracking-tight italic">{item}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Find os */}
        {activePage === 'find-os' && (
          <div className="animate-in fade-in duration-700">
            <section className="bg-slate-50 py-32 lg:py-48 border-b border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/4 h-full bg-emerald-600/5 -skew-x-12 translate-x-1/2"></div>
              <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
                <div className="inline-flex items-center space-x-3 bg-emerald-50 text-emerald-800 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-emerald-100 shadow-sm">
                  <MapPin size={16} />
                  <span>Varde Center</span>
                </div>
                <h2 className="text-6xl lg:text-9xl font-black text-blue-900 mb-10 uppercase tracking-tighter italic leading-none">Find vej <br />til klinikken.</h2>
                <p className="text-2xl text-slate-500 max-w-3xl font-light leading-relaxed italic border-l-8 border-blue-900 pl-10">
                  Vi holder til i lyse lokaler på Søndertoften 22. Der er elevator i bygningen og gode adgangsforhold for alle patienter.
                </p>
              </div>
            </section>

            <section className="py-32 max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-24 items-start">
                <div className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-10 text-center md:text-left">
                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                      <MapPin className="text-blue-900 mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform" size={40} />
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6 italic">Adresse</h3>
                      <p className="text-slate-600 font-black uppercase text-xs italic leading-relaxed">
                        Søndertoften 22<br />6800 Varde
                      </p>
                    </div>
                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                      <Phone className="text-emerald-700 mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform" size={40} />
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6 italic">Telefon</h3>
                      <a href="tel:+4532223224" className="text-slate-900 font-black text-2xl italic tracking-tighter uppercase hover:text-blue-900 transition-colors">32 22 32 24</a>
                    </div>
                  </div>

                  <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                    <Mail className="text-blue-900 mb-6 group-hover:scale-110 transition-transform" size={40} />
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6 italic">E-mail</h3>
                    <a href="mailto:info@kliniksirius.dk" className="text-slate-900 font-black text-lg italic tracking-tight hover:text-blue-900 transition-colors">info@kliniksirius.dk</a>
                  </div>

                  <div className="bg-slate-900 text-white p-12 lg:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 grid md:grid-cols-2 gap-16">
                      <section>
                        <div className="flex items-center space-x-4 mb-8">
                          <Clock className="text-emerald-400" size={24} />
                          <h4 className="font-black uppercase tracking-widest text-[10px] italic">Telefontider</h4>
                        </div>
                        <div className="space-y-5">
                          <div className="flex justify-between border-b border-white/10 pb-5 text-[10px] font-black italic uppercase tracking-widest">
                            <span className="text-blue-300">Man - Tor</span>
                            <span>11:00-13:00 & 14:00-15:00</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-black italic uppercase tracking-widest">
                            <span className="text-blue-300">Fredag</span>
                            <span>10:00-12:00</span>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="flex items-center space-x-4 mb-8">
                          <Clock className="text-blue-400" size={24} />
                          <h4 className="font-black uppercase tracking-widest text-[10px] italic">Åbningstider</h4>
                        </div>
                        <div className="space-y-5">
                          <div className="flex justify-between border-b border-white/10 pb-5 text-[10px] font-black italic uppercase tracking-widest">
                            <span className="text-blue-300">Man - Tor</span>
                            <span>15:00-19:00</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-black italic uppercase tracking-widest">
                            <span className="text-blue-300">Fredag</span>
                            <span>12:30-18:00</span>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="mt-12 pt-12 border-t border-white/10 relative z-10">
                      <div className="flex items-center space-x-4 mb-4 text-[10px] font-black italic uppercase tracking-widest">
                        <Info className="text-blue-400" size={24} />
                        <h4>Parkering</h4>
                      </div>
                      <p className="text-xs text-blue-100/60 font-bold italic leading-relaxed uppercase tracking-widest">Gratis parkering lige uden for døren. Husk P-skive (2 timer).</p>
                    </div>
                  </div>
                </div>

                <div className="sticky top-32">
                  <div className="rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2253.8968930526053!2d8.4838884!3d55.603808099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464b1f96c7025169%3A0x4e0f7eb286e1bbec!2sS%C3%B8ndertoften%2022%2C%206800%20Varde!5e0!3m2!1sda!2sdk!4v1772569099355!5m2!1sda!2sdk"
                      width="100%"
                      height="500"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Klinik Sirius på kort"
                    />
                  </div>
                  <a
                    href="https://maps.google.com/?q=Søndertoften+22,+6800+Varde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block w-full py-6 bg-blue-900 text-white rounded-3xl font-black uppercase text-[10px] tracking-[0.3em] text-center shadow-2xl active:scale-95 transition-all italic hover:bg-blue-800"
                  >
                    Åbn rutevejledning <ExternalLink size={14} className="inline ml-3" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Privatlivspolitik */}
        {activePage === 'privacypolitik' && (
          <div className="animate-in fade-in duration-700">
            <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-100 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <nav className="mb-8 text-xs font-black uppercase tracking-widest text-slate-400">
                  <button onClick={() => setActivePage('forside')} className="hover:text-blue-900 transition-colors flex items-center italic">
                    <ChevronLeft size={16} className="mr-1" /> Forside
                  </button>
                </nav>
                <div className="max-w-4xl">
                  <h1 className="text-4xl lg:text-7xl font-black text-blue-900 mb-8 uppercase tracking-tighter italic">Privatlivspolitik</h1>
                  <p className="text-xl text-slate-600 leading-relaxed font-light border-l-8 border-emerald-700 pl-8 italic">
                    Behandling af personoplysninger for patienter hos Klinik Sirius.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-24 bg-white">
              <div className="max-w-4xl mx-auto px-6">
                <div className="prose prose-slate max-w-none space-y-12">

                  <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight italic mb-6">Behandling af oplysninger</h2>
                    <p className="text-slate-600 leading-relaxed italic font-medium">
                      I forbindelse med vores undersøgelse, diagnostik og behandling af dig som patient indsamler og behandler Klinik Sirius en række personoplysninger om dig. I denne privatlivspolitik beskrives, hvordan Klinik Sirius behandler, bruger og videregiver dine personoplysninger.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight italic mb-6">Typer af oplysninger</h2>
                    <p className="text-slate-600 leading-relaxed italic font-medium mb-6">Klinik Sirius indsamler og behandler følgende typer af personoplysninger:</p>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                        <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest italic mb-4">Almindelige oplysninger</h3>
                        <p className="text-sm text-slate-500 italic leading-relaxed">Navn, adresse, e-mailadresse, telefonnummer, CPR-nummer, køn, familierelationer, arbejdsrelationer og uddannelse.</p>
                      </div>
                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                        <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest italic mb-4">Følsomme oplysninger</h3>
                        <p className="text-sm text-slate-500 italic leading-relaxed">Helbredsoplysninger (journaler, prøvesvar, røntgenbilleder), seksuelle forhold, race eller etnisk oprindelse samt religiøse forhold.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight italic mb-6">Formål</h2>
                    <p className="text-slate-600 italic font-medium mb-6">Vi behandler dine personoplysninger til følgende formål:</p>
                    <ul className="space-y-4">
                      {[
                        'Undersøgelse, diagnostik og behandling',
                        'Udarbejdelse af lægeerklæringer og attester',
                        'Kommunikation med andre sundhedspersoner og sygehuse',
                        'Medicinordinationer og receptudstedelse',
                        'Indberetning til kliniske kvalitetsdatabaser',
                        'Afregning og indberetning af laboratorieprøver',
                        'Anmeldelse af arbejdsskader',
                        'Overholdelse af gældende lovgivning',
                        'Statistiske undersøgelser og videnskabelig forskning'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <div className="mt-2 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0"></div>
                          <p className="text-sm text-slate-600 italic font-medium">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-12 rounded-[3rem] border border-blue-100">
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight italic mb-6">Frivillighed</h2>
                    <p className="text-slate-600 leading-relaxed italic font-medium">
                      Når vi indsamler personoplysninger direkte fra dig, giver du personoplysningerne frivilligt. Du er ikke forpligtet til at give disse personoplysninger til os. Konsekvensen af ikke at give os personoplysningerne vil i nogle tilfælde betyde, at vi ikke kan undersøge, diagnosticere eller behandle dig.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight italic mb-6">Videregivelse</h2>
                    <p className="text-slate-600 italic font-medium mb-6">Dine personoplysninger videregives i nødvendigt omfang til:</p>
                    <ul className="space-y-4">
                      {[
                        'Andre sundhedspersoner i forbindelse med et aktuelt behandlingsforløb',
                        'Offentlige myndigheder, kliniske kvalitetsdatabaser og registre i henhold til gældende lovgivning',
                        'Regionale afregningskontorer ved indberetning for patientbehandling',
                        'Apoteker og Lægemiddelstyrelsen via receptserveren',
                        'Forsikringsselskaber og pårørende med dit forudgående samtykke'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <div className="mt-2 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0"></div>
                          <p className="text-sm text-slate-600 italic font-medium">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight italic mb-6">Opbevaring</h2>
                    <p className="text-slate-600 leading-relaxed italic font-medium">
                      Vi opbevarer personoplysninger om dig, så længe vi har behov for at varetage de angivne formål. I henhold til journalføringsbekendtgørelsen er vi forpligtet til at opbevare oplysninger i minimum 10 år efter seneste tilførsel til journalen.
                    </p>
                    <p className="text-slate-500 italic font-medium mt-4 text-sm">Vores databehandler: EG Clinea</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight italic mb-6">Dine rettigheder</h2>
                    <p className="text-slate-600 italic font-medium mb-6">Du har med lovens begrænsninger følgende rettigheder:</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        'Ret til indsigt i personoplysninger',
                        'Ret til at få ændret ukorrekte oplysninger',
                        'Ret til at få slettet oplysninger',
                        'Ret til at få begrænset behandlingen',
                        'Ret til dataportabilitet',
                        'Ret til at klage til Datatilsynet'
                      ].map((right, i) => (
                        <div key={i} className="flex items-center bg-slate-50 p-6 rounded-2xl">
                          <CheckCircle size={18} className="text-emerald-500 mr-4 shrink-0" />
                          <p className="text-sm text-slate-700 italic font-bold uppercase tracking-tight">{right}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-12 rounded-[3rem]">
                    <h2 className="text-2xl font-black uppercase tracking-tight italic mb-6">Kontakt</h2>
                    <p className="text-blue-100 italic font-medium mb-8">
                      Har du spørgsmål til behandlingen af dine personoplysninger eller udnyttelsen af dine rettigheder, er du velkommen til at kontakte os:
                    </p>
                    <div className="space-y-4">
                      <p className="font-black uppercase text-xs tracking-widest italic">Klinik Sirius · Søndertoften 22 · 6800 Varde</p>
                      <a href="mailto:info@kliniksirius.dk" className="text-emerald-400 font-black text-sm italic hover:text-emerald-300 transition-colors">info@kliniksirius.dk</a>
                    </div>
                    <p className="text-slate-500 text-[10px] italic font-bold uppercase tracking-widest mt-8">Privatlivspolitik gældende fra 01-06-2022</p>
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24 text-sm">
            <div className="col-span-1">
              <div className="flex items-center mb-10">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3 shadow-md">
                  <span className="text-blue-900 font-black italic text-xl">S</span>
                </div>
                <span className="font-extrabold text-white tracking-tighter leading-none uppercase italic text-sm">KLINIK SIRIUS</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8 font-medium italic">Privat speciallægepraksis i Varde med fokus på faglighed og tryghed.</p>
              <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest italic opacity-40">CVR: 43033018</p>
            </div>

            <div>
              <h6 className="font-black mb-10 uppercase tracking-[0.3em] text-emerald-500 text-[10px] italic">Specialer</h6>
              <ul className="space-y-4 text-slate-300 font-bold text-[10px] uppercase tracking-widest italic">
                <li onClick={() => setActivePage('eksem')} className="hover:text-white cursor-pointer transition-colors">Hudsygdomme</li>
                <li onClick={() => setActivePage('hoere')} className="hover:text-white cursor-pointer transition-colors">Øre, Næse, Hals</li>
                <li onClick={() => setActivePage('allergi')} className="hover:text-white cursor-pointer transition-colors">Allergiudredning</li>
              </ul>
            </div>

            <div>
              <h6 className="font-black mb-10 uppercase tracking-[0.3em] text-emerald-500 text-[10px] italic">Genveje</h6>
              <ul className="space-y-4 text-slate-300 font-bold text-[10px] uppercase tracking-widest italic">
                <li onClick={() => setActivePage('forside')} className="hover:text-white cursor-pointer transition-colors">Forside</li>
                <li onClick={() => setActivePage('patientinfo')} className="hover:text-white cursor-pointer transition-colors">Patientinfo</li>
                <li onClick={() => setActivePage('personale')} className="hover:text-white cursor-pointer transition-colors">Personale</li>
                <li onClick={() => setActivePage('find-os')} className="hover:text-white cursor-pointer transition-colors">Kontakt</li>
              </ul>
            </div>

            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10">
              <h6 className="font-black mb-8 uppercase tracking-[0.3em] text-emerald-500 text-[10px] italic">Kontakt</h6>
              <p className="text-white font-black mb-1 tracking-tight uppercase text-xs italic leading-none">Søndertoften 22</p>
              <p className="text-slate-400 mb-6 font-bold text-[10px] uppercase tracking-tighter italic">6800 Varde</p>
              <a href="tel:+4532223224" className="text-xl font-black text-white mb-2 tracking-tighter uppercase italic leading-none block hover:text-emerald-400 transition-colors">32 22 32 24</a>
              <a href="mailto:info@kliniksirius.dk" className="text-slate-400 font-bold text-[10px] italic hover:text-white transition-colors">info@kliniksirius.dk</a>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] italic">
            <div className="flex space-x-12 mb-8 md:mb-0">
              <button onClick={() => setActivePage('privacypolitik')} className="hover:text-white transition-colors">Privatlivspolitik</button>
              <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
            </div>
            <p>© {new Date().getFullYear()} Klinik Sirius. Alle rettigheder forbeholdes.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
