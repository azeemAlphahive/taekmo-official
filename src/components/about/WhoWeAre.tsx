"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2, Layers, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { aboutPage } from "@/data/solutions";
import { cn } from "@/lib/utils";

const highlights = [
  {
    id: "sub-brand",
    icon: Globe2,
    title: "International sub-brand",
    description:
      "TAEKMO was established by Talesun for global markets — tailored products and go-to-market.",
  },
  {
    id: "platform",
    icon: Layers,
    title: "BIPRO & HYPRO platform",
    description:
      "N-type TOPCon and HJT bifacial dual-glass modules on a BNEF Tier 1 line.",
  },
  {
    id: "backed",
    icon: ShieldCheck,
    title: "C&D Xiamen backed",
    description:
      "Anchored by Xiamen C&D Group — Fortune Global 500 industrial strength.",
  },
] as const;

const liftCard =
  "will-change-transform transition-[transform,box-shadow] duration-[1200ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:hover:-translate-y-4 motion-safe:hover:shadow-[0_32px_56px_-18px_rgba(4,16,10,0.28)] motion-safe:focus-within:-translate-y-4 motion-safe:focus-within:shadow-[0_32px_56px_-18px_rgba(4,16,10,0.28)]";

export function WhoWeAre() {
  const { story } = aboutPage;

  return (
    <section
      id="who-we-are"
      className="relative overflow-hidden bg-[#f4f7f5] py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-story-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-brand-ink/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <SectionReveal>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
              About TAEKMO
            </p>
            <h2
              id="about-story-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
            >
              {story.title}
            </h2>
            <p className="mt-5 text-base font-medium leading-relaxed text-brand-ink/80 sm:text-lg">
              {story.lead}
            </p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
              {story.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary">
                Contact us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/solutions" variant="outline">
                Our solutions
              </Button>
            </div>
            <p className="mt-6 text-sm text-brand-muted">
              Exploring modules?{" "}
              <Link
                href="/products#all-products"
                className="font-semibold text-brand-green transition-colors hover:text-brand-green-dark"
              >
                View all products
              </Link>
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-ink shadow-[0_24px_48px_-20px_rgba(4,16,10,0.35)]">
              <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                <Image
                  src="/images/solutions/commercial.jpg"
                  alt="TAEKMO solar solutions for real-world projects"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/35 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-mint uppercase">
                    Talesun · C&amp;D Xiamen
                  </p>
                  <p className="mt-1.5 text-lg font-bold text-white sm:text-xl">
                    Better Energy. A Brighter Future.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <article
                  className={cn(
                    "flex h-full flex-col rounded-xl border border-brand-border bg-white p-5 shadow-sm sm:p-6",
                    liftCard,
                  )}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-brand-ink sm:text-[15px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-brand-muted sm:text-[13px]">
                    {item.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
