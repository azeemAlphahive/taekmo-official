"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { insights } from "@/data/insights";
import { cn } from "@/lib/utils";

const liftCard =
  "will-change-transform transition-[transform,box-shadow] duration-[1200ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:hover:-translate-y-3 motion-safe:hover:shadow-[0_28px_50px_-16px_rgba(4,16,10,0.28)]";

export function LatestInsights() {
  return (
    <section
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="insights-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
                Trending · Insights
              </p>
              <h2
                id="insights-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
              >
                Latest from TAEKMO &amp; Talesun
              </h2>
              <p className="mt-2 max-w-xl text-sm text-brand-muted sm:text-[15px]">
                Bankability updates, brand news, and technology highlights that
                matter for your next project.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              About TAEKMO
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </SectionReveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {insights.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <li key={item.id}>
                <SectionReveal>
                  <article
                    className={cn(
                      "group flex h-full flex-col overflow-hidden rounded-xl border border-brand-border bg-[#f4f7f5] shadow-sm",
                      liftCard,
                    )}
                  >
                    <Link
                      href={item.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-brand-ink">
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-brand-ink/50 to-transparent"
                          aria-hidden
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-brand-ink uppercase">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[11px] font-medium text-brand-muted">
                          {item.date}
                        </p>
                        <h3 className="mt-1.5 text-base font-bold leading-snug text-brand-ink sm:text-[17px]">
                          {item.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-brand-muted sm:text-[13px]">
                          {item.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green">
                          Read more
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </Link>
                  </article>
                </SectionReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
