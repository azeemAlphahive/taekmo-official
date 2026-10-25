"use client";

import { Button } from "@/components/ui/Button";
import { SolutionLiftCard } from "@/components/solutions/SolutionLiftCard";
import { solutions } from "@/data/solutions";

export function SolutionsShowcase() {
  return (
    <section
      className="relative overflow-hidden bg-[#f4f7f5] py-14 sm:py-16 lg:py-20"
      aria-labelledby="solutions-catalogue-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
            Scroll to explore
          </p>
          <h2
            id="solutions-catalogue-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
          >
            Built for every scale of solar
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            Each application lifts into view as you move — choose the path that
            fits your project.
          </p>
        </div>

        <ul className="mt-12 flex flex-col gap-8 sm:mt-14 sm:gap-10 lg:gap-12">
          {solutions.map((solution, index) => (
            <SolutionLiftCard
              key={solution.id}
              solution={solution}
              index={index}
              variant="feature"
              className="scroll-mt-28"
            />
          ))}
        </ul>

        <div className="mt-14 text-center sm:mt-16">
          <Button href="/contact" variant="primary">
            Discuss Your Project
          </Button>
        </div>
      </div>
    </section>
  );
}
