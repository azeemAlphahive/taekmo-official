"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";
import { SolutionLiftCard } from "@/components/solutions/SolutionLiftCard";
import { solutions } from "@/data/solutions";

export function Solutions() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="solutions"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      aria-labelledby="solutions-heading"
    >
      <Image
        src="/images/solutions/solutions-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#04100a]/88" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-mint uppercase">
                Applications
              </p>
              <h2
                id="solutions-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[2.15rem]"
              >
                Solar Solutions for Every Application
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
                From rooftops to utility-scale farms, TAEKMO designs systems
                matched to your energy goals.
              </p>
            </div>
            <Button
              href="/solutions"
              variant="outline"
              className="shrink-0 border-brand-green text-brand-mint hover:bg-brand-green/15"
            >
              Explore Solutions
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </SectionReveal>

        <motion.ul
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
            },
          }}
        >
          {solutions.map((solution, index) => (
            <SolutionLiftCard
              key={solution.id}
              solution={solution}
              index={index}
              variant="grid"
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
