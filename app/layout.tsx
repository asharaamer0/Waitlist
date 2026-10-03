import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: [
    { path: "./fonts/playfair-roman.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/playfair-italic.woff2", weight: "400 900", style: "italic" },
  ], variable: "--font-playfair", display: "swap",
});
const body = localFont({ src: "./fonts/dm-sans.woff2", weight: "100 1000", variable: "--font-dm", display: "swap" });

// Production domain — override with NEXT_PUBLIC_SITE_URL if needed.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quill.asharaamer.dev";

const TITLE = "Quill | Turn your voice into clear notes";
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
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Quill: the note that writes itself from your voice, with real app screens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph.png"],
  },
  icons: {
    icon: "/icon.png",
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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
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
