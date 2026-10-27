import { useState } from 'react';
import Placeholder from './Placeholder';
import type { ProjectImage } from '../content/content';

type Props = { image?: ProjectImage; label: string; hint?: string; tint?: string; className?: string; eager?: boolean };

/** Renders a real image, or a labelled placeholder when it is missing or fails to load. */
export default function Media({ image, label, hint, tint, className = '', eager }: Props) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) return <Placeholder label={label} hint={hint} tint={tint} className={className} />;
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
