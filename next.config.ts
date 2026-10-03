import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // Keep production at Vercel's expected path; isolate the local dev server.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  // Keep metadata in the initial head for previews and HTML-only crawlers.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
