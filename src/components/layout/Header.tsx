"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { AppDownloadButton } from "@/components/layout/AppDownloadButton";
import { mainNav } from "@/data/content";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string): boolean {
  const path = href.split("#")[0] || "/";
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

function NavLink({
  href,
  label,
  active,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  mobile?: boolean;
}) {
  if (mobile) {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
        className={cn(
          "rounded-md px-3 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green",
          active
            ? "bg-brand-green/15 text-brand-mint"
            : "text-white/90 hover:bg-white/5 hover:text-white",
        )}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative whitespace-nowrap pb-1.5 text-[13px] font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-transparent xl:text-sm",
        active ? "text-brand-mint" : "text-white/90 hover:text-white",
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand-mint transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          active
            ? "scale-x-100"
            : "scale-x-0 motion-safe:group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const useGlass = !isHome || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 sm:px-4 sm:pt-4",
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full px-4 sm:px-5 lg:h-16 lg:px-6",
          "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
          useGlass
            ? "border border-white/10 bg-brand-ink/75 shadow-lg shadow-black/15 backdrop-blur-md"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          className="relative z-10 shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          aria-label="TAEKMO home"
        >
          <Logo variant="light" />
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 xl:gap-8 lg:flex"
          aria-label="Primary"
        >
          {mainNav.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              label={item.label}
              active={isActivePath(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2 sm:gap-2.5">
          <AppDownloadButton className="hidden md:block" compact />
          <Button
            href="/contact"
            variant="primary"
            className="hidden !rounded-full border-0 bg-brand-green px-5 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark lg:inline-flex"
          >
            Contact Us
          </Button>
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-brand-ink/95 backdrop-blur-md sm:mx-4 lg:hidden"
          >
            <nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
              aria-label="Mobile"
            >
              {mainNav.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  active={isActivePath(pathname, item.href)}
                  mobile
                  onClick={() => setOpen(false)}
                />
              ))}
              <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
                <AppDownloadButton className="w-full [&_button]:w-full [&_button]:justify-center" />
                <Button
                  href="/contact"
                  variant="primary"
                  className="w-full !rounded-full"
                  onClick={() => setOpen(false)}
                >
                  Contact Us
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
