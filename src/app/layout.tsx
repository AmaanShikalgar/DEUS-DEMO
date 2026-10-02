import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { site } from '@/config/site';
import { isShopifyConfigured } from '@/lib/shopify';
import { CartProvider } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/animations.css';
import '@/styles/header.css';
import '@/styles/hero.css';
import '@/styles/product.css';

const heading = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = { title: { default: site.name, template: `%s | ${site.name}` }, description: site.description };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <CartProvider live={isShopifyConfigured}>
          <a href="#main-content" className="skip-to-content">Skip to content</a>
          <AnnouncementBar messages={site.announcements} />
          <Header />
          <main id="main-content" role="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
