"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** One observer for the whole page: elements opt in with a `data-reveal` attribute. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="visible"])');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
