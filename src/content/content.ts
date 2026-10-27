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

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  kind: string; // concept vs. commissioned — shown as a badge
  summary: string;
  focus: string[];
  note?: string;
  /** Real screens. Leave empty to show a clearly labelled placeholder. */
  images: { src: string; alt: string }[];
  /** Real URL of the project, if one exists. Leave empty to hide the link. */
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'triply',
    number: '01',
    name: 'TRIPLY',
    category: 'Travel Planning Platform / Product Design',
    kind: 'Concept project',
    summary:
      'TRIPLY is a concept for a travel planning platform designed to help travel designers organize trips, build itineraries, manage trip details, and present personalized travel plans to clients.',
    focus: [
      'Information architecture',
      'Dashboard and trip management',
      'Itinerary planning',
      'User flows and interface design',
      'Client-facing trip presentation',
    ],
    note: 'Presented as a concept product, not a commercial SaaS.',
    images: [],
  },
  {
    slug: 'lumie',
    number: '02',
    name: 'LUMIÉ',
    category: 'Skincare E-commerce / Website Design',
    kind: 'Concept project',
    summary:
      'LUMIÉ is a skincare e-commerce website concept focused on a clean visual identity, clear product presentation, and an intuitive shopping experience.',
    focus: [
      'Homepage and visual hierarchy',
      'Product discovery and catalog structure',
      'Product presentation',
      'E-commerce user experience',
      'Responsive interface design',
    ],
    images: [],
  },
  {
    slug: 'fellaz',
    number: '03',
    name: 'FELLAZ',
    category: 'Barbershop Website / Web Design',
    kind: 'Concept project',
    summary:
      'FELLAZ is a website concept for a barbershop in South Korea, designed around a distinctive visual identity and a clear path to exploring services and making an appointment.',
    focus: [
      'Brand-oriented visual design',
      'Service presentation',
      'Appointment booking experience',
      'Mobile-first usability',
      'Korean-language interface considerations',
    ],
    note: 'The booking flow is a prototype; no real booking integration.',
    images: [],
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
