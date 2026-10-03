import type { MetadataRoute } from "next";

// Keep in sync with SITE_URL in app/layout.tsx (or set NEXT_PUBLIC_SITE_URL).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quill.asharaamer.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["privacy", "terms", "community", "support"].map(path => ({ url: `${SITE_URL}/${path}`, lastModified: new Date("2026-10-04"), changeFrequency: "monthly" as const, priority: 0.3 })),
  ];
}
