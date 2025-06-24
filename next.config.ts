import type { NextConfig } from "next";
import path from 'path';


const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
    position: undefined
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@public': path.resolve(__dirname, 'public'),
    };
    return config;
  },
};

export default nextConfig;
