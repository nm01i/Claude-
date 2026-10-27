import { useEffect, useState } from 'react';

/** Project slug for `#project-<slug>` (also accepts the `#/project/<slug>` form), otherwise null. */
export function useHashRoute() {
  const read = () => {
    const m = window.location.hash.match(/^#(?:project-|\/project\/)([\w-]+)/);
    return m ? m[1] : null;
  };
  const [slug, setSlug] = useState<string | null>(read);
  useEffect(() => {
    const on = () => setSlug(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return slug;
}
