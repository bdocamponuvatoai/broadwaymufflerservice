import type { MetadataRoute } from "next";

import { services } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...services.map((service) => `/services/${service.slug}`),
    "/work",
    "/about",
    "/visit",
    "/request",
    "/privacy",
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.5,
  }));
}
