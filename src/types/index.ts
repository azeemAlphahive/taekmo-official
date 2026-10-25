export type ProductCategory =
  | "all"
  | "solar-panels"
  | "inverters"
  | "batteries"
  | "accessories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Exclude<ProductCategory, "all">;
  categoryLabel: string;
  description: string;
  /** Bold watt / key rating line under the title (e.g. "650W"). */
  wattLabel?: string;
  /** Muted feature line under wattage (e.g. "High efficiency | N-Type Bifacial"). */
  featureLine?: string;
  priceLabel: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface ProductGalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface ProductBadge {
  label: string;
}

export interface ProductQuickSpec {
  id: string;
  label: string;
  value: string;
  icon: "power" | "efficiency" | "cell" | "dimensions" | "capacity" | "voltage" | "weight" | "generic";
}

export interface ProductSpecRow {
  label: string;
  value: string;
}

export interface ProductHighlight {
  id: string;
  title: string;
  description: string;
  icon: "efficiency" | "degradation" | "temperature" | "warranty" | "generic";
}

export interface ProductDocument {
  id: string;
  title: string;
  fileName: string;
  type: "datasheet" | "manual" | "warranty" | "certificate" | "other";
  /** Absolute/public path when a real file exists; omit when unavailable. */
  href?: string;
  available: boolean;
}

export interface ProductWarrantyItem {
  id: string;
  title: string;
  description: string;
  duration?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
}

export interface ProductDetail extends Product {
  badges: ProductBadge[];
  gallery: ProductGalleryImage[];
  quickSpecs: ProductQuickSpec[];
  overview: {
    heading: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  highlights: ProductHighlight[];
  specifications: ProductSpecRow[];
  warranty: ProductWarrantyItem[];
  documents: ProductDocument[];
  /** Only include when genuine review data exists. */
  reviews: ProductReview[];
  /** Demo/illustrative content flag for UI disclaimers. */
  isDemoContent: boolean;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: "experience" | "products" | "countries" | "satisfaction";
}

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: "efficiency" | "quality" | "support" | "sustainable";
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}
