import FadeIn from '../components/FadeIn';
import { skills } from '../content/content';

const num = { fontSize: 'clamp(3rem, 10vw, 140px)', color: '#0C0C0C', width: '1.75em', flexShrink: 0 } as const;

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-20 rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2 className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(2.6rem, 9.5vw, 130px)', lineHeight: 1 }}>
        {skills.heading}
      </h2>

      <div className="mx-auto max-w-5xl">
        <h3 className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-[#0C0C0C]/60">Design</h3>
        <ul>
          {skills.design.map((s, i) => (
            <FadeIn as="li" key={s} delay={(i % 4) * 0.1} className="flex items-center gap-6 border-t py-5 sm:gap-10 sm:py-6 md:py-7" style={{ borderColor: 'rgba(12,12,12,0.15)' }}>
              <span className="font-black leading-none" style={num}>{String(i + 1).padStart(2, '0')}</span>
              <span className="font-medium uppercase text-[#0C0C0C]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{s}</span>
            </FadeIn>
          ))}
        </ul>

        <h3 className="mb-6 mt-16 text-sm font-medium uppercase tracking-[0.3em] text-[#0C0C0C]/60 md:mt-24">Tools</h3>
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
