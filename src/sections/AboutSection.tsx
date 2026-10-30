import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import AboutRibbons from '../components/AboutRibbons';
import ContactButton from '../components/ContactButton';
import { about, profile } from '../content/content';

const small = 'text-[11px] font-medium uppercase leading-relaxed tracking-[0.25em] text-[#D7E2EA]/60 sm:text-xs';

export default function AboutSection({ animate }: { animate: boolean }) {
  return (
    <section id="about" className="relative flex min-h-screen items-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <AboutRibbons />

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col gap-12 sm:gap-16 md:gap-20">
        <div className="relative">
          <FadeIn y={20}><p className={`${small} mb-4`}>{about.number}</p></FadeIn>
          <FadeIn y={40}>
            <h2
              className="font-black uppercase leading-[0.82] tracking-tight"
              style={{
                fontSize: 'clamp(3.4rem, 15vw, 230px)',
                background: 'linear-gradient(180deg,#F1F5F9 0%,#C3CEDA 45%,#7C8494 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About<br />me
            </h2>
          </FadeIn>
          <FadeIn y={20} delay={0.2} className="mt-6 max-w-[220px] md:absolute md:right-0 md:top-10 md:mt-0">
            <p className={small}>{about.tagline}</p>
            <span aria-hidden className="mt-4 block h-px w-12 bg-[#D7E2EA]/50" />
          </FadeIn>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-[1fr_1.6fr_1.2fr] md:gap-10">
          <FadeIn y={20} delay={0.1}>
            <p className={small}>{about.location}</p>
            <span aria-hidden className="my-4 block h-px w-12 bg-[#D7E2EA]/50" />
            <p className={small}>{about.discipline}</p>
          </FadeIn>
          <FadeIn y={30} delay={0.15}>
            <p className="font-light leading-snug text-[#E7EEF3]" style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2.1rem)' }}>
              {about.statement}{' '}
              <span style={{ background: 'linear-gradient(90deg,#BBD2F5,#D9B8F5)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{about.statementAccent}</span>
            </p>
          </FadeIn>
          <div className="border-[#D7E2EA]/25 md:border-l md:pl-8">
            <AnimatedText text={about.text} animate={animate} className="font-light leading-relaxed text-[#D7E2EA]/85" style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }} />
          </div>
        </div>

        <FadeIn y={20} delay={0.2}><ContactButton label={profile.secondaryCta} /></FadeIn>
      </div>
    </section>
  );
}
