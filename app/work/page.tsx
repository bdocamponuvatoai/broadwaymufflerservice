import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ExternalLink } from "@/components/ui";
import { WorkGallery } from "@/components/work-gallery";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our work",
  description: "Classic cars and exhaust fabrication from Broadway Muffler Service’s public Yelp gallery.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="The shop gallery"
        title="A closer look at the work."
        intro={
          <p>
            Real photos from the shop’s public Yelp listing: the cars, the bay and the details behind a good fit.{" "}
            <ExternalLink href={site.yelpUrl} className="underline underline-offset-4 hover:text-white">
              See more on Yelp
            </ExternalLink>
            .
          </p>
        }
      />
      <section aria-label="Photos" className="section-y">
        <div className="shell">
          <WorkGallery />
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
