/** Everything brand-specific lives here. Source: DEUS Brand & Design System reference. */
export const site = {
  name: 'DEUS',
  tagline: 'Built With Intent.',
  description: 'DEUS creates refined everyday essentials designed with precision, restraint and purpose.',
  currency: 'INR',
  email: 'hello@deus.com',
  // Scrolls right → left in the header strip. Edit these to match your real offers.
  announcements: [
    'FLAT 10% OFF ON YOUR FIRST ORDER',
    'FREE SHIPPING ON ORDERS ABOVE ₹999',
    'INDIA · AUTUMN COLLECTION',
    'BUILT WITH INTENT.',
  ],
  instagram: { handle: '@tthe_deus.in', url: 'https://www.instagram.com/tthe_deus.in' },
  nav: [
    { label: 'SHOP', href: '/collections/all' },
    { label: 'T-SHIRTS', href: '/collections/t-shirts' },
    { label: 'ABOUT', href: '/pages/about-us' },
    { label: 'CONTACT', href: '/pages/contact' },
  ],
  footerHelp: [
    { label: 'ABOUT', href: '/pages/about-us' },
    { label: 'CONTACT', href: '/pages/contact' },
    { label: 'SHIPPING', href: '/pages/shipping' },
    { label: 'RETURNS', href: '/pages/returns' },
    { label: 'PRIVACY', href: '/pages/privacy' },
    { label: 'TERMS', href: '/pages/terms' },
  ],
  community: [
    '/images/SocialGrid/SC1.jpg',
    '/images/SocialGrid/SC2.jpg',
    '/images/SocialGrid/SC4.png',
    '/images/SocialGrid/SC5.jpg',
  ],
} as const;
