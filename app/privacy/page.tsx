import { PageHero } from "@/components/sections/page-hero";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How the Broadway Muffler Service website handles the information you choose to enter.",
  path: "/privacy",
});

const sections = [
  {
    title: "The request form",
    body: "The request form runs in your browser. It doesn’t submit entries to a server, store them in a database or send email automatically. Leaving or reloading the page clears what you typed.",
  },
  {
    title: "When you contact the shop",
    body: "“Open email draft” passes the prepared text to your own email app. You review and send it yourself, and your email provider and the shop handle that correspondence. “Copy request” places the text on your device’s clipboard.",
  },
  {
    title: "Cookies, analytics and tracking",
    body: "This website doesn’t set cookies, load analytics or advertising scripts, or embed third-party maps.",
  },
  {
    title: "External links",
    body: "Yelp, directions and phone links open the relevant service or app, which has its own privacy terms.",
  },
  {
    title: "Website hosting",
    body: "The hosting provider may process standard technical request information, such as IP address and browser type, to serve and secure the website.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Privacy"
        title="Your details, handled simply."
        intro="How this website uses the information you choose to enter."
      />
      <section aria-label="Privacy details" className="section-y">
        <div className="shell max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-3xl font-bold tracking-[0.01em] uppercase">{section.title}</h2>
              <p className="mt-3 text-lg text-steel">{section.body}</p>
            </div>
          ))}
          <div>
            <h2 className="font-display text-3xl font-bold tracking-[0.01em] uppercase">Questions</h2>
            <p className="mt-3 text-lg text-steel">
              Email{" "}
              <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
                {site.email}
              </a>{" "}
              or call{" "}
              <a href={site.phone.href} className="text-ink underline underline-offset-4">
                {site.phone.display}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
