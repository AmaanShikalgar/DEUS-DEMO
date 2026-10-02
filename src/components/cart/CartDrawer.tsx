'use client';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { CloseIcon, BagIcon, PlusIcon, MinusIcon } from '@/components/ui/Icons';
import { Img } from '@/components/ui/Img';
import { cn, formatPrice } from '@/lib/format';

export function CartDrawer() {
  const { cart, isOpen, close, updateQuantity, removeLine } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <div className={cn('cart-drawer', isOpen && 'is-open')} aria-hidden={!isOpen} role="dialog" aria-label="Shopping cart">
      <div className="cart-drawer__overlay" onClick={close} />
      <div className="cart-drawer__panel">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">CART <span className="cart-drawer__count">({cart?.totalQuantity ?? 0})</span></h2>
          <button className="cart-drawer__close" onClick={close} aria-label="Close cart"><CloseIcon /></button>
        </div>

        {lines.length === 0 ? (
          <div className="cart-drawer__empty">
            <BagIcon className="cart-drawer__empty-icon" width={48} height={48} />
            <p className="cart-drawer__empty-text">Your cart is empty</p>
            <Link href="/collections/all" className="btn btn--outline" onClick={close}>CONTINUE SHOPPING</Link>
          </div>
        ) : (
          <>
            <div className="cart-drawer__body">
              {lines.map((line) => (
                <div className="cart-drawer__item" key={line.id}>
                  <div className="cart-drawer__item-image">
                    {line.merchandise.product.image && <Img src={line.merchandise.product.image.url} alt={line.merchandise.product.title} width={160} height={200} sizes="96px" />}
                  </div>
                  <div>
                    <div className="cart-drawer__item-header">
                      <Link href={`/products/${line.merchandise.product.handle}`} className="cart-drawer__item-title" onClick={close}>
                        {line.merchandise.product.title}
                      </Link>
                      <button className="cart-drawer__item-remove" onClick={() => removeLine(line.id)} aria-label="Remove item"><CloseIcon width={16} height={16} /></button>
                    </div>
                    <p className="cart-drawer__item-variant">{line.merchandise.title}</p>
                    <div className="cart-drawer__item-bottom">
                      <div className="cart-drawer__quantity">
                        <button className="cart-drawer__quantity-btn" onClick={() => updateQuantity(line.id, line.quantity - 1)} aria-label="Decrease quantity"><MinusIcon /></button>
                        <input className="cart-drawer__quantity-input" type="number" value={line.quantity} readOnly aria-label="Quantity" />
                        <button className="cart-drawer__quantity-btn" onClick={() => updateQuantity(line.id, line.quantity + 1)} aria-label="Increase quantity"><PlusIcon /></button>
                      </div>
                      <span className="cart-drawer__item-price">{formatPrice(Number(line.merchandise.price.amount) * line.quantity, line.merchandise.price.currencyCode)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal"><span>Subtotal</span><span>{formatPrice(cart!.subtotal.amount, cart!.subtotal.currencyCode)}</span></div>
              <p className="cart-drawer__note">Shipping and taxes calculated at checkout.</p>
              <a href={cart!.checkoutUrl} className="btn btn--primary btn--full cart-drawer__checkout-btn">CHECKOUT</a>
              <button className="cart-drawer__continue" onClick={close} style={{ background: 'none', border: 'none', width: '100%' }}>Continue shopping</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
