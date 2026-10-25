import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionsPageView } from "@/components/solutions/SolutionsPageView";
import { solutionsPage } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Our Solutions",
  description:
    "TAEKMO solar solutions for residential, commercial & industrial, and utility-scale projects — Talesun BIPRO & HYPRO, BloombergNEF Tier 1.",
};

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
