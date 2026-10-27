import type { Metadata } from "next";
import { siteConfig } from "@/data/content";

export const seoKeywords = [
  "TAEKMO",
  "TAEKMO Solar",
  "TAEKMO solar panels",
  "TAEKMO modules",
  "TAEKMO official website",
  "Talesun TAEKMO",
  "N-type solar modules",
  "solar panels Pakistan",
  "solar modules Middle East",
  "verify TAEKMO product",
  "TKM solar panel",
] as const;

const DEFAULT_OG_IMAGE = {
  url: "/images/hero/solar-farm.jpg",
  width: 1920,
  height: 1080,
  alt: "TAEKMO solar farm — clean energy modules",
} as const;

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const path = options.path ?? "/";
  const url = absoluteUrl(path);
  const image = options.image ?? DEFAULT_OG_IMAGE.url;
  const keywords = [...seoKeywords, ...(options.keywords ?? [])];

  return {
    title: options.title,
    description: options.description,
    keywords: keywords.join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: options.title.includes("TAEKMO")
        ? options.title
        : `${options.title} | TAEKMO Solar`,
      description: options.description,
      url,
      siteName: "TAEKMO Solar",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: DEFAULT_OG_IMAGE.width,
          height: DEFAULT_OG_IMAGE.height,
          alt: DEFAULT_OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [image],
    },
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TAEKMO",
    alternateName: ["TAEKMO Solar", "Taekmo Solar", "Talesun TAEKMO"],
    url: siteConfig.url,
    logo: absoluteUrl("/icon.png"),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No.1 Talesun Road, Shajiabang, Changshu",
      addressLocality: "Suzhou",
      addressRegion: "Jiangsu",
      postalCode: "215542",
      addressCountry: "CN",
    },
    areaServed: ["Middle East", "Africa", "South America", "Asia", "Pakistan"],
    brand: {
      "@type": "Brand",
      name: "TAEKMO",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Talesun Solar",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        availableLanguage: ["English", "Chinese"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TAEKMO Solar",
    alternateName: "TAEKMO",
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: "TAEKMO",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/verify")}?barcode={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  image: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: "TAEKMO",
    },
    manufacturer: {
      "@type": "Organization",
      name: "TAEKMO",
    },
    category: product.category ?? "Solar Panel",
    url: absoluteUrl(`/products/${product.slug}`),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
