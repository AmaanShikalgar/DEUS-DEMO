import type { Metadata } from 'next';
import { Fraunces, Inter, Syncopate } from 'next/font/google';
import { site } from '@/config/site';
import { isShopifyConfigured } from '@/lib/shopify';
import { CartProvider } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Splash } from '@/components/layout/Splash';
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/animations.css';
import '@/styles/header.css';
import '@/styles/hero.css';
import '@/styles/product.css';

const heading = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const display = Syncopate({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-syncopate', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

// Runs before first paint. Shows the splash only on the first visit of a browser session (not on refresh).
const splashInit = `try{if(!sessionStorage.getItem('deus_splash_seen')){sessionStorage.setItem('deus_splash_seen','1');document.documentElement.classList.add('show-splash')}}catch(e){}`;

export const metadata: Metadata = { title: { default: site.name, template: `%s | ${site.name}` }, description: site.description };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashInit }} />
      </head>
      <body>
        <Splash />
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
