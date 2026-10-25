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
      className="relative isolate min-h-dvh w-full overflow-hidden bg-[#04100a] text-white lg:h-dvh"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed bg — right + bottom so farm/sun frame properly */}
      <Image
        src="/images/hero/taekmo-hero-background.jpg"
        alt="TAEKMO solar farm valley at sunset with golden light and mountains"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-[100%_82%] sm:object-[100%_75%] lg:object-[100%_70%]"
      />
      {/* Black opacity layers — light scrim so photo stays bright */}
      <div className="absolute inset-0 bg-black/18" aria-hidden />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000099_0%,#0000004d_30%,#0000001a_50%,transparent_68%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#00000073_0%,#00000033_16%,transparent_38%)]"
        aria-hidden
      />

      <div className="relative z-20 mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 pt-32 pb-24 sm:px-6 sm:pb-28 lg:h-full lg:px-8 lg:pt-[128px] lg:pb-24">
        {/* Left copy */}
        <div className="flex shrink-0 flex-col justify-center pt-4 sm:pt-6 lg:max-w-[54%] lg:flex-1 lg:pb-20 lg:pt-6">
          <motion.p
            {...fade(0.05)}
            className="mb-2 text-[10px] font-semibold tracking-[0.22em] text-white/90 uppercase sm:mb-3 sm:text-xs"
          >
            {heroContent.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-heading"
            {...fade(0.12)}
            className="max-w-[16ch] text-[1.85rem] font-bold leading-[1.08] tracking-tight text-white sm:max-w-none sm:text-4xl md:text-5xl lg:text-[3.4rem]"
          >
            {heroContent.headline}{" "}
            <span className="text-brand-mint">{heroContent.headlineAccent}</span>
          </motion.h1>
          <motion.p
            {...fade(0.2)}
            className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-[15px]"
          >
            {heroContent.description}
          </motion.p>
          <motion.div
            {...fade(0.28)}
            className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4"
          >
            <Button
              href={heroContent.primaryCta.href}
              variant="primary"
              className="rounded-md px-5 py-2.5 text-sm sm:px-6 sm:py-3"
            >
              {heroContent.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              href={heroContent.secondaryCta.href}
              variant="ghost"
              className="px-2 text-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/55 sm:h-9 sm:w-9">
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
              </span>
              {heroContent.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        {/* Verify — more top space on mobile, sits above wave */}
        <motion.div
          {...fade(0.35)}
          id="verify"
          className="relative z-20 mt-10 w-full max-w-[300px] self-start sm:mt-12 sm:max-w-[310px] lg:absolute lg:right-8 lg:bottom-20 lg:mt-0 lg:mb-0 lg:self-auto xl:right-8"
        >
          <VerificationCard
            showBarcodeGuide={false}
            className="border-brand-green/70 bg-[#0c1117]/85 p-4 sm:p-5"
          />
        </motion.div>
      </div>

      <WaveDivider color="#f4f7f5" />
    </section>
  );
}
