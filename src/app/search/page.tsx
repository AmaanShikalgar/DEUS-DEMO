import { getProducts } from '@/lib/shopify';
import { ProductGrid } from '@/components/product/ProductGrid';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const products = await getProducts(q);
  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-header">
          <h1 className="section-header__heading">SEARCH</h1>
          <form action="/search" style={{ maxWidth: 480, margin: '2rem auto 0' }}>
            <input type="search" name="q" defaultValue={q} placeholder="Search products" aria-label="Search products" />
          </form>
        </div>
        <ProductGrid products={products} columns={3} />
      </div>
    </section>
  );
}
