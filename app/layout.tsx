import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import type { ReactNode } from "react";

import { MobileActionBar } from "@/components/mobile-action-bar";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allowIndexing, site, siteUrl } from "@/lib/site";

import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Muffler & exhaust in Walnut Creek, CA`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name}, Walnut Creek` }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#15171a",
  viewportFit: "cover",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  description: site.description,
  url: siteUrl,
  telephone: site.phone.e164,
  email: site.email,
  image: `${siteUrl}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "City", name: "Walnut Creek, CA" },
  sameAs: [site.yelpUrl],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-24 rounded-[3px] bg-ink px-4 py-3 font-display font-semibold tracking-[0.04em] text-paper uppercase transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <RevealObserver />
        <script
          type="application/ld+json"
          // Escape "<" so the JSON can never close the script element early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
