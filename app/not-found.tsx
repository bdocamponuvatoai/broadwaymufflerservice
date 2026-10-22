import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { buttonClass } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <PageHero
      label="Error 404"
      title="Wrong turn."
      intro="That page doesn’t exist, or it has moved. Head back to the start, or call the shop."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClass("primary", "lg")}>
          Back to home
        </Link>
        <Link href="/services" className={buttonClass("outline-light", "lg")}>
          See services
        </Link>
        <a href={site.phone.href} className={buttonClass("outline-light", "lg")}>
          {site.phone.display}
        </a>
      </div>
    </PageHero>
  );
}
