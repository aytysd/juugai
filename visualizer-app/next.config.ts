import type { NextConfig } from "next";
import { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
  }
};

export default nextConfig;
