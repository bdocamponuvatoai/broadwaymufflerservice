import Image from "next/image";

import classicPickup from "@/assets/images/classic-pickup.webp";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { VisitSteps } from "@/components/sections/visit-steps";
import { TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "The shop",
  description:
    "Broadway Muffler Service is an exhaust shop on North Main Street in Walnut Creek with an eye for classic and specialty cars.",
  path: "/about",
});

const values = [
  { title: "Understand the car", body: "Start with what you drive, how you use it and what’s changed." },
  { title: "Mind the details", body: "Bends, clearances and connections decide whether an exhaust fits right." },
  { title: "Agree before work", body: "Talk through the options and ask your questions before anything starts." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="The shop"
        title="A shop with character."
        intro="Broadway Muffler Service brings careful exhaust work and a soft spot for classic cars to North Main Street in Walnut Creek."
      />

      <section aria-labelledby="story-title" className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
          <figure className="lg:col-span-6">
            <div data-reveal className="relative aspect-[1000/920] overflow-hidden rounded-[3px] bg-paper-deep">
              <Image
                src={classicPickup}
                alt="Blue classic pickup with its hood raised on a yellow lift inside the shop"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-steel">
              In the bay. Photo from the shop’s public Yelp listing.
            </figcaption>
          </figure>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 id="story-title" data-reveal className="text-display text-5xl uppercase sm:text-6xl">
              Some cars are worth keeping.
            </h2>
            <div className="mt-6 space-y-4 text-lg text-steel">
              <p>
                The car you learned to drive in. The truck that’s always been there. The daily driver that gets you
                where you need to be. They all deserve a thoughtful approach.
              </p>
              <p>
                Broadway Muffler focuses on exhaust: repairs, catalytic converters, custom fabrication and fitment, with
                a real appreciation for classic and specialty vehicles.
              </p>
              <p>
                Start with a conversation about your car: what’s changed, what you’re planning, what matters to you.
              </p>
            </div>
            <TextLink href="/services" className="mt-8 inline-block decoration-signal hover:text-signal">
              See the services
            </TextLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="on-dark bg-ink section-y text-paper">
        <div className="shell">
          <h2 id="approach-title" data-reveal className="text-display text-5xl uppercase sm:text-6xl">
            The Broadway approach.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {values.map((value, index) => (
              <li key={value.title} className="border-t-[3px] border-signal pt-6">
                <span aria-hidden="true" className="font-display text-xl font-bold text-signal-bright">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-[0.01em] uppercase">{value.title}</h3>
                <p className="mt-2 text-paper/80">{value.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <VisitSteps title="Come by. Call first." />
      <ClosingCta />
    </>
  );
}
