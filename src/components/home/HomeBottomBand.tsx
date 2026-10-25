"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { VerificationCard } from "@/components/home/VerificationCard";

/**
 * CTA + Verify as one continuous band — shared background, tighter layout.
 */
export function HomeBottomBand() {
  return (
    <section
      id="verify"
      className="relative overflow-hidden bg-brand-ink py-14 sm:py-16 lg:py-20"
      aria-labelledby="home-cta-heading"
    >
      <Image
        src="/images/solutions/solutions-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-ink/92 via-brand-ink/80 to-brand-ink/70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-brand-green/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16">
          {/* Left — story + CTAs + authenticity note */}
          <SectionReveal>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-mint uppercase">
              Ready to start
            </p>
            <h2
              id="home-cta-heading"
              className="mt-2 max-w-lg text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]"
            >
              Shaping the future of energy
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-[15px]">
              Spec BIPRO or HYPRO modules with C&amp;D Xiamen and Talesun behind
              every watt — talk to TAEKMO about your next rooftop or utility
              project.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                href="/contact"
                variant="primary"
                className="!rounded-full px-6"
              >
                Contact us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href="/products#all-products"
                variant="outlineLight"
                className="!rounded-full border-white/35 text-white hover:bg-white/10"
              >
                View products
              </Button>
            </div>

            <div className="mt-10 flex max-w-md items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-sm">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green/20 text-brand-mint">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Product authenticity
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/60">
                  Confirm your module is genuine — enter the barcode from the
                  label in the form.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Right — verify form card */}
          <SectionReveal delay={0.1}>
            <div className="lg:pl-2">
              <VerificationCard
                showBarcodeGuide
                className="w-full max-w-md border-brand-green/40 bg-[#0c1210]/75 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:ml-auto"
              />
              <p className="mt-3 text-center text-[11px] text-white/45 lg:text-right">
                Demo mode until the live verification API is connected.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
