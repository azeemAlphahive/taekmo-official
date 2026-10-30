"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { pakistanDistributors } from "@/data/distributors";
import { cn } from "@/lib/utils";

const cardMotion =
  "will-change-transform transition-[transform,box-shadow] duration-[1200ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_24px_44px_-16px_rgba(4,16,10,0.22)]";

export function Distributors({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="distributors"
      className={cn(
        "scroll-mt-24 overflow-hidden bg-[#f4f7f5] py-14 sm:py-16 lg:py-20",
        className,
      )}
      aria-labelledby="distributors-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
              Pakistan network
            </p>
            <h2
              id="distributors-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
            >
              Our distributors in Pakistan
            </h2>
            <p className="mt-2 max-w-xl text-sm text-brand-muted sm:text-[15px]">
              Authorized local partners for genuine TAEKMO modules — supply,
              project support, and nationwide reach.
            </p>
          </div>
        </SectionReveal>

        <motion.ul
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.08,
                delayChildren: reduceMotion ? 0 : 0.04,
              },
            },
          }}
        >
          {pakistanDistributors.map((distributor) => (
            <motion.li
              key={distributor.id}
              variants={{
                hidden: reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <article
                className={cn(
                  "flex h-full flex-col rounded-xl border border-brand-border bg-white p-5 shadow-sm sm:p-6",
                  cardMotion,
                )}
              >
                <div
                  className={cn(
                    "flex h-[4.5rem] w-full items-center justify-center sm:h-20",
                    distributor.logoOnDark &&
                      "rounded-xl bg-brand-ink px-3 py-2",
                  )}
                >
                  <Image
                    src={distributor.logo}
                    alt={distributor.logoAlt}
                    width={280}
                    height={96}
                    unoptimized
                    className="h-14 w-full max-w-full object-contain object-center sm:h-16"
                  />
                </div>

                <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-brand-green uppercase">
                  {distributor.role}
                  <span className="text-brand-green/45"> · </span>
                  {distributor.location}
                </p>
                <h3 className="mt-2 text-base font-bold tracking-tight text-brand-ink sm:text-lg">
                  {distributor.shortName}
                </h3>
                <p className="mt-0.5 text-xs text-brand-muted sm:text-sm">
                  {distributor.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {distributor.highlight}
                </p>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
