import type { SVGProps } from 'react';

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...p,
});

export const MenuIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
export const CloseIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const SearchIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>;
export const UserIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>;
export const BagIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>;
export const ArrowIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base({ width: 16, height: 16, ...p })}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ChevronIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base({ width: 16, height: 16, ...p })}><path d="M6 9l6 6 6-6" /></svg>;
export const PrevIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base({ width: 16, height: 16, ...p })}><path d="M15 6l-6 6 6 6" /></svg>;
export const NextIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base({ width: 16, height: 16, ...p })}><path d="M9 6l6 6-6 6" /></svg>;
export const PlusIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base({ width: 14, height: 14, ...p })}><path d="M12 5v14M5 12h14" /></svg>;
export const MinusIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base({ width: 14, height: 14, ...p })}><path d="M5 12h14" /></svg>;
export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>;
export const StarIcon = ({ filled = true, ...p }: SVGProps<SVGSVGElement> & { filled?: boolean }) => (
  <svg {...base({ width: 16, height: 16, ...p })} fill={filled ? 'currentColor' : 'none'}><path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7L12 3z" /></svg>
);
