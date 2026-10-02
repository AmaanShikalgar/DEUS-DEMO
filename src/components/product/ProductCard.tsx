import Link from 'next/link';
import type { Product } from '@/lib/shopify';
import { Img } from '@/components/ui/Img';
import { ArrowIcon } from '@/components/ui/Icons';
import { formatPrice } from '@/lib/format';

export function ProductCard({ product }: { product: Product }) {
  const { price, compareAtPrice, availableForSale: inStock } = product;
  const onSale = !!compareAtPrice && Number(compareAtPrice.amount) > Number(price.amount);
  const percentOff = onSale ? Math.round((1 - Number(price.amount) / Number(compareAtPrice!.amount)) * 100) : 0;
  const [primary, hover] = product.images;
  const href = `/products/${product.handle}`;

  return (
    <article className="product-card">
      <Link href={href} className="product-card__link" aria-label={product.title}>
        <div className="product-card__media">
          {primary && <Img src={primary.url} alt={product.title} className="product-card__image product-card__image--primary" fill sizes="(min-width: 1024px) 33vw, 50vw" />}
          {hover && <Img src={hover.url} alt={product.title} className="product-card__image product-card__image--hover" fill sizes="(min-width: 1024px) 33vw, 50vw" />}
          {!inStock && <span className="product-card__badge product-card__badge--sold-out">Sold Out</span>}
          {inStock && onSale && <span className="product-card__badge product-card__badge--sale">-{percentOff}%</span>}
        </div>
        <div className="product-card__info">
          <span className="product-card__vendor">{product.vendor}</span>
          <h3 className="product-card__title">{product.title}</h3>
          <div className={`price ${!inStock ? 'price--sold-out' : onSale ? 'price--on-sale' : ''}`}>
            {!inStock && <span className="price__badge price__badge--sold-out">Sold Out</span>}
            {inStock && onSale && <span className="price__badge price__badge--sale">Sale</span>}
            <div className="price__container">
              {onSale && inStock ? (
                <>
                  <span className="price__regular price__regular--compare">{formatPrice(compareAtPrice!.amount, price.currencyCode)}</span>
                  <span className="price__sale">{formatPrice(price.amount, price.currencyCode)}</span>
                </>
              ) : (
                <span className="price__regular">{formatPrice(price.amount, price.currencyCode)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      {inStock && (
        <Link href={href} className="product-card__quick-add-btn product-card__quick-add-btn--options" aria-label={`View options for ${product.title}`}>
          <span>Select Options</span><ArrowIcon />
        </Link>
      )}
    </article>
  );
}
