import { useEffect, useRef } from 'react';
import { projects, skills } from '../content/content';

const row1 = [...skills.design, ...skills.tools]; // 11
const row2 = Array.from(new Set(projects.flatMap((p) => p.highlights))).slice(0, 10);

const GRADS = [
  'linear-gradient(135deg,#1a0f24,#3a1450)',
  'linear-gradient(135deg,#1c1318,#4a2210)',
  'linear-gradient(135deg,#10141c,#23304a)',
  'linear-gradient(135deg,#18011F,#5a1360)',
];

function Tile({ label, i }: { label: string; i: number }) {
  return (
    <div
      className="flex shrink-0 items-end rounded-2xl p-6"
      style={{ width: 420, height: 270, background: GRADS[i % GRADS.length], border: '1px solid rgba(215,226,234,0.12)' }}
    >
      <span className="hero-heading text-3xl font-black uppercase leading-none tracking-tight">{label}</span>
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

  const tripled = (items: string[]) => [...items, ...items, ...items];

  return (
    <section ref={section} aria-hidden className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40" style={{ overflowX: 'clip' }}>
      <div ref={r1} className="flex gap-3" style={{ willChange: 'transform', width: 'max-content', marginLeft: '-100%' }}>
        {tripled(row1).map((l, i) => <Tile key={i} label={l} i={i} />)}
      </div>
      <div ref={r2} className="mt-3 flex gap-3" style={{ willChange: 'transform', width: 'max-content', marginLeft: '-100%' }}>
        {tripled(row2).map((l, i) => <Tile key={i} label={l} i={i + 1} />)}
      </div>
    </section>
  );
}
