"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { partners } from "@/data/solutions";
import { cn } from "@/lib/utils";

interface PartnersProps {
  className?: string;
  tone?: "light" | "dark";
}

const liftCard =
  "will-change-transform transition-[transform,box-shadow] duration-[1200ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:hover:-translate-y-4 motion-safe:hover:shadow-[0_32px_56px_-18px_rgba(4,16,10,0.28)] motion-safe:focus-within:-translate-y-4 motion-safe:focus-within:shadow-[0_32px_56px_-18px_rgba(4,16,10,0.28)]";

export function Partners({ className, tone = "light" }: PartnersProps) {
  const isDark = tone === "dark";

  return (
    <section
      id="partners"
      className={cn(
        "scroll-mt-24 py-14 sm:py-16 lg:py-20",
        isDark ? "bg-brand-ink" : "bg-white",
        className,
      )}
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p
            className={cn(
              "text-[11px] font-semibold tracking-[0.22em] uppercase",
              isDark ? "text-brand-mint" : "text-brand-green",
            )}
          >
            Our partners
          </p>
          <h2
            id="partners-heading"
            className={cn(
              "mt-2 text-2xl font-bold tracking-tight sm:text-3xl",
              isDark ? "text-white" : "text-brand-ink",
            )}
          >
            Backed by C&amp;D Xiamen and Talesun
          </h2>
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed sm:text-[15px]",
              isDark ? "text-white/70" : "text-brand-muted",
            )}
          >
            TAEKMO stands on a Fortune Global 500 industrial group and a
            BloombergNEF Tier 1 module manufacturer.
          </p>
        </SectionReveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {partners.map((partner) => (
            <li key={partner.id}>
              <SectionReveal>
                <article
                  className={cn(
                    "flex h-full flex-col rounded-xl border p-6 shadow-sm sm:p-8",
                    liftCard,
                    isDark
                      ? "border-white/10 bg-white/5 hover:border-brand-mint/30"
                      : "border-brand-border bg-[#f4f7f5] hover:border-brand-green/35",
                  )}
                >
                  <p
                    className={cn(
                      "text-[10px] font-semibold tracking-[0.18em] uppercase",
                      isDark ? "text-brand-mint" : "text-brand-green",
                    )}
                  >
                    {partner.role}
                  </p>
                  <h3
                    className={cn(
                      "mt-3 text-xl font-bold tracking-tight sm:text-2xl",
                      isDark ? "text-white" : "text-brand-ink",
                    )}
                  >
                    {partner.shortName}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-sm font-medium",
                      isDark ? "text-white/55" : "text-brand-muted",
                    )}
                  >
                    {partner.name}
                  </p>
                  <p
                    className={cn(
                      "mt-4 text-sm leading-relaxed",
                      isDark ? "text-white/70" : "text-brand-muted",
                    )}
                  >
                    {partner.description}
                  </p>
                </article>
              </SectionReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
