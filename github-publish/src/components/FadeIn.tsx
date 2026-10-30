import { motion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
};

const cache = new Map<ElementType, typeof motion.div>();
const getMotion = (tag: ElementType) => {
  if (!cache.has(tag)) cache.set(tag, motion.create(tag as 'div') as unknown as typeof motion.div);
  return cache.get(tag)!;
};

export default function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, as = 'div', className, style }: Props) {
  const M = getMotion(as);
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </M>
  );
}
