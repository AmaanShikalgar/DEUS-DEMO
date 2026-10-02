'use client';
import { useRef, useState, type ReactNode } from 'react';
import { Img } from '@/components/ui/Img';
import { cn } from '@/lib/format';

type Props = {
  images: readonly string[];
  /** Time each slide stays on screen. */
  intervalMs?: number;
  children: ReactNode;
};

/**
 * Full-bleed hero carousel: crossfading slides with a slow zoom, a progress-bar
 * indicator per slide, click-to-jump dots and swipe on touch screens.
 *
 * Autoplay has no timer in JS: the active dot's progress bar is a CSS animation and
 * its `animationend` event advances to the next slide. That keeps the bar and the
 * slide change perfectly in sync, and (see hero.css) it simply doesn't autoplay when
 * the visitor prefers reduced motion or while a dot has keyboard focus.
 */
export function HeroCarousel({ images, intervalMs = 6000, children }: Props) {
  const [index, setIndex] = useState(0);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;
  const go = (i: number) => setIndex(((i % count) + count) % count);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured"
      style={{ ['--hero-interval' as string]: `${intervalMs}ms` }}
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') swipeStart.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const start = swipeStart.current;
        swipeStart.current = null;
        if (!start) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
      }}
      onPointerCancel={() => { swipeStart.current = null; }}
    >
      <div className="hero__media">
        {images.map((src, i) => (
          <div key={src} className={cn('hero__slide', i === index && 'is-active')} aria-hidden={i !== index}>
            <Img src={src} alt="" className="hero__image" loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
      <div className="hero__overlay" />

      {children}

      {count > 1 && (
        <div className="hero__dots">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={cn('hero__dot', i === index && 'is-active')}
              onClick={() => go(i)}
              aria-label={`Show slide ${i + 1} of ${count}`}
              aria-current={i === index ? 'true' : undefined}
            >
              <span className="hero__dot-bar">
                {i === index && <span className="hero__dot-fill" onAnimationEnd={() => go(index + 1)} />}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
