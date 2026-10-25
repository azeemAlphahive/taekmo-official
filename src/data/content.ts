import type { FeatureItem, FooterColumn, NavItem, StatItem } from "@/types";

export const siteConfig = {
  name: "TAEKMO",
  tagline: "Better Energy. A Brighter Future.",
  description:
    "TAEKMO delivers high-performance solar panels, inverters, batteries, and complete solar solutions for homes and businesses.",
  url: "https://taekmo.com",
  email: "hello@taekmo.com",
  phone: "+92 300 0000000",
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
      { label: "Partners", href: "/about#partners" },
      { label: "Projects", href: "/projects" },
      { label: "Support", href: "/support" },
    ],
  },
];

export const heroContent = {
  eyebrow: "TAEKMO SOLAR SOLUTIONS",
  headline: "Clean Energy for a Brighter",
  headlineAccent: "Tomorrow",
  description:
    "High-performance solar solutions for homes, businesses and industries. Built for a sustainable future.",
  primaryCta: { label: "Explore Products", href: "/products#all-products" },
  secondaryCta: { label: "Watch Video", href: "/#story" },
} as const;

export const verificationContent = {
  title: "Check authenticity",
  instruction: "Enter the serial / barcode from your module label.",
  placeholder: "Enter serial number",
  demoNote:
    "Demo mode: verification is not connected to a live database yet.",
} as const;
