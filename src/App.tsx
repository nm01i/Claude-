import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import HeroStage, { type HeroMode } from './sections/HeroStage';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactStage from './sections/ContactStage';
import CaseStudy from './sections/CaseStudy';
import { useCinematic, useReducedMotionPref } from './hooks/useEnv';
import { useHashRoute } from './hooks/useHashRoute';

const Workstation3D = lazy(() => import('./scene/Workstation3D'));

export default function App() {
  const slug = useHashRoute();
  const cinematic = useCinematic() && !slug;
  const reduced = useReducedMotionPref();
  const mode: HeroMode = cinematic ? 'cinematic' : reduced ? 'static' : 'lite';

  const heroRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const { scrollYProgress: hero } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: contact } = useScroll({ target: contactRef, offset: ['start start', 'end end'] });

  // Which stage (if any) currently owns the fixed canvas; paused otherwise.
  const active = useRef<'hero' | 'contact' | null>('hero');
  const [canvasOn, setCanvasOn] = useState(true);
  useEffect(() => {
    if (!cinematic) return;
    const inView = { hero: true, contact: false };
    const sync = () => {
      active.current = inView.hero ? 'hero' : inView.contact ? 'contact' : null;
      setCanvasOn(active.current !== null);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inView[e.target === heroRef.current ? 'hero' : 'contact'] = e.isIntersecting;
        sync();
      },
      { rootMargin: '200px 0px' },
    );
    if (heroRef.current) io.observe(heroRef.current);
    if (contactRef.current) io.observe(contactRef.current);
    return () => io.disconnect();
  }, [cinematic]);

  // Hash navigation: scroll to the target section after leaving a case study, or reset on entering one.
  useEffect(() => {
    if (slug) {
      window.scrollTo(0, 0);
      return;
    }
    const id = window.location.hash.slice(1);
    if (id && !id.startsWith('project-') && !id.startsWith('/')) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, [slug]);

  if (slug) return <div style={{ background: '#0C0C0C', overflowX: 'clip' }}><CaseStudy slug={slug} /></div>;

  return (
    <div className="min-h-screen bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      {cinematic && (
        <div
          aria-hidden
          className="fixed inset-0 z-0"
          style={{ display: canvasOn ? 'block' : 'none' }}
        >
          <Suspense fallback={null}>
            <Workstation3D progress={{ hero, contact }} active={active} />
          </Suspense>
        </div>
      )}

      <HeroStage stageRef={heroRef} progress={hero} mode={mode} />

      <div className="relative z-20 bg-[#0C0C0C]">
        <MarqueeSection />
        <AboutSection animate={!reduced} />
        <ProjectsSection animate={!reduced} />
      </div>

      <ContactStage stageRef={contactRef} progress={contact} cinematic={cinematic} />
    </div>
  );
}
