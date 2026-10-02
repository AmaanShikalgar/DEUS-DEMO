const PRODUCT = `
  id handle title vendor descriptionHtml availableForSale
  images(first: 10) { nodes { url altText } }
  options { name values }
  variants(first: 50) { nodes { id title availableForSale price { amount currencyCode }
    compareAtPrice { amount currencyCode } selectedOptions { name value } } }
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }`;

export const productByHandle = `query($handle: String!) { product(handle: $handle) { ${PRODUCT} } }`;
export const collectionByHandle = `query($handle: String!) {
  collection(handle: $handle) { title description products(first: 48) { nodes { ${PRODUCT} } } } }`;
export const allProducts = `query($query: String) { products(first: 48, query: $query) { nodes { ${PRODUCT} } } }`;

const CART = `id checkoutUrl totalQuantity cost { subtotalAmount { amount currencyCode } }
  lines(first: 100) { nodes { id quantity merchandise { ... on ProductVariant { id title
    price { amount currencyCode } product { handle title featuredImage { url altText } } } } } }`;
export const cartCreate = `mutation($lines: [CartLineInput!]) { cartCreate(input: { lines: $lines }) { cart { ${CART} } } }`;
export const cartLinesAdd = `mutation($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART} } } }`;
export const cartLinesUpdate = `mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART} } } }`;
export const cartLinesRemove = `mutation($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART} } } }`;
export const cartGet = `query($cartId: ID!) { cart(id: $cartId) { ${CART} } }`;
