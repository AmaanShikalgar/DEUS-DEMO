/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from 'react';

/**
 * Thin wrapper so the original CSS (which targets plain <img>) keeps working exactly.
 * Swap the body for next/image later if you want automatic optimisation.
 */
export function Img({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement> & { alt: string }) {
  return <img loading="lazy" decoding="async" alt={alt} {...props} />;
}
