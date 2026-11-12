import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every image is served at q90 (Next uses the closest allowed value); the default q75 visibly softened the photos.
    qualities: [90],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
};

export default nextConfig;
