export type Money = { amount: string; currencyCode: string };
export type Image = { url: string; altText: string | null };
export type Variant = {
  id: string; title: string; availableForSale: boolean; price: Money;
  compareAtPrice: Money | null; selectedOptions: { name: string; value: string }[];
};
export type Product = {
  id: string; handle: string; title: string; vendor: string; descriptionHtml: string;
  availableForSale: boolean; images: Image[]; options: { name: string; values: string[] }[];
  variants: Variant[]; price: Money; compareAtPrice: Money | null;
};
export type CartLine = {
  id: string; quantity: number;
  merchandise: { id: string; title: string; product: { handle: string; title: string; image: Image | null }; price: Money };
};
export type Cart = { id: string; checkoutUrl: string; totalQuantity: number; subtotal: Money; lines: CartLine[] };
