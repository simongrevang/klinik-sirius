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

    // Opdater title og meta description
    const allServices = [...services.hud, ...services.onhUndersogelser, ...services.onhOperationer, ...services.haandkirurgi];
    const service = allServices.find(s => s.slug === activePage);
    const staticMeta = {
      forside:       { title: 'Klinik Sirius | Speciallæger i Varde – Hud og ØNH', desc: 'Klinik Sirius er en privat speciallægeklinik i Varde med speciale i hudsygdomme og øre-, næse- og halssygdomme. Vi betjener patienter fra Varde, Esbjerg og hele Sydvestjylland.' },
      patientinfo:   { title: 'Patientinfo | Klinik Sirius, Varde', desc: 'Praktisk information til patienter hos Klinik Sirius i Varde. Priser, forsikring, åbningstider og hvad du skal medbringe.' },
      personale:     { title: 'Vores personale | Klinik Sirius, Varde', desc: 'Mød speciallægerne bag Klinik Sirius i Varde: Jalal Taha Saadi (ØNH) og Kawa Ajgeiy (hudsygdomme).' },
      'find-os':     { title: 'Find os | Klinik Sirius, Søndertoften 22, Varde', desc: 'Find Klinik Sirius på Søndertoften 22, 6800 Varde. Book tid online eller ring på 32 22 32 24.' },
      privacypolitik:{ title: 'Privatlivspolitik | Klinik Sirius, Varde', desc: 'Privatlivspolitik for Klinik Sirius, privat speciallægepraksis i Varde.' },
    };
    if (service) {
      document.title = `${service.title} i Varde | Klinik Sirius`;
      document.querySelector('meta[name="description"]')?.setAttribute('content',
        `${service.shortIntro} Klinik Sirius er en privat speciallægepraksis i Varde, der betjener patienter fra Esbjerg og hele Sydvestjylland.`
      );
    } else {
      const m = staticMeta[activePage] || staticMeta.forside;
      document.title = m.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', m.desc);
    }

    // Opdater canonical
    const canonical = `https://sirius.simongrevang.dk${url}`;
    let canonEl = document.querySelector('link[rel="canonical"]');
    if (!canonEl) { canonEl = document.createElement('link'); canonEl.rel = 'canonical'; document.head.appendChild(canonEl); }
    canonEl.href = canonical;

    // Opdater Open Graph tags
    const ogTitle = service ? `${service.title} i Varde | Klinik Sirius` : (staticMeta[activePage] || staticMeta.forside).title;
    const ogDesc = service
      ? `${service.shortIntro} Klinik Sirius, Varde.`
      : (staticMeta[activePage] || staticMeta.forside).desc;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', ogTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', ogDesc);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', ogTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', ogDesc);

    // Dynamisk MedicalProcedure schema
    const schemaEl = document.getElementById('dynamic-schema');
    if (schemaEl) {
      schemaEl.textContent = service ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        'name': service.title,
        'description': service.shortIntro,
        'procedureType': 'https://schema.org/TherapeuticProcedure',
        'relevantSpecialty': service.category === 'hud' ? 'Dermatology' : service.category === 'haand' ? 'PlasticSurgery' : 'Otolaryngology',
        'recognizingAuthority': { '@type': 'Organization', 'name': 'Klinik Sirius, Varde' }
      }) : '';
    }

    // FAQPage schema
    const faqEl = document.getElementById('faq-schema');
    if (faqEl) {
      faqEl.textContent = service?.faq?.length ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': service.faq.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': { '@type': 'Answer', 'text': item.a }
        }))
      }) : '';
    }

    // BreadcrumbList schema
    const breadcrumbEl = document.getElementById('breadcrumb-schema');
    if (breadcrumbEl) {
      if (service) {
        const categoryName = service.category === 'hud' ? 'Hudsygdomme'
          : service.category === 'haand' ? 'Håndkirurgi'
          : services.onhUndersogelser.some(s => s.slug === activePage) ? 'ØNH Undersøgelser' : 'ØNH Operationer';
        breadcrumbEl.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Forside', 'item': 'https://sirius.simongrevang.dk/' },
            { '@type': 'ListItem', 'position': 2, 'name': categoryName },
            { '@type': 'ListItem', 'position': 3, 'name': service.title, 'item': canonical }
          ]
        });
      } else {
        breadcrumbEl.textContent = '';
      }
    }
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
        shortIntro: 'Vi hjælper børn og voksne i Varde, Esbjerg og Sydvestjylland med at få bugt med kløe og irritation gennem en målrettet indsats.',
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
        narrative: 'Nældefeber er en tilstand, de fleste kender til enten selv eller fra nogen i familien. Pludselig opstår der kløende, hævede pletter på huden, og mange beskriver det som at have ramt brændenælder uden at vide, hvornår det skete. Det kan være ubehageligt, forvirrende og til tider bekymrende, og netop derfor er det vigtigt at få det undersøgt ordentligt.\n\nVi ser mange patienter med nældefeber i klinikken, og vi ved, at det ikke altid er let at finde frem til årsagen. Udløserne er mange og spænder bredt. Det kan være en infektion, en fødevare, et lægemiddel, pres mod huden, kulde eller varme. Hos en del patienter finder vi aldrig en entydig årsag, men det betyder ikke, at vi ikke kan hjælpe.\n\nFørste prioritet er at give dig ro i kroppen. Vi starter typisk med moderne antihistaminer, der hurtigt kan dæmpe reaktionen. Derefter tager vi en grundig snak om, hvornår udbrudene opstår, og hvad der eventuelt kan kobles til dem. Den kortlægning er ofte nøglen til at undgå fremtidige anfald.\n\nHvis nældefeberens varer ved i mere end seks uger, taler vi om kronisk nældefeber, og her er det endnu vigtigere at have en specialist på sagen. Kawa Ajgeiy har bred erfaring med netop de komplekse og langvarige forløb, og han vil tage sig tid til at gå din situation grundigt igennem.\n\nMange af vores patienter fortæller, at det at have en konkret plan giver en enorm lettelse, selv når årsagen ikke er fuldstændig opklaret. Vi sørger for, at du forlader klinikken med viden om, hvad du skal gøre, og hvornår du bør komme tilbage.',
        extraInfo: {
          col1Title: 'Udløsende faktorer',
          col1Text: 'Det kan være komplekst, da udløserne spænder vidt fra infektioner til fysiske påvirkninger.',
          col2Title: 'Hurtig diagnosticering',
          col2Text: 'Vi prioriterer hurtig indsats, så du kan få ro på huden med det samme.'
        },
        faq: [
          { q: "Hvor længe varer et anfald?", a: "Enkelte hævelser forsvinder som regel inden for 24 timer, men nye kan dukke op undervejs. Hos nogen varer et samlet udbrud kun et par dage, mens andre oplever det stå på i uger. Hvis det varer mere end seks uger, taler vi om kronisk nældefeber, og det kræver en mere systematisk tilgang." },
          { q: "Hvad udløser nældefeber?", a: "Der er mange mulige årsager. De hyppigste er infektioner, fødevarer, lægemidler, insektstik og fysiske påvirkninger som tryk, kulde eller varme. Hos en del patienter finder man aldrig en specifik udløser, og det kalder vi idiopatisk nældefeber. Det er helt normalt og ændrer ikke på, at vi stadig kan behandle dig effektivt." },
          { q: "Er nældefeber farligt?", a: "I de fleste tilfælde er nældefeber ubehageligt men ikke farligt. Det er dog vigtigt at være opmærksom, hvis du oplever hævelse i ansigt, læber eller hals, eller hvis du får vejrtrækningsbesvær. Det kan være tegn på angioødem, som kræver akut behandling. Oplever du disse symptomer, skal du kontakte akuthjælp med det samme." },
          { q: "Kan nældefeber komme igen?", a: "Ja, det kan det godt, særligt hvis man ikke ved, hvad der udløser det. Derfor er det en god idé at holde en slags dagbog over, hvornår udbrudene sker, hvad du har spist, og hvad du har lavet. Den information er guld værd i konsultationen og hjælper os med at kortlægge et mønster." },
          { q: "Hvilken behandling tilbyder I?", a: "Vi starter oftest med antihistaminer, som er meget effektive mod symptomerne. Hvis de ikke er tilstrækkelige, har vi andre muligheder at trække på, herunder biologiske behandlinger til de svære kroniske forløb. Vi tilpasser altid planen til dig og din situation frem for at bruge en standardløsning." }
        ]
      },
      {
        name: 'Psoriasis',
        slug: 'psoriasis',
        category: 'hud',
        title: 'Moderne behandling af psoriasis',
        h2Title: 'Vejen til en bedre hverdag med psoriasis',
        shortIntro: 'Vi tilbyder de nyeste behandlingsformer, så du kan opnå en hverdag med færre symptomer.',
        narrative: 'Psoriasis er en kronisk hudsygdom, der opstår, fordi immunsystemet sender forkerte signaler og får hudcellerne til at fornye sig alt for hurtigt. Det resulterer i de karakteristiske røde, skælagtige pletter, som typisk sidder på albuer, knæ, hårbund og ryg, men som i princippet kan opstå alle steder på kroppen. For mange er det ikke bare et kosmetisk problem men noget, der påvirker selvbillede, søvn og livskvalitet.\n\nVi har hjulpet mange patienter med psoriasis i klinikken, og det første vi gør er at sætte os grundigt ind i dit forløb. Hvornår kom det første gang? Hvilke områder er ramt? Hvad gør det bedre, og hvad gør det værre? Svarene på de spørgsmål er afgørende for at sætte den rigtige behandling ind fra starten.\n\nBehandlingsmulighederne er heldigvis mange og langt bedre i dag end for bare ti år siden. Vi begynder typisk med lokale præparater som specielle cremer og salver, der retter sig direkte mod de ramte områder. Hvis de ikke er tilstrækkelige, har vi adgang til yderligere behandlingsformer, herunder lysbehandling og systemisk medicin.\n\nEn ting, vi ser igen og igen, er at stress spiller en stor rolle. Mange oplever, at psoriasis blusser op i perioder med meget pres, og at sygdommen roer sig, når hverdagen bliver mere overskuelig. Vi taler altid med dig om de faktorer, du selv kan påvirke, fordi behandling og livsstil fungerer bedst sammen.\n\nMålet er ikke nødvendigvis at kurere psoriasis, da det er en kronisk tilstand. Men med den rette behandling og opfølgning er det realistisk at opnå lange perioder med næsten fri hud og en hverdag, hvor sygdommen ikke sidder i forsædet.',
        extraInfo: {
          col1Title: 'Livsstil',
          col1Text: 'Stress og miljø kan have en mærkbar indflydelse på sygdommens aktivitet.',
          col2Title: 'Behandlingstrin',
          col2Text: 'Vi starter med de mest skånsomme løsninger og følger din udvikling tæt.'
        },
        faq: [
          { q: "Er psoriasis arveligt?", a: "Ja, der er en tydelig genetisk komponent. Har du forældre eller søskende med psoriasis, er risikoen for selv at udvikle det større. Men arvelighed er ikke skæbne. Mange med genetisk disposition får det aldrig, og omvendt opstår det også hos folk uden arvelig baggrund." },
          { q: "Smitter psoriasis?", a: "Nej, psoriasis smitter absolut ikke. Det er en fejl i immunsystemets signaler i din egen krop og har ingenting med bakterier eller virus at gøre. Du kan roligt have tæt kontakt med andre mennesker uden risiko for at overføre det." },
          { q: "Hvad forværrer psoriasis?", a: "De mest almindelige triggere er stress, infektioner, visse lægemidler, alkohol og hudskader som ridsning eller solforbrænding. Mange oplever også, at sygdommen er sæsonbestemt og forværres om vinteren, hvor huden er tørre og sollyset er svagt. At kende sine egne triggere er en vigtig del af at leve godt med psoriasis." },
          { q: "Kan psoriasis kureres?", a: "Det er en kronisk sygdom, som ikke kan kureres i traditionel forstand. Men det betyder ikke, at man bare skal leve med det. Med den rette behandling kan man opnå meget lange remissionsperioder med næsten fri hud. Mange patienter lever et normalt hverdagsliv med psoriasis under god kontrol." },
          { q: "Har psoriasis forbindelse til andre sygdomme?", a: "Ja, det er vigtigt at vide. En del patienter med psoriasis udvikler psoriasisgigt, som giver smerter og hævelse i led. Derudover ses der øget forekomst af hjerte-kar-sygdomme og metabolisk syndrom hos patienter med svær psoriasis. Det er en af grundene til, at vi altid ser på hele billedet og ikke kun huden isoleret." }
        ]
      },
      {
        name: 'Modermærker',
        slug: 'modermaerker',
        category: 'hud',
        title: 'Tryghed gennem professionel kontrol',
        h2Title: 'Specialiseret gennemgang med dermatoskopi',
        shortIntro: 'Få foretaget en grundig gennemgang af dine modermærker for rettidig omhu.',
        narrative: 'Modermærker er noget de fleste af os har, og langt de fleste er fuldstændig ufarlige. Men modermærkekræft er en af de kræftformer, der vokser hurtigst i Danmark, og det gør det vigtigt at holde øje med forandringer. Det gode er, at tidlig opdagelse gør en enorm forskel for behandlingsmulighederne og udsigterne.\n\nHos Klinik Sirius foretager vi en grundig gennemgang af dine modermærker med dermatoskopi, et avanceret forstørrelsesværktøj med specielt lys, som giver os mulighed for at se strukturer i huden, man ikke kan se med det blotte øje. Det løfter præcisionen markant i forhold til en almindelig visuel inspektion.\n\nVores speciallæge Kawa Ajgeiy har mange års erfaring med netop dermatoskopi og diagnosticering af hudforandringer fra sine år på hudafdelingerne i Odense og Aarhus. Det er ikke noget, der bare kræves et hurtigt blik. Det kræver erfaring at tolke de mønstre og strukturer, man ser, og den erfaring bringer han med sig til hver eneste konsultation.\n\nHvis vi finder et mærke, der giver anledning til bekymring, kan vi i mange tilfælde fjerne det samme dag under lokalbedøvelse. Det tager typisk kort tid, er næsten smertefrit, og vævsprøven sendes herefter til en patologisk analyse, så vi er helt sikre på, hvad vi har at gøre med.\n\nVi anbefaler en kontrol, hvis du har mærker, der har forandret sig, er asymmetriske, har ujævne kanter, indeholder flere farver, er større end seks millimeter, eller blot er nye og vokser. Du behøver ikke vente, til du er helt sikker. Det er langt bedre at komme forbi og høre, at alt er fint, end at vente for længe.',
        extraInfo: {
          col1Title: 'Egenkontrol',
          col1Text: 'Lær dine egne mærker at kende, så du hurtigt opdager forandringer.',
          col2Title: 'Analyse',
          col2Text: 'Vævet bliver altid sendt til en grundig analyse for din sikkerhed.'
        },
        faq: [
          { q: "Hvor tit skal mine modermærker tjekkes?", a: "Har du mange modermærker, mærker med usædvanligt udseende eller en familiehistorie med modermærkekræft, anbefaler vi en årlig kontrol. Er du i tvivl om et specifikt mærke, behøver du ikke vente til næste planlagte kontrol. Kom ind og få det set." },
          { q: "Hvad skal jeg kigge efter selv?", a: "Hukommelsesreglen er ABCDE: Asymmetri, ujævne Begrænsninger, flere Farver, Diameter over 6 mm og Ændring over tid. Hvis et mærke ændrer sig på nogen af disse punkter, eller hvis du mærker kløe eller bløder fra et mærke, bør du bestille tid." },
          { q: "Hvad sker der, hvis I finder noget mistænkeligt?", a: "Hvis vi ser noget, der giver anledning til nærmere undersøgelse, anbefaler vi at fjerne mærket. Det gøres her i klinikken under lokalbedøvelse, og det tager som regel kun et kvarter. Vævsprøven sendes til patologisk undersøgelse, og vi kontakter dig med svaret." },
          { q: "Gør det ondt at få fjernet et modermærke?", a: "Vi bedøver det lokale område inden indgrebet, så du ikke mærker smerte undervejs. Efterfølgende kan der være lidt ømhed de første dage, men de fleste klarer sig fint uden stærk smertestillende medicin. Helingen går typisk hurtigt." },
          { q: "Er alle hudforandringer farlige?", a: "Langt de fleste er det ikke. Der er mange typer godartede hudforandringer, som kan se bekymrende ud men er fuldstændig harmløse. Netop fordi det kan være svært at skelne selv, er en professionel gennemgang med dermatoskopi den tryggeste vej frem. Vi giver dig en klar besked om, hvad vi ser." }
        ]
      },
      {
        name: 'Hudkræft',
        slug: 'hudkraeft',
        category: 'hud',
        title: 'Undersøgelse og behandling af hudkræft',
        h2Title: 'Tidlig opdagelse gør den afgørende forskel',
        shortIntro: 'Hudkræft er en af de mest almindelige kræftformer i Danmark. Klinik Sirius i Varde tilbyder specialistundersøgelse, og jo tidligere den opdages, desto bedre er mulighederne for behandling.',
        narrative: 'Hudkræft er noget rigtig mange danskere stifter bekendtskab med i løbet af livet, og forekomsten stiger. Det skyldes blandt andet mange års soleksponering, og det er en af grundene til, at regelmæssig kontrol af huden er så vigtig. De fleste tilfælde af hudkræft kan behandles effektivt, hvis de opdages tidligt nok.\n\nDer findes flere typer hudkræft. Basalcellekarcinom er den hyppigste og sjældent livstruende, men den vokser og bør fjernes. Pladeepitelkarcinom kan sprede sig og kræver hurtig handling. Modermærkekræft, også kaldet malignt melanom, er den mest alvorlige form og kræver specialiseret behandling. I klinikken er vi i stand til at undersøge og i mange tilfælde håndtere alle tre typer.\n\nVores speciallæge Kawa Ajgeiy anvender dermatoskopi til at vurdere hudforandringer med langt større præcision end ved det blotte øje. Det giver os mulighed for at skelne mellem godartede og potentielt ondartede forandringer og tage de rigtige beslutninger hurtigt. Mange patienter kommer til os med bekymring over en plet, de har lagt mærke til, og det er præcis den slags tidlig opmærksomhed, der redder liv.\n\nHvis vi finder noget, der bør fjernes, kan vi i mange tilfælde gøre det samme dag under lokalbedøvelse. Vævsprøven sendes altid til patologisk analyse, og vi vender tilbage med resultatet. Hvis der er behov for videre udredning eller behandling på sygehus, hjælper vi med en hurtig og relevant henvisning.\n\nVi anbefaler, at du henvender dig, hvis du har en hudplet, der har forandret sig i størrelse, form eller farve, som bløder uden grund, eller som bare ikke ser rigtig ud. Det koster ikke noget at få det undersøgt, og sindsroen er det hele værd.',
        extraInfo: {
          col1Title: 'Dermatoskopi',
          col1Text: 'Avanceret forstørrelsesværktøj med specielt lys giver os et præcist billede af hudforandringer under overfladen.',
          col2Title: 'Hurtig behandling',
          col2Text: 'Mistænkelige forandringer kan i mange tilfælde fjernes direkte i klinikken under lokalbedøvelse.'
        },
        faq: [
          { q: "Hvad er tegnene på hudkræft?", a: "Hold øje med forandringer ved hjælp af ABCDE-reglen: Asymmetri, ujævne Begrænsninger, flere Farver, Diameter over 6 mm og Ændring over tid. Derudover bør du være opmærksom på sår, der ikke heler, pletter der bløder, og nye vækster, der vokser hurtigt." },
          { q: "Hvem er i størst risiko?", a: "Lyshudede personer med mange modermærker, en familiehistorie med hudkræft eller en lang historie med soleksponering og solforbrænding har en forhøjet risiko. Men hudkræft kan ramme alle, uanset hudfarve og alder, så regelmæssig kontrol er vigtig for de fleste voksne." },
          { q: "Kan hudkræft kureres?", a: "Ja, i langt de fleste tilfælde, særligt hvis den opdages tidligt. Basalcellekarcinom og pladeepitelkarcinom har meget gode behandlingsresultater ved tidlig opdagelse. Malignt melanom er mere alvorligt, men også her er tidlig opdagelse afgørende for prognosen." },
          { q: "Hvad sker der efter en fjernelse?", a: "Vævsprøven sendes til patologisk undersøgelse, og vi kontakter dig med resultatet. Viser det sig at være kræft, afhænger det videre forløb af typen og stadiet. I mange tilfælde er fjernelsen tilstrækkelig behandling. Kræver det mere, hjælper vi med en hurtig henvisning til det rette sted." },
          { q: "Giver solfaktor nok beskyttelse?", a: "Solfaktor er et vigtigt redskab, men det er ikke nok alene. Det skal bruges korrekt og påføres tilstrækkeligt. Derudover er det vigtigt at undgå soleksponering i de varmeste timer og at dække huden til. Solarium øger risikoen markant og bør undgås helt." }
        ]
      },
      {
        name: 'Rosacea',
        slug: 'rosacea',
        category: 'hud',
        title: 'Behandling af rosacea',
        h2Title: 'Ro på den røde og følsomme hud',
        shortIntro: 'Rosacea er en kronisk hudtilstand med rødme, synlige blodkar og i nogle tilfælde bumser. Vi hjælper dig med at få kontrol over symptomerne.',
        narrative: 'Rosacea er en tilstand, mange lever med i årevis uden at vide, hvad det egentlig er. Den typiske patient er en voksen person, der let bliver rød i ansigtet, oplever en brændende eller stikkende fornemmelse i huden og måske har synlige fine blodkar eller bumser på kinder, næse, pande og hage. Det kan forveksles med akne eller solskade, men det er en helt anden tilstand med sine egne årsager og behandlinger.\n\nÅrsagen til rosacea er ikke fuldt ud forstået, men vi ved, at immunsystemet og nervesystemet i huden er involveret. Der er en tydelig arvelig komponent, og tilstanden ses oftere hos lyshudede. Den forværres typisk af sol, varme, stærk mad og krydderier, alkohol, stress og visse hudplejeprodukter. At kende sine egne triggere er en vigtig del af at leve godt med rosacea.\n\nVores tilgang starter med en grundig samtale og en klinisk vurdering. Vi kortlægger dine symptomer og finder ud af, hvilken type rosacea der er tale om, da det afgør, hvad der virker bedst for dig. Der er forskel på behandlingen af rødme og synlige blodkar kontra den bumseagtige form, og vi tilpasser planen præcist til din hud.\n\nBehandlingsmulighederne er mange. Det kan være lokale præparater, der dæmper rødme og betændelse, mundtlig medicin i kortere perioder og rådgivning om hudpleje og livsstil. Det er ikke en tilstand, der forsvinder af sig selv, men med den rette behandling og viden om egne triggere kan de fleste opnå en hverdag med markant færre gener.\n\nNoget af det vigtigste, vi giver vores rosacea-patienter, er forklaring og forståelse. Når du forstår, hvad der sker i din hud og hvorfor, er det langt lettere at tage kontrol over situationen frem for at føle, at huden styrer dig.',
        extraInfo: {
          col1Title: 'Individuelle triggere',
          col1Text: 'Sol, varme, alkohol og stress er typiske triggere, men de varierer fra person til person.',
          col2Title: 'Målrettet behandling',
          col2Text: 'Vi skelner mellem rosaceas undertyper og tilpasser behandlingen præcist til dig.'
        },
        faq: [
          { q: "Hvad er forskellen på rosacea og akne?", a: "Rosacea og akne kan ligne hinanden, men er to forskellige tilstande. Akne skyldes primært tilstoppede porer og bakterier og ses oftest hos unge. Rosacea er en kronisk betændelsestilstand i huden, der typisk rammer voksne over 30 og er kendetegnet ved rødme, brændende fornemmelse og synlige blodkar. Det er vigtigt at skelne, da de behandles forskelligt." },
          { q: "Kan rosacea kureres?", a: "Rosacea er en kronisk tilstand, der ikke kan kureres i traditionel forstand. Men den kan holdes under kontrol. Med den rette behandling og viden om egne triggere er det realistisk at opnå lange perioder med minimal eller ingen synlig rødme og meget få symptomer." },
          { q: "Hvad forværrer rosacea?", a: "De hyppigste triggere er sol og varme, stærk mad og krydderier, alkohol, stress, anstrengende motion og visse kosmetiske produkter med alkohol eller parfume. Det varierer fra person til person, og vi hjælper dig med at kortlægge dine egne mønstre." },
          { q: "Hvilken hudpleje passer til rosacea?", a: "Rosacea-hud er følsom og kræver skånsom pleje. Undgå produkter med alkohol, stærke syrer og parfume. Vælg milde, uparfumerede renseprodukter og fugtighedscremer med beroligende ingredienser. Solfaktor er afgørende, da sol er en af de hyppigste triggere. Vi rådgiver gerne specifikt om produktvalg." },
          { q: "Kan rosacea sprede sig?", a: "Rosacea kan ændre sig over tid. Hos nogle forbliver det primært rødme, mens det hos andre udvikler sig til bumser og fortykkelse af huden, særligt på næsen. Netop derfor er det en fordel at komme tidligt og starte behandling, frem for at vente til tilstanden forværres." }
        ]
      },
      {
        name: 'Akne',
        slug: 'akne',
        category: 'hud',
        title: 'Effektiv behandling af akne',
        h2Title: 'Klar hud gennem målrettet behandling',
        shortIntro: 'Akne påvirker både udseende og selvtillid. Hos Klinik Sirius i Varde tilbyder vi en grundig udredning og en behandlingsplan, der rent faktisk virker.',
        narrative: 'Akne er en af de mest udbredte hudlidelser overhovedet og rammer langt fra kun teenagere. Mange voksne kæmper med akne godt ind i tyverne, trediverne og endda fyrrerne, og for en del er det forbundet med skam og frustration, særligt hvis man har prøvet mange ting uden varig effekt. Hos Klinik Sirius møder vi dig, hvor du er, og tager problemet alvorligt uanset alder.\n\nAkne opstår, når talgkirtlerne producerer for meget talg, og porerne tilstoppes. Bakterier trives i det miljø og skaber betændelse, der viser sig som buler, bylder og ar. Det er ikke et spørgsmål om manglende hygiejne. Det er en biologisk proces, som er stærkt påvirket af hormoner, arvelighed og i nogen grad kost og stress.\n\nVores speciallæge Kawa Ajgeiy starter altid med at se på helheden. Hvad slags akne er der tale om? Sidder den overfladisk eller dybt? Er der hormonelle mønstre, der peger på en underliggende årsag? Svarene på de spørgsmål afgør, hvilken behandling der er den rette. Der er stor forskel på, om vi skal bruge en lokal creme, en mundtlig antibiotikakur, hormonal behandling eller noget helt andet.\n\nEt forløb hos os handler ikke om at finde en hurtig løsning, der virker i to måneder og derefter holder op. Vi arbejder på at finde den behandling, der giver langvarig bedring, og vi følger dig tæt undervejs. Mange patienter har oplevet en enorm forskel i livskvalitet, når aknen kommer under kontrol, og det driver os i vores arbejde.\n\nSelvom ar allerede er opstået, er der muligheder. Vi vejleder om, hvad der kan hjælpe på eksisterende arvæv, og hvad du fremover kan gøre for at mindske risikoen for nye ar. Det er aldrig for sent at søge hjælp.',
        extraInfo: {
          col1Title: 'Alle aldre',
          col1Text: 'Vi behandler akne hos både unge og voksne og tilpasser altid planen til den enkeltes situation.',
          col2Title: 'Langsigtet effekt',
          col2Text: 'Målet er vedvarende bedring, ikke bare en kortvarig forbedring.'
        },
        faq: [
          { q: "Hvad forårsager akne?", a: "Akne skyldes en kombination af faktorer: overproduktion af talg, tilstoppede porer, bakterier og betændelse. Hormoner spiller en central rolle, hvilket forklarer, hvorfor akne er hyppig i puberteten, under menstruation og graviditet, og ved hormonelle forstyrrelser. Arvelighed har også betydning." },
          { q: "Hjælper kost mod akne?", a: "Forskning tyder på, at visse madvarer kan forværre akne hos nogle. Produkter med højt glykæmisk indeks og mælkeprodukter er de mest diskuterede. Men det er individuelt, og kost er sjældent den eneste årsag. Vi tager det med i rådgivningen uden at overdrive kostens rolle." },
          { q: "Hvornår bør jeg søge hjælp?", a: "Hvis aknen ikke bedres efter to til tre måneder med receptfri midler, eller hvis den er smertefuld, sidder dybt, efterlader ar, eller påvirker dit velbefindende og selvtillid, er det tid til at komme til os. Jo hurtigere vi kommer i gang, desto bedre er chancerne for at undgå permanente ar." },
          { q: "Kan akne efterlade permanente ar?", a: "Det kan den desværre. Dyb betændt akne har størst risiko for at efterlade ar. Netop derfor anbefaler vi at behandle akne tidligt og effektivt frem for at vente og se. Vi vejleder også om, hvad man kan gøre for eksisterende ar." },
          { q: "Er der forskel på akne hos kvinder og mænd?", a: "Ja, der er forskel. Kvinder oplever ofte hormonel akne, der forværres i forbindelse med menstruation, graviditet eller ved brug af visse præventionsmidler. Det åbner for behandlingsmuligheder, der ikke er relevante for mænd. Vi vurderer altid det hormonelle billede som en del af udredningen hos kvinder." }
        ]
      },
      {
        name: 'Fnat',
        slug: 'fnat',
        category: 'hud',
        title: 'Behandling af fnat',
        h2Title: 'Hurtig og effektiv udryddelse af fnat',
        shortIntro: 'Fnat er meget smitsomt, men heldigvis nemt at behandle. Vi hjælper dig og din husstand med at komme helt fri.',
        narrative: 'Fnat er forårsaget af en mikroskopisk mide, der graver sig ned i huden og lægger æg. Det giver en kraftig kløe, som typisk er værst om natten og forværres af varme. Kløen skyldes en allergisk reaktion på miderne og deres afføring, og den kan fortsætte i uger efter, at selve infestationen er behandlet. Det er vigtigt at vide, så man ikke tror, at behandlingen ikke har virket.\n\nFnat er ikke et tegn på dårlig hygiejne. Det smitter ved tæt hud til hud-kontakt og kan ramme alle, uanset livsstil og renlighed. Alle i husstanden og nære kontakter skal behandles på samme tid, ellers er risikoen for gensmitta meget høj. Det er netop den del, mange ikke får gjort ordentligt, og som betyder, at fnat kan komme igen.\n\nVores speciallæge Kawa Ajgeiy stiller diagnosen klinisk ved at se på huden. Typiske tegn er kløe i fingermellemmorum, håndled, talje, genitalier og under brysterne. Hos børn kan det også ramme hoved og hals. Vi forklarer dig præcist, hvordan behandlingen skal gennemføres, og hvad du skal gøre ved sengetøj, tøj og møbler for at undgå gensmitta.\n\nBehandlingen er et godkendt middel, der påføres hele kroppen fra hals til tæer og vaskes af efter en bestemt tid. Det er effektivt og kan bruges af de fleste, herunder gravide og børn over to måneder, om end i reduceret form. Vi sørger for, at du forlader klinikken med en klar og præcis plan, du kan gå hjem og følge.\n\nNogle oplever fortsat kløe i op til seks uger efter behandlingen. Det er normalt og skyldes ikke ny smitta, men hudens reaktion på de døde mider og deres efterladenskaber. Vi informerer dig grundigt, så du ikke bekymrer dig unødigt og ved præcis, hvornår du skal søge opfølgning.',
        extraInfo: {
          col1Title: 'Hele husstanden',
          col1Text: 'Alle, der deler hjem med den smittede, skal behandles på samme dag for at undgå gensmitta.',
          col2Title: 'Klar behandlingsplan',
          col2Text: 'Vi gennemgår præcist, hvordan midlet anvendes, og hvad der skal gøres med tøj og sengetøj.'
        },
        faq: [
          { q: "Hvordan smitter fnat?", a: "Fnat smitter primært ved langvarig, tæt hud til hud-kontakt. Det er typisk ved seksuel kontakt, men også ved at sove i samme seng eller have tæt kropslig kontakt over tid. Kortvarig kontakt som håndtryk er sjældent nok. Smitte via tøj og sengetøj er mulig men langt sjældnere." },
          { q: "Hvornår begynder det at klø?", a: "Ved første gang man smittes, kan der gå fire til seks uger, inden kløen opstår, fordi kroppen skal opbygge en allergisk reaktion. Er man smittet igen, kan kløen komme meget hurtigere, inden for et par dage, fordi immunforsvaret allerede kender miderne." },
          { q: "Skal alle i familien behandles?", a: "Ja, alle, der bor i samme husstand, skal behandles på samme dag, uanset om de har symptomer eller ej. Nære kontakter som kærester, der ikke bor i husstanden, bør også behandles. Hvis ikke alle behandles samtidig, risikerer man at smitte hinanden igen." },
          { q: "Hvad gør jeg ved tøj og sengetøj?", a: "Alt tøj, sengetøj og håndklæder, der har været brugt de seneste tre dage, skal vaskes ved mindst 60 grader. Det, der ikke kan vaskes ved den temperatur, kan lægges i en forseglet plastikpose i 72 timer, da miderne ikke overlever uden menneskelig vært." },
          { q: "Kløen er ikke stoppet efter behandlingen. Hvad nu?", a: "Det er normalt at kløe i op til seks uger efter korrekt behandling. Det skyldes hudens allergiske reaktion på rester af de døde mider og ikke ny smitta. Kløen aftager gradvist. Oplever du nye ganggrave i huden eller forværring efter seks uger, bør du komme til kontrol." }
        ]
      },
      {
        name: 'Hyperhidrose',
        slug: 'hyperhidrose',
        category: 'hud',
        title: 'Behandling af hyperhidrose (overdrevet svedtendens)',
        h2Title: 'Effektiv hjælp til overdreven svedtendens',
        shortIntro: 'Overdreven svedtendens kan påvirke hverdagen og selvtilliden markant. Vi tilbyder effektive behandlinger, der giver langvarig lindring.',
        narrative: 'Sved er en naturlig og nødvendig funktion i kroppen, men for nogen producerer kroppen langt mere sved end nødvendigt. Det kalder vi hyperhidrose, og det rammer primært armhuler, hænder, fødder og ansigt. Det kan være meget generende i hverdagen, påvirke valget af tøj, begrænse sociale situationer og skabe en konstant bekymring for, at andre opdager det.\n\nHyperhidrose er ikke et spørgsmål om manglende hygiejne eller nervøsitet, selvom mange med tilstanden desværre oplever den stigmatisering. Det er en fysiologisk tilstand, hvor svedkirtlerne er overaktive og reagerer på signaler, der ikke kræver den mængde sved, der produceres. Det kan opstå helt uden åbenlys grund, og mange har haft det siden barndommen.\n\nVi tager altid en grundig sygehistorie for at afklare, om der er en underliggende årsag til svedtendenesen, da visse sygdomme og lægemidler kan give lignende symptomer. Hvis der ikke er en identificerbar årsag, taler vi om primær hyperhidrose, og her har vi gode behandlingsmuligheder.\n\nEn af de mest effektive behandlinger er injektioner med botulintoksin i de berørte områder. Det blokerer de nerveimpulser, der aktiverer svedkirtlerne, og giver typisk seks til tolv måneder uden overdreven svedproduktion. Behandlingen er hurtig, effektiv og godt dokumenteret. Vi går grundigt igennem, hvad du kan forvente, inden vi går i gang.\n\nDet er vigtigt for os, at du forlader klinikken med en realistisk forventning om, hvad behandlingen kan. Vi ser det som vores opgave ikke bare at behandle huden men at hjælpe dig til en mere tryg og fri hverdag.',
        extraInfo: {
          col1Title: 'Botulintoksin',
          col1Text: 'Injektioner i de berørte områder giver typisk seks til tolv måneders effektiv lindring.',
          col2Title: 'Grundig udredning',
          col2Text: 'Vi afklarer altid, om der er en underliggende årsag, inden vi fastlægger behandlingsplanen.'
        },
        faq: [
          { q: "Er overdreven svedtendens en sygdom?", a: "Ja, hyperhidrose er en anerkendt medicinsk tilstand og ikke bare noget, man skal leve med. Primær hyperhidrose opstår uden nogen underliggende årsag og er oftest betinget af en overaktivitet i det autonome nervesystem. Sekundær hyperhidrose kan skyldes en anden sygdom eller et lægemiddel, og den behandles ved at adressere årsagen." },
          { q: "Hvad er botulintoksin, og er det sikkert?", a: "Botulintoksin er et stof, der blokerer nerveimpulser til muskler og kirtler. Det er veldokumenteret og bruges medicinsk til mange formål. Ved hyperhidrose injiceres det i huden over de overaktive svedkirtler og forhindrer dem i at modtage signalet om at producere sved. Det er sikkert og veltolereret hos langt de fleste." },
          { q: "Gør injektionerne ondt?", a: "Der vil være en vis ubehag forbundet med injektionerne, da der gives mange små stik i det berørte område. I armhulen er det de fleste uproblematisk. På hænder og fødder, hvor huden er tykkere og mere følsom, bruger vi ofte en lokalbedøvende creme inden behandlingen for at mindske ubehaget." },
          { q: "Hvornår mærker jeg effekten, og hvor længe varer den?", a: "De fleste mærker en tydelig forskel inden for en til to uger efter behandlingen. Effekten varer typisk fra seks til tolv måneder, hvorefter behandlingen kan gentages. Med gentagne behandlinger oplever mange, at intervallerne bliver længere over tid." },
          { q: "Er der andre behandlingsmuligheder end botulintoksin?", a: "Ja. Første skridt er altid et stærkt aluminiumklorid-baseret antiperspirant, der påføres om natten. Det kan alene hjælpe mange tilstrækkeligt. For hænder og fødder findes der iontoforeseterapi, hvor huden behandles med svag elektrisk strøm i vand. Vi gennemgår mulighederne og finder den løsning, der passer bedst til dig." }
        ]
      },
      {
        name: 'Kondylomer og vorter',
        slug: 'kondylomer',
        category: 'hud',
        title: 'Behandling af kondylomer og vorter',
        h2Title: 'Diskret og effektiv behandling',
        shortIntro: 'Vi tilbyder behandling af både kondylomer og vorter i en tryg og fortrolig ramme.',
        narrative: 'Vorter og kondylomer er begge forårsaget af human papillomavirus, HPV, men de er forskellige typer af virussen og sidder typisk forskellige steder på kroppen. Vorter sidder oftest på hænder, fødder og knæ, mens kondylomer er en seksuelt overført infektion, der sidder på og omkring kønsorganerne og endetarmsåbningen. Begge kan behandles effektivt, men de kræver forskellige tilgange.\n\nKondylomer er en af de mest udbredte seksuelt overførte infektioner og er ikke forbundet med dårlig hygiejne eller en bestemt livsstil. Det er meget let at smitte andre, også uden synlige vorter, og mange ved slet ikke, at de er smittede. Hos Klinik Sirius behandler vi kondylomer med fuld diskretion og i en tryg atmosfære, uden at du behøver at føle dig flov eller bekymret for fortrolighed.\n\nVores speciallæge Kawa Ajgeiy har bred erfaring med behandling af begge tilstande. Vi starter altid med en grundig undersøgelse, så vi er sikre på diagnosen, inden vi fastlægger planen. Det er vigtigt, fordi visse andre hudforandringer kan ligne vorter eller kondylomer, og en fejldiagnose kan forsinke den rette behandling.\n\nBehandlingsmulighederne afhænger af, hvilken type vækst der er tale om, og hvor den sidder. Det kan være lokale behandlingscremer, der over tid nedbryder væksten, eller mekanisk fjernelse direkte i klinikken. Begge metoder er effektive, og vi vælger den løsning, der er mest hensigtsmæssig i netop din situation.\n\nEt vigtigt råd til alle, der har kondylomer, er at tale åbent med seksuelle partnere, så de også kan blive undersøgt og eventuelt behandlet. Vi hjælper dig gerne med, hvordan du bedst håndterer den samtale. Vaccination mod HPV er desuden mulig og kan beskytte mod de hyppigste kræftfremkaldende typer.',
        extraInfo: {
          col1Title: 'Fuld diskretion',
          col1Text: 'Vi behandler kondylomer i en tryg og fortrolig ramme uden vurdering.',
          col2Title: 'Effektiv fjernelse',
          col2Text: 'Vorter og kondylomer kan fjernes direkte i klinikken eller behandles med godkendte cremer.'
        },
        faq: [
          { q: "Smitter vorter?", a: "Ja, vorter er smitsomme. HPV-virussen overføres ved direkte kontakt med vorten og trives i fugtige miljøer som baderum og swimmingpools. Børn er særligt modtagelige. At undgå at rive i vorterne og vaske hænder regelmæssigt reducerer risikoen for spredning." },
          { q: "Er kondylomer farlige?", a: "De fleste kondylomer er forårsaget af HPV-typer, der ikke giver kræft. Men visse HPV-typer kan på sigt føre til kræft i livmoderhalsregionen, endetarmen og svælget. Det er en af grundene til, at kondylomer bør behandles, og at det nationale HPV-vaccinationsprogram er vigtigt." },
          { q: "Kan kondylomer forsvinde af sig selv?", a: "Ja, det kan de faktisk hos nogen, da immunsystemet kan bekæmpe HPV over tid. Men det er usikkert, hvornår det sker, og i mellemtiden kan man smitte andre. Behandling er den sikreste og hurtigste vej til at komme af med dem." },
          { q: "Kan man vaccinere sig mod HPV som voksen?", a: "Ja, det kan man. Vaccinen er mest effektiv inden første seksuelle kontakt, men kan stadig give beskyttelse mod de typer, man ikke allerede er smittet med. Vi kan rådgive om, hvad det er relevant for dig, og hjælpe med at få det sat i gang." },
          { q: "Vender vorter og kondylomer tilbage efter behandling?", a: "Det kan de, fordi HPV-virussen kan ligge latent i huden, selv efter væksten er fjernet. Sandsynligheden afhænger af immunsystemets evne til at holde virussen nede. Det er normalt, at der skal mere end én behandling til, og vi følger dig, til vi er sikre på, at resultatet er stabilt." }
        ]
      }
    ],
    onhUndersogelser: [
      {
        name: 'Allergiudredning',
        slug: 'allergi',
        category: 'onh',
        title: 'Allergiudredning med priktest',
        h2Title: 'Find årsagen til dine allergiske gener',
        shortIntro: 'Klinik Sirius i Varde tilbyder grundig allergiudredning med priktest og moderne rådgivning om behandling, herunder allergivaccination, til patienter fra Esbjerg og Sydvestjylland.',
        narrative: 'Allergi er langt mere udbredt end de fleste tror, og mange går rundt i årevis med gener, de ikke ved skyldes en allergi. Det kan være en løbende næse, kløende øjne, nysen, hudreaktioner eller vejrtrækningsbesvær, som alle kan have en allergisk årsag, der nemt kan kortlægges.\n\nHos Klinik Sirius anvender vi priktest, som er den mest præcise og hurtige metode til allergiudredning. Testen foretages på underarmen og giver svar på de mest almindelige allergener inden for 15 minutter. Vi tester for alt fra pollen og husstøvmider til dyr, skimmelsvamp og fødevarer. Det er en enkel procedure, og du behøver ikke forberede dig på noget særligt.\n\nVores speciallæge Jalal Taha Saadi gennemgår resultatet grundigt og sætter dine gener i sammenhæng med testresultaterne. Det er ikke altid et simpelt svar, da mange har reaktioner på flere ting, og vi hjælper dig med at forstå, hvad der er det primære problem.\n\nNår diagnosen er på plads, lægger vi en behandlingsplan. Den kan bestå af råd om at undgå udløsende faktorer, moderne antihistaminer eller næsespray. Vi tilbyder desuden allergivaccination i tabletform, som kan behandles hjemmefra og over tid nedsætter din følsomhed over for det, du reagerer på.\n\nMålet er ikke bare at lindre symptomerne, men at give dig en hverdag, hvor allergi fylder mindst muligt.',
        extraInfo: {
          col1Title: 'Priktesten',
          col1Text: 'En hurtig og sikker metode direkte på huden. Svar foreligger inden for 15 minutter.',
          col2Title: 'Allergivaccination',
          col2Text: 'Tabletbehandling kan gives hjemmefra og reducerer gradvist din allergiske følsomhed.'
        },
        faq: [
          { q: "Gør priktesten ondt?", a: "Det føles som en let prikken i huden og er hurtigt overstået. De fleste synes, det er uproblematisk. Børn kan godt have lidt modstand mod det, men selve testen tager kun få minutter." },
          { q: "Hvad kan jeg blive testet for?", a: "Vi tester for de hyppigste luftbårne allergener som pollen fra græsser, birk og bynke, husstøvmider, katte- og hundeskæl og skimmelsvamp. Vi kan også teste for en række fødevarer og insektstik. Snak med os på forhånd, hvis du har en specifik mistanke." },
          { q: "Skal jeg holde op med antihistaminer inden testen?", a: "Ja, antihistaminer kan dæmpe hudreaktionen og give et falsk negativt resultat. Du bør holde pause i mindst fem dage inden. Næsespray og astmamedicin påvirker ikke resultatet og kan fortsættes som normalt." },
          { q: "Hvad er allergivaccination, og hvordan virker det?", a: "Allergivaccination, også kaldet immunterapi eller hyposensibilisering, træner immunsystemet til at tåle det, du reagerer på. I tabletform lægges en tablet under tungen dagligt hjemme. Over tid mindskes din reaktion. Behandlingen varer typisk tre år og kan give langvarig effekt." },
          { q: "Kan børn allergi-testes?", a: "Ja, priktest kan foretages på børn fra to til tre år. Det er faktisk særlig vigtigt at udrede allergi tidligt hos børn, da ubehandlet allergi kan føre til astma. Vi er vant til at teste børn og tilpasser undersøgelsen til alder og samarbejdsevne." }
        ]
      },
      {
        name: 'Høreprøve og audiometri',
        slug: 'hoere',
        category: 'onh',
        title: 'Høreprøve, audiometri og tinnitus',
        h2Title: 'Præcis kortlægning af din hørelse',
        shortIntro: 'Vi udreder hørenedsættelse og øresusen med avancerede målemetoder, herunder audiometri, tympanometri og OAE-screening til børn.',
        narrative: 'Problemer med hørelsen er langt mere udbredt end de fleste ved, og det kan ramme alle aldersgrupper. Mange vokser langsomt ind i et høretab uden at bemærke det, fordi tilpasningen sker gradvist. Det er først, når andre begynder at gøre opmærksom på det, eller man begynder at gå glip af samtaler, at man søger hjælp. Vi anbefaler at komme tidligere.\n\nHos Klinik Sirius foretager vi en grundig høreundersøgelse med tonalaudiometer, der måler præcist, hvilke frekvenser der er påvirket, og i hvilken grad. Det giver et detaljeret billede af dit høremønster og er udgangspunktet for den videre rådgivning og behandling. Vi laver også tympanometri, som måler trykket i mellemøret og kan afsløre væske, tryk eller andre problemer, som kan forklare høretab.\n\nTinnitus, øresusen, er en tilstand, der kan opleves som meget belastende. Den ledsager ofte et høretab, men kan også opstå uden. Vi kortlægger dit mønster, undersøger hørelsen og drøfter, hvilke muligheder der findes for at reducere generne. Der er ingen universel kur mod tinnitus, men der er meget man kan gøre.\n\nTil børn anvender vi OAE-screening, OtoAcoustic Emission, som er en smertefri test, der måler det svar, det indre øre sender tilbage, når det stimuleres med lyd. Den er velegnet til helt små børn og babyer, der ikke kan samarbejde om en traditionel høretest, og den giver hurtigt et klart svar.\n\nJalal Taha Saadi har bred erfaring med høreudredning og vejleder dig om det videre forløb, hvad enten det drejer sig om en henvisning til høreapparatbehandling, medicinsk behandling eller blot observation og råd.',
        extraInfo: {
          col1Title: 'OAE-screening',
          col1Text: 'Smertefri hørescreening til spædbørn og småbørn, der ikke kan samarbejde om en traditionel test.',
          col2Title: 'Tympanometri',
          col2Text: 'Måler trykforhold i mellemøret og afslører væske eller tryk bag trommehinden.'
        },
        faq: [
          { q: "Hvad er audiometri?", a: "Audiometri er en præcis måling af din høreevne. Du sidder med høretelefoner og trykker på en knap, når du hører en tone. Tonen varieres i frekvens og styrke, og resultatet tegner et audiogram, der viser præcist, hvilke lyde du hører svagt eller slet ikke." },
          { q: "Hvad forårsager høretab?", a: "De hyppigste årsager er aldersbetinget høretab, støjskade fra arbejde eller musik, og mellemøreproblemer som væske eller tryk. Andre årsager kan være infektioner, medicin, eller i sjældne tilfælde en vækst på hørenervens forløb. En grundig undersøgelse kan afklare årsagen." },
          { q: "Hvornår bør mit barn hørescreenes?", a: "Alle nyfødte screenes på hospitalet, men et bestået screeningsresultat er ikke en garanti for normal hørelse hele livet. Er du bekymret for dit barns reaktion på lyde, sprogudvikling eller opmærksomhed, bør du kontakte os. Tidlig opdagelse af høretab er afgørende for barnets sprog og indlæring." },
          { q: "Kan tinnitus behandles?", a: "Der findes ingen medicinsk kur mod tinnitus, men generne kan reduceres markant. Behandlinger som lydsmaskning, kognitiv adfærdsterapi og i nogle tilfælde høreapparater kan hjælpe. Vi laver en grundig udredning og vejleder dig til det, der passer bedst til din situation." },
          { q: "Hvornår skal jeg have høreapparat?", a: "Det er en individuel vurdering. Et audiogram kan vise, at høretabet er der, men graden af gene i hverdagen er mindst ligeså vigtig. Vi drøfter det med dig og vejleder om mulighederne, men det er altid dig, der beslutter, hvornår du er klar." }
        ]
      },
      {
        name: 'Bihulebetændelse',
        slug: 'bihulebetaendelse',
        category: 'onh',
        title: 'Udredning og behandling af bihulebetændelse',
        h2Title: 'Kikkertundersøgelse og målrettet behandling',
        shortIntro: 'Kronisk eller tilbagevendende bihulebetændelse kræver en grundig undersøgelse. Klinik Sirius i Varde betjener patienter fra Esbjerg og hele Sydvestjylland og anvender kikkertudstyr til at se præcist, hvad der foregår i næse og bihuler.',
        narrative: 'Bihulebetændelse er en af de hyppigste årsager til, at folk søger læge, og for mange er det en tilstand, der vender tilbage igen og igen. En akut bihulebetændelse kan opstå efter en forkølelse og gå over af sig selv, men når den bliver kronisk eller tilbagevender hyppigt, er det tid til en grundig udredning.\n\nSymptomerne er typisk trykkende smerter i ansigtet, tilstoppet næse, tykt sekret og nedsat lugtesans. Mange har derudover smerter bag øjnene, over kinderne eller i panden. Det kan gøre det svært at sove, koncentrere sig og fungere normalt i hverdagen, og det er ikke noget, man bare skal leve med.\n\nHos Klinik Sirius foretager vi en kikkertundersøgelse af næse og næsebihuler, en endoskopi, der giver os et klart billede af, hvad der foregår inde i næsen. Det kan afsløre polypper, afvigelser i næseskillevæggen, hævede næsemuslinger eller andre forandringer, der blokerer dræningen fra bihulerne.\n\nJalal Taha Saadi er specialist i netop bihulekirurgi og har mange års erfaring med at vurdere, hvornår der er brug for medicinsk behandling, og hvornår en operation er den rette løsning. Mange tilstande kan behandles med næsespray og kortison, men er der strukturelle problemer, kan en operation give en varig forbedring.\n\nVi går altid fra den mindst indgribende løsning og optrapper kun, hvis det er nødvendigt. Du forlader konsultationen med en klar plan og en forståelse af, hvad der er årsagen til dine problemer.',
        extraInfo: {
          col1Title: 'Endoskopi',
          col1Text: 'Kikkertundersøgelse giver os et præcist billede af næse og bihuler uden stråling.',
          col2Title: 'Kirurgisk ekspertise',
          col2Text: 'Jalal Taha Saadi er specialist i bihulekirurgi og kan tilbyde operation, hvis det er nødvendigt.'
        },
        faq: [
          { q: "Hvornår er bihulebetændelse kronisk?", a: "Man taler om kronisk bihulebetændelse, når symptomerne har varet i mere end 12 uger trods behandling. Det er en tilstand, der kræver en mere systematisk tilgang end en akut betændelse og ofte involverer en kikkertundersøgelse." },
          { q: "Er endoskopi ubehageligt?", a: "En endoskopi af næsen er en hurtig undersøgelse, der tager et par minutter. Vi sprøjter et lokalbedøvende og afsvellende middel i næsen inden, så ubehaget minimeres. De fleste synes, det er meget overkommeligt." },
          { q: "Hvornår er operation nødvendigt?", a: "Operation overvejes, når medicinsk behandling ikke er tilstrækkelig, eller når der er strukturelle årsager som næsepolypper, afvigende næseskillevæg eller stærkt forstørrede næsemuslinger, der blokerer bihulernes dræning. Vi vurderer det individuelt." },
          { q: "Kan allergi forårsage bihulebetændelse?", a: "Ja, allergi er en hyppig medvirkende årsag til kronisk bihulebetændelse. Allergisk betændelse i slimhinderne fører til hævelse og dårlig dræning, som skaber gode betingelser for betændelse i bihulerne. Udredning og behandling af allergi kan derfor have en direkte positiv effekt." },
          { q: "Skal jeg have en henvisning?", a: "Du kan komme til os med eller uden henvisning fra din praktiserende læge. Med en gyldig henvisning dækkes konsultationen typisk af din sygesikring eller forsikring. Ring til os, og vi hjælper dig med at afklare, hvad der gælder for dig." }
        ]
      },
      {
        name: 'Halsbetændelse og mandelpropper',
        slug: 'halsbetaendelse',
        category: 'onh',
        title: 'Kronisk halsbetændelse og dårlig ånde fra mandelpropper',
        h2Title: 'Effektiv udredning og behandling af halsgener',
        shortIntro: 'Tilbagevendende halsbetændelse og mandelpropper med dårlig ånde er tilstande, vi kender godt og behandler effektivt.',
        narrative: 'Halsbetændelse hører til et af de allervanligste besøgsårsager hos lægen, og de fleste kender den brændende smerte, der gør det svært at sluge. For de fleste går det over af sig selv, men for nogen vender det tilbage igen og igen, og det kan gå ud over arbejde, skole og livskvalitet.\n\nKronisk eller tilbagevendende halsbetændelse skyldes oftest bakterier i mandlerne, men kan også hænge sammen med mandelstens og mandelpropper. Mandelpropper er ophobninger af madrester, bakterier og celler, der sætter sig fast i mandlernes huler og giver dårlig ånde, en ubehagelig smag og til tider smerter i halsen, selv uden egentlig betændelse.\n\nHos Klinik Sirius tager vi en grundig sygehistorie for at vurdere omfanget af problemet. Har du haft mere end fem til seks halsbetændelser om året, eller er det et problem, der har stået på i årevis, er det relevant at drøfte, om en operation kan være løsningen. Jalal Taha Saadi vejleder dig ærligt om fordele og ulemper ved at fjerne mandlerne.\n\nFor dem, der har problemer med mandelpropper men ikke nødvendigvis tilbagevendende betændelse, er der også behandlingsmuligheder. Vi drøfter, hvad der er mest relevant i din situation, og hvad du kan forvente af de forskellige muligheder.\n\nDet er vores erfaring, at mange patienter med disse problemer har gået med dem i lang tid uden at vide, at der er hjælp at hente. Kom ind og få en vurdering. Det kræver ikke, at situationen er akut.',
        extraInfo: {
          col1Title: 'Tilbagevendende betændelse',
          col1Text: 'Mere end fem til seks halsbetændelser om året taler for en speciallægevurdering.',
          col2Title: 'Mandelpropper',
          col2Text: 'Kan give dårlig ånde og ubehag uden egentlig betændelse og kan behandles.'
        },
        faq: [
          { q: "Hvornår bør jeg søge speciallæge for halsbetændelse?", a: "Har du haft fem eller flere halsbetændelser om året i mindst to år, eller er betændelserne meget invaliderende, er det relevant at søge speciallæge. Vi vurderer dit forløb og hjælper dig med at tage den rigtige beslutning." },
          { q: "Hvad er mandelpropper?", a: "Mandelpropper er small ansamlinger af madrester, døde hudceller og bakterier, der sætter sig fast i fordybningerne i mandlerne. De er gule eller hvide og kan give dårlig ånde og en ubehagelig smag i munden. De er ikke farlige, men kan være meget generende." },
          { q: "Kan dårlig ånde komme fra mandlerne?", a: "Ja, faktisk er mandlerne en hyppig og overset årsag til dårlig ånde. Mandlerne indeholder mange huler, som kan samle bakterier og mandelpropper. Selv med god tandhygiejne kan dette give vedvarende dårlig ånde, som kun afhjælpes ved at behandle mandlerne." },
          { q: "Er fjernelse af mandler en stor operation?", a: "Fjernelse af mandler er et relativt kortvarigt indgreb, der foregår i fuld narkose. De fleste er ude af hospitalet samme dag eller næste morgen. Heningen tager typisk en til to uger, og de første dage kan smerterne være mærkbare. Det er dog et indgreb, der giver varig effekt." },
          { q: "Kan voksne få fjernet mandlerne?", a: "Ja, operation er ikke forbeholdt børn. Mange voksne har stor gavn af at få fjernet mandlerne, særligt hvis de har haft gentagne betændelser gennem mange år. Helingstiden er typisk lidt længere for voksne end for børn, men resultatet er det samme." }
        ]
      },
      {
        name: 'Laryngoskopi',
        slug: 'laryngoskopi',
        category: 'onh',
        title: 'Laryngoskopi, kikkertundersøgelse af svælg og strube',
        h2Title: 'Grundig undersøgelse af svælg og strube',
        shortIntro: 'Laryngoskopi giver os et direkte blik ind i svælg og strube og er afgørende ved vedvarende hæshed, synkevanskeligheder eller smerter i halsen.',
        narrative: 'Laryngoskopi er en undersøgelse, hvor vi bruger et fleksibelt kikkertinstrument til at se direkte ind i svælget og struben. Det giver os mulighed for at vurdere stemmebåndene, strubehovedet og svælget i detaljer og opdage forandringer, som man ikke kan se på anden vis.\n\nUndersøgelsen er relevant ved en række symptomer. Vedvarende hæshed, som ikke går over efter to til tre uger, er den hyppigste årsag til, at vi foretager en laryngoskopi. Andre årsager er synkevanskeligheder, en følelse af noget i halsen, tilbagevendende smerter i halsen uden betændelse, hoste og i sjældne tilfælde kortåndethed eller stemmeskift.\n\nJalal Taha Saadi har bred erfaring med laryngoskopi og vurderer forandringer i struben med stor præcision. Undersøgelsen kan afsløre stemmebåndsknuder, polypper, godartede vækster, betændelse eller i sjældenere tilfælde tegn på mere alvorlige forandringer, der kræver yderligere udredning.\n\nProceduren foretages i klinikken og tager typisk fem til ti minutter. Vi sprøjter et lokalbedøvende middel i næsen inden, så instrumentet kan føres ned uden ubehag. Du vil mærke instrumentet, men det er ikke smertefuldt, og de fleste synes, det er meget overkommeligt.\n\nResultatet drøftes med dig umiddelbart efter undersøgelsen. Finder vi noget, der kræver videre handling, hjælper vi med at lægge en klar plan og sikrer, at du er tryg ved det videre forløb.',
        extraInfo: {
          col1Title: 'Hvornår er det relevant',
          col1Text: 'Vedvarende hæshed i mere end to til tre uger bør altid undersøges med laryngoskopi.',
          col2Title: 'Hurtig procedure',
          col2Text: 'Undersøgelsen tager fem til ti minutter og foretages direkte i klinikken.'
        },
        faq: [
          { q: "Gør laryngoskopi ondt?", a: "Nej, undersøgelsen er ikke smertefuld. Vi bedøver næse og svælg med et lokalbedøvende middel inden. Du vil mærke instrumentet, og nogle har en let hoste eller brækrefleks, men det er hurtigt overstået. De fleste er overraskede over, hvor lidt det generer." },
          { q: "Hvornår bør jeg søge hjælp for hæshed?", a: "Hæshed, der ikke forsvinder inden for to til tre uger, bør undersøges. Det gælder særligt, hvis du er ryger, bruger stemmen meget professionelt, eller hvis hæsheden kom pludseligt uden en forkølelse. Vedvarende hæshed er aldrig normalt og bør ikke ignoreres." },
          { q: "Hvad kan laryngoskopi afsløre?", a: "Undersøgelsen kan vise stemmebåndsknuder fra overbelastning af stemmen, polypper, cyster, betændelse i struben, sure opstød der har skadet slimhinden og i sjældenere tilfælde tegn på kræft i svælg eller strube. En tidlig undersøgelse er altid den bedste strategi." },
          { q: "Kan jeg spise og drikke inden undersøgelsen?", a: "Ja, du kan spise og drikke normalt inden en laryngoskopi. Det anbefales dog ikke at spise et tungt måltid umiddelbart inden, da brækrefleksen kan aktiveres. Undgå at ryge inden undersøgelsen, da det kan påvirke slimhindernes udseende." },
          { q: "Kan jeg arbejde samme dag som undersøgelsen?", a: "De fleste kan sagtens arbejde samme dag. Den lokalbedøvelse, vi giver, er kortvarig og påvirker ikke din almentilstand. Bedøvelsen i halsen aftager inden for en time, og du kan spise og drikke normalt igen derefter." }
        ]
      },
      {
        name: 'Mellemøreproblemer',
        slug: 'mellemoereproblem',
        category: 'onh',
        title: 'Udredning af mellemøreproblemer hos børn og voksne',
        h2Title: 'Væske, tryk og betændelse i mellemøret',
        shortIntro: 'Mellemøreproblemer er hyppige hos børn men rammer også voksne. Vi udreder og behandler tilstanden grundigt.',
        narrative: 'Mellemøret er rummet bag trommehinden, og når noget går galt her, kan det give alt fra trykfornemmelse og nedsat hørelse til smerte og hyppige øreinfektioner. Det er en af de hyppigste årsager til, at forældre søger læge med deres børn, men mellemøreproblemer rammer bestemt også voksne.\n\nDen hyppigste tilstand er sekretotitis media, også kaldet limsyge, hvor der samler sig en sej væske i mellemøret uden egentlig betændelse. Barnet hører dårligere, taler måske højere end normalt, og kan virke uopmærksomt. Hos voksne giver det typisk en trykfyldt fornemmelse i øret og nedsat hørelse, særligt efter flyvning eller i forbindelse med forkølelse.\n\nHos Klinik Sirius udreder vi mellemøreproblemer med tympanometri, som måler trykket bag trommehinden og viser, om der er væske til stede. Kombineret med en audiometri får vi et fuldstændigt billede af, hvad der foregår, og hvad der er bedst at gøre.\n\nJalal Taha Saadi vejleder dig om behandlingsmulighederne baseret på fundene. I mange tilfælde forsvinder problemet af sig selv, og vi anbefaler at afvente. I andre tilfælde er drænanlæggelse den bedste løsning, særligt hvis barnet har haft problemer i lang tid og sproget er påvirket.\n\nVi tager os god tid til at forklare forældre, hvad vi finder, hvad det betyder for barnets hørsel og trivsel, og hvad næste skridt er. En tryg og velinformeret forælder er det bedste udgangspunkt for et godt forløb.',
        extraInfo: {
          col1Title: 'Tympanometri',
          col1Text: 'Præcis måling af tryk og væske i mellemøret giver os det grundlag, vi har brug for.',
          col2Title: 'Børn og voksne',
          col2Text: 'Vi er vant til at undersøge og vejlede begge aldersgrupper med tilpassede metoder.'
        },
        faq: [
          { q: "Hvordan ved jeg, om mit barn har mellemøreproblemer?", a: "Typiske tegn er hyppige øreinfektioner, at barnet hører dårligere, taler højere end normalt, ikke reagerer på sit navn, eller at læreren har bemærket opmærksomhedsproblemer. Adfærdsændringer hos mindre børn kan også skyldes hørenedsættelse fra mellemøreproblemer." },
          { q: "Er mellemørebetændelse det samme som limsyge?", a: "Nej, det er to forskellige tilstande. Mellemørebetændelse er en akut infektion med smerte, feber og pludselig hørenedsættelse. Limsyge, eller sekretotitis media, er en ophobning af sej væske i mellemøret uden infektion. Begge kan give hørenedsættelse, men limsyge er smertefri." },
          { q: "Hvornår er drænanlæggelse nødvendig?", a: "Drænanlæggelse overvejes, når barnet har haft væske i mellemøret i mere end tre måneder med vedvarende hørenedsættelse, eller hvis hyppige mellemøreinfektioner påvirker barnets trivsel og udvikling. Vi vurderer altid individuelt og anbefaler aldrig operation unødigt." },
          { q: "Hvad er tympanometri?", a: "Tympanometri er en automatisk måling, der tager under et minut. En lille sonde holdes mod øreindgangen og sender lufttryk og lyd ind i øregangen. Instrumentet måler, hvordan trommehinden bevæger sig, og giver os information om tryk og eventuel væske i mellemøret." },
          { q: "Kan mellemøreproblemer gå over af sig selv?", a: "Ja, det kan de. Mange tilfælde af limsyge forsvinder af sig selv inden for tre måneder, og vi anbefaler oftest at afvente i første omgang. Vi følger op og vurderer løbende, om tilstanden bedres. Akut mellemørebetændelse behandles med smertestillende og i nogen tilfælde antibiotika." }
        ]
      },
      {
        name: 'Næseblødning',
        slug: 'naeseblodning',
        category: 'onh',
        title: 'Udredning og behandling af næseblødning',
        h2Title: 'Effektiv hjælp ved tilbagevendende næseblødning',
        shortIntro: 'En enkelt næseblødning er sjældent bekymrende, men tilbagevendende næseblødning kan have en årsag, der bør undersøges.',
        narrative: 'Næseblødning er noget de fleste har prøvet, og en enkelt episode er sjældent grund til bekymring. Men hvis næseblødning opstår igen og igen, særligt hvis den er svær at stoppe eller sker om natten, er det vigtigt at finde ud af, hvad der forårsager det.\n\nDe fleste næseblødninger stammer fra et lille område i forreste del af næseskillevæggen, hvor blodkarrene ligger tæt under slimhinden. Tør luft, forkølelse, næsepillen og allergi kan alle irritere slimhinden og gøre den tilbøjelig til at bløde. I sjældnere tilfælde kan årsagen være en blodfortyndende medicin, et blødningsforstyrrende syndrom eller en vækst i næsen.\n\nHos Klinik Sirius undersøger vi næsen med et kikkertinstrument for at kortlægge, hvorfra blødningen stammer, og om der er synlige årsager som forstørrede blodkar, betændelse eller polypper. Det giver os grundlaget for at vælge den rette behandling.\n\nEn hyppig og effektiv behandling er ætsning eller koagulation af de blødende blodkar. Det er en kort og relativt smertefri procedure, der kan udføres direkte i klinikken, og som hos mange eliminerer problemet fuldstændigt. Vi forklarer proceduren grundigt inden og sikrer, at du er tryg.\n\nVi vejleder dig også om, hvad du kan gøre i hverdagen for at mindske risikoen for blødning, herunder brug af næsesalve, luftfugtning og korrekt første hjælp, hvis blødningen opstår igen derhjemme.',
        extraInfo: {
          col1Title: 'Kikkertundersøgelse',
          col1Text: 'Vi kortlægger præcist, hvorfra blødningen stammer, inden vi beslutter behandlingen.',
          col2Title: 'Koagulation',
          col2Text: 'Ætsning af de blødende blodkar kan udføres i klinikken og giver varig lindring.'
        },
        faq: [
          { q: "Hvornår er næseblødning farlig?", a: "De fleste næseblødninger er ufarlige. Du bør søge akut hjælp, hvis blødningen ikke stopper efter 20 minutters tryk, blødningen er meget kraftig, eller du har fået et slag mod næsen. Tilbagevendende næseblødning uden åbenlys årsag bør undersøges hos en speciallæge." },
          { q: "Hvad gør jeg, når næsen bløder?", a: "Klem de bløde dele af næsen godt sammen med fingre og tommelfinger og hold i ti minutter uden at slippe. Læn dig lidt frem, ikke bagover, da blodet ellers løber ned i halsen. Undgå at snøfte eller blæse næsen umiddelbart efter. Koldt på nakken hjælper ikke medicinsk men kan virke beroligende." },
          { q: "Kan børn få behandling for næseblødning?", a: "Ja, behandling er mulig fra en tidlig alder. Hos børn er næseblødning meget almindelig og skyldes oftest, at slimhinden er tør og sart. Vi undersøger næsen og vurderer, om det er relevant at behandle blodkarrene, eller om hjemmeråd er tilstrækkeligt." },
          { q: "Gør koagulationen ondt?", a: "Vi bedøver næsen lokalt inden proceduren, så du ikke mærker smerte under selve behandlingen. Efterfølgende kan der være en let brændende fornemmelse i næsen i et par dage, og næsen kan virke tilstoppet. De fleste synes, det er meget overkommeligt i forhold til den lindring, det giver." },
          { q: "Kan medicin forårsage næseblødning?", a: "Ja, blodfortyndende medicin som Magnyl, Trombyl, Warfarin og de nyere blodfortyndere øger risikoen for næseblødning markant. Næsespray med kortison kan ved langvarig forkert brug tynde slimhinden. Fortæl os altid om din medicin, så vi kan tage det med i vurderingen." }
        ]
      },
      {
        name: 'Stritøre, vurdering',
        slug: 'stritoere',
        category: 'onh',
        title: 'Vurdering af stritøre',
        h2Title: 'Er du kandidat til en ørenoperation?',
        shortIntro: 'Stritøre, også kaldet fremstående ører, kan afhjælpes kirurgisk. Vi tilbyder en grundig vurdering og rådgivning om mulighederne.',
        narrative: 'Stritøre er en tilstand, hvor ørerne stikker tydeligt ud fra siden af hovedet. Det skyldes oftest manglende foldning af brusken i øret under fosterudviklingen eller en større afstand end normalt fra ørets bagende til kraniet. Det er en rent kosmetisk tilstand der ikke påvirker hørelsen, men for mange, særligt børn og unge, kan det have stor indvirkning på selvtillid og trivsel.\n\nHos Klinik Sirius tilbyder vi en grundig konsultation, hvor vi vurderer din situation og gennemgår dine muligheder. Jalal Taha Saadi er specialist i ørekirurgi og har stor erfaring med netop denne type vurdering. Konsultationen giver dig et realistisk billede af, hvad en operation kan gøre for dig, hvad indgrebet indebærer, og hvad du kan forvente af resultat og heling.\n\nDet er en personlig beslutning at korrigere stritøre, og vi presser aldrig på. Vi tror på, at en godt informeret patient træffer den bedste beslutning for sig selv, og vi sørger for, at du har den viden, du har brug for inden du beslutter dig.\n\nFor børn anbefaler vi generelt at afvente til barnet er gammelt nok til selv at ønske operationen, typisk fra seksårsalderen og opefter. Det er vigtigt, at motivationen for indgrebet kommer fra barnet selv og ikke kun fra omgivelserne.\n\nVi gennemgår hele forløbet fra vurdering til operation og opfølgning, og du er altid velkommen til at stille spørgsmål undervejs.',
        extraInfo: {
          col1Title: 'Grundig vurdering',
          col1Text: 'Vi vurderer, om du er en god kandidat, og hvad du realistisk kan forvente af resultatet.',
          col2Title: 'Børn og voksne',
          col2Text: 'Operationen kan foretages fra seksårsalderen, men det er altid barnets eget ønske der tæller.'
        },
        faq: [
          { q: "Fra hvilken alder kan man operere stritøre?", a: "Teknisk set kan operationen foretages fra ca. seksårsalderen, da brusken i øret er fuldt udviklet. Det vigtigste er dog, at barnet selv ønsker operationen og forstår, hvad det indebærer. Vi anbefaler aldrig at operere et barn, der ikke er motiveret for det." },
          { q: "Er der alternativer til operation?", a: "Hos nyfødte og spædbørn op til ca. seks ugers alder kan brusken i øret formes med et ørefitterapparat, da den på dette tidspunkt stadig er meget formbar. Herfra er operation den eneste permanente løsning. Der findes ingen cremer eller øvelser, der ændrer bruskens form." },
          { q: "Dækker sygesikringen operationen?", a: "En operation for stritøre er i Danmark betragtet som kosmetisk kirurgi og er som udgangspunkt ikke dækket af sygesikringen. Det kan dog variere afhængigt af graden af stritørerne og den psykiske belastning de medfører. Vi vejleder dig om mulighederne ved konsultationen." },
          { q: "Hvad sker der under konsultationen?", a: "Vi tager en samtale om dine ønsker og forventninger, undersøger ørerne og vurderer bruskkonstruktion og symmetri. Du får en ærlig vurdering af, hvad en operation kan opnå for dig, og hvad processen indebærer. Der er ingen forpligtelse til at gå videre med operationen." },
          { q: "Kan stritøre påvirke hørelsen?", a: "Nej, stritøre er udelukkende en kosmetisk tilstand og påvirker ikke høreevnen. Ørets ydre form spiller en minimal rolle for, hvor godt man hører. Det er ørens indre strukturer, der er afgørende for hørelsen." }
        ]
      },
      {
        name: 'Struboskopi',
        slug: 'struboskopi',
        category: 'onh',
        title: 'Struboskopi, kikkertundersøgelse af stemmebånd',
        h2Title: 'Præcis vurdering af stemmebåndenes funktion',
        shortIntro: 'Struboskopi er en avanceret undersøgelse, der viser stemmebåndenes bevægelighed og funktion i detaljer ved hæshed og stemmeproblemer.',
        narrative: 'Stemmebåndene er to fine muskel- og slimhindestykker, der vibrerer mod hinanden og danner grundlaget for vores stemme. Når noget er galt med stemmebåndene, påvirkes stemmen, og det kan vise sig som hæshed, stemmetræthed, manglende stemmestyrke, toneskift eller en følelse af tryk i halsen.\n\nStruboskopi er en specialiseret undersøgelse, der bruger stroboskoplys til at belyse stemmebåndene, mens de svinger. Det giver os et billede i slow motion og lader os se detaljer i stemmebåndenes bevægelighed og slimhindens funktion, som man ikke kan se med almindeligt lys. Det er den mest præcise metode til at vurdere stemmebåndsproblemer.\n\nJalal Taha Saadi anvender struboskopi til at diagnosticere stemmebåndsknuder, polypper, cyster, stemmebåndslammelse og andre forandringer, der kan forklare stemmeproblemer. Undersøgelsen er særligt værdifuld for professionelle stemmebrugere som sangere, lærere, skuespillere og andre, for hvem stemmen er et arbejdsredskab.\n\nForberedelsen er minimal. Vi anbefaler, at du ikke har spist et tungt måltid inden og gerne undlader at røge på dagen. Selve undersøgelsen tager ca. ti minutter og foretages i klinikken. Vi gennemgår fundene med dig umiddelbart bagefter og drøfter, hvad der er den bedste vej frem.\n\nBehandlingen afhænger naturligvis af diagnosen. I mange tilfælde er stemmehvile og logopædi tilstrækkeligt. I andre tilfælde er en lille operation på stemmebåndene den rette løsning, og vi planlægger det forløb med dig.',
        extraInfo: {
          col1Title: 'Slow-motion billede',
          col1Text: 'Stroboskopisk lys giver os et unikt billede af stemmebåndenes bevægelighed og slimhindens funktion.',
          col2Title: 'Professionelle stemmebrugere',
          col2Text: 'Vi er vant til at vurdere og behandle sangere, lærere og andre med særlige krav til stemmen.'
        },
        faq: [
          { q: "Hvad er forskellen på laryngoskopi og struboskopi?", a: "Laryngoskopi er en generel kikkertundersøgelse af svælg og strube med normalt lys. Struboskopi er en mere specialiseret undersøgelse med stroboskoplys, der lader os se stemmebåndenes svingninger i slow motion. Struboskopi bruges, når vi specifikt skal vurdere stemmebåndenes funktion og bevægelighed." },
          { q: "Hvornår er struboskopi relevant?", a: "Struboskopi er relevant ved vedvarende hæshed, stemmetræthed, manglende stemmestyrke, toneskift eller pludselige stemmeforandringer. Det er særligt vigtigt ved professionelle stemmebrugere og bør overvejes ved hæshed, der har stået på i mere end to til tre uger." },
          { q: "Hvad er stemmebåndsknuder?", a: "Stemmebåndsknuder er små, godartede fortykkelser på stemmebåndene, typisk opstået ved vedvarende overbelastning af stemmen, for eksempel hos lærere, sangere og folk der taler meget og højt i jobbet. De giver hæshed og stemmetræthed og behandles med stemmehvile, logopædi og i nogle tilfælde operation." },
          { q: "Kan jeg tale normalt efter undersøgelsen?", a: "Ja, du kan tale normalt umiddelbart efter. Den bedøvelse, vi giver i næsen og halsen, er kortvarig og påvirker ikke taleevnen. Vi anbefaler at undlade at spise og drikke varme drikke i den første time efter, til bedøvelsen er aftaget." },
          { q: "Skal professionelle sangere regelmæssigt kontrolleres?", a: "Det er en god idé, særligt hvis man bruger stemmen intensivt. Regelmæssig kontrol kan opdage begyndende forandringer, inden de udvikler sig til et egentligt problem. Vi kan rådgive om, hvor hyppigt det er relevant i din situation." }
        ]
      },
      {
        name: 'Svimmelhedsudredning',
        slug: 'svimmelhed',
        category: 'onh',
        title: 'Svimmelhedsudredning med VHIT',
        h2Title: 'Find årsagen til din svimmelhed',
        shortIntro: 'Svimmelhed kan have mange årsager. Med moderne VHIT-udstyr udreder vi balancesystemets funktion præcist og hurtigt.',
        narrative: 'Svimmelhed er et symptom, der kan betyde mange forskellige ting. Nogle oplever en roterende fornemmelse, som om verden drejer rundt. Andre har en mere diffus ubalancefornemmelse, eller de føler, at de er ved at falde. Uanset hvordan det opleves, er svimmelhed et symptom, der bør undersøges, særligt hvis det er tilbagevendende eller vedvarende.\n\nEn stor del af svimmelhedstilfælde stammer fra øret og balancesystemet. Det indre øre indeholder ikke bare høreorganet men også balanceorganet, og forstyrrelser her kan give kraftig svimmelhed. Den hyppigste årsag er benign paroxymal positionel vertigo, BPPV, som opstår, når små kalkpartikler i det indre øre løsner sig og vandrer ind i en forkert kanal.\n\nVi anvender Video Head Impulse Test, VHIT, til at vurdere balancesystemets funktion. Det er et avanceret diagnostisk redskab, der måler øjnenes refleksbevægelse som svar på hurtige hovedbevægelser og giver os præcise informationer om, hvilken del af balancesystemet der eventuelt er svækket. Det er en hurtig og ikke-invasiv undersøgelse.\n\nJalal Taha Saadi gennemgår fundene og kombinerer dem med en grundig sygehistorie for at stille den korrekte diagnose. Mange tilfælde af svimmelhed kan behandles effektivt i klinikken. BPPV kan for eksempel behandles med en specifik manøvre, der repositionerer de løse kalkpartikler, og mange patienter mærker bedring umiddelbart.\n\nAndet svimmelhed kan kræve medicinsk behandling, fysioterapi eller videre udredning. Vi sørger for, at du har en klar diagnose og en konkret plan, inden du forlader klinikken.',
        extraInfo: {
          col1Title: 'VHIT-teknologi',
          col1Text: 'Avanceret udstyr der præcist kortlægger balancesystemets funktion uden stråling eller ubehag.',
          col2Title: 'Effektiv behandling',
          col2Text: 'Mange svimmelhedstilstande kan behandles direkte i klinikken ved første besøg.'
        },
        faq: [
          { q: "Hvad er BPPV?", a: "Benign paroxymal positionel vertigo er den hyppigste årsag til pludselig svimmelhed. Det skyldes, at små kalkpartikler i det indre øre løsner sig og vandrer ind i en af balancekanalerne. Det giver kraftig, kortvarig svimmelhed, der typisk udløses af bestemte hovedbevægelser som at lægge sig ned eller se op." },
          { q: "Hvad er VHIT-undersøgelse?", a: "Video Head Impulse Test er en hurtig og præcis test af balancesystemet. Du sidder med specielle briller med et kamera, der filmer dine øjne. Undersøgeren laver korte, hurtige drejninger af dit hoved, og kameraet registrerer øjnenes kompensatoriske bevægelse. Det afslører, om balancenerven fra det indre øre fungerer normalt." },
          { q: "Kan svimmelhed komme fra hjertet eller hjernen?", a: "Ja, svimmelhed kan have mange årsager ud over øret. Blodtryksfald, hjerterytmeforstyrrelser, migræne og i sjældenere tilfælde forstyrrelser i hjernen kan give svimmelhed. Vi tager en grundig sygehistorie og vurderer, om den primære årsag er i øret, eller om der er brug for at involvere andre specialister." },
          { q: "Er Menieres sygdom en mulig årsag?", a: "Ja, Menieres sygdom er en tilstand i det indre øre, der giver anfald af kraftig svimmelhed kombineret med hørenedsættelse, øresus og trykfornemmelse i øret. Det er ikke en hyppig diagnose, men vi er opmærksomme på den og udreder grundigt, om mønsteret passer." },
          { q: "Hvad kan jeg gøre, mens jeg venter på udredning?", a: "Undgå pludselige bevægelser, der udløser svimmelheden. Sid eller lig ned, hvis anfaldene opstår. Undgå at køre bil, hvis svimmelheden er kraftig og uforudsigelig. Mange finder det hjælpsomt at notere, hvornår svimmelheden opstår, og hvad der udløser den, da det er nyttigt information til konsultationen." }
        ]
      }
    ],
    onhOperationer: [
      {
        name: 'Operation af ydre næse',
        slug: 'naese-operation',
        category: 'onh',
        title: 'Operation af ydre næse, rhinoplastik',
        h2Title: 'Kirurgisk korrektion af næsens form og funktion',
        shortIntro: 'Vi tilbyder rhinoplastik, operation af næsens ydre form, med fokus på et naturligt resultat og en forbedret funktion.',
        narrative: 'Rhinoplastik er en af de mest teknisk krævende operationer inden for plastikkirurgi, og det er en operation, der kræver stor erfaring og et præcist håndværk. Jalal Taha Saadi er specialist i netop denne type kirurgi og har gennemført mange rhinoplastikoperationer med fokus på både æstetik og funktion.\n\nEn operation på næsen kan have to formål: at ændre næsens ydre udseende, eller at forbedre vejrtrækningen, eller begge dele på én gang. Mange patienter kommer til os med en næse, der generer dem kosmetisk, men som også giver problemer med vejrtrækning på grund af afvigelser i den indre struktur. I sådanne tilfælde kan vi løse begge problemer i samme indgreb.\n\nKonsultationen er en vigtig del af forløbet. Vi gennemgår dine ønsker og forventninger grundigt og vurderer, hvad der er realistisk og muligt at opnå. Vi bruger tid på at forklare, hvad indgrebet indebærer, og hvad du kan forvente af heling og resultat. Et godt resultat kræver en fælles forståelse af målet og realistiske forventninger på begge sider.\n\nIndgrebet foregår i fuld narkose og tager typisk to til tre timer. Helingen kan tage op til et år, inden det endelige resultat er synligt, men de fleste er socialt præsentable igen efter to uger. Hævelse og blå mærker i de første dage er normalt og forsvinder gradvist.\n\nVi følger dig tæt i opfølgningsperioden og er tilgængelige med svar på spørgsmål undervejs. Du skal aldrig føle, at du er overladt til dig selv efter operationen.',
        extraInfo: {
          col1Title: 'Æstetik og funktion',
          col1Text: 'Vi kan forbedre næsens form og vejrtrækning i samme indgreb, hvis det er relevant.',
          col2Title: 'Naturligt resultat',
          col2Text: 'Målet er altid et harmonisk og naturligt udseende, der passer til dit ansigt.'
        },
        faq: [
          { q: "Hvad kan rhinoplastik ændre?", a: "Rhinoplastik kan ændre næsens størrelse, formen på næseryggen, næsespidsen, næseborenes størrelse og form og forholdet mellem næse og overlæbe. Det kan også forbedre vejrtrækning ved at rette indre strukturer. Vi drøfter dine specifikke ønsker og vurderer, hvad der er opnåeligt." },
          { q: "Hvornår ser jeg det endelige resultat?", a: "Næsen vil se markant bedre ud allerede efter to til tre uger, men hævelse kan forblive i op til et år, særligt i næsespidsen. Det endelige resultat er typisk synligt efter seks til tolv måneder. Vi forbereder dig grundigt på dette, så forventningerne er realistiske fra starten." },
          { q: "Er operationen smertefuld?", a: "Selve operationen foregår i narkose, så du mærker ingenting. I de første dage efter er der trykfornemmelse og let smerte, som håndteres med smertestillende medicin. De fleste beskriver ubehaget som overkommeligt. Det er de proppers, der sidder i næsen de første dage, der generer mest." },
          { q: "Hvornår kan jeg vende tilbage til hverdagen?", a: "De fleste kan vende tilbage til kontorarbejde efter syv til ti dage. Fysisk aktivitet og sport bør undgås i fire til seks uger. Du skal undgå soleksponering af næsen i mindst seks måneder efter operationen for at undgå pigmentering af det helede væv." },
          { q: "Er rhinoplastik dækket af sygesikringen?", a: "Ren kosmetisk rhinoplastik er ikke dækket af sygesikringen. Hvis operationen har et funktionelt formål, for eksempel korrektion af en skæv næseskillevæg der giver vejrtrækningsproblemer, kan en del af indgrebet i visse tilfælde dækkes. Vi afklarer dette grundigt ved konsultationen." }
        ]
      },
      {
        name: 'Næseskillevæg og næsemuslinger',
        slug: 'naeseskillevaeg',
        category: 'onh',
        title: 'Operation af næseskillevæg og næsemuslinger',
        h2Title: 'Bedre vejrtrækning gennem kirurgisk korrektion',
        shortIntro: 'En skæv næseskillevæg og forstørrede næsemuslinger er hyppige årsager til tilstoppet næse. Klinik Sirius i Varde tilbyder operation med varig forbedring og betjener patienter fra Esbjerg og Sydvestjylland.',
        narrative: 'Svær ved at trække vejret gennem næsen er et problem, der kan påvirke søvn, energi og livskvalitet markant. Mange vænner sig til det over tid og opdager ikke, hvor meget det egentlig generer dem, før de endelig får hjælp. To af de hyppigste årsager er en skæv næseskillevæg og forstørrede næsemuslinger.\n\nNæseskillevæggen er den brusk- og benstruktur, der deler næsen i to. Hos de fleste mennesker er den ikke helt lige, men kun når den er udtalt skæv, giver den symptomer som ensidig eller bilateral tilstoppet næse, hyppig snorken og forstyrret søvn. En operation, en septumplastik, retter skillevæggen og giver mere luft til begge næsegange.\n\nNæsemuslingerne er tre par slimhindebeklædte knoglestruktur inde i næsen, der regulerer luftstrømmen og fugter og varmer den indåndede luft. Når de er kronisk forstørrede, typisk pga. allergi eller kronisk betændelse, giver de en konstant tilstoppet følelse. De kan skrumpes med en lille operation, der bevarer funktionen men fjerner det overskydende væv.\n\nJalal Taha Saadi er specialist i netop denne type kirurgi og udfører operationen med stor præcision. Det er et indgreb, der typisk foretages i fuld narkose, tager ca. to timer og har en forholdsvis let heling. De fleste kan vende tilbage til arbejde efter en til to uger.\n\nFordelen er, at resultatet er varigt. En vellykket septumplastik og næsemuslingereduktion giver mange patienter en markant bedre næsevejrtrækning for resten af livet, og det forbedrer søvnkvaliteten og den generelle velvære betydeligt.',
        extraInfo: {
          col1Title: 'Septumplastik',
          col1Text: 'Rettelse af den skæve næseskillevæg giver permanent forbedring af vejrtrækning.',
          col2Title: 'Næsemuslingereduktion',
          col2Text: 'Vi reducerer forstørrede næsemuslinger med minimal indvirkning på funktion.'
        },
        faq: [
          { q: "Hvordan ved jeg, om jeg har en skæv næseskillevæg?", a: "Symptomerne er typisk kronisk tilstoppet næse, oftest mere på den ene side, hyppig snorken, vejrtrækningsproblemer under fysisk aktivitet og i nogen tilfælde hyppige bihulebetændelser. En kikkertundersøgelse af næsen kan bekræfte diagnosen." },
          { q: "Kan begge ting opereres på én gang?", a: "Ja, det er faktisk meget almindeligt at korrigere næseskillevæggen og reducere næsemuslingerne i samme operation. Det giver det bedste samlede resultat og kræver kun én heling og én sygemelding." },
          { q: "Gør det ondt at have prop i næsen?", a: "Efter operationen anlægger vi som regel tamponade i næsen i et til to døgn. Det er ubehageligt og giver en følelse af tryk og tilstopning. Fjernelsen af propperne er hurtigt overstået og ikke smertefuld. De fleste siger, at det er det, der generer mest i forløbet." },
          { q: "Er der risiko for, at næsen ser anderledes ud?", a: "Septumplastik og næsemuslingereduktion er indre operationer og påvirker ikke næsens ydre form. Det er kun, hvis der kombineres med en ydre rhinoplastik, at næsens udseende ændres. Vi er altid tydelige om, hvad indgrebet præcist indebærer." },
          { q: "Skal jeg have en henvisning?", a: "Med en gyldig henvisning fra din praktiserende læge dækkes konsultationen af sygesikringen, og operationen kan i mange tilfælde dækkes, da det er et funktionelt indgreb. Vi vejleder dig om dette ved konsultationen." }
        ]
      },
      {
        name: 'Fjernelse af mandler',
        slug: 'mandler-fjernelse',
        category: 'onh',
        title: 'Fjernelse af mandler, tonsillektomi',
        h2Title: 'Varig løsning på tilbagevendende halsbetændelse',
        shortIntro: 'Fjernelse af mandlerne er en af de mest udbredte operationer og giver varig lindring ved gentagen halsbetændelse. Vi udfører indgrebet hos Klinik Sirius i Varde og betjener patienter fra Esbjerg og Sydvestjylland.',
        narrative: 'Tonsillektomi, fjernelse af mandlerne, er en veletableret operation med en lang og god dokumentation for effekten. Det er en operation, vi foretager hos patienter, der har haft tilbagevendende halsbetændelse, og som ikke længere ønsker at leve med hyppige sygdomsforløb, brug af antibiotika og sygedage.\n\nBeslutningen om at fjerne mandlerne tages aldrig let og altid i fællesskab med patienten. Vi vurderer, om du opfylder kriterierne, som typisk er fem til seks eller flere halsbetændelser om året i mindst to år, eller færre men meget invaliderende forløb. Er du et barn, er det selvfølgelig forældrene, vi taler med, men vi forsøger altid at inddrage barnet i samtalen.\n\nJalal Taha Saadi udfører tonsillektomien i fuld narkose. Operationen tager ca. 30 minutter, og de fleste er hjemme igen samme dag. Helingen tager ca. to uger, og de første dage kan smerterne mærkes. Det er vigtigt at spise blødt, drikke rigeligt og hvile sig tilstrækkeligt i den periode.\n\nDet er normalt, at der opstår et hvidt belæg i halsen de første dage. Det er en del af helingen og ikke tegn på infektion. Vi informerer dig grundigt om, hvad du skal kigge efter, og hvornår du bør kontakte os.\n\nResultatet er for langt de fleste permanent. Fjernede mandler vokser ikke tilbage, og de fleste patienter oplever en markant forbedring i livskvalitet og en dramatisk reduktion i antallet af sygdomsdage.',
        extraInfo: {
          col1Title: 'Kort indgreb',
          col1Text: 'Operationen tager ca. 30 minutter i fuld narkose, og de fleste er hjemme samme dag.',
          col2Title: 'Varig effekt',
          col2Text: 'Fjernede mandler vokser ikke tilbage, og resultatet er permanent.'
        },
        faq: [
          { q: "Hvornår er fjernelse af mandler indiceret?", a: "Vi vurderer fjernelse, når du har haft fem eller flere halsbetændelser om året i mindst to år, eller når betændelserne er så invaliderende, at de markant påvirker din hverdag og livskvalitet. Mandler, der er så store, at de giver søvnapnø, er også en indikation." },
          { q: "Er det farligt at fjerne mandlerne?", a: "Tonsillektomi er et rutineindgreb med en meget lav risikoprofil. Den væsentligste risiko er blødning efter operationen, som forekommer hos cirka to procent af patienterne og typisk behandles effektivt. Vi informerer dig grundigt om tegn på blødning og hvad du skal gøre." },
          { q: "Kan voksne også få fjernet mandlerne?", a: "Ja, operationen er ikke forbeholdt børn. Voksne har generelt en lidt længere helingsperiode og kan opleve lidt mere smerte i de første dage end børn, men resultatet er det samme. For mange voksne er det en operation, de fortryder, at de ikke fik foretaget tidligere." },
          { q: "Hvad spiser man efter operationen?", a: "I de første dage anbefaler vi bløde fødevarer som is, yoghurt, suppe og mos. Undgå hård, skarp og varm mad i to uger. Det kan virke modkørende, men kolde drikke og mad kan faktisk lindre smerterne. Sørg for at drikke rigeligt for at holde halsen fugtig og fremme helingen." },
          { q: "Hvornår kan barnet vende tilbage til skolen?", a: "De fleste børn er klar til at vende tilbage til skolen efter syv til ti dage. Fysisk aktivitet og sport bør undgås i to uger. Det er vigtigt at holde barnet hjemme, til det er smertefrit og spiser normalt, uanset om det er gået nok dage." }
        ]
      },
      {
        name: 'Reduktion af mandler',
        slug: 'mandler-reduktion',
        category: 'onh',
        title: 'Reduktion af mandler, tonsillotomi',
        h2Title: 'Skånsom formindskelse af store mandler',
        shortIntro: 'Tonsillotomi er en skånsom operation, der reducerer store mandler og forbedrer vejrtrækning og søvn uden at fjerne dem helt.',
        narrative: 'Tonsillotomi er en alternativ procedure til den klassiske tonsillektomi. I stedet for at fjerne mandlerne helt reduceres de, typisk med laser eller radiofrekvensteknologi, så de ikke længere blokerer luftvejen. Det er en mere skånsom operation med hurtigere heling og kortere sygdomsperiode.\n\nIndgrebet er særligt relevant for børn med store mandler, der giver vejrtrækningsproblemer, snorken og søvnapnø, men som ikke har hyppige betændelser. Her er en reduktion af mandlernes volumen ofte tilstrækkelig til at løse problemet, uden at man behøver at fjerne mandlerne helt.\n\nJalal Taha Saadi vurderer ved konsultationen, om tonsillotomi eller tonsillektomi er det rigtige valg i din eller dit barns situation. Det er en individuel vurdering, der afhænger af årsagen til problemet, barnets alder og symptomernes karakter. Begge procedurer er veletablerede og velunderbyggede.\n\nProceduren foretages i fuld narkose og tager ca. 15 til 20 minutter. Fordi en del af mandelvævet bevares, er helingen typisk hurtigere end efter en fuld fjernelse, og smerteniveauet er lavere. De fleste børn er aktive igen inden for tre til fem dage.\n\nDen bevarede del af mandlen bibeholder sin immunologiske funktion, om end i reduceret omfang. Risikoen for tilbagevendende betændelse er lidt højere end efter en fuld fjernelse, men for de fleste patienter, der primært har problemer med mandlernes størrelse, er tonsillotomi et fremragende valg.',
        extraInfo: {
          col1Title: 'Hurtig heling',
          col1Text: 'Kortere helingstid og lavere smerteniveau end ved fuld fjernelse af mandlerne.',
          col2Title: 'Bevaret funktion',
          col2Text: 'Den resterende del af mandlen bibeholder sin immunologiske rolle i kroppen.'
        },
        faq: [
          { q: "Hvad er forskellen på tonsillotomi og tonsillektomi?", a: "Tonsillotomi er en reduktion af mandlernes størrelse, mens tonsillektomi er en fuld fjernelse. Tonsillotomi er skånsom, har kortere heling og er bedst ved store mandler uden hyppig betændelse. Tonsillektomi er bedst ved hyppige betændelsesinfektioner, da hele mandlen fjernes og risikoen for fremtidig betændelse elimineres." },
          { q: "Hvem er den bedste kandidat til tonsillotomi?", a: "Tonsillotomi er primært velegnet til børn med store mandler, der giver søvnapnø, snorken og vejrtrækningsproblemer, men som sjældent eller aldrig har egentlig halsbetændelse. Det er også relevant for voksne i visse tilfælde. Vi vurderer det individuelt ved konsultationen." },
          { q: "Vokser mandlerne tilbage efter en reduktion?", a: "Det kan forekomme, særligt hos yngre børn, hvor mandlerne stadig vokser. Det sker dog ikke hos alle, og for de fleste er effekten varig. Er der tilbagefald, kan der i visse tilfælde foretages en supplerende procedure." },
          { q: "Hvornår kan barnet vende tilbage til hverdagen?", a: "De fleste børn er aktive og spiser relativt normalt igen inden for tre til fem dage, hvilket er markant hurtigere end efter en tonsillektomi. Fysisk aktivitet og sport bør dog undgås i en til to uger." },
          { q: "Er tonsillotomi dækket af sygesikringen?", a: "Det afhænger af den kliniske indikation. Er der en veldokumenteret medicinsk indikation som søvnapnø med dokumenteret effekt på barnets trivsel og søvn, kan operationen dækkes. Vi hjælper med at afklare det ved konsultationen og sørger for den rette dokumentation." }
        ]
      },
      {
        name: 'Fjernelse af næsepolypper',
        slug: 'naesepolypper',
        category: 'onh',
        title: 'Fjernelse af næsepolypper',
        h2Title: 'Fri næse og bedre vejrtrækning efter polypfjernelse',
        shortIntro: 'Næsepolypper kan blokere næsen og bihulerne og forringe lugte- og smagsansen. Vi fjerner dem med minimal indgreb og lang holdbarhed.',
        narrative: 'Næsepolypper er bløde, godartede vækster, der opstår i næsens og bihulernes slimhinder som følge af kronisk betændelse. De er typisk forbundet med allergi, astma eller kronisk bihulebetændelse og kan vokse til at blokere næsegangene og forringe vejrtrækning, lugtesans og livskvalitet markant.\n\nMange patienter med næsepolypper har levet med en tilstoppet næse og nedsat lugtesans i lang tid uden at vide, at der er tale om polypper. En kikkertundersøgelse af næsen afslører dem hurtigt og giver os et klart billede af omfanget.\n\nDen primære behandling er næsespray med kortison, som kan reducere polyppernes størrelse og i nogen tilfælde er tilstrækkelig alene. Når de er for store til at reagere på medicin, er en operation den rette løsning. Jalal Taha Saadi udfører polypfjernelse med et endoskopisk kikkertinstrument, hvilket giver præcis fjernelse med minimal blødning og hurtig heling.\n\nOperationen foregår i fuld narkose og tager typisk en til to timer afhængigt af omfanget. De fleste er hjemme dagen efter og kan vende tilbage til arbejde inden for en til to uger. Lugtesansen vender ofte hurtigt tilbage, og for mange er det en af de mest mærkbare forbedringer efter indgrebet.\n\nEt vigtigt budskab er, at polypper har en tendens til at vokse igen, særligt hvis den underliggende årsag som allergi eller astma ikke er under kontrol. Vi lægger altid en plan for, hvordan risikoen for tilbagefald minimeres, og hvornår der er behov for opfølgning.',
        extraInfo: {
          col1Title: 'Endoskopisk teknik',
          col1Text: 'Præcis fjernelse med kikkertudstyr giver minimal blødning og hurtig heling.',
          col2Title: 'Lugtesansen vender tilbage',
          col2Text: 'De fleste patienter oplever markant forbedring af lugt og smag kort efter operationen.'
        },
        faq: [
          { q: "Hvad forårsager næsepolypper?", a: "Næsepolypper opstår ved vedvarende betændelse i næsens og bihulernes slimhinder. De er stærkt forbundet med allergi, astma og kronisk bihulebetændelse. Acetylsalicylsyreintolerance, som ses hos en del astmapatienter, er en særlig stærk risikofaktor." },
          { q: "Kan polypper behandles uden operation?", a: "Ja, i mange tilfælde kan kortikosteroide næsesprays reducere polypperne effektivt og er altid første behandlingsvalg. Systemisk kortison kan i kortere perioder give yderligere reduktion. Men er polypperne store og medicin utilstrækkelig, er operation nødvendig." },
          { q: "Vokser polypper tilbage efter operation?", a: "Det kan de. Tilbagefaldshyppigheden afhænger af den underliggende årsag og af, om man holder allergi og astma under kontrol. Regelmæssig brug af næsespray med kortison efter operationen er vigtig for at forebygge tilbagefald. Vi lægger en plan for opfølgning." },
          { q: "Mister man lugtesansen permanent ved polypper?", a: "Nej, tab af lugtesans ved polypper er ikke permanent. Når polypperne fjernes og betændelsen behandles, vender lugtesansen som regel tilbage, om end det kan tage lidt tid. For nogen er generhvervelsen af lugtesansen den mest glædesbringende del af bedringen." },
          { q: "Er det smertefuldt at have prop i næsen efter operationen?", a: "Tamponade i næsen i de første dage giver en trykfornemmelse og tilstoppet fornemmelse, der kan være ubehageligt. Fjernelsen er hurtig. Alternativt bruger vi i nogen tilfælde opløselige skum eller blot lade det heles uden tamponade. Vi afgør det baseret på indgrebets omfang." }
        ]
      },
      {
        name: 'Operation af bihuler',
        slug: 'bihuler-operation',
        category: 'onh',
        title: 'Operation af bihuler, FESS',
        h2Title: 'Endoskopisk bihuleoperation ved kronisk betændelse',
        shortIntro: 'Funktionel endoskopisk bihuleoperation, FESS, er en skånsom og effektiv metode til at åbne bihulerne og genskabe normal dræning.',
        narrative: 'Kronisk bihulebetændelse, der ikke responderer på medicinsk behandling, er den primære indikation for en bihuleoperation. Det er en tilstand, mange lever med i årevis med konstant tryk i ansigtet, tilstoppet næse, tykt sekret og nedsat lugtesans, og for dem kan en operation betyde en markant forbedring i livskvaliteten.\n\nOperationen vi udfører hedder FESS, Functional Endoscopic Sinus Surgery. Det er en endoskopisk procedure, hvor vi bruger et kikkertinstrument og præcise instrumenter til at åbne de naturlige åbninger til bihulerne og fjerne beskadiget slimhinde, polypper og evt. fremstående knoglestykker, der blokerer dræningen. Det er en skånsom teknik, der ikke kræver udvendige snit.\n\nJalal Taha Saadi er specialist i bihulekirurgi og har gennemført mange FESS-procedurer. Hans erfaring giver en præcis og sikker operation med minimal risiko for komplikationer og hurtig heling. Indgrebet foregår i fuld narkose og tager typisk en til to timer.\n\nDe fleste patienter er hjemme dagen efter. Næsen kan være tilstoppet og hævet i de første uger, men forbedring mærkes typisk inden for en til tre måneder. En god næseskylning i helingsfasen er vigtig for at holde næse og bihuler rene og fremme helingen.\n\nEn bihuleoperation helbreder ikke en allergi, men den giver bihulerne de bedste betingelser for at fungere normalt. Kombination med allergimedicin og næsespray efter operationen er ofte nøglen til et langtidsholdbart resultat.',
        extraInfo: {
          col1Title: 'FESS-teknik',
          col1Text: 'Endoskopisk operation uden udvendige snit, med hurtig heling og god effekt.',
          col2Title: 'Specialist i bihulekirurgi',
          col2Text: 'Jalal Taha Saadi har mange års erfaring med netop denne type operation.'
        },
        faq: [
          { q: "Hvornår er operation nødvendigt?", a: "Operation overvejes, når kronisk bihulebetændelse ikke bedres tilstrækkeligt efter mindst tre måneder med medicinsk behandling, inkl. antibiotika og næsespray med kortison. En CT-scanning af bihulerne bruges til at kortlægge forandringerne inden operationen." },
          { q: "Hvad er FESS?", a: "FESS er en forkortelse for Functional Endoscopic Sinus Surgery. Det er en teknik, hvor vi bruger et tyndt kikkertinstrument ført ind gennem næsen til at åbne bihulernes naturlige åbninger og fjerne det, der blokerer dem. Det kræver ingen ydre snit og giver minimale ar." },
          { q: "Er bihuleoperation farlig?", a: "FESS er et veletableret indgreb med lav risikoprofil. Som ved alle operationer er der en lille risiko for blødning og infektion. Fordi bihulerne ligger tæt op ad øjne og hjerne, kræver operationen stor præcision, men disse komplikationer er yderst sjældne hos erfarne kirurger." },
          { q: "Hvornår mærker jeg forbedring?", a: "I de første to til fire uger efter operationen kan næsen føles mere tilstoppet end inden, da slimhinderne er hævede fra indgrebet. Herefter begynder forbedringen gradvist. De fleste mærker tydeligt bedre vejrtrækning og færre symptomer inden for en til tre måneder." },
          { q: "Skal jeg lave noget specielt for at pleje næsen efter?", a: "Ja, næseskylning med saltvand er meget vigtig i helingsfasen. Det holder næsen ren, fjerner skorper og fremmer helingen. Vi gennemgår teknikken grundigt og anbefaler, at du fortsætter skylningen i mindst seks uger efter operationen." }
        ]
      },
      {
        name: 'Operation af stritører',
        slug: 'stritoere-operation',
        category: 'onh',
        title: 'Operation af stritører, otoplastik',
        h2Title: 'Kirurgisk korrektion af fremstående ører',
        shortIntro: 'Otoplastik er en veletableret operation, der permanent korrigerer stritøre og giver et naturligt og harmonisk udseende.',
        narrative: 'Otoplastik, korrektion af stritøre, er en operation, der giver mange patienter, særligt børn og unge, en markant forbedring i selvtillid og trivsel. Operationen kan foretages fra ca. seksårsalderen, da øret er fuldt udviklet på dette tidspunkt, og brusken er stadig relativ formbar.\n\nStritøre skyldes typisk manglende foldning af brusken i øret under fosterudviklingen, stor afstand fra ørets bagside til kraniet, eller begge dele. Operationen går ud på at folde og forme brusken, så øret lægges tættere mod kraniet og fremstår med en naturlig fold. Det er et indgreb, der kræver stor kirurgisk præcision og et godt øje for symmetri og proportion.\n\nJalal Taha Saadi har gennemført mange otoplastikoperationer og lægger stor vægt på et naturligt resultat, der ser ud, som om ørerne altid har siddet der. Et godt resultat er ét, som ingen lægger mærke til, fordi det ser så naturligt ud.\n\nOperationen foretages typisk i fuld narkose hos børn og lokal bedøvelse hos voksne, og tager ca. en time. Efterfølgende anlægges en forbinding rundt om hovedet, som bæres i et par uger. Der kan være lidt ømhed og hævelse i de første dage, men de fleste er aktive igen relativt hurtigt.\n\nResultatet er permanent. Brusken holder sin nye form, og ørerne vender ikke tilbage til den oprindelige position. For mange patienter og forældre er det en operation med stor positiv psykologisk effekt, og tilbagemeldingerne er overvejende meget positive.',
        extraInfo: {
          col1Title: 'Naturligt resultat',
          col1Text: 'Målet er ører, der ser naturlige ud, og som ikke tiltrækker sig opmærksomhed.',
          col2Title: 'Permanent effekt',
          col2Text: 'Brusken holder sin nye form, og ørerne vender ikke tilbage til den oprindelige position.'
        },
        faq: [
          { q: "Fra hvilken alder kan man operere?", a: "Otoplastik kan foretages fra ca. seksårsalderen, når øret er fuldt udviklet. Det anbefales at vente, til barnet selv ønsker operationen og forstår, hvad det indebærer. Operationen kan også foretages på voksne, og der er ingen øvre aldersgrænse." },
          { q: "Gør det ondt at have forbinding om hovedet?", a: "Forbindingen kan føles trykkende og varm, men de fleste børn vænner sig til den hurtigt. Den er vigtig for at holde ørerne i den rette position, mens de heler. Vi giver klare instruktioner om, hvornår den skal skiftes, og hvornår den kan tages af permanent." },
          { q: "Hvornår kan barnet vende tilbage til skolen?", a: "De fleste børn kan vende tilbage til skolen efter syv til ti dage, når forbindingen er skiftet til et blødere øreband. Kontaktsport og aktiviteter, der involverer risiko for slag mod ørerne, bør undgås i seks uger." },
          { q: "Er resultatet symmetrisk?", a: "Vi tilstræber altid den bedst mulige symmetri, men det er vigtigt at vide, at perfekt symmetri aldrig er garanteret. Naturlige ører er sjældent fuldstændig ens, og vi arbejder ud fra naturlige proportioner frem for en matematisk perfekt symmetri. Vi drøfter forventningerne grundigt ved konsultationen." },
          { q: "Er operationen dækket af sygesikringen?", a: "Som udgangspunkt er otoplastik en kosmetisk operation, der ikke dækkes af sygesikringen. I tilfælde, hvor der er dokumenteret psykisk belastning hos barnet som følge af stritørerne, kan der i visse tilfælde ansøges om dækning. Vi vejleder dig om mulighederne." }
        ]
      },
      {
        name: 'Fjernelse af børnepolypper',
        slug: 'bornepolypper',
        category: 'onh',
        title: 'Fjernelse af børnepolypper, adenoidektomi',
        h2Title: 'Fri næse og bedre søvn for dit barn',
        shortIntro: 'Børnepolypper kan give tilstoppet næse, snorken og hyppige øre- og næseinfektioner. Fjernelse er et kortvarigt og effektivt indgreb.',
        narrative: 'Børnepolypper, eller adenoider, er en lymfekirtelvævssamling bagerst i næsesvælget, bag ved næsen og over tonsillerne. De er en del af barnets immunforsvar og er normalt størst i fireårsalderen, hvorefter de gradvist skrumper ind. Men hos nogen vokser de sig så store, at de blokerer næsesvælget og giver en række generende symptomer.\n\nDe typiske tegn på store børnepolypper er kronisk tilstoppet næse, mundvejrtrækning, snorken og afbrudt søvn. Barnet kan virke træt og uoplagt, have svært ved at koncentrere sig og tale med en næseklang. Hyppige øreinfektioner og mellemøreproblemer er også hyppigt forekommende, da børnepolypperne kan blokere eustachian-tuberne, der regulerer trykket i mellemøret.\n\nJalal Taha Saadi foretager adenoidektomien i fuld narkose. Det er et kortvarigt indgreb, der tager ca. 15 til 20 minutter. Barnet er som regel hjemme samme dag og er aktivt og spiser normalt igen inden for to til tre dage. Det er en operation med hurtig heling og meget lav komplikationsrisiko.\n\nEn adenoidektomi kan kombineres med drænanlæggelse i ørerne, hvis barnet også har mellemøreproblemer. Det er meget almindeligt at foretage begge dele i samme narkose, da det sparer barnet for to separate indgreb.\n\nResultatet er for de fleste børn dramatisk. Vejrtrækningen forbedres umiddelbart, søvnkvaliteten bedres, og de fleste forældre beretter om et barn, der er mere veloplagt og aktiv i hverdagen.',
        extraInfo: {
          col1Title: 'Kortvarigt indgreb',
          col1Text: 'Operationen tager 15 til 20 minutter, og barnet er hjemme samme dag.',
          col2Title: 'Kan kombineres med dræn',
          col2Text: 'Vi kan anlægge dræn i ørerne i samme narkose, hvis mellemørene er påvirket.'
        },
        faq: [
          { q: "Hvordan ved jeg, om mit barn har store børnepolypper?", a: "Typiske tegn er kronisk tilstoppet næse, mundvejrtrækning, snorken, afbrudt søvn og hyppige øre- eller næseinfektioner. Barnet taler måske med en lukket næseklang og virker træthedspræget. Vi undersøger næsesvælget med et lille kikkertinstrument, der bekræfter diagnosen hurtigt." },
          { q: "Hvad er risiciene ved operationen?", a: "Adenoidektomi er et meget sikkert indgreb. Den primære risiko er blødning, som er sjælden. Fordi indgrebet foretages i narkose, er der den generelle narkosirisiko, men den er minimal ved børn, der er raske. Vi gennemgår risiciene grundigt inden." },
          { q: "Vokser børnepolypperne tilbage?", a: "Ja, det kan ske, særligt hos yngre børn, da adenoidvævet hos dem stadig er aktivt. Tilbagefald er dog ikke det hyppigste. Er der tilbagefald med de samme symptomer, kan en ny operation overvejes. Med alderen skrumper adenoidvævet naturligt, så problemet løser sig typisk af sig selv." },
          { q: "Kan man mærke, at de er væk bagefter?", a: "Barnet mærker ikke, at der mangler noget. Immunforsvaret kompenserer, og der er ingen dokumentation for, at fjernelse af børnepolypper svækker barnets almene immunforsvar. Tværtimod er mange børn syge langt sjældnere efter, fordi øre- og næseinfektionerne reduceres markant." },
          { q: "Hvornår kan barnet gå i skole og daginstitution igen?", a: "De fleste børn kan vende tilbage til daginstitution eller skole efter tre til fem dage. Vi anbefaler at holde barnet hjemme, til det er veloplagt og spiser normalt. Fysisk aktivitet og leg er fint fra dag to til tre, men kontaktleg bør afventes i ca. en uge." }
        ]
      },
      {
        name: 'Drænanlæggelse',
        slug: 'draenanlaeggelse',
        category: 'onh',
        title: 'Drænanlæggelse i ørerne',
        h2Title: 'Effektiv behandling af væske og tryk i mellemøret',
        shortIntro: 'Drænanlæggelse er et kortvarigt og sikkert indgreb, der hurtigt giver bedre hørelse og færre øreinfektioner hos børn med mellemøreproblemer.',
        narrative: 'Drænanlæggelse er et af de hyppigst udførte kirurgiske indgreb hos børn og er en velafprøvet og sikker behandling af vedvarende væske i mellemøret og hyppige mellemøreinfektioner. Selv om det er et lille indgreb, kan effekten på barnets hørelse, søvn og trivsel være meget stor.\n\nNår væske samler sig i mellemøret over lang tid, trommehinden trykkes ind, og lydledningen forringes. Barnet hører dårligere, reagerer sløvt, taler højere end normalt og kan have svært ved at koncentrere sig. Skolegang og sociale relationer kan påvirkes, og for nogen børn er det endda forbundet med forsinket sprogudvikling.\n\nEt dræn er et lille ventilationsrør, der sættes ind i en lille åbning i trommehinden under narkose. Det tager kun fem til ti minutter. Røret holder åbningen åben, så luft kan komme ind i mellemøret, og ophobningen af sekret kan løbe ud. Høreprøver, der foretages inden og efter indgrebet, viser typisk en markant forbedring i høreevnen umiddelbart efter.\n\nJalal Taha Saadi tilbyder drænanlæggelse alene eller i kombination med adenoidektomi, hvis barnet også har store børnepolypper. Det er meget almindeligt at foretage begge dele i samme korte narkose og dermed give barnet den samlede effekt af begge indgreb på én gang.\n\nDrænene falder som regel ud af sig selv efter seks til tolv måneder, når trommehinden er helet. Hullerne lukker typisk af sig selv. I perioden med dræn bør barnet holde vand ude af ørerne, og vi vejleder om, hvad det konkret betyder i hverdagen.',
        extraInfo: {
          col1Title: 'Hurtig procedure',
          col1Text: 'Selve drænanlæggelsen tager fem til ti minutter og foretages i kort narkose.',
          col2Title: 'Umiddelbar effekt',
          col2Text: 'Høreprøver efter indgrebet viser typisk markant forbedring allerede samme dag.'
        },
        faq: [
          { q: "Hvornår er drænanlæggelse nødvendig?", a: "Vi overvejer dræn, når barnet har haft dokumenteret væske i mellemøret i mere end tre måneder med vedvarende hørenedsættelse, eller ved hyppige og behandlingskrævende mellemøreinfektioner. Vi afventer altid i første omgang, da mange tilfælde løser sig selv." },
          { q: "Er der en risiko for, at trommehinden ikke heler?", a: "Det er en sjælden komplikation. Hos de fleste lukker hullet i trommehinden af sig selv, når drænrøret falder ud. I ca. to procent af tilfældene er hullet stadig åbent et år efter, at drænrøret er faldet ud. Det kan i de fleste tilfælde lukkes med et lille supplement-indgreb." },
          { q: "Hvad med vand i ørerne, bad og svømning?", a: "Drænrørene lader vand komme ind i mellemøret, og der er en risiko for infektion. Vi anbefaler svømmeprop eller ørepropper i badet og fraråder dyk og svømning under vand uden prop. Vi gennemgår reglerne grundigt, inden I tager hjem." },
          { q: "Falder drænene ud af sig selv?", a: "Ja, det er meningen. Drænrørene er designet til at falde ud, efterhånden som trommehinden fornyer sig. Det sker typisk efter seks til tolv måneder og er smertefrit. Barnet mærker det sjældent. Kom til kontrol, hvis drænrøret sidder i mere end to år." },
          { q: "Kan drænene anlægges uden narkose?", a: "Hos voksne er det muligt med lokalbedøvelse, da det tager meget kort tid. Hos børn er fuld narkose nødvendig, fordi barnet skal ligge helt stille under proceduren. Narkosen er kortvarig, og børn vågner typisk hurtigt og er friske samme dag." }
        ]
      }
    ]
  ,
  haandkirurgi: [
    {
      name: 'Karpaltunnelsyndrom',
      slug: 'karpaltunnelsyndrom',
      category: 'haand',
      title: 'Behandling af karpaltunnelsyndrom',
      h2Title: 'Effektiv lindring af smerte og følelsesløshed i hånden',
      shortIntro: 'Karpaltunnelsyndrom er den hyppigste nerveafklemning og giver smerter, prikkende fornemmelse og svaghed i hånden. Vi tilbyder udredning og behandling, fra skinne og injektioner til kirurgisk frigørelse.',
      narrative: 'Karpaltunnelsyndrom opstår, når mediannerven klemmes inde i karpaltunnelen, en smal passage i håndleddet. Det er den hyppigste form for nerveafklemning, og mange patienter kender til de karakteristiske symptomer: prikkende fornemmelse, følelsesløshed og smerter i tommelfinger, pegefinger, langfinger og den indvendige del af ringfingeren. Mange oplever, at symptomerne er værst om natten og vækker dem fra søvne.\n\nTilstanden ses hyppigt hos personer, der arbejder med gentagne bevægelser af hånden og håndleddet, men den kan ramme alle. Gravide er også særligt udsatte på grund af væskeansamlinger i vævet. Ubehandlet kan vedvarende afklemning over tid føre til svækkelse af musklerne ved tommelfingen og permanent nedsat følsomhed.\n\nVores tilgang starter med en grundig klinisk undersøgelse. Vi vurderer symptomernes art og sværhedsgrad og sætter en målrettet behandlingsplan. Ved lette til moderate tilfælde afprøves konservative metoder som natskinne, der holder håndleddet i neutral stilling, og eventuelt en kortisonindsprøjtning, der reducerer betændelsen i tunnelen.\n\nHvis konservativ behandling ikke giver tilstrækkelig effekt, eller hvis tilstanden er mere fremskreden med muskelsvind, er en kirurgisk frigørelse af karpaltunnelen den mest effektive løsning. Operationen er kortvarig og foregår i lokal bedøvelse. Et lille snit i håndfladen frigør det ligament, der lægger pres på nerven, og de fleste mærker hurtigt forbedring i symptomerne.\n\nResultaterne efter operation er generelt meget gode. Smerter og natlige gener forsvinder typisk hurtigt, mens genoprettelse af fuld følsomhed og styrke kan tage lidt længere tid, afhængigt af hvor længe afklemningen har stået på.',
      extraInfo: {
        col1Title: 'Natlige symptomer',
        col1Text: 'Mange oplever at vågne om natten med prikkende og sovende fingre. Det er et klassisk tegn på karpaltunnelsyndrom.',
        col2Title: 'Hurtig bedring',
        col2Text: 'Smerter forsvinder typisk hurtigt efter operation, mens fuld styrke og følsomhed vender gradvist tilbage.'
      },
      faq: [
        { q: 'Hvem får karpaltunnelsyndrom?', a: 'Det er mest udbredt hos kvinder mellem 40 og 60 år, men det kan ramme alle. Risikofaktorer inkluderer gentagne håndbevægelser i arbejdet, graviditet, overvægt, diabetes og reumatoid artritis. Der er også en arvelig komponent.' },
        { q: 'Kan det gå over af sig selv?', a: 'Milde tilfælde kan bedres med afventen og aflastning, særligt hos gravide, hvor tilstanden ofte forsvinder efter fødslen. Men ved vedvarende eller forværrede symptomer anbefaler vi at søge behandling for at undgå permanent nerveskade.' },
        { q: 'Hvad er risiciene ved operation?', a: 'Frigørelse af karpaltunnelen er et veletableret indgreb med lav komplikationsrate. Risici inkluderer infektion, arvæv og sjældent midlertidigt ubehag i arret. Alvorlige komplikationer er meget sjældne ved erfarne kirurger.' },
        { q: 'Hvornår kan jeg arbejde igen efter operation?', a: 'Det afhænger af dit arbejde. Kontor- og administrativt arbejde kan ofte genoptages inden for en til to uger. Fysisk håndkrævende arbejde kræver typisk seks til otte ugers restitution. Vi vejleder dig specifikt ud fra dit erhverv.' },
        { q: 'Kan karpaltunnelsyndrom komme igen efter operation?', a: 'Tilbagefald efter vellykket operation er sjælden. Operationen løser den strukturelle årsag til afklemningen. I meget sjældne tilfælde kan arvævsudvikling føre til ny afklemning, men det er undtagelsen snarere end reglen.' }
      ]
    },
    {
      name: 'Kubitaltunnelsyndrom',
      slug: 'kubitaltunnelsyndrom',
      category: 'haand',
      title: 'Kubitaltunnelsyndrom – afklemning af ulnarisnerven',
      h2Title: 'Frigørelse af ulnarisnerven ved albuen',
      shortIntro: 'Kubitaltunnelsyndrom skyldes afklemning af ulnarisnerven ved albuen og giver prikkende fornemmelse og svaghed i ringfinger og lillefinger. Vi tilbyder målrettet behandling og kirurgisk frigørelse.',
      narrative: 'Kubitaltunnelsyndrom er den næst hyppigste nerveafklemning og opstår, når ulnarisnerven klemmes i en smal kanal på indersiden af albuen. Mange kender ulnarisnerven som "den morsomme nerve", der giver et ubehageligt elektrisk stød, når man slår albuen mod en hård kant. Denne nerve er særligt sårbar ved albuen, fordi den løber tæt på overfladen og bøjer skarpt rundt om en knoglefremstående.\n\nTypiske symptomer er prikkende fornemmelse og følelsesløshed i ringfingeren og lillefingeren, som ofte er værst, når albuen holdes bøjet i lang tid, for eksempel under søvn eller ved telefonsamtaler. Med tiden kan der opstå svaghed i håndens muskulatur, vanskeligheder med at sprede fingrene og i svære tilfælde en karakteristisk klofom.\n\nRisikofaktorer inkluderer arbejde med støttet albue, gentagen bøjning og strækning af albuen samt direkte tryk mod indersiden af albuen. Tidligere brud eller ledsygdomme kan også disponere.\n\nVi starter behandlingen med en grundig vurdering. Konservative tiltag som natteskinne, der forhindrer fuld bøjning af albuen, kan hjælpe ved lette tilfælde. Hvis symptomerne er vedvarende eller der er tegn på muskelpåvirkning, er kirurgisk frigørelse indiceret.\n\nOperationen foretages under lokal bedøvelse og frigør nerven fra det omgivende bindevæv. I nogle tilfælde flyttes nerven til en ny position på forsiden af albuen for at undgå ny afklemning. Resultaterne er gode ved behandling på det rette tidspunkt, og de fleste oplever markant bedring i symptomerne.',
      extraInfo: {
        col1Title: 'Søvnpåvirkning',
        col1Text: 'Mange oplever forværring om natten, fordi albuen holdes bøjet under søvn. En natskinne kan give god lindring.',
        col2Title: 'Timing er vigtigt',
        col2Text: 'Jo tidligere behandling sættes ind, desto bedre er chancerne for fuld genopretning af nervefunktionen.'
      },
      faq: [
        { q: 'Hvad er forskellen på karpaltunnel og kubitaltunnel?', a: 'Begge er nerveafklemninger, men ved forskellige nerver og steder. Karpaltunnelsyndrom rammer mediannerven ved håndleddet og giver symptomer i de tre første fingre. Kubitaltunnelsyndrom rammer ulnarisnerven ved albuen og giver symptomer i ring- og lillefingeren.' },
        { q: 'Kan jeg sidde med albuen mod bordet?', a: 'Direkte pres mod indersiden af albuen forværrer typisk symptomerne. Vi anbefaler at undgå at støtte albuen mod hårde flader og at holde armen let bøjet frem for helt bøjet i lang tid.' },
        { q: 'Hvad sker der, hvis det ikke behandles?', a: 'Ubehandlet kan vedvarende afklemning føre til permanent muskelsvækkelse og nedsat følsomhed. I svære tilfælde opstår klofingre, fordi de muskler, der strækker fingrene, er svækkede. Det er vigtigt at handle, inden der opstår irreversibel nerveskade.' },
        { q: 'Hvor lang tid tager operationen?', a: 'Selve operationen tager typisk 30 til 60 minutter og foretages i lokal bedøvelse. Du er som regel hjemme samme dag. Restitutionen afhænger af, hvilken operationsteknik der benyttes, men de fleste er funktionsdygtige igen inden for et par uger.' },
        { q: 'Er der alternativ til operation?', a: 'Ved lette tilfælde kan natskinne og adfærdsmodifikation hjælpe. Kortisoninjektioner er generelt ikke standardbehandling her i modsætning til karpaltunnelsyndrom. Kommer symptomerne ikke under kontrol med konservativ behandling, er operation den mest effektive løsning.' }
      ]
    },
    {
      name: 'Perifere nerveafklemninger',
      slug: 'perifere-nerveafklemninger',
      category: 'haand',
      title: 'Andre perifere nerveafklemninger i hånd og underarm',
      h2Title: 'Præcis diagnosticering og behandling af nerveafklemninger',
      shortIntro: 'Udover de klassiske syndromer kan nerver afklemmes på mange niveauer i hånd og underarm. Vi tilbyder en grundig udredning og skræddersyet behandling.',
      narrative: 'Nerver i hånd og underarm kan afklemmes på mange steder udover de velkendte karpaltunnel og kubitaltunnel. Radialnerven, der løber på ydersiden af armen, kan afklemmes ved albuen og give smerter i underarmen og håndleddet, en tilstand man kalder posteriort interosseussyndrom eller radialtunnelsyndrom. Mediannerven kan også afklemmes højere oppe i underarmen ved pronator teres-musklen, det såkaldte pronatorsyndrom.\n\nFælles for disse tilstande er, at de kan være svære at diagnosticere, fordi symptomerne er mere diffuse end ved de klassiske syndromer. Smerter, træthed i armen, prikkende fornemmelse og svaghed kan optræde i varierende kombinationer, og tilstandene forveksles ofte med tennisalbue eller andre overbelastningsskader.\n\nEn grundig og erfaren klinisk vurdering er afgørende. Vi gennemgår symptomernes fordeling og karakter, foretager en målrettet undersøgelse af nerveforsyningen og supplerer om nødvendigt med EMG-undersøgelse og billeddiagnostik for at fastlægge præcist, hvor nerven er påvirket.\n\nBehandlingen afhænger af afklemningens årsag og placering. Konservative tiltag som afventen, aflastning, fysioterapi og tilpasning af arbejdsstillinger afprøves først. Ved vedvarende symptomer eller klare tegn på nerveskade er kirurgisk frigørelse den rette løsning.\n\nVores erfaring med håndkirurgi sikrer, at du kommer i hænder, der kender disse tilstande indgående og kan hjælpe dig med en præcis diagnose og den rette behandling, hvad enten den er konservativ eller operativ.',
      extraInfo: {
        col1Title: 'Præcis diagnose',
        col1Text: 'Nerveafklemninger kan sidde på mange niveauer. En grundig klinisk vurdering er fundamentet for den rigtige behandling.',
        col2Title: 'Individuel plan',
        col2Text: 'Vi tilpasser behandlingen til den specifikke afklemning og din hverdag.'
      },
      faq: [
        { q: 'Hvordan ved jeg, om det er en nerveafklemning?', a: 'Typiske tegn er prikkende fornemmelse, følelsesløshed, svaghed og smerter i et bestemt mønster svarende til en nervs forsyningsområde. Symptomerne forværres ofte ved bestemte stillinger eller belastninger. En klinisk vurdering og eventuelt EMG-undersøgelse afklarer diagnosen.' },
        { q: 'Hvad er EMG?', a: 'EMG (elektromyografi) og nerveledningshastighed er en undersøgelse, der måler nervernes og musklernes elektriske aktivitet. Den hjælper med at fastslå, om der er nerveskade, og præcist hvor nerven er påvirket. Det er et vigtigt redskab ved uklare nerveafklemninger.' },
        { q: 'Kan det forveksles med muskel- og seneskader?', a: 'Ja, det er faktisk et hyppigt problem. Radialnerveafklemning forveksles for eksempel ofte med tennisalbue, da begge giver smerter på ydersiden af albuen og underarmen. En erfaren specialist kan skelne tilstandene klinisk og sætte den rette behandling ind.' },
        { q: 'Hvornår er det nødvendigt med operation?', a: 'Operation overvejes, når konservativ behandling ikke giver tilstrækkelig effekt efter en rimelig periode, og når der er tegn på tiltagende nerveskade i form af muskelsvind eller forværret følelsesløshed. Timing er vigtigt for at undgå permanente skader.' },
        { q: 'Kan arbejdsstilling og ergonomi have indflydelse?', a: 'Ja, det kan det i høj grad. Vedvarende ugunstige arbejdsstillinger kan fremprovokere og vedligeholde nerveafklemninger. En ergonomisk tilpasning af arbejdspladsen er ofte en vigtig del af det samlede behandlingsbillede.' }
      ]
    },
    {
      name: 'Springfinger (triggerfinger)',
      slug: 'springfinger',
      category: 'haand',
      title: 'Behandling af springfinger (triggerfinger)',
      h2Title: 'Fri og smertefri bevægelighed i fingeren',
      shortIntro: 'Springfinger giver en karakteristisk klikken og fastlåsning, når fingeren bøjes. Vi tilbyder effektiv behandling fra kortisonindsprøjtning til kirurgisk frigørelse.',
      narrative: 'Springfinger, eller triggerfinger som det hedder på fagsprog, er en tilstand, hvor en fingers sene klikker eller hægter sig fast, når man forsøger at bøje eller strække fingeren. I milde tilfælde opleves blot en klikken. I mere udtalte tilfælde sidder fingeren fast i bøjet stilling og skal rettes ud med den anden hånd, ofte med smerter.\n\nTilstanden opstår, fordi senen og dens omgivende skedehinde, der normalt glider problemfrit, bliver fortykket og ikke kan passere frit gennem en lille tunnel i håndfladen. Det er den første ringlige, pulleys, der oftest er årsagen. Tilstanden er hyppigere hos kvinder, hos diabetikere og hos personer med reumatoid artritis.\n\nVi starter med en klinisk vurdering. I de fleste tilfælde er diagnosen klar ud fra sygehistorien og den kliniske undersøgelse. Behandlingen tilpasses graden af symptomerne.\n\nEn kortisonindsprøjtning lokalt ved den fortykkede ring reducerer betændelsen og er effektiv hos en stor del af patienterne, særligt ved kortere sygehistorie. Effekten kan holde i måneder og i nogen tilfælde permanent. Er der behov for det, kan indsprøjtningen gentages.\n\nHvis kortisonbehandling ikke giver tilstrækkelig effekt, eller ved svære tilfælde med fuldstændig fastlåsning, er en kortvarig operation den bedste løsning. Indgrebet foregår i lokal bedøvelse og indebærer en lille åbning i den fortykkede ring, så senen igen kan glide frit. Heling er hurtig, og de fleste kan bruge fingeren igen inden for kort tid.',
      extraInfo: {
        col1Title: 'Kortisonindsprøjtning',
        col1Text: 'Mange patienter oplever langvarig og i nogen tilfælde permanent bedring efter én til to injektioner.',
        col2Title: 'Hurtig operation',
        col2Text: 'Operationen er kortvarig i lokal bedøvelse, og fingeren kan bruges igen hurtigt efter.'
      },
      faq: [
        { q: 'Er springfinger farligt?', a: 'Springfinger er ikke farligt i medicinsk forstand, men det kan være smertefuldt og begrænsende i hverdagen. I svære tilfælde, hvor fingeren sidder fuldstændig fast i bøjet stilling, er behandling nødvendig for at genoprette funktion og forhindre kontraktur.' },
        { q: 'Kan det gå over af sig selv?', a: 'Milde tilfælde kan bedres med hvile og aflastning. Men er symptomerne mere udtalte, tilstanden varer ved, eller opstår der fastlåsning, er behandling klart at foretrække frem for afventen.' },
        { q: 'Hvem er mest udsat?', a: 'Springfinger ses hyppigere hos kvinder, personer over 40 år, diabetikere og patienter med reumatoid artritis. Det ses i alle fingre, men tommelfingeren, langfingeren og ringfingeren er oftest ramt.' },
        { q: 'Gør kortisonindsprøjtningen ondt?', a: 'Indsprøjtningen kan give et kortvarigt ubehag eller stikkende fornemmelse, men er generelt godt tolereret. Nogle oplever mild ømhed i et par dage efter. Effekten ses typisk inden for en til to uger.' },
        { q: 'Kan alle fingre rammes?', a: 'Ja, springfinger kan opstå i alle fingre, herunder tommelfingeren. Hos diabetikere kan flere fingre på samme hånd være ramt. Vi vurderer og behandler hver finger individuelt ud fra symptomernes sværhedsgrad.' }
      ]
    },
    {
      name: 'De Quervains seneskedehindebetændelse',
      slug: 'de-quervains',
      category: 'haand',
      title: 'De Quervains seneskedehindebetændelse',
      h2Title: 'Effektiv lindring af smerter ved tommelfinger og håndled',
      shortIntro: 'De Quervains seneskedehindebetændelse giver smerter langs tommelfingersiden af håndleddet. Tilstanden er hyppig hos forældre til nyfødte og ved gentagne tommelbevægelser. Vi tilbyder effektiv behandling.',
      narrative: 'De Quervains seneskedehindebetændelse er en betændelsestilstand i seneskedehinden om to sener, der løber på tommelfingersiden af håndleddet. Det giver karakteristiske smerter ved den lille knoglefremstående på tommelfingersidens håndled, og smerten forværres typisk ved at bevæge tommelfingren eller holde om noget.\n\nTilstanden ses hyppigt hos nybagte forældre, fordi gentagen håndtering af et spædbarn belaster netop disse sener. Det er ikke ualmindeligt, at mødre oplever svære smerter på håndleddet i de første måneder efter fødslen, kombineret med graviditetsbetingede hormonforandringer. Men tilstanden rammer bredere end som så og ses ved enhver aktivitet med gentagne tommelbevægelser.\n\nDiagnosen stilles klinisk. Finkelsteins test er et klassisk greb, der provocerer smerten og bekræfter diagnosen. Vi vurderer sværhedsgraden og tilpasser behandlingen.\n\nI første omgang anbefales aflastning, eventuelt med en skinne, der immobiliserer tommelfingerens grundled, og anti-inflammatorisk medicin. En kortisonindsprøjtning i seneskedehinden er effektiv hos mange patienter og kan give lang tids symptomlindring.\n\nVed utilstrækkelig effekt af konservativ behandling tilbydes en kortvarig operation i lokal bedøvelse, hvor den forsnævrede seneskedehinde åbnes, så senerne frit kan glide. Operationen er meget effektiv og giver de fleste patienter permanent lindring.',
      extraInfo: {
        col1Title: 'Hyppig hos forældre',
        col1Text: 'Mange nybagte mødre og fædre rammes af tilstanden. Genopretning er mulig med den rette behandling.',
        col2Title: 'Kortisoninjektionen virker',
        col2Text: 'Indsprøjtning i seneskedehinden er effektiv hos flertallet og kan give langvarig bedring.'
      },
      faq: [
        { q: 'Er det farligt at have De Quervains under graviditet?', a: 'Det er ikke farligt, men kan være meget generende. Graviditets- og amningshormonerne kan bidrage til tilstanden. Behandling med skinne og i udvalgte tilfælde kortison anbefales. Vi tilpasser behandlingen nøje til gravide og ammende.' },
        { q: 'Kan det forveksles med gigt?', a: 'Ja, smerter ved tommelfingersiden af håndleddet kan i første omgang ligne slidgigt i tommelfingerens rodled. En grundig klinisk undersøgelse skelner de to tilstande, som behandles forskelligt.' },
        { q: 'Virker kortison altid?', a: 'Kortison er effektivt hos mange, men ikke alle. Studier viser, at 50 til 80 procent oplever god effekt af én injektion. Effekten kan i nogen tilfælde vare i årevis, i andre tilfælde er den mere kortvarig. Ved utilstrækkelig effekt er operation næste skridt.' },
        { q: 'Kan jeg bruge hånden efter operation?', a: 'Ja. Operationen foretages i lokal bedøvelse, og du kan som regel bruge fingrene igen samme dag. Heling af snittet tager to til tre uger. De fleste er tilbage til daglige aktiviteter hurtigt.' },
        { q: 'Kan tilstanden komme igen?', a: 'Tilbagefald kan forekomme, særligt hvis den udløsende aktivitet fortsætter. Vi vejleder om forebyggelse og ergonomi for at minimere risikoen for recidiv.' }
      ]
    },
    {
      name: 'Seneskedebetændelser',
      slug: 'seneskedebetaendelser',
      category: 'haand',
      title: 'Behandling af seneskedebetændelser i hånd og underarm',
      h2Title: 'Smertefri hverdag med den rette behandling',
      shortIntro: 'Seneskedebetændelse giver smerter, hævelse og nedsat bevægelighed ved de berørte sener. Vi diagnosticerer og behandler alle former for seneskedebetændelse i hånden og underarmen.',
      narrative: 'Seneskedebetændelse er en betændelsestilstand i den væskeproducerende hinde, der omgiver mange af senerne i hånden og underarmen. Denne skedehinde, synovialhinden, producerer normalt en lille smule ledvæske, der smører senen og gør, at den kan glide gnidningsfrit. Når hinden betændes og fortykkes, giver det smerter, hævelse og stivhed.\n\nÅrsagerne er mange. Overbelastning ved gentagne bevægelser er hyppigt, men seneskedebetændelse kan også opstå ved gigtlidelser som reumatoid artritis, psoriasisgigt og reaktiv artrit. I sjældnere tilfælde kan bakteriel betændelse opstå, ofte efter punktering af huden, og det er en tilstand, der kræver hurtig behandling.\n\nSymptomerne afhænger af, hvilken sene der er ramt. Generelt ses smerter langs senens forløb, som forværres ved aktiv brug og stræk, hævelse over det berørte område og i nogen tilfælde en knitrende fornemmelse ved bevægelse, det man kalder krepitation.\n\nVi starter altid med at fastlægge årsagen til betændelsen. Det er afgørende for behandlingen. Ved ikke-infektiøs seneskedebetændelse er hvile, anti-inflammatorisk behandling og i mange tilfælde en lokal kortisonindsprøjtning meget effektivt. Fysioterapi og ergonomisk vejledning supplerer behandlingen.\n\nVed mistanke om bakteriel seneskedebetændelse er hurtig handling afgørende. Tilstanden kræver antibiotika og i de fleste tilfælde kirurgisk skylning af seneskedehinden for at undgå permanent skade på senen.',
      extraInfo: {
        col1Title: 'Mange årsager',
        col1Text: 'Overbelastning, gigtlidelser og infektion kan alle give seneskedebetændelse. Årsagen bestemmer behandlingen.',
        col2Title: 'Hurtig indsats ved infektion',
        col2Text: 'Bakteriel seneskedebetændelse kræver hurtig behandling for at beskytte senens funktion.'
      },
      faq: [
        { q: 'Hvad er forskellen på seneskedebetændelse og senebetændelse?', a: 'Senebetændelse er en forandring i selve senen som følge af overbelastning. Seneskedebetændelse er betændelse i den hinde, der omgiver senen. De kan optræde sammen, men er to forskellige processer. Behandlingen kan variere afhængigt af, hvad der primært er ramt.' },
        { q: 'Kan jeg fortsat arbejde med seneskedebetændelse?', a: 'Det afhænger af graden og din type arbejde. I milde tilfælde kan aktivitetsmodifikation gøre det muligt at fortsætte, men med forsigtighed. I mere alvorlige tilfælde kan hvile og sygemelding være nødvendig for at undgå forværring og fremme heling.' },
        { q: 'Hvornår skal jeg søge akut hjælp?', a: 'Søg læge akut, hvis du oplever tiltagende hævelse, rødme og varme i hånden kombineret med feber og stærke smerter ved den mindste bevægelse af fingeren. Det kan være tegn på bakteriel seneskedebetændelse, som kræver hurtig behandling.' },
        { q: 'Kan ultralyd hjælpe med diagnosen?', a: 'Ja, ultralydsskanning er et nyttigt redskab til at visualisere seneskedehinderne og bekræfte diagnosen. Det kan vise fortykket skedehinde og væske i skedehinden og hjælpe med at guide en kortisonindsprøjtning præcist.' },
        { q: 'Hjælper kortison altid?', a: 'Kortisonindsprøjtning er effektiv ved inflammatorisk seneskedebetændelse og giver mange patienter god og langvarig lindring. Den bruges ikke ved bakteriel seneskedebetændelse, da kortison kan forværre en infektion. Vi vurderer altid årsagen, inden vi tilbyder kortison.' }
      ]
    },
    {
      name: 'Ganglion (seneknuder)',
      slug: 'ganglion',
      category: 'haand',
      title: 'Behandling af ganglion og seneknuder',
      h2Title: 'Sikker fjernelse af ganglion i hånd og håndled',
      shortIntro: 'Ganglion er godartede væskefyldte cyster, der opstår ved led og sener i hånd og håndled. Vi tilbyder en grundig vurdering og behandling, herunder aspiration og kirurgisk fjernelse.',
      narrative: 'Et ganglion er en godartet, væskefyldt cyste, der opstår i tilknytning til en led eller en sene. Det er den hyppigste godartede svulst i hånden og håndleddet og ses oftest på håndryggen, men kan også optræde på håndfladsesiden, ved tommelfingeren og andre steder.\n\nGanglion opstår, når leddets eller seneskedens indvendige beklædning svulmer ud og danner en cyste, der fyldes med en tyktflydende, geléagtig væske. Den præcise årsag er ikke fuldt ud forstået, men overbelastning og tidligere skader kan disponere. Mange ganglier er asymptomatiske og giver kun genér på grund af udseendet. Andre kan give smerter, trykkende fornemmelse eller begrænsning i bevægelighed, særligt hvis de sidder tæt på en sene eller nerve.\n\nVi starter med en grundig vurdering. De fleste ganglier er let genkendelige klinisk, men en ultralydsskanning kan bekræfte diagnosen og afklare, hvad cysten er forbundet med. Det er vigtigt at skelne et ganglion fra andre typer knuder, der kan kræve en anderledes tilgang.\n\nBehandlingsmulighederne afhænger af symptomerne. Mange ganglier kan med fordel observeres, da de i nogen tilfælde forsvinder spontant. Er der smerter eller funktionspåvirkning, tilbydes aspiration, hvor cysten punkteres og væsken suges ud. Det er effektivt, men tilbagefald er hyppigere end ved operation.\n\nKirurgisk fjernelse er den mest effektive behandling og indebærer, at cysten og dens stilk fjernes ved roden i lokal bedøvelse. Recidivraten er lav ved korrekt udført operation.',
      extraInfo: {
        col1Title: 'Godartet',
        col1Text: 'Ganglion er altid godartet. Det er aldrig kræft, men bør vurderes af en specialist ved tvivl.',
        col2Title: 'Observation mulig',
        col2Text: 'Asymptomatiske ganglier kan blot overvåges, da de i nogen tilfælde forsvinder af sig selv.'
      },
      faq: [
        { q: 'Er ganglion farligt?', a: 'Nej, ganglion er en godartet tilstand og aldrig kræft. Det er dog en god idé at få det vurderet af en specialist, så diagnosen er sikker og eventuelle symptomer kan behandles.' },
        { q: 'Kan ganglion forsvinde af sig selv?', a: 'Ja, det kan det. En del ganglier forsvinder spontant over måneder til år. Det er en acceptabel strategi ved asymptomatiske ganglier. Er der smerter eller funktionspåvirkning, er aktiv behandling at foretrække.' },
        { q: 'Virker det at slå på ganglionet med en bog?', a: 'Det er en gammel folkemetode, som ikke anbefales. Selv om det i nogen tilfælde kan sprænge cysten og midlertidigt reducere den, er risikoen for skade på omliggende strukturer til stede, og tilbagefaldet er hyppigt. Vi anbefaler professionel behandling frem for selvbehandling.' },
        { q: 'Er operationen farlig?', a: 'Kirurgisk fjernelse er et veletableret og relativt enkelt indgreb. Risici inkluderer infektion, arvæv, stivhed og i sjældne tilfælde skade på nærliggende nerver. Ved erfarne håndkirurger er komplikationsraten lav.' },
        { q: 'Kan ganglionet komme igen efter operation?', a: 'Tilbagefald kan ske, men er langt sjældnere ved operation end ved aspiration. Vi informerer dig grundigt om forventningerne inden behandlingen.' }
      ]
    },
    {
      name: 'Dupuytrens kontraktur',
      slug: 'dupuytrens-kontraktur',
      category: 'haand',
      title: 'Behandling af Dupuytrens kontraktur',
      h2Title: 'Stræk fingrene igen med effektiv behandling',
      shortIntro: 'Dupuytrens kontraktur giver strammende strenge i håndfladen, der gradvist bøjer fingrene indad. Vi tilbyder vurdering og behandling af denne arvelige bindevævssygdom.',
      narrative: 'Dupuytrens kontraktur er en tilstand, hvor bindevævet i håndfladen, den palmare fascie, gradvist tykner og danner strenge, der trækker en eller flere fingre ind i bøjet stilling. Typisk rammes ringfingeren og lillefingeren, men alle fingre kan påvirkes. Over tid kan bøjningen blive så udtalt, at det er umuligt at strække fingeren og lægge hånden fladt ned mod en flade.\n\nSygdommen er hyppigere hos mænd, hos nordeuropæere og hos personer med en familiehistorie med tilstanden. Arvelig disponering er den største risikofaktor, men tilstanden ses også hyppigere ved diabetes, epilepsi, alkoholoverforbrug og rygning. Den debuterer typisk efter 50-årsalderen og progredierer langsomt.\n\nI de tidlige stadier ses kun fortykkede knuder i håndfladen. Mange patienter opdager tilstanden, fordi de mærker faste, smertefrie knuder i håndfladen. Smerter er ikke et fremtrædende træk. Funktionspåvirkning opstår, efterhånden som bøjningen tiltar.\n\nVi vurderer stadiet af kontrakturen ud fra bøjningsgraden. Behandling er indiceret, når kontrakturen begynder at påvirke funktionen.\n\nOperativ behandling er standardbehandling og indebærer, at de syge strenge i hånden deles og fjernes under lokal bedøvelse. Det giver den bedste langsigtede effekt. Hos udvalgte patienter kan enzymatisk behandling med kollagenase overvejes, hvor enzymet injiceres i strengen og opløser den. Restitution inkluderer håndtræning og skinnebehandling for at optimere resultatet.',
      extraInfo: {
        col1Title: 'Arvelig disposition',
        col1Text: 'Tilstanden er hyppig i Skandinavien og løber i familier. Tidlig vurdering kan forebygge svær kontraktur.',
        col2Title: 'Operation hjælper',
        col2Text: 'Kirurgisk behandling giver langvarig bedring og genopretter håndens funktion.'
      },
      faq: [
        { q: 'Gør Dupuytrens kontraktur ondt?', a: 'Selve kontrakturen giver typisk ikke smerter. Mange patienter opdager den ved at mærke hårde knuder i håndfladen eller ved, at fingeren gradvist bliver sværere at strække. Lejlighedsvis kan der være ubehag, men smerte er ikke det primære symptom.' },
        { q: 'Hvornår bør jeg have behandling?', a: 'Vi anbefaler behandling, når kontrakturen påvirker funktionen. En tommelfingerregel er, at et fingerbøjningsunderskud på mere end 30 grader i grundleddet er indikation for behandling. Jo tidligere behandling sættes ind, desto enklere er indgrebet og bedre er resultaterne.' },
        { q: 'Kan strækøvelser hjælpe?', a: 'Stræk og tøjning kan ikke vende eller stoppe progression af Dupuytrens kontraktur. Bindevævsformationen er ikke reversibel ved øvelser. Fysioterapi kan supplere behandling og er vigtig efter operation, men er ikke kurativt alene.' },
        { q: 'Hvad er forskellen på operation og enzyminjektion?', a: 'Operation er den mest grundige behandling med lavest recidivrate. Enzyminjektion er et mindre invasivt alternativ, der kan egne sig til udvalgte patienter med enkeltstående strenge. Recidivraten er noget højere end ved operation. Vi drøfter mulighederne med dig.' },
        { q: 'Kan Dupuytrens kontraktur komme igen?', a: 'Tilbagefald kan forekomme, da sygdomsdispositionen er til stede i bindevævet. Ny behandling kan tilbydes ved tilbagefald. Regelmæssig kontrol hjælper med at opdage nye strenge tidligt.' }
      ]
    },
    {
      name: 'Godartede tumorer i hånd og fingre',
      slug: 'godartede-tumorer-haand',
      category: 'haand',
      title: 'Fjernelse af godartede tumorer i hånd og fingre',
      h2Title: 'Sikker vurdering og fjernelse af knuder og svulster i hånden',
      shortIntro: 'Godartede tumorer i hånd og fingre er hyppige og dækker alt fra enkle cyster til fedtknuder og fortykkede nervevæv. Vi tilbyder en præcis vurdering og sikker fjernelse.',
      narrative: 'Knuder og svulster i hånden er et hyppigt fund og giver naturligt anledning til bekymring. Langt størstedelen er godartede og ikke farlige. Men det er vigtigt at få dem undersøgt af en specialist, der kan fastlægge diagnosen og rådgive om behandling.\n\nDen hyppigste godartede tumor i hånden er ganglionet, der behandles separat. Ud over ganglion er de hyppigste typer lipomer, fedtvævssvulster, der sidder blødt og bevægeligt under huden. Glomustumorer er sjældne, men karakteristiske svulster, der sidder under neglen og giver intens trykømhed og kuldefølsomhed. Inklusionskyster opstår typisk efter en lille hudlæsion og indeholder keratin.\n\nI nerveforsyningen kan godartede tumorer som neurilemmomer opstå og give smerter eller neurologiske symptomer, afhængigt af hvilken nerve der er involveret. Netop fordi symptombilledet kan variere, er en grundig klinisk vurdering vigtig.\n\nVores tilgang starter med en grundig klinisk undersøgelse. Ultralydsscanning og MR-skanning kan bruges til at karakterisere svulsten, inden beslutning om behandling træffes. De fleste godartede tumorer i hånden behandles ved kirurgisk fjernelse under lokal bedøvelse. Operationen er relativt kortvarig, og komplikationsrisikoen er lav ved erfarne kirurger.\n\nVi sørger for en klar og tryg kommunikation om fund og diagnose og sikrer, at du forstår, hvad vi finder, og hvad den bedste behandlingsplan er for netop dig.',
      extraInfo: {
        col1Title: 'Næsten altid godartet',
        col1Text: 'Langt de fleste knuder i hånden er godartede. En vurdering afklarer diagnosen og giver dig ro i sindet.',
        col2Title: 'Sikker fjernelse',
        col2Text: 'Godartede tumorer kan fjernes sikkert i lokal bedøvelse med lav komplikationsrisiko.'
      },
      faq: [
        { q: 'Kan en knude i hånden være kræft?', a: 'Ondartede tumorer i hånden er sjældne, men de forekommer. Netop derfor er det vigtigt at få alle nye og voksende knuder vurderet af en specialist. De fleste viser sig at være godartede, men sikkerheden for dig som patient kræver, at vi undersøger det.' },
        { q: 'Hvad er en glomustumor?', a: 'En glomustumor er en lille, godartet svulst, der opstår fra de specielle glomuslegemer, der regulerer blodforsyningen til huden. Den sidder hyppigt under fingerneglene og giver intens ømhed ved let tryk og stærk kuldeoverfølsomhed. Fjernelse giver typisk fuldstændig symptomlindring.' },
        { q: 'Skal alle godartede tumorer fjernes?', a: 'Ikke nødvendigvis. Asymptomatiske og sikre godartede tumorer kan observeres. Behandling anbefales, hvis der er smerter, funktionspåvirkning, usikkerhed om diagnosen, eller hvis svulsten vokser. Vi rådgiver dig ud fra din specifikke situation.' },
        { q: 'Hvad sker der med det fjernede væv?', a: 'Alt fjernet væv sendes til patologisk undersøgelse, hvor en speciallæge undersøger det under mikroskop og bekræfter diagnosen. Det er standard procedure og giver dig den endelige sikkerhed for, hvad vi har fjernet.' },
        { q: 'Er heling efter operation lang?', a: 'Det afhænger af indgrebets omfang og placeringen. Mange patienter kan bruge fingre og hånd relativt hurtigt efter operationen. Heling af snittet tager typisk to til tre uger. Vi guider dig om begrænsninger og genoptræning undervejs.' }
      ]
    }
  ]
  };

  const staff = [
    {
      name: 'Jalal Taha Saadi',
      image: '/Jalal%20Taha%20Saadi.png',
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
      image: '/Ricardo%20Sanchez.png',
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
            <h1 className="text-3xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight uppercase italic tracking-tighter">{service.title}</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light border-l-8 border-emerald-700 pl-8 italic">
              {service.shortIntro}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`px-10 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl hover:-translate-y-1 transition-all inline-flex items-center ${colors.accent}`}>
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
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center shadow-inner">
                    {service.category === 'hud'
                      ? <span className="text-blue-900 font-black text-2xl uppercase italic">KA</span>
                      : service.category === 'haand'
                      ? <span className="text-blue-900 font-black text-2xl uppercase italic">HK</span>
                      : <img src="/Jalal%20Taha%20Saadi.png" alt="Jalal Taha Saadi" className="w-full h-full object-cover object-top" />
                    }
                  </div>
                  <div>
                    <p className="font-black text-xl leading-none uppercase italic text-slate-900">{service.category === 'hud' ? 'Kawa Ajgeiy' : service.category === 'haand' ? 'Klinik Sirius' : 'Jalal Taha Saadi'}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">{service.category === 'hud' ? 'Speciallæge i hudsygdomme' : service.category === 'haand' ? 'Speciallæge i håndkirurgi' : 'Speciallæge i ØNH'}</p>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center text-sm font-bold text-slate-700 uppercase tracking-tight italic">
                    <CheckCircle size={18} className="text-emerald-500 mr-4" /> {service.category === 'hud' ? 'OUH og Aarhus Universitetshospital' : service.category === 'haand' ? 'Specialiseret håndkirurgisk klinik' : 'SVS Esbjerg og OUH'}
                  </div>
                  <div className="flex items-center text-sm font-bold text-slate-700 uppercase tracking-tight italic">
                    <CheckCircle size={18} className="text-emerald-500 mr-4" /> {service.category === 'hud' ? 'Dansk Dermatologisk Selskab' : service.category === 'haand' ? 'Lokal bedøvelse – hurtig heling' : 'Dansk Rhinologisk Selskab'}
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-2xl font-black mb-4 uppercase tracking-tight italic">Book tid nu</h4>
                  <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium italic">Få en specialistvurdering hurtigt uden unødig ventetid.</p>
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
            <NavItemComponent title="Hudsygdomme" items={services.hud} id="hud" />
            <NavItemComponent title="ØNH Undersøgelser" items={services.onhUndersogelser} id="onhU" />
            <NavItemComponent title="ØNH Operationer" items={services.onhOperationer} id="onhO" />
            <NavItemComponent title="Håndkirurgi" items={services.haandkirurgi} id="haand" />
            <button onClick={() => setActivePage('personale')} className={`font-black text-xs transition-colors uppercase tracking-tight ${activePage === 'personale' ? 'text-blue-900' : 'text-slate-500 hover:text-blue-900'}`}>Personale</button>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`hidden sm:flex items-center px-6 py-3 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 ${colors.accent}`}>
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

            {/* ØNH Undersøgelser accordion */}
            <div>
              <button
                onClick={() => setIsServicesOpen(isServicesOpen === 'onhU' ? null : 'onhU')}
                className="w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>ØNH Undersøgelser</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isServicesOpen === 'onhU' ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen === 'onhU' && (
                <div className="ml-4 mb-2 border-l-2 border-emerald-100 pl-4 space-y-1">
                  {services.onhUndersogelser.map(s => (
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

            {/* ØNH Operationer accordion */}
            <div>
              <button
                onClick={() => setIsServicesOpen(isServicesOpen === 'onhO' ? null : 'onhO')}
                className="w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>ØNH Operationer</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isServicesOpen === 'onhO' ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen === 'onhO' && (
                <div className="ml-4 mb-2 border-l-2 border-emerald-100 pl-4 space-y-1">
                  {services.onhOperationer.map(s => (
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
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.05] tracking-tight uppercase italic">
                    Speciallæger <br />
                    <span className="text-blue-900">tæt på dig i Varde.</span>
                  </h1>
                  <div className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-light mx-auto lg:mx-0 italic border-l-8 border-emerald-500 pl-8">
                    <p className="mb-4 text-slate-700 font-bold">Klinik Sirius er stiftet med en vision om at gøre specialistbehandling tilgængelig og tryg. Vi forener årtiers erfaring med en moderne patientfokuseret tilgang.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 justify-center lg:justify-start font-black uppercase tracking-widest text-[10px]">
                    <a href="https://patientportal.egclinea.com/?id=838" target="_blank" rel="noopener noreferrer" className={`px-10 py-5 rounded-[2rem] text-white font-bold shadow-xl hover:-translate-y-1 transition-all active:scale-95 inline-block text-center ${colors.accent}`}>
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
                  <div className="w-full h-[650px] rounded-[3rem] shadow-2xl relative overflow-hidden group border-8 border-white">
                    <img src="/klinik-sirius-hero.webp" alt="Klinik Sirius, Speciallæger i Varde" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-6 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-50 max-w-xs">
                    <div className="flex items-center space-x-4 mb-3">
                      <Award size={24} className="text-emerald-700" />
                      <span className="font-extrabold text-blue-900 uppercase tracking-widest text-[12px] italic">Erfarne speciallæger</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium italic leading-relaxed">Vores speciallæger har mange års erfaring og sikrer dig faglig kompetent behandling.</p>
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
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light italic">Speciallæge Kawa Ajgeiy varetager udredning og behandling af eksem, nældefeber, psoriasis og modermærker. Han er uddannet ved OUH og Aarhus Universitetshospital og er ansat ved Hudafdeling og Allergicentret på OUH.</p>
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
        {[...services.hud, ...services.onhUndersogelser, ...services.onhOperationer].some(s => s.slug === activePage) && (
          <ServiceLandingPage service={[...services.hud, ...services.onhUndersogelser, ...services.onhOperationer].find(s => s.slug === activePage)} />
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
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-blue-900 mb-8 uppercase tracking-tight lg:tracking-tighter italic">Patientinformation</h1>
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
