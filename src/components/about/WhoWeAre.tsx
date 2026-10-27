"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { aboutPage } from "@/data/solutions";

export function WhoWeAre() {
  const { story, why, headquarters } = aboutPage;

  return (
    <section
      id="who-we-are"
      className="relative overflow-hidden bg-[#f4f7f5] py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-story-heading"
    >
      <div
        className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-brand-green/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 -translate-x-1/3 rounded-full bg-brand-ink/5 blur-3xl"
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
              className="mt-2 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl lg:text-[2.35rem] lg:leading-[1.15]"
            >
              {story.title}
            </h2>
            <p className="mt-5 text-base font-medium leading-relaxed text-brand-ink/80 sm:text-lg">
              {story.lead}
            </p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
              {story.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-brand-muted">
              <span className="font-semibold text-brand-ink">
                {headquarters.label}:{" "}
              </span>
              {headquarters.address}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary">
                Contact us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/products#all-products" variant="outline">
                View products
              </Button>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-ink shadow-[0_24px_48px_-20px_rgba(4,16,10,0.35)]">
              <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                <Image
                  src="/images/solutions/commercial.jpg"
                  alt="TAEKMO solar modules for international markets"
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
                    Talesun · C&amp;D Group
                  </p>
                  <p className="mt-1.5 text-lg font-bold text-white sm:text-xl">
                    International solar modules for a cleaner world
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        <div className="mt-16 border-t border-brand-ink/10 pt-14 sm:mt-20 sm:pt-16">
          <SectionReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
                  {why.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
                  {why.title}
                </h3>
              </div>
              <Link
                href="/verify"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                Verify a panel
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </SectionReveal>

          <ol className="mt-10 grid grid-cols-1 divide-y divide-brand-ink/10 border-y border-brand-ink/10 sm:mt-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {why.items.map((item, index) => (
              <li key={item.id}>
                <SectionReveal delay={index * 0.08}>
                  <article className="group flex h-full flex-col px-0 py-8 sm:px-6 sm:py-10 lg:px-8">
                    <span
                      className="font-mono text-[11px] font-semibold tracking-[0.18em] text-brand-green uppercase"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mt-5 text-lg font-bold tracking-tight text-brand-ink transition-colors duration-300 group-hover:text-brand-green sm:text-xl">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                      {item.description}
                    </p>
                  </article>
                </SectionReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
