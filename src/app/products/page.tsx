import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductsCatalogue } from "@/components/products/ProductsCatalogue";
import { VerifySection } from "@/components/home/VerifySection";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "TAEKMO Solar Panels & Modules | Product Catalogue",
  description:
    "Browse official TAEKMO solar panels and N-type modules — TKM9D72B, TKM8D66N, TKM3D66N, TKM7D78N, TKM7D72N, TKM7D54N and more for utility, C&I, and rooftop projects.",
  path: "/products",
  keywords: [
    "TAEKMO solar panels",
    "TAEKMO modules",
    "TKM9D72B",
    "TAEKMO catalogue",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="TAEKMO CATALOGUE"
        title="Our Product Range"
        description="High-reliability N-type modules for international utility, C&I, and distributed projects — matching the official TAEKMO catalogue."
        imageSrc="/images/solutions/commercial.jpg"
      />
      <ProductsCatalogue />
      <VerifySection compact />
    </>
  );
}
