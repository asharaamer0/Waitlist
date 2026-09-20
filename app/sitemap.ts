import type { MetadataRoute } from "next";

// TODO: keep in sync with SITE_URL in app/layout.tsx (or set NEXT_PUBLIC_SITE_URL).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quillnotes.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
