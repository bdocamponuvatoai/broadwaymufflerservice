import Image from "next/image";
import Link from "next/link";

import { ExternalLink, TextLink } from "@/components/ui";
import { projects } from "@/lib/content";
import { site } from "@/lib/site";

export function ShopPhotos() {
  return (
    <section aria-labelledby="shop-photos-title" className="on-dark bg-ink section-y text-paper">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="shop-photos-title" data-reveal className="text-display text-5xl uppercase sm:text-6xl lg:text-7xl">
            Real cars. Real bay.
          </h2>
          <TextLink href="/work" className="decoration-signal-bright hover:text-white">
            See the work
          </TextLink>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-12 md:gap-6">
          {projects.map((project, index) => (
            <li key={project.id} className={index === 0 ? "md:col-span-6 md:row-span-2" : "md:col-span-6"}>
              <Link href={`/work#${project.id}`} className="group block">
                <figure>
                  <div
                    data-reveal
                    className={
                      index === 0
                        ? "relative aspect-square overflow-hidden rounded-[3px] md:aspect-auto md:h-full md:min-h-[36rem]"
                        : "relative aspect-[16/10] overflow-hidden rounded-[3px]"
                    }
                  >
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl font-semibold tracking-[0.01em] uppercase">
                      {project.title}
                    </span>
                    <span className="tag-label text-paper/70">{project.label}</span>
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-paper/70">
          Photos from the shop’s{" "}
          <ExternalLink href={site.yelpUrl} className="underline underline-offset-4 hover:text-paper">
            public Yelp listing
          </ExternalLink>
          .
        </p>
      </div>
    </section>
  );
}
