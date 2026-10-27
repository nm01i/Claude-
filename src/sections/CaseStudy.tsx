import { ArrowLeft, ArrowRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import Placeholder from '../components/Placeholder';
import ContactButton from '../components/ContactButton';
import { contact, projects, profile } from '../content/content';

export default function CaseStudy({ slug }: { slug: string }) {
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  if (!p) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="hero-heading text-5xl font-black uppercase">Not found</h1>
        <a href="#projects" className="text-[#D7E2EA] underline">Back to projects</a>
      </main>
    );
  }

  const shots = [0, 1, 2, 3].map((n) => p.images[n]);

  return (
    <main className="min-h-screen bg-[#0C0C0C] px-5 pb-24 pt-8 sm:px-8 md:px-10">
      <header className="mx-auto flex max-w-[1200px] items-center justify-between">
        <a href="#projects" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70 md:text-base">
          <ArrowLeft size={18} aria-hidden /> All projects
        </a>
        <a href="#about" className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70 md:text-base">{profile.firstName}</a>
      </header>

      <div className="mx-auto mt-16 max-w-[1200px] md:mt-24">
        <FadeIn>
          <p className="text-sm font-light uppercase tracking-[0.3em] text-[#D7E2EA]/70">Case study {p.number}</p>
          <h1 className="hero-heading mt-3 font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 14vw, 190px)' }}>{p.name}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#D7E2EA]/40 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA]">{p.kind}</span>
            <span className="text-sm font-light uppercase tracking-widest text-[#D7E2EA]/70 sm:text-base">{p.category}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-[1fr_1fr] md:gap-20">
            <section aria-labelledby="ov">
              <h2 id="ov" className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/60">Overview</h2>
              <p className="font-light leading-relaxed text-[#D7E2EA]" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)' }}>{p.summary}</p>
              {p.note && <p className="mt-6 border-l-2 border-[#B600A8] pl-4 text-sm font-light text-[#D7E2EA]/70 sm:text-base">{p.note}</p>}
            </section>
            <section aria-labelledby="fa">
              <h2 id="fa" className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/60">Focus areas</h2>
              <ul>
                {p.focus.map((f, n) => (
                  <li key={f} className="flex items-baseline gap-5 border-t border-[#D7E2EA]/15 py-4">
                    <span className="font-black text-[#D7E2EA]/40">{String(n + 1).padStart(2, '0')}</span>
                    <span className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.3rem)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </FadeIn>

        <section aria-labelledby="sc" className="mt-16 md:mt-28">
          <h2 id="sc" className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/60">Screens</h2>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {shots.map((img, n) => (
              <FadeIn key={n} delay={(n % 2) * 0.1}>
                <div className="aspect-[4/3] overflow-hidden rounded-[28px] sm:rounded-[40px]">
                  {img ? <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <Placeholder label={`${p.name} — screen ${n + 1}`} />}
                </div>
              </FadeIn>
            ))}
          </div>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA]/10">
              Visit project
            </a>
          )}
        </section>

        <nav aria-label="Case study navigation" className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-[#D7E2EA]/15 pt-10 sm:flex-row sm:items-center md:mt-32">
          <a href={`#project-${next.slug}`} className="group inline-flex items-center gap-3 font-medium uppercase tracking-wider text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}>
            Next: {next.name} <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
          <ContactButton label={contact.cta} href="#contact" />
        </nav>
      </div>
    </main>
  );
}
