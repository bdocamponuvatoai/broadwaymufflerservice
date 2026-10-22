"use client";

import { PageHero } from "@/components/sections/page-hero";
import { buttonClass } from "@/components/ui";
import { site } from "@/lib/site";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <PageHero
      label="Something went wrong"
      title="Stalled."
      intro="This page hit a problem. Try again, or call the shop."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className={buttonClass("primary", "lg")}>
          Try again
        </button>
        <a href={site.phone.href} className={buttonClass("outline-light", "lg")}>
          {site.phone.display}
        </a>
      </div>
    </PageHero>
  );
}
