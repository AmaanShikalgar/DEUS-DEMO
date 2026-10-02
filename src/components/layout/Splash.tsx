'use client';
import { useEffect, useState } from 'react';
import { site } from '@/config/site';
import { Img } from '@/components/ui/Img';
import './Splash.css';

/**
 * First-visit loading screen. The inline script in layout.tsx adds `show-splash` to <html>
 * only when sessionStorage has no flag yet, so a refresh (same tab/session) skips it.
 * Sequence: logo reveals → hold → curtain opens onto the page.
 */
export function Splash() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('show-splash')) { setPhase('done'); return; }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdMs = reduce ? 600 : 2300;   // time on screen before the curtain opens
    const exitMs = reduce ? 200 : 1000;   // curtain duration

    const t1 = setTimeout(() => setPhase('out'), holdMs);
    const t2 = setTimeout(() => { root.classList.remove('show-splash'); setPhase('done'); }, holdMs + exitMs);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`splash splash--${phase}`} aria-hidden="true">
      <div className="splash__panel splash__panel--top" />
      <div className="splash__panel splash__panel--bottom" />
      <div className="splash__content">
        <Img src="/images/logo.png" alt={site.name} className="splash__logo" width={316} height={86} priority />
        <span className="splash__bar"><span className="splash__bar-fill" /></span>
      </div>
    </div>
  );
}
