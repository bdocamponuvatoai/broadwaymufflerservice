import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/icons";
import { ExternalLink, Wordmark } from "@/components/ui";
import { services } from "@/lib/content";
import { addressLines, site } from "@/lib/site";

const linkClass = "inline-flex min-h-11 items-center text-paper/80 transition-colors hover:text-paper sm:min-h-9";

export function SiteFooter() {
  return (
    <footer className="on-dark border-t border-ink-line bg-ink text-paper">
      <div className="shell grid gap-12 pt-16 pb-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Wordmark tone="light" />
          <p className="mt-5 max-w-xs text-paper/75">
            Exhaust work on North Main Street, Walnut Creek. Mufflers, converters, fabrication and classics.
          </p>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <h2 className="tag-label text-paper/70">Services</h2>
          <ul className="mt-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={linkClass}>
                  {service.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="The shop" className="md:col-span-2">
          <h2 className="tag-label text-paper/70">The shop</h2>
          <ul className="mt-3">
            {[
              { href: "/about", label: "About" },
              { href: "/work", label: "Our work" },
              { href: "/visit", label: "Visit & contact" },
              { href: "/request", label: "Request service" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="tag-label text-paper/70">Find the shop</h2>
          <address className="mt-4 not-italic">
            <ExternalLink href={site.directionsUrl} className="group inline-flex gap-1 hover:text-white">
              <span>
                {addressLines[0]}
                <br />
                {addressLines[1]}
              </span>
              <ArrowUpRightIcon className="mt-1 size-4 shrink-0 opacity-70 group-hover:opacity-100" />
            </ExternalLink>
            <a
              href={site.phone.href}
              className="mt-4 block font-display text-2xl font-semibold tracking-[0.02em] hover:text-white"
            >
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="mt-1 inline-flex min-h-11 items-center break-all text-paper/80">
              {site.email}
            </a>
          </address>
          <p className="mt-2 text-sm text-paper/70">{site.hoursNote}</p>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="shell flex flex-col gap-4 pt-6 pb-[calc(6rem+env(safe-area-inset-bottom))] text-sm text-paper/70 md:flex-row md:items-start md:justify-between md:pb-8">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex gap-6">
            <li>
              <ExternalLink href={site.yelpUrl} className="hover:text-paper">
                Yelp
              </ExternalLink>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-paper">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
