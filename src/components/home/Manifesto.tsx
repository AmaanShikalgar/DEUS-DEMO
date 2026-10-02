import Link from 'next/link';
import { Img } from '@/components/ui/Img';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowIcon } from '@/components/ui/Icons';
import './Manifesto.css';

type Props = { heading: string; paragraphs: string[]; cta: { label: string; href: string }; image: string };

export function Manifesto({ heading, paragraphs, cta, image }: Props) {
  return (
    <ScrollReveal as="section" className="manifesto section-padding">
      <div className="container">
        <div className="manifesto__grid manifesto__grid--image-right">
          <div className="manifesto__content" data-scroll-reveal-child>
            <h2 className="manifesto__heading">{heading}</h2>
            <div className="manifesto__text">{paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
            <Link href={cta.href} className="btn btn--outline manifesto__btn">{cta.label}<ArrowIcon /></Link>
          </div>
          <div className="manifesto__media" data-scroll-reveal-child>
            <Img src={image} alt={heading} className="manifesto__image" width={1200} height={1600} sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
