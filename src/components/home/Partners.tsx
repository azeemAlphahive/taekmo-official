"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { partners } from "@/data/solutions";
import { cn } from "@/lib/utils";

interface PartnersProps {
  className?: string;
  /** compact = home; full = about / solutions */
  variant?: "compact" | "full";
}

const cardMotion =
  "will-change-transform transition-[transform,box-shadow] duration-[1200ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_24px_44px_-16px_rgba(4,16,10,0.22)]";

export function Partners({
  className,
  variant = "compact",
}: PartnersProps) {
  const isFull = variant === "full";
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="partners"
      className={cn(
        "scroll-mt-24 overflow-hidden py-14 sm:py-16 lg:py-20",
        isFull ? "bg-[#f4f7f5]" : "bg-white",
        className,
      )}
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
              Our partners
            </p>
            <h2
              id="partners-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
            >
              Backed by C&amp;D Xiamen and Talesun
            </h2>
            <p className="mt-2 max-w-xl text-sm text-brand-muted sm:text-[15px]">
              TAEKMO stands on a Fortune Global 500 industrial group and a BNEF
              Tier 1 module manufacturer.
            </p>
          </div>
        </SectionReveal>

        <motion.ul
          className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.1,
                delayChildren: reduceMotion ? 0 : 0.04,
              },
            },
          }}
        >
          {partners.map((partner) => (
            <motion.li
              key={partner.id}
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
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex h-full flex-col rounded-xl border border-brand-border bg-white p-5 shadow-sm sm:p-6 lg:p-7",
                  cardMotion,
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
                )}
              >
                <div className="flex h-14 items-center sm:h-16">
                  <Image
                    src={partner.logo}
                    alt={partner.logoAlt}
                    width={180}
                    height={64}
                    className="h-full w-auto max-w-[180px] object-contain object-left"
                  />
                </div>

                <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-brand-green uppercase">
                  {partner.role}
                  <span className="text-brand-green/45"> · </span>
                  {partner.credential}
                </p>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-brand-ink sm:text-xl">
                  {partner.shortName}
                </h3>
                <p className="mt-0.5 text-sm text-brand-muted">{partner.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {isFull ? partner.description : partner.highlight}
                </p>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
