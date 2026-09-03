'use client';

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BookOpen,
  Clock3,
  Globe2,
  HandHeart,
  Headphones,
  Heart,
  Languages,
  MapPin,
  Music2,
  Play,
  Sparkles,
  Users,
  Video,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './legacy.css';

const INSTAGRAM = 'https://www.instagram.com/christianhopechurchfl/';
const YOUTUBE = 'https://www.youtube.com/@ChristianHopeChurchfl';
const GIVE = 'https://give.tithe.ly/?formId=19ee2214-9179-41b7-b8a1-60cbb330bb9c';
const MAP = 'https://maps.apple.com/?address=2800%20Pan%20American%20Blvd%2C%20North%20Port%2C%20FL%2034287';

const concepts = [
  { id: 'revival', number: '01', name: 'Revival', note: 'Expressive' },
  { id: 'homecoming', number: '02', name: 'Homecoming', note: 'Pastoral' },
  { id: 'signal', number: '03', name: 'Signal', note: 'Bold' },
  { id: 'table', number: '04', name: 'The Table', note: 'Community' },
  { id: 'presence', number: '05', name: 'Presence', note: 'Contemplative' },
] as const;

type Concept = (typeof concepts)[number]['id'];
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

function VisitLink({ light = false }: { light?: boolean }) {
  return <a className={light ? 'legacy-button legacy-button--light' : 'legacy-button'} href={MAP} target="_blank" rel="noreferrer">Get directions <ArrowUpRight /></a>;
}

function Revival({ language, onLanguageChange }: { language: RevivalLanguage; onLanguageChange: (language: RevivalLanguage) => void }) {
  const c = revivalCopy[language];
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    let frame = 0;
    const updateScrub = () => {
      frame = 0;
      const section = videoSection.current;
      const rail = videoRail.current;
      const progressBar = videoProgressBar.current;
      if (!section || !rail || !progressBar) return;

      if (window.matchMedia('(max-width: 720px)').matches) {
        section.style.height = 'auto';
        rail.style.transform = 'none';
        progressBar.style.width = '0%';
        videoProgressValue.current = 0;
        return;
      }

      const travel = Math.max(0, rail.scrollWidth - window.innerWidth);
      const scrollLength = Math.max(travel, window.innerHeight * 0.8);
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / scrollLength));

      section.style.height = `${window.innerHeight + scrollLength}px`;
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
    if (window.matchMedia('(max-width: 720px)').matches) {
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
        <nav key={`nav-${language}`} className="lr-nav-links">{c.nav.map((label, index) => <a key={label} href={['#lr-story', '#lr-leadership', '#lr-missions', '#lr-watch', '#lr-visit'][index]}>{label}</a>)}</nav>
        <div className="lr-nav-tools">
          <fieldset className="lr-language-picker" aria-label={c.language}>
            <Globe2 aria-hidden="true" />
            {revivalLanguages.map((item) => <button key={item.code} type="button" title={item.name} aria-pressed={language === item.code} onClick={() => onLanguageChange(item.code)}>{item.label}</button>)}
          </fieldset>
          <a className="lr-donate" href={GIVE} target="_blank" rel="noreferrer"><Heart aria-hidden="true" /> {c.donate}</a>
        </div>
      </header>

      <div key={language} className="lr-language-content">

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

function Homecoming() {
  return (
    <main className="legacy-homecoming">
      <header className="lh-nav"><a href="#lh-main"><Logo /></a><nav><a href="#lh-story">Our church</a><a href="#lh-sunday">This Sunday</a><a href="#lh-visit">Visit</a></nav><a href={GIVE} target="_blank" rel="noreferrer"><Heart /> Give</a></header>
      <section className="lh-hero" id="lh-main"><div><p>CHRISTIAN HOPE · NORTH PORT</p><h1>There’s a place<br />for you <i>here.</i></h1><span>Come find a church family where faith feels honest, people know your name, and nobody has to have it all figured out.</span><a href="#lh-visit">Come this Sunday <ArrowRight /></a></div><figure><img src="media/church-family-editorial.webp" alt="Christian Hope leaders together" /><figcaption><b>WELCOME HOME</b><span>One body. Many stories. One hope.</span></figcaption></figure></section>
      <section className="lh-story" id="lh-story"><figure><img src="media/prayer-editorial.webp" alt="Christian Hope leaders praying" /></figure><div><p>ROOM TO BREATHE</p><h2>A church that feels like people, not a production.</h2><span>We worship, open Scripture, pray honestly, share meals, and keep showing up for one another.</span></div><figure><img src="media/testimony-editorial.webp" alt="A woman sharing her story" /><figcaption>Every story matters.</figcaption></figure></section>
      <section className="lh-sunday" id="lh-sunday"><header><p>YOUR FIRST SUNDAY</p><h2>Here’s what to expect.</h2></header><div><article><Clock3 /><span>01</span><h3>Arrive easy</h3><p>Check the weekly gathering details and come a few minutes early.</p></article><article><Music2 /><span>02</span><h3>Worship together</h3><p>Expect heartfelt worship, prayer, and teaching centered on Jesus.</p></article><article><Users /><span>03</span><h3>Stay for hello</h3><p>No pressure—just people who would genuinely like to meet you.</p></article></div></section>
      <section className="lh-mission"><div><p>OUR GLOBAL FAMILY</p><h2>Rooted at home.<br />Open to the world.</h2><span>Prayer, evangelism, and relationships across cultures carry our faith beyond the walls of a Sunday gathering.</span><a href="https://www.youtube.com/watch?v=dExjSLaZfDM" target="_blank" rel="noreferrer"><Play fill="currentColor" /> Ministry in Pakistan</a></div><figure><img src="media/social-02.jpg" alt="Christian Hope leaders at a ministry conference" /></figure></section>
      <section className="lh-visit" id="lh-visit"><div><p>COME ON OVER</p><h2>The door is open.</h2><span>We would love to welcome you and help your first visit feel simple.</span></div><address><MapPin /><strong>2800 Pan American Blvd<br />North Port, FL 34287</strong><small>See Instagram for current gathering details.</small><VisitLink /><a href={INSTAGRAM} target="_blank" rel="noreferrer">This week on Instagram <ArrowUpRight /></a></address></section>
      <footer className="lh-footer"><Logo inverse /><p>English · Українська · Русский</p><span>North Port, Florida</span></footer>
    </main>
  );
}

function Signal() {
  return (
    <main className="legacy-signal">
      <div className="ls-ticker"><span>CHRISTIAN HOPE CHURCH</span><p>ONE BODY / MANY STORIES / ONE HOPE</p><a href={INSTAGRAM} target="_blank" rel="noreferrer">LIVE UPDATES ↗</a></div>
      <header className="ls-rail"><a href="#ls-main"><Logo inverse mark /></a><nav><a href="#ls-start">Start</a><a href="#ls-watch">Watch</a><a href="#ls-visit">Visit</a></nav><span>NP / FL</span></header>
      <section className="ls-hero" id="ls-main"><div><p><Sparkles /> THIS IS YOUR SIGN</p><h1>YOU<br />BELONG<br /><i>HERE.</i></h1><a href="#ls-start">Find your next step <ArrowRight /></a></div><figure><img src="media/worship-keys-editorial.webp" alt="Worship at Christian Hope Church" /><figcaption><span>SUNDAY</span><b>HOPE<br />IS LIVE</b></figcaption></figure></section>
      <div className="ls-marquee">WORSHIP / WORD / PRAYER / FAMILY / ДОБРО ПОЖАЛОВАТЬ / ЛАСКАВО ПРОСИМО /</div>
      <section className="ls-belief"><span>THE SIGNAL / 01</span><h2>CHURCH ISN’T<br />A SPECTATOR<br /><i>SPORT.</i></h2><div><p>Bring your questions. Bring your story. Bring the week you actually had.</p><p>Christian Hope is built around Jesus, honest worship, practical teaching, prayer, and people who show up.</p></div></section>
      <section className="ls-start" id="ls-start"><header><p>START WHERE YOU ARE</p><h2>DON’T JUST<br />SCROLL.<br /><span>STEP IN.</span></h2></header><div><a href="#ls-visit"><MapPin /><span>01</span><h3>Visit this Sunday</h3><p>Get the address and know what to expect.</p><ArrowUpRight /></a><a href="#ls-watch"><Headphones /><span>02</span><h3>Hear a message</h3><p>Start with a recent conversation.</p><ArrowUpRight /></a><a href={INSTAGRAM} target="_blank" rel="noreferrer"><Users /><span>03</span><h3>Meet the community</h3><p>See what is happening this week.</p><ArrowUpRight /></a></div></section>
      <section className="ls-watch" id="ls-watch"><figure><img src="media/conversation-editorial.webp" alt="A Christian Hope conversation being filmed" /></figure><div><p>ON DEMAND / CHC YOUTUBE</p><h2>FAITH FOR<br />REAL LIFE.</h2><a href="https://www.youtube.com/watch?v=b7Pk1Ry8ifY" target="_blank" rel="noreferrer"><Play fill="currentColor" /> Play the conversation</a></div></section>
      <section className="ls-visit" id="ls-visit"><p>YOUR NEXT MOVE</p><h2>SEE YOU<br />IN NORTH PORT.</h2><div><MapPin /><address>2800 Pan American Blvd<br />North Port, FL 34287</address><VisitLink /></div></section>
      <footer className="ls-footer"><Logo inverse /><span>EN / УКР / RU</span><span>© 2026 CHC</span></footer>
    </main>
  );
}

function Table() {
  return (
    <main className="legacy-table">
      <header className="lt-nav"><a href="#lt-main"><Logo /></a><nav><a href="#lt-story">Our story</a><a href="#lt-life">Life together</a><a href="#lt-visit">Come this Sunday</a></nav></header>
      <section className="lt-hero" id="lt-main"><figure><img src="media/church-family-editorial.webp" alt="Christian Hope leaders together" /><figcaption>Real people. Shared faith. Plenty of room.</figcaption></figure><div><p>A CHURCH FAMILY IN NORTH PORT</p><h1>Pull up<br />a chair.</h1><span>You were never meant to do life alone. Meet a warm, multicultural community learning the way of Jesus together.</span><a href="#lt-visit">Plan your first visit <ArrowRight /></a></div></section>
      <section className="lt-story" id="lt-story"><div><p>WELCOME, REALLY.</p><h2>Come curious.<br />Come hopeful.<br /><i>Come as you are.</i></h2></div><div><strong>Whether church is familiar or completely new, there is a place to begin here.</strong><p>We worship, learn Scripture, pray for one another, and make space for friendships that carry into the rest of the week.</p></div></section>
      <section className="lt-life" id="lt-life"><header><p>AROUND THE TABLE</p><h2>How we grow together</h2></header><div><article><span>01</span><h3>We gather</h3><p>Worship and biblical teaching give our week a center.</p></article><article><span>02</span><h3>We listen</h3><p>Questions are welcome. Stories matter. Prayer is personal.</p></article><article><span>03</span><h3>We carry</h3><p>We notice needs and show up for one another.</p></article></div><figure><img src="media/prayer-editorial.webp" alt="Christian Hope leaders praying" /><figcaption><Languages /> English · Українська · Русский</figcaption></figure></section>
      <section className="lt-invite"><figure><img src="media/testimony-editorial.webp" alt="A woman sharing her story" /></figure><blockquote>“Church becomes home one conversation at a time.”<span>START WITH HELLO</span></blockquote></section>
      <section className="lt-visit" id="lt-visit"><div><p>THIS SUNDAY</p><h2>We saved you a seat.</h2><span>Current gathering details are posted each week on Instagram.</span></div><address><MapPin /><strong>2800 Pan American Blvd<br />North Port, FL 34287</strong><VisitLink /><a href={INSTAGRAM} target="_blank" rel="noreferrer">See latest updates <AtSign /></a></address></section>
      <footer className="lt-footer"><Logo inverse /><p>Encounter God · Find community · Carry hope</p><span>North Port, Florida</span></footer>
    </main>
  );
}

function Presence() {
  return (
    <main className="legacy-presence">
      <header className="lp-nav"><a href="#lp-main"><Logo inverse mark /></a><span>Christian Hope Church</span><nav><a href="#lp-story">Discover</a><a href="#lp-visit">Visit</a></nav></header>
      <section className="lp-hero" id="lp-main"><figure><img src="media/community-prayer-original-editorial.webp" alt="A quiet moment of prayer" /></figure><div><p>NORTH PORT, FLORIDA</p><h1>Be still.<br /><i>Hope is here.</i></h1><span>A place to encounter God, ask real questions, and become more like Jesus alongside people who care.</span><a href="#lp-story">Enter the story ↓</a></div></section>
      <section className="lp-story" id="lp-story"><p>OUR LIFE TOGETHER</p><h2>Transformation often begins in the quiet places—an honest prayer, an open Bible, a name remembered.</h2><div><strong>Christian Hope is a multilingual church family rooted in Jesus and present to one another.</strong><p>There is space here for wonder and questions, for joy and grief, for those arriving with strong faith and those simply hoping faith might be possible.</p></div></section>
      <section className="lp-practices"><header><p>A SHARED RHYTHM</p><h2>Small practices.<br /><i>Deep roots.</i></h2></header><div><article><span>01</span><h3>Gather</h3><p>We turn our attention toward God through worship, Scripture, and prayer.</p></article><article><span>02</span><h3>Listen</h3><p>We receive one another’s stories with patience, compassion, and hope.</p></article><article><span>03</span><h3>Practice</h3><p>We carry the way of Jesus into work, family, friendship, and service.</p></article></div></section>
      <section className="lp-prayer"><figure><img src="media/prayer-editorial.webp" alt="Christian Hope leaders praying" /></figure><div><p>PRAYER</p><h2>You do not have to carry it alone.</h2><span>Sometimes the most meaningful next step is simply letting someone know what is heavy. There is room to receive prayer here.</span><a href="#lp-visit">Meet us this week <ArrowRight /></a></div></section>
      <section className="lp-listen"><p>LISTEN</p><blockquote>“Faith for the life<br />you are actually living.”</blockquote><a href="https://www.youtube.com/watch?v=b7Pk1Ry8ifY" target="_blank" rel="noreferrer"><Play fill="currentColor" /> Watch a recent conversation</a></section>
      <section className="lp-visit" id="lp-visit"><div><p>WHEN YOU’RE READY</p><h2>Come and see.</h2></div><address><MapPin /><strong>2800 Pan American Blvd<br />North Port, FL 34287</strong><small>See Instagram for current gathering details.</small><VisitLink light /></address></section>
      <footer className="lp-footer"><Logo inverse /><p>English · Українська · Русский</p><span>© 2026 Christian Hope Church</span></footer>
    </main>
  );
}

function LegacySwitcher({ concept, onChange }: { concept: Concept; onChange: (concept: Concept) => void }) {
  return (
    <div className="legacy-switcher" aria-label="Original design direction switcher">
      <a href="/" aria-label="Back to new concepts"><ArrowLeft /><span>New set</span></a>
      <div>{concepts.map((item) => <button key={item.id} type="button" data-active={concept === item.id} onClick={() => onChange(item.id)}><span>{item.number}</span><b>{item.name}</b><small>{item.note}</small></button>)}</div>
    </div>
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
