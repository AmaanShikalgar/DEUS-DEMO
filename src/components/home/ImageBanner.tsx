import Link from 'next/link';
import { Img } from '@/components/ui/Img';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import './ImageBanner.css';

type Props = { subheading: string; heading: string; cta: { label: string; href: string }; image: string };

export function ImageBanner({ subheading, heading, cta, image }: Props) {
  return (
    <section className="image-banner">
      <div className="image-banner__media"><Img src={image} alt={heading} className="image-banner__image" fill sizes="100vw" /></div>
      <div className="image-banner__overlay" />
      <ScrollReveal className="image-banner__content image-banner__content--center">
        <div className="container">
          <p className="image-banner__subheading" data-scroll-reveal-child>{subheading}</p>
          <h2 className="image-banner__heading" data-scroll-reveal-child>{heading}</h2>
          <div data-scroll-reveal-child><Link href={cta.href} className="btn btn--primary">{cta.label}</Link></div>
        </div>
      </ScrollReveal>
    </section>
  );
}
