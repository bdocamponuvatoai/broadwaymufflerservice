import { PlusIcon } from "@/components/icons";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-line section-y">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <h2 id="faq-title" data-reveal className="text-display text-5xl uppercase sm:text-6xl lg:col-span-4">
          Good questions.
        </h2>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-line first:border-t">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-2xl font-semibold tracking-[0.01em] [&::-webkit-details-marker]:hidden">
                {faq.q}
                <PlusIcon className="size-6 shrink-0 text-signal transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pb-6 text-steel">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
