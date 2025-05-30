import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/recent_qsos',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *"
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
