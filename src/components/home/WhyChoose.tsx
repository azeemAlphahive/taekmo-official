import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Leaf,
  Play,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { features } from "@/data/content";
import type { FeatureItem } from "@/types";

const icons: Record<FeatureItem["icon"], ReactNode> = {
  efficiency: <Zap className="h-5 w-5" strokeWidth={1.75} />,
  quality: <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />,
  support: <BadgeCheck className="h-5 w-5" strokeWidth={1.75} />,
  sustainable: <Leaf className="h-5 w-5" strokeWidth={1.75} />,
};

export function WhyChoose() {
  return (
    <section
      id="about"
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <SectionReveal>
          <h2
            id="why-heading"
            className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
          >
            Why Choose TAEKMO?
          </h2>
          <p className="mt-2 max-w-md text-sm text-brand-muted sm:text-[15px]">
            Built for performance, reliability, and a cleaner energy future.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature.id} className="flex gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  {icons[feature.icon]}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-brand-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-brand-muted sm:text-[13px]">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div id="story">
          <Link
            href="#story"
            className="group relative block overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          >
            <div className="relative aspect-[4/3] sm:aspect-[5/4]">
              <Image
                src="/images/promo/technician.jpg"
                alt="Solar technician reviewing system data on a tablet"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/25 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.15em] text-brand-mint uppercase">
                    Our Story
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
                    The Power of Solar in Your Hands
                  </p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-white shadow-lg transition-transform duration-300 motion-safe:group-hover:scale-105">
                  <Play className="h-5 w-5 fill-current" aria-hidden />
                  <span className="sr-only">Watch Our Story</span>
                </span>
              </div>
            </div>
          </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
