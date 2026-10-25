import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/Stats";
import { ProductRange } from "@/components/home/ProductRange";
import { Solutions } from "@/components/home/Solutions";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Partners } from "@/components/home/Partners";
import { LatestInsights } from "@/components/home/LatestInsights";
import { HomeBottomBand } from "@/components/home/HomeBottomBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ProductRange />
      <Solutions />
      <WhyChoose />
      <Partners />
      <LatestInsights />
      <HomeBottomBand />
    </>
  );
}
