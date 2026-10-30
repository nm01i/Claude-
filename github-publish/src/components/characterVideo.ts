const base = import.meta.env.BASE_URL;

/** Character animation: greeting -> pointing. Cropped from the supplied 1280x720 master to x 136..1135, which excludes the
 *  generator watermark (a static sparkle at x 1136-1184) without any overlay; the character never enters that area. */
export const CHARACTER = {
  desktop: `${base}character/character-desktop.mp4`, // 1000x720, GOP 6 (fast scrubbing)
  mobile: `${base}character/character-mobile.mp4`, // 750x540
  poster: `${base}character/character-poster.webp`, // first frame
  aspect: 1000 / 720,
  duration: 6,
} as const;

/** Lighter file for phones and Save-Data. */
export function pickVideoSrc(): string {
  if (typeof window === 'undefined') return CHARACTER.desktop;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  const small = window.matchMedia('(max-width: 767px)').matches || nav.connection?.saveData === true;
  return small ? CHARACTER.mobile : CHARACTER.desktop;
}
