import type { SolutionItem } from "@/types";

/**
 * Solutions content shaped after industry reference layouts
 * (e.g. TCL Solar “Our solutions”) with TAEKMO / Talesun product facts.
 * Sources: Talesun BIPRO/HYPRO datasheets, BNEF Tier 1 listing, Talesun
 * residential / C&I / utility scenario messaging.
 */
export const solutionsPage = {
  hero: {
    eyebrow: "OUR SOLUTIONS",
    title: "Our solutions",
    description:
      "Energy solar solutions for every project — from homes to utility-scale plants.",
  },
  /** TCL-style brand narrative block (about the brand on Solutions). */
  about: {
    image: "/images/hero/taekmo-hero-background.jpg",
    imageAlt: "TAEKMO solar farm valley at sunrise",
    title: "Engineered for real-world solar success",
    lead:
      "TAEKMO delivers performance and value tailored to every objective and to maximise economic efficiency.",
    paragraphs: [
      "TAEKMO panels are engineered to meet real-world conditions with durability and consistent performance. As Talesun Solar’s international sub-brand — backed by Xiamen C&D Group — the portfolio includes high-efficiency N-type TOPCon BIPRO bifacial modules and premium HYPRO HJT dual-glass technology on a BloombergNEF Tier 1 manufacturing platform. These innovations make TAEKMO a reliable choice for industrial solar solutions as well as diverse energy applications.",
      "All panels feature a low temperature coefficient for stable output in heat, robust dual-glass construction for resistance to hail, wind, and snow, and an electrical design that helps maintain energy production even in shaded conditions. They meet industry standards for mechanical load and come with warranties suited to their application.",
      "From residential applications to large scale utility power plants, TAEKMO caters to your every need.",
    ],
  },
  scale: {
    title: "High performance and value, at every scale",
  },
  cta: {
    title: "Shaping the future of energy",
    primary: { label: "Contact us", href: "/contact" },
    secondary: { label: "View products", href: "/products#all-products" },
  },
} as const;

/**
 * About page — aligned with https://taekmo-official.com/about
 */
export const aboutPage = {
  hero: {
    eyebrow: "ABOUT TAEKMO",
    title: "TAEKMO",
    description:
      "International sub-brand of Talesun Solar, under the C&D Group.",
  },
  story: {
    title: "International sub-brand of Talesun Solar, under the C&D Group",
    lead:
      "TAEKMO was established as the dedicated international sub-brand of Talesun Solar to serve overseas markets with tailored product design, pricing, and support—while sharing the manufacturing strength and quality systems of a world-class PV group under C&D.",
    paragraphs: [
      "From our base at No.1 Talesun Road in Changshu, China, we specialize in cutting-edge N-type module technology and integrated energy systems. Our focus is clear: empower industries, communities, and households across priority growth regions to transition seamlessly to clean, reliable power.",
    ],
  },
  why: {
    eyebrow: "Why TAEKMO",
    title: "Global-standard solar, built for international markets",
    items: [
      {
        id: "international",
        title: "International brand",
        description:
          "A Talesun Solar sub-brand purpose-built for global market expansion and local requirements.",
      },
      {
        id: "manufacturing",
        title: "Manufacturing heritage",
        description:
          "Backed by Talesun’s production capability and C&D Group’s supply-chain strength.",
      },
      {
        id: "quality",
        title: "Quality you can check",
        description:
          "High-efficiency modules with long-term warranties and online panel authenticity verification.",
      },
    ],
  },
  markets: {
    eyebrow: "Priority markets",
    title: "Focused where solar growth is accelerating",
    items: [
      {
        id: "middle-east",
        region: "Middle East",
        focus: "Utility & C&I focus",
      },
      {
        id: "africa",
        region: "Africa",
        focus: "Growing PV demand",
      },
      {
        id: "south-america",
        region: "South America",
        focus: "Expanding footprint",
      },
      {
        id: "asia",
        region: "Asia",
        focus: "Priority region",
      },
    ],
  },
  headquarters: {
    label: "Headquarters",
    address:
      "No.1 Talesun Road, Shajiabang, Changshu, Suzhou, Jiangsu Province, China 215542",
    email: "sales@taekmosolar.com",
  },
} as const;

/**
 * Strategic partners — Xiamen C&D Group (controlling shareholder of Talesun)
 * and Talesun Solar (TAEKMO parent / manufacturing platform).
 */
export const partners = [
  {
    id: "cd-xiamen",
    name: "Xiamen C&D Group",
    shortName: "C&D Xiamen",
    credential: "Fortune Global 500",
    role: "Strategic industrial partner",
    logo: "/images/partners/cd-xiamen-logo.svg",
    logoAlt: "C&D Xiamen logo",
    logoInvertOnDark: true,
    website: "https://www.cndnewenergy.com/",
    highlight: "Controlling shareholder of Talesun Solar",
    description:
      "Xiamen C&D Group Co., Ltd. (C&D Inc.) is the actual controlling shareholder of Talesun Solar following the group restructuring — bringing Fortune Global 500 scale, supply-chain strength, and long-term industrial backing to the TAEKMO platform.",
  },
  {
    id: "talesun",
    name: "Talesun Solar",
    shortName: "Talesun",
    credential: "BNEF Tier 1",
    role: "Technology & manufacturing",
    logo: "/images/partners/talesun-logo.png",
    logoAlt: "Talesun Solar logo",
    logoInvertOnDark: false,
    website: "https://en.talesun.com/",
    highlight: "Parent brand behind TAEKMO modules",
    description:
      "Suzhou Talesun Solar Technologies Co., Ltd. established TAEKMO as its international sub-brand. Talesun provides N-type module platforms, global manufacturing capacity, and quality systems shared with TAEKMO for overseas markets.",
  },
] as const;

export const solutions: SolutionItem[] = [
  {
    id: "residential",
    title: "Residential",
    description:
      "Intelligent rooftop solar that powers the home and lowers the bill — all-black and compact BIPRO modules built for aesthetics and low-light performance.",
    image: "/images/solutions/residential.jpg",
    imageAlt: "Modern home with rooftop solar panels",
    href: "/solutions#residential",
  },
  {
    id: "commercial",
    title: "Commercial & Industrial",
    description:
      "C&I rooftop, carport and plant systems for reliable, lower-cost supply — high-efficiency TOPCon and HJT modules that maximise limited roof space.",
    image: "/images/solutions/commercial.jpg",
    imageAlt: "Commercial building with solar installation",
    href: "/solutions#commercial",
  },
  {
    id: "industrial",
    title: "Industrial",
    description:
      "High-capacity arrays for factories and continuous operations — durable dual-glass modules rated for demanding mechanical loads.",
    image: "/images/solutions/industrial.jpg",
    imageAlt: "Industrial facility with large solar array",
    href: "/solutions#industrial",
  },
  {
    id: "utility",
    title: "Large scale",
    description:
      "Utility-grade modules engineered for the yield big sites demand — high-watt BIPRO and HYPRO platforms aimed at lower LCOE.",
    image: "/images/solutions/utility.jpg",
    imageAlt: "Large utility-scale solar farm",
    href: "/solutions#utility",
  },
];

/** TCL-style three pillars — short captions like tclsolar.com/our-solutions */
export const solutionPillars: SolutionItem[] = [
  {
    ...solutions[0],
    description:
      "Intelligent solar that powers the home and lowers the bill.",
  },
  {
    ...solutions[1],
    id: "businesses",
    title: "Businesses",
    description:
      "Commercial and industrial systems built for reliable, lower-cost supply.",
    href: "/solutions#businesses",
  },
  {
    ...solutions[3],
    description:
      "Utility-grade modules engineered for the yield big sites demand.",
  },
];
