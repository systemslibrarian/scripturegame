import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { TranslationProvider } from "@/lib/translation-context";

import "./globals.css";

export const metadata: Metadata = {
  title: "Scripture Journey",
  description: "A calm daily Scripture journey for reading, reflecting, memorizing, and living God's Word.",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://systemslibrarian.github.io/scripturegame"),
  openGraph: {
    title: "Scripture Journey",
    description: "A calm daily Scripture journey for reading, reflecting, memorizing, and living God's Word.",
    type: "website",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://systemslibrarian.github.io/scripturegame",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "Scripture Journey" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scripture Journey",
    description: "A calm daily Scripture journey for reading, reflecting, memorizing, and living God's Word.",
    images: ["/icon-512.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TranslationProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <div className="shell">
            <SiteHeader />
            <div id="main-content">
              {children}
            </div>
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}
