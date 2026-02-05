import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all for development, can be restricted later
      },
      {
        protocol: 'http',
        hostname: '**', 
      }
    ],
  },
};

export default nextConfig;

