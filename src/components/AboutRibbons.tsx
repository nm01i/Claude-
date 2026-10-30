/** Abstract silk-like lines, drawn as SVG. Two bundles (violet and copper) sweep across the section. */
const bundle = (n: number, from: [number, number], spread: number) =>
  Array.from({ length: n }, (_, i) => {
    const k = i - (n - 1) / 2;
    const [x, y] = from;
    return `M ${x + k * 6},${y} C ${x + 220 + k * spread},${y + 160 - k * 5} ${x + 330 - k * spread * 1.4},${y + 340 + k * 9} ${x + 640 + k * 14},${y + 380 + k * 12} S ${1240},${y + 430 + k * 10} 1300,${y + 330 + k * 14}`;
  });

const violet = bundle(26, [560, -40], 7);
const copper = bundle(22, [520, 140], 6);

export default function AboutRibbons() {
  return (
    <svg
      aria-hidden
      className="about-ribbons pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="rb-violet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B600A8" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#7621B0" stopOpacity="0.8" />
          <stop offset="1" stopColor="#4F46E5" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="rb-copper" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7621B0" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#BE4C00" stopOpacity="0.75" />
          <stop offset="1" stopColor="#F29A5C" stopOpacity="0.9" />
        </linearGradient>
        <filter id="rb-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14" /></filter>
        <radialGradient id="rb-fade" cx="66%" cy="28%" r="58%">
          <stop offset="0.3" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="rb-mask"><rect width="1200" height="800" fill="url(#rb-fade)" /></mask>
      </defs>
      <g mask="url(#rb-mask)">
        <g className="ribbon-a" filter="url(#rb-glow)" opacity="0.55">
          {violet.slice(6, 20).map((d, i) => <path key={i} d={d} stroke="url(#rb-violet)" strokeWidth="5" />)}
        </g>
        <g className="ribbon-a">
          {violet.map((d, i) => <path key={i} d={d} stroke="url(#rb-violet)" strokeWidth="0.9" opacity={0.35 + (i % 5) * 0.12} />)}
        </g>
        <g className="ribbon-b" filter="url(#rb-glow)" opacity="0.5">
          {copper.slice(5, 17).map((d, i) => <path key={i} d={d} stroke="url(#rb-copper)" strokeWidth="5" />)}
        </g>
        <g className="ribbon-b">
          {copper.map((d, i) => <path key={i} d={d} stroke="url(#rb-copper)" strokeWidth="0.9" opacity={0.35 + (i % 5) * 0.12} />)}
        </g>
      </g>
    </svg>
  );
}
