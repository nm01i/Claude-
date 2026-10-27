import { navLinks } from '../content/content';

export default function Navbar({ className = '' }: { className?: string }) {
  return (
    <nav aria-label="Primary" className={`flex w-full justify-between px-6 pt-6 md:px-10 md:pt-8 ${className}`}>
      {navLinks.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
