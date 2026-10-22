import Image from "next/image";
import Link from "next/link";

import heroImage from "@/assets/images/hero-exhaust-workshop.webp";
import { PhoneIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { addressLines, site } from "@/lib/site";

export function HomeHero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[max(40rem,100vh)] flex-col justify-end overflow-hidden bg-ink text-paper supports-[height:100svh]:min-h-[max(40rem,100svh)]"
    >
      <Image
        src={heroImage}
        alt="Mechanic inspecting the exhaust of a car raised on a lift in a workshop"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[78%_50%] md:object-[60%_50%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(21_23_26/0.96)_8%,rgb(21_23_26/0.7)_45%,rgb(21_23_26/0.3)_100%)] md:bg-[linear-gradient(100deg,rgb(21_23_26/0.95)_10%,rgb(21_23_26/0.72)_45%,rgb(21_23_26/0.1)_80%)]"
      />

      <div className="shell pt-32 pb-12 md:pb-20">
        <p className="hero-in flex items-center gap-3 tag-label text-paper/85">
          <span aria-hidden="true" className="h-[3px] w-8 bg-signal" />
          {site.address.street} · {site.address.city}, {site.address.region}
        </p>
        <h1
          id="hero-title"
          className="hero-in hero-in-2 mt-5 max-w-4xl text-display text-[clamp(3.25rem,11vw,8.5rem)] uppercase"
        >
          The exhaust shop on North Main.
        </h1>
        <p className="hero-in hero-in-3 mt-6 max-w-xl text-lg text-paper/85 sm:text-xl">
          Muffler and exhaust repair, catalytic converters, custom fabrication and classic cars. Call first, then bring
          it in.
        </p>
        <div className="hero-in hero-in-3 mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={site.phone.href} className={buttonClass("primary", "lg")}>
            <PhoneIcon className="size-5" />
            Call {site.phone.display}
          </a>
          <Link href="/request" className={buttonClass("outline-light", "lg")}>
            Request service
          </Link>
        </div>
        <p className="mt-12 border-t border-paper/20 pt-5 text-sm text-paper/75">
          {addressLines.join(", ")} · {site.hoursNote}
        </p>
      </div>
    </section>
  );
}
