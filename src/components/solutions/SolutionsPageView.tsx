"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Home,
  Layers,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Partners } from "@/components/home/Partners";
import { solutionPillars, solutionsPage } from "@/data/solutions";
import { cn } from "@/lib/utils";

const liftCard =
  "will-change-transform transition-[transform,box-shadow] duration-[1200ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:hover:-translate-y-3 motion-safe:hover:shadow-[0_32px_56px_-18px_rgba(4,16,10,0.28)]";

const techChips = [
  {
    id: "bipro",
    icon: Zap,
    title: "BIPRO TOPCon",
    description: "N-type bifacial dual-glass for rooftops and utility arrays.",
  },
  {
    id: "hypro",
    icon: Layers,
    title: "HYPRO HJT",
    description: "High bifaciality and ultra-low temperature coefficient.",
  },
  {
    id: "tier1",
    icon: ShieldCheck,
    title: "BNEF Tier 1",
    description: "Talesun platform bankability for financed projects.",
  },
] as const;

const pillarIcons = [Home, Building2, Sun] as const;

function PillarCard({
  solution,
  index,
}: {
  solution: (typeof solutionPillars)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = pillarIcons[index] ?? Sun;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: reduceMotion ? 0 : index * 0.08,
      }}
      className="group h-full"
    >
      <Link
        id={solution.id}
        href={solution.href}
        className={cn(
          "flex h-full flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm sm:p-7",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green",
          liftCard,
        )}
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
          <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
        </span>
        <span className="mt-5 text-[10px] font-semibold tracking-[0.16em] text-brand-green uppercase">
          {String(index + 1).padStart(2, "0")} · Solution
        </span>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-brand-ink sm:text-2xl">
          {solution.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
          {solution.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
          Explore
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.article>
  );
}

export function SolutionsPageView() {
  const { about, scale, cta } = solutionsPage;

  return (
    <>
      <section
        id="about"
        className="relative overflow-hidden bg-[#f4f7f5] py-16 sm:py-20 lg:py-24"
        aria-labelledby="about-solutions-heading"
      >
        <div
          className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand-ink/5 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
              Our solutions
            </p>
            <h2
              id="about-solutions-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
            >
              {about.title}
            </h2>
            <p className="mt-5 text-base font-medium leading-relaxed text-brand-ink/80 sm:text-lg">
              {about.lead}
            </p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              About TAEKMO
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </SectionReveal>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
            {techChips.map((item) => {
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

      <Partners />

      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-labelledby="scale-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
              Every scale
            </p>
            <h2
              id="scale-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl lg:text-4xl"
            >
              {scale.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
              Residential, businesses, and large-scale projects — each path
              matched to TAEKMO module platforms.
            </p>
          </SectionReveal>

          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:mt-12">
            {solutionPillars.map((solution, index) => (
              <li key={solution.id} className="list-none">
                <PillarCard solution={solution} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="bg-brand-ink py-16 sm:py-20"
        aria-labelledby="solutions-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-mint uppercase">
              Ready to start
            </p>
            <h2
              id="solutions-cta-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Talk to TAEKMO about the right BIPRO or HYPRO series for your next
              rooftop or utility project.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={cta.primary.href}
                variant="primary"
                className="!rounded-full px-6"
              >
                {cta.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href={cta.secondary.href}
                variant="outlineLight"
                className="!rounded-full border-brand-green text-brand-mint hover:bg-brand-green/15"
              >
                {cta.secondary.label}
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
