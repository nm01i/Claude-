import { Layers, LayoutTemplate, Monitor, Workflow } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { skills } from '../content/content';

const ICONS = { layout: LayoutTemplate, monitor: Monitor, layers: Layers, workflow: Workflow } as const;

// Dark tinted cards: background, border, title colour, chip background.
const TONES = {
  brown: { bg: '#3A2822', border: '#7A4A35', title: '#EBDCD3', text: '#C9B3A6', chip: 'rgba(255,255,255,0.08)' },
  navy: { bg: '#1A2540', border: '#33497A', title: '#DCE6F7', text: '#A9B7D1', chip: 'rgba(255,255,255,0.08)' },
  purple: { bg: '#2F1A4D', border: '#5E3A99', title: '#E6D8FA', text: '#BFA9DD', chip: 'rgba(255,255,255,0.08)' },
} as const;

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-20 rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2 className="mb-12 text-center font-black uppercase text-[#0C0C0C] sm:mb-16 md:mb-20" style={{ fontSize: 'clamp(2.6rem, 9.5vw, 130px)', lineHeight: 1 }}>
        {skills.heading}
      </h2>

      <div className="mx-auto max-w-5xl">
        <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {skills.cards.map((c, i) => {
            const t = TONES[c.tone as keyof typeof TONES];
            const Icon = ICONS[c.icon as keyof typeof ICONS];
            return (
              <FadeIn as="li" key={c.title} delay={(i % 2) * 0.1} className="flex">
                <article
                  className="flex w-full flex-col rounded-[28px] border p-6 sm:rounded-[32px] sm:p-8"
                  style={{ background: t.bg, borderColor: t.border }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] sm:text-xs" style={{ background: t.chip, color: t.text }}>
                      {String(i + 1).padStart(2, '0')} / {c.label}
                    </span>
                    <Icon aria-hidden size={26} strokeWidth={1.6} style={{ color: t.text }} />
                  </div>
                  <h3 className="mt-8 font-black uppercase leading-[0.95] tracking-tight sm:mt-10" style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.2rem)', color: t.title }}>
                    {c.title}
                  </h3>
                  <p className="mt-4 max-w-md font-light leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', color: t.text }}>
                    {c.text}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {c.chips.map((chip) => (
                      <li key={chip} className="rounded-full px-3.5 py-1.5 text-xs font-light sm:text-sm" style={{ background: t.chip, color: t.title }}>{chip}</li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            );
          })}
        </ul>

        <h3 className="mb-6 mt-14 text-sm font-medium uppercase tracking-[0.3em] text-[#0C0C0C]/60 md:mt-20">Tools</h3>
        <ul className="flex flex-wrap gap-3 sm:gap-4">
          {skills.tools.map((t, i) => (
            <FadeIn as="li" key={t} delay={i * 0.1}>
              <span
                className="inline-block rounded-full bg-[#0C0C0C] px-8 py-3 font-medium uppercase tracking-widest text-[#D7E2EA] sm:px-10 sm:py-4"
                style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.4rem)' }}
              >
                {t}
              </span>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
