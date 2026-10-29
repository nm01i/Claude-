import { ArrowLeft, ArrowRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import Media from '../components/Media';
import ContactButton from '../components/ContactButton';
import { caseSections, contact, projects, type CaseBlock } from '../content/content';

const label = 'mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/60';
const bodyStyle = { fontSize: 'clamp(1.05rem, 1.8vw, 1.45rem)' } as const;

function Block({ id, title, block }: { id: string; title: string; block: CaseBlock }) {
  return (
    <section aria-labelledby={id} className="grid gap-4 border-t border-[#D7E2EA]/15 pt-8 md:grid-cols-[1fr_2fr] md:gap-16">
      <h2 id={id} className="text-sm font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/60">{title}</h2>
      <div className="min-w-0">
        {block.body && <p className="font-light leading-relaxed text-[#D7E2EA]" style={bodyStyle}>{block.body}</p>}
        {block.points && (
          <ul className="mt-4 space-y-2">
            {block.points.map((p) => <li key={p} className="border-l-2 border-[#B600A8] pl-4 font-light text-[#D7E2EA]/90">{p}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function CaseStudy({ slug }: { slug: string }) {
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];

  if (!p) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="hero-heading text-5xl font-black uppercase">Not found</h1>
        <a href="#projects" className="text-[#D7E2EA] underline">Back to the portfolio</a>
      </main>
    );
  }

  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const pend = p.pending ?? {};
  const written = caseSections.filter((s) => p.caseStudy[s.key]);
  const missing = caseSections.filter((s) => !p.caseStudy[s.key]);
  const screens = p.images.filter((x) => !x.mobile);
  const phones = p.images.filter((x) => x.mobile);

  return (
    <main className="min-h-screen bg-[#0C0C0C] px-5 pb-24 pt-8 sm:px-8 md:px-10">
      <header className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
        <a href="#projects" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70 md:text-base">
          <ArrowLeft size={18} aria-hidden /> All projects
        </a>
        <a href="#top" className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70 md:text-base">Portfolio home</a>
      </header>

      <div className="mx-auto mt-14 max-w-[1200px] md:mt-20">
        <FadeIn>
          <p className="text-sm font-light uppercase tracking-[0.3em] text-[#D7E2EA]/70">Case study {p.number} / {String(projects.length).padStart(2, '0')}</p>
          <h1 className="hero-heading mt-3 font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(2.2rem, 9.5vw, 150px)' }}>{p.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className={`rounded-full border px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA] ${pend.kind ? 'border-dashed border-[#D7E2EA]/40' : 'border-[#D7E2EA]/40'}`}>{p.kind}</span>
            <span className="text-sm font-light uppercase tracking-widest text-[#D7E2EA]/70 sm:text-base">{p.category}</span>
            {p.year && <span className="text-sm font-light text-[#D7E2EA]/50">{p.year}</span>}
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12 md:mt-16">
          <div className="aspect-[16/9] overflow-hidden rounded-[32px] border-2 border-[#D7E2EA]/60 sm:rounded-[48px] md:aspect-[21/9] md:rounded-[60px]">
            <Media image={p.heroImage} eager sizes="(min-width: 1200px) 1200px, 100vw" position="center" />
          </div>
        </FadeIn>

        <div className="mt-14 flex flex-col gap-10 md:mt-20 md:gap-14">
          {written.map((s) => <Block key={s.key} id={`s-${s.key}`} title={s.label} block={p.caseStudy[s.key]!} />)}

          {p.highlights.length > 0 && (
            <section aria-labelledby="s-focus" className="grid gap-4 border-t border-[#D7E2EA]/15 pt-8 md:grid-cols-[1fr_2fr] md:gap-16">
              <h2 id="s-focus" className="text-sm font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/60">Focus areas</h2>
              <ul>
                {p.highlights.map((h, n) => (
                  <li key={h} className="flex items-baseline gap-5 border-b border-[#D7E2EA]/15 py-3 first:pt-0">
                    <span className="font-black text-[#D7E2EA]/40">{String(n + 1).padStart(2, '0')}</span>
                    <span className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.3rem)' }}>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="s-final" className="border-t border-[#D7E2EA]/15 pt-8">
            <h2 id="s-final" className={label}>Final screens</h2>
            <div className="flex flex-col gap-8 sm:gap-10">
              {screens.map((img) => (
                <figure key={img.src}>
                  <div className="overflow-hidden rounded-[20px] border border-[#D7E2EA]/25 sm:rounded-[32px]">
                    <Media image={img} sizes="(min-width: 1200px) 1200px, 100vw" className="!h-auto object-contain" />
                  </div>
                  {img.caption && <figcaption className="mt-3 px-2 text-xs font-light uppercase tracking-[0.2em] text-[#D7E2EA]/60">{img.caption}</figcaption>}
                </figure>
              ))}
              {phones.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                  {phones.map((img) => (
                    <figure key={img.src}>
                      <div className="overflow-hidden rounded-[20px] border border-[#D7E2EA]/25 sm:rounded-[28px]">
                        <Media image={img} sizes="(min-width: 768px) 25vw, 50vw" className="!h-auto object-contain" />
                      </div>
                      {img.caption && <figcaption className="mt-3 px-2 text-xs font-light uppercase tracking-[0.2em] text-[#D7E2EA]/60">{img.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
            </div>
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA]/10">Visit project</a>
            )}
          </section>

          {missing.length > 0 && (
            <section aria-labelledby="s-missing" className="rounded-[28px] border border-dashed border-[#D7E2EA]/30 p-6 sm:p-8">
              <h2 id="s-missing" className={label}>Still to add (editable)</h2>
              <p className="mb-4 max-w-xl font-light text-[#D7E2EA]/70">These sections stay hidden until real material exists. Fill them in under <code className="text-[#D7E2EA]">caseStudy</code> in <code className="text-[#D7E2EA]">src/content/content.ts</code>.</p>
              <ul className="flex flex-wrap gap-2">
                {missing.map((s) => <li key={s.key} className="rounded-full border border-[#D7E2EA]/25 px-3 py-1 text-xs font-light uppercase tracking-wider text-[#D7E2EA]/70">{s.label}</li>)}
              </ul>
            </section>
          )}
        </div>

        <nav aria-label="Case study navigation" className="mt-20 grid gap-6 border-t border-[#D7E2EA]/15 pt-10 sm:grid-cols-2 md:mt-28">
          <a href={`#project-${prev.slug}`} className="group inline-flex min-w-0 items-center gap-3 font-medium uppercase tracking-wider text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
            <ArrowLeft size={22} className="shrink-0 transition-transform group-hover:-translate-x-1" aria-hidden /> <span className="truncate">Previous: {prev.title}</span>
          </a>
          <a href={`#project-${next.slug}`} className="group inline-flex min-w-0 items-center gap-3 font-medium uppercase tracking-wider text-[#D7E2EA] sm:justify-end" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
            <span className="truncate">Next: {next.title}</span> <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </nav>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <a href="#projects" className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] underline-offset-4 hover:underline">Back to all projects</a>
          <ContactButton label={contact.cta} href="#contact" />
        </div>
      </div>
    </main>
  );
}
