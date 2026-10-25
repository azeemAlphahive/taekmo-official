"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Boxes, Earth, Star, Trophy } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { stats } from "@/data/content";
import type { StatItem } from "@/types";

const icons: Record<StatItem["icon"], ReactNode> = {
  experience: <Trophy className="h-5 w-5" strokeWidth={1.6} />,
  products: <Boxes className="h-5 w-5" strokeWidth={1.6} />,
  countries: <Earth className="h-5 w-5" strokeWidth={1.6} />,
  satisfaction: <Star className="h-5 w-5" strokeWidth={1.6} />,
};

function parseStatValue(value: string): {
  target: number;
  decimals: number;
  suffix: string;
} {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) {
    return { target: 0, decimals: 0, suffix: value };
  }
  const numeric = match[1];
  const suffix = match[2] ?? "";
  const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;
  return { target: Number(numeric), decimals, suffix };
}

function formatCount(value: number, decimals: number): string {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toString();
}

function CountUpValue({
  value,
  active,
}: {
  value: string;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const { target, decimals, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(
    reduceMotion ? formatCount(target, decimals) : formatCount(0, decimals),
  );

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setDisplay(formatCount(target, decimals));
      return;
    }

    let frame = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(formatCount(target * eased, decimals));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, decimals, reduceMotion, target]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  return (
    <section
      ref={ref}
      className="relative z-0 -mt-px bg-white"
      aria-label="Company highlights"
    >
      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-y-2 md:grid-cols-4 md:gap-y-0">
        {stats.map((stat, index) => (
          <motion.li
            key={stat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            className="relative flex items-center justify-center gap-4 px-5 py-8 sm:gap-4 sm:px-6 sm:py-9 lg:gap-5 lg:px-7 lg:py-10"
          >
            {index > 0 && (
              <span
                className="absolute top-1/2 left-0 hidden h-12 w-px -translate-y-1/2 bg-brand-ink/8 md:block"
                aria-hidden
              />
            )}
            {index % 2 === 1 && (
              <span
                className="absolute top-1/2 left-0 h-12 w-px -translate-y-1/2 bg-brand-ink/8 md:hidden"
                aria-hidden
              />
            )}
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              {icons[stat.icon]}
            </span>
            <div className="min-w-0 space-y-1">
              <p className="text-2xl font-bold tracking-tight text-brand-ink sm:text-[1.65rem]">
                <CountUpValue value={stat.value} active={inView} />
              </p>
              <p className="text-xs leading-snug text-brand-muted sm:text-[13px]">
                {stat.label}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
