import type { Product } from './types';

/** Stand-ins for the three launch T-shirts. Once Shopify is connected these are ignored. */
const money = (amount: string) => ({ amount, currencyCode: 'INR' });
const sizes = ['S', 'M', 'L', 'XL']; // placeholder: confirm real sizes

const tee = (handle: string, title: string, color: string): Product => ({
  id: `placeholder-${handle}`, handle, title, vendor: 'DEUS',
  descriptionHtml: `<p>${color} oversized heavyweight T-shirt. Replace this by editing the product in Shopify.</p>`,
  availableForSale: true,
  images: [1, 2, 3, 4].map((n) => ({
    url: `/products/${handle}/${n}.jpg`,
    altText: n === 1 ? title : `${title}, view ${n}`,
  })),
  options: [{ name: 'Size', values: sizes }],
  variants: sizes.map((s) => ({
    id: `placeholder-${handle}-${s}`, title: s, availableForSale: true, price: money('899.00'),
    compareAtPrice: null, selectedOptions: [{ name: 'Size', value: s }],
  })),
  price: money('899.00'), compareAtPrice: null,
});

export const placeholderProducts: Product[] = [
  tee('keep-staring-tee', 'DEUS “KEEP STARING.” Black Oversized T-Shirt', 'Black'),
  tee('glasses-tee', 'DEUS “Would You Like to Be My Glasses?” Olive Green Oversized T-Shirt', 'Olive green'),
  tee('type-anyway-tee', 'DEUS “YOU WEREN’T MY TYPE ANYWAY.” Olive Green Oversized T-Shirt', 'Olive green'),
];
