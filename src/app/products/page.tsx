import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductsCatalogue } from "@/components/products/ProductsCatalogue";
import { VerifySection } from "@/components/home/VerifySection";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Full TAEKMO / Talesun BIPRO & HYPRO solar panel catalogue — BloombergNEF Tier 1.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="TAEKMO CATALOGUE"
        title="Our Product Range"
        description="Complete Talesun BIPRO (TOPCon) and HYPRO (HJT) panel lineup — every published watt class."
        imageSrc="/images/solutions/commercial.jpg"
      />
      <ProductsCatalogue />
      <VerifySection compact />
    </>
  );
}
