import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "v5.airtableusercontent.com" },
      { hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
