import { useEffect, useRef, useState } from 'react';
import { motionValue, type MotionValue } from 'framer-motion';
import { useScrollEffect } from '../hooks/useScrollEffect';
import { CHARACTER, pickVideoSrc } from './characterVideo';
import { clamp01 } from '../scene/timeline';

/** Constant progress for the poster-only (reduced motion) case. */
const ZERO = motionValue(0);

/** The flat figure fades out at the hips instead of ending on a hard edge (the 3D scene hides it behind the desk). */
const SOFT_FOOT = 'linear-gradient(to bottom, #000 72%, transparent 90%)';

type Props = {
  /** Scroll progress of the stage. */
  progress?: MotionValue<number>;
  start: number;
  end: number;
  /** false: show the poster frame only (reduced motion, nothing is downloaded). */
  scrub: boolean;
  className?: string;
};

/**
 * The character video, driven by scroll (never autoplays, so there is no loop seam): the video time follows
 * the stage progress between `start` and `end`, in both scroll directions. The video has a black background, so it is
 * composited with `mix-blend-mode: lighten` over the page's #0C0C0C: the black drops out and the figure is untouched.
 */
export default function CharacterVideo({ progress, start, end, scrub, className = '' }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [src] = useState(pickVideoSrc);
  const st = useRef({ target: 0, cur: 0, raf: 0, last: 0 });

  useScrollEffect(progress ?? ZERO, (p) => {
    const s = st.current;
    s.target = CHARACTER.duration * clamp01((p - start) / (end - start));
    if (scrub && !s.raf) s.raf = requestAnimationFrame(tick);
  });

  function tick(now: number) {
    const s = st.current;
    const v = video.current;
    s.raf = 0;
    if (!v) return;
    const dt = s.last ? Math.min((now - s.last) / 1000, 0.25) : 1 / 60;
    s.last = now;
    const d = s.target - s.cur;
    s.cur = Math.abs(d) < 0.004 ? s.target : s.cur + d * (1 - Math.exp(-dt * 18)); // frame-rate independent smoothing, then land exactly
    // never stack seeks; a new one is issued as soon as the previous one lands
    if (!v.seeking && Math.abs(v.currentTime - s.cur) > 0.01) v.currentTime = s.cur;
    if (s.cur !== s.target || v.seeking) s.raf = requestAnimationFrame(tick);
    else s.last = 0;
  }

  useEffect(() => () => cancelAnimationFrame(st.current.raf), []);

  const media = { mixBlendMode: 'lighten' as const };
  return (
    <div
      role="img"
      aria-label="Animated 3D portrait of Anastasiia Trapeznikova"
      className={`relative ${className}`}
      style={{
        aspectRatio: String(CHARACTER.aspect),
        background: '#0C0C0C',
        isolation: 'isolate',
        WebkitMaskImage: SOFT_FOOT,
        maskImage: SOFT_FOOT,
      }}
    >
      {scrub ? (
        <video
          ref={video}
          src={src}
          poster={CHARACTER.poster}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-contain"
          style={media}
        />
      ) : (
        <img src={CHARACTER.poster} alt="" width={1000} height={720} decoding="async" className="absolute inset-0 h-full w-full object-contain" style={media} />
      )}
    </div>
  );
}
