import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 uses Turbopack by default in dev mode
  // Image optimization defaults have been updated
  images: {
    minimumCacheTTL: 3600, // 1 hour (default is 4 hours in Next.js 16)
    maximumRedirects: 3, // Default limit for security
  },
};

export default nextConfig;
