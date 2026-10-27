"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { VerificationCard } from "@/components/home/VerificationCard";
import { WaveDivider } from "@/components/WaveDivider";
import { heroContent } from "@/data/content";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.55, ease: "easeOut" as const, delay },
  });

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#04100a] text-white min-h-[36rem] sm:min-h-[42rem] lg:h-dvh lg:min-h-0"
      aria-labelledby="hero-heading"
    >
      <Image
        src="/images/hero/taekmo-hero-background.jpg"
        alt="TAEKMO solar farm valley at sunset with golden light and mountains"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-[78%_68%] sm:object-[90%_72%] lg:object-[100%_70%]"
      />
      <div className="absolute inset-0 bg-black/22 sm:bg-black/18" aria-hidden />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#000000a6_0%,#00000066_42%,#00000026_70%,transparent_88%)] sm:bg-[linear-gradient(to_right,#00000099_0%,#0000004d_30%,#0000001a_50%,transparent_68%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#00000080_0%,#00000040_14%,transparent_36%)]"
        aria-hidden
      />

      <div className="relative z-20 mx-auto box-border flex h-full w-full max-w-7xl flex-col px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8 lg:pt-[100px] lg:pb-24">
        <div className="flex w-full min-w-0 flex-col gap-5 pt-2 sm:gap-8 sm:pt-0 lg:max-w-[54%] lg:flex-1 lg:justify-start lg:gap-0 lg:pt-2 lg:pb-20">
          <div className="flex w-full min-w-0 flex-col">
            <motion.p
              {...fade(0.05)}
              className="mb-2 w-full text-[10px] font-semibold tracking-[0.14em] text-white/90 uppercase sm:mb-3 sm:text-xs sm:tracking-[0.22em]"
            >
              {heroContent.eyebrow}
            </motion.p>
            <motion.h1
              id="hero-heading"
              {...fade(0.12)}
              className="w-full text-[1.6rem] font-bold leading-[1.15] tracking-tight break-words text-white sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-[3.4rem]"
            >
              {heroContent.headline}{" "}
              <span className="text-brand-mint">{heroContent.headlineAccent}</span>
            </motion.h1>
            <motion.p
              {...fade(0.2)}
              className="mt-2.5 w-full text-[13px] leading-relaxed break-words text-white/80 sm:mt-4 sm:max-w-md sm:text-[15px]"
            >
              {heroContent.description}
            </motion.p>
            <motion.div
              {...fade(0.28)}
              className="mt-4 flex w-full flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Button
                href={heroContent.primaryCta.href}
                variant="primary"
                className="w-full justify-center rounded-md px-5 py-2.5 text-sm sm:w-auto sm:px-6 sm:py-3"
              >
                {heroContent.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href={heroContent.secondaryCta.href}
                variant="ghost"
                className="w-full justify-center px-2 text-sm sm:w-auto"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/55 sm:h-9 sm:w-9">
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
                </span>
                {heroContent.secondaryCta.label}
              </Button>
            </motion.div>
          </div>

          <motion.div
            {...fade(0.35)}
            id="verify"
            className="relative z-20 w-full min-w-0 lg:absolute lg:right-8 lg:bottom-20 lg:w-[310px] lg:max-w-[310px]"
          >
            <VerificationCard
              showBarcodeGuide={false}
              className="w-full border-brand-green/70 bg-[#0c1117]/85 p-3.5 sm:p-5"
            />
          </motion.div>
        </div>
      </div>

      <WaveDivider color="#f4f7f5" />
    </section>
  );
}
