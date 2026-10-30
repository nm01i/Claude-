import { useState } from 'react';
import type { ProjectImage } from '../content/content';

type Props = { image: ProjectImage; className?: string; eager?: boolean; position?: string; sizes?: string };

/** A real project image. Width/height are intrinsic so the layout does not shift while it loads. */
export default function Media({ image, className = '', eager, position = 'top', sizes }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div role="img" aria-label={image.alt} className="flex h-full w-full items-center justify-center bg-[#14121a] p-4 text-center text-xs font-light text-[#D7E2EA]/60">{image.alt}</div>;
  }
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      style={{ objectPosition: position }}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
