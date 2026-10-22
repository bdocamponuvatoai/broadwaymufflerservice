import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/icons";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { buttonClass } from "@/components/ui";
import { getService, services } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: `${service.description} ${site.name}, Walnut Creek, CA.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        label={service.title}
        title={service.tagline}
        intro={service.intro}
        image={{ src: service.image, alt: service.alt }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={`/request?service=${service.slug}`} className={buttonClass("primary", "lg")}>
            Ask about this service
          </Link>
          <a href={site.phone.href} className={buttonClass("outline-light", "lg")}>
            <PhoneIcon className="size-5" />
            {site.phone.display}
          </a>
        </div>
      </PageHero>

      <section aria-labelledby="scope-title" className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="scope-title" data-reveal className="text-display text-5xl uppercase sm:text-6xl">
              What the shop can look at.
            </h2>
            <ul className="mt-10 border-t border-line">
              {service.items.map((item) => (
                <li key={item} className="flex gap-4 border-b border-line py-5 text-lg">
                  <CheckIcon className="mt-1 size-5 shrink-0 text-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside
            aria-labelledby="bring-title"
            className="self-start rounded-[3px] bg-paper-deep p-7 sm:p-10 lg:col-span-5 lg:col-start-8"
          >
            <h2 id="bring-title" className="font-display text-3xl font-bold tracking-[0.01em] uppercase">
              Helpful to have ready
            </h2>
            <p className="mt-4 text-lg text-steel">{service.bring}</p>
            <a href={site.phone.href} className={`${buttonClass("dark")} mt-8`}>
              <PhoneIcon className="size-[18px]" />
              Call {site.phone.display}
            </a>
          </aside>
        </div>
      </section>

      <section aria-labelledby="more-title" className="border-t border-line pb-20 md:pb-28">
        <div className="shell pt-16">
          <h2 id="more-title" className="font-display text-3xl font-bold tracking-[0.01em] uppercase">
            More ways the shop can help
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/services/${other.slug}`} className="group flex items-center gap-4 rounded-[3px]">
                  <span className="relative block aspect-square w-20 shrink-0 overflow-hidden rounded-[3px] bg-paper-deep">
                    <Image src={other.image} alt="" fill placeholder="blur" sizes="80px" className="object-cover" />
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-[0.01em] uppercase group-hover:text-signal">
                    {other.short}
                  </span>
                  <ArrowRightIcon className="ml-auto size-5 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta service={service.slug} />
    </>
  );
}
