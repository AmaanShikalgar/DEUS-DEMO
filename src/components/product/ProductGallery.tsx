'use client';
import { useState } from 'react';
import type { Image } from '@/lib/shopify';
import { Img } from '@/components/ui/Img';
import { cn } from '@/lib/format';

export function ProductGallery({ images, title }: { images: Image[]; title: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="product-page__gallery-main">
        {images.map((img, i) => (
          <div key={img.url} className={cn('product-page__gallery-slide', i === active && 'is-active')}>
            <Img src={img.url} alt={img.altText ?? title} className="product-page__image" loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="product-page__thumbnails">
          {images.map((img, i) => (
            <button key={img.url} className={cn('product-page__thumbnail', i === active && 'is-active')} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`}>
              <Img src={img.url} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
