import type { Metadata } from "next";
import "./globals.css";

// Production domain — override with NEXT_PUBLIC_SITE_URL if needed.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quill.asharaamer.dev";

const TITLE = "Quill — The note that writes itself from your voice";
const DESCRIPTION =
  "Quill is a mobile AI note-taking app. Speak freely and Quill titles, structures and remembers, turning minutes of rambling into a clean note with flashcards. Join the waitlist for early access.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Quill",
  },
  description: DESCRIPTION,
  keywords: [
    "AI note-taking app",
    "voice notes to text",
    "speech to notes",
    "automatic flashcards",
    "study app",
    "meeting notes AI",
    "Quill",
  ],
  authors: [{ name: "Quill" }],
  creator: "Quill",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Quill",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/images/heroimgreal.png",
        width: 1672,
        height: 941,
        alt: "Fog drifting over layered pine forest ridgelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/heroimgreal.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Quill",
      applicationCategory: "ProductivityApplication",
      operatingSystem: ["iOS", "Android"],
      description: DESCRIPTION,
      url: SITE_URL,
    },
    {
      "@type": "Organization",
      name: "Quill",
      url: SITE_URL,
      email: "helloasharaamer@gmail.com",
    },
    {
      "@type": "WebSite",
      name: "Quill",
      url: SITE_URL,
      description: DESCRIPTION,
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Gorestka is not on Google Fonts — DM Sans is the geometric fallback (see globals.css). */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#D9D9D9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
