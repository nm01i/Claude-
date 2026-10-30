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
  number: '( 02 )',
  tagline: 'Designing digital experiences',
  location: 'Based in South Korea',
  discipline: '( UI/UX · Web design )',
  statement: 'I’m a web and UI/UX designer focused on creating digital experiences that balance',
  statementAccent: 'aesthetics and usability.',
  text: 'I design websites and interfaces that are not only visually appealing, but also clear, functional and easy to use. I enjoy working on the structure, user flows and details that make a product feel intuitive and consistent.',
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
    heroImage: shot('triply/intro', 2000, 1250, 'TRIPLY landing screen: "Design the journey. Not just the destination." over a Kyoto street at sunset, with the Explore TRIPLY button'),
    images: [
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
        body: "TRIPLY is a concept for a travel planning platform that helps travel designers organize trips, build itineraries, manage trip details, and present personalized travel plans to clients. It is presented as a concept product, not a commercial SaaS.",
      },
      brief: {
        body: "Give travel designers one workspace to collect places, build day-by-day itineraries, track bookings and share the plan with clients, who can review, suggest, vote and approve.",
        points: [
          "Collect: places, ideas and trip details in one calm overview",
          "Organize: day-by-day itineraries with times and transit",
          "Collaborate: clients view the plan, suggest places, vote and approve",
        ],
      },
      audience: {
        body: "Travel designers who plan trips, and the clients who receive personalized travel plans.",
      },
      challenge: {
        body: "A planning dashboard is abstract, and a trip has many layers: places, days, bookings and client feedback. The interface had to keep dense information readable and give clients a clear role without letting them edit the plan.",
      },
      process: {
        body: "Designed and built as an interactive concept prototype. The flow runs from a scroll-driven landing to a dashboard of trip folders, then into a trip workspace.",
        points: [
          "Landing intro that hands over to the product",
          "Dashboard: one folder per trip with destinations, dates and progress",
          "Workspace tabs: Overview, Itinerary, Bookings, Client",
          "Phone layouts for the dashboard, overview and itinerary",
        ],
      },
      decisions: {
        points: [
          "A scroll-driven intro sells the idea before the tool, then hands over to the dashboard",
          "One folder per trip: the dashboard cards open into the trip workspace",
          "Overview and Itinerary read the same trip data, so summary and detail never disagree",
          "Designer and client views: clients review, suggest, vote and approve; the designer decides what enters the itinerary",
          "Working interactions with local state: add bookings and activities, vote, request changes, and a route-optimization demo",
        ],
      },
      visual: {
        body: "A calm warm off-white canvas with white panels and one violet accent. Instrument Sans is the only typeface.",
        points: [
          "Background #F3F1EB, surface #FFFFFF, text #18201F",
          "Accent #6B55FF with a soft tint #EEE9FF",
          "Instrument Sans, weights 400 to 700",
          "Soft elevation, rounded panels, pill chips and status pills",
        ],
      },
      reflection: {
        body: "TRIPLY is a front-end prototype. Trip data is demo data stored in the browser; the map is schematic, and there is no backend, real routing, booking or payment.",
        points: [
          "Next: a real map and routing, a client share link, and testing with real travel designers",
        ],
      },
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
    heroImage: shot('lumie/hero', 1200, 730, 'LUMIÉ homepage hero: navigation, "Когда уход раскрывает свет кожи", a button and a portrait with the LUMIÉ wordmark'),
    images: [
      shot('lumie/categories', 1200, 1020, 'LUMIÉ category carousel (cleansing, cream, SPF, masks, toner) and the best products of 2025', { caption: 'Categories and best sellers' }),
      shot('lumie/about', 1200, 660, 'LUMIÉ section about Korean cosmetics with a brand ticker', { caption: 'About Korean cosmetics' }),
      shot('lumie/reviews', 1200, 450, 'LUMIÉ customer reviews shown as chat screenshots', { caption: 'Reviews' }),
      shot('lumie/results', 1200, 650, 'LUMIÉ results section with three skin-concern cards: sensitive skin, ready-made routine, dryness and tightness', { caption: 'Results by skin concern' }),
      shot('lumie/cta', 1200, 770, 'LUMIÉ closing call to action and footer with catalog and contact links', { caption: 'Call to action and footer' }),
      shot('lumie/m-hero', 390, 690, 'LUMIÉ homepage on a phone: headline, button and portrait stacked', { mobile: true, caption: 'Phone: hero' }),
      shot('lumie/m-categories', 390, 800, 'LUMIÉ category carousel on a phone', { mobile: true, caption: 'Phone: categories' }),
      shot('lumie/m-reviews', 390, 500, 'LUMIÉ reviews on a phone', { mobile: true, caption: 'Phone: reviews' }),
      shot('lumie/m-footer', 390, 798, 'LUMIÉ footer on a phone with catalog links and contacts', { mobile: true, caption: 'Phone: footer' }),
    ],
    caseStudy: {
      overview: {
        body: "LUMIÉ is a skincare e-commerce website concept with a clean visual identity, clear product presentation, and an intuitive shopping experience. The interface is in Russian and presents original Korean cosmetics with delivery to the EU and CIS.",
      },
      brief: {
        body: "A shop that feels editorial rather than crowded: it opens on one promise, \"Когда уход раскрывает свет кожи\", and leads the visitor to choose a care routine and move to the catalog.",
      },
      audience: {
        body: "Shoppers looking for original Korean skincare, as the footer states: \"Оригинальная косметика из Кореи. Доставка в ЕС и СНГ\".",
      },
      challenge: {
        body: "Make a product-heavy shop feel calm and premium: introduce products through a mood, categories and results instead of opening on a dense grid.",
      },
      process: {
        body: "The Framer project has two pages, the homepage and the catalog. The homepage runs in this order:",
        points: [
          "Hero with a portrait, one headline and one button, plus a brand ticker",
          "Categories carousel: cleansing, cream, SPF, masks, toner",
          "Best products of 2025 with price and a link to the catalog",
          "About Korean cosmetics, reviews and results by skin concern",
          "Closing call to action and a footer with catalog links and contacts",
          "Catalog page backed by 26 products in 6 categories",
        ],
      },
      decisions: {
        points: [
          "A split hero: the portrait beside the headline and a single \"Подобрать уход\" (choose your care) button",
          "An olive ticker that repeats the wordmark and separates sections",
          "Photo category cards that let shoppers start from a goal, not a product name",
          "Social proof as chat-style reviews and results by skin concern: sensitive skin, a ready routine, dryness",
          "A phone layout that puts the text and button first and the portrait below",
        ],
      },
      visual: {
        body: "A warm cream page with an olive accent and refined serif headlines.",
        points: [
          "Colours: #FDF9F2, #868672, #404034, #232424",
          "Playfair Display for headlines, Nunito for text",
          "Product cutouts on white, large rounded photography",
        ],
      },
      reflection: {
        body: "LUMIÉ is a concept built in Framer with CMS-driven products and categories. Product detail, cart and checkout pages do not exist yet.",
        points: [
          "Next: a product page, catalog filters, and cart and checkout states",
        ],
      },
    },
  },
  {
    id: 'muza',
    slug: 'muza',
    number: '03',
    title: 'MUZA',
    category: 'Website Design / UI/UX',
    kind: 'Website prototype',
    description:
      'MUZA is a landing page for an AI-assisted interior design service: upload a photo, receive AI concepts, and let a designer turn the favourite into a build-ready project.',
    highlights: ['Before/after proof', 'Four-step process', 'Flat per-room pricing', 'Photo-upload request flow'],
    coverImage: shot('muza/cover', 1536, 1024, 'MUZA homepage on a tablet: "Interior design, without the wait." over a rendered kitchen interior'),
    heroImage: shot('muza/hero-mockup', 1536, 1024, 'MUZA hero on a tablet: "Interior design, without the wait." over a rendered kitchen interior, with the Upload a photo button'),
    images: [
      shot('muza/process', 2000, 1142, 'MUZA "Four steps. One of them is human." process section: AI scans your space, AI drafts concepts, designer refines it, final project', { caption: 'How it works: four steps' }),
      shot('muza/pricing', 2000, 1171, 'MUZA "Clear pricing. No hourly surprises." with Concept, Project and Full Service plans', { caption: 'Pricing' }),
      shot('muza/reviews', 2000, 1685, 'MUZA "Clients, unscripted." review cards', { caption: 'Client reviews' }),
      shot('muza/request', 2000, 1250, 'MUZA request form: "Let\'s design your space" with name, email, notes and a photo upload area', { caption: 'Request a project: form with photo upload' }),
      shot('muza/faq', 2000, 962, 'MUZA FAQ "Questions, answered." with five questions', { caption: 'FAQ' }),
      shot('muza/cta', 2000, 678, 'MUZA closing call to action "Your future interior starts here."', { caption: 'Call to action' }),
      shot('muza/m-process', 780, 1700, 'MUZA four-step process on a phone', { mobile: true, caption: 'Phone: process' }),
    ],
    caseStudy: {
      overview: {
        body: "MUZA is a landing page for an AI-assisted interior design service. Visitors upload a photo, receive AI concepts in minutes, and a designer turns the favourite into a build-ready project.",
      },
      brief: {
        body: "Explain the AI-plus-designer service, prove it with before and after, and make starting a project a single step.",
        points: [
          "Primary action: \"Upload a photo, get concepts free\"",
          "One request form for every call to action, with photo upload and a 24-hour reply promise",
        ],
      },
      audience: {
        body: "People who want a designed, buildable interior for a single room. The copy speaks of remote clients, European delivery and flat per-room prices.",
      },
      challenge: {
        body: "AI-only interior tools produce attractive pictures that ignore real rooms. The page had to sell speed without hiding the human step that makes a design buildable.",
      },
      process: {
        body: "A single responsive page that runs from promise to proof to price to action:",
        points: [
          "Hero and a before/after slider with three project cards",
          "Four steps: AI scans the space, AI drafts concepts, a designer refines, final project",
          "A worked case study: one living room, from photo to floor plan",
          "Pricing in three tiers, reviews, a closing call to action and an FAQ",
          "A request modal with photo drag-and-drop and a thank-you state",
        ],
      },
      decisions: {
        points: [
          "Make the AI and human split the story: \"Four steps. One of them is human.\"",
          "Prove the claim with a draggable before/after slider placed right after the hero",
          "One flat price per room, with a \"Most booked\" middle tier",
          "A single forgiving conversion path: every call to action opens the same short form",
          "A warm dark palette with one copper accent, and a reduced-motion fallback",
        ],
      },
      visual: {
        body: "A dark, warm interface with a copper accent, built for calm and a premium feel.",
        points: [
          "Background #171616, text #F2EEE6, copper accent #B58A58",
          "Montserrat for headings, Lora for text",
          "Glass panels, 28 px rounded cards and pill buttons",
        ],
      },
      reflection: {
        body: "MUZA is a front-end prototype: the request form does not submit anywhere yet, and the page does not generate concepts.",
        points: [
          "Next: connect the form to a real endpoint, unify the contact details, and add real project imagery",
        ],
      },
    },
  },
  {
    id: 'saas',
    slug: 'saas',
    number: '04',
    title: 'FlowAutomate',
    category: 'SaaS Website / UI/UX Design',
    kind: 'Landing page',
    description:
      'A dark landing page for a 14-day AI-automation sprint: a four-step "What you\'ll learn", outcomes, three pricing tiers and an FAQ.',
    highlights: ['Landing page structure', 'Step-by-step offer', 'Pricing layout', 'Dark interface design'],
    coverImage: shot('saas/cover', 1586, 992, 'Landing page "Automate Your Income with AI" on a desktop monitor'),
    heroImage: shot('saas/hero', 1200, 850, 'Landing page hero: navigation, "Automate Your Income with AI" and two buttons over a dark gradient'),
    images: [
      shot('saas/learn-1', 1200, 1000, 'Landing page section "What You\'ll Learn" with step 01 Workflow Systems and step 02 AI Assistant', { caption: 'What you\'ll learn (1/2)' }),
      shot('saas/learn-2', 1200, 1050, 'Landing page steps 03 Real Projects and 04 Optimization with product interface cards', { caption: 'What you\'ll learn (2/2)' }),
      shot('saas/benefits', 1200, 610, 'Landing page results section with four benefit cards', { caption: 'What you\'ll achieve' }),
      shot('saas/pricing', 1200, 900, 'Landing page pricing: Free, Pro and Premium plans with a monthly and annual toggle', { caption: 'Pricing' }),
      shot('saas/faq', 1200, 700, 'Landing page frequently asked questions accordion', { caption: 'FAQ' }),
      shot('saas/cta', 1200, 775, 'Landing page closing call to action "Build Your First System" and footer', { caption: 'Call to action and footer' }),
      shot('saas/t-hero', 810, 1500, 'AI-automation landing page hero at tablet width', { mobile: true, caption: 'Tablet: hero' }),
      shot('saas/t-learn', 810, 1500, 'AI-automation landing page "What You\'ll Learn" at tablet width', { mobile: true, caption: 'Tablet: steps' }),
    ],
    caseStudy: {
      overview: {
        body: "A dark, high-contrast landing page for an AI automation offer: \"Automate Your Income with AI\", a 14-day sprint that teaches workflow automation with no coding required. The page in these captures is branded Flowcore.",
      },
      brief: {
        body: "Explain the offer and convert: a hero with two actions, a four-step \"What you'll learn\", outcomes, three pricing tiers, an FAQ and a final sign-up.",
      },
      audience: {
        body: "People who want to automate tasks and build income-generating workflows with AI, without coding. The copy says \"No coding required\" and the FAQ opens with \"Do I need coding skills?\"",
      },
      challenge: {
        body: "Make a technical offer feel approachable: show what the sprint teaches in plain steps, and make \"no coding required\" believable.",
      },
      process: {
        body: "A single landing page, top to bottom:",
        points: [
          "Hero: headline, \"Get in touch\" and \"View services\"",
          "Inside the Sprint: four steps with interface previews",
          "What you'll achieve: four benefit cards",
          "Pricing: Free, Pro and Premium with a monthly and annual toggle",
          "FAQ, a \"Build Your First System\" sign-up and a footer",
        ],
      },
      decisions: {
        points: [
          "One purple accent on near-black marks every action: Join Program, Get in touch, Get Access",
          "Four numbered steps, each with a small interface preview, explain the sprint at a glance",
          "Pricing has a highlighted \"Pro\" plan marked Best and a billing toggle",
          "An FAQ accordion answers the main objections: coding skills, duration, real projects, work use, subscription",
        ],
      },
      visual: {
        body: "A near-black page with a deep purple glow and one violet accent colour.",
        points: [
          "Satoshi for headings, Inter for text",
          "Rounded dark cards with thin borders",
        ],
      },
      reflection: {
        body: "This Framer project is a copy of a third-party template: its metadata still reads \"Flowcore - AI automation agency framer template\". Which parts were customised is not documented yet.",
      },
    },
  },
  {
    id: 'gift-match',
    slug: 'gift-match',
    number: '05',
    title: 'GIFT MATCH',
    category: 'Product Concept / UI/UX Design',
    kind: 'Concept project',
    description:
      'Giftmatch is a concept for an online gift-selection service: a short questionnaire, ready boxes and a free consultation help visitors find a gift in minutes.',
    highlights: ['Selection scenarios', 'Landing page UI', 'Modular card system', 'Responsive layouts'],
    coverImage: shot('gift-match/cover', 1566, 1004, 'GIFT MATCH mobile design on a phone: purple hero "Готовый подарок от 20 €, доставка по странам ЕС"'),
    heroImage: shot('gift-match/hero', 1200, 550, 'GIFT MATCH hero: navigation, "Готовый подарок от 20 €, доставка по странам ЕС", the questionnaire button and an illustration'),
    images: [
      shot('gift-match/process', 1200, 970, 'GIFT MATCH gift selection section with six option cards: questionnaire, surprise boxes, by interests, by age, customization, consultation', { caption: 'Choosing a gift' }),
      shot('gift-match/consultation', 1200, 440, 'GIFT MATCH film-strip banner and call to action "Готовы подобрать подарок?"', { caption: 'Consultation call to action' }),
      shot('gift-match/advantages', 1200, 650, 'GIFT MATCH advantages section with six benefit cards and illustrations', { caption: 'Advantages' }),
      shot('gift-match/gallery', 1200, 530, 'GIFT MATCH gallery of finished gift sets with contents lists', { caption: 'Gifts that already brought joy' }),
      shot('gift-match/offer', 1200, 540, 'GIFT MATCH offer banner with a 15% discount and a film strip of photos', { caption: 'Offer' }),
      shot('gift-match/faq-reviews', 1200, 670, 'GIFT MATCH FAQ accordion and client reviews', { caption: 'FAQ and reviews' }),
      shot('gift-match/footer', 1200, 424, 'GIFT MATCH footer with contacts and the giftmatch wordmark', { caption: 'Footer' }),
      shot('gift-match/m-hero', 320, 700, 'GIFT MATCH mobile hero with the questionnaire call to action', { mobile: true, caption: 'Phone: hero' }),
      shot('gift-match/m-options', 320, 750, 'GIFT MATCH mobile gift-selection cards', { mobile: true, caption: 'Phone: options' }),
      shot('gift-match/m-consultation', 320, 700, 'GIFT MATCH mobile consultation card and film-strip banner', { mobile: true, caption: 'Phone: consultation' }),
      shot('gift-match/m-faq', 320, 770, 'GIFT MATCH mobile FAQ accordion', { mobile: true, caption: 'Phone: FAQ' }),
    ],
    caseStudy: {
      overview: {
        body: "Giftmatch is a concept for an online gift-selection service. A short questionnaire, ready surprise boxes and a free consultation help visitors find a gift in minutes. The work covers a wireframe, a prototype, the final desktop UI and responsive layouts.",
      },
      brief: {
        body: "A clear, emotional and intuitive interface that helps people find a gift quickly, without a complicated search. The core idea is selection scenarios instead of a product catalogue.",
      },
      audience: {
        body: "People choosing a gift for someone else, as the copy implies: a partner, a colleague, a child or a friend, with delivery across EU countries. The UI copy is in Russian.",
      },
      challenge: {
        body: "Gift buyers often do not know what they want, so a product grid fails them. The page had to guide the choice and still offer a human fallback.",
      },
      process: {
        body: "The design moved through five stages in Figma, each kept as a frame:",
        points: [
          "Wireframe with placeholder copy",
          "Mid-fidelity prototype with real copy",
          "Modular \"lego\" layout built from cards",
          "Final desktop UI on a 12-column grid",
          "Mobile layout and device mockups",
        ],
      },
      decisions: {
        points: [
          "Selection scenarios instead of a catalogue: questionnaire, surprise boxes, interests, age, customization",
          "A hero that answers what, how much, where and how fast: a gift from €20, EU delivery, ready in two minutes",
          "Consultation as a distinct fallback: the only solid-colour card, with a free callback",
          "One modular card system reused for options, advantages, FAQ and reviews",
          "An oversized lowercase wordmark and line illustrations carry the gift feeling while the UI stays minimal",
        ],
      },
      visual: {
        body: "A lilac and purple interface with white cards, line illustrations and an oversized wordmark.",
        points: [
          "Purples #7553C7 and #916EE4, pale lilac #E3DDF4, cool white #F7F8FC, text #3C3C3C",
          "RockStar for display, Inter for text",
          "12-column grid: 40 px margins, 20 px gutters, 75 px columns",
          "10 px card radius and fully round pill buttons",
        ],
      },
      reflection: {
        body: "Giftmatch is a design concept: no built version is documented.",
        points: [
          "Next: unify the palette and type scale, design the questionnaire screens and interaction states, and add an English version",
        ],
      },
    },
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
  /** The four cards in the Skills section. Chips come from the skills listed in the profile. */
  cards: [
    {
      label: 'Specialization',
      title: 'UI/UX Design',
      text: 'Designing intuitive digital experiences through structure, visual hierarchy and interaction.',
      chips: ['User flows', 'Wireframes', 'Prototyping', 'UI systems'],
      tone: 'brown',
      icon: 'layout',
    },
    {
      label: 'Specialization',
      title: 'Web Design',
      text: 'Creating responsive websites with a balance of aesthetics, usability and clear communication.',
      chips: ['Landing pages', 'Responsive design', 'Framer', 'Figma'],
      tone: 'navy',
      icon: 'monitor',
    },
    {
      label: 'Approach',
      title: 'Design Thinking',
      text: 'Turning complex ideas into clear structures and meaningful user experiences.',
      chips: ['Research', 'Information architecture', 'Visual hierarchy', 'Consistency'],
      tone: 'purple',
      icon: 'layers',
    },
    {
      label: 'Workflow',
      title: 'From Idea to Interface',
      text: 'Taking a project from the first wireframe to a working website, designed and built end to end.',
      chips: ['Concept to launch', 'Design to code', 'Framer & Tilda', 'AI-assisted workflow'],
      tone: 'brown',
      icon: 'workflow',
    },
  ],
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
    behance: 'https://www.behance.net/nastya20030334',
  },
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
