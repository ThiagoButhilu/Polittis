import type { NextConfig } from "next";
import path from 'path';

const nextConfig = {
  experimental: {
    staticHTML: false,
    output: 'export',
  } as NonNullable<NextConfig['experimental']>,
  images: {
    unoptimized: true, 
  },
    
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
} as NextConfig;

module.exports = nextConfig;