import { ArrowUpRightIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { ExternalLink } from "@/components/ui";
import { steps } from "@/lib/content";
import { addressLines, site } from "@/lib/site";

export function VisitSteps({ title = "How a visit works." }: { title?: string }) {
  return (
    <section aria-labelledby="visit-steps-title" className="section-y">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="visit-steps-title" data-reveal className="text-display text-5xl uppercase sm:text-6xl">
            {title}
          </h2>
          <ol className="mt-10 space-y-8">
            {steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-6">
                <span aria-hidden="true" className="font-display text-4xl leading-none font-bold text-signal">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-[0.01em] uppercase">{step.title}</h3>
                  <p className="mt-1 text-steel">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside
          aria-label="Contact details"
          className="on-dark self-start rounded-[3px] bg-ink p-7 text-paper sm:p-10 lg:col-span-5 lg:col-start-8"
        >
          <p className="tag-label text-paper/70">Talk to the shop</p>
          <a
            href={site.phone.href}
            className="mt-3 flex items-center gap-3 font-display text-4xl font-bold tracking-[0.01em] hover:text-white sm:text-5xl"
          >
            <PhoneIcon className="size-7 shrink-0 text-signal-bright" />
            {site.phone.display}
          </a>
          <p className="mt-2 text-paper/75">{site.hoursNote}</p>

          <dl className="mt-8 space-y-5 border-t border-ink-line pt-8">
            <div className="flex gap-3">
              <dt>
                <PinIcon className="mt-1 size-5 text-paper/70" />
                <span className="sr-only">Address</span>
              </dt>
              <dd>
                <ExternalLink href={site.directionsUrl} className="group inline-flex gap-1 hover:text-white">
                  <span>
                    {addressLines[0]}
                    <br />
                    {addressLines[1]}
                  </span>
                  <ArrowUpRightIcon className="mt-1 size-4 shrink-0 opacity-70 group-hover:opacity-100" />
                </ExternalLink>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <MailIcon className="mt-1 size-5 text-paper/70" />
                <span className="sr-only">Email</span>
              </dt>
              <dd>
                <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
