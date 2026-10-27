import { motion, useTransform, type MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import Navbar from '../components/Navbar';
import { profile } from '../content/content';

type Props = {
  stageRef: React.RefObject<HTMLElement>;
  progress: MotionValue<number>;
  cinematic: boolean;
};

export default function HeroStage({ stageRef, progress, cinematic }: Props) {
  // Overlay copy fades away as the camera pushes toward the monitor.
  const fade = useTransform(progress, [0, 0.28], [1, 0]);
  const lift = useTransform(progress, [0, 0.28], [0, -60]);
  const navFade = useTransform(progress, [0, 0.4], [1, 0]);

  const heading = (
    <div className="w-full overflow-hidden">
      <h1
        className="hero-heading mt-6 w-full font-black uppercase leading-[0.9] tracking-tight text-[14vw] sm:mt-4 sm:text-[15vw] md:-mt-2 md:text-[16vw] lg:text-[16.5vw]"
      >
        <span className="block whitespace-nowrap">Hi, i&apos;m</span>
        <span className="block whitespace-nowrap">{profile.firstName.toLowerCase()}</span>
      </h1>
    </div>
  );

  const bottom = (
    <div className="flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
      <FadeIn delay={0.35} y={20}>
        <p
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          {profile.title} — clear structure, thoughtful UX, strong visual design
        </p>
      </FadeIn>
      <FadeIn delay={0.5} y={20}>
        <ContactButton label={profile.primaryCta} href="#projects" />
      </FadeIn>
    </div>
  );

  return (
    <section
      id="top"
      ref={stageRef}
      className="relative"
      style={{ height: cinematic ? '300vh' : '100vh', overflowX: 'clip' }}
    >
      <div className="sticky top-0 z-10 flex h-screen flex-col" style={{ overflowX: 'clip' }}>
        <motion.div style={cinematic ? { opacity: navFade } : undefined}>
          <FadeIn y={-20}><Navbar /></FadeIn>
        </motion.div>

        <motion.div style={cinematic ? { opacity: fade, y: lift } : undefined}>
          <FadeIn delay={0.15} y={40}>{heading}</FadeIn>
        </motion.div>

        {/* Static fallback portrait (the cinematic scene draws the character in 3D instead) */}
        {!cinematic && (
          <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
            <FadeIn delay={0.6} y={30}>
              <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
                <img
                  src="/anastasiia-doll.webp"
                  alt="Stylized 3D portrait of Anastasiia Trapeznikova"
                  width={897}
                  height={1189}
                  className="h-auto w-full"
                />
              </Magnet>
            </FadeIn>
          </div>
        )}

        <div className="flex-1" />

        <motion.div className="relative z-20" style={cinematic ? { opacity: fade } : undefined}>
          {bottom}
        </motion.div>

        {cinematic && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-24 z-0 flex justify-center md:bottom-28"
            style={{ opacity: fade }}
          >
            <span className="text-xs font-light uppercase tracking-[0.35em] text-[#D7E2EA]/60">Scroll</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
