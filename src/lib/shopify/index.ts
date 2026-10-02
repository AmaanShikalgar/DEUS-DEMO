import { cache } from 'react';
import { isShopifyConfigured, shopifyFetch } from './client';
import * as q from './queries';
import { placeholderProducts } from './placeholder-data';
import type { Cart, Product } from './types';

export { isShopifyConfigured };
export type * from './types';

type RawProduct = Omit<Product, 'images' | 'variants' | 'price' | 'compareAtPrice'> & {
  images: { nodes: Product['images'] }; variants: { nodes: Product['variants'] };
  priceRange: { minVariantPrice: Product['price'] };
  compareAtPriceRange: { minVariantPrice: Product['price'] };
};

const normalizeProduct = (p: RawProduct): Product => {
  const compare = p.compareAtPriceRange.minVariantPrice;
  return {
    ...p, images: p.images.nodes, variants: p.variants.nodes, price: p.priceRange.minVariantPrice,
    compareAtPrice: Number(compare.amount) > 0 ? compare : null,
  };
};

export const getProduct = cache(async (handle: string): Promise<Product | null> => {
  if (!isShopifyConfigured) return placeholderProducts.find((p) => p.handle === handle) ?? null;
  const data = await shopifyFetch<{ product: RawProduct | null }>(q.productByHandle, { handle });
  return data.product ? normalizeProduct(data.product) : null;
});

export const getCollection = cache(async (handle: string) => {
  if (!isShopifyConfigured) return { title: handle === 't-shirts' ? 'T-SHIRTS' : handle.replace(/-/g, ' ').toUpperCase(), description: '', products: placeholderProducts };
  if (handle === 'all') return { title: 'ALL PRODUCTS', description: '', products: await getProducts() };
  const data = await shopifyFetch<{ collection: { title: string; description: string; products: { nodes: RawProduct[] } } | null }>(q.collectionByHandle, { handle });
  if (!data.collection) return null;
  return { title: data.collection.title, description: data.collection.description, products: data.collection.products.nodes.map(normalizeProduct) };
});

export const getProducts = cache(async (query?: string): Promise<Product[]> => {
  if (!isShopifyConfigured) {
    return placeholderProducts.filter((p) => !query || p.title.toLowerCase().includes(query.toLowerCase()));
  }
  const data = await shopifyFetch<{ products: { nodes: RawProduct[] } }>(q.allProducts, { query: query ?? null });
  return data.products.nodes.map(normalizeProduct);
});

/* ---- Cart (called from the browser via CartProvider's server actions) ---- */
type RawCart = { id: string; checkoutUrl: string; totalQuantity: number; cost: { subtotalAmount: Cart['subtotal'] };
  lines: { nodes: { id: string; quantity: number; merchandise: Cart['lines'][number]['merchandise'] & { product: { handle: string; title: string; featuredImage: Cart['lines'][number]['merchandise']['product']['image'] } } }[] } };

const normalizeCart = (c: RawCart): Cart => ({
  id: c.id, checkoutUrl: c.checkoutUrl, totalQuantity: c.totalQuantity, subtotal: c.cost.subtotalAmount,
  lines: c.lines.nodes.map((l) => ({ id: l.id, quantity: l.quantity, merchandise: { ...l.merchandise, product: { handle: l.merchandise.product.handle, title: l.merchandise.product.title, image: l.merchandise.product.featuredImage } } })),
});

export async function cartRequest(op: 'create' | 'add' | 'update' | 'remove' | 'get', vars: Record<string, unknown>): Promise<Cart | null> {
  const doc = { create: q.cartCreate, add: q.cartLinesAdd, update: q.cartLinesUpdate, remove: q.cartLinesRemove, get: q.cartGet }[op];
  const key = { create: 'cartCreate', add: 'cartLinesAdd', update: 'cartLinesUpdate', remove: 'cartLinesRemove', get: 'cart' }[op];
  const data = await shopifyFetch<Record<string, { cart: RawCart } | RawCart | null>>(doc, vars);
  const node = data[key];
  if (!node) return null;
  return normalizeCart('cart' in node ? node.cart : node);
}
