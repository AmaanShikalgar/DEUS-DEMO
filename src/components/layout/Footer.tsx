import Link from 'next/link';
import { site } from '@/config/site';
import { InstagramIcon, ArrowIcon } from '@/components/ui/Icons';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__main container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label={site.name}>{site.name}</Link>
            <p className="footer__tagline">{site.tagline}</p>
            <p className="footer__description">{site.description}</p>
              <div className="footer__social">
                <a href={site.instagram.url} className="footer__social-pill" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon width={18} height={18} /><span>{site.instagram.handle}</span><ArrowIcon />
                </a>
              </div>
<a href={`mailto:${site.email}`} className="footer__email">{site.email}</a>
          </div>
          <div className="footer__nav">
            <h3 className="footer__nav-title">SHOP</h3>
            <ul className="footer__nav-list">
              {site.nav.filter((n) => n.href.startsWith('/collections')).map((n) => (
                <li className="footer__nav-item" key={n.href}><Link href={n.href} className="footer__nav-link">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer__nav">
            <h3 className="footer__nav-title">HELP & INFO</h3>
            <ul className="footer__nav-list">
              {site.footerHelp.map((n) => (
                <li className="footer__nav-item" key={n.href}><Link href={n.href} className="footer__nav-link">{n.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom-inner container">
          <p className="footer__copyright">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a href="#main-content" className="footer__top">Back to top <ArrowIcon /></a>
        </div>
      </div>
    </footer>
  );
}
