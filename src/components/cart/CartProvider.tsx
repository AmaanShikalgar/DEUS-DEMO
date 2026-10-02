'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { cartAction } from '@/app/actions';
import type { Cart, CartLine } from '@/lib/shopify/types';

export type AddItemInput = { variantId: string; title: string; handle: string; productTitle: string; image: string | null; price: string; currency: string };

type CartCtx = {
  cart: Cart | null; isOpen: boolean; open: () => void; close: () => void;
  addItem: (item: AddItemInput, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

const Ctx = createContext<CartCtx | null>(null);
export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used inside <CartProvider>');
  return c;
};

const KEY = 'cart-id';
const empty = (): Cart => ({ id: 'local', checkoutUrl: '#', totalQuantity: 0, subtotal: { amount: '0', currencyCode: 'INR' }, lines: [] });
const recalc = (c: Cart): Cart => ({
  ...c, totalQuantity: c.lines.reduce((n, l) => n + l.quantity, 0),
  subtotal: { ...c.subtotal, amount: String(c.lines.reduce((n, l) => n + l.quantity * Number(l.merchandise.price.amount), 0)) },
});

/**
 * Cart state. With Shopify configured it talks to the Storefront Cart API through server actions;
 * without it, it keeps an in-memory cart so the drawer can be developed and demoed.
 */
export function CartProvider({ children, live }: { children: ReactNode; live: boolean }) {
  const [cart, setCart] = useState<Cart | null>(live ? null : empty());
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!live) return;
    let id: string | null = null;
    try { id = localStorage.getItem(KEY); } catch {}
    if (id) cartAction('get', { cartId: id }).then((c) => setCart(c ?? empty()));
    else setCart(empty());
  }, [live]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const addItem = useCallback(async (item: AddItemInput, quantity = 1) => {
    if (live) {
      const lines = [{ merchandiseId: item.variantId, quantity }];
      const id = cart && cart.id !== 'local' ? cart.id : null;
      const next = id ? await cartAction('add', { cartId: id, lines }) : await cartAction('create', { lines });
      if (next) { setCart(next); try { localStorage.setItem(KEY, next.id); } catch {} }
    } else {
      setCart((prev) => {
        const c = prev ?? empty();
        const existing = c.lines.find((l) => l.merchandise.id === item.variantId);
        const lines: CartLine[] = existing
          ? c.lines.map((l) => (l === existing ? { ...l, quantity: l.quantity + quantity } : l))
          : [...c.lines, { id: item.variantId, quantity, merchandise: { id: item.variantId, title: item.title, price: { amount: item.price, currencyCode: item.currency }, product: { handle: item.handle, title: item.productTitle, image: item.image ? { url: item.image, altText: item.productTitle } : null } } }];
        return recalc({ ...c, lines });
      });
    }
    setOpen(true);
  }, [cart, live]);

  const removeLine = useCallback(async (lineId: string) => {
    if (live && cart) { const n = await cartAction('remove', { cartId: cart.id, lineIds: [lineId] }); if (n) setCart(n); }
    else setCart((c) => (c ? recalc({ ...c, lines: c.lines.filter((l) => l.id !== lineId) }) : c));
  }, [cart, live]);
  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (quantity < 1) return removeLine(lineId);
    if (live && cart) { const n = await cartAction('update', { cartId: cart.id, lines: [{ id: lineId, quantity }] }); if (n) setCart(n); }
    else setCart((c) => (c ? recalc({ ...c, lines: c.lines.map((l) => (l.id === lineId ? { ...l, quantity } : l)) }) : c));
  }, [cart, live]);


  const value = useMemo(() => ({ cart, isOpen, open: () => setOpen(true), close: () => setOpen(false), addItem, updateQuantity, removeLine }),
    [cart, isOpen, addItem, updateQuantity, removeLine]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
