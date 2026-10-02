import { getProducts } from '@/lib/shopify';
import { Hero } from '@/components/home/Hero';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { Manifesto } from '@/components/home/Manifesto';
import { ImageBanner } from '@/components/home/ImageBanner';
import { Instagram } from '@/components/home/Instagram';
import { Newsletter } from '@/components/home/Newsletter';

export default async function HomePage() {
  const products = (await getProducts()).slice(0, 3);

  return (
    <>
      <Hero
        subheading="ESSENTIAL PIECES DESIGNED WITH PRECISION, RESTRAINT AND PURPOSE."
        heading="BUILT WITH INTENT."
        cta={{ label: 'SHOP COLLECTION', href: '/collections/all' }}
        images={['/images/Hero1.png', '/images/Hero2.jpg', '/images/Hero3.png', '/images/Hero4.jpg']}
      />
      <FeaturedCollection subheading="Refined staples built for everyday wear." heading="THE ESSENTIALS" products={products} href="/collections/all" columns={3} />
      <Manifesto
        heading="THE WEIGHT OF SIMPLICITY"
        paragraphs={[
          'Every DEUS piece begins with a simple idea: remove what is unnecessary, and refine what remains.',
          'Every fabric is chosen for how it wears, not just how it photographs. We work in heavier cottons and rigid denims, construct seams to hold under repeated wear, and cut each silhouette to move with the body rather than against it.',
          'Nothing is added for the sake of decoration. What stays on a DEUS garment has earned its place.',
        ]}
        cta={{ label: 'DISCOVER THE COLLECTION', href: '/collections/all' }}
        image="/images/Hero.jpg"
      />
      <ImageBanner
        subheading="Oversized · Heavyweight · Essential"
        heading="DESIGNED AROUND THE ESSENTIAL T-SHIRT."
        cta={{ label: 'EXPLORE T-SHIRTS', href: '/collections/t-shirts' }}
        image="/images/First_Collection.png"
      />
      <Instagram heading="DEUS / DAILY" />
      <Newsletter />
    </>
  );
}
