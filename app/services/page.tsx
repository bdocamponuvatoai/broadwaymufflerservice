import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ExhaustFinder } from "@/components/sections/exhaust-finder";
import { PageHero } from "@/components/sections/page-hero";
import { buttonClass, cx } from "@/components/ui";
import { services } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Muffler and exhaust repair, custom exhaust fabrication, catalytic converter service and classic-car exhaust work in Walnut Creek, CA.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="The right work for your car."
        intro="From a new exhaust noise to a custom project. Find your starting point, then tell the shop about your vehicle."
      />

      <section aria-label="All services" className="section-y">
        <ul className="shell space-y-20 md:space-y-28">
          {services.map((service, index) => (
            <li key={service.slug} className="grid gap-8 md:grid-cols-12 md:items-center">
              <div
                data-reveal
                className={cx(
                  "relative aspect-[3/2] overflow-hidden rounded-[3px] bg-paper-deep md:col-span-7",
                  index % 2 === 1 && "md:order-2 md:col-start-6",
                )}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className={cx("md:col-span-5", index % 2 === 1 ? "md:order-1 md:col-start-1 md:row-start-1" : "")}>
                <p aria-hidden="true" className="font-display text-xl font-bold text-signal">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-display text-5xl uppercase sm:text-6xl">{service.short}</h2>
                <p className="mt-4 text-xl font-medium">{service.tagline}</p>
                <p className="mt-3 text-lg text-steel">{service.description}</p>
                <Link href={`/services/${service.slug}`} className={cx(buttonClass("dark"), "mt-7")}>
                  {service.title}
                  <ArrowRightIcon className="size-[18px]" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ExhaustFinder />
      <ClosingCta />
    </>
  );
}
