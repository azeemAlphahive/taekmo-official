import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionsPageView } from "@/components/solutions/SolutionsPageView";
import { solutionsPage } from "@/data/solutions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "TAEKMO Solar Solutions | Residential, C&I & Utility",
  description:
    "TAEKMO solar solutions for residential, commercial & industrial, and utility-scale projects — Talesun BIPRO & HYPRO technology with bankable performance.",
  path: "/solutions",
  keywords: [
    "TAEKMO solar solutions",
    "utility solar TAEKMO",
    "commercial solar panels",
  ],
});

export default function SolutionsPage() {
  const { hero } = solutionsPage;

  return (
    <>
      <PageHero
        eyebrow="TAEKMO SOLUTIONS"
        title={hero.title}
        description={hero.description}
        imageSrc="/images/hero/taekmo-hero-background.jpg"
        imageAlt="TAEKMO solar farm valley at sunrise"
      />
      <SolutionsPageView />
    </>
  );
}
