import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeroCarousel } from './HeroCarousel';

type Props = { subheading: string; heading: string; cta: { label: string; href: string }; images: readonly string[] };

export function Hero({ subheading, heading, cta, images }: Props) {
  return (
    <HeroCarousel images={images}>
      <div className="hero__content hero__content--center">
        <ScrollReveal className="hero__content-inner container">
          <p className="hero__subheading" data-scroll-reveal-child>{subheading}</p>
          <h1 className="hero__heading" data-scroll-reveal-child>{heading}</h1>
          <div className="hero__buttons" data-scroll-reveal-child>
            <Link href={cta.href} className="btn btn--primary">{cta.label}</Link>
          </div>
        </ScrollReveal>
      </div>
    </HeroCarousel>
  );
}
