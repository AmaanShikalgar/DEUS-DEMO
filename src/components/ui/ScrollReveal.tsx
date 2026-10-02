'use client';
import { createElement, useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/format';

type Props = { as?: 'div' | 'section'; className?: string; id?: string; children: ReactNode };

/**
 * Adds `is-revealed` once the element scrolls into view. The staggered fade-up of its
 * `data-scroll-reveal-child` children is pure CSS (see styles/animations.css).
 * Same IntersectionObserver settings as the original site.
 */
export function ScrollReveal({ as = 'div', className, id, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(as, { ref, id, className: cn(className, revealed && 'is-revealed'), 'data-scroll-reveal': '' }, children);
}
