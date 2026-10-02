/**
 * All photos go through next/image: it serves AVIF/WebP, resized to the screen,
 * lazy-loaded, from Vercel's CDN. Give each use a `sizes` hint (how wide the image
 * renders) and either width/height or `fill` inside a positioned parent.
 */
export { default as Img } from 'next/image';
