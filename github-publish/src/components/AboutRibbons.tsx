const src = `${import.meta.env.BASE_URL}about-ribbons.webp`;

/**
 * Abstract silk-like lines. They are pre-rendered into one transparent WebP (blur and fade baked in), so scrolling and the
 * slow drift only move a composited layer. Live SVG filters and masks were far too heavy to repaint while scrolling.
 */
export default function AboutRibbons() {
  return (
    <div aria-hidden className="about-ribbons pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <img src={src} alt="" width={1800} height={1200} decoding="async" className="ribbon-drift h-full w-full object-cover" />
    </div>
  );
}
