import { useMotionValueEvent, type MotionValue } from 'framer-motion';
import { useState } from 'react';
import { Mail, Linkedin, Link2 } from 'lucide-react';
import ContactButton from '../components/ContactButton';
import { contact } from '../content/content';

const { links } = contact;

const rows = [
  { key: 'email', label: 'Email', icon: Mail, value: links.email, href: links.email ? `mailto:${links.email}` : '', empty: 'your@email.here' },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, value: links.linkedin, href: links.linkedin, empty: 'Add your LinkedIn URL' },
  { key: 'behance', label: 'Behance / portfolio', icon: Link2, value: links.behance, href: links.behance, empty: 'Add your Behance URL' },
];

function Card() {
  return (
    <div className="w-full max-w-[560px] rounded-[40px] border-2 border-[#D7E2EA]/60 bg-[#0C0C0C]/85 p-7 backdrop-blur-md sm:p-10 md:rounded-[50px]">
      <h2 className="hero-heading font-black uppercase leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}>
        {contact.headline}
      </h2>
      <p className="mt-5 font-light leading-relaxed text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)' }}>{contact.text}</p>
      <div className="mt-8">
        <ContactButton label={contact.cta} href={links.email ? `mailto:${links.email}` : '#contact'} />
      </div>
      <ul className="mt-10 space-y-3">
        {rows.map(({ key, label, icon: Icon, value, href, empty }) => (
          <li key={key}>
            {value ? (
              <a href={href} target={key === 'email' ? undefined : '_blank'} rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-[#D7E2EA]/20 px-5 py-3 transition-colors hover:bg-[#D7E2EA]/10">
                <Icon size={20} aria-hidden />
                <span className="min-w-0">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-[#D7E2EA]/60">{label}</span>
                  <span className="block truncate text-sm sm:text-base">{value}</span>
                </span>
              </a>
            ) : (
              <div className="flex items-center gap-4 rounded-2xl border border-dashed border-[#D7E2EA]/25 px-5 py-3 text-[#D7E2EA]/60">
                <Icon size={20} aria-hidden />
                <span>
                  <span className="block text-[10px] font-medium uppercase tracking-[0.25em]">{label}</span>
                  <span className="block text-sm sm:text-base">{empty}</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type Props = { stageRef: React.RefObject<HTMLElement>; progress: MotionValue<number>; cinematic: boolean };

export default function ContactStage({ stageRef, progress, cinematic }: Props) {
  // Reveal once the camera has swung most of the way to the side view.
  const [shown, setShown] = useState(false);
  useMotionValueEvent(progress, 'change', (v) => setShown(v > 0.6));

  if (!cinematic) {
    return (
      <section id="contact" ref={stageRef} className="flex min-h-screen items-center justify-center bg-[#0C0C0C] px-5 py-24 sm:px-8">
        <Card />
      </section>
    );
  }
  return (
    <section id="contact" ref={stageRef} className="relative z-10" style={{ height: '250vh' }}>
      <div className="sticky top-0 flex h-screen items-center justify-end px-5 sm:px-10 md:px-16">
        <div
          className="w-full max-w-[560px]"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? 'none' : 'translateX(80px)',
            transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.25,0.1,0.25,1)',
            pointerEvents: shown ? 'auto' : 'none',
          }}
        >
          <Card />
        </div>
      </div>
    </section>
  );
}
