import type { NextConfig } from "next";
import path from 'path';


const nextConfig: NextConfig = {
  devIndicators: {
    position: undefined
  },

  output: "export",  // Habilita exportação estática
  reactStrictMode: true,
  images: {
    unoptimized: true,  // Desativa otimização de imagens para GitHub Pages
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Polittis/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Polittis' : '',


  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@public': path.resolve(__dirname, 'public'),
    };
    return config;
  },
};

export default nextConfig;
