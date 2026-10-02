import Link from 'next/link';
import type { Product } from '@/lib/shopify';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowIcon } from '@/components/ui/Icons';

type Props = { subheading: string; heading: string; products: Product[]; href: string; columns?: 2 | 3 | 4 };

export function FeaturedCollection({ subheading, heading, products, href, columns }: Props) {
  return (
    <ScrollReveal as="section" className="featured-collection section-padding">
      <div className="container">
        <div className="featured-collection__header section-header" data-scroll-reveal-child>
          <p className="section-header__subheading">{subheading}</p>
          <h2 className="section-header__heading">{heading}</h2>
        </div>
        <div className="featured-collection__grid" data-scroll-reveal-child>
          <ProductGrid products={products} columns={columns} />
        </div>
        <div className="featured-collection__footer" data-scroll-reveal-child>
          <Link href={href} className="btn btn--outline">VIEW ALL<ArrowIcon /></Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
