'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StarIcon, PrevIcon, NextIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/format';
import './Testimonials.css';

type Item = { name: string; rating: number; text: string };
type Props = { subheading: string; heading: string; items: readonly Item[]; autoplay?: boolean; speedSeconds?: number };

/** Crossfading slider: autoplay, pause on hover, prev/next, dots. Same behaviour as the original. */
export function Testimonials({ subheading, heading, items, autoplay = true, speedSeconds = 5 }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = items.length;

  const goTo = useCallback((i: number) => setCurrent(((i % count) + count) % count), [count]);

  // Restarts whenever the slide changes (manual navigation resets the timer, as before)
  useEffect(() => {
    if (!autoplay || paused || count <= 1) return;
    timer.current = setInterval(() => setCurrent((c) => (c + 1) % count), speedSeconds * 1000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [autoplay, paused, count, speedSeconds, current]);

  return (
    <ScrollReveal as="section" className="testimonials section-padding">
      <div className="container">
        <div className="section-header" data-scroll-reveal-child>
          <p className="section-header__subheading">{subheading}</p>
          <h2 className="section-header__heading">{heading}</h2>
        </div>
        <div className="testimonials__slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="testimonials__track">
            {items.map((t, i) => (
              <div key={i} className={cn('testimonials__slide', i === current && 'is-active')}>
                <blockquote className="testimonials__quote">
                  <div className="testimonials__stars" aria-label={`${t.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} filled={n <= t.rating} />)}
                  </div>
                  <p className="testimonials__text">“{t.text}”</p>
                  <footer className="testimonials__author"><cite className="testimonials__name">{t.name}</cite></footer>
                </blockquote>
              </div>
            ))}
          </div>
          {count > 1 && (
            <div className="testimonials__nav">
              <button className="testimonials__nav-btn testimonials__nav-btn--prev" onClick={() => goTo(current - 1)} aria-label="Previous testimonial"><PrevIcon /></button>
              <div className="testimonials__dots">
                {items.map((_, i) => (
                  <button key={i} className={cn('testimonials__dot', i === current && 'is-active')} onClick={() => goTo(i)} aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button className="testimonials__nav-btn testimonials__nav-btn--next" onClick={() => goTo(current + 1)} aria-label="Next testimonial"><NextIcon /></button>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
