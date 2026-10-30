export const siteConfig = {
  name: "TAEKMO",
  tagline: "Better Energy. A Brighter Future.",
  description:
    "Official TAEKMO Solar website — high-efficiency N-type solar panels, Talesun TAEKMO modules, project solutions, and product authenticity verification for homes, businesses, and utility projects.",
  url: "https://taekmo-official.com",
  email: "Nibrass.zaman@talesun.com",
  phone: "+92 323 3336633",
  address:
    "No.1 Talesun Road, Shajiabang, Changshu, Suzhou, Jiangsu Province, China 215542",
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Technology", href: "/technology" },
  { label: "About Us", href: "/about" },
  { label: "Verify Products", href: "/verify" },
] as const;

export const heroContent = {
  eyebrow: "OFFICIAL TAEKMO SOLAR WEBSITE",
  headline: "TAEKMO Solar — Clean Energy for a Brighter",
  headlineAccent: "Tomorrow",
  description:
    "High-performance TAEKMO N-type solar panels and complete solar solutions for homes, businesses, and utility projects. Built for a sustainable future.",
  primaryCta: "Explore Products",
  secondaryCta: "Watch Video",
} as const;

export const verificationContent = {
  title: "Check authenticity",
  instruction: "Enter or scan the Product No. from your module label.",
  placeholder: "e.g. 2604D72F2882009720",
} as const;

export const stats = [
  { id: "experience", value: "25+", label: "Years of Experience", icon: "trophy-outline" as const },
  { id: "products", value: "1M+", label: "Products Delivered", icon: "cube-outline" as const },
  { id: "countries", value: "50+", label: "Countries", icon: "earth-outline" as const },
  { id: "satisfaction", value: "99.8%", label: "Customer Satisfaction", icon: "star-outline" as const },
] as const;

export const features = [
  {
    id: "efficiency",
    title: "High Efficiency",
    description:
      "Advanced module and inverter technology engineered for strong real-world energy yield.",
    icon: "flash-outline" as const,
  },
  {
    id: "quality",
    title: "Trusted Quality",
    description:
      "Rigorous quality processes and durable components built for long-term performance.",
    icon: "shield-checkmark-outline" as const,
  },
  {
    id: "support",
    title: "Global Support",
    description:
      "Responsive technical assistance and partner networks to keep systems running reliably.",
    icon: "globe-outline" as const,
  },
  {
    id: "sustainable",
    title: "Sustainable Future",
    description:
      "Clean energy solutions designed to reduce emissions and power a brighter tomorrow.",
    icon: "leaf-outline" as const,
  },
] as const;

/** Same 4 solutions as the website home / solutions pages. */
export const solutions = [
  {
    id: "residential",
    title: "Residential",
    description:
      "Intelligent rooftop solar that powers the home and lowers the bill — all-black and compact BIPRO modules built for aesthetics and low-light performance.",
    image: "/images/solutions/residential.jpg",
  },
  {
    id: "commercial",
    title: "Commercial & Industrial",
    description:
      "C&I rooftop, carport and plant systems for reliable, lower-cost supply — high-efficiency TOPCon and HJT modules that maximise limited roof space.",
    image: "/images/solutions/commercial.jpg",
  },
  {
    id: "industrial",
    title: "Industrial",
    description:
      "High-capacity arrays for factories and continuous operations — durable dual-glass modules rated for demanding mechanical loads.",
    image: "/images/solutions/industrial.jpg",
  },
  {
    id: "utility",
    title: "Large scale",
    description:
      "Utility-grade modules engineered for the yield big sites demand — high-watt BIPRO and HYPRO platforms aimed at lower LCOE.",
    image: "/images/solutions/utility.jpg",
  },
] as const;

export const solutionsPage = {
  hero: {
    eyebrow: "OUR SOLUTIONS",
    title: "Our solutions",
    description:
      "Energy solar solutions for every project — from homes to utility-scale plants.",
  },
  about: {
    title: "Engineered for real-world solar success",
    lead:
      "TAEKMO delivers performance and value tailored to every objective and to maximise economic efficiency.",
    paragraphs: [
      "TAEKMO panels are engineered to meet real-world conditions with durability and consistent performance. As Talesun Solar’s international sub-brand — backed by Xiamen C&D Group — the portfolio includes high-efficiency N-type TOPCon BIPRO bifacial modules and premium HYPRO HJT dual-glass technology on a BloombergNEF Tier 1 manufacturing platform. These innovations make TAEKMO a reliable choice for industrial solar solutions as well as diverse energy applications.",
      "All panels feature a low temperature coefficient for stable output in heat, robust dual-glass construction for resistance to hail, wind, and snow, and an electrical design that helps maintain energy production even in shaded conditions. They meet industry standards for mechanical load and come with warranties suited to their application.",
      "From residential applications to large scale utility power plants, TAEKMO caters to your every need.",
    ],
  },
  scaleTitle: "High performance and value, at every scale",
  ctaTitle: "Shaping the future of energy",
  ctaBody:
    "Spec BIPRO or HYPRO modules with C&D Xiamen and Talesun behind every watt — talk to TAEKMO about your next rooftop or utility project.",
} as const;

export const techChips = [
  {
    id: "bipro",
    icon: "flash-outline" as const,
    title: "BIPRO TOPCon",
    description: "N-type bifacial dual-glass for rooftops and utility arrays.",
  },
  {
    id: "hypro",
    icon: "layers-outline" as const,
    title: "HYPRO HJT",
    description: "High bifaciality and ultra-low temperature coefficient.",
  },
  {
    id: "tier1",
    icon: "shield-checkmark-outline" as const,
    title: "BNEF Tier 1",
    description: "Talesun platform bankability for financed projects.",
  },
] as const;

export const solutionPillars = [
  {
    id: "residential",
    title: "Residential",
    description:
      "Intelligent solar that powers the home and lowers the bill.",
    icon: "home-outline" as const,
  },
  {
    id: "businesses",
    title: "Businesses",
    description:
      "Commercial and industrial systems built for reliable, lower-cost supply.",
    icon: "business-outline" as const,
  },
  {
    id: "utility",
    title: "Large scale",
    description:
      "Utility-grade modules engineered for the yield big sites demand.",
    icon: "sunny-outline" as const,
  },
] as const;

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
  markets: [
    { id: "middle-east", region: "Middle East", focus: "Utility & C&I focus" },
    { id: "africa", region: "Africa", focus: "Growing PV demand" },
    { id: "south-america", region: "South America", focus: "Expanding footprint" },
    { id: "asia", region: "Asia", focus: "Priority region" },
  ],
  headquarters: {
    label: "Headquarters",
    address: siteConfig.address,
    email: siteConfig.email,
  },
} as const;

export const partners = [
  {
    id: "cd-xiamen",
    name: "Xiamen C&D Group",
    shortName: "C&D Xiamen",
    credential: "Fortune Global 500",
    role: "Strategic industrial partner",
    highlight: "Controlling shareholder of Talesun Solar",
    logo: "/images/partners/cd-xiamen-logo.svg",
  },
  {
    id: "talesun",
    name: "Talesun Solar",
    shortName: "Talesun",
    credential: "BNEF Tier 1",
    role: "Technology & manufacturing",
    highlight: "Parent brand behind TAEKMO modules",
    logo: "/images/partners/talesun-logo.png",
  },
] as const;

export const distributors = [
  {
    id: "inb-solar",
    name: "INB Solar Pakistan",
    shortName: "INB Solar",
    location: "Karachi",
    role: "Authorized distributor",
    highlight: "Importer · Wholesaler · Retailer · DHA Phase 7, Karachi",
    logo: "/images/distributors/inb-solar-logo.png",
    logoOnDark: false,
  },
  {
    id: "ey-enterprise",
    name: "EY Enterprise",
    shortName: "EY Enterprise",
    location: "Karachi",
    role: "Authorized distributor",
    highlight: "Solar EPC & BESS · DHA Phase II Ext, Karachi",
    logo: "/images/distributors/ey-enterprise-logo.png",
    logoOnDark: true,
  },
  {
    id: "blaze-solar",
    name: "Blaze Solar Energy",
    shortName: "Blaze Solar",
    location: "Karachi",
    role: "Authorized distributor",
    highlight: "Bulk supply · DHA Phase VII & Phase II, Karachi",
    logo: "/images/distributors/blaze-solar-logo.png",
    logoOnDark: true,
  },
  {
    id: "prime-chem",
    name: "Prime Chem",
    shortName: "Prime Chem",
    location: "Karachi / Lahore",
    role: "Authorized distributor",
    highlight: "Importer · TAEKMO module channel",
    logo: "/images/distributors/prime-chem-logo.png",
    logoOnDark: false,
  },
] as const;

export const insights = [
  {
    id: "bnef-tier1-2026",
    category: "Bankability",
    date: "Feb 2026",
    title: "Talesun retains BloombergNEF Tier 1 for Q1 2026",
    excerpt:
      "Continued Tier 1 recognition underscores bankability for projects specifying Talesun / TAEKMO modules — a financing signal, not a quality ranking.",
    image: "/images/solutions/utility.jpg",
  },
  {
    id: "taekmo-sub-brand",
    category: "Brand",
    date: "Apr 2025",
    title: "Talesun establishes TAEKMO for international markets",
    excerpt:
      "TAEKMO launches as Talesun’s dedicated overseas sub-brand — with tailored product, pricing, and go-to-market strategies for global customers.",
    image: "/images/solutions/commercial.jpg",
  },
  {
    id: "topcon-hjt-lineup",
    category: "Technology",
    date: "2025–2026",
    title: "BIPRO TOPCon & HYPRO HJT for every project scale",
    excerpt:
      "From compact residential modules to high-watt utility classes, TAEKMO catalogues N-type bifacial dual-glass platforms for rooftops and ground mounts.",
    image: "/images/solutions/residential.jpg",
  },
] as const;

export const salesLeadership = [
  {
    id: "nibrass-zaman",
    name: "Nibrass Zaman",
    title: "Country Head, Pakistan",
    photo: "/images/team/nibrass-zaman.jpg",
    message:
      "Leads TAEKMO as Country Head, Pakistan — building distributor partnerships, project supply pipelines, and long-term channel growth for residential, C&I, and utility buyers.",
    email: "Nibrass.zaman@talesun.com",
    phone: "+92 323 3336633",
  },
  {
    id: "sofia-li",
    name: "Sofia.Li",
    title: "Sales Director, Pakistan",
    photo: "/images/team/sofia-li.jpg",
    photoPosition: { top: "28%", left: "50%" },
    message:
      "Drives TAEKMO sales in Pakistan as Sales Director — partner onboarding, commercial support, and reliable follow-through from inquiry through delivery for Talesun / TAEKMO modules.",
    email: "sofia.li@talesun.com",
    phone: "+92 310 331 6666",
  },
] as const;

export const pakistanCountryHead = salesLeadership[0];

export const technologyPage = {
  hero: {
    eyebrow: "TECHNOLOGY",
    title: "N-type platforms for every scale",
    description:
      "BIPRO TOPCon and HYPRO HJT module platforms — dual-glass durability, high efficiency, and bankable warranties.",
  },
  items: [
    {
      title: "N-type TOPCon (BIPRO)",
      body: "High-efficiency bifacial dual-glass modules engineered for rooftop, C&I, and utility projects.",
    },
    {
      title: "HJT / BC platforms (HYPRO)",
      body: "Premium cell architectures for higher yield and strong bifacial performance where the project demands it.",
    },
    {
      title: "Bankable manufacturing",
      body: "Built on Talesun’s BNEF Tier 1 platform with C&D Group industrial backing for international markets.",
    },
  ],
} as const;
