import Link from "next/link";

import { ArrowUpRightIcon, PhoneIcon } from "@/components/icons";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { VisitSteps } from "@/components/sections/visit-steps";
import { buttonClass, ExternalLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { addressLines, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Visit & contact",
  description: `Find Broadway Muffler Service at ${addressLines.join(", ")}. Call ${site.phone.display} to confirm hours.`,
  path: "/visit",
});

export default function VisitPage() {
  return (
    <>
      <PageHero
        label="Visit & contact"
        title="Come by. Call first."
        intro={
          <p>
            {addressLines.join(", ")}. A quick call helps the shop understand your vehicle and confirm the best time to
            visit. {site.hoursNote}
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phone.href} className={buttonClass("primary", "lg")}>
            <PhoneIcon className="size-5" />
            Call {site.phone.display}
          </a>
          <ExternalLink href={site.directionsUrl} className={buttonClass("outline-light", "lg")}>
            Get directions
            <ArrowUpRightIcon className="size-5" />
          </ExternalLink>
        </div>
      </PageHero>

      <VisitSteps title="Your visit, made simple." />

      <section aria-labelledby="request-cta-title" className="border-t border-line">
        <div className="shell flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="request-cta-title" className="font-display text-4xl font-bold tracking-[0.01em] uppercase">
              Prefer to write it down?
            </h2>
            <p className="mt-2 max-w-xl text-lg text-steel">
              Put the vehicle details and your questions together, then send them from your own email app.
            </p>
          </div>
          <Link href="/request" className={buttonClass("dark", "lg")}>
            Prepare a request
          </Link>
        </div>
      </section>

      <Faq />
    </>
  );
}
