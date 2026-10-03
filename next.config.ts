import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // A live dev server must not overwrite the production preview's manifests.
  distDir: process.env.NODE_ENV === "development" ? ".next" : ".next-production",
  // Keep metadata in the initial head for previews and HTML-only crawlers.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
