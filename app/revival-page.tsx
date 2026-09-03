'use client';

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BookOpen,
  Globe2,
  HandHeart,
  Heart,
  MapPin,
  Music2,
  Play,
  Users,
  Video,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './revival.css';

const INSTAGRAM = 'https://www.instagram.com/christianhopechurchfl/';
const YOUTUBE = 'https://www.youtube.com/@ChristianHopeChurchfl';
const GIVE = 'https://give.tithe.ly/?formId=19ee2214-9179-41b7-b8a1-60cbb330bb9c';
const MAP = 'https://maps.apple.com/?address=2800%20Pan%20American%20Blvd%2C%20North%20Port%2C%20FL%2034287';

// The sticky horizontal scrub runs at every width; only a genuinely short
// viewport (landscape phones) falls back to a plain swipeable rail, and the JS
// must not fight that. Mirrored in revival.css.
const FLAT_RAIL = '(max-height: 560px)';

// Kept in sync with the @supports (animation-timeline: view()) block in legacy.css.
const REVEAL_SELECTOR = [
  '.lr-story > *', '.lr-leadership > *', '.lr-leadership-values article',
  '.lr-weekly > *', '.lr-service-grid article',
  '.lr-mission-copy > *', '.lr-mission-visuals', '.lr-mission-list', '.lr-mission-list article',
  '.lr-watch-sticky > header > *', '.lr-gallery > *', '.lr-gallery figure',
  '.lr-visit > *', '.lr-give > *', '.lr-footer > *',
].join(', ');

type RevivalLanguage = 'en' | 'uk' | 'ru';

const revivalLanguages: { code: RevivalLanguage; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'uk', label: 'УКР', name: 'Українська' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

const revivalCopy = {
  en: {
    language: 'Language',
    nav: ['Our church', 'Leadership', 'Missions', 'Watch', 'Visit'],
    donate: 'Donate',
    eyebrow: 'A multilingual church in North Port, Florida',
    heroTitle: ['Hope is alive', 'and moving outward.'],
    heroBody: 'Christian Hope is a church family learning the way of Jesus, growing together, and carrying the gospel from our city to the nations.',
    visitCta: 'Plan a visit',
    watchCta: 'Watch the latest message',
    giveCta: 'Give with purpose',
    heroCaptions: ['Prayer in community', 'Real stories of faith', 'Worship that becomes a way of life'],
    welcomeLabel: '01 / Welcome',
    welcomeTitle: ['Church can be a place', 'to breathe again.'],
    welcomeLead: 'You do not need to perform, pretend, or have every answer before you walk through the door.',
    welcomeBody: 'We gather across generations, cultures, and languages around Jesus—with room for questions, prayer, friendship, and a faith that reaches beyond Sunday.',
    leadershipLabel: '02 / Leadership',
    leadershipTitle: ['Leaders who stay', 'close to people.'],
    leadershipLead: 'Christian Hope is served by a pastoral team committed to Scripture, prayer, and a church culture where people are known.',
    leadershipBody: 'They lead together—shepherding the local church, developing others, and building relationships that carry the gospel beyond North Port.',
    leadershipValues: [
      ['Shepherd with care', 'People are not projects. Pastoral care begins with presence, prayer, and listening.'],
      ['Teach with clarity', 'Scripture shapes what we believe, how we live, and the kind of community we become.'],
      ['Serve the mission', 'Leadership equips the whole church to carry hope locally and across cultures.'],
    ],
    leadershipImageAlt: 'Christian Hope pastoral leadership team',
    leadershipNote: 'Pastoral leadership · Christian Hope Church',
    weeklyLabel: '03 / Weekly rhythm',
    weeklyTitle: 'There is a place for you in the week.',
    weeklyIntro: 'Gathering details can change, so check the latest Instagram update before coming.',
    services: [
      ['Sunday gathering', 'Worship, prayer, Scripture, and community.', 'Sunday · 10:00 AM'],
      ['Prayer &\nworship', 'Space to seek God and carry needs together.', 'Monday · 7:00 PM'],
      ['Spiritual Parenting', 'A new learning series for parents and families.', 'Saturday · 10:00 AM'],
      ['Teaching & training', 'Special gatherings that equip people to live and share the gospel.', 'Saturday · 10:00 AM–4:00 PM'],
    ],
    currentUpdates: 'See current updates',
    missionLabel: '04 / Missions',
    missionTitle: ['The gospel was always', 'meant to travel.'],
    missionBody: 'Our mission begins in North Port and moves through prayer, evangelism, relationships, and practical support for ministry partners around the world.',
    missionItems: [
      ['Local witness', 'Training ordinary people to share the gospel confidently in everyday life.'],
      ['Global partnerships', 'Standing with leaders and ministries serving communities in Ukraine and Pakistan.'],
      ['Prayer for the nations', 'Carrying people, churches, and places before God—together.'],
    ],
    missionStory: 'Watch a mission story',
    watchLabel: '05 / Watch & listen',
    watchTitle: 'From the room to wherever you are.',
    watchIntro: 'Messages, conversations, testimonies, and worship from the Christian Hope YouTube channel.',
    openYoutube: 'Open on YouTube',
    galleryLabel: '06 / Church as it happens',
    galleryTitle: 'Real people. Shared faith. Living hope.',
    galleryCaptions: ['Together in leadership', 'Teaching with clarity', 'Worship in the room', 'Prayer that carries us', 'One Spirit across cultures', 'Ministry behind the scenes', 'Faith shared openly', 'A living song'],
    visitLabel: '07 / Find us',
    visitTitle: 'Come worship with us.',
    visitBody: 'Your first visit can be simple. Check the latest gathering update, get directions, and come as you are.',
    directions: 'Get directions',
    instagramUpdates: 'Latest details on Instagram',
    giveLabel: '08 / Generosity',
    giveTitle: 'Give where hope is moving.',
    giveBody: 'Your generosity supports the life of the church, local evangelism, and mission relationships beyond our city.',
    giveNow: 'Donate securely',
    footerLine: 'Encounter God · Find community · Carry hope',
    footerDescription: 'A multilingual church family following Jesus and carrying living hope from North Port to the nations.',
  },
  uk: {
    language: 'Мова',
    nav: ['Про церкву', 'Лідерство', 'Місія', 'Дивитися', 'Завітайте'],
    donate: 'Пожертвувати',
    eyebrow: 'Багатомовна церква в Норт-Порті, Флорида',
    heroTitle: ['Надія жива', 'і рухається далі.'],
    heroBody: 'Christian Hope — це церковна родина, яка пізнає шлях Ісуса, зростає разом і несе Євангеліє від нашого міста до народів.',
    visitCta: 'Запланувати візит',
    watchCta: 'Дивитися останню проповідь',
    giveCta: 'Пожертвувати',
    heroCaptions: ['Молитва у спільноті', 'Справжні історії віри', 'Поклоніння як спосіб життя'],
    welcomeLabel: '01 / Ласкаво просимо',
    welcomeTitle: ['Церква може стати місцем,', 'де знову легко дихати.'],
    welcomeLead: 'Вам не потрібно грати роль, удавати чи мати всі відповіді, перш ніж зайти у двері.',
    welcomeBody: 'Ми збираємося різними поколіннями, культурами й мовами навколо Ісуса — тут є місце для запитань, молитви, дружби та віри, що виходить за межі неділі.',
    leadershipLabel: '02 / Лідерство',
    leadershipTitle: ['Лідери, які залишаються', 'поруч із людьми.'],
    leadershipLead: 'Christian Hope служить пасторська команда, віддана Писанню, молитві та церковній культурі, де кожну людину знають.',
    leadershipBody: 'Вони ведуть церкву разом — піклуються про місцеву громаду, розвивають інших і будують стосунки, що несуть Євангеліє далеко за межі Норт-Порта.',
    leadershipValues: [
      ['Піклуватися по-пасторськи', 'Люди — не проєкти. Пасторська турбота починається з присутності, молитви та слухання.'],
      ['Навчати зрозуміло', 'Писання формує нашу віру, щоденне життя і спільноту, якою ми стаємо.'],
      ['Служити місії', 'Лідерство споряджає всю церкву нести надію у своєму місті та між культурами.'],
    ],
    leadershipImageAlt: 'Пасторська команда Christian Hope',
    leadershipNote: 'Пасторське лідерство · Christian Hope Church',
    weeklyLabel: '03 / Ритм тижня',
    weeklyTitle: 'Для вас є місце протягом усього тижня.',
    weeklyIntro: 'Деталі зустрічей можуть змінюватися, тому перед візитом перегляньте останнє оновлення в Instagram.',
    services: [
      ['Недільне служіння', 'Поклоніння, молитва, Писання та спільнота.', 'Неділя · 10:00'],
      ['Молитва й\nпоклоніння', 'Простір шукати Бога й разом приносити потреби.', 'Понеділок · 19:00'],
      ['Духовне батьківство', 'Нова навчальна серія для батьків і сімей.', 'Субота · 10:00'],
      ['Навчання й підготовка', 'Особливі зустрічі, що допомагають жити Євангелієм і ділитися ним.', 'Субота · 10:00–16:00'],
    ],
    currentUpdates: 'Переглянути оновлення',
    missionLabel: '04 / Місія',
    missionTitle: ['Євангеліє завжди було', 'покликане рухатися.'],
    missionBody: 'Наша місія починається в Норт-Порті й поширюється через молитву, євангелізацію, стосунки та практичну підтримку служителів у різних країнах.',
    missionItems: [
      ['Місцеве свідчення', 'Допомагаємо звичайним людям упевнено ділитися Євангелієм у щоденному житті.'],
      ['Глобальне партнерство', 'Стоїмо поруч із лідерами та служіннями, які служать громадам в Україні й Пакистані.'],
      ['Молитва за народи', 'Разом приносимо до Бога людей, церкви й країни.'],
    ],
    missionStory: 'Дивитися місіонерську історію',
    watchLabel: '05 / Дивитися й слухати',
    watchTitle: 'Із залу — туди, де ви є.',
    watchIntro: 'Проповіді, розмови, свідчення та поклоніння з YouTube-каналу Christian Hope.',
    openYoutube: 'Відкрити на YouTube',
    galleryLabel: '06 / Життя церкви',
    galleryTitle: 'Справжні люди. Спільна віра. Жива надія.',
    galleryCaptions: ['Разом у лідерстві', 'Навчати зрозуміло', 'Поклоніння в залі', 'Молитва, що підтримує', 'Один Дух між культурами', 'Служіння за кадром', 'Віра, якою діляться відкрито', 'Жива пісня'],
    visitLabel: '07 / Знайдіть нас',
    visitTitle: 'Приходьте поклонятися разом.',
    visitBody: 'Перший візит може бути простим. Перевірте актуальні деталі, прокладіть маршрут і приходьте такими, як ви є.',
    directions: 'Прокласти маршрут',
    instagramUpdates: 'Актуальні деталі в Instagram',
    giveLabel: '08 / Щедрість',
    giveTitle: 'Підтримайте те, де рухається надія.',
    giveBody: 'Ваша щедрість підтримує життя церкви, місцеву євангелізацію та місіонерські партнерства за межами нашого міста.',
    giveNow: 'Безпечно пожертвувати',
    footerLine: 'Зустріти Бога · Знайти спільноту · Нести надію',
    footerDescription: 'Багатомовна церковна родина, що слідує за Ісусом і несе живу надію від Норт-Порта до народів.',
  },
  ru: {
    language: 'Язык',
    nav: ['О церкви', 'Лидерство', 'Миссия', 'Смотреть', 'Посетить'],
    donate: 'Пожертвовать',
    eyebrow: 'Многоязычная церковь в Норт-Порте, Флорида',
    heroTitle: ['Надежда жива', 'и движется дальше.'],
    heroBody: 'Christian Hope — это церковная семья, которая познаёт путь Иисуса, растёт вместе и несёт Евангелие от нашего города к народам.',
    visitCta: 'Запланировать визит',
    watchCta: 'Смотреть последнюю проповедь',
    giveCta: 'Пожертвовать',
    heroCaptions: ['Молитва в общине', 'Настоящие истории веры', 'Поклонение как образ жизни'],
    welcomeLabel: '01 / Добро пожаловать',
    welcomeTitle: ['Церковь может стать местом,', 'где снова легко дышать.'],
    welcomeLead: 'Вам не нужно играть роль, притворяться или знать все ответы, прежде чем войти в дверь.',
    welcomeBody: 'Мы собираемся разными поколениями, культурами и языками вокруг Иисуса — здесь есть место для вопросов, молитвы, дружбы и веры, которая продолжается после воскресенья.',
    leadershipLabel: '02 / Лидерство',
    leadershipTitle: ['Лидеры, которые остаются', 'рядом с людьми.'],
    leadershipLead: 'Christian Hope служит пасторская команда, преданная Писанию, молитве и церковной культуре, где каждого человека знают.',
    leadershipBody: 'Они ведут церковь вместе — заботятся о местной общине, развивают других и строят отношения, которые несут Евангелие далеко за пределы Норт-Порта.',
    leadershipValues: [
      ['Заботиться по-пасторски', 'Люди — не проекты. Пасторская забота начинается с присутствия, молитвы и умения слушать.'],
      ['Учить ясно', 'Писание формирует нашу веру, повседневную жизнь и общину, которой мы становимся.'],
      ['Служить миссии', 'Лидерство снаряжает всю церковь нести надежду в своём городе и среди разных культур.'],
    ],
    leadershipImageAlt: 'Пасторская команда Christian Hope',
    leadershipNote: 'Пасторское лидерство · Christian Hope Church',
    weeklyLabel: '03 / Ритм недели',
    weeklyTitle: 'Для вас есть место в течение всей недели.',
    weeklyIntro: 'Детали встреч могут меняться, поэтому перед визитом проверьте последнее обновление в Instagram.',
    services: [
      ['Воскресное служение', 'Поклонение, молитва, Писание и общение.', 'Воскресенье · 10:00'],
      ['Молитва и\nпоклонение', 'Пространство искать Бога и вместе приносить нужды.', 'Понедельник · 19:00'],
      ['Духовное родительство', 'Новая учебная серия для родителей и семей.', 'Суббота · 10:00'],
      ['Обучение и подготовка', 'Особые встречи, которые помогают жить Евангелием и делиться им.', 'Суббота · 10:00–16:00'],
    ],
    currentUpdates: 'Посмотреть обновления',
    missionLabel: '04 / Миссия',
    missionTitle: ['Евангелие всегда было', 'призвано двигаться.'],
    missionBody: 'Наша миссия начинается в Норт-Порте и продолжается через молитву, евангелизацию, отношения и практическую поддержку служителей в разных странах.',
    missionItems: [
      ['Местное свидетельство', 'Помогаем обычным людям уверенно делиться Евангелием в повседневной жизни.'],
      ['Глобальное партнёрство', 'Стоим рядом с лидерами и служениями, которые служат людям в Украине и Пакистане.'],
      ['Молитва за народы', 'Вместе приносим к Богу людей, церкви и страны.'],
    ],
    missionStory: 'Смотреть миссионерскую историю',
    watchLabel: '05 / Смотреть и слушать',
    watchTitle: 'Из зала — туда, где вы находитесь.',
    watchIntro: 'Проповеди, разговоры, свидетельства и поклонение с YouTube-канала Christian Hope.',
    openYoutube: 'Открыть на YouTube',
    galleryLabel: '06 / Жизнь церкви',
    galleryTitle: 'Настоящие люди. Общая вера. Живая надежда.',
    galleryCaptions: ['Вместе в лидерстве', 'Учить ясно', 'Поклонение в зале', 'Молитва, которая поддерживает', 'Один Дух между культурами', 'Служение за кадром', 'Вера, которой делятся открыто', 'Живая песня'],
    visitLabel: '07 / Найдите нас',
    visitTitle: 'Приходите поклоняться вместе.',
    visitBody: 'Первый визит может быть простым. Проверьте актуальные детали, постройте маршрут и приходите такими, как вы есть.',
    directions: 'Построить маршрут',
    instagramUpdates: 'Актуальные детали в Instagram',
    giveLabel: '08 / Щедрость',
    giveTitle: 'Поддержите то, где движется надежда.',
    giveBody: 'Ваша щедрость поддерживает жизнь церкви, местную евангелизацию и миссионерские партнёрства за пределами нашего города.',
    giveNow: 'Безопасно пожертвовать',
    footerLine: 'Встретить Бога · Найти общину · Нести надежду',
    footerDescription: 'Многоязычная церковная семья, которая следует за Иисусом и несёт живую надежду от Норт-Порта до народов.',
  },
} as const;

function Logo({ inverse = false, mark = false }: { inverse?: boolean; mark?: boolean }) {
  const src = mark
    ? inverse ? 'chc-icon-white.svg' : 'chc-icon-color.svg'
    : inverse ? 'chc-logo-white.svg' : 'chc-logo-color.svg';
  return <img className={mark ? 'legacy-logo legacy-logo--mark' : 'legacy-logo'} src={src} alt="Christian Hope Church" />;
}

function Revival({ language, onLanguageChange }: { language: RevivalLanguage; onLanguageChange: (language: RevivalLanguage) => void }) {
  const c = revivalCopy[language];
  const [scrolled, setScrolled] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Cross-fade the copy rather than remounting it. The subtree used to carry
  // key={language}, which tore down and rebuilt every image and all six video
  // embeds on each switch — the source of the flash and layout jump.
  const swapTimers = useRef<number[]>([]);
  const swapLanguage = (next: RevivalLanguage) => {
    if (next === language) return;
    // A newer click supersedes one still fading, rather than being dropped.
    swapTimers.current.forEach(window.clearTimeout);
    swapTimers.current = [];
    setSwapping(true);
    // Timers rather than rAF: a backgrounded tab stops firing animation frames,
    // which would strand the copy mid-fade.
    swapTimers.current.push(
      window.setTimeout(() => {
        onLanguageChange(next);
        swapTimers.current.push(window.setTimeout(() => setSwapping(false), 20));
      }, 190),
    );
  };
  useEffect(() => () => swapTimers.current.forEach(window.clearTimeout), []);
  const videoSection = useRef<HTMLElement>(null);
  const videoRail = useRef<HTMLDivElement>(null);
  const videoProgressBar = useRef<HTMLSpanElement>(null);
  const videoProgressValue = useRef(0);
  const videos = [
    { id: 'PaYleMiqKyY', title: 'ОГОНЬ ЕДИНСТВА! One Spirit' },
    { id: 'JCYdslrd_Qs', title: 'Культура Церкви · Воскресное служение' },
    { id: 'tXB76Y9uKW4', title: 'Человек молитвы · Виктор Кашубин' },
    { id: 'b7Pk1Ry8ifY', title: 'Разговор о вере и служении · Григорий Радион' },
    { id: 'PtdTWE0OYS0', title: 'Pastor Valentin · Conversation' },
    { id: 'dExjSLaZfDM', title: 'Ministry in Pakistan · Pastor Sohail Rana' },
  ];
  const gallery = [
    'media/church-family-cinematic.webp',
    'media/service-preaching-01.webp',
    'media/service-worship-wide.webp',
    'media/social-prayer-2026-upscaled.webp',
    'media/social-one-spirit-2026.webp',
    'media/social-studio-2026.webp',
    'media/service-preaching-02.webp',
    'media/service-worship-close.webp',
  ];

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 48);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  // Section reveals. An IntersectionObserver rather than animation-timeline:
  // a scroll-linked range never completes for elements at the document bottom,
  // which left the Give CTA and the footer permanently at opacity 0. Once an
  // element has intersected here it stays revealed.
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    if (!('IntersectionObserver' in window)) return;

    // Siblings within a group cascade slightly rather than all arriving at once.
    const seen = new Map<Element, number>();
    targets.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      const index = seen.get(parent) ?? 0;
      seen.set(parent, index + 1);
      el.style.setProperty('--lr-reveal-delay', `${Math.min(index, 4) * 70}ms`);
      el.classList.add('lr-reveal');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScrub = () => {
      frame = 0;
      const section = videoSection.current;
      const rail = videoRail.current;
      const progressBar = videoProgressBar.current;
      const sticky = rail?.parentElement;
      if (!section || !rail || !progressBar || !sticky) return;

      if (window.matchMedia(FLAT_RAIL).matches) {
        section.style.height = 'auto';
        rail.style.transform = 'none';
        progressBar.style.width = '0%';
        videoProgressValue.current = 0;
        return;
      }

      // Scrub faster than 1:1 so the section is not several screens tall just to
      // pan six cards, and size it from the panel rather than the viewport so
      // there is no dead run after the last card.
      const travel = Math.max(0, rail.scrollWidth - window.innerWidth);
      const scrollLength = Math.min(
        Math.max(travel * 0.55, window.innerHeight * 0.45),
        window.innerHeight * 1.25,
      );
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / scrollLength));

      section.style.height = `${sticky.offsetHeight + scrollLength}px`;
      rail.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
      progressBar.style.width = `${progress * 100}%`;
      videoProgressValue.current = progress;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrub);
    };
    const observer = new ResizeObserver(requestUpdate);
    if (videoRail.current) observer.observe(videoRail.current);
    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [language]);

  const scrollVideos = (direction: -1 | 1) => {
    const section = videoSection.current;
    if (!section) return;
    if (window.matchMedia(FLAT_RAIL).matches) {
      videoRail.current?.scrollBy({ left: direction * window.innerWidth * 0.88, behavior: 'smooth' });
      return;
    }
    const scrollLength = section.offsetHeight - window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const nextProgress = Math.min(1, Math.max(0, videoProgressValue.current + direction / (videos.length - 1)));
    window.scrollTo({ top: sectionTop + nextProgress * scrollLength, behavior: 'smooth' });
  };

  return (
    <main className="legacy-revival" lang={language}>
      <header className="lr-nav" data-scrolled={scrolled}>
        <a href="#lr-main"><Logo /></a>
        <nav id="lr-nav-menu" data-open={menuOpen} className={swapping ? 'lr-nav-links is-swapping' : 'lr-nav-links'}>{c.nav.map((label, index) => <a key={label} href={['#lr-story', '#lr-leadership', '#lr-missions', '#lr-watch', '#lr-visit'][index]} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="lr-menu-donate" href={GIVE} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}><Heart aria-hidden="true" /> {c.donate}</a></nav>
        <div className="lr-nav-tools">
          <button type="button" className="lr-nav-toggle" data-open={menuOpen} aria-expanded={menuOpen} aria-controls="lr-nav-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}><span className="lr-burger" aria-hidden="true"><i /><i /><i /></span></button>
          <fieldset className="lr-language-picker" aria-label={c.language}>
            <Globe2 aria-hidden="true" />
            {revivalLanguages.map((item) => <button key={item.code} type="button" title={item.name} aria-pressed={language === item.code} onClick={() => swapLanguage(item.code)}>{item.label}</button>)}
          </fieldset>
          <a className="lr-donate" href={GIVE} target="_blank" rel="noreferrer"><Heart aria-hidden="true" /> {c.donate}</a>
        </div>
      </header>

      <div className={swapping ? 'lr-language-content is-swapping' : 'lr-language-content'}>

      <section className="lr-hero" id="lr-main">
        <div className="lr-hero-copy">
          <p>{c.eyebrow}</p>
          <h1>{c.heroTitle[0]}{' '}<i>{c.heroTitle[1]}</i></h1>
          <span>{c.heroBody}</span>
          <div className="lr-hero-actions">
            <a href="#lr-visit">{c.visitCta} <ArrowRight /></a>
            <a href="#lr-watch"><Play fill="currentColor" /> {c.watchCta}</a>
          </div>
        </div>
        <div className="lr-hero-collage">
          <figure className="lr-hero-primary"><img className="lr-parallax-media" src="media/social-prayer-2026-upscaled.webp" alt={c.heroCaptions[0]} /></figure>
          <figure><img className="lr-parallax-media" src="media/service-preaching-01.webp" alt={c.heroCaptions[1]} /></figure>
          <figure><img className="lr-parallax-media" src="media/service-worship-wide.webp" alt={c.heroCaptions[2]} /></figure>
        </div>
      </section>

      <section className="lr-marquee" aria-label="Christian Hope Church message">
        <div className="lr-marquee-track">
          {[0, 1].map((copyIndex) => (
            <div className="lr-marquee-group" aria-hidden={copyIndex === 1} key={copyIndex}>
              {['Hope is alive', 'Надія жива', 'Надежда жива', 'Worship', 'Prayer', 'Family', 'North Port to the nations'].map((item) => <span key={item}>{item}</span>)}
            </div>
          ))}
        </div>
      </section>

      <section className="lr-story" id="lr-story">
        <span>{c.welcomeLabel}</span>
        <h2>{c.welcomeTitle[0]}{' '}<i>{c.welcomeTitle[1]}</i></h2>
        <div><strong>{c.welcomeLead}</strong><p>{c.welcomeBody}</p></div>
      </section>

      <section className="lr-leadership" id="lr-leadership">
        <figure><img className="lr-parallax-media" src="media/church-family-cinematic.webp" alt={c.leadershipImageAlt} loading="lazy" /><figcaption>{c.leadershipNote}</figcaption></figure>
        <div className="lr-leadership-copy"><span>{c.leadershipLabel}</span><h2>{c.leadershipTitle[0]}{' '}<i>{c.leadershipTitle[1]}</i></h2><strong>{c.leadershipLead}</strong><p>{c.leadershipBody}</p></div>
        <div className="lr-leadership-values">{c.leadershipValues.map((item, index) => <article key={item[0]}><span>0{index + 1}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></article>)}</div>
      </section>

      <section className="lr-weekly" id="lr-weekly">
        <header><span>{c.weeklyLabel}</span><h2>{c.weeklyTitle}</h2><p>{c.weeklyIntro}</p></header>
        <div className="lr-service-grid">
          {c.services.map((service, index) => <article key={service[0]}><span>0{index + 1}</span>{[Music2, HandHeart, Users, BookOpen].map((Icon, iconIndex) => iconIndex === index ? <Icon key={service[0]} aria-hidden="true" /> : null)}<h3>{service[0]}</h3><p>{service[1]}</p><small>{service[2]}</small></article>)}
        </div>
        <a className="lr-inline-link" href={INSTAGRAM} target="_blank" rel="noreferrer"><AtSign /> {c.currentUpdates} <ArrowUpRight /></a>
      </section>

      <section className="lr-missions" id="lr-missions">
        <div className="lr-mission-copy"><span>{c.missionLabel}</span><h2>{c.missionTitle[0]}{' '}<i>{c.missionTitle[1]}</i></h2><p>{c.missionBody}</p><a href="https://www.youtube.com/watch?v=dExjSLaZfDM" target="_blank" rel="noreferrer"><Play fill="currentColor" /> {c.missionStory}</a></div>
        <div className="lr-mission-visuals"><figure className="lr-mission-main"><img className="lr-parallax-media" src="media/social-one-spirit-2026.webp" alt={c.missionItems[1][0]} /></figure><figure><img className="lr-parallax-media" src="media/social-studio-2026.webp" alt={c.missionItems[0][0]} /></figure><figure><img className="lr-parallax-media" src="media/social-prayer-2026-upscaled.webp" alt={c.missionItems[2][0]} /></figure></div>
        <div className="lr-mission-list">{c.missionItems.map((item, index) => <article key={item[0]}><span>0{index + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>
      </section>

      <section className="lr-watch" id="lr-watch" ref={videoSection}>
        <div className="lr-watch-sticky">
          <header><span>{c.watchLabel}</span><h2>{c.watchTitle}</h2><p>{c.watchIntro}</p></header>
          <div className="lr-watch-controls">
            <button type="button" onClick={() => scrollVideos(-1)} aria-label="Previous videos"><ArrowLeft /></button>
            <div className="lr-watch-progress" aria-hidden="true"><span ref={videoProgressBar} /></div>
            <button type="button" onClick={() => scrollVideos(1)} aria-label="Next videos"><ArrowRight /></button>
          </div>
          <div className="lr-watch-track" ref={videoRail}>{videos.map((video, index) => <article key={video.id}><div className="lr-video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div><span>0{index + 1}</span><h3>{video.title}</h3><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">{c.openYoutube} <ArrowUpRight /></a></div></article>)}</div>
        </div>
      </section>

      <section className="lr-gallery">
        <header><span>{c.galleryLabel}</span><h2>{c.galleryTitle}</h2></header>
        <div>{gallery.map((src, index) => <figure key={src}><img className="lr-parallax-media" src={src} alt={c.galleryCaptions[index]} loading="lazy" /><figcaption><span>0{index + 1}</span>{c.galleryCaptions[index]}</figcaption></figure>)}</div>
      </section>

      <section className="lr-visit" id="lr-visit">
        <div className="lr-visit-copy"><span>{c.visitLabel}</span><h2>{c.visitTitle}</h2><p>{c.visitBody}</p><address><MapPin /><strong>2800 Pan American Blvd<br />North Port, FL 34287</strong><a href={MAP} target="_blank" rel="noreferrer">{c.directions} <ArrowUpRight /></a><a href={INSTAGRAM} target="_blank" rel="noreferrer">{c.instagramUpdates} <AtSign /></a></address></div>
        <div className="lr-map">
          <iframe title="Christian Hope Church map" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-82.249%2C27.055%2C-82.225%2C27.072&amp;layer=mapnik" />
          <a className="lr-map-marker" href={MAP} target="_blank" rel="noreferrer" aria-label={c.directions}><span><img src="chc-icon-white.svg" alt="" /></span><b>Christian Hope Church</b></a>
        </div>
      </section>

      <section className="lr-give">
        <div><span>{c.giveLabel}</span><h2>{c.giveTitle}</h2><p>{c.giveBody}</p></div>
        <a href={GIVE} target="_blank" rel="noreferrer"><Heart fill="currentColor" /> {c.giveNow} <ArrowUpRight /></a>
      </section>

      <footer className="lr-footer" id="lr-footer"><div className="lr-footer-brand"><Logo inverse /><p>{c.footerDescription}</p></div><p>{c.footerLine}</p><div><a href={INSTAGRAM} target="_blank" rel="noreferrer"><AtSign /> Instagram</a><a href={YOUTUBE} target="_blank" rel="noreferrer"><Video /> YouTube</a></div></footer>
      </div>
    </main>
  );
}

export default function RevivalPage() {
  const [revivalLanguage, setRevivalLanguage] = useState<RevivalLanguage>('en');
  return (
    <div className="legacy-stage" data-concept="revival">
      <Revival language={revivalLanguage} onLanguageChange={setRevivalLanguage} />
    </div>
  );
}
