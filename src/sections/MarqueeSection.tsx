import { useEffect, useRef } from 'react';
import { Layers, LayoutTemplate, Monitor, Workflow } from 'lucide-react';
import { skills } from '../content/content';

const ICONS = { layout: LayoutTemplate, monitor: Monitor, layers: Layers, workflow: Workflow } as const;

// Card tones: background, border, title colour, text colour.
const TONES = {
  brown: { bg: 'linear-gradient(135deg,#2a1a16,#4a2a20)', border: '#7A4A35', title: '#EBDCD3', text: '#C9B3A6' },
  navy: { bg: 'linear-gradient(135deg,#131c33,#223559)', border: '#33497A', title: '#DCE6F7', text: '#A9B7D1' },
  purple: { bg: 'linear-gradient(135deg,#1f1136,#3d2370)', border: '#5E3A99', title: '#E6D8FA', text: '#BFA9DD' },
} as const;

const row2 = [...skills.design, ...skills.tools];

const GRADS = [
  'linear-gradient(135deg,#1a0f24,#3a1450)',
  'linear-gradient(135deg,#1c1318,#4a2210)',
  'linear-gradient(135deg,#10141c,#23304a)',
  'linear-gradient(135deg,#18011F,#5a1360)',
];

function SkillCard({ card, n }: { card: (typeof skills.cards)[number]; n: number }) {
  const t = TONES[card.tone as keyof typeof TONES];
  const Icon = ICONS[card.icon as keyof typeof ICONS];
  return (
    <article
      className="flex shrink-0 flex-col rounded-[28px] border p-6 sm:p-7"
      style={{ width: 'min(440px, 84vw)', minHeight: 330, background: t.bg, borderColor: t.border }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: t.text }}>
          {String(n).padStart(2, '0')} / {card.label}
        </span>
        <Icon aria-hidden size={24} strokeWidth={1.6} style={{ color: t.text }} />
      </div>
      <h3 className="mt-6 font-black uppercase leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', color: t.title }}>{card.title}</h3>
      <p className="mt-3 text-sm font-light leading-relaxed sm:text-base" style={{ color: t.text }}>{card.text}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
        {card.chips.map((c) => <li key={c} className="rounded-full bg-white/10 px-3 py-1 text-xs font-light" style={{ color: t.title }}>{c}</li>)}
      </ul>
    </article>
  );
}

function Tile({ label, i }: { label: string; i: number }) {
  return (
    <div
      className="flex shrink-0 items-end rounded-2xl p-5"
      style={{ width: 'min(340px, 70vw)', height: 150, background: GRADS[i % GRADS.length], border: '1px solid rgba(215,226,234,0.12)' }}
    >
      <span className="hero-heading text-2xl font-black uppercase leading-none tracking-tight">{label}</span>
    </div>
  );
}

export default function MarqueeSection() {
  const section = useRef<HTMLElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = section.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - top + window.innerHeight) * 0.3;
      if (r1.current) r1.current.style.transform = `translateX(${offset - 200}px)`;
      if (r2.current) r2.current.style.transform = `translateX(${-(offset - 200)}px)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const tripled = <T,>(items: readonly T[]) => [...items, ...items, ...items];

  return (
    <section id="skills" ref={section} aria-labelledby="skills-title" className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40" style={{ overflowX: 'clip' }}>
      <h2 id="skills-title" className="sr-only">{skills.heading}</h2>
      {/* Only the first copy of each row is exposed to assistive tech; the rest repeat it for the loop. */}
      <div ref={r1} className="flex gap-3" style={{ willChange: 'transform', width: 'max-content', marginLeft: '-100%' }}>
        {tripled(skills.cards).map((c, i) => (
          <div key={i} aria-hidden={i >= skills.cards.length || undefined} className="flex"><SkillCard card={c} n={(i % skills.cards.length) + 1} /></div>
        ))}
      </div>
      <div ref={r2} className="mt-3 flex gap-3" style={{ willChange: 'transform', width: 'max-content', marginLeft: '-100%' }}>
        {tripled(row2).map((l, i) => <div key={i} aria-hidden={i >= row2.length || undefined}><Tile label={l} i={i + 1} /></div>)}
      </div>
    </section>
  );
}
