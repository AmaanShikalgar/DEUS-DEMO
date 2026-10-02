import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/shopify';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';

/** Pre-render every product at build time; new products are generated on first visit. */
export async function generateStaticParams() {
  try {
    return (await getProducts()).map((p) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();
  return (
    <section className="section-padding">
      <div className="container">
        <div className="product-page__grid">
          <ProductGallery images={product.images} title={product.title} />
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  );
}
