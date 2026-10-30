import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

function Word({ word, start, end, progress, space }: { word: string; start: number; end: number; progress: MotionValue<number>; space: boolean }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="inline-block whitespace-nowrap">
      <motion.span aria-hidden style={{ opacity }}>{word}</motion.span>
      {space && <span>&nbsp;</span>}
    </span>
  );
}

type Props = { text: string; className?: string; style?: React.CSSProperties; animate?: boolean };

/** Words brighten from 0.2 → 1 as the paragraph scrolls through the viewport. */
export default function AnimatedText({ text, className, style, animate = true }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  if (!animate) return <p className={className} style={style}>{text}</p>;

  // Words animate as one unit (far fewer animated nodes than per-character). Screen readers get the full text.
  const words = text.split(' ');
  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, wi) => (
        <Word key={wi} word={w} start={wi / words.length} end={(wi + 1) / words.length} progress={scrollYProgress} space={wi < words.length - 1} />
      ))}
    </p>
  );
}
