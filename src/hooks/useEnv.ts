import { useEffect, useState } from 'react';

function useMedia(query: string, initial = false) {
  const [match, setMatch] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

export const useReducedMotionPref = () => useMedia('(prefers-reduced-motion: reduce)');
export const useIsDesktop = () => useMedia('(min-width: 768px)');

/** Probe once whether WebGL is usable. */
export function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** The cinematic scene runs only on desktop, with motion allowed and WebGL available. */
export function useCinematic() {
  const reduced = useReducedMotionPref();
  const desktop = useIsDesktop();
  // Probe synchronously so the very first render already has the final (tall) stage layout;
  // scroll-linked offsets are measured against it.
  const [gl] = useState(hasWebGL);
  return !reduced && desktop && gl;
}
