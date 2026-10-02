import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/shopify';
import { ProductGrid } from '@/components/product/ProductGrid';

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) notFound();
  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-header"><h1 className="section-header__heading">{collection.title}</h1></div>
        <ProductGrid products={collection.products} columns={3} />
      </div>
    </section>
  );
}
