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

export type ProjectImage = { src: string; alt: string };

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
  /** Main preview. Leave undefined to show a labelled placeholder. */
  coverImage?: ProjectImage;
  /** Further real screens for the case-study gallery. */
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
