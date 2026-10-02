import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/shopify';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';

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
