"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { SolutionItem } from "@/types";
import { cn } from "@/lib/utils";

interface SolutionLiftCardProps {
  solution: SolutionItem;
  index: number;
  variant?: "grid" | "feature";
  className?: string;
}

export function SolutionLiftCard({
  solution,
  index,
  variant = "grid",
  className,
}: SolutionLiftCardProps) {
  const ref = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });

  // Enter from below → lift higher → keep rising (stronger upper vibe)
  const y = useTransform(
    scrollYProgress,
    [0, 0.28, 0.55, 1],
    [160 + index * 18, 0, -42, -96],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.8, 1],
    [0, 1, 1, 0.95],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.65, 1],
    [0.9, 1, 1.035, 1.06],
  );
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.28, 0.55, 1],
    [
      "0 0 0 0 rgba(4,16,10,0)",
      "0 18px 40px -12px rgba(4,16,10,0.35)",
      "0 32px 64px -16px rgba(4,16,10,0.45)",
      "0 48px 80px -18px rgba(4,16,10,0.55)",
    ],
  );

  const isFeature = variant === "feature";

  return (
    <motion.li
      id={solution.id}
      ref={ref}
      style={
        reduceMotion
          ? undefined
          : { y, opacity, scale, boxShadow }
      }
      className={cn(
        "list-none will-change-transform rounded-2xl",
        reduceMotion && "shadow-[0_24px_50px_-16px_rgba(4,16,10,0.4)]",
        className,
      )}
    >
      <Link
        href={solution.href}
        className={cn(
          "group relative block overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
          isFeature
            ? "min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]"
            : "h-64 sm:h-72",
        )}
      >
        <Image
          src={solution.image}
          alt={solution.imageAlt}
          fill
          sizes={
            isFeature
              ? "(max-width: 1024px) 100vw, 90vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#04100a]/95 via-[#04100a]/45 to-[#04100a]/10"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_right,rgba(74,222,128,0.18),transparent_55%)]"
          aria-hidden
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex flex-col",
            isFeature
              ? "p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:p-10"
              : "p-5",
          )}
        >
          <div className={cn(isFeature && "max-w-xl")}>
            <span className="inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-brand-mint uppercase backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")} · Solution
            </span>
            <h3
              className={cn(
                "mt-3 font-bold tracking-tight text-white",
                isFeature ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl",
              )}
            >
              {solution.title}
            </h3>
            <p
              className={cn(
                "mt-2 leading-relaxed text-white/75",
                isFeature ? "text-sm sm:text-base" : "text-xs sm:text-sm",
              )}
            >
              {solution.description}
            </p>
          </div>

          <span
            className={cn(
              "mt-4 inline-flex items-center gap-2 self-start rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-green/25 transition-transform duration-300 motion-safe:group-hover:-translate-y-1",
              isFeature && "lg:mt-0 lg:self-end",
            )}
          >
            Explore
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}
