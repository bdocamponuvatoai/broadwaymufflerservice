"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { buttonClass, cx, Wordmark } from "@/components/ui";
import { addressLines, navigation, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);

  const openMenu = () => {
    menuRef.current?.showModal();
    setMenuOpen(true);
  };

  const closeMenu = () => menuRef.current?.close();

  const solid = scrolled;

  return (
    <header
      data-scrolled={solid ? "true" : "false"}
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,color] duration-300",
        solid ? "border-b border-line bg-paper text-ink" : "on-dark border-b border-transparent text-paper",
      )}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="shrink-0 rounded-sm">
          <Wordmark tone={solid ? "dark" : "light"} />
        </Link>

        <nav aria-label="Main" className="max-lg:hidden">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative py-2 font-display text-[1.05rem] font-semibold tracking-[0.05em] uppercase transition-opacity hover:opacity-100",
                      active ? "opacity-100" : "opacity-80",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:bg-signal after:transition-transform after:duration-300",
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={site.phone.href}
            className="inline-flex min-h-11 items-center gap-2 font-display text-lg font-semibold tracking-[0.03em] max-sm:hidden"
          >
            <PhoneIcon className="size-[18px]" />
            {site.phone.display}
          </a>
          <Link href="/request" className={cx(buttonClass("primary"), "max-md:hidden")}>
            Request service
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-[3px] lg:hidden"
          >
            <MenuIcon className="size-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <dialog
        id="mobile-menu"
        ref={menuRef}
        aria-label="Menu"
        onClose={() => {
          setMenuOpen(false);
          // Safari doesn't focus buttons on click, so return focus explicitly.
          toggleRef.current?.focus();
        }}
        className="on-dark m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-paper backdrop:bg-transparent"
      >
        <div className="flex min-h-full flex-col">
          <div className="shell flex h-[4.5rem] items-center justify-between">
            <Wordmark tone="light" />
            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex size-11 items-center justify-center rounded-[3px]"
              autoFocus
            >
              <CloseIcon className="size-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="shell mt-6 flex-1">
            <ul className="divide-y divide-ink-line border-y border-ink-line">
              {[{ href: "/", label: "Home" }, ...navigation, { href: "/request", label: "Request service" }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex min-h-16 items-center justify-between font-display text-3xl font-bold tracking-[0.01em] uppercase aria-[current=page]:text-signal-bright"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="shell space-y-4 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <a href={site.phone.href} className={cx(buttonClass("primary", "lg"), "w-full")}>
              <PhoneIcon className="size-5" />
              Call {site.phone.display}
            </a>
            <p className="text-center text-sm text-paper/70">
              {addressLines.join(", ")} · {site.hoursNote}
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
