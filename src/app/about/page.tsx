import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { PriorityMarkets } from "@/components/about/PriorityMarkets";
import { Partners } from "@/components/home/Partners";
import { aboutPage } from "@/data/solutions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About TAEKMO Solar | Talesun International Brand",
  description:
    "Learn about TAEKMO — the international solar brand of Talesun Solar under the C&D Group. Discover our N-type module focus across Middle East, Africa, South America, and Asia.",
  path: "/about",
  keywords: ["about TAEKMO", "Talesun TAEKMO", "C&D Group solar"],
});

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
