"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { PhoneIcon } from "@/components/icons";
import { buttonClass, cx } from "@/components/ui";
import { site } from "@/lib/site";

/** Fixed Call / Request bar on phones, shown once the page hero has scrolled away. */
export function MobileActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry ? !entry.isIntersecting : false));
    observer.observe(hero);
    return () => {
      observer.disconnect();
      setVisible(false);
    };
  }, [pathname]);

  const onRequestPage = pathname === "/request";

  return (
    <div
      data-testid="mobile-action-bar"
      data-visible={visible ? "true" : "false"}
      className={cx(
        "fixed inset-x-0 bottom-0 z-30 border-t border-ink-line bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-[translate,visibility] duration-300 md:hidden",
        visible ? "visible translate-y-0" : "invisible translate-y-full",
      )}
    >
      <div className={cx("on-dark grid gap-3", onRequestPage ? "grid-cols-1" : "grid-cols-2")}>
        <a href={site.phone.href} className={buttonClass("primary")}>
          <PhoneIcon className="size-[18px]" />
          Call
        </a>
        {!onRequestPage && (
          <Link href="/request" className={buttonClass("light")}>
            Request
          </Link>
        )}
      </div>
    </div>
  );
}
