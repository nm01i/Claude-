// Single editable source for all copy. Edit here; components only render this data.

export const profile = {
  name: 'Anastasiia Trapeznikova',
  firstName: 'Anastasiia',
  title: 'Web & UI/UX Designer',
  positioning:
    'I design modern, intuitive, and responsive websites with a focus on clear structure, thoughtful user experience, and strong visual design.',
  intro:
    'I turn ideas into clear, engaging digital experiences. My approach combines visual design, usability, and thoughtful interactions to create websites that look distinctive and work intuitively.',
  primaryCta: 'View My Work',
  secondaryCta: 'Let’s Talk',
};

export const about = {
  heading: 'About me',
  paragraphs: [
    'I’m a web and UI/UX designer interested in creating digital experiences that balance aesthetics and usability.',
    'I work on website structure, user flows, wireframes, interface design, responsive layouts, and interactive prototypes. I pay attention to typography, visual hierarchy, consistency, and the details that make a website intuitive to use.',
    'My goal is to create websites that are not only visually appealing but also communicate clearly and help users achieve their goals.',
  ],
};

export type ProjectImage = {
  src: string;
  alt: string;
  /** Intrinsic size, used to reserve space and avoid layout shift. */
  width: number;
  height: number;
  caption?: string;
  /** Phone-sized screenshot: shown in a compact row instead of full width. */
  mobile?: boolean;
};

const base = import.meta.env.BASE_URL;
const shot = (path: string, width: number, height: number, alt: string, extra: { caption?: string; mobile?: boolean } = {}): ProjectImage =>
  ({ src: `${base}projects/${path}.webp`, width, height, alt, ...extra });

/** A case-study section. Only sections with real material should be defined. */
export type CaseBlock = { body?: string; points?: string[] };

export type CaseStudyContent = {
  overview?: CaseBlock;
  brief?: CaseBlock;
  audience?: CaseBlock;
  challenge?: CaseBlock;
  process?: CaseBlock;
  decisions?: CaseBlock;
  visual?: CaseBlock;
  reflection?: CaseBlock;
};

export const caseSections: { key: keyof CaseStudyContent; label: string }[] = [
  { key: 'overview', label: 'Project overview' },
  { key: 'brief', label: 'Brief and objectives' },
  { key: 'audience', label: 'Target audience' },
  { key: 'challenge', label: 'Design challenge' },
  { key: 'process', label: 'Design process' },
  { key: 'decisions', label: 'Key UX decisions' },
  { key: 'visual', label: 'Visual design and interface' },
  { key: 'reflection', label: 'Reflection / next steps' },
];

export type Project = {
  id: string;
  slug: string; // route: #project-<slug>
  number: string;
  title: string;
  category: string;
  /** Shown as a badge. Never claim "client work" or "launched" unless confirmed. */
  kind: string;
  description: string;
  /** Short list of focus areas; leave empty until known. */
  highlights: string[];
  /** Card preview, cropped to the card's aspect ratio. */
  coverImage: ProjectImage;
  /** Wide (21:9) crop for the case-study header. */
  heroImage: ProjectImage;
  /** Real screens for the case-study gallery, in reading order. */
  images: ProjectImage[];
  /** Only set when the real year is known. */
  year?: string;
  liveUrl?: string;
  /** Which pieces of the entry are still placeholders awaiting real content. */
  pending?: { description?: boolean; highlights?: boolean; kind?: boolean };
  caseStudy: CaseStudyContent;
};

export const projects: Project[] = [
  {
    id: 'triply',
    slug: 'triply',
    number: '01',
    title: 'TRIPLY',
    category: 'Travel Planning Platform / Product Design',
    kind: 'Concept project',
    description:
      'TRIPLY is a travel planning platform concept designed to help organize trips, build itineraries, manage travel details, and present personalized travel plans.',
    highlights: [
      'Information architecture',
      'Trip management interface',
      'Itinerary planning',
      'User flows',
      'Interface design',
    ],
    coverImage: shot('triply/cover', 1536, 1024, 'TRIPLY landing screen on a laptop and a phone: "Design the journey. Not just the destination." over a Kyoto street at sunset'),
    heroImage: shot('triply/wide', 2000, 857, 'TRIPLY landing screen: "Design the journey. Not just the destination." over a Kyoto street at sunset'),
    images: [
      shot('triply/intro', 2000, 1250, 'TRIPLY cinematic landing screen with the headline "Design the journey. Not just the destination."', { caption: 'Landing: scroll-driven intro' }),
      shot('triply/dashboard', 2000, 1667, 'TRIPLY dashboard with greeting "Good morning, Camille" and three trip folders: Japan, Amalfi and Norway', { caption: 'Dashboard: trips as folders' }),
      shot('triply/overview', 2000, 1667, 'TRIPLY Japan trip overview with trip details, a route map with three stops, an itinerary preview and trip progress', { caption: 'Trip overview' }),
      shot('triply/itinerary', 2000, 1667, 'TRIPLY itinerary tab: day selector 01 to 13, Tokyo Essentials with four timed stops and a route map', { caption: 'Itinerary: day by day, with route' }),
      shot('triply/bookings', 2000, 1667, 'TRIPLY bookings tab with a booking summary and a list of bookings with dates, costs and status', { caption: 'Bookings' }),
      shot('triply/client', 2000, 1667, 'TRIPLY client tab in designer view with group suggestions, votes and shared trip status', { caption: 'Client collaboration' }),
      shot('triply/m-dashboard', 780, 1688, 'TRIPLY dashboard on a phone', { mobile: true, caption: 'Phone: dashboard' }),
      shot('triply/m-overview', 780, 1688, 'TRIPLY trip overview on a phone', { mobile: true, caption: 'Phone: overview' }),
      shot('triply/m-itinerary', 780, 1688, 'TRIPLY itinerary on a phone', { mobile: true, caption: 'Phone: itinerary' }),
      shot('triply/m-intro', 780, 1688, 'TRIPLY landing screen on a phone', { mobile: true, caption: 'Phone: landing' }),
    ],
    caseStudy: {
      overview: {
        body:
          'TRIPLY is a concept for a travel planning platform that helps travel designers organize trips, build itineraries, manage trip details, and present personalized travel plans to clients. It is presented as a concept product, not a commercial SaaS.',
      },
      audience: { body: 'Travel designers who plan trips, and the clients who receive personalized travel plans.' },
    },
  },
  {
    id: 'lumie',
    slug: 'lumie',
    number: '02',
    title: 'LUMIÉ',
    category: 'Skincare E-commerce / Website Design',
    kind: 'Concept project',
    description:
      'LUMIÉ is a skincare e-commerce website concept focused on refined visual presentation, product discovery, and an intuitive shopping experience.',
    highlights: [
      'Homepage design',
      'Product catalog',
      'Product presentation',
      'E-commerce user experience',
      'Responsive layouts',
    ],
    coverImage: shot('lumie/cover', 1536, 1024, 'LUMIÉ homepage on a laptop: "Когда уход раскрывает свет кожи" beside a portrait of a model with a green clay mask'),
    heroImage: shot('lumie/wide', 1200, 514, 'LUMIÉ homepage hero: "Когда уход раскрывает свет кожи" next to a close-up portrait'),
    images: [
      shot('lumie/hero', 1200, 730, 'LUMIÉ homepage hero with navigation, headline and call to action to choose a skincare routine', { caption: 'Homepage hero' }),
      shot('lumie/categories', 1200, 1020, 'LUMIÉ category carousel (cleansing, cream, SPF, masks, toner) and the best products of 2025', { caption: 'Categories and best sellers' }),
      shot('lumie/about', 1200, 660, 'LUMIÉ section about Korean cosmetics with a brand ticker', { caption: 'About Korean cosmetics' }),
      shot('lumie/reviews', 1200, 450, 'LUMIÉ customer reviews shown as chat screenshots', { caption: 'Reviews' }),
      shot('lumie/results', 1200, 650, 'LUMIÉ results section with three skin-concern cards: sensitive skin, ready-made routine, dryness and tightness', { caption: 'Results by skin concern' }),
      shot('lumie/cta', 1200, 770, 'LUMIÉ closing call to action and footer with catalog and contact links', { caption: 'Call to action and footer' }),
    ],
    caseStudy: {
      overview: {
        body:
          'LUMIÉ is a skincare e-commerce website concept with a clean visual identity, clear product presentation, and an intuitive shopping experience.',
      },
    },
  },
  {
    id: 'muza',
    slug: 'muza',
    number: '03',
    title: 'MUZA',
    category: 'Website Design / UI/UX',
    kind: 'Project type to be confirmed',
    // Source: profile PDF ("MUZA (an AI-assisted interior design platform)"). Nothing else is known.
    description:
      'MUZA is an AI-assisted interior design platform. [Editable placeholder: add the project description, your role and the main design work here.]',
    highlights: [],
    coverImage: shot('muza/cover', 1536, 1024, 'MUZA homepage on a tablet: "Interior design, without the wait." over a rendered kitchen interior'),
    heroImage: shot('muza/wide', 2000, 857, 'MUZA pricing section with three plans on a dark interface'),
    images: [
      shot('muza/process', 2000, 1142, 'MUZA "Four steps. One of them is human." process section: AI scans your space, AI drafts concepts, designer refines it, final project', { caption: 'How it works: four steps' }),
      shot('muza/pricing', 2000, 1171, 'MUZA "Clear pricing. No hourly surprises." with Concept, Project and Full Service plans', { caption: 'Pricing' }),
      shot('muza/reviews', 2000, 1685, 'MUZA "Clients, unscripted." review cards', { caption: 'Client reviews' }),
    ],
    pending: { description: true, highlights: true, kind: true },
    caseStudy: {
      overview: { body: 'An AI-assisted interior design platform, as listed in the profile. The rest of the case study has not been written yet.' },
    },
  },
  {
    id: 'saas',
    slug: 'saas',
    number: '04',
    title: 'FlowAutomate',
    category: 'SaaS Website / UI/UX Design',
    kind: 'Project type to be confirmed',
    // Source: profile PDF ("a landing page for an AI automation SaaS product"). The listing
    // called this project "SAAS"; the route slug keeps that working name.
    description:
      'A landing page for an AI automation SaaS product. [Editable placeholder: add the product purpose, target audience and the interface work here.]',
    highlights: [],
    coverImage: shot('saas/cover', 1586, 992, 'Landing page "Automate Your Income with AI" on a desktop monitor'),
    heroImage: shot('saas/wide', 1200, 514, 'Dark AI-automation landing page hero: "Automate Your Income with AI"'),
    images: [
      shot('saas/hero', 1200, 850, 'AI-automation landing page hero with navigation, headline, two buttons and a glowing gradient background', { caption: 'Hero' }),
      shot('saas/learn-1', 1200, 1000, 'Landing page section "What You\'ll Learn" with step 01 Workflow Systems and step 02 AI Assistant', { caption: 'What you\'ll learn (1/2)' }),
      shot('saas/learn-2', 1200, 1050, 'Landing page steps 03 Real Projects and 04 Optimization with product interface cards', { caption: 'What you\'ll learn (2/2)' }),
      shot('saas/benefits', 1200, 610, 'Landing page results section with four benefit cards', { caption: 'What you\'ll achieve' }),
      shot('saas/pricing', 1200, 900, 'Landing page pricing: Free, Pro and Premium plans with a monthly and annual toggle', { caption: 'Pricing' }),
      shot('saas/faq', 1200, 700, 'Landing page frequently asked questions accordion', { caption: 'FAQ' }),
      shot('saas/cta', 1200, 775, 'Landing page closing call to action "Build Your First System" and footer', { caption: 'Call to action and footer' }),
    ],
    pending: { description: true, highlights: true, kind: true },
    caseStudy: {
      overview: { body: 'A landing page for an AI automation SaaS product, as listed in the profile. The rest of the case study has not been written yet.' },
    },
  },
  {
    id: 'gift-match',
    slug: 'gift-match',
    number: '05',
    title: 'GIFT MATCH',
    category: 'Product Concept / UI/UX Design',
    kind: 'Concept project',
    // No source material exists for this project yet.
    description:
      '[Editable placeholder: add a short description of Gift Match, its purpose and its user flow.]',
    highlights: [],
    coverImage: shot('gift-match/cover', 1566, 1004, 'GIFT MATCH mobile design on a phone: purple hero "Готовый подарок от 20 €, доставка по странам ЕС"'),
    heroImage: shot('gift-match/wide', 1200, 514, 'GIFT MATCH final design hero with a purple background, illustration and giftmatch wordmark'),
    images: [
      shot('gift-match/hero', 1200, 550, 'GIFT MATCH hero: navigation, headline, short questionnaire call to action and a gift illustration', { caption: 'Hero' }),
      shot('gift-match/process', 1200, 970, 'GIFT MATCH gift selection section with six option cards: questionnaire, surprise boxes, by interests, by age, customization, consultation', { caption: 'Choosing a gift' }),
      shot('gift-match/consultation', 1200, 440, 'GIFT MATCH film-strip banner and call to action "Готовы подобрать подарок?"', { caption: 'Consultation call to action' }),
      shot('gift-match/advantages', 1200, 650, 'GIFT MATCH advantages section with six benefit cards and illustrations', { caption: 'Advantages' }),
      shot('gift-match/gallery', 1200, 530, 'GIFT MATCH gallery of finished gift sets with contents lists', { caption: 'Gifts that already brought joy' }),
      shot('gift-match/offer', 1200, 540, 'GIFT MATCH offer banner with a 15% discount and a film strip of photos', { caption: 'Offer' }),
      shot('gift-match/faq-reviews', 1200, 670, 'GIFT MATCH FAQ accordion and client reviews', { caption: 'FAQ and reviews' }),
      shot('gift-match/footer', 1200, 424, 'GIFT MATCH footer with contacts and the giftmatch wordmark', { caption: 'Footer' }),
    ],
    pending: { description: true, highlights: true },
    caseStudy: {},
  },
];

export const skills = {
  heading: 'Skills & Tools',
  design: [
    'Web Design',
    'UI/UX Design',
    'Responsive Design',
    'Wireframing',
    'Prototyping',
    'Design Systems',
    'Information Architecture',
    'User Flows',
  ],
  tools: ['Figma', 'Framer', 'Tilda'],
};

export const contact = {
  headline: 'Have a project in mind?',
  text: 'Let’s create something thoughtful, useful, and visually distinctive.',
  cta: 'Let’s Talk',
  // Editable. Email and LinkedIn are taken from the supplied profile PDF.
  // Leave a value as '' to show an "add your link" placeholder instead.
  links: {
    email: 'nastya.2003t@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anastasiiatrapeznikova-252312418',
    behance: '',
  },
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
