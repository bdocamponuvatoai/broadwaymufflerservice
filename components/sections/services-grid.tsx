import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { services } from "@/lib/content";

export function ServicesGrid() {
  return (
    <section aria-labelledby="services-title" className="section-y">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="services-title"
            data-reveal
            className="text-display text-5xl uppercase sm:text-6xl lg:col-span-7 lg:text-7xl"
          >
            Four things, done with care.
          </h2>
          <p className="max-w-md text-lg text-steel lg:col-span-4 lg:col-start-9">
            Exhaust is the work. From a new rattle to a one-off system for a car you love.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="group block rounded-[3px]">
                <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-paper-deep">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p aria-hidden="true" className="mt-5 font-display text-lg font-bold text-signal">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 flex items-center justify-between gap-3 font-display text-3xl font-bold tracking-[0.01em] uppercase">
                  {service.short}
                  <ArrowRightIcon className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </h3>
                <p className="mt-2 text-steel">{service.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
