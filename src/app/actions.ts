'use server';
import { cartRequest, isShopifyConfigured, type Cart } from '@/lib/shopify';

/** Server actions keep the Storefront token off the client. */
export async function cartAction(
  op: 'create' | 'add' | 'update' | 'remove' | 'get',
  vars: Record<string, unknown>,
): Promise<Cart | null> {
  if (!isShopifyConfigured) return null;
  return cartRequest(op, vars);
}
