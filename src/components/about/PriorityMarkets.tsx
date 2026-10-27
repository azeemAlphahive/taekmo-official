"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { aboutPage } from "@/data/solutions";

export function PriorityMarkets() {
  const { markets } = aboutPage;

  return (
    <section
      id="markets"
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="markets-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
            {markets.eyebrow}
          </p>
          <h2
            id="markets-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
          >
            {markets.title}
          </h2>
        </SectionReveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {markets.items.map((item, index) => (
            <li key={item.id}>
              <SectionReveal delay={index * 0.06}>
                <article className="flex h-full flex-col border-t-2 border-brand-green bg-[#f4f7f5] px-4 py-6 sm:px-5 sm:py-7">
                  <h3 className="text-base font-bold tracking-tight text-brand-ink sm:text-lg">
                    {item.region}
                  </h3>
                  <p className="mt-2 text-sm leading-snug text-brand-muted">
                    {item.focus}
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
