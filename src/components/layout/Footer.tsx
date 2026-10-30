"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, siteConfig } from "@/data/content";
import { legalNav } from "@/data/legal";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      toast.error("Enter a valid email address.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Subscribing…");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const payload = (await res.json()) as {
        message?: string;
        alreadySubscribed?: boolean;
        emailSkipped?: boolean;
      };
      if (!res.ok) {
        toast.error(payload.message || "Could not subscribe.", { id: toastId });
        return;
      }
      if (payload.alreadySubscribed) {
        toast.success("You are already subscribed.", { id: toastId });
      } else {
        toast.success(
          payload.emailSkipped
            ? "Subscribed and saved. Email delivery is not configured yet (add RESEND_API_KEY)."
            : "Thanks for subscribing.",
          { id: toastId },
        );
      }
      setEmail("");
    } catch {
      toast.error("Network error. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer
      className="bg-brand-ink text-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              <Logo variant="light" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/50">
              {siteConfig.description}
            </p>

            <form
              onSubmit={(e) => void onSubmit(e)}
              className="mt-6 max-w-sm"
              noValidate
            >
              <label
                htmlFor="newsletter-email"
                className="mb-2 block text-xs font-semibold tracking-wide text-white/80 uppercase"
              >
                Newsletter
              </label>
              <div className="flex overflow-hidden rounded-md border border-white/15 bg-white/5 focus-within:border-brand-green focus-within:ring-1 focus-within:ring-brand-green">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex shrink-0 items-center justify-center bg-brand-green px-3 text-white transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint disabled:opacity-60"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold tracking-[0.12em] text-brand-mint uppercase">
                  {column.title}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          id="support"
          className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <span id="technology" className="sr-only" aria-hidden="true" />
        <span id="projects" className="sr-only" aria-hidden="true" />
      </div>
    </footer>
  );
}
