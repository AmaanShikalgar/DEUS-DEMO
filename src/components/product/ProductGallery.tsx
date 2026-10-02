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
            <Img src={img.url} alt={img.altText ?? title} className="product-page__image" width={1200} height={1600} sizes="(min-width: 1024px) 50vw, 100vw" priority={i === 0} />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="product-page__thumbnails">
          {images.map((img, i) => (
            <button key={img.url} className={cn('product-page__thumbnail', i === active && 'is-active')} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`}>
              <Img src={img.url} alt="" width={128} height={160} sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
