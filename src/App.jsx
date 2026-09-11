import { useState, useEffect, useRef } from 'react';
import {
  Stethoscope, User, MapPin, ChevronDown, ExternalLink, Clock, Phone, Mail,
  Menu, X, Shield, Award, Users, Info, CreditCard, HeartPulse, Plus, Minus,
  CheckCircle, ChevronRight, ArrowRight, Ear, Search, FileText, Activity,
  AlertCircle, Wallet, GraduationCap, Briefcase, Layers, BookOpen, Microscope,
  Check, Navigation, Scale, Calendar, Heart, Undo2, ChevronLeft
} from 'lucide-react';
import './App.css';
import { jobs, formatDanishDate } from './jobs.js';
import { services } from './services.js';
import { metaFor, ogFor, canonicalFor, schemasFor, pathFor } from './seo.js';
import { byer } from './byer.js';

const KlinikSiriusLogo = ({ height = 50, className = 'text-blue-900' }) => {
  const w = Math.round(height * 400 / 120);
  return (
    <svg width={w} height={height} viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g>
        <path d="M40 80C40 80 32 75 30 65C28 55 34 45 42 42C50 39 58 45 58 45M40 80C50 85 65 83 75 72C85 61 82 45 82 45M58 45C58 45 61 35 68 33C75 31 82 35 84 45M68 33C68 33 75 22 82 25C89 28 86 38 84 45M82 25C82 25 92 25 95 33C98 41 89 45 84 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M64 48L66 41L73 39L66 37L64 30L62 37L55 39L62 41L64 48Z" fill="#45B1B8" />
        <circle cx="64" cy="39" r="1.2" fill="white" />
      </g>
      <g>
        <text x="115" y="60" fill="currentColor" style={{ fontFamily: 'sans-serif', fontSize: '32px', fontWeight: 700, letterSpacing: '0.02em' }}>KLINIK SIRIUS</text>
        <text x="115" y="86" fill="currentColor" style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.35em', opacity: 0.7 }}>Speciallæger</text>
        <rect x="115" y="71" width="220" height="1.5" fill="currentColor" style={{ opacity: 0.1 }} />
      </g>
    </svg>
  );
};

const App = ({ initialPage = 'forside' }) => {
  const [activePage, setActivePage] = useState(initialPage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Læs URL ved første load og lyt på browser-knapper frem/tilbage
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '') || 'forside';
    setActivePage(path);
    const handlePop = () => {
      const p = window.location.pathname.replace(/^\//, '') || 'forside';
      setActivePage(p);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setIsServicesOpen(null);

    // Opdater URL
    const url = activePage === 'forside' ? '/' : `/${activePage}`;
    if (window.location.pathname !== url) window.history.pushState({}, '', url);

    // Titler, beskrivelser og schema kommer fra seo.js, samme kilde som prerenderen
    const { title, desc } = metaFor(activePage);
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);

    const canonical = canonicalFor(activePage);
    let canonEl = document.querySelector('link[rel="canonical"]');
    if (!canonEl) { canonEl = document.createElement('link'); canonEl.rel = 'canonical'; document.head.appendChild(canonEl); }
    canonEl.href = canonical;

    const og = ogFor(activePage);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', og.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', og.desc);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', og.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', og.desc);

    for (const [id, schema] of Object.entries(schemasFor(activePage))) {
      const el = document.getElementById(id);
      if (el) el.textContent = schema ? JSON.stringify(schema) : '';
    }
  }, [activePage]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); } };
    if (searchOpen) {
      document.addEventListener('keydown', handleKey);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [searchOpen]);

  const colors = {
    primary: 'text-slate-900',
    secondary: 'text-slate-600',
    accent: 'bg-emerald-700 hover:bg-emerald-800',
    softBg: 'bg-slate-50',
    cardBg: 'bg-white',
    siriusBlue: 'text-blue-900'
  };


  const staff = [
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
      name: 'Kawa Ajgeiy',
      role: 'Speciallæge i hudsygdomme',
      expertise: 'Specialist i hudsygdomme, allergologi og dermatoskopi.',
      summary: 'Uddannet læge fra Syddansk Universitet i Odense 2013. Speciallægeuddannet i hudsygdomme ved Odense Universitetshospital og Aarhus Universitetshospital i 2019.',
      details: [
        { label: 'Uddannelse', items: ['Læge fra Syddansk Universitet, Odense (2013)', 'Speciallæge i hudsygdomme, OUH og Aarhus Universitetshospital (2019)'] },
        { label: 'Fagligt virke', items: ['Ansat som speciallæge ved Hudafdeling og Allergicentret, OUH', 'Bred erfaring inden for diagnose og behandling af hudsygdomme'] },
        { label: 'Autoritet', items: ['Medlem af Dansk Dermatologisk Selskab', 'Flere videnskabelige publikationer inden for hudsygdomme'] }
      ]
    },
    {
      name: 'Jerzy Stiasny',
      image: '/img/jerzy-stiasny.webp',
      role: 'Dr. med., Speciallæge i ortopædkirurgi & overlæge i håndkirurgi',
      expertise: 'Ekspert i håndkirurgi, nerveskader, rekonstruktiv kirurgi og plexus brachialis læsioner.',
      summary: 'Dr. med. og speciallæge i ortopædkirurgi med mange års erfaring inden for håndkirurgi. Overlæge ved Håndkirurgisk sektor, Sygehus Sønderjylland siden 2017. Har haft ophold ved førende internationale centre inden for hånd- og nerveskirurgi.',
      details: [
        { label: 'Erfaring', items: ['Overlæge, Håndkirurgisk sektor, Sygehus Sønderjylland (2017–nu)', 'Overlæge, Ortopædkirurgisk afdeling, Odense Universitetshospital (2012–2017)', 'Afdelingslæge, Håndkirurgisk sektor, OUH (2007–2012)'] },
        { label: 'Internationale ophold', items: ['Hånd- og Mikrokirurgi, Rikshospitalet, Oslo (2011)', 'Peripheral Nerve Injury Unit, Royal National Orthopaedic Hospital, London (2010)'] },
        { label: 'Forskning & publikationer', items: ['Internationalt randomiseret studie om TFCC-rupturer, REINFORCER (2022–nu)', 'Randomiseret studie om CMC-1 artrose, Weilby projekt (2017–2023)', 'Publikationer i The Danish Medical Journal, Ugeskrift for Læger m.fl.'] }
      ]
    }
  ];

  const allServicesFlat = [
    ...services.hud,
    ...services.onhUndersogelser,
    ...services.onhOperationer,
    ...services.haandkirurgi,
  ];

  const staticPages = [
    { name: 'Forside', slug: 'forside', category: 'side' },
    { name: 'Patientinfo', slug: 'patientinfo', category: 'side' },
    { name: 'Personale', slug: 'personale', category: 'side' },
    { name: 'Find os', slug: 'find-os', category: 'side' },
    { name: 'Privatlivspolitik', slug: 'privacypolitik', category: 'side' },
    { name: 'Hudsygdomme', slug: 'hudsygdomme', category: 'side' },
    { name: 'Øre, Næse & Hals', slug: 'ore-naese-hals', category: 'side' },
    { name: 'Håndkirurgi', slug: 'haandkirurgi', category: 'side' },
    { name: 'Job', slug: 'job', category: 'side' },
    ...jobs.map(j => ({ name: j.name, slug: j.slug, category: 'side' })),
  ];

  const searchQ = searchQuery.trim().toLowerCase();
  const searchResults = searchQ.length > 1
    ? [
        ...allServicesFlat.filter(s =>
          s.name.toLowerCase().includes(searchQ) ||
          s.title.toLowerCase().includes(searchQ) ||
          (s.shortIntro && s.shortIntro.toLowerCase().includes(searchQ))
        ),
        ...staticPages.filter(p => p.name.toLowerCase().includes(searchQ)),
      ].slice(0, 8)
    : [];

  const categoryLabel = (cat) => {
    if (cat === 'hud') return 'Hudsygdomme';
    if (cat === 'onh') return 'Øre, Næse & Hals';
    if (cat === 'haand') return 'Håndkirurgi';
    return '';
  };

  const NavItemComponent = ({ title, items, id, categorySlug }) => (
    <div className="relative group">
      <div className={`flex items-center py-2 font-black transition-colors uppercase tracking-tight text-xs ${isServicesOpen === id ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}>
        <a href={pathFor(categorySlug)} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(categorySlug); setIsServicesOpen(null); }} className="hover:text-blue-900 transition-colors">{title}</a>
        <button onClick={() => setIsServicesOpen(isServicesOpen === id ? null : id)} className="ml-1 p-1">
          <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen === id ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className={`absolute left-0 mt-4 w-72 bg-white border border-slate-100 shadow-2xl rounded-[2rem] py-6 z-50 transition-all duration-300 transform origin-top ${isServicesOpen === id ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
        <div className="px-4 space-y-1">
          {items.map((item, idx) => (
            <a href={pathFor(item.slug)}
              key={idx}
              className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-900 transition-all flex items-center justify-between group rounded-xl"
              onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(item.slug); setIsServicesOpen(null); setOpenFaq(null); }}
            >
              {item.name}
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const OnhNavComponent = () => (
    <div className="relative group">
      <div className={`flex items-center py-2 font-black transition-colors uppercase tracking-tight text-xs ${isServicesOpen === 'onh' ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}>
        <a href={pathFor('ore-naese-hals')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('ore-naese-hals'); setIsServicesOpen(null); }} className="hover:text-blue-900 transition-colors">Øre, Næse & Hals</a>
        <button onClick={() => setIsServicesOpen(isServicesOpen === 'onh' ? null : 'onh')} className="ml-1 p-1">
          <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen === 'onh' ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className={`absolute left-0 mt-4 w-[580px] bg-white border border-slate-100 shadow-2xl rounded-[2rem] py-6 z-50 transition-all duration-300 transform origin-top ${isServicesOpen === 'onh' ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
        <div className="grid grid-cols-2 gap-0 px-4">
          <div>
            <p className="px-5 pb-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Undersøgelser</p>
            <div className="space-y-1">
              {services.onhUndersogelser.map((item, idx) => (
                <a href={pathFor(item.slug)}
                  key={idx}
                  className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-900 transition-all flex items-center justify-between group rounded-xl"
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(item.slug); setIsServicesOpen(null); setOpenFaq(null); }}
                >
                  {item.name}
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                </a>
              ))}
            </div>
          </div>
          <div className="border-l border-slate-100">
            <p className="px-5 pb-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Operationer</p>
            <div className="space-y-1">
              {services.onhOperationer.map((item, idx) => (
                <a href={pathFor(item.slug)}
                  key={idx}
                  className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-900 transition-all flex items-center justify-between group rounded-xl"
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(item.slug); setIsServicesOpen(null); setOpenFaq(null); }}
                >
                  {item.name}
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const categoryMeta = {
    hud: {
      slug: 'hudsygdomme',
      title: 'Hudsygdomme',
      h2: 'Ekspertbehandling af alle hudsygdomme',
      intro: 'Klinik Sirius tilbyder speciallægevurdering og behandling af alle former for hudsygdomme i Varde. Med speciallæge Kawa Ajgeiy får du en grundig udredning og en behandlingsplan tilpasset din hudtype og dine symptomer.',
      narrative: 'Vi behandler alt fra kroniske hudlidelser som eksem og psoriasis til pludselige udbrud og kontrol af modermærker. Kawa Ajgeiy er uddannet ved OUH og Aarhus Universitetshospital og er tilknyttet Hudafdeling og Allergicentret på OUH.\n\nHos Klinik Sirius kan du komme som privatbetalende, via din sundhedsforsikring eller som ventetidsgaranti-patient fra regionen. Vi tilbyder hurtig adgang til en specialist – uden unødig ventetid.\n\nUanset om du er bekymret for et nyt modermærke, kæmper med tilbagevendende eksem eller ønsker behandling af en kronisk hudlidelse, er du i trygge hænder hos os i Varde.',
      specialist: { name: 'Kawa Ajgeiy', role: 'Speciallæge i hudsygdomme', cred1: 'OUH og Aarhus Universitetshospital', cred2: 'Dansk Dermatologisk Selskab', img: null },
      services: [{ label: null, items: 'hud' }],
    },
    onh: {
      slug: 'ore-naese-hals',
      title: 'Øre, Næse & Hals',
      h2: 'Specialiseret ØNH-behandling i Varde',
      intro: 'Klinik Sirius tilbyder et bredt spektrum af øre-, næse- og halsundersøgelser og operationer i Varde. Speciallæge Jalal Taha Saadi varetager alt fra allergiudredning og høreprøver til avanceret kirurgi.',
      narrative: 'Vores ØNH-speciallæge Jalal Taha Saadi har mange års erfaring fra SVS Esbjerg og OUH og er specialiseret i diagnostik og behandling af øre-, næse- og halssygdomme hos børn og voksne.\n\nVi tilbyder både udredende undersøgelser og kirurgiske indgreb under samme tag i Varde, og du kan komme som privatbetalende, via forsikring eller som ventetidsgaranti-patient.\n\nFra allergiudredning og svimmelhedsudredning til mandel- og bihuleoperationer – vi dækker hele spektret af ØNH-behandlinger i trygge og professionelle rammer.',
      specialist: { name: 'Jalal Taha Saadi', role: 'Speciallæge i ØNH', cred1: 'SVS Esbjerg og OUH', cred2: 'Dansk Rhinologisk Selskab', img: '/img/jalal-taha-saadi.webp' },
      services: [{ label: 'Undersøgelser', items: 'onhUndersogelser' }, { label: 'Operationer', items: 'onhOperationer' }],
    },
    haand: {
      slug: 'haandkirurgi',
      title: 'Håndkirurgi',
      h2: 'Præcis håndkirurgi og nervebehandling',
      intro: 'Klinik Sirius tilbyder specialiseret håndkirurgi i Varde med Dr. med. Jerzy Stiasny. Vi udreder og behandler nerveafklemninger, senesygdomme, ganglion, Dupuytrens kontraktur og godartede tumorer i hånd, håndled og underarm.',
      narrative: 'Jerzy Stiasny er dr. med. og speciallæge i ortopædkirurgi med mange års erfaring inden for håndkirurgi. Han er overlæge ved Håndkirurgisk sektor, Sygehus Sønderjylland og har haft ophold ved førende internationale centre inden for hånd- og nerveskirurgi.\n\nHos Klinik Sirius tilbyder vi en grundig specialistvurdering, så du hurtigt får klarhed over din tilstand og de bedste behandlingsmuligheder – hvad enten det drejer sig om konservativ behandling eller kirurgi.\n\nDu kan komme som privatbetalende, via sundhedsforsikring eller som ventetidsgaranti-patient fra regionen.',
      specialist: { name: 'Jerzy Stiasny', role: 'Dr. med., overlæge i håndkirurgi', cred1: 'OUH & Sygehus Sønderjylland', cred2: 'Internationale ophold, hånd- og nerveskirurgi', img: '/img/jerzy-stiasny.webp' },
      services: [{ label: null, items: 'haandkirurgi' }],
    },
  };

  const CategoryLandingPage = ({ cat }) => {
    const meta = categoryMeta[cat];
    return (
      <div className="animate-in fade-in duration-700">
        <section className="bg-slate-50 py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/5 -skew-x-12 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <nav className="flex flex-wrap mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <a href={pathFor('forside')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('forside'); }} className="hover:text-blue-900 transition-colors">Forside</a>
                <span className="mx-3">/</span>
                <span className="text-blue-900">{meta.title}</span>
              </nav>
              <h1 className="text-3xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">{meta.title}</h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light border-l-8 border-emerald-700 pl-8">{meta.intro}</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`px-10 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl hover:-translate-y-1 transition-all inline-flex items-center ${colors.accent}`}>
                  Book tid online
                </a>
                <div className="flex items-center px-6 text-slate-500 font-black uppercase text-xs tracking-widest">
                  <Phone size={18} className="mr-3 text-blue-900" /> 32 22 32 24
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black mb-8 text-blue-900 uppercase tracking-tight">{meta.h2}</h2>
                <div className="text-xl text-slate-600 leading-relaxed font-light space-y-8">
                  {meta.narrative.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
              <div className="pt-12 border-t border-slate-100 space-y-12">
                {meta.services.map((section, si) => (
                  <div key={si}>
                    {section.label && <h3 className="text-xl font-black uppercase tracking-[0.2em] text-slate-400 mb-6">{section.label}</h3>}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {services[section.items].map((item, idx) => (
                        <a href={pathFor(item.slug)}
                          key={idx}
                          onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(item.slug); setOpenFaq(null); }}
                          className="flex items-center justify-between px-6 py-5 bg-slate-50 hover:bg-blue-900 hover:text-white rounded-2xl transition-all group text-left border border-transparent hover:border-blue-900 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
                        >
                          <span className="font-black text-[11px] uppercase tracking-widest text-slate-700 group-hover:text-white">{item.name}</span>
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-white transition-all -translate-x-1 group-hover:translate-x-0 shrink-0 ml-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-10 -translate-y-10"></div>
                  <div className="flex items-center space-x-5 mb-10 relative z-10">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center shadow-inner">
                      {meta.specialist.img
                        ? <img src={meta.specialist.img} width="800" height="1090" loading="lazy" decoding="async" alt={meta.specialist.name} className="w-full h-full object-cover object-top" />
                        : <span className="text-blue-900 font-black text-2xl uppercase">KA</span>
                      }
                    </div>
                    <div>
                      <p className="font-black text-xl leading-none uppercase text-slate-900">{meta.specialist.name}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">{meta.specialist.role}</p>
                    </div>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center text-sm font-bold text-slate-700 uppercase tracking-tight">
                      <CheckCircle size={18} className="text-emerald-500 mr-4 shrink-0" /> {meta.specialist.cred1}
                    </div>
                    <div className="flex items-center text-sm font-bold text-slate-700 uppercase tracking-tight">
                      <CheckCircle size={18} className="text-emerald-500 mr-4 shrink-0" /> {meta.specialist.cred2}
                    </div>
                  </div>
                </div>
                <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">Book tid nu</h4>
                    <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">Få en specialistvurdering hurtigt uden unødig ventetid.</p>
                    <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`w-full py-5 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95 inline-block text-center ${colors.accent}`}>
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
  };

  const JobFacts = ({ job }) => (
    <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
      <h2 className="font-black mb-8 uppercase tracking-[0.3em] text-emerald-700 text-[10px]">Kort om stillingen</h2>
      <dl className="space-y-5">
        {job.facts.map((f, i) => (
          <div key={i} className="flex flex-col">
            <dt className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">{f.label}</dt>
            <dd className="text-sm font-bold text-slate-800 leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  const JobPostingPage = ({ job }) => (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-50 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex flex-wrap mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href={pathFor('forside')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('forside'); }} className="hover:text-blue-900 transition-colors">Forside</a>
              <span className="mx-3">/</span>
              <a href={pathFor('job')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('job'); }} className="hover:text-blue-900 transition-colors">Job</a>
              <span className="mx-3">/</span>
              <span className="text-blue-900">{job.name}</span>
            </nav>
            <h1 className="text-3xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">{job.h1}</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light border-l-8 border-emerald-700 pl-8">{job.lead}</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href={`mailto:${job.applyEmail}?subject=${encodeURIComponent('Ansøgning til stillingen som ' + job.name)}`} className={`px-10 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl hover:-translate-y-1 transition-all inline-flex items-center ${colors.accent}`}>
                Send ansøgning <Mail size={16} className="ml-3" />
              </a>
              <div className="flex items-center px-6 text-slate-500 font-black uppercase text-xs tracking-widest">
                <Phone size={18} className="mr-3 text-blue-900" /> {job.applyPhone}
              </div>
            </div>
            <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Opslået <time dateTime={job.datePosted}>{formatDanishDate(job.datePosted)}</time> · Ansøgningsfrist <time dateTime={job.validThrough}>{formatDanishDate(job.validThrough)}</time>
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-14">
            {job.sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-3xl font-black mb-8 text-blue-900 uppercase tracking-tight">{s.h2}</h2>
                {s.paragraphs && (
                  <div className="text-xl text-slate-600 leading-relaxed font-light space-y-6">
                    {s.paragraphs.map((p, pi) => <p key={pi}>{p}</p>)}
                  </div>
                )}
                {s.bullets && (
                  <ul className="space-y-4">
                    {s.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start text-lg text-slate-600 font-light leading-relaxed">
                        <CheckCircle size={20} className="text-emerald-600 mr-4 mt-1 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="pt-12 border-t border-slate-100">
              <h2 className="text-3xl font-black mb-10 text-blue-900 uppercase tracking-tight">Spørgsmål og svar</h2>
              <div className="space-y-6">
                {job.faq.map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                    <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">{item.q}</h3>
                    <p className="text-slate-600 font-light leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <JobFacts job={job} />
              <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Søg stillingen</h2>
                  <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">Send ansøgning og CV til {job.applyEmail} att. {job.contactName}. Vi holder samtaler løbende.</p>
                  <a href={`mailto:${job.applyEmail}?subject=${encodeURIComponent('Ansøgning til stillingen som ' + job.name)}`} className={`w-full py-5 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95 inline-block text-center ${colors.accent}`}>
                    Send ansøgning
                  </a>
                  <a href="tel:+4532223224" className="block mt-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 hover:text-white transition-colors">Ring 32 22 32 24</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const JobOverviewPage = () => (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-50 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex flex-wrap mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href={pathFor('forside')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('forside'); }} className="hover:text-blue-900 transition-colors">Forside</a>
              <span className="mx-3">/</span>
              <span className="text-blue-900">Job</span>
            </nav>
            <h1 className="text-3xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">Ledige stillinger</h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light border-l-8 border-emerald-700 pl-8">
              Klinik Sirius er en privat speciallægepraksis i Varde med hudsygdomme, øre, næse og hals samt håndkirurgi under samme tag. Her står de stillinger, vi søger at besætte lige nu.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {jobs.map((job) => (
              <a href={pathFor(job.slug)}
                key={job.slug}
                onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(job.slug); }}
                className="w-full text-left bg-slate-50 hover:bg-blue-900 rounded-[2.5rem] p-10 transition-all group border border-transparent hover:border-blue-900 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-700 group-hover:text-emerald-400 mb-4">Ledig stilling</p>
                <h2 className="text-2xl font-black text-slate-900 group-hover:text-white uppercase tracking-tight mb-4">{job.name}</h2>
                <p className="text-slate-600 group-hover:text-blue-100 font-light leading-relaxed mb-6">{job.lead}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-200">
                  <span className="flex items-center"><MapPin size={12} className="mr-2" /> Varde</span>
                  <span className="flex items-center"><Clock size={12} className="mr-2" /> Fuldtid eller deltid</span>
                  <span className="flex items-center"><Calendar size={12} className="mr-2" /> Frist {formatDanishDate(job.validThrough)}</span>
                </div>
                <span className="inline-flex items-center mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-900 group-hover:text-white">
                  Læs opslaget <ArrowRight size={14} className="ml-3 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </span>
              </a>
            ))}
            {jobs.length === 0 && (
              <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                <p className="text-xl text-slate-600 font-light leading-relaxed">Der er ingen ledige stillinger lige nu.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl">
              <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Uopfordret ansøgning</h2>
              <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">Er der ingen stilling, der passer, må du gerne skrive til os alligevel. Vi læser med, når vi udvider.</p>
              <a href="mailto:info@kliniksirius.dk?subject=Uopfordret%20ans%C3%B8gning" className={`w-full py-5 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95 inline-block text-center ${colors.accent}`}>
                Skriv til os
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const CityPage = ({ by }) => (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-50 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex flex-wrap mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="/" onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('forside'); }} className="hover:text-blue-900 transition-colors">Forside</a>
              <span className="mx-3">/</span>
              <a href={pathFor('find-os')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('find-os'); }} className="hover:text-blue-900 transition-colors">Find os</a>
              <span className="mx-3">/</span>
              <span className="text-blue-900">{by.by}</span>
            </nav>
            <h1 className="text-3xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">{by.h1}</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light border-l-8 border-emerald-700 pl-8">{by.lead}</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`px-10 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl hover:-translate-y-1 transition-all inline-flex items-center ${colors.accent}`}>
                Book tid online
              </a>
              <div className="flex items-center px-6 text-slate-500 font-black uppercase text-xs tracking-widest">
                <Phone size={18} className="mr-3 text-blue-900" /> 32 22 32 24
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-14">
            {by.sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-3xl font-black mb-8 text-blue-900 uppercase tracking-tight">{s.h2}</h2>
                <div className="text-xl text-slate-600 leading-relaxed font-light space-y-6">
                  {s.paragraphs.map((p, pi) => <p key={pi}>{p}</p>)}
                </div>
              </div>
            ))}

            <div>
              <h2 className="text-3xl font-black mb-8 text-blue-900 uppercase tracking-tight">Afstande fra nabobyerne</h2>
              <p className="text-slate-500 font-light mb-8">Kørselsafstand til Søndertoften 22 målt ad vej, ikke i fugleflugt.</p>
              <div className="overflow-x-auto rounded-[2rem] border border-slate-100">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-5 sm:px-8 py-5 text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">By</th>
                      <th className="px-5 sm:px-8 py-5 text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Afstand</th>
                      <th className="px-5 sm:px-8 py-5 text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Køretid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-100 bg-blue-50/40">
                      <td className="px-5 sm:px-8 py-5 font-black text-slate-900 text-sm">{by.by}</td>
                      <td className="px-5 sm:px-8 py-5 text-slate-600 text-sm">{by.km} km</td>
                      <td className="px-5 sm:px-8 py-5 text-slate-600 text-sm">{by.minutter} min</td>
                    </tr>
                    {by.naboer.map((n) => (
                      <tr key={n.navn} className="border-t border-slate-100">
                        <td className="px-5 sm:px-8 py-5 font-bold text-slate-700 text-sm">{n.navn}</td>
                        <td className="px-5 sm:px-8 py-5 text-slate-600 text-sm">{n.km} km</td>
                        <td className="px-5 sm:px-8 py-5 text-slate-600 text-sm">{n.minutter} min</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-8 text-blue-900 uppercase tracking-tight">Spørgsmål og svar</h2>
              <div className="space-y-6">
                {by.faq.map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                    <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">{item.q}</h3>
                    <p className="text-slate-600 font-light leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100">
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Andre byer i området</h2>
              <div className="flex flex-wrap gap-3">
                {byer.filter((b) => b.slug !== by.slug).map((b) => (
                  <a
                    key={b.slug}
                    href={pathFor(b.slug)}
                    onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(b.slug); }}
                    className="px-6 py-3 bg-slate-50 hover:bg-blue-900 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all"
                  >
                    {b.by} {b.km} km
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                <h2 className="font-black mb-8 uppercase tracking-[0.3em] text-emerald-700 text-[10px]">Fra {by.by}</h2>
                <dl className="space-y-5">
                  <div><dt className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Afstand</dt><dd className="text-sm font-bold text-slate-800">{by.km} km ad {by.rute}</dd></div>
                  <div><dt className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Køretid</dt><dd className="text-sm font-bold text-slate-800">Cirka {by.minutter} minutter</dd></div>
                  <div><dt className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Kommune</dt><dd className="text-sm font-bold text-slate-800">{by.kommune}</dd></div>
                  <div><dt className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Tog</dt><dd className="text-sm font-bold text-slate-800">{by.station ? `${by.station}, skift kan forekomme` : 'Ingen persontog'}</dd></div>
                  <div><dt className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Parkering</dt><dd className="text-sm font-bold text-slate-800">Gratis ved døren, P-skive to timer</dd></div>
                </dl>
              </div>
              <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl">
                <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Specialer</h2>
                <div className="space-y-3">
                  {[['Hudsygdomme', 'hudsygdomme'], ['Øre, Næse & Hals', 'ore-naese-hals'], ['Håndkirurgi', 'haandkirurgi']].map(([label, slug]) => (
                    <a
                      key={slug}
                      href={pathFor(slug)}
                      onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(slug); }}
                      className="flex items-center justify-between px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      {label}
                      <ChevronRight size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ServiceLandingPage = ({ service }) => (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-50 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex flex-wrap mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href={pathFor('forside')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('forside'); }} className="hover:text-blue-900 transition-colors">Forside</a>
              <span className="mx-3">/</span>
              <a href={pathFor(service.category === 'hud' ? 'hudsygdomme' : service.category === 'haand' ? 'haandkirurgi' : 'ore-naese-hals')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(service.category === 'hud' ? 'hudsygdomme' : service.category === 'haand' ? 'haandkirurgi' : 'ore-naese-hals'); }} className="hover:text-blue-900 transition-colors">
                {service.category === 'hud' ? 'Hudsygdomme' : service.category === 'haand' ? 'Håndkirurgi' : 'Øre, Næse & Hals'}
              </a>
              <span className="mx-3">/</span>
              <span className="text-blue-900">{service.name}</span>
            </nav>
            <h1 className="text-3xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">{service.title}</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light border-l-8 border-emerald-700 pl-8">
              {service.shortIntro}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`px-10 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl hover:-translate-y-1 transition-all inline-flex items-center ${colors.accent}`}>
                Book tid online
              </a>
              <div className="flex items-center px-6 text-slate-500 font-black uppercase text-xs tracking-widest">
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
              <h2 className="text-3xl font-black mb-8 text-blue-900 uppercase tracking-tight">{service.h2Title}</h2>
              <div className="text-xl text-slate-600 leading-relaxed font-light space-y-8">
                {service.narrative.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="pt-16 border-t border-slate-100">
              <h3 className="text-3xl font-black mb-10 text-slate-900 uppercase tracking-tight">Ofte stillede spørgsmål</h3>
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
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center shadow-inner">
                    {service.category === 'hud'
                      ? <span className="text-blue-900 font-black text-2xl uppercase">KA</span>
                      : service.category === 'haand'
                      ? <img src="/img/jerzy-stiasny.webp" width="800" height="1090" loading="lazy" decoding="async" alt="Jerzy Stiasny" className="w-full h-full object-cover object-top" />
                      : <img src="/img/jalal-taha-saadi.webp" width="800" height="1200" loading="lazy" decoding="async" alt="Jalal Taha Saadi" className="w-full h-full object-cover object-top" />
                    }
                  </div>
                  <div>
                    <p className="font-black text-xl leading-none uppercase text-slate-900">{service.category === 'hud' ? 'Kawa Ajgeiy' : service.category === 'haand' ? 'Jerzy Stiasny' : 'Jalal Taha Saadi'}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">{service.category === 'hud' ? 'Speciallæge i hudsygdomme' : service.category === 'haand' ? 'Dr. med., overlæge i håndkirurgi' : 'Speciallæge i ØNH'}</p>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center text-sm font-bold text-slate-700 uppercase tracking-tight">
                    <CheckCircle size={18} className="text-emerald-500 mr-4" /> {service.category === 'hud' ? 'OUH og Aarhus Universitetshospital' : service.category === 'haand' ? 'OUH & Sygehus Sønderjylland' : 'SVS Esbjerg og OUH'}
                  </div>
                  <div className="flex items-center text-sm font-bold text-slate-700 uppercase tracking-tight">
                    <CheckCircle size={18} className="text-emerald-500 mr-4" /> {service.category === 'hud' ? 'Dansk Dermatologisk Selskab' : service.category === 'haand' ? 'Internationale ophold, hånd- og nerveskirurgi' : 'Dansk Rhinologisk Selskab'}
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">Book tid nu</h4>
                  <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">Få en specialistvurdering hurtigt uden unødig ventetid.</p>
                  <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`w-full py-5 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95 inline-block text-center ${colors.accent}`}>
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
          <a href="/" onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('forside'); }} className="flex items-center" aria-label="Klinik Sirius forside">
            <KlinikSiriusLogo height={46} />
          </a>

          <nav className="hidden lg:flex items-center space-x-8">
            <NavItemComponent title="Hudsygdomme" items={services.hud} id="hud" categorySlug="hudsygdomme" />
            <OnhNavComponent />
            <NavItemComponent title="Håndkirurgi" items={services.haandkirurgi} id="haand" categorySlug="haandkirurgi" />
            <a href={pathFor('personale')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('personale'); }} className={`font-black text-xs transition-colors uppercase tracking-tight ${activePage === 'personale' ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}>Personale</a>
            <a href={pathFor('job')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('job'); }} className={`font-black text-xs transition-colors uppercase tracking-tight ${activePage.startsWith('job') ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}>Job</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-slate-500 hover:text-blue-900 transition-colors" aria-label="Søg">
              <Search size={20} />
            </button>
            <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`hidden sm:flex items-center px-6 py-3 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 ${colors.accent}`}>
              Selvbetjening <ExternalLink size={14} className="ml-2" />
            </a>
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center px-4 border-b border-slate-100">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Søg efter ydelse eller side..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-3 py-4 text-slate-900 placeholder-slate-400 text-base outline-none"
                autoComplete="off"
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-2 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            {searchResults.length > 0 && (
              <ul className="max-h-80 overflow-y-auto py-2">
                {searchResults.map((item, i) => (
                  <li key={i}>
                    <a href={pathFor(item.slug)}
                      className="w-full text-left px-5 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between group"
                      onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(item.slug); setSearchOpen(false); setSearchQuery(''); }}
                    >
                      <div>
                        <span className="block text-sm font-semibold text-slate-900">{item.name || item.title}</span>
                        {item.category && item.category !== 'side' && (
                          <span className="text-xs text-slate-400">{categoryLabel(item.category)}</span>
                        )}
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {searchQ.length > 1 && searchResults.length === 0 && (
              <div className="px-5 py-6 text-sm text-slate-400 text-center">Ingen resultater for "{searchQuery}"</div>
            )}
            {searchQ.length <= 1 && (
              <div className="px-5 py-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Populære sider</p>
                <div className="flex flex-wrap gap-2">
                  {['hudsygdomme', 'ore-naese-hals', 'haandkirurgi', 'patientinfo', 'personale', 'find-os'].map(slug => (
                    <a href={pathFor(slug)} key={slug} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(slug); setSearchOpen(false); setSearchQuery(''); }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-slate-600 transition-colors capitalize">
                      {slug === 'ore-naese-hals' ? 'Øre, Næse & Hals' : slug === 'haandkirurgi' ? 'Håndkirurgi' : slug === 'hudsygdomme' ? 'Hudsygdomme' : slug === 'patientinfo' ? 'Patientinfo' : slug === 'personale' ? 'Personale' : 'Find os'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobil Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-6 h-20 border-b border-slate-100 shrink-0">
            <div className="flex items-center">
              <KlinikSiriusLogo height={42} />
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-50 rounded-xl">
              <X size={24} className="text-slate-600" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col px-4 py-4 flex-1">
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
                    <a href={pathFor(s.slug)}
                      key={s.slug}
                      onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(s.slug); }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      {s.name}
                      <ChevronRight size={12} className="text-slate-300" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Øre, Næse & Hals accordion */}
            <div>
              <button
                onClick={() => setIsServicesOpen(isServicesOpen === 'onh' ? null : 'onh')}
                className="w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Øre, Næse & Hals</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isServicesOpen === 'onh' ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen === 'onh' && (
                <div className="ml-4 mb-2 border-l-2 border-emerald-100 pl-4 space-y-1">
                  <p className="px-4 pt-2 pb-1 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Undersøgelser</p>
                  {services.onhUndersogelser.map(s => (
                    <a href={pathFor(s.slug)}
                      key={s.slug}
                      onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(s.slug); setIsMenuOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                    >
                      {s.name}
                      <ChevronRight size={12} className="text-slate-300" />
                    </a>
                  ))}
                  <p className="px-4 pt-4 pb-1 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Operationer</p>
                  {services.onhOperationer.map(s => (
                    <a href={pathFor(s.slug)}
                      key={s.slug}
                      onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(s.slug); setIsMenuOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                    >
                      {s.name}
                      <ChevronRight size={12} className="text-slate-300" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Håndkirurgi accordion */}
            <div>
              <button
                onClick={() => setIsServicesOpen(isServicesOpen === 'haand' ? null : 'haand')}
                className="w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Håndkirurgi</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isServicesOpen === 'haand' ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen === 'haand' && (
                <div className="ml-4 mb-2 border-l-2 border-blue-100 pl-4 space-y-1">
                  {services.haandkirurgi.map(s => (
                    <a href={pathFor(s.slug)}
                      key={s.slug}
                      onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(s.slug); }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      {s.name}
                      <ChevronRight size={12} className="text-slate-300" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Personale */}
            <a href={pathFor('personale')}
              onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('personale'); setIsMenuOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Personale</span>
              <ChevronRight size={16} className="text-slate-300" />
            </a>

            {/* Job */}
            <a href={pathFor('job')}
              onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('job'); setIsMenuOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Job</span>
              <ChevronRight size={16} className="text-slate-300" />
            </a>

          </nav>

          {/* CTA */}
          <div className="px-6 pb-8 pt-4 border-t border-slate-100 shrink-0">
            <a
              href="https://patientportal.egclinea.com/?id=838"
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
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.05] tracking-tight uppercase">
                    Speciallæger <br />
                    <span className="text-blue-900">uden den lange ventetid.</span>
                  </h1>
                  <div className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-light mx-auto lg:mx-0 border-l-8 border-emerald-500 pl-8">
                    <p className="mb-4 text-slate-700 font-bold">Hos Klinik Sirius møder du erfarne speciallæger der handler, når det gælder. Vi sikrer dig den rigtige behandling til rette tid.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 justify-center lg:justify-start font-black uppercase tracking-widest text-[10px]">
                    <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`px-10 py-5 rounded-[2rem] text-white font-bold shadow-xl hover:-translate-y-1 transition-all active:scale-95 inline-block text-center ${colors.accent}`}>
                      Book tid nu
                    </a>
                    <a href={pathFor('patientinfo')}
                      onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('patientinfo'); }}
                      className="px-10 py-5 rounded-[2rem] bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                    >
                      Patientrettigheder
                    </a>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="w-full h-[650px] rounded-[3rem] shadow-2xl relative overflow-hidden group border-8 border-white">
                    <img src="/img/hero-1600.webp" srcSet="/img/hero-1000.webp 1000w, /img/hero-1600.webp 1600w" sizes="(max-width: 1024px) 100vw, 50vw" width="1600" height="1079" fetchPriority="high" decoding="async" alt="Klinik Sirius, speciallæger i Varde" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-6 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-50 max-w-xs">
                    <div className="flex items-center space-x-4 mb-3">
                      <Award size={24} className="text-emerald-700" />
                      <span className="font-extrabold text-blue-900 uppercase tracking-widest text-[12px]">Erfarne speciallæger</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Vores speciallæger har mange års erfaring og sikrer dig faglig kompetent behandling.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Specialties */}
            <section className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
                <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 group relative overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-12 -translate-y-12"></div>
                  <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform shadow-lg">
                    <Stethoscope size={32} />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-6 text-slate-900 uppercase tracking-tight">Hudsygdomme</h3>
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light">Speciallæge Kawa Ajgeiy varetager udredning og behandling af alle former for hudsygdomme. Vi dækker eksem, nældefeber, psoriasis, modermærker og meget mere.</p>
                  <a href={pathFor('hudsygdomme')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('hudsygdomme'); }} className="flex items-center font-black text-blue-900 uppercase text-[10px] tracking-[0.3em] group">
                    Se ydelser <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform text-emerald-600" />
                  </a>
                </div>

                <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 group relative overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full translate-x-12 -translate-y-12"></div>
                  <div className="w-16 h-16 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform shadow-lg">
                    <Ear size={32} />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-6 text-slate-900 uppercase tracking-tight">Øre, Næse, Hals</h3>
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light">Speciallæge Jalal Taha Saadi varetager undersøgelser og operationer inden for øre, næse og hals. Vi tilbyder alt fra allergiudredning og høreprøver til avanceret kirurgi.</p>
                  <a href={pathFor('ore-naese-hals')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('ore-naese-hals'); }} className="flex items-center font-black text-emerald-800 uppercase text-[10px] tracking-[0.3em] group">
                    Se ydelser <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform text-blue-900" />
                  </a>
                </div>

                <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 group relative overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-12 -translate-y-12"></div>
                  <div className="w-16 h-16 bg-indigo-800 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform shadow-lg">
                    <Layers size={32} />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-6 text-slate-900 uppercase tracking-tight">Håndkirurgi</h3>
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light">Dr. med. Jerzy Stiasny varetager specialiseret håndkirurgi med mange års klinisk erfaring. Vi behandler nerveafklemninger, senesygdomme, ganglion og Dupuytrens kontraktur.</p>
                  <a href={pathFor('haandkirurgi')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('haandkirurgi'); }} className="flex items-center font-black text-indigo-800 uppercase text-[10px] tracking-[0.3em] group">
                    Se ydelser <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform text-emerald-600" />
                  </a>
                </div>
              </div>
            </section>

            {/* Journey */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                <h2 className="text-4xl font-black text-blue-900 uppercase tracking-tight mb-4">Dit forløb hos os</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">Vi har gjort det nemt og overskueligt at blive patient. Her er de fire trin i din behandling.</p>
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
                      <div className="text-blue-900 font-black text-5xl mb-6 opacity-20 group-hover:text-white group-hover:opacity-40">{item.step}</div>
                      <div className="mb-6 flex justify-center text-emerald-600 group-hover:text-white transition-colors">{item.icon}</div>
                      <h4 className="text-xl font-bold mb-3 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-sm opacity-70 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Category pages */}
        {byer.filter(b => b.slug === activePage).map(b => <CityPage key={b.slug} by={b} />)}
        {activePage === 'job' && <JobOverviewPage />}
        {jobs.filter(j => j.slug === activePage).map(j => <JobPostingPage key={j.slug} job={j} />)}
        {activePage === 'hudsygdomme' && <CategoryLandingPage cat="hud" />}
        {activePage === 'ore-naese-hals' && <CategoryLandingPage cat="onh" />}
        {activePage === 'haandkirurgi' && <CategoryLandingPage cat="haand" />}

        {/* Dynamic service pages */}
        {[...services.hud, ...services.onhUndersogelser, ...services.onhOperationer, ...services.haandkirurgi].some(s => s.slug === activePage) && (
          <ServiceLandingPage service={[...services.hud, ...services.onhUndersogelser, ...services.onhOperationer, ...services.haandkirurgi].find(s => s.slug === activePage)} />
        )}

        {/* Patientinfo */}
        {activePage === 'patientinfo' && (
          <div className="animate-in fade-in duration-700">
            <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-900/5 -skew-x-12 translate-x-1/2"></div>
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <nav className="mb-8 text-xs font-black uppercase tracking-widest text-slate-400">
                  <a href={pathFor('forside')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('forside'); }} className="hover:text-blue-900 transition-colors flex items-center">
                    <ChevronLeft size={16} className="mr-1" /> Forside
                  </a>
                </nav>
                <div className="max-w-4xl">
                  <h1 className="text-3xl lg:text-6xl font-black text-blue-900 mb-8 uppercase tracking-tighter">Patientinformation</h1>
                  <p className="text-xl text-slate-600 leading-relaxed font-light border-l-8 border-emerald-700 pl-8">
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
                      <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight mb-4 leading-tight">Patient i det offentlige?</h2>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                        Hvis ventetiden i det offentlige er lang, har du ofte ret til at blive undersøgt og behandlet hos os via lovbestemte garantier.
                      </p>
                      <div className="pt-6 border-t border-blue-200">
                        <p className="text-xs font-black uppercase text-blue-400 tracking-widest mb-2">Kontakt først</p>
                        <p className="text-sm font-bold text-blue-900 uppercase">Patientvejledningen i din region</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-2/3 space-y-8 lg:space-y-16">
                    <div className="bg-slate-50 p-8 lg:p-16 rounded-[2rem] lg:rounded-[4rem] border border-slate-100 space-y-8 lg:space-y-10 shadow-sm">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 shrink-0 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">30</div>
                          <h3 className="text-xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Udredningsret & Garanti</h3>
                        </div>
                        <p className="text-base lg:text-xl text-slate-600 leading-relaxed font-light mb-6">
                          Som patient har du ret til at blive udredt inden for <span className="font-black text-slate-900 underline decoration-emerald-500 underline-offset-4">30 dage</span> efter din henvisning er modtaget.
                        </p>
                        <ul className="space-y-4 lg:space-y-6">
                          <li className="flex items-start">
                            <div className="mt-1.5 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-tight leading-relaxed">Hvis fristen ikke kan overholdes, skal regionen henvise dig til et privat behandlingssted som Klinik Sirius.</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1.5 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-tight leading-relaxed">Kontakt Patientvejledningen/Patientkontoret i din region for at benytte din ret.</p>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-8 lg:pt-10 border-t border-slate-200">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 shrink-0 bg-emerald-700 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">25</div>
                          <h3 className="text-xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Behandlingsgaranti (2025)</h3>
                        </div>
                        <p className="text-base lg:text-xl text-slate-600 leading-relaxed font-light mb-6">
                          Fra og med <span className="font-black text-blue-900">2025</span> har du ret til behandling inden for 30 dage fra diagnosetidspunktet, når behandlingsbehovet er vurderet.
                        </p>
                        <ul className="space-y-4 lg:space-y-6">
                          <li className="flex items-start">
                            <div className="mt-1.5 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-tight leading-relaxed">Du skal være færdigudredt — en diagnose skal foreligge.</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1.5 mr-4 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-tight leading-relaxed">Klinik Sirius skal have aftale med din region om behandling af den pågældende lidelse.</p>
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
                      <span className="text-xs font-black uppercase tracking-[0.3em]">Forsikring & Privat</span>
                    </div>
                    <h2 className="text-3xl lg:text-7xl font-black uppercase tracking-tight mb-6 lg:mb-10 leading-tight lg:leading-[0.95]">Brug din forsikring.</h2>
                    <p className="text-base lg:text-xl text-blue-100 font-light leading-relaxed mb-8">
                      Klinik Sirius samarbejder med en række danske forsikringsselskaber og kan i mange tilfælde tilbyde både diagnostik og behandling inden for forsikringsdækningen.
                    </p>
                    <div className="space-y-5 lg:space-y-8">
                      <p className="text-sm font-bold uppercase tracking-widest flex items-start lg:items-center"><CheckCircle size={18} className="text-emerald-400 mr-4 shrink-0 mt-0.5 lg:mt-0" /> Undersøg om du er dækket via din arbejdsgiver</p>
                      <p className="text-sm font-bold uppercase tracking-widest flex items-start lg:items-center"><CheckCircle size={18} className="text-emerald-400 mr-4 shrink-0 mt-0.5 lg:mt-0" /> Kontakt selskabet og få godkendelse inden booking</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] lg:rounded-[4rem] border border-white/20 relative shadow-2xl">
                    <Wallet className="text-emerald-400 mb-6" size={48} />
                    <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Privatbetaling</h3>
                    <p className="text-blue-100 font-light leading-relaxed mb-8 text-base lg:text-lg">
                      Som privatbetalende får du direkte adgang til speciallæge med <span className="font-bold text-white uppercase underline decoration-emerald-500">minimal ventetid</span>.
                    </p>
                    <a href="mailto:info@kliniksirius.dk" className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-xl active:scale-95 transition-all hover:bg-slate-100 block text-center">
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
                <h1 className="text-3xl lg:text-7xl font-black text-blue-900 mb-6 lg:mb-10 uppercase tracking-tighter leading-tight lg:leading-[0.85]">Speciallægerne <br />i Klinik Sirius.</h1>
                <p className="text-lg lg:text-2xl text-slate-500 font-light leading-relaxed border-l-4 lg:border-l-8 border-emerald-500 pl-6 lg:pl-10">
                  Mød holdet bag Klinik Sirius i Varde. Vores læger kombinerer mange års praksis i det danske sygehusvæsen med dedikeret patientkontakt.
                </p>
              </div>

              <div className="space-y-16 lg:space-y-48">
                {staff.map((p, i) => (
                  <div key={i} className="grid lg:grid-cols-12 gap-8 lg:gap-24 items-start group">
                    <div className="lg:col-span-4 relative">
                      <div className="aspect-[4/5] bg-slate-100 rounded-[2rem] lg:rounded-[3.5rem] overflow-hidden shadow-xl lg:shadow-2xl relative border-4 lg:border-[10px] border-white group-hover:shadow-blue-900/10 transition-all duration-700">
                        {p.image ? (
                          <img src={p.image} width="800" height="1200" loading="lazy" decoding="async" alt={p.name} className="w-full h-full object-cover object-top" />
                        ) : (
                          <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center text-slate-400 font-black p-12 text-center group-hover:bg-slate-50 transition-colors uppercase tracking-[0.3em] text-xs">
                            <User size={80} className="mb-8 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                            [Professionelt Portræt]
                          </div>
                        )}
                        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 bg-white/90 backdrop-blur-md px-4 py-2 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl shadow-xl border border-white/50">
                          <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Specialist</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-8 lg:pt-8">
                      <div className="mb-8 lg:mb-14">
                        <h3 className="text-xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-3 leading-tight">{p.name}</h3>
                        <p className="text-blue-900 font-black uppercase text-xs tracking-[0.3em] flex items-center">
                          <span className="w-8 lg:w-12 h-1 bg-emerald-500 mr-4 lg:mr-6 inline-block shrink-0"></span> {p.role}
                        </p>
                      </div>

                      <div className="mb-8 lg:mb-16">
                        <p className="text-lg lg:text-2xl font-black text-slate-800 leading-tight mb-6 uppercase tracking-tighter border-b-4 border-slate-50 pb-8">{p.expertise}</p>
                        <p className="text-base lg:text-xl text-slate-500 font-light leading-relaxed">
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
                                  <p className="text-sm text-slate-600 font-bold uppercase tracking-tight">{item}</p>
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
                <h1 className="text-3xl lg:text-6xl font-black text-blue-900 mb-10 uppercase tracking-tighter leading-tight">Find vej <br />til klinikken.</h1>
                <p className="text-2xl text-slate-500 max-w-3xl font-light leading-relaxed border-l-8 border-blue-900 pl-10">
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
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6">Adresse</h3>
                      <p className="text-slate-600 font-black uppercase text-xs leading-relaxed">
                        Søndertoften 22<br />6800 Varde
                      </p>
                    </div>
                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                      <Phone className="text-emerald-700 mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform" size={40} />
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6">Telefon</h3>
                      <a href="tel:+4532223224" className="text-slate-900 font-black text-2xl tracking-tighter uppercase hover:text-blue-900 transition-colors">32 22 32 24</a>
                    </div>
                  </div>

                  <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                    <Mail className="text-blue-900 mb-6 group-hover:scale-110 transition-transform" size={40} />
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6">E-mail</h3>
                    <a href="mailto:info@kliniksirius.dk" className="text-slate-900 font-black text-lg tracking-tight hover:text-blue-900 transition-colors">info@kliniksirius.dk</a>
                  </div>

                  <div className="bg-slate-900 text-white p-12 lg:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 grid md:grid-cols-2 gap-16">
                      <section>
                        <div className="flex items-center space-x-4 mb-8">
                          <Clock className="text-emerald-400" size={24} />
                          <h4 className="font-black uppercase tracking-widest text-[10px]">Telefontider</h4>
                        </div>
                        <div className="space-y-5">
                          <div className="flex justify-between border-b border-white/10 pb-5 text-[10px] font-black uppercase tracking-widest">
                            <span className="text-blue-300">Man - Tor</span>
                            <span>11:00-13:00 & 14:00-15:00</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-blue-300">Fredag</span>
                            <span>10:00-12:00</span>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="flex items-center space-x-4 mb-8">
                          <Clock className="text-blue-400" size={24} />
                          <h4 className="font-black uppercase tracking-widest text-[10px]">Åbningstider</h4>
                        </div>
                        <div className="space-y-5">
                          <div className="flex justify-between border-b border-white/10 pb-5 text-[10px] font-black uppercase tracking-widest">
                            <span className="text-blue-300">Man - Tor</span>
                            <span>15:00-19:00</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-blue-300">Fredag</span>
                            <span>12:30-18:00</span>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="mt-12 pt-12 border-t border-white/10 relative z-10">
                      <div className="flex items-center space-x-4 mb-4 text-[10px] font-black uppercase tracking-widest">
                        <Info className="text-blue-400" size={24} />
                        <h4>Parkering</h4>
                      </div>
                      <p className="text-xs text-blue-100/60 font-bold leading-relaxed uppercase tracking-widest">Gratis parkering lige uden for døren. Husk P-skive (2 timer).</p>
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
                    className="mt-6 block w-full py-6 bg-blue-900 text-white rounded-3xl font-black uppercase text-[10px] tracking-[0.3em] text-center shadow-2xl active:scale-95 transition-all hover:bg-blue-800"
                  >
                    Åbn rutevejledning <ExternalLink size={14} className="inline ml-3" />
                  </a>
                </div>
              </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6 border-t border-slate-100">
              <h2 className="text-3xl font-black mb-6 text-blue-900 uppercase tracking-tight">Sådan kommer du hertil</h2>
              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-3xl mb-12">
                Klinikken ligger midt i Varde og dækker et område på omkring 50 kilometer. Tallene herunder er kørselsafstand ad vej til Søndertoften 22, ikke fugleflugt. Vælg din by og se rute, køretid og togforbindelse.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {byer.map((b) => (
                  <a
                    key={b.slug}
                    href={pathFor(b.slug)}
                    onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(b.slug); }}
                    className="flex items-center justify-between px-8 py-6 bg-slate-50 hover:bg-blue-900 hover:text-white rounded-2xl transition-all group border border-transparent hover:border-blue-900 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span>
                      <span className="block font-black text-[11px] uppercase tracking-widest text-slate-700 group-hover:text-white">{b.by}</span>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-200 mt-1">{b.km} km · {b.minutter} min</span>
                    </span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-white transition-all -translate-x-1 group-hover:translate-x-0 shrink-0 ml-3" />
                  </a>
                ))}
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
                  <a href={pathFor('forside')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('forside'); }} className="hover:text-blue-900 transition-colors flex items-center">
                    <ChevronLeft size={16} className="mr-1" /> Forside
                  </a>
                </nav>
                <div className="max-w-4xl">
                  <h1 className="text-3xl lg:text-6xl font-black text-blue-900 mb-8 uppercase tracking-tighter">Privatlivspolitik</h1>
                  <p className="text-xl text-slate-600 leading-relaxed font-light border-l-8 border-emerald-700 pl-8">
                    Behandling af personoplysninger for patienter hos Klinik Sirius.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-24 bg-white">
              <div className="max-w-4xl mx-auto px-6">
                <div className="prose prose-slate max-w-none space-y-12">

                  <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight mb-6">Behandling af oplysninger</h2>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      I forbindelse med vores undersøgelse, diagnostik og behandling af dig som patient indsamler og behandler Klinik Sirius en række personoplysninger om dig. I denne privatlivspolitik beskrives, hvordan Klinik Sirius behandler, bruger og videregiver dine personoplysninger.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight mb-6">Typer af oplysninger</h2>
                    <p className="text-slate-600 leading-relaxed font-medium mb-6">Klinik Sirius indsamler og behandler følgende typer af personoplysninger:</p>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                        <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4">Almindelige oplysninger</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Navn, adresse, e-mailadresse, telefonnummer, CPR-nummer, køn, familierelationer, arbejdsrelationer og uddannelse.</p>
                      </div>
                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                        <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4">Følsomme oplysninger</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Helbredsoplysninger (journaler, prøvesvar, røntgenbilleder), seksuelle forhold, race eller etnisk oprindelse samt religiøse forhold.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight mb-6">Formål</h2>
                    <p className="text-slate-600 font-medium mb-6">Vi behandler dine personoplysninger til følgende formål:</p>
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
                          <p className="text-sm text-slate-600 font-medium">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-12 rounded-[3rem] border border-blue-100">
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight mb-6">Frivillighed</h2>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Når vi indsamler personoplysninger direkte fra dig, giver du personoplysningerne frivilligt. Du er ikke forpligtet til at give disse personoplysninger til os. Konsekvensen af ikke at give os personoplysningerne vil i nogle tilfælde betyde, at vi ikke kan undersøge, diagnosticere eller behandle dig.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight mb-6">Videregivelse</h2>
                    <p className="text-slate-600 font-medium mb-6">Dine personoplysninger videregives i nødvendigt omfang til:</p>
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
                          <p className="text-sm text-slate-600 font-medium">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight mb-6">Opbevaring</h2>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Vi opbevarer personoplysninger om dig, så længe vi har behov for at varetage de angivne formål. I henhold til journalføringsbekendtgørelsen er vi forpligtet til at opbevare oplysninger i minimum 10 år efter seneste tilførsel til journalen.
                    </p>
                    <p className="text-slate-500 font-medium mt-4 text-sm">Vores databehandler: EG Clinea</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight mb-6">Dine rettigheder</h2>
                    <p className="text-slate-600 font-medium mb-6">Du har med lovens begrænsninger følgende rettigheder:</p>
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
                          <p className="text-sm text-slate-700 font-bold uppercase tracking-tight">{right}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-12 rounded-[3rem]">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Kontakt</h2>
                    <p className="text-blue-100 font-medium mb-8">
                      Har du spørgsmål til behandlingen af dine personoplysninger eller udnyttelsen af dine rettigheder, er du velkommen til at kontakte os:
                    </p>
                    <div className="space-y-4">
                      <p className="font-black uppercase text-xs tracking-widest">Klinik Sirius · Søndertoften 22 · 6800 Varde</p>
                      <a href="mailto:info@kliniksirius.dk" className="text-emerald-400 font-black text-sm hover:text-emerald-300 transition-colors">info@kliniksirius.dk</a>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-8">Privatlivspolitik gældende fra 01-06-2022</p>
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}

        {/* 404 */}
        {!['forside','hudsygdomme','ore-naese-hals','haandkirurgi','patientinfo','personale','find-os','privacypolitik','job'].includes(activePage) &&
          !jobs.some(j => j.slug === activePage) &&
          !byer.some(b => b.slug === activePage) &&
          ![...services.hud, ...services.onhUndersogelser, ...services.onhOperationer, ...services.haandkirurgi].some(s => s.slug === activePage) && (
          <div className="animate-in fade-in duration-700 min-h-[70vh] flex items-center justify-center">
            <div className="max-w-xl mx-auto px-6 text-center py-32">
              <div className="relative inline-block mb-12">
                <span className="text-[140px] font-black text-slate-100 leading-none select-none">404</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-blue-900/10 flex items-center justify-center">
                    <Stethoscope size={36} className="text-blue-900 opacity-60" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Siden findes ikke</h1>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">
                Den side du leder efter eksisterer ikke eller er blevet flyttet. Gå tilbage til forsiden og find det du søger.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={pathFor('forside')}
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('forside'); }}
                  className="px-10 py-4 rounded-2xl bg-blue-900 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                >
                  Til forsiden
                </a>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="px-10 py-4 rounded-2xl bg-slate-100 text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <Search size={14} /> Søg på siden
                </button>
              </div>
              <div className="mt-20 pt-12 border-t border-slate-100 grid sm:grid-cols-3 gap-6 text-left">
                {[
                  { label: 'Hudsygdomme', slug: 'hudsygdomme' },
                  { label: 'Øre, Næse & Hals', slug: 'ore-naese-hals' },
                  { label: 'Håndkirurgi', slug: 'haandkirurgi' },
                ].map(({ label, slug }) => (
                  <a href={pathFor(slug)} key={slug} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage(slug); }}
                    className="flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-blue-900 hover:text-white rounded-2xl transition-all group text-left">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-700 group-hover:text-white">{label}</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-white shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24 text-sm">
            <div className="col-span-1">
              <div className="flex items-center mb-10">
                <KlinikSiriusLogo height={40} className="text-white" />
              </div>
              <p className="text-slate-400 leading-relaxed mb-8 font-medium">Privat speciallægepraksis i Varde med fokus på faglighed og tryghed.</p>
              <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest opacity-40">CVR: 43033018</p>
            </div>

            <div>
              <h6 className="font-black mb-10 uppercase tracking-[0.3em] text-emerald-500 text-[10px]">Specialer</h6>
              <ul className="space-y-4 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
                <li><a href={pathFor('hudsygdomme')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('hudsygdomme'); }} className="hover:text-white transition-colors block">Hudsygdomme</a></li>
                <li><a href={pathFor('ore-naese-hals')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('ore-naese-hals'); }} className="hover:text-white transition-colors block">Øre, Næse & Hals</a></li>
                <li><a href={pathFor('haandkirurgi')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('haandkirurgi'); }} className="hover:text-white transition-colors block">Håndkirurgi</a></li>
              </ul>
            </div>

            <div>
              <h6 className="font-black mb-10 uppercase tracking-[0.3em] text-emerald-500 text-[10px]">Genveje</h6>
              <ul className="space-y-4 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
                <li><a href={pathFor('patientinfo')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('patientinfo'); }} className="hover:text-white transition-colors block">Patientinfo</a></li>
                <li><a href={pathFor('personale')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('personale'); }} className="hover:text-white transition-colors block">Personale</a></li>
                <li><a href={pathFor('find-os')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('find-os'); }} className="hover:text-white transition-colors block">Kontakt</a></li>
                <li><a href={pathFor('job')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('job'); }} className="hover:text-white transition-colors block">Job</a></li>
              </ul>
            </div>

            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10">
              <h6 className="font-black mb-8 uppercase tracking-[0.3em] text-emerald-500 text-[10px]">Kontakt</h6>
              <p className="text-white font-black mb-1 tracking-tight uppercase text-xs leading-none">Søndertoften 22</p>
              <p className="text-slate-400 mb-6 font-bold text-[10px] uppercase tracking-tighter">6800 Varde</p>
              <a href="tel:+4532223224" className="text-xl font-black text-white mb-2 tracking-tighter uppercase leading-none block hover:text-emerald-400 transition-colors">32 22 32 24</a>
              <a href="mailto:info@kliniksirius.dk" className="text-slate-400 font-bold text-[10px] hover:text-white transition-colors">info@kliniksirius.dk</a>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
            <div className="flex space-x-12 mb-8 md:mb-0">
              <a href={pathFor('privacypolitik')} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); setActivePage('privacypolitik'); }} className="hover:text-white transition-colors">Privatlivspolitik</a>
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
