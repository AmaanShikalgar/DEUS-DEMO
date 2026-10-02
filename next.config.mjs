/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first (smallest), WebP as fallback. Resized per device by Vercel's image CDN.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    // Keep optimised images cached for 31 days instead of Next's 60-second default.
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.shopify.com' }],
  },
};
export default nextConfig;
