/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features, including the App Router (appDir)
  experimental: {
    appDir: true,
  },
  // Configure image domains to allow external images
  images: {
    domains: ["localhost"],
    // Uncomment below to enable remote image loading optimizations
    // deviceSizes: [320, 420, 768, 1024, 1200],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // formats: ['image/avif', 'image/webp'],
  },
  // Optional: Enable React Strict Mode for debugging
  reactStrictMode: true,
};

module.exports = nextConfig;
