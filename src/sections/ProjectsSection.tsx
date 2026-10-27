import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CaseButton from '../components/CaseButton';
import Placeholder from '../components/Placeholder';
import { projects, type Project } from '../content/content';

const radius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';
const numStyle = { fontSize: 'clamp(3rem, 10vw, 140px)' } as const;

function Shot({ project, i, style }: { project: Project; i: number; style: React.CSSProperties }) {
  const img = project.images[i];
  return (
    <div className={`overflow-hidden ${radius}`} style={style}>
      {img ? (
        <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ) : (
        <Placeholder label={`${project.name} — screen ${i + 1}`} />
      )}
    </div>
  );
}

function Card({ project, index, total, animate }: { project: Project; index: number; total: number; animate: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={container} className="min-h-[85vh]">
      <motion.article
        aria-labelledby={`p-${project.slug}`}
        className={`sticky top-[calc(6rem+var(--o))] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:top-[calc(8rem+var(--o))] md:p-8 ${radius}`}
        style={{ scale: animate ? scale : 1, ['--o' as string]: `${index * 28}px`, transformOrigin: 'top center' }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-2 sm:mb-6 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="hero-heading font-black leading-none" style={numStyle}>{project.number}</span>
            <div>
              <p className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/70 sm:text-sm">{project.category}</p>
              <h3 id={`p-${project.slug}`} className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2.2rem)' }}>
                {project.name}
              </h3>
              <span className="mt-1 inline-block rounded-full border border-[#D7E2EA]/40 px-3 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/80 sm:text-xs">
                {project.kind}
              </span>
            </div>
          </div>
          <CaseButton href={`#/project/${project.slug}`}>Case study</CaseButton>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            <Shot project={project} i={0} style={{ height: 'clamp(130px, 16vw, 230px)' }} />
            <Shot project={project} i={1} style={{ height: 'clamp(160px, 22vw, 340px)' }} />
          </div>
          <div className="w-[60%]">
            <Shot project={project} i={2} style={{ height: 'calc(clamp(130px, 16vw, 230px) + clamp(160px, 22vw, 340px) + 0.75rem)' }} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection({ animate }: { animate: boolean }) {
  return (
    <section
      id="projects"
      className="relative z-30 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <h2 className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
        Projects
      </h2>
      <div className="mx-auto max-w-[1400px]">
        {projects.map((p, i) => (
          <Card key={p.slug} project={p} index={i} total={projects.length} animate={animate} />
        ))}
      </div>
    </section>
  );
}
