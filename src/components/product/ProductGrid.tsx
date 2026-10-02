import type { Product } from '@/lib/shopify';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, columns = 2 }: { products: Product[]; columns?: 2 | 3 | 4 }) {
  if (!products.length) return <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>No products found.</p>;
  return (
    <div className={`product-grid product-grid--${columns}-col`}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
