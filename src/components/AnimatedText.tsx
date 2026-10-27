import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

function Char({ ch, i, total, progress }: { ch: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="relative">
      <span aria-hidden className="invisible">{ch}</span>
      <motion.span aria-hidden className="absolute left-0 top-0" style={{ opacity }}>{ch}</motion.span>
    </span>
  );
}

type Props = { text: string; className?: string; style?: React.CSSProperties; animate?: boolean };

/** Characters brighten from 0.2 → 1 as the paragraph scrolls through the viewport. */
export default function AnimatedText({ text, className, style, animate = true }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  if (!animate) return <p className={className} style={style}>{text}</p>;

  // Words stay unbroken; characters animate individually. Screen readers get the full text.
  const words = text.split(' ');
  const total = text.length;
  let idx = 0;
  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, wi) => {
        const chars = [...w].map((c) => <Char key={idx} ch={c} i={idx++} total={total} progress={scrollYProgress} />);
        idx++; // space
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {chars}
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </p>
  );
}
