# Storefront (Next.js + Shopify)

Headless clothing storefront. Runs on placeholder data until Shopify is connected.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
```

## Connect Shopify
1. In Shopify admin: Settings > Apps > Develop apps > create an app, enable the **Storefront API**, copy the Storefront access token.
2. `cp .env.example .env.local` and fill in `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
3. Restart. Products, collections, search and cart now come from Shopify. Checkout redirects to Shopify's hosted checkout.

## Where things live
| What | Where |
| --- | --- |
| Brand name, nav, footer links, announcements, email, Instagram | `src/config/site.ts` |
| Copy for About, Contact and other `/pages/[slug]` pages | `src/config/pages.ts` |
| Colors, fonts, spacing, transition speeds | `src/styles/tokens.css` |
| Homepage copy and section order | `src/app/page.tsx` |
| Brand images (drop the originals over these files, same names) | `public/images/`, `public/products/`, `src/app/icon.png` |
| Shopify queries, types, API client | `src/lib/shopify/` |
| Cart state (Shopify Cart API via server actions) | `src/components/cart/CartProvider.tsx` |
| Each section's styles | next to its component (`Manifesto.css`, etc.) |

## Animations (all preserved from the original)
- Scroll reveal with staggered children: `ui/ScrollReveal.tsx` + `styles/animations.css`
- Sticky header blur on scroll, mobile menu slide with staggered links: `layout/Header.tsx`
- Rotating announcement bar: `layout/AnnouncementBar.tsx`
- Testimonial crossfade slider (autoplay, pause on hover, dots, arrows): `home/Testimonials.tsx`
- Cart drawer slide-in, button hover ripple, product card hover image swap, Instagram hover overlay, size chart modal, accordion chevron, stock pulse: pure CSS in `styles/` and component CSS
- `prefers-reduced-motion` is respected.

## To do before launch
- Replace the grey placeholder images with the originals from thedeus.in (same file names, no code changes).
- Fill in the size chart, shipping/returns text and the policy pages.
- Wire the newsletter form (`home/Newsletter.tsx`) to Shopify or Klaviyo.
- Build real content pages at `/pages/[slug]` and an account flow.
- Add Razorpay in Shopify's payment settings if needed. No code change is required.
