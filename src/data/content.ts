import type { FeatureItem, FooterColumn, NavItem, StatItem } from "@/types";

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
  /**
   * Android APK on GitHub Releases (stable — no site bandwidth load).
   * After a new EAS build: upload APK to a new release tag and update this URL.
   * Override with NEXT_PUBLIC_ANDROID_APK_URL if needed.
   */
  androidApkUrl:
    "https://github.com/azeemAlphahive/taekmo-official/releases/download/v1.0.1/taekmo-solar.apk",
  androidBuildPageUrl:
    "https://github.com/azeemAlphahive/taekmo-official/releases/tag/v1.0.1",
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products#all-products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Technology", href: "/technology" },
  { label: "About Us", href: "/about" },
  { label: "Verify Products", href: "/verify" },
];

/** Placeholder business metrics — replace with confirmed figures. */
export const stats: StatItem[] = [
  {
    id: "experience",
    value: "25+",
    label: "Years of Experience",
    icon: "experience",
  },
  {
    id: "products",
    value: "1M+",
    label: "Products Delivered",
    icon: "products",
  },
  {
    id: "countries",
    value: "50+",
    label: "Countries",
    icon: "countries",
  },
  {
    id: "satisfaction",
    value: "99.8%",
    label: "Customer Satisfaction",
    icon: "satisfaction",
  },
];

export const features: FeatureItem[] = [
  {
    id: "efficiency",
    title: "High Efficiency",
    description:
      "Advanced module and inverter technology engineered for strong real-world energy yield.",
    icon: "efficiency",
  },
  {
    id: "quality",
    title: "Trusted Quality",
    description:
      "Rigorous quality processes and durable components built for long-term performance.",
    icon: "quality",
  },
  {
    id: "support",
    title: "Global Support",
    description:
      "Responsive technical assistance and partner networks to keep systems running reliably.",
    icon: "support",
  },
  {
    id: "sustainable",
    title: "Sustainable Future",
    description:
      "Clean energy solutions designed to reduce emissions and power a brighter tomorrow.",
    icon: "sustainable",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { label: "All Products", href: "/products#all-products" },
      { label: "Solar Panels", href: "/products#all-products" },
      { label: "Inverters", href: "/products#all-products" },
      { label: "Batteries", href: "/products#all-products" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "All Solutions", href: "/solutions" },
      { label: "Residential", href: "/solutions" },
      { label: "Commercial", href: "/solutions" },
      { label: "Utility Scale", href: "/solutions" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Product Verification", href: "/verify" },
      { label: "Contact Us", href: "/contact" },
      { label: "Technology", href: "/technology" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About TAEKMO", href: "/about" },
      { label: "Partners", href: "/#partners" },
      { label: "Distributors", href: "/#distributors" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export const heroContent = {
  eyebrow: "OFFICIAL TAEKMO SOLAR WEBSITE",
  headline: "TAEKMO Solar — Clean Energy for a Brighter",
  headlineAccent: "Tomorrow",
  description:
    "High-performance TAEKMO N-type solar panels and complete solar solutions for homes, businesses, and utility projects. Built for a sustainable future.",
  primaryCta: { label: "Explore Products", href: "/products#all-products" },
  secondaryCta: { label: "Watch Video", href: "/#story" },
} as const;

export const verificationContent = {
  title: "Check authenticity",
  instruction: "Enter or scan the Product No. from your module label.",
  placeholder: "e.g. 2604D72F2882009720",
} as const;

/** TAEKMO / Talesun sales leadership — shown on Contact. */
export const salesLeadership = [
  {
    id: "nibrass-zaman",
    name: "Nibrass Zaman",
    title: "Country Head, Pakistan",
    region: "TAEKMO",
    photo: "/images/team/nibrass-zaman.jpg",
    photoAlt: "Nibrass Zaman, Country Head, Pakistan",
    photoPosition: "object-top",
    message:
      "Leads TAEKMO as Country Head, Pakistan — building distributor partnerships, project supply pipelines, and long-term channel growth for residential, C&I, and utility buyers.",
    email: "Nibrass.zaman@talesun.com",
    phone: "+92 323 3336633",
    whatsapp: "+923233336633",
  },
  {
    id: "sofia-li",
    name: "Sofia.Li",
    title: "Sales Director, Pakistan",
    region: "TAEKMO",
    photo: "/images/team/sofia-li.jpg",
    photoAlt: "Sofia.Li, Sales Director, Pakistan",
    photoPosition: "object-top",
    message:
      "Drives TAEKMO sales in Pakistan as Sales Director — partner onboarding, commercial support, and reliable follow-through from inquiry through delivery for Talesun / TAEKMO modules.",
    email: "sofia.li@talesun.com",
    phone: "+92 310 331 6666",
    whatsapp: "+923103316666",
  },
] as const;

/** @deprecated Prefer salesLeadership — kept for mobile imports during transition. */
export const pakistanCountryHead = salesLeadership[0];
