import type { ReactNode } from 'react';

type Props = { href: string; children?: ReactNode; className?: string };

/** Ghost pill (the original "Live Project" button, repurposed for case studies). */
export default function CaseButton({ href, children = 'Case study', className = '' }: Props) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base ${className}`}
    >
      {children}
    </a>
  );
}
