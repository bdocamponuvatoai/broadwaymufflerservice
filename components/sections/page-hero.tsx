import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { cx } from "@/components/ui";

type PageHeroProps = {
  label: string;
  title: string;
  intro: ReactNode;
  image?: { src: StaticImageData; alt: string; position?: string };
  children?: ReactNode;
};

/** Dark opening band shared by interior pages. Marked `data-hero` for the mobile action bar. */
export function PageHero({ label, title, intro, image, children }: PageHeroProps) {
  return (
    <section data-hero aria-labelledby="page-title" className="on-dark relative bg-ink text-paper">
      <div className={cx("shell grid gap-10 pt-32 pb-14 md:pt-40 md:pb-20", image && "lg:grid-cols-12 lg:items-end")}>
        <div className={cx(image && "lg:col-span-7")}>
          <p className="hero-in flex items-center gap-3 tag-label text-paper/85">
            <span aria-hidden="true" className="h-[3px] w-8 bg-signal" />
            {label}
          </p>
          <h1 id="page-title" className="hero-in hero-in-2 mt-5 text-display text-[clamp(3rem,9vw,6.5rem)] uppercase">
            {title}
          </h1>
          <div className="hero-in hero-in-3 mt-6 max-w-2xl text-lg text-paper/85 sm:text-xl">{intro}</div>
          {children && <div className="hero-in hero-in-3 mt-9">{children}</div>}
        </div>
        {image && (
          <div className="hero-in hero-in-3 relative lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-ink-soft">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={cx("object-cover", image.position)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
