'use client';
import { useMemo, useState } from 'react';
import type { Product } from '@/lib/shopify';
import { useCart } from '@/components/cart/CartProvider';
import { SizeChartModal } from './SizeChartModal';
import { ChevronIcon, PlusIcon, MinusIcon } from '@/components/ui/Icons';
import { cn, formatPrice } from '@/lib/format';

export function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(product.options.map((o) => [o.name, o.values[0]])),
  );
  const [quantity, setQuantity] = useState(1);

  const variant = useMemo(
    () => product.variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)) ?? product.variants[0],
    [product.variants, selected],
  );
  const price = variant.price;
  const compare = variant.compareAtPrice;
  const onSale = !!compare && Number(compare.amount) > Number(price.amount);

  return (
    <div className="product-page__info">
      <span className="product-page__vendor">{product.vendor}</span>
      <h1 className="product-page__title">{product.title}</h1>

      <div className="product-page__price-wrapper">
        <div className={cn('price', onSale && 'price--on-sale')}>
          <div className="price__container">
            {onSale ? (
              <>
                <span className="price__regular price__regular--compare">{formatPrice(compare!.amount, price.currencyCode)}</span>
                <span className="price__sale">{formatPrice(price.amount, price.currencyCode)}</span>
              </>
            ) : (
              <span className="price__regular">{formatPrice(price.amount, price.currencyCode)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="product-page__stock">
        <span className={cn('product-page__stock-dot', variant.availableForSale ? 'product-page__stock-dot--high' : 'product-page__stock-dot--out')} />
        <span className={cn('product-page__stock-text', !variant.availableForSale && 'product-page__stock-text--out')}>
          {variant.availableForSale ? 'In stock' : 'Sold out'}
        </span>
      </div>

      <div className="product-page__variants">
        {product.options.map((opt) => (
          <div className="product-page__option" key={opt.name}>
            <div className="product-page__option-label">
              {opt.name}: <span className="product-page__option-value">{selected[opt.name]}</span>
              {opt.name.toLowerCase() === 'size' && <SizeChartModal />}
            </div>
            <div className="product-page__option-values">
              {opt.values.map((val) => (
                <button key={val} type="button" className={cn('product-page__swatch', selected[opt.name] === val && 'is-selected')}
                  onClick={() => setSelected((s) => ({ ...s, [opt.name]: val }))}>
                  <span className="product-page__swatch-label">{val}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="product-page__actions">
        <div className="product-page__quantity">
          <div className="product-page__quantity-selector">
            <button type="button" className="product-page__quantity-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><MinusIcon /></button>
            <input className="product-page__quantity-input" type="number" min={1} value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))} aria-label="Quantity" />
            <button type="button" className="product-page__quantity-btn" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity"><PlusIcon /></button>
          </div>
        </div>
        <button type="button" className="btn btn--primary btn--full product-page__add-to-cart" disabled={!variant.availableForSale}
          onClick={() => addItem({ variantId: variant.id, title: variant.title, handle: product.handle, productTitle: product.title, image: product.images[0]?.url ?? null, price: price.amount, currency: price.currencyCode }, quantity)}>
          {variant.availableForSale ? 'ADD TO BAG' : 'SOLD OUT'}
        </button>
      </div>

      <div className="product-page__accordions">
        <details className="product-page__accordion" open>
          <summary className="product-page__accordion-title">DESCRIPTION <ChevronIcon /></summary>
          <div className="product-page__accordion-content rte" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </details>
        <details className="product-page__accordion">
          <summary className="product-page__accordion-title">SHIPPING & RETURNS <ChevronIcon /></summary>
          <div className="product-page__accordion-content"><p>Placeholder shipping and returns information.</p></div>
        </details>
      </div>
    </div>
  );
}
