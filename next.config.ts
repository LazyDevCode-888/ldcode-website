import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/portfolio/fintech-core-platform',
        destination: '/portfolio/notify-task',
        permanent: true,
      },
      {
        source: '/portfolio/e-commerce-omnichannel',
        destination: '/portfolio/notify-task',
        permanent: true,
      },
      {
        source: '/portfolio/ai-medical-diagnostics',
        destination: '/portfolio/notify-task',
        permanent: true,
      },
      {
        source: '/portfolio/logistics-smart-fleet',
        destination: '/portfolio/notify-task',
        permanent: true,
      },
      {
        source: '/portfolio/property-metaverse-3d',
        destination: '/portfolio/notify-task',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
