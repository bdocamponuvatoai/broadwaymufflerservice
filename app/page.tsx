import type { Metadata } from "next";

import { ClosingCta } from "@/components/sections/closing-cta";
import { ExhaustFinder } from "@/components/sections/exhaust-finder";
import { Faq } from "@/components/sections/faq";
import { HomeHero } from "@/components/sections/home-hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ShopPhotos } from "@/components/sections/shop-photos";
import { VisitSteps } from "@/components/sections/visit-steps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { title: `${site.name} | Muffler & exhaust in Walnut Creek, CA`, description: site.description, url: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesGrid />
      <ExhaustFinder />
      <ShopPhotos />
      <VisitSteps />
      <Faq />
      <ClosingCta />
    </>
  );
}
