import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { PriorityMarkets } from "@/components/about/PriorityMarkets";
import { Partners } from "@/components/home/Partners";
import { aboutPage } from "@/data/solutions";

export const metadata: Metadata = {
  title: "About",
  description:
    "TAEKMO — international sub-brand of Talesun Solar under the C&D Group. N-type modules for Middle East, Africa, South America, and Asia.",
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
      <PriorityMarkets />
      <Partners variant="full" />
    </>
  );
}
