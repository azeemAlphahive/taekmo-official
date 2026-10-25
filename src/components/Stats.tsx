"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Boxes, Earth, Star, Trophy } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";

const items: Array<{
  value: string;
  label: string;
  icon: ReactNode;
}> = [
  {
    value: "25+",
    label: "Years of Experience",
    icon: <Trophy className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />,
  },
  {
    value: "1M+",
    label: "Products Delivered",
    icon: <Boxes className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />,
  },
  {
    value: "50+",
    label: "Countries",
    icon: <Earth className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />,
  },
  {
    value: "99.8%",
    label: "Customer Satisfaction",
    icon: <Star className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />,
  },
];

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
    const duration = 1600;
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

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="bg-[#f4f7f5] pt-2 pb-8 sm:pb-10"
      aria-label="Company highlights"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-y-0 px-4 min-[400px]:grid-cols-2 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map((item, index) => (
          <li
            key={item.label}
            className="relative flex items-center gap-3.5 px-3 py-4 sm:justify-center sm:gap-4 sm:px-5 sm:py-6"
          >
            {index > 0 && (
              <span
                className="absolute top-1/2 left-0 hidden h-12 w-px -translate-y-1/2 bg-black/10 md:block"
                aria-hidden
              />
            )}
            {index % 2 === 1 && (
              <span
                className="absolute top-1/2 left-0 hidden h-12 w-px -translate-y-1/2 bg-black/10 min-[400px]:block md:hidden"
                aria-hidden
              />
            )}
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#099c2d]/10 text-[#099c2d] sm:h-14 sm:w-14">
              {item.icon}
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-bold tracking-tight text-[#04100a] sm:text-3xl lg:text-[2.1rem]">
                <CountUpValue value={item.value} active={inView} />
              </p>
              <p className="mt-1 text-xs leading-snug text-[#5c6670] sm:text-sm">
                {item.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
