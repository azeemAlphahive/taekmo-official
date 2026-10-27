import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/Stats";
import { ProductRange } from "@/components/home/ProductRange";
import { Solutions } from "@/components/home/Solutions";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Partners } from "@/components/home/Partners";
import { Distributors } from "@/components/home/Distributors";
import { LatestInsights } from "@/components/home/LatestInsights";
import { HomeBottomBand } from "@/components/home/HomeBottomBand";
import { HomeSeoContent } from "@/components/seo/HomeSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title:
    "TAEKMO Solar | Official Website — N-Type Solar Panels & Solutions",
  description:
    "Welcome to the official TAEKMO Solar website. Explore TAEKMO N-type solar panels, Talesun TAEKMO modules, complete solar solutions, and verify genuine TAEKMO products online.",
  path: "/",
  keywords: [
    "TAEKMO official website",
    "buy TAEKMO solar panels",
    "TAEKMO Solar home",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ProductRange />
      <Solutions />
      <WhyChoose />
      <LatestInsights />
      <Partners />
      <Distributors />
      <HomeSeoContent />
      <HomeBottomBand />
    </>
  );
}
