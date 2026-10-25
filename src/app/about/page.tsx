import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Partners } from "@/components/home/Partners";
import { aboutPage } from "@/data/solutions";

export const metadata: Metadata = {
  title: "About",
  description:
    "About TAEKMO — Talesun BIPRO & HYPRO modules, BloombergNEF Tier 1 platform, solutions for every scale.",
};

export default function AboutPage() {
  const { hero } = aboutPage;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        imageSrc="/images/hero/solar-farm.jpg"
      />
      <WhoWeAre />
      <Partners />
      <WhyChoose />
    </>
  );
}
