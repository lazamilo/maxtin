// Maxtin Plus redesign: static site generator. Run: node build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'site');
mkdirSync(ROOT, { recursive: true });

const V = Date.now().toString(36);
const P = (n) => `assets/photo/${n}.jpg`;

/* ---------------------------------------------------------------- data */
const services = [
  {
    slug: 'priklop-tekoci-trakovi', n: '01', title: 'Priklop inštalacije na tekočih trakovih', short: 'Tekoči trakovi',
    lead: 'Izvedba električnega in krmilnega priklopa tekočih trakov za varno in zanesljivo delovanje sistema.',
    img: 'wolmirstedt-1', imgs: ['wolmirstedt-2', 'leingarten-2'],
    body: [
      'Izvajamo strokoven priklop elektro inštalacij na tekočih trakovih za industrijske, logistične in proizvodne sisteme. Storitev je namenjena podjetjem, kjer so zanesljivost, varnost in skladnost s tehničnimi standardi ključni za neprekinjeno delovanje transportnih linij.',
      'Dela izvajamo v skladu z veljavnimi elektro predpisi, tehničnimi smernicami proizvajalcev opreme in industrijskimi varnostnimi zahtevami.',
    ],
    list: ['Napajanje pogonov in motorjev', 'Priklop krmilnih in nadzornih sistemov', 'Kabelske trase in police vzdolž linije', 'Meritve in preizkus pred zagonom'],
  },
  {
    slug: 'sestava-elektro-omaric', n: '02', title: 'Sestava elektro omaric', short: 'Elektro omarice',
    lead: 'Strokovna izdelava in ožičenje elektro omaric za zanesljivo delovanje električnih sistemov.',
    img: 'koeln-3', imgs: ['leingarten-3', 'neustadt-cover'],
    body: [
      'Izvajamo sestavo elektro omaric za industrijske, poslovne in stanovanjske objekte. Elektro omarice sestavljamo po projektni dokumentaciji ali na podlagi zahtev naročnika, z upoštevanjem vseh tehničnih, varnostnih in funkcionalnih zahtev.',
      'Kakovostno sestavljena elektro omarica je ključna za varno razdeljevanje električne energije, zanesljivo delovanje porabnikov in enostavno vzdrževanje sistema.',
    ],
    list: ['Sestava po projektni dokumentaciji', 'Ožičenje in označevanje vodnikov', 'Vgradnja zaščitnih in krmilnih elementov', 'Pregled in preizkus pred predajo'],
  },
  {
    slug: 'elektro-dela-v-tunelih', n: '03', title: 'Elektro inštalacijska dela v tunelih', short: 'Dela v tunelih',
    lead: 'Razsvetljava, napajanje, prezračevanje in varnostni sistemi za varno in zanesljivo obratovanje.',
    img: 'weissenburg-3', imgs: ['neustadt-3', 'wien-2'],
    body: [
      'Izvajamo elektro inštalacijska dela v tunelih za cestno, železniško in industrijsko infrastrukturo. Dela so namenjena projektom, kjer so visoki varnostni standardi, zanesljivost delovanja in odpornost sistemov ključni za varno uporabo objekta.',
      'Elektro inštalacije v tunelih izvajamo skladno z veljavnimi tehničnimi predpisi, projektnimi zahtevami in smernicami za prometno ter varnostno infrastrukturo. Inštalacije so izvedene mehansko zaščiteno, odporne na vlago, vibracije in agresivne okoliške vplive, ki so značilni za tunelske objekte.',
    ],
    list: ['Napeljava napajalnih in signalnih kablov', 'Montaža kabelskih polic in zaščitnih cevi', 'Vgradnja razsvetljave in orientacijskih sistemov', 'Priklop energetskih, krmilnih in nadzornih sistemov', 'Izvedba ozemljitve in izenačitve potencialov'],
  },
  {
    slug: 'hisna-instalacija', n: '04', title: 'Hišna inštalacija', short: 'Hišna inštalacija',
    lead: 'Celovita izvedba električnih napeljav v stanovanjskih objektih za varno in nemoteno uporabo električne energije.',
    img: 'storitve-3', imgs: ['koeln-2', 'koeln-1'],
    body: [
      'Izvajamo hišne elektro inštalacije v stanovanjskih hišah, večstanovanjskih objektih in poslovnih prostorih. Dela obsegajo novogradnje, prenove in nadgradnje obstoječih sistemov, pri čemer zagotavljamo varno, pregledno in tehnično pravilno izvedbo.',
      'Vse elektro inštalacije izvajamo skladno z veljavnimi predpisi za nizkonapetostne sisteme ter v skladu z dobrimi praksami elektro stroke.',
    ],
    tabs: [
      { t: 'Novogradnja', h: 'Elektro inštalacije pri novogradnjah', p: 'Pri novogradnjah izvajamo celovite elektro inštalacije od začetnega načrtovanja do končnega priklopa.', list: ['Izvedba elektro inštalacij po projektni dokumentaciji', 'Napeljava tokokrogov za razsvetljavo, vtičnice in fiksne porabnike', 'Montaža razdelilnih omar in zaščitnih elementov', 'Izvedba ozemljitve in izenačitve potencialov'], end: 'Inštalacije so zasnovane pregledno in prilagodljivo, z upoštevanjem dolgoročne uporabe objekta.', img: 'storitve-3' },
      { t: 'Prenova in adaptacija', h: 'Prenova in adaptacija elektro inštalacij', p: 'Pri prenovah in adaptacijah obstoječih objektov izvedemo:', list: ['Pregled obstoječe inštalacije', 'Delno ali popolno zamenjavo elektro inštalacij', 'Prilagoditev razporeditve vtičnic, stikal in razsvetljave', 'Uskladitev inštalacij z aktualnimi varnostnimi zahtevami'], end: 'Posebno pozornost namenjamo minimalnim posegom v konstrukcijo objekta ter usklajevanju del z ostalimi izvajalci pri adaptacijah.', img: 'koeln-1' },
      { t: 'Modernizacija in optimizacija', h: 'Modernizacija in optimizacija elektro inštalacij', p: 'Modernizacija obstoječih elektro inštalacij je namenjena izboljšanju varnosti, zanesljivosti in funkcionalnosti. Pogosto vključuje:', list: ['Zamenjavo zastarelih vodnikov in varoval', 'Nadgradnjo razdelilnih omar', 'Vgradnjo sodobnih zaščitnih elementov', 'Prilagoditev inštalacij povečanim obremenitvam sodobnih porabnikov'], end: 'Optimizacija sistema omogoča boljšo razporeditev tokokrogov, manj izpadov in večjo pripravljenost objekta na prihodnje nadgradnje.', img: 'storitve-2' },
    ],
  },
  {
    slug: 'industrijska-instalacija', n: '05', title: 'Industrijska inštalacija', short: 'Industrijska inštalacija',
    lead: 'Izvedba industrijskih električnih napeljav za zanesljivo in varno delovanje obratov.',
    img: 'refinery-1', imgs: ['weissenburg-1', 'heidenheim-2'],
    body: [
      'Izvajamo industrijske elektro inštalacije za proizvodne obrate, skladišča, logistične centre in tehnološke objekte. Storitve so namenjene podjetjem, kjer sta zanesljivo napajanje in varno obratovanje strojev ključna za neprekinjen proizvodni proces.',
      'Elektro inštalacije izvajamo skladno z veljavnimi predpisi za nizkonapetostne sisteme, tehničnimi smernicami proizvajalcev opreme in zahtevami industrijskega okolja.',
    ],
    list: ['Razvod električne energije', 'Napajanje strojev in proizvodnih linij', 'Krmilni sistemi in komunikacijske povezave', 'Integracija z avtomatizacijo', 'Meritve in testiranje pred zagonom'],
  },
];

const projects = [
  { slug: 'koeln', city: 'Köln', country: 'Nemčija', img: 'koeln-2', gal: ['koeln-1', 'koeln-2', 'koeln-3', 'koeln-cover'] },
  { slug: 'wien', city: 'Wien', country: 'Avstrija', img: 'wien-1', gal: ['wien-1', 'wien-2', 'wien-3', 'wien-cover'] },
  { slug: 'leingarten', city: 'Leingarten', country: 'Nemčija', img: 'leingarten-1', gal: ['leingarten-1', 'leingarten-2', 'leingarten-3', 'leingarten-cover'] },
  { slug: 'wiener-neustadt', city: 'Wiener Neustadt', country: 'Avstrija', img: 'neustadt-2', gal: ['neustadt-2', 'neustadt-1', 'neustadt-3', 'neustadt-cover'] },
  { slug: 'st-ingbert', city: 'St. Ingbert', country: 'Nemčija', img: 'ingbert-2', gal: ['ingbert-2', 'ingbert-1', 'ingbert-3', 'ingbert-cover'] },
  { slug: 'weissenburg', city: 'Weissenburg', country: 'Nemčija', img: 'weissenburg-1', gal: ['weissenburg-1', 'weissenburg-2', 'weissenburg-3', 'weissenburg-cover'] },
  { slug: 'heidenheim', city: 'Heidenheim', country: 'Nemčija', img: 'heidenheim-1', gal: ['heidenheim-1', 'heidenheim-2', 'heidenheim-3', 'heidenheim-cover'] },
  { slug: 'wolmirstedt', city: 'Wolmirstedt', country: 'Nemčija', img: 'wolmirstedt-2', gal: ['wolmirstedt-2', 'wolmirstedt-1', 'wolmirstedt-3', 'wolmirstedt-cover'] },
];

const team = [
  { id: 'martin', name: 'Martin Sedlašek', role: 'Direktor in lastnik', bio: 'Ustanovitelj, direktor in lastnik podjetja. S svojo vizijo, dolgoletnimi izkušnjami na področju elektroinštalacij ter podjetniškim pristopom vodi razvoj podjetja.' },
  { id: 'mateja', name: 'Mateja Sedlašek', role: 'CFO in COO', bio: 'Skrbi za finančno stabilnost in operativno učinkovitost podjetja ter koordinacijo med oddelki.' },
  { id: 'polona', name: 'Polona Murko', role: 'Vodja pisarne', bio: 'Skrbi za organizacijo administrativnih procesov, usklajevanje dokumentacije ter nemoten potek vsakodnevnega dela.' },
  { id: 'selin', name: 'Selin Sever', role: 'Sales and Marketing Manager', bio: 'Skrbi za marketing, komunikacijo in digitalno prisotnost podjetja.' },
  { id: 'iris', name: 'Iris Laura', role: 'Asistentka poslovodstva', bio: 'Nudi podporo vodstvu pri organizaciji nalog, komunikaciji in koordinaciji projektov.' },
  { id: 'dejan', name: 'Dejan Kodrič', role: 'Key Accounts', bio: 'Gradi dolgoročne poslovne odnose s ključnimi strankami in spremlja potek projektov.' },
];

const news = [
  { slug: 'srce-podjetja-maxtin-plus', title: 'Srce podjetja MAXTIN PLUS', img: 'news-srce', date: 'Maj 2026', excerpt: 'Pisarniška ekipa, ki skrbi za organizacijo projektov, komunikacijo s partnerji, finance in razvoj podjetja.' },
  { slug: 'industrijske-elektroinstalacije', title: 'Industrijske elektroinštalacije', img: 'refinery-1', date: 'Marec 2026', excerpt: 'Zakaj so zanesljive elektroinštalacije temelj vsakega sodobnega industrijskega sistema.' },
  { slug: 'nagradna-igra', title: 'Praznujemo 10 let: velika nagradna igra', img: 'news-igra', date: 'Junij 2026', excerpt: 'Makita set, Benning Duspol tester in set izvijačev Wera. Sodelujte na naši Facebook strani.' },
];

const perks = ['Prevoz iz Slovenije in dnevni prevozi na gradbišče', 'Urejeno brezplačno stanovanje v bližini gradbišča', 'Pokojninsko in zdravstveno zavarovanje', 'Uredimo delovno dovoljenje in vizo', 'Parkirišče za vaše vozilo ob podjetju', 'Plača odvisna od znanja in efektive', 'Delo v dobri in prijetni ekipi', 'Orodje, obleka in obutev', 'Nezgodno zavarovanje', 'Možnost napredovanja', 'Redno plačilo in regres', 'Zagotovljen dopust'];

const faq = [
  ['Kako poteka sodelovanje z vašim podjetjem?', 'Sodelovanje se začne z razumevanjem potreb naročnika in analizo projekta. Na podlagi tega pripravimo načrt izvedbe, določimo časovnico ter zagotovimo strokovno in natančno izvedbo elektroinštalacij.'],
  ['Zakaj izbrati podjetje MAXTIN PLUS?', 'Ker delujemo na podlagi vrednot strokovnosti, natančnosti in zanesljivosti. Naši naročniki nam zaupajo, ker vedno poskrbimo za kakovostno, varno in profesionalno izvedbo projektov.'],
  ['S kakšnimi podjetji sodelujete?', 'Sodelujemo z gradbenimi podjetji, industrijskimi partnerji, investitorji ter drugimi izvajalci iz tujine, ki potrebujejo zanesljivo izvedbo elektroinštalacij na različnih projektih.'],
  ['Ali izvajate projekte kot podizvajalec?', 'Da. Pogosto sodelujemo kot podizvajalec pri večjih projektih, kjer s strokovno ekipo zagotavljamo kakovostno in pravočasno izvedbo elektroinštalacijskih del.'],
  ['Kako zagotavljate zanesljivost svojih storitev?', 'Naše delo temelji na strokovnem znanju, dolgoletnih izkušnjah in natančni izvedbi. Vsak projekt izvajamo v skladu z veljavnimi standardi in tehničnimi zahtevami. Držimo se TÜV standardov.'],
  ['Ali zagotavljate garancijo na izvedena dela?', 'Da. Za izvedena elektroinštalacijska dela zagotavljamo garancijo, ki potrjuje kakovost, varnost in zanesljivost naših rešitev.'],
];

/* ------------------------------------------------------------ partials */
const arrow = `<svg class="ar" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const header = (active) => `
<a class="skip" href="#main">Preskoči na vsebino</a>
<header class="nav" data-nav>
  <a class="nav__logo" href="index.html" aria-label="Maxtin Plus, domov"><img src="assets/logo/logo.svg" alt="Maxtin Plus" width="181" height="56"></a>
  <nav class="nav__links" aria-label="Glavna navigacija">
    <div class="nav__item nav__item--mega">
      <a href="storitve.html" class="${active === 'storitve' ? 'is-active' : ''}" aria-haspopup="true">Storitve</a>
      <div class="mega" role="menu">
        <div class="mega__inner">
          <div class="mega__list">
            ${services.map(s => `<a class="mega__link" href="storitev-${s.slug}.html" data-img="${P(s.img)}"><span class="mega__n">${s.n}</span><span>${s.title}</span>${arrow}</a>`).join('')}
            <div class="mega__sub">
              <a href="storitev-hisna-instalacija.html#novogradnja">Novogradnja</a>
              <a href="storitev-hisna-instalacija.html#prenova">Prenova in adaptacija</a>
              <a href="storitev-hisna-instalacija.html#modernizacija">Modernizacija in optimizacija</a>
            </div>
          </div>
          <div class="mega__media"><img src="${P(services[0].img)}" alt="" data-mega-img></div>
        </div>
      </div>
    </div>
    <a href="projekti.html" class="${active === 'projekti' ? 'is-active' : ''}">Projekti</a>
    <a href="o-nas.html" class="${active === 'onas' ? 'is-active' : ''}">O nas</a>
    <a href="zaposlitve.html" class="${active === 'zaposlitve' ? 'is-active' : ''}">Zaposlitve</a>
    <a href="novice.html" class="${active === 'novice' ? 'is-active' : ''}">Novice</a>
  </nav>
  <div class="nav__end">
    <div class="lang"><a class="is-on" href="index.html">SL</a><a href="https://www.maxtin.eu/de/">DE</a></div>
    <a class="btn btn--accent nav__cta" href="o-nas.html#kontakt">Pišite nam</a>
    <button class="burger" aria-label="Odpri meni" aria-expanded="false" data-burger><span></span><span></span></button>
  </div>
</header>
<div class="drawer" data-drawer>
  <nav>
    <a href="storitve.html">Storitve</a>
    <a href="projekti.html">Projekti</a>
    <a href="o-nas.html">O nas</a>
    <a href="zaposlitve.html">Zaposlitve</a>
    <a href="novice.html">Novice</a>
  </nav>
  <div class="drawer__foot"><a href="tel:+38670655116">+386 70 655 116</a><a href="mailto:office@maxtin.eu">office@maxtin.eu</a></div>
</div>`;

const cta = () => `
<section class="cta" data-theme="dark">
  <div class="cta__media"><img src="${P('heidenheim-3')}" alt="" loading="lazy" data-parallax></div>
  <div class="cta__inner">
    <h2 class="cta__title" data-split>Potrebujete zanesljivega partnerja pri elektro delih?</h2>
    <div class="cta__row">
      <a class="cta__big" href="mailto:office@maxtin.eu">office@maxtin.eu</a>
      <a class="cta__big" href="tel:+38670655116">+386 70 655 116</a>
    </div>
    <a class="btn btn--accent btn--lg" href="o-nas.html#kontakt">Spoznajmo se ${arrow}</a>
  </div>
</section>`;

const footer = () => `
<footer class="foot" data-theme="dark">
  <div class="foot__top">
    <img class="foot__logo" src="assets/logo/logo.svg" alt="Maxtin Group" width="181" height="56" loading="lazy">
    <div class="foot__cols">
      <div><h3>Storitve</h3>${services.map(s => `<a href="storitev-${s.slug}.html">${s.short}</a>`).join('')}</div>
      <div><h3>Podjetje</h3><a href="o-nas.html">O nas</a><a href="projekti.html">Projekti</a><a href="zaposlitve.html">Zaposlitve</a><a href="novice.html">Novice</a></div>
      <div><h3>Kontakt</h3><a href="tel:+38670655116">+386 70 655 116</a><a href="mailto:office@maxtin.eu">office@maxtin.eu</a><p>Njiverce vas 6<br>2325 Kidričevo, Slovenija</p></div>
    </div>
  </div>
  <div class="foot__word" aria-hidden="true">MAXTIN GROUP</div>
  <div class="foot__bottom">
    <span>© 2026 MaxTin Plus d.o.o.</span>
    <span><a href="https://www.maxtin.eu/politika-zasebnosti/">Politika zasebnosti</a><a href="https://www.maxtin.eu/splosni-pogoji/">Splošni pogoji</a></span>
  </div>
</footer>`;

const page = ({ title, desc, active, body, bodyClass = '' }) => `<!doctype html>
<html lang="sl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex">
<link rel="icon" href="assets/img/cropped-1.png">
<link rel="preload" href="assets/fonts/CabinetGrotesk-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/fonts/fonts.css">
<link rel="stylesheet" href="assets/style.css?v=${V}">
<script>
(function () {
  if (!/[?&]r=/.test(location.search)) return;
  var s = document.createElement('script');
  s.async = true;
  s.referrerPolicy = 'no-referrer';
  s.setAttribute('data-landing', location.href);
  s.src = 'https://phplaravel-758037-6569212.cloudwaysapps.com/v/script.js';
  document.head.appendChild(s);
})();
</script>
</head>
<body class="${bodyClass}">
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<script src="assets/vendor/gsap.min.js"></script>
<script src="assets/vendor/ScrollTrigger.min.js"></script>
<script src="assets/vendor/lenis.min.js"></script>
<script src="assets/main.js?v=${V}"></script>
</body>
</html>`;

const pageHero = ({ title, lead, img, crumbs }) => `
<section class="phero" data-theme="dark">
  <div class="phero__media"><img src="${P(img)}" alt="" data-parallax></div>
  <div class="phero__inner">
    <nav class="crumbs" aria-label="Drobtine"><a href="index.html">Domov</a>${crumbs.map(c => c[1] ? `<a href="${c[1]}">${c[0]}</a>` : `<span>${c[0]}</span>`).join('')}</nav>
    <h1 class="phero__title" data-split>${title}</h1>
    ${lead ? `<p class="phero__lead" data-reveal>${lead}</p>` : ''}
  </div>
</section>`;

const statsBlock = () => `
<section class="stats" data-theme="dark">
  <svg class="stats__cables" viewBox="0 0 1600 600" preserveAspectRatio="none" aria-hidden="true">
    <path d="M-20 520 C 300 520, 360 140, 700 140 S 1200 420, 1620 300" />
    <path d="M-20 560 C 320 560, 400 190, 720 190 S 1220 470, 1620 350" />
    <path d="M-20 600 C 340 600, 440 240, 740 240 S 1240 520, 1620 400" />
  </svg>
  <h2 class="stats__title" data-split>Prednosti, ki nas ločujejo od konkurence</h2>
  <div class="stats__grid">
    <div class="stat"><span class="stat__n" data-count="47">0</span><span class="stat__plus">+</span><p>Uspešno zaključenih projektov</p></div>
    <div class="stat"><span class="stat__n" data-count="83">0</span><span class="stat__plus">+</span><p>Zaposlenih</p></div>
    <div class="stat"><span class="stat__n" data-count="20">0</span><span class="stat__plus">+</span><p>Nemško govorečih sodelavcev</p></div>
    <div class="stat"><span class="stat__n" data-count="10">0</span><span class="stat__plus">+</span><p>Dolgoročnih naročnikov</p></div>
  </div>
</section>`;

const newsCards = (list = news) => `
<div class="news__grid">
  ${list.map(n => `
  <a class="ncard" href="novica-${n.slug}.html" data-reveal>
    <div class="ncard__img"><img src="${P(n.img)}" alt="" loading="lazy"></div>
    <span class="ncard__date">${n.date}</span>
    <h3>${n.title}</h3>
    <p>${n.excerpt}</p>
  </a>`).join('')}
</div>`;

/* --------------------------------------------------------------- pages */
const pages = {};

// HOME
const heroSlides = [
  { img: 'weissenburg-1', cap: 'Weissenburg, Nemčija' },
  { img: 'heidenheim-1', cap: 'Heidenheim, Nemčija' },
  { img: 'wolmirstedt-2', cap: 'Wolmirstedt, Nemčija' },
  { img: 'leingarten-1', cap: 'Leingarten, Nemčija' },
];
pages['index.html'] = page({
  title: 'Maxtin Group · Elektroinštalacije, na katere se lahko zanesete',
  desc: 'Industrijske, hišne in tunelske elektroinštalacije, sestava elektro omaric in priklopi tekočih trakov. Od leta 2016.',
  active: 'home', bodyClass: 'home',
  body: `
<div class="loader" data-loader aria-hidden="true">
  <div class="loader__line"></div>
  <img src="assets/logo/logo.svg" alt="">
</div>
<section class="hero" data-theme="dark">
  <div class="hero__slides">
    ${heroSlides.map((s, i) => `<figure class="hero__slide${i === 0 ? ' is-on' : ''}"><img src="${P(s.img)}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}><figcaption>${s.cap}</figcaption></figure>`).join('')}
  </div>
  <div class="hero__inner">
    <h1 class="hero__title" data-hero-title><span>Električarji,</span> <span>na katere se</span> <span>zanašajo resna</span> <span>podjetja.</span></h1>
    <div class="hero__side">
      <p>Zahtevne inštalacije in kratki roki. Vedno dostavimo natančno, z izkušnjami in predanostjo.</p>
      <div class="hero__btns">
        <a class="btn btn--accent btn--lg" href="storitve.html">Oglejte si storitve ${arrow}</a>
        <a class="btn btn--ghost btn--lg" href="o-nas.html#kontakt">Pišite nam</a>
      </div>
    </div>
  </div>
  <div class="hero__bar">
    <div class="hero__progress">${heroSlides.map((s, i) => `<button aria-label="${s.cap}" data-slide="${i}" class="${i === 0 ? 'is-on' : ''}"><i></i></button>`).join('')}</div>
    <span class="hero__cap" data-hero-cap>${heroSlides[0].cap}</span>
  </div>
</section>

<section class="intro">
  <p class="intro__text" data-words>
    Od ustanovitve leta 2016 izvajamo elektroinštalacije vseh vrst
    <span class="pill"><img src="${P('ingbert-2')}" alt=""></span>
    od hišnih in poslovnih objektov do industrije, tunelov, elektro omaric in tekočih trakov.
    <span class="pill"><img src="${P('heidenheim-3')}" alt=""></span>
    Nismo le podizvajalci. <b>Natančnost. Izkušnje. Predanost.</b> Ne prazne besede, ampak vrednote, za katerimi stojimo.
  </p>
  <a class="link-arrow" href="o-nas.html" data-reveal>Spoznajte nas ${arrow}</a>
</section>

<section class="services" data-services>
  <div class="services__head">
    <h2 class="h2" data-split>Kaj lahko storimo za vas?</h2>
    <p data-reveal>Ostajamo zvesti načelom, na katerih je bilo podjetje osnovano leta 2016.</p>
  </div>
  <div class="services__list">
    ${services.map(s => `
    <a class="srow" href="storitev-${s.slug}.html" data-img="${P(s.img)}">
      <span class="srow__n">${s.n}</span>
      <h3 class="srow__t">${s.title}</h3>
      <p class="srow__d">${s.lead}</p>
      <span class="srow__go">${arrow}</span>
      <img class="srow__img" src="${P(s.img)}" alt="" loading="lazy">
    </a>`).join('')}
  </div>
  <div class="services__float" aria-hidden="true" data-float><img alt=""></div>
</section>

<section class="process" data-process>
  <div class="process__media">
    ${['leingarten-3', 'weissenburg-2', 'wolmirstedt-1', 'koeln-3'].map((im, i) => `<img src="${P(im)}" alt="" loading="lazy" class="${i === 0 ? 'is-on' : ''}" data-step-img="${i}">`).join('')}
  </div>
  <div class="process__steps">
    <h2 class="h2" data-split>Vsak projekt obravnavamo kot celoto</h2>
    ${[
      ['Načrtovanje', 'Analiziramo potrebe objekta, vrsto proizvodnje in pričakovane obremenitve ter predvidimo prihodnje nadgradnje.'],
      ['Izvedba', 'Polaganje kablov, montaža elektro omar in povezovanje vseh komponent. Vsak element pravilno nameščen in ustrezno zaščiten.'],
      ['Integracija', 'Povezovanje z avtomatizacijskimi sistemi, ki omogočajo nadzor in upravljanje procesov v realnem času.'],
      ['Testiranje in predaja', 'Meritve in preverjanje delovanja sistema po TÜV standardih. Šele nato je sistem pripravljen za uporabo.'],
    ].map(([t, d], i) => `
    <div class="step" data-step="${i}">
      <span class="step__n">0${i + 1}</span>
      <div><h3>${t}</h3><p>${d}</p></div>
    </div>`).join('')}
  </div>
</section>

${statsBlock()}

<section class="projects" data-hscroll>
  <div class="projects__head">
    <h2 class="h2" data-split>Projekti po Nemčiji in Avstriji</h2>
    <a class="link-arrow" href="projekti.html">Vsi projekti ${arrow}</a>
  </div>
  <div class="projects__track" data-track>
    ${projects.map((p, i) => `
    <a class="pcard" href="projekt-${p.slug}.html">
      <div class="pcard__img"><img src="${P(p.img)}" alt="${p.city}"></div>
      <div class="pcard__meta"><h3>${p.city}</h3><span>${p.country}</span></div>
    </a>`).join('')}
  </div>
</section>

<section class="team">
  <div class="team__head">
    <h2 class="h2" data-split>Ljudje za vsakim projektom</h2>
    <p data-reveal>Vse naše osebje je visoko strokovno usposobljeno ter opremljeno z znanjem in spretnostmi, ki zagotavljajo najboljše možne rezultate.</p>
  </div>
  <div class="team__grid">
    ${team.map(t => `
    <figure class="person" data-reveal>
      <div class="person__img"><img src="assets/team/${t.id}.png" alt="${t.name}" loading="lazy"></div>
      <figcaption><strong>${t.name}</strong><span>${t.role}</span></figcaption>
    </figure>`).join('')}
  </div>
</section>

<section class="careers" data-theme="dark">
  <div class="careers__media"><img src="${P('wolmirstedt-3')}" alt="Ekipa Maxtin Plus na gradbišču" loading="lazy" data-parallax></div>
  <div class="careers__inner">
    <h2 class="careers__title" data-split>Iščemo nove talente.</h2>
    <p data-reveal>Vedno iščemo nove sodelavce, ki si želijo dobrega in dolgoročnega sodelovanja z nami. Trenutno zaposlujemo električarje in vodje električarjev.</p>
    <a class="btn btn--accent btn--lg" href="zaposlitve.html" data-reveal>Prosta delovna mesta ${arrow}</a>
  </div>
  <div class="marquee" aria-hidden="true"><div class="marquee__track">${[...perks, ...perks].map(p => `<span>${p}</span>`).join('')}</div></div>
</section>

<section class="news">
  <div class="news__head">
    <h2 class="h2" data-split>Zadnje novice</h2>
    <a class="link-arrow" href="novice.html">Vse novice ${arrow}</a>
  </div>
  ${newsCards()}
</section>

${cta()}`,
});

// SERVICES overview
pages['storitve.html'] = page({
  title: 'Storitve · Maxtin Group', desc: 'Elektroinštalacije za industrijo, tunele, stanovanja, elektro omarice in tekoče trakove.', active: 'storitve',
  body: `
${pageHero({ title: 'Strokovnjaki v različnih panogah', lead: 'Pet področij, ena ekipa. Od kabelske police do zagona celotne linije.', img: 'weissenburg-1', crumbs: [['Storitve']] })}
<section class="svc-grid">
  ${services.map((s, i) => `
  <a class="svc ${i === 0 || i === 3 ? 'svc--wide' : ''}" href="storitev-${s.slug}.html" data-reveal>
    <div class="svc__img"><img src="${P(s.img)}" alt="" loading="lazy" data-inner-parallax></div>
    <div class="svc__body"><span class="svc__n">${s.n}</span><h2>${s.title}</h2><p>${s.lead}</p><span class="link-arrow">Preberite več ${arrow}</span></div>
  </a>`).join('')}
</section>
${statsBlock()}
${cta()}`,
});

// SERVICE detail pages
services.forEach((s, idx) => {
  const next = services[(idx + 1) % services.length];
  const tabs = s.tabs ? `
<section class="tabs" data-tabs>
  <h2 class="h2" data-split>Kaj vključuje</h2>
  <div class="tabs__bar" role="tablist">
    ${s.tabs.map((t, i) => `<button role="tab" id="${['novogradnja', 'prenova', 'modernizacija'][i]}" aria-selected="${i === 0}" data-tab="${i}">${t.t}</button>`).join('')}
  </div>
  ${s.tabs.map((t, i) => `
  <div class="tabs__panel" role="tabpanel" data-panel="${i}" ${i ? 'hidden' : ''}>
    <div class="tabs__img"><img src="${P(t.img)}" alt="" loading="lazy"></div>
    <div class="tabs__text">
      <h3>${t.h}</h3><p>${t.p}</p>
      <ol class="biglist">${t.list.map(l => `<li>${l}</li>`).join('')}</ol>
      <p class="muted">${t.end}</p>
    </div>
  </div>`).join('')}
</section>` : `
<section class="incl">
  <h2 class="h2" data-split>Kaj vključuje</h2>
  <ol class="biglist biglist--xl">${s.list.map(l => `<li data-reveal>${l}</li>`).join('')}</ol>
</section>`;
  pages[`storitev-${s.slug}.html`] = page({
    title: `${s.title} · Maxtin Group`, desc: s.lead, active: 'storitve',
    body: `
${pageHero({ title: s.title, lead: s.lead, img: s.img, crumbs: [['Storitve', 'storitve.html'], [s.short]] })}
<section class="sintro">
  <p class="sintro__lead" data-words>${s.body[0]}</p>
  <div class="sintro__aside" data-reveal><p>${s.body[1]}</p><a class="btn btn--dark" href="o-nas.html#kontakt">Povpraševanje ${arrow}</a></div>
</section>
<section class="duo">
  ${s.imgs.map(im => `<div class="duo__img"><img src="${P(im)}" alt="" loading="lazy" data-inner-parallax></div>`).join('')}
</section>
${tabs}
<a class="nextsvc" href="storitev-${next.slug}.html" data-theme="dark">
  <img src="${P(next.img)}" alt="" loading="lazy">
  <span class="nextsvc__k">Naslednja storitev</span>
  <span class="nextsvc__t">${next.title} ${arrow}</span>
</a>
${cta()}`,
  });
});

// PROJECTS overview
pages['projekti.html'] = page({
  title: 'Projekti · Maxtin Group', desc: 'Reference v Nemčiji in Avstriji.', active: 'projekti',
  body: `
${pageHero({ title: 'Projekti, na katere smo ponosni', lead: 'Več kot 47 uspešno izvedenih projektov v Sloveniji, Avstriji, Belgiji in Nemčiji.', img: 'heidenheim-1', crumbs: [['Projekti']] })}
<section class="pgrid">
  ${projects.map((p, i) => `
  <a class="pg ${[0, 3, 4, 7].includes(i) ? 'pg--wide' : ''}" href="projekt-${p.slug}.html" data-reveal>
    <div class="pg__img"><img src="${P(p.img)}" alt="${p.city}" loading="lazy" data-inner-parallax></div>
    <div class="pg__meta"><h2>${p.city}</h2><span>${p.country}</span>${arrow}</div>
  </a>`).join('')}
</section>
${cta()}`,
});

projects.forEach((p, idx) => {
  const next = projects[(idx + 1) % projects.length];
  pages[`projekt-${p.slug}.html`] = page({
    title: `${p.city} · Projekti · Maxtin Group`, desc: `Referenca ${p.city}, ${p.country}.`, active: 'projekti',
    body: `
${pageHero({ title: p.city, lead: `Referenca · ${p.country}`, img: p.img, crumbs: [['Projekti', 'projekti.html'], [p.city]] })}
<section class="bento">
  ${p.gal.map((g, i) => `<button class="bento__i bento__i--${i}" data-lightbox="${P(g)}" aria-label="Povečaj fotografijo ${i + 1}"><img src="${P(g)}" alt="${p.city}, fotografija ${i + 1}" loading="lazy"></button>`).join('')}
</section>
<a class="nextsvc" href="projekt-${next.slug}.html" data-theme="dark">
  <img src="${P(next.img)}" alt="" loading="lazy">
  <span class="nextsvc__k">Naslednji projekt</span>
  <span class="nextsvc__t">${next.city} ${arrow}</span>
</a>
<div class="lightbox" data-lb hidden><button aria-label="Zapri" data-lb-close>×</button><img alt=""></div>
${cta()}`,
  });
});

// ABOUT
pages['o-nas.html'] = page({
  title: 'O nas · Maxtin Group', desc: 'Družinsko podjetje, ustanovljeno leta 2016. Spoznajte ekipo in nas kontaktirajte.', active: 'onas',
  body: `
${pageHero({ title: 'Smo strokovni in izkušeni', lead: 'Družinsko podjetje, ustanovljeno leta 2016. Gradimo na zaupanju, odgovornosti in strokovnosti.', img: 'office', crumbs: [['O nas']] })}
<section class="sintro">
  <p class="sintro__lead" data-words>Vsak projekt obravnavamo kot celoto: s skrbnim načrtovanjem, dosledno izvedbo in stalnim nadzorom kakovosti zagotavljamo rezultate, na katere se naši naročniki lahko vedno zanesejo.</p>
  <div class="sintro__aside" data-reveal><p>Izvajamo elektroinštalacije vseh vrst, od hišnih in poslovnih objektov, industrijskih inštalacij ter tunelov, do sestave elektro omaric in priklopov na tekočih trakovih. Ne obljubljamo praznih besed, stojimo za svojimi vrednotami.</p></div>
</section>
<section class="values">
  ${[['Natančnost', 'Vsak element pravilno nameščen, označen in preizkušen.', 'leingarten-2'], ['Izkušnje', 'Več kot 47 projektov v štirih državah, 20+ nemško govorečih sodelavcev.', 'heidenheim-2'], ['Predanost', 'Kratki roki, zahtevna gradbišča in ekipa, ki ostane do konca.', 'wien-3']].map(([t, d, im]) => `
  <div class="value" data-reveal><div class="value__img"><img src="${P(im)}" alt="" loading="lazy"></div><h3>${t}</h3><p>${d}</p></div>`).join('')}
</section>
<section class="team team--bios">
  <div class="team__head">
    <h2 class="h2" data-split>Uprava podjetja</h2>
    <p data-reveal>Pisarniška ekipa skrbi za organizacijo, komunikacijo in podporo, ki omogoča nemoten potek projektov na terenu.</p>
  </div>
  <div class="team__grid">
    ${team.map(t => `
    <figure class="person" data-reveal>
      <div class="person__img"><img src="assets/team/${t.id}.png" alt="${t.name}" loading="lazy"></div>
      <figcaption><strong>${t.name}</strong><span>${t.role}</span><p>${t.bio}</p></figcaption>
    </figure>`).join('')}
  </div>
</section>
${statsBlock()}
<section class="faq">
  <h2 class="h2" data-split>Pogosta vprašanja</h2>
  <div class="faq__list">
    ${faq.map(([q, a]) => `<details class="qa"><summary>${q}<i></i></summary><p>${a}</p></details>`).join('')}
  </div>
</section>
<section class="contact" id="kontakt">
  <div class="contact__info">
    <h2 class="h2" data-split>Spoznajmo se</h2>
    <a class="contact__big" href="tel:+38670655116">+386 70 655 116</a>
    <a class="contact__big" href="mailto:office@maxtin.eu">office@maxtin.eu</a>
    <p>Njiverce vas 6<br>2325 Kidričevo, Slovenija</p>
    <div class="contact__map"><iframe title="Zemljevid" loading="lazy" src="https://www.google.com/maps?q=Njiverce+vas+6,+2325+Kidri%C4%8Devo&output=embed"></iframe></div>
  </div>
  <form class="form" data-form>
    <label><span>Ime in priimek</span><input name="ime" required autocomplete="name"></label>
    <label><span>Podjetje</span><input name="podjetje" autocomplete="organization"></label>
    <label><span>E-pošta</span><input type="email" name="email" required autocomplete="email"></label>
    <label><span>Telefon</span><input type="tel" name="tel" autocomplete="tel"></label>
    <label class="form__full"><span>Storitev</span><select name="storitev">${services.map(s => `<option>${s.title}</option>`).join('')}<option>Drugo</option></select></label>
    <label class="form__full"><span>Opis projekta</span><textarea name="sporocilo" rows="5" required></textarea></label>
    <label class="check form__full"><input type="checkbox" required> <span>Strinjam se s politiko zasebnosti.</span></label>
    <button class="btn btn--accent btn--lg form__full" type="submit">Pošlji povpraševanje ${arrow}</button>
    <p class="form__ok" hidden>Hvala. Odgovorili vam bomo v najkrajšem možnem času.</p>
  </form>
</section>`,
});

// CAREERS
const job = (t, d) => `
<details class="job" data-reveal>
  <summary><h3>${t}</h3><span class="job__meta">Polni delovni čas · Nemčija in Avstrija</span><i></i></summary>
  <div class="job__body">
    <p>${d}</p>
    <h4>Nudimo vam</h4>
    <ul class="perks">${perks.map(p => `<li>${p}</li>`).join('')}</ul>
    <a class="btn btn--accent" href="#prijava">Pošlji prijavo ${arrow}</a>
  </div>
</details>`;
pages['zaposlitve.html'] = page({
  title: 'Zaposlitve · Maxtin Group', desc: 'Delajmo dobro skupaj. Prosta delovna mesta za električarje.', active: 'zaposlitve',
  body: `
${pageHero({ title: 'Delajmo dobro skupaj', lead: 'Naš obseg dela se vztrajno povečuje, zato širimo tudi ekipo. Morda danes iščemo prav tebe.', img: 'wolmirstedt-3', crumbs: [['Zaposlitve']] })}
<section class="jobs">
  <div class="jobs__head">
    <h2 class="h2" data-split>Trenutna prosta delovna mesta</h2>
    <p data-reveal>MaxTin Plus d.o.o. je prepoznaven partner z več kot 47 uspešno izvedenimi projekti na področju Slovenije, Avstrije, Belgije in Nemčije.</p>
  </div>
  ${job('Električar', 'V našo ekipo vabimo električarja za izvajanje elektroinštalacijskih del. Iščemo odgovorno, natančno in zanesljivo osebo z znanjem elektrotehnike in željo po kakovostnem delu. Nudimo stabilno zaposlitev, urejeno delovno okolje ter možnost strokovnega razvoja.')}
  ${job('Vodja električarjev', 'V našo ekipo vabimo vodjo električarjev, ki bo odgovoren za organizacijo, vodenje in nadzor elektroinštalacijskih del na projektih. Iščemo strokovno, odgovorno in samostojno osebo z znanjem nemškega jezika, z izkušnjami na področju elektrotehnike ter sposobnostjo vodenja ekipe.')}
</section>
<section class="perkwall" data-theme="dark">
  <h2 class="h2" data-split>Kaj dobiš pri nas</h2>
  <div class="perkwall__grid">${perks.map((p, i) => `<div class="perk" data-reveal><span>${String(i + 1).padStart(2, '0')}</span>${p}</div>`).join('')}</div>
</section>
<section class="contact" id="prijava">
  <div class="contact__info">
    <h2 class="h2" data-split>Prijava na delovno mesto</h2>
    <p>Pošlji prijavo prek obrazca ali na <a href="mailto:office@maxtin.eu">office@maxtin.eu</a>. Odgovorimo vsakemu kandidatu.</p>
    <div class="contact__photo"><img src="${P('ingbert-1')}" alt="" loading="lazy"></div>
  </div>
  <form class="form" data-form>
    <label><span>Ime in priimek</span><input name="ime" required autocomplete="name"></label>
    <label><span>Telefon</span><input type="tel" name="tel" required autocomplete="tel"></label>
    <label><span>E-pošta</span><input type="email" name="email" required autocomplete="email"></label>
    <label><span>Delovno mesto</span><select name="mesto"><option>Električar</option><option>Vodja električarjev</option></select></label>
    <label class="form__full"><span>Življenjepis</span><input type="file" name="cv" accept=".pdf,.doc,.docx"></label>
    <label class="form__full"><span>Sporočilo</span><textarea name="sporocilo" rows="4"></textarea></label>
    <label class="check form__full"><input type="checkbox" required> <span>Strinjam se s politiko zasebnosti.</span></label>
    <button class="btn btn--accent btn--lg form__full" type="submit">Pošlji prijavo ${arrow}</button>
    <p class="form__ok" hidden>Hvala za prijavo. Kmalu se oglasimo.</p>
  </form>
</section>`,
});

// NEWS
pages['novice.html'] = page({
  title: 'Novice · Maxtin Group', desc: 'Aktualne novice podjetja Maxtin Plus.', active: 'novice',
  body: `
${pageHero({ title: 'Novice', lead: 'Aktualno iz podjetja, z gradbišč in iz stroke.', img: 'office', crumbs: [['Novice']] })}
<section class="news news--page">${newsCards()}</section>
${cta()}`,
});

const article = (n, html) => page({
  title: `${n.title} · Maxtin Group`, desc: n.excerpt, active: 'novice',
  body: `
${pageHero({ title: n.title, lead: n.date, img: n.img, crumbs: [['Novice', 'novice.html'], [n.title]] })}
<article class="article">${html}</article>
<section class="news"><div class="news__head"><h2 class="h2">Več novic</h2></div>${newsCards(news.filter(x => x !== n))}</section>
${cta()}`,
});

pages['novica-srce-podjetja-maxtin-plus.html'] = article(news[0], `
<p class="article__lead">Uspešno podjetje ne temelji le na strokovni izvedbi projektov na terenu, temveč tudi na dobro organizirani in usklajeni ekipi v ozadju.</p>
<p>V podjetju MAXTIN PLUS pomembno vlogo pri vsakodnevnem delovanju predstavlja tudi pisarniška ekipa, ki skrbi za organizacijo projektov, komunikacijo s partnerji, finance in razvoj podjetja. Kot družinsko podjetje, ustanovljeno leta 2016, gradimo svoje delo na zaupanju, odgovornosti in strokovnosti.</p>
<figure><img src="${P('news-srce')}" alt="Ekipa Maxtin Group" loading="lazy"></figure>
<h2>Vodstvo podjetja</h2>
<p><b>Martin Sedlašek, direktor in lastnik.</b> Ustanovitelj podjetja, ki s svojo vizijo, dolgoletnimi izkušnjami na področju elektroinštalacij ter podjetniškim pristopom vodi razvoj podjetja. Njegovo delo je usmerjeno v strateško vodenje, razvoj novih projektov in zagotavljanje visokih standardov kakovosti.</p>
<p><b>Mateja Sedlašek, CFO in COO.</b> Skrbi za finančno stabilnost in operativno učinkovitost podjetja. Vodi finančno poslovanje, organizacijo delovnih procesov ter koordinacijo med oddelki.</p>
<h2>Organizacija in podpora</h2>
<p><b>Polona Murko, vodja pisarne.</b> Skrbi za organizacijo administrativnih procesov, usklajevanje dokumentacije ter nemoten potek vsakodnevnega dela v podjetju.</p>
<p><b>Iris Laura, asistentka poslovodstva.</b> Nudi podporo vodstvu podjetja pri organizaciji nalog, komunikaciji in koordinaciji projektov.</p>
<h2>Prodaja, marketing in stranke</h2>
<p><b>Selin Sever, Sales and Marketing Manager.</b> Skrbi za razvoj prepoznavnosti podjetja, digitalno prisotnost ter pripravo vsebin, ki predstavljajo podjetje, projekte in vrednote.</p>
<p><b>Dejan Kodrič, Key Accounts.</b> Gradi dolgoročne poslovne odnose, spremlja potek projektov ter skrbi, da so potrebe naročnikov vedno ustrezno razumljene in upoštevane.</p>
<h2>Ekipa, ki stoji za vsakim projektom</h2>
<p>Čeprav so elektroinštalacije pogosto najbolj vidni del našega dela, uspeh vsakega projekta temelji tudi na usklajenem sodelovanju celotne ekipe. S skupnim znanjem, izkušnjami in odgovornim pristopom ustvarjamo okolje, kjer lahko vsak projekt poteka profesionalno, učinkovito in zanesljivo.</p>`);

pages['novica-industrijske-elektroinstalacije.html'] = article(news[1], `
<p class="article__lead">Industrijske elektroinštalacije so ena najpomembnejših osnov vsakega sodobnega industrijskega sistema. Brez zanesljive električne infrastrukture danes ni mogoče zagotavljati nemotenega delovanja proizvodnje, logistike ali drugih industrijskih procesov.</p>
<h2>Kaj so industrijske elektroinštalacije?</h2>
<p>Industrijske elektroinštalacije so bistveno bolj zahtevne kot tiste v stanovanjskih ali poslovnih objektih. Gre za celovit sistem, ki vključuje razvod električne energije, napajanje strojev, krmilne sisteme in komunikacijske povezave. V sodobnih obratih niso več zgolj napeljava kablov, temveč del inteligentnega sistema, ki omogoča nadzor, avtomatizacijo in optimizacijo delovanja.</p>
<h2>Ključne značilnosti</h2>
<p>Najpomembnejša lastnost je zanesljivost. Industrijski sistemi pogosto delujejo neprekinjeno, zato morajo inštalacije zagotavljati stabilno delovanje tudi v najbolj zahtevnih pogojih. Izjemno pomembna je tudi varnost, saj morajo inštalacije vključevati zaščitne mehanizme pred kratkimi stiki, prenapetostmi in električnimi udari. Pomembna je še prilagodljivost, saj se industrijski procesi nenehno razvijajo.</p>
<figure><img src="${P('weissenburg-2')}" alt="Montaža kabelskih polic" loading="lazy"></figure>
<h2>Proces izvedbe</h2>
<p>Celoten proces se začne z natančnim načrtovanjem, kjer analiziramo potrebe objekta, vrsto proizvodnje in pričakovane obremenitve. Sledi izvedba: polaganje kablov, montaža elektro omar in povezovanje vseh komponent. Po izvedbi sledi integracija z avtomatizacijskimi sistemi, pred zagonom pa testiranje z meritvami in preverjanjem delovanja.</p>
<h2>Energetska učinkovitost</h2>
<p>Z ustrezno zasnovanimi elektroinštalacijami lahko podjetja bistveno zmanjšajo porabo energije in s tem stroške poslovanja. Sodobne rešitve, kot so LED razsvetljava in pametni sistemi upravljanja, omogočajo bolj trajnostno delovanje.</p>
<h2>Kako izbrati pravega izvajalca?</h2>
<p>Pomembno je, da ima izvajalec ustrezne izkušnje, reference in strokovno znanje. Dober izvajalec bo znal svetovati pri načrtovanju, zagotoviti kakovostno izvedbo in nuditi podporo tudi po zaključku projekta.</p>`);

pages['novica-nagradna-igra.html'] = article(news[2], `
<p class="article__lead">Letos Maxtin Group praznuje 10 let delovanja. V znak zahvale vsem poslovnim partnerjem, strankam in sledilcem smo pripravili veliko nagradno igro s tremi odličnimi nagradami.</p>
<ol class="biglist">
  <li><b>Makita set.</b> Profesionalni komplet akumulatorskega orodja Makita.</li>
  <li><b>Benning Duspol Digital tester.</b> Profesionalni dvopolni tester napetosti.</li>
  <li><b>Set izvijačev Wera.</b> Profesionalni komplet kakovostnih izvijačev.</li>
</ol>
<h2>Kako sodelovati?</h2>
<p>Obiščite Facebook stran Maxtin Group, sledite strani in všečkajte objavo nagradne igre. Po opravljenih korakih ste vključeni v žrebanje.</p>
<h2>Trajanje</h2>
<p>Od 27. 6. 2026 do 31. 7. 2026 ob 23.59. Žrebanje bo izvedeno v začetku avgusta 2026, nagrajence bomo objavili na Facebook strani Maxtin Group in jih kontaktirali prek zasebnega sporočila.</p>
<p class="muted">V nagradni igri lahko sodelujejo vse polnoletne fizične osebe, ki izpolnijo pogoje sodelovanja v času trajanja nagradne igre.</p>`);

for (const [f, html] of Object.entries(pages)) writeFileSync(join(ROOT, f), html);
console.log('Built', Object.keys(pages).length, 'pages');
