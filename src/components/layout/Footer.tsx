"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, siteConfig } from "@/data/content";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "demo">("idle");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setStatus("demo");
    setMessage(
      "Thanks — demo confirmation only. Newsletter service is not connected yet.",
    );
    setEmail("");
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

            <form onSubmit={onSubmit} className="mt-6 max-w-sm" noValidate>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setMessage("");
                    }
                  }}
                  aria-invalid={status === "error"}
                  aria-describedby={message ? "newsletter-feedback" : undefined}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex shrink-0 items-center justify-center bg-brand-green px-3 text-white transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {message && (
                <p
                  id="newsletter-feedback"
                  role={status === "error" ? "alert" : "status"}
                  className={`mt-2 text-[11px] ${
                    status === "error" ? "text-red-300" : "text-brand-mint/90"
                  }`}
                >
                  {message}
                </p>
              )}
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
            <Link
              href="#privacy"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
        <span id="technology" className="sr-only" aria-hidden="true" />
        <span id="projects" className="sr-only" aria-hidden="true" />
        <span id="privacy" className="sr-only" aria-hidden="true" />
        <span id="terms" className="sr-only" aria-hidden="true" />
      </div>
    </footer>
  );
}
