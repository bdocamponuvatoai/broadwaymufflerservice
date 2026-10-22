import type { Metadata } from "next";

import { site } from "@/lib/site";

/** Per-page title, description, canonical URL and Open Graph fields. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name}, Walnut Creek` }],
    },
  } satisfies Metadata;
}
