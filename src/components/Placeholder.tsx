type Props = { label?: string; className?: string; style?: React.CSSProperties };

/** Clearly identified stand-in used wherever a real project screen has not been supplied yet. */
export default function Placeholder({ label = 'Project screen', className = '', style }: Props) {
  return (
    <div
      role="img"
      aria-label={`${label} — placeholder, real screen to be added`}
      className={`flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden text-center ${className}`}
      style={{
        background:
          'repeating-linear-gradient(135deg, rgba(215,226,234,0.05) 0 14px, transparent 14px 28px), linear-gradient(135deg, #17121f 0%, #1d1a26 50%, #241621 100%)',
        ...style,
      }}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#D7E2EA]/50 sm:text-xs">Placeholder</span>
      <span className="px-4 text-xs font-light text-[#D7E2EA]/70 sm:text-sm">{label}</span>
    </div>
  );
}
