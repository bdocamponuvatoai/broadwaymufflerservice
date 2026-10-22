import Link from "next/link";

import { PhoneIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { site } from "@/lib/site";

export function ClosingCta({ service }: { service?: string }) {
  return (
    <section aria-labelledby="closing-cta-title" className="on-dark relative overflow-hidden bg-signal text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_46px,rgb(0_0_0/0.07)_46px_48px)]"
      />
      <div className="relative shell grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-20">
        <div>
          <h2 id="closing-cta-title" data-reveal className="text-display text-5xl uppercase sm:text-6xl lg:text-7xl">
            Let’s get your car sorted.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Tell the shop what you drive and what you have in mind. It starts with a conversation.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phone.href} className={buttonClass("dark", "lg")}>
            <PhoneIcon className="size-5" />
            {site.phone.display}
          </a>
          <Link href={service ? `/request?service=${service}` : "/request"} className={buttonClass("light", "lg")}>
            Request service
          </Link>
        </div>
      </div>
    </section>
  );
}
