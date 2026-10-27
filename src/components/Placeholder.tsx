type Props = { label?: string; hint?: string; tint?: string; className?: string; style?: React.CSSProperties };

/** Clearly identified stand-in used wherever a real project screen has not been supplied yet. */
export default function Placeholder({ label = 'Project screen', hint, tint = '#B600A8', className = '', style }: Props) {
  return (
    <div
      role="img"
      aria-label={`${label}: placeholder, real image to be added`}
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden text-center ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, ${tint}33 0%, transparent 60%), repeating-linear-gradient(135deg, rgba(215,226,234,0.05) 0 14px, transparent 14px 28px), linear-gradient(135deg, #14121a 0%, #1b1822 100%)`,
        ...style,
      }}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#D7E2EA]/60 sm:text-xs">Placeholder image</span>
      <span className="px-4 text-xs font-light text-[#D7E2EA]/80 sm:text-sm">{label}</span>
      {hint && <span className="px-6 text-[10px] font-light text-[#D7E2EA]/45 sm:text-xs">{hint}</span>}
    </div>
  );
}
