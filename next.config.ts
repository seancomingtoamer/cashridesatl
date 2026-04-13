import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "v5.airtableusercontent.com" },
      { hostname: "xxsnqgwlyaczsukxxtpr.supabase.co" },
    ],
  },
};

export default nextConfig;
