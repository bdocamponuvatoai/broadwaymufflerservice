import Link from "next/link";
import { Suspense } from "react";

import { PhoneIcon } from "@/components/icons";
import { PresetRequestForm } from "@/components/request/preset-request-form";
import { RequestForm } from "@/components/request/request-form";
import { PageHero } from "@/components/sections/page-hero";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Request service",
  description:
    "Prepare a service request for Broadway Muffler Service, review it, then send it from your own email app.",
  path: "/request",
});

export default function RequestPage() {
  return (
    <>
      <PageHero
        label="Request service"
        title="Your car. Your next step."
        intro={
          <p>
            Prepare a request, review it, then open an email draft to the shop. Prefer to talk?{" "}
            <a href={site.phone.href} className="font-semibold whitespace-nowrap underline underline-offset-4">
              Call {site.phone.display}
            </a>
            .
          </p>
        }
      />

      <section aria-label="Service request form" className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <noscript>
              <p className="mb-8 rounded-[3px] border-l-[3px] border-signal bg-white px-5 py-4">
                The request form needs JavaScript. Call {site.phone.display} or email {site.email} instead.
              </p>
            </noscript>
            {/* The fallback renders the same form without a preset, so the HTML is complete before hydration. */}
            <Suspense fallback={<RequestForm />}>
              <PresetRequestForm />
            </Suspense>
          </div>

          <aside aria-label="Before you send" className="space-y-6 lg:col-span-4">
            <div className="on-dark rounded-[3px] bg-ink p-7 text-paper">
              <p className="tag-label text-paper/70">A quick question?</p>
              <a
                href={site.phone.href}
                className="mt-3 flex items-center gap-3 font-display text-3xl font-bold tracking-[0.01em] hover:text-white"
              >
                <PhoneIcon className="size-6 shrink-0 text-signal-bright" />
                {site.phone.display}
              </a>
              <p className="mt-2 text-paper/75">{site.hoursNote}</p>
            </div>
            <ul className="space-y-3 text-steel">
              <li>This form doesn’t send anything. It prepares an email you review and send yourself.</li>
              <li>Visits are confirmed by the shop. The form doesn’t reserve a time.</li>
              <li>
                Your entries stay in this browser tab until you choose to email them. See{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                  privacy
                </Link>
                .
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
