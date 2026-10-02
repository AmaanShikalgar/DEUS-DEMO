'use client';
import Link from 'next/link';
import { Img } from '@/components/ui/Img';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { site } from '@/config/site';
import { useCart } from '@/components/cart/CartProvider';
import { MenuIcon, CloseIcon, SearchIcon, UserIcon, BagIcon, ArrowIcon, InstagramIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/format';

export function Header() {
  const { cart, open: openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Sticky header turns blurred after 50px of scroll (rAF-throttled, like the original)
  useEffect(() => {
    let ticking = false;
    const update = () => { setScrolled(window.scrollY > 50); ticking = false; };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: body lock, focus handling, Escape to close
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (menuOpen) menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) { setMenuOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const count = cart?.totalQuantity ?? 0;

  const sidebar = (
    <div ref={menuRef} className={cn('mobile-menu', menuOpen && 'is-open')} id="mobile-menu" aria-hidden={!menuOpen}>
      <div className="mobile-menu__overlay" onClick={() => setMenuOpen(false)} />
      <div className="mobile-menu__inner">
        <div className="mobile-menu__header">
          <Link href="/" className="mobile-menu__brand" onClick={() => setMenuOpen(false)} aria-label={site.name}>
            <Img src="/images/logo.png" alt={site.name} width={316} height={86} />
          </Link>
          <button className="mobile-menu__close" onClick={() => { setMenuOpen(false); toggleRef.current?.focus(); }} aria-label="Close menu"><CloseIcon /></button>
        </div>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          <ul className="mobile-menu__list">
            {site.nav.map((item, i) => (
              <li className="mobile-menu__item" key={item.href} style={{ ['--item-index' as string]: i }}>
                <Link href={item.href} className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
                  <span className="mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mobile-menu__label">{item.label}</span>
                  <ArrowIcon className="mobile-menu__arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__footer">
          <p className="mobile-menu__tagline">{site.tagline}</p>
          <a href={site.instagram.url} className="mobile-menu__footer-link" target="_blank" rel="noopener noreferrer">
            <InstagramIcon width={18} height={18} /><span>{site.instagram.handle}</span>
          </a>
          <Link href="/pages/account" className="mobile-menu__footer-link" onClick={() => setMenuOpen(false)}>
            <UserIcon width={18} height={18} /><span>Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <header className={cn('header header--sticky header--transparent', scrolled && 'is-scrolled')}>
      <div className="header__inner container">
        <button ref={toggleRef} className="header__menu-toggle" onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
          <span className="header__menu-icon"><MenuIcon /></span>
        </button>

        <div className="header__logo">
          <Link href="/" className="header__logo-link" aria-label={site.name}>
            <Img src="/images/logo.png" alt={site.name} className="header__logo-image" width={316} height={86} loading="eager" />
          </Link>
        </div>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {site.nav.map((item) => (
              <li className="header__nav-item" key={item.href}>
                <Link href={item.href} className="header__nav-link">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Link href="/search" className="header__action-btn" aria-label="Search"><SearchIcon /></Link>
          <Link href="/pages/account" className="header__action-btn header__action-btn--account" aria-label="Account"><UserIcon /></Link>
          <button className="header__action-btn header__cart-btn" onClick={openCart} aria-label="Open cart">
            <BagIcon />
            <span className="header__cart-count">{count}</span>
          </button>
        </div>
      </div>

    </header>
    {/* Portal: the header gets backdrop-filter on scroll, which would otherwise trap a fixed sidebar inside it */}
    {mounted && createPortal(sidebar, document.body)}
    </>
  );
}
