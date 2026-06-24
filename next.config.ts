import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Production Optimizations */
  reactStrictMode: true,
  poweredByHeader: false, // Security: Remove X-Powered-By header
  
  images: {
    formats: ['image/avif', 'image/webp'], // Optimized modern formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
        pathname: '/**',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* Compiler & Performance */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  /* Custom Webpack Aliasing */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@prisma/client': path.resolve(process.cwd(), 'src/lib/prisma-mock.ts'),
    };
    return config;
  },

  /* Custom Turbopack Aliasing */
  turbopack: {
    resolveAlias: {
      '@prisma/client': './src/lib/prisma-mock.ts',
    },
  },

  /* Security Headers */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: images.unsplash.com; font-src 'self' data:; connect-src 'self'; media-src 'self' assets.mixkit.co; frame-src 'none'; object-src 'none';"
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
