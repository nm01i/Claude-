import { useLayoutEffect, useRef } from 'react';
import type { MotionValue } from 'framer-motion';

/** Runs `apply(progress)` on every change of a scroll MotionValue, without re-rendering React. */
export function useScrollEffect(progress: MotionValue<number>, apply: (p: number) => void) {
  const fn = useRef(apply);
  fn.current = apply;
  useLayoutEffect(() => {
    fn.current(progress.get());
    return progress.on('change', (v) => fn.current(v));
  }, [progress]);
}
