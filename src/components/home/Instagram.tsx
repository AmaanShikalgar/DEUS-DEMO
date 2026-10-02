import { Img } from '@/components/ui/Img';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { InstagramIcon } from '@/components/ui/Icons';
import { site } from '@/config/site';
import './Instagram.css';

export function Instagram({ heading = 'DEUS / DAILY', images }: { heading?: string; images?: string[] }) {
  const list = images ?? [...site.community];
  return (
    <ScrollReveal as="section" className="instagram section-padding">
      <div className="container">
        <div className="section-header" data-scroll-reveal-child><h2 className="section-header__heading">{heading}</h2></div>
        <div className={`instagram__grid${list.length % 4 === 0 ? ' instagram__grid--4' : ''}`} data-scroll-reveal-child>
          {list.map((src, i) => (
            <a key={src} href={site.instagram.url} className="instagram__item" target="_blank" rel="noopener noreferrer" aria-label="View on Instagram">
              <Img src={src} alt={`Instagram post ${i + 1}`} className="instagram__image" />
              <div className="instagram__overlay"><InstagramIcon width={28} height={28} /></div>
            </a>
          ))}
        </div>
        <div className="instagram__cta" data-scroll-reveal-child>
          <a href={site.instagram.url} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
            <InstagramIcon width={16} height={16} /><span>FOLLOW {site.instagram.handle.toUpperCase()}</span>
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}
