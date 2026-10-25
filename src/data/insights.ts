export type InsightItem = {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
  imageAlt: string;
};

/**
 * Home “Latest insights” — sourced from public Talesun / industry updates
 * (BNEF Tier 1, TAEKMO brand launch, Intersolar technology highlights).
 */
export const insights: InsightItem[] = [
  {
    id: "bnef-tier1-2026",
    category: "Bankability",
    date: "Feb 2026",
    title: "Talesun retains BloombergNEF Tier 1 for Q1 2026",
    excerpt:
      "Continued Tier 1 recognition underscores bankability for projects specifying Talesun / TAEKMO modules — a financing signal, not a quality ranking.",
    href: "https://www.talesun.com/en/talesun-retains-position-on-bnef-tier-1-list-for-q1-2026/",
    image: "/images/solutions/utility.jpg",
    imageAlt: "Utility-scale solar array under clear sky",
  },
  {
    id: "taekmo-sub-brand",
    category: "Brand",
    date: "Apr 2025",
    title: "Talesun establishes TAEKMO for international markets",
    excerpt:
      "TAEKMO launches as Talesun’s dedicated overseas sub-brand — with tailored product, pricing, and go-to-market strategies for global customers.",
    href: "https://www.talesun.com/en/talesun-establishes-sub-brand-taekmo-to-further-enhance-brand-value/",
    image: "/images/solutions/commercial.jpg",
    imageAlt: "Commercial rooftop solar installation",
  },
  {
    id: "topcon-hjt-lineup",
    category: "Technology",
    date: "2025–2026",
    title: "BIPRO TOPCon & HYPRO HJT for every project scale",
    excerpt:
      "From compact residential modules to high-watt utility classes, TAEKMO catalogues N-type bifacial dual-glass platforms for rooftops and ground mounts.",
    href: "/technology",
    image: "/images/solutions/residential.jpg",
    imageAlt: "Residential home with rooftop solar panels",
  },
];
