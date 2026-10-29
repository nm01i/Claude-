import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import type { MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import Navbar from '../components/Navbar';
import CharacterVideo from '../components/CharacterVideo';
import { CHARACTER } from '../components/characterVideo';
import { useScrollEffect } from '../hooks/useScrollEffect';
import { profile } from '../content/content';
import { T, T_LITE, seg } from '../scene/timeline';

export type HeroMode = 'cinematic' | 'lite' | 'static';

type Props = {
  stageRef: React.RefObject<HTMLElement>;
  progress: MotionValue<number>;
  mode: HeroMode;
};

/**
 * Layout regions (top to bottom): navigation, heading, scene area, bottom bar.
 * Each region is its own grid row, so text can never sit on top of other text.
 * The 3D canvas (cinematic) or the pose figure (lite/static) lives in the scene area.
 */
export default function HeroStage({ stageRef, progress, mode }: Props) {
  const cinematic = mode === 'cinematic';
  const nav = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  // The poster frame is what shows before the video has data, and in the reduced-motion hero.
  useEffect(() => {
    const i = new Image();
    i.src = CHARACTER.poster;
    i.decode?.().catch(() => {});
  }, []);

  useScrollEffect(progress, (p) => {
    if (mode === 'static') return;
    const ps = cinematic ? T.poseStart : T_LITE.poseStart;
    const pe = cinematic ? T.poseEnd : T_LITE.poseEnd;
    // text regions leave only during the camera move
    const out = cinematic ? seg(p, T.textStart, T.textEnd) : 0;
    const set = (el: HTMLElement | null, o: number, y = 0) => {
      if (!el) return;
      el.style.opacity = String(o);
      el.style.transform = y ? `translate3d(0, ${y}px, 0)` : '';
      el.style.pointerEvents = o < 0.05 ? 'none' : '';
    };
    set(nav.current, 1 - seg(p, T.textStart + 0.05, T.textEnd + 0.05) * (cinematic ? 1 : 0));
    set(head.current, 1 - out, -40 * out);
    set(bottom.current, 1 - out);
    const hintIn = seg(p, ps, pe);
    const hintOut = cinematic ? seg(p, T.hintEnd - 0.1, T.hintEnd) : 0;
    set(hint.current, hintIn * (1 - hintOut));
  });

  const staticHint = mode === 'static';
  const height = cinematic ? '300vh' : mode === 'lite' ? '175vh' : undefined;

  return (
    <section id="top" ref={stageRef} className="relative" style={{ height, overflowX: 'clip' }}>
      <div className={`z-10 flex flex-col ${mode === 'static' ? 'relative h-[100svh] min-h-[640px]' : 'sticky top-0 h-screen'}`} style={{ overflowX: 'clip' }}>
        <div ref={nav}>
          <FadeIn y={-20}><Navbar /></FadeIn>
        </div>

        <div ref={head} className="px-4 pt-5 sm:px-6 md:px-8 md:pt-4">
          <FadeIn delay={0.15} y={30}>
            <h1 className="hero-heading font-black uppercase leading-[0.9] tracking-tight text-[15.5vw] sm:text-[14vw] md:whitespace-nowrap md:text-center md:text-[min(10.2vw,21vh)]">
              <span className="block whitespace-nowrap md:inline">Hi, i’m</span>{' '}
              <span className="block whitespace-nowrap md:inline">{profile.firstName.toLowerCase()}</span>
            </h1>
          </FadeIn>
        </div>

        {/* Scene area: transparent over the 3D canvas, or the 2D character video for lite/static modes. */}
        <div className="relative min-h-0 flex-1">
          {!cinematic && (
            <CharacterVideo
              progress={progress}
              scrub={mode === 'lite'}
              start={T_LITE.poseStart}
              end={T_LITE.poseEnd}
              className="absolute bottom-0 left-1/2 h-full max-w-[94%] -translate-x-1/2"
            />
          )}
        </div>

        <div ref={bottom} className="relative z-20 grid grid-cols-[1fr_auto] items-end gap-x-4 gap-y-4 px-6 pb-6 md:grid-cols-[1fr_auto_1fr] md:px-10 md:pb-9">
          <div
            ref={hint}
            aria-hidden={!staticHint}
            className="col-span-2 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#D7E2EA]/80 sm:text-xs md:col-span-1 md:col-start-2 md:row-start-1"
            style={{ opacity: staticHint ? 1 : 0 }}
          >
            Scroll to explore <ArrowDown size={16} className="hint-arrow" aria-hidden />
          </div>
          <FadeIn delay={0.35} y={20} className="md:row-start-1">
            <p className="font-medium uppercase leading-tight tracking-wide text-[#D7E2EA]" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.6rem)' }}>
              {profile.title}
            </p>
            <p className="mt-1 max-w-[200px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA]/70 sm:max-w-[280px]" style={{ fontSize: 'clamp(0.65rem, 0.95vw, 1rem)' }}>
              Clear structure, thoughtful UX, strong visual design
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20} className="justify-self-end md:col-start-3 md:row-start-1">
            <ContactButton label={profile.primaryCta} href="#projects" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
