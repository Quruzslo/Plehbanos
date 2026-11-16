import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    serverActions: { bodySizeLimit: "2mb" },
  },
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    remotePatterns: [
      new URL(
        `${process.env.R2_PUBLIC_URL || "https://pub-ba49019f382d409191b529f4a734bb62.r2.dev"}/**`,
      ),
    ],
  },
};

export default nextConfig;
