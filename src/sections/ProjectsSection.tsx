import { ArrowUpRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import Media from '../components/Media';
import { projects, type Project } from '../content/content';

const radius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

// One restrained accent per project, used as a small marker.
const ACCENTS = ['#B600A8', '#BE4C00', '#7621B0', '#BBCCD7', '#4F7CAC'];

/** Editorial rhythm: each project gets its own composition; the system (type, radius, border) stays constant. */
const LAYOUTS = [
  { wrap: 'md:grid-cols-12', media: 'md:col-span-7 aspect-[3/2]', text: 'md:col-span-5 md:self-end', order: '' },
  { wrap: 'md:grid-cols-12', media: 'md:col-span-5 md:col-start-8 aspect-[3/2] md:order-2', text: 'md:col-span-6 md:col-start-1 md:order-1 md:self-start md:pt-16', order: '' },
  { wrap: 'md:grid-cols-12', media: 'md:col-span-12 aspect-[16/9]', text: 'md:col-span-8 md:col-start-3 md:text-left', order: '' },
  { wrap: 'md:grid-cols-12', media: 'md:col-span-6 aspect-[4/3]', text: 'md:col-span-5 md:col-start-8 md:self-center', order: '' },
  { wrap: 'md:grid-cols-12', media: 'md:col-span-8 md:col-start-3 aspect-[3/2]', text: 'md:col-span-8 md:col-start-3', order: '' },
] as const;

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-2 inline-block rounded-full border border-dashed border-[#D7E2EA]/40 px-2 py-0.5 align-middle text-[10px] font-medium uppercase tracking-[0.18em] text-[#D7E2EA]/60">
      {children}
    </span>
  );
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const l = LAYOUTS[index % LAYOUTS.length];
  const tint = ACCENTS[index % ACCENTS.length];
  const href = `#project-${project.slug}`;
  const pend = project.pending ?? {};

  return (
    <FadeIn y={50} className="w-full">
      <article aria-labelledby={`p-${project.slug}`} className={`group grid grid-cols-1 gap-8 md:gap-x-8 md:gap-y-10 ${l.wrap}`}>
        <a
          href={href}
          aria-label={`View case study: ${project.title}`}
          className={`block overflow-hidden border-2 border-[#D7E2EA]/70 bg-[#14121a] ${radius} ${l.media}`}
        >
          <Media
            image={project.coverImage}
            eager={index === 0}
            sizes="(min-width: 768px) 60vw, 100vw"
            position="center"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </a>

        <div className={`flex flex-col gap-4 px-2 sm:px-4 ${l.text}`}>
          <div className="flex items-end gap-4">
            <span className="hero-heading font-black leading-[0.85]" style={{ fontSize: 'clamp(3rem, 8vw, 110px)' }}>{project.number}</span>
            <span aria-hidden className="mb-2 h-[3px] w-10 rounded-full sm:w-16" style={{ background: tint }} />
          </div>
          <p className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/70 sm:text-sm">
            {project.category}
            {project.year && <span className="ml-3 text-[#D7E2EA]/50">{project.year}</span>}
          </p>
          <h3
            id={`p-${project.slug}`}
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.6rem)' }}
          >
            {project.title}
          </h3>
          <div>
            <span className={`inline-block rounded-full border px-3 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/80 sm:text-xs ${pend.kind ? 'border-dashed border-[#D7E2EA]/40' : 'border-[#D7E2EA]/40'}`}>
              {project.kind}
            </span>
          </div>
          <p className="max-w-xl font-light leading-relaxed text-[#D7E2EA]" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}>
            {project.description}
            {pend.description && <Pending>Editable</Pending>}
          </p>
          {project.highlights.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {project.highlights.map((h) => (
                <li key={h} className="rounded-full bg-[#D7E2EA]/10 px-3 py-1 text-[11px] font-light uppercase tracking-wider text-[#D7E2EA]/85 sm:text-xs">{h}</li>
              ))}
            </ul>
          )}
          <a
            href={href}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-7 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-9 sm:text-base"
          >
            View Case Study <ArrowUpRight size={18} aria-hidden />
          </a>
        </div>
      </article>
    </FadeIn>
  );
}

// `animate` stays in the signature so App does not change; the reveal is one light fade-in per project.
export default function ProjectsSection(_: { animate: boolean }) {
  return (
    <section
      id="projects"
      className="relative z-30 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <h2 className="hero-heading mb-6 text-center font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
        Projects
      </h2>
      <p className="mx-auto mb-16 max-w-md text-center text-sm font-light uppercase tracking-[0.25em] text-[#D7E2EA]/60 sm:mb-24 md:mb-28">
        Selected work · {projects.length} projects
      </p>
      <div className="mx-auto flex max-w-[1300px] flex-col gap-24 sm:gap-32 md:gap-44">
        {projects.map((p, i) => (
          <ProjectEntry key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
