import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import { about, profile } from '../content/content';

/* Decorative 3D-style shapes drawn inline (no external assets). */
const Moon = () => (
  <svg viewBox="0 0 100 100" aria-hidden><defs><radialGradient id="gm" cx="35%" cy="30%"><stop offset="0" stopColor="#E7EEF3" /><stop offset="1" stopColor="#3a3f4a" /></radialGradient></defs><circle cx="50" cy="50" r="44" fill="url(#gm)" /><circle cx="38" cy="40" r="7" fill="#0003" /><circle cx="60" cy="62" r="10" fill="#0003" /></svg>
);
const Cube = () => (
  <svg viewBox="0 0 100 100" aria-hidden><polygon points="50,8 90,30 50,52 10,30" fill="#BBCCD7" /><polygon points="10,30 50,52 50,94 10,72" fill="#7621B0" /><polygon points="90,30 50,52 50,94 90,72" fill="#B600A8" /></svg>
);
const Torus = () => (
  <svg viewBox="0 0 100 100" aria-hidden><defs><linearGradient id="gt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#BE4C00" /><stop offset="1" stopColor="#B600A8" /></linearGradient></defs><circle cx="50" cy="50" r="34" fill="none" stroke="url(#gt)" strokeWidth="18" /></svg>
);
const Pill = () => (
  <svg viewBox="0 0 100 100" aria-hidden><defs><linearGradient id="gp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#646973" /><stop offset="1" stopColor="#E7EEF3" /></linearGradient></defs><rect x="30" y="8" width="40" height="84" rx="20" fill="url(#gp)" transform="rotate(25 50 50)" /></svg>
);

export default function AboutSection({ animate }: { animate: boolean }) {
  const deco = 'pointer-events-none absolute z-0';
  return (
    <section id="about" className="relative flex min-h-screen flex-col items-center justify-center bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10" style={{ overflowX: 'clip' }}>
      <FadeIn x={-80} y={0} delay={0.1} duration={0.9} className={`${deco} left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]`}><Moon /></FadeIn>
      <FadeIn x={-80} y={0} delay={0.25} duration={0.9} className={`${deco} bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]`}><Pill /></FadeIn>
      <FadeIn x={80} y={0} delay={0.15} duration={0.9} className={`${deco} right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]`}><Cube /></FadeIn>
      <FadeIn x={80} y={0} delay={0.3} duration={0.9} className={`${deco} bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]`}><Torus /></FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn y={40}>
            <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
              {about.heading}
            </h2>
          </FadeIn>
          <div className="flex max-w-[560px] flex-col gap-6 text-center">
            {about.paragraphs.map((t, i) => (
              <AnimatedText
                key={i}
                text={t}
                animate={animate}
                className="text-center font-medium leading-relaxed text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
              />
            ))}
          </div>
        </div>
        <ContactButton label={profile.secondaryCta} />
      </div>
    </section>
  );
}
