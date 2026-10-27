import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductsCatalogue } from "@/components/products/ProductsCatalogue";
import { VerifySection } from "@/components/home/VerifySection";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Official TAEKMO modules — TKM9D72B, TKM8D66N, TKM3D66N, TKM7D78N, TKM7D72N, TKM7D54N.",
};

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
