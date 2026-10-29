import { useRef } from 'react';
import { motionValue, type MotionValue } from 'framer-motion';
import { useScrollEffect } from '../hooks/useScrollEffect';
import { poseOpacity, seg } from '../scene/timeline';

/** Constant progress for the static (reduced-motion) figure. */
const ZERO = motionValue(0);

export const POSE_A = `${import.meta.env.BASE_URL}character/pose-a.webp`;
export const POSE_B = `${import.meta.env.BASE_URL}character/pose-b.webp`;
/** The flat figure fades out at the hips instead of ending on a hard edge (the 3D scene hides it behind the desk). */
const SOFT_FOOT = 'linear-gradient(to bottom, #000 72%, transparent 90%)';

export const POSE_ASPECT = 1127 / 1100;


type Props = {
  /** Scroll progress of the stage. Omit for a static greeting pose. */
  progress?: MotionValue<number>;
  start: number;
  end: number;
  className?: string;
};

/** The two aligned poses stacked in one box, so the face never shifts during the cross-fade. */
export default function PoseFigure({ progress, start, end, className = '' }: Props) {
  const a = useRef<HTMLImageElement>(null);
  const b = useRef<HTMLImageElement>(null);
  const lean = useRef<HTMLDivElement>(null);

  useScrollEffect(progress ?? ZERO, (p) => {
    const o = poseOpacity(p, start, end);
    if (a.current) a.current.style.opacity = String(o.a);
    if (b.current) b.current.style.opacity = String(o.b);
    // a slight forward lean while the pose changes (uniform scale, same origin for both poses)
    if (lean.current) lean.current.style.transform = `scale(${1 + 0.025 * seg(p, start, end)})`;
  });

  const img = 'absolute inset-0 h-full w-full object-contain';
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: String(POSE_ASPECT) }}>
      <div
        ref={lean}
        className="absolute inset-0"
        style={{ transformOrigin: '50% 100%', WebkitMaskImage: SOFT_FOOT, maskImage: SOFT_FOOT }}
      >
        <div className="character-idle absolute inset-0">
          <img ref={a} src={POSE_A} alt="Stylized 3D portrait of Anastasiia Trapeznikova" width={1127} height={1100} className={img} decoding="async" />
          <img ref={b} src={POSE_B} alt="" aria-hidden width={1127} height={1100} className={img} style={{ opacity: 0 }} decoding="async" />
        </div>
      </div>
    </div>
  );
}
