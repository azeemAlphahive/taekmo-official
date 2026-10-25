"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function HomeCta() {
  return (
    <section
      className="relative overflow-hidden bg-brand-ink py-16 sm:py-20"
      aria-labelledby="home-cta-heading"
    >
      <Image
        src="/images/solutions/solutions-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-ink/95 via-brand-ink/80 to-brand-ink/65"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-mint uppercase">
            Ready to start
          </p>
          <h2
            id="home-cta-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Shaping the future of energy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Spec BIPRO or HYPRO modules with C&amp;D Xiamen and Talesun behind
            every watt — talk to TAEKMO about your next rooftop or utility
            project.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="primary" className="!rounded-full px-6">
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              href="/products#all-products"
              variant="outlineLight"
              className="!rounded-full border-brand-green text-brand-mint hover:bg-brand-green/15"
            >
              View products
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
