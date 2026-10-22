import Link from "next/link";
import type { ReactNode } from "react";

import { site } from "@/lib/site";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "dark" | "light" | "outline-light" | "outline-dark";

export function buttonClass(variant: ButtonVariant = "primary", size: "md" | "lg" = "md") {
  return cx(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] font-display font-semibold tracking-[0.04em] uppercase transition-colors duration-200",
    size === "lg" ? "px-6 py-3 text-lg" : "px-5 py-2.5 text-base",
    variant === "primary" && "bg-signal text-white hover:bg-signal-dark",
    variant === "dark" && "bg-ink text-paper hover:bg-ink-soft",
    variant === "light" && "bg-paper text-ink hover:bg-white",
    variant === "outline-light" && "border border-paper/60 text-paper hover:border-paper hover:bg-paper/10",
    variant === "outline-dark" && "border border-ink/50 text-ink hover:border-ink hover:bg-ink/5",
  );
}

/** Text wordmark. A proposed identity: the shop has not supplied an official logo. */
export function Wordmark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cx("inline-flex flex-col leading-none", className)}>
      {/* One clean accessible name; the stacked visual parts would otherwise read as "BroadwayMuffler Service". */}
      <span className="sr-only">{site.name}</span>
      <span
        aria-hidden="true"
        className={cx(
          "font-display text-[1.7rem] font-bold tracking-[0.02em] uppercase",
          tone === "light" ? "text-paper" : "text-ink",
        )}
      >
        Broadway
      </span>
      <span aria-hidden="true" className="mt-1 flex items-center gap-2">
        <span className="h-[3px] w-5 bg-signal" />
        <span
          className={cx(
            "font-display text-[0.7rem] font-semibold tracking-[0.22em] uppercase",
            tone === "light" ? "text-paper/80" : "text-steel",
          )}
        >
          Muffler Service
        </span>
      </span>
    </span>
  );
}

export function PhoneLink({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <a href={site.phone.href} className={className}>
      {children ?? site.phone.display}
    </a>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "font-display text-lg font-semibold tracking-[0.03em] uppercase underline decoration-2 underline-offset-[6px] transition-colors",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
