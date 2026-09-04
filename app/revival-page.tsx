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
  Volume2,
  VolumeX,
} from 'lucide-react';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import './revival.css';

const INSTAGRAM = 'https://www.instagram.com/christianhopechurchfl/';
const YOUTUBE = 'https://www.youtube.com/@ChristianHopeChurchfl';
const GIVE = 'https://give.tithe.ly/?formId=19ee2214-9179-41b7-b8a1-60cbb330bb9c';
const MAP = 'https://maps.apple.com/?address=2800%20Pan%20American%20Blvd%2C%20North%20Port%2C%20FL%2034287';

// Everything that eases in on scroll. Paired with .lr-reveal in revival.css,
// which also carries the per-element variants (headings blur in, figures wipe).
const REVEAL_SELECTOR = [
  '.lr-story > *',
  '.lr-leadership > figure', '.lr-leadership-copy > *', '.lr-leadership-values article',
  '.lr-weekly > header > *', '.lr-service-grid article', '.lr-weekly > .lr-inline-link',
  '.lr-mission-copy > *', '.lr-mission-visuals figure', '.lr-mission-list article',
  '.lr-watch-panel > header > *', '.lr-watch-feature > *', '.lr-watch-controls', '.lr-watch-track',
  '.lr-gallery > header > *', '.lr-gallery figure',
  '.lr-visit-copy > *', '.lr-map', '.lr-give > *', '.lr-footer > *',
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
    eyebrow: 'Christian Hope · Христианская Надежда · North Port, Florida',
    heroTitle: ['Hope is alive', 'and it keeps moving.'],
    heroBody: 'A church family in North Port with roots in Ukraine, worshipping across Ukrainian, Russian, and English. As long as people need hope, the church keeps moving forward.',
    visitCta: 'Plan a visit',
    watchCta: 'Watch the latest message',
    giveCta: 'Give with purpose',
    heroCaptions: ['Prayer in community', 'Real stories of faith', 'Worship that becomes a way of life'],
    welcomeLabel: '01 / Welcome',
    welcomeTitle: ['Church can be a place', 'to breathe again.'],
    welcomeLead: 'You do not need to perform, pretend, or have every answer before you walk through the door.',
    welcomeBody: 'Three languages in one room, and several generations with them. Come with your questions. What holds us together is Jesus, prayer, and a friendship that outlasts Sunday.',
    leadershipLabel: '02 / Leadership',
    leadershipTitle: ['Leaders who stay', 'close to people.'],
    leadershipLead: 'A pastoral team committed to Scripture, to prayer, and to a church where people are actually known by name.',
    leadershipBody: 'We belong to the wider Christian Hope movement, with roots in Ukraine. Our leaders shepherd this congregation, raise up the next ones, and keep the ties that send people out.',
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
    missionBody: 'Trials do not cancel a calling. Our mission starts on Pan American Boulevard and runs through real relationships — into the churches we came from, and out to the ones being planted now.',
    missionItems: [
      ['Witness at home', 'Equipping ordinary people to speak about Jesus without a script, in everyday life.'],
      ['Ukraine', 'Standing with the churches of our movement through a war that has not stopped the gospel.'],
      ['Sent to Miami', 'A new congregation planted this year, sent out from this church family.'],
    ],
    missionStory: 'Watch a mission story',
    watchLabel: '05 / Watch & listen',
    watchTitle: 'From the room to wherever you are.',
    watchIntro: 'Messages, conversations, testimonies, and worship from the Christian Hope YouTube channel.',
    openYoutube: 'Open on YouTube',
    nowPlaying: 'Now playing',
    play: 'Play',
    unmute: 'Unmute',
    mute: 'Mute',
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
    footerLine: 'Christian Hope · Християнська надія · Христианская Надежда',
    footerDescription: 'A church family in North Port with roots in Ukraine, following Jesus in three languages and carrying living hope wherever it is sent.',
  },
  uk: {
    language: 'Мова',
    nav: ['Про церкву', 'Лідерство', 'Місія', 'Дивитися', 'Завітайте'],
    donate: 'Пожертвувати',
    eyebrow: 'Християнська надія · Christian Hope · Норт-Порт, Флорида',
    heroTitle: ['Надія жива', 'і вона йде далі.'],
    heroBody: 'Церковна родина в Норт-Порті з корінням в Україні — ми поклоняємося українською, російською й англійською. Поки людям потрібна надія — Церква йде вперед.',
    visitCta: 'Запланувати візит',
    watchCta: 'Дивитися останню проповідь',
    giveCta: 'Пожертвувати',
    heroCaptions: ['Молитва у спільноті', 'Справжні історії віри', 'Поклоніння як спосіб життя'],
    welcomeLabel: '01 / Ласкаво просимо',
    welcomeTitle: ['Церква може стати місцем,', 'де знову легко дихати.'],
    welcomeLead: 'Вам не потрібно грати роль, удавати чи мати всі відповіді, перш ніж зайти у двері.',
    welcomeBody: 'Три мови в одному залі й кілька поколінь разом. Приходьте зі своїми запитаннями. Нас тримає разом Ісус, молитва й дружба, яка триває довше за неділю.',
    leadershipLabel: '02 / Лідерство',
    leadershipTitle: ['Лідери, які залишаються', 'поруч із людьми.'],
    leadershipLead: 'Пасторська команда, віддана Писанню, молитві та церкві, де людей справді знають на ім’я.',
    leadershipBody: 'Ми частина ширшого руху «Християнська надія» із корінням в Україні. Наші лідери піклуються про цю громаду, готують наступних і зберігають зв’язки, які посилають людей.',
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
    missionBody: 'Випробування не скасовують покликання. Наша місія починається на Pan American Boulevard і йде живими стосунками — до церков, з яких ми вийшли, і до тих, які засновуються зараз.',
    missionItems: [
      ['Свідчення вдома', 'Допомагаємо звичайним людям говорити про Ісуса без сценарію — у звичайному житті.'],
      ['Україна', 'Стоїмо поруч із церквами нашого руху крізь війну, яка не зупинила Євангелія.'],
      ['Послані в Маямі', 'Нова громада, заснована цього року й послана з нашої церковної родини.'],
    ],
    missionStory: 'Дивитися місіонерську історію',
    watchLabel: '05 / Дивитися й слухати',
    watchTitle: 'Із залу — туди, де ви є.',
    watchIntro: 'Проповіді, розмови, свідчення та поклоніння з YouTube-каналу Christian Hope.',
    openYoutube: 'Відкрити на YouTube',
    nowPlaying: 'Зараз грає',
    play: 'Відтворити',
    unmute: 'Увімкнути звук',
    mute: 'Вимкнути звук',
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
    footerLine: 'Christian Hope · Християнська надія · Христианская Надежда',
    footerDescription: 'Церковна родина в Норт-Порті з корінням в Україні: йдемо за Ісусом трьома мовами й несемо живу надію туди, куди посилає Бог.',
  },
  ru: {
    language: 'Язык',
    nav: ['О церкви', 'Лидерство', 'Миссия', 'Смотреть', 'Посетить'],
    donate: 'Пожертвовать',
    eyebrow: 'Христианская Надежда · Christian Hope · Норт-Порт, Флорида',
    heroTitle: ['Надежда жива', 'и она идёт дальше.'],
    heroBody: 'Церковная семья в Норт-Порте с корнями в Украине — мы поклоняемся на украинском, русском и английском. Пока людям нужна надежда, Церковь идёт вперёд.',
    visitCta: 'Запланировать визит',
    watchCta: 'Смотреть последнюю проповедь',
    giveCta: 'Пожертвовать',
    heroCaptions: ['Молитва в общине', 'Настоящие истории веры', 'Поклонение как образ жизни'],
    welcomeLabel: '01 / Добро пожаловать',
    welcomeTitle: ['Церковь может стать местом,', 'где снова легко дышать.'],
    welcomeLead: 'Вам не нужно играть роль, притворяться или знать все ответы, прежде чем войти в дверь.',
    welcomeBody: 'Три языка в одном зале и несколько поколений вместе. Приходите со своими вопросами. Нас держит Иисус, молитва и дружба, которая длится дольше воскресенья.',
    leadershipLabel: '02 / Лидерство',
    leadershipTitle: ['Лидеры, которые остаются', 'рядом с людьми.'],
    leadershipLead: 'Пасторская команда, преданная Писанию, молитве и церкви, где людей действительно знают по имени.',
    leadershipBody: 'Мы часть движения «Христианская Надежда» с корнями в Украине. Наши лидеры заботятся об этой общине, готовят следующих и хранят связи, которые посылают людей дальше.',
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
    missionBody: 'Испытания не отменяют призвания. Наша миссия начинается на Pan American Boulevard и идёт живыми отношениями — к церквям, из которых мы вышли, и к тем, что основываются сейчас.',
    missionItems: [
      ['Свидетельство дома', 'Помогаем обычным людям говорить об Иисусе без сценария — в повседневной жизни.'],
      ['Украина', 'Стоим рядом с церквями нашего движения через войну, которая не остановила Евангелие.'],
      ['Посланы в Майами', 'Новая община, основанная в этом году и посланная из нашей церковной семьи.'],
    ],
    missionStory: 'Смотреть миссионерскую историю',
    watchLabel: '05 / Смотреть и слушать',
    watchTitle: 'Из зала — туда, где вы находитесь.',
    watchIntro: 'Проповеди, разговоры, свидетельства и поклонение с YouTube-канала Christian Hope.',
    openYoutube: 'Открыть на YouTube',
    nowPlaying: 'Сейчас играет',
    play: 'Воспроизвести',
    unmute: 'Включить звук',
    mute: 'Выключить звук',
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
    footerLine: 'Christian Hope · Християнська надія · Христианская Надежда',
    footerDescription: 'Церковная семья в Норт-Порте с корнями в Украине: идём за Иисусом на трёх языках и несём живую надежду туда, куда посылает Бог.',
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
  const nav = useRef<HTMLElement>(null);
  const heroFrame = useRef<HTMLIFrameElement>(null);
  const watchFrame = useRef<HTMLIFrameElement>(null);
  const [unmuted, setUnmuted] = useState<'hero' | 'watch' | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const videoSection = useRef<HTMLElement>(null);
  const videoRail = useRef<HTMLDivElement>(null);
  const videoProgressBar = useRef<HTMLSpanElement>(null);
  // Set once the visitor drives the rail themselves; page scroll stops moving
  // it from under their finger until the section has left the viewport again.
  const railManual = useRef(false);
  const videos = [
    { id: 'PaYleMiqKyY', title: 'ОГОНЬ ЕДИНСТВА! One Spirit' },
    { id: 'JCYdslrd_Qs', title: 'Культура Церкви · Воскресное служение' },
    { id: 'tXB76Y9uKW4', title: 'Человек молитвы · Виктор Кашубин' },
    { id: 'b7Pk1Ry8ifY', title: 'Разговор о вере и служении · Григорий Радион' },
    { id: 'PtdTWE0OYS0', title: 'Pastor Valentin · Conversation' },
    { id: 'dExjSLaZfDM', title: 'Ministry in Pakistan · Pastor Sohail Rana' },
    { id: 'iXlz40MKF_E', title: 'Our Jesus is alive — He is risen!' },
    { id: '-uIO_nfTm1E', title: 'Обновление разума · Часть 1' },
    { id: 'bpeEPKM_2_g', title: 'Обновление разума · Часть 2' },
    { id: 'iCarJq9_JPY', title: 'Сила Божьего Слова · Виктор Нагирняк' },
    { id: '_qzaRlGrN94', title: 'Тайна причастия · Кто достоин' },
  ];
  // The hero carries videos[0]; the watch section leads with the next one, and
  // the rail below holds everything except the one already playing above it.
  const featured = videos[1];
  const railVideos = videos.filter((video) => video.id !== featured.id);
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
    const updateHeader = () => {
      setScrolled(window.scrollY > 48);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      nav.current?.style.setProperty('--lr-progress', max > 0 ? String(Math.min(1, window.scrollY / max)) : '0');
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    return () => {
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, []);

  // Menu: lock the page behind the drawer, and let Escape close it.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

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

  // The video rail drifts sideways as the section crosses the viewport. It is a
  // real scroll container at every width, so swipe, trackpad and the arrows all
  // work; page scroll just eases it along. This replaces the sticky pin, which
  // bought its scrub distance with a screen of empty section underneath.
  useEffect(() => {
    const rail = videoRail.current;
    const section = videoSection.current;
    const progressBar = videoProgressBar.current;
    if (!rail || !section || !progressBar) return;

    let frame = 0;
    // The last offset this effect wrote. A rail scroll that does not match it
    // came from the visitor, which is the only reliable signal of intent: a
    // touchstart on the rail is usually just a finger about to scroll the page.
    let written = -1;
    // Our own position, eased toward the scroll-derived target. Scroll events
    // arrive coarsely during a fling, especially on a phone, so writing the
    // target straight to scrollLeft steps and then snaps when scrolling stops.
    let current = -1;

    const updateScrub = () => {
      frame = 0;
      const travel = rail.scrollWidth - rail.clientWidth;
      if (travel <= 0) {
        progressBar.style.width = '0%';
        return;
      }
      // With a long rail, panning all of it inside one crossing would blur the
      // cards past. Page scroll covers about five cards; drag and the arrows
      // reach the rest.
      const card = rail.firstElementChild as HTMLElement | null;
      const pan = Math.min(travel, card ? (card.offsetWidth + 18) * 5 : travel);
      const rect = section.getBoundingClientRect();
      // Fully past the viewport in either direction: hand the rail back to the
      // page so a later visit starts from the top of the drift again.
      if (rect.bottom < 0 || rect.top > window.innerHeight) railManual.current = false;
      if (!railManual.current) {
        const crossed = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        // Spend the travel between 34% and 70% of the crossing: 34% is roughly
        // where the rail clears the bottom of the viewport, 70% is where it is
        // fully in view again near the top. Outside that the cards would pan
        // while nobody can see them.
        const progress = Math.min(1, Math.max(0, (crossed - 0.34) / 0.36));
        const target = progress * pan;
        if (current < 0) current = rail.scrollLeft;
        const delta = target - current;
        current = Math.max(0, Math.min(travel, Math.abs(delta) < 0.5 ? target : current + delta * 0.18));
        rail.scrollLeft = current;
        written = rail.scrollLeft;
        // Keep animating until it settles, so the rail glides to a stop rather
        // than jumping to wherever the last scroll event left it.
        if (Math.abs(target - current) > 0.3) frame = window.requestAnimationFrame(updateScrub);
      } else {
        current = -1;
      }
      progressBar.style.width = `${Math.min(1, Math.max(0, rail.scrollLeft / travel)) * 100}%`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrub);
    };
    const onRailScroll = () => {
      if (written >= 0 && Math.abs(rail.scrollLeft - written) > 2) railManual.current = true;
      requestUpdate();
    };
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(rail);
    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    rail.addEventListener('scroll', onRailScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      rail.removeEventListener('scroll', onRailScroll);
    };
  }, [language]);

  // Both players start muted, because that is the only way a browser will
  // autoplay them. Sound is a YouTube iframe-API command over postMessage,
  // which needs no extra script — just enablejsapi=1 on the embed. Only one
  // player carries sound at a time; unmuting one mutes the other.
  const command = (frame: HTMLIFrameElement | null, func: string) =>
    frame?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');

  const toggleSound = (which: 'hero' | 'watch') => {
    const frames = { hero: heroFrame.current, watch: watchFrame.current };
    if (unmuted === which) {
      command(frames[which], 'mute');
      setUnmuted(null);
      return;
    }
    if (unmuted) command(frames[unmuted], 'mute');
    command(frames[which], 'unMute');
    command(frames[which], 'playVideo');
    setUnmuted(which);
  };

  // Both players now show YouTube's own controls, so sound can change without
  // going through the pill. Listen to what the players actually report, so the
  // label stays truthful and one player still mutes the other either way.
  useEffect(() => {
    const frames = () => ({ hero: heroFrame.current, watch: watchFrame.current });
    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return;
      let data: { event?: string; info?: { muted?: boolean } };
      try { data = JSON.parse(event.data); } catch { return; }
      if (data.event !== 'infoDelivery' || !data.info || typeof data.info.muted !== 'boolean') return;
      const f = frames();
      const which = event.source === f.hero?.contentWindow ? 'hero'
        : event.source === f.watch?.contentWindow ? 'watch' : null;
      if (!which) return;
      const other = which === 'hero' ? 'watch' : 'hero';
      if (data.info.muted) {
        setUnmuted((prev) => (prev === which ? null : prev));
      } else {
        setUnmuted((prev) => {
          if (prev === which) return prev;
          command(f[other], 'mute');
          return which;
        });
      }
    };
    // The players only report anything once the page opens their API channel.
    const listen = () => Object.values(frames()).forEach((frame) =>
      frame?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), '*'));
    window.addEventListener('message', onMessage);
    const timers = [window.setTimeout(listen, 1500), window.setTimeout(listen, 4000)];
    return () => {
      window.removeEventListener('message', onMessage);
      timers.forEach(window.clearTimeout);
    };
  }, []);

  const soundButton = (which: 'hero' | 'watch') => (
    <button type="button" className="lr-sound" data-muted={unmuted !== which} onClick={() => toggleSound(which)}>
      {unmuted === which ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
      <span>{unmuted === which ? c.mute : c.unmute}</span>
    </button>
  );

  // Drag to scroll the rail. Mouse only: touch already gets native momentum
  // scrolling from overflow-x, and capturing those pointers would fight it.
  useEffect(() => {
    const rail = videoRail.current;
    if (!rail) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let travelled = 0;

    // Capture starts only once the pointer has actually moved. Capturing on
    // pointerdown retargets the click to the rail, and a plain click on a
    // thumbnail would never reach its play button.
    let capturing = false;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      down = true;
      capturing = false;
      travelled = 0;
      startX = event.clientX;
      startLeft = rail.scrollLeft;
    };
    const onMove = (event: PointerEvent) => {
      if (!down) return;
      const dx = event.clientX - startX;
      travelled = Math.max(travelled, Math.abs(dx));
      if (!capturing && travelled > 4) {
        capturing = true;
        railManual.current = true;
        rail.setPointerCapture(event.pointerId);
        rail.classList.add('is-dragging');
      }
      if (capturing) rail.scrollLeft = startLeft - dx;
    };
    const onUp = (event: PointerEvent) => {
      if (!down) return;
      down = false;
      if (capturing && rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
      capturing = false;
      rail.classList.remove('is-dragging');
    };
    // A drag that ends over a thumbnail must not also start the video.
    const onClick = (event: MouseEvent) => {
      if (travelled > 6) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    rail.addEventListener('pointerdown', onDown);
    rail.addEventListener('pointermove', onMove);
    rail.addEventListener('pointerup', onUp);
    rail.addEventListener('pointercancel', onUp);
    rail.addEventListener('click', onClick, true);
    rail.addEventListener('dragstart', (event) => event.preventDefault());
    return () => {
      rail.removeEventListener('pointerdown', onDown);
      rail.removeEventListener('pointermove', onMove);
      rail.removeEventListener('pointerup', onUp);
      rail.removeEventListener('pointercancel', onUp);
      rail.removeEventListener('click', onClick, true);
    };
  }, []);

  const scrollVideos = (direction: -1 | 1) => {
    const rail = videoRail.current;
    if (!rail) return;
    railManual.current = true;
    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 18 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <main className="legacy-revival" lang={language}>
      <header className="lr-nav" data-scrolled={scrolled} ref={nav}>
        <a href="#lr-main"><Logo /></a>
        <nav id="lr-nav-menu" data-open={menuOpen} className={swapping ? 'lr-nav-links is-swapping' : 'lr-nav-links'}>{c.nav.map((label, index) => <a key={label} style={{ '--i': index } as CSSProperties} href={['#lr-story', '#lr-leadership', '#lr-missions', '#lr-watch', '#lr-visit'][index]} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="lr-menu-donate" style={{ '--i': c.nav.length } as CSSProperties} href={GIVE} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}><Heart aria-hidden="true" /> {c.donate}</a></nav>
        <div className="lr-nav-tools">
          <button type="button" className="lr-nav-toggle" data-open={menuOpen} aria-expanded={menuOpen} aria-controls="lr-nav-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}><span className="lr-burger" aria-hidden="true"><i /><i /><i /></span></button>
          <fieldset className="lr-language-picker" aria-label={c.language}>
            <Globe2 aria-hidden="true" />
            {revivalLanguages.map((item) => <button key={item.code} type="button" aria-label={item.name} aria-pressed={language === item.code} onClick={() => swapLanguage(item.code)}>{item.label}</button>)}
          </fieldset>
          <a className="lr-donate" href={GIVE} target="_blank" rel="noreferrer"><Heart aria-hidden="true" /> {c.donate}</a>
        </div>
        <span className="lr-nav-progress" aria-hidden="true" />
      </header>
      <div className="lr-nav-scrim" data-open={menuOpen} aria-hidden="true" onClick={() => setMenuOpen(false)} />

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
          <div className="lr-hero-video">
            <iframe
              ref={heroFrame}
              src={`https://www.youtube-nocookie.com/embed/${videos[0].id}?autoplay=1&mute=1&playsinline=1&rel=0&enablejsapi=1`}
              title={`${c.nowPlaying}: ${videos[0].title}`}
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
            {soundButton('hero')}
          </div>
          <figure><img className="lr-parallax-media" src="media/service-preaching-01.webp" alt={c.heroCaptions[1]} /></figure>
          <figure><img className="lr-parallax-media" src="media/service-worship-wide.webp" alt={c.heroCaptions[2]} /></figure>
        </div>
      </section>

      <section className="lr-marquee" aria-label="Christian Hope Church message">
        <div className="lr-marquee-track">
          {[0, 1, 2].map((copyIndex) => (
            <div className="lr-marquee-group" aria-hidden={copyIndex > 0} key={copyIndex}>
              {['Hope is alive', 'Надія жива', 'Надежда жива', 'Worship', 'Prayer', 'Family', 'Ukraine · North Port · Miami', 'North Port to the nations'].map((item) => <span key={item}>{item}</span>)}
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
        <div className="lr-watch-panel">
          <header><span>{c.watchLabel}</span><h2>{c.watchTitle}</h2><p>{c.watchIntro}</p></header>
          <div className="lr-watch-feature">
            <div className="lr-video-frame">
              <iframe
                ref={watchFrame}
                src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={`${c.nowPlaying}: ${featured.title}`}
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
              {soundButton('watch')}
            </div>
            <div>
              <span>{c.nowPlaying}</span>
              <h3>{featured.title}</h3>
              <a href={`https://www.youtube.com/watch?v=${featured.id}`} target="_blank" rel="noreferrer">{c.openYoutube} <ArrowUpRight /></a>
            </div>
          </div>
          <div className="lr-watch-track" ref={videoRail}>
            {railVideos.map((video, index) => (
              <article key={video.id}>
                <div className="lr-video-frame">
                  {playing === video.id ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
                      title={video.title}
                      allow="autoplay; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button type="button" className="lr-watch-play" onClick={() => setPlaying(video.id)} aria-label={`${c.play}: ${video.title}`}>
                      <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
                      <span aria-hidden="true"><Play fill="currentColor" /></span>
                    </button>
                  )}
                </div>
                <div>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{video.title}</h3>
                  <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">{c.openYoutube} <ArrowUpRight /></a>
                </div>
              </article>
            ))}
          </div>
          <div className="lr-watch-controls">
            <button type="button" onClick={() => scrollVideos(-1)} aria-label="Previous videos"><ArrowLeft /></button>
            <div className="lr-watch-progress" aria-hidden="true"><span ref={videoProgressBar} /></div>
            <button type="button" onClick={() => scrollVideos(1)} aria-label="Next videos"><ArrowRight /></button>
          </div>
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
