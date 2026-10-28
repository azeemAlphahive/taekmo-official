import type { Product, ProductCategory, ProductDetail } from "@/types";

export const productCategories: {
  id: ProductCategory;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "solar-panels", label: "Solar Panels" },
];

const PANEL_IMAGE = "/images/products/taekmo-solar-panel-white.jpg";

/**
 * TAEKMO module catalogue — one card per model series.
 * Sorted low → high watt on home and All Products.
 */
type PanelFamily = "BC" | "N-Type";

type OfficialModule = {
  code: string;
  family: PanelFamily;
  wattMin: number;
  wattMax: number;
  /** Representative / peak published output for detail specs */
  peakWatt: number;
  efficiency: number;
  technology: string;
  cells: string;
  cellCount: string;
  dimensions: string;
  weight: string;
  glass: string;
  frames: string;
  warrantyProduct: string;
  warrantyPerformance: string;
  performanceNote: string;
  officialPath: string;
  base: {
    vmpp: number;
    impp: number;
    voc: number;
    isc: number;
  };
};

/** Low watt → high watt (home + All Products). */
const officialModules: OfficialModule[] = [
  {
    code: "TKM7D54N",
    family: "N-Type",
    wattMin: 435,
    wattMax: 455,
    peakWatt: 455,
    efficiency: 23.0,
    technology: "N-type Mono-Crystalline · 16 Busbar",
    cells: "108 pcs in series (6×18)",
    cellCount: "108",
    dimensions: "1722 × 1134 × 30 mm",
    weight: "24.0 kg",
    glass: "Dual glass / tempered (platform)",
    frames: "Full black · Silver",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    performanceNote:
      "Linear power output warranty — end of 30-year ≥80% where published.",
    officialPath: "tkm7d54n-435-455",
    base: { vmpp: 33.6, impp: 13.54, voc: 40.1, isc: 14.25 },
  },
  {
    code: "TKM7D72N",
    family: "N-Type",
    wattMin: 580,
    wattMax: 600,
    peakWatt: 600,
    efficiency: 23.2,
    technology: "N-type Mono-Crystalline · 16 Busbar",
    cells: "144 pcs in series (6×24)",
    cellCount: "144",
    dimensions: "2278 × 1134 × 30 mm",
    weight: "31.8 kg",
    glass: "Dual glass / tempered (platform)",
    frames: "Anodized aluminum alloy",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    performanceNote:
      "Linear power output warranty — end of 30-year ≥80% where published.",
    officialPath: "tkm7d72n-580-600",
    base: { vmpp: 44.4, impp: 13.51, voc: 53.0, isc: 14.25 },
  },
  {
    code: "TKM3D66N",
    family: "N-Type",
    wattMin: 605,
    wattMax: 625,
    peakWatt: 625,
    efficiency: 23.1,
    technology: "N-type Mono-Crystalline · 16 Busbar",
    cells: "132 pcs in series (6×22)",
    cellCount: "132",
    dimensions: "2382 × 1134 × 30 mm",
    weight: "33.7 kg",
    glass: "Dual glass / tempered (platform)",
    frames: "Anodized aluminum alloy",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    performanceNote:
      "Linear power output warranty — end of 30-year ≥80% where published.",
    officialPath: "tkm3d66n-605-625",
    base: { vmpp: 41.5, impp: 15.06, voc: 49.6, isc: 15.9 },
  },
  {
    code: "TKM7D78N",
    family: "N-Type",
    wattMin: 630,
    wattMax: 650,
    peakWatt: 650,
    efficiency: 23.3,
    technology: "N-type Mono-Crystalline · 16 Busbar",
    cells: "156 pcs in series (6×26)",
    cellCount: "156",
    dimensions: "2465 × 1134 × 30 mm",
    weight: "35 kg",
    glass: "Dual glass / tempered (platform)",
    frames: "Anodized aluminum alloy",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    performanceNote:
      "Linear power output warranty — end of 30-year ≥80% where published.",
    officialPath: "tkm7d78n-630-650",
    base: { vmpp: 45.8, impp: 14.19, voc: 54.6, isc: 14.95 },
  },
  {
    code: "TKM9D72B",
    family: "BC",
    wattMin: 630,
    wattMax: 665,
    peakWatt: 665,
    efficiency: 24.6,
    technology: "N-Type TBC (Back Contact) bifacial dual glass",
    cells: "144 (6 × 24)",
    cellCount: "144",
    dimensions: "2382 × 1134 × 30 mm",
    weight: "32.3 kg",
    glass: "2.0 mm coated front + 2.0 mm back semi-tempered glass",
    frames: "Anodized aluminum alloy",
    warrantyProduct: "15 years",
    warrantyPerformance: "30 years",
    performanceNote:
      "BC / TBC linear output warranty (confirm certificate with order).",
    officialPath: "tkm9d72b-630-665",
    base: { vmpp: 45.5, impp: 14.62, voc: 54.2, isc: 15.4 },
  },
  {
    code: "TKM8D66N",
    family: "N-Type",
    wattMin: 695,
    wattMax: 715,
    peakWatt: 715,
    efficiency: 23.0,
    technology: "N-type Mono-Crystalline · 18 Busbar",
    cells: "132 pcs in series (6×22)",
    cellCount: "132",
    dimensions: "2384 × 1303 × 30 mm",
    weight: "38.5 kg",
    glass: "Dual glass / tempered (platform)",
    frames: "Anodized aluminum alloy",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    performanceNote:
      "Linear power output warranty — end of 30-year ≥80% where published.",
    officialPath: "tkm8d66n-695-715",
    base: { vmpp: 44.2, impp: 16.18, voc: 52.8, isc: 17.05 },
  },
];

function formatPct(n: number) {
  return `${n.toFixed(2)}%`;
}

function formatV(n: number) {
  return `${n.toFixed(2)} V`;
}

function formatA(n: number) {
  return `${n.toFixed(2)} A`;
}

function rangeLabel(mod: OfficialModule) {
  return `${mod.wattMin}–${mod.wattMax}W`;
}

function techLabel(mod: OfficialModule): string {
  if (mod.family === "BC") return "N-Type TBC (Back Contact)";
  return "N-Type Mono-Crystalline";
}

function buildProduct(mod: OfficialModule): Product {
  const slug = `taekmo-${mod.code.toLowerCase()}`;
  return {
    id: mod.code.toLowerCase(),
    slug,
    name: `TAEKMO ${mod.code}`,
    category: "solar-panels",
    categoryLabel: "Solar Panels",
    description: `TAEKMO ${mod.code} · ${rangeLabel(mod)} · ${mod.technology}`,
    wattLabel: `${mod.wattMin}–${mod.wattMax} W`,
    featureLine: `${mod.family} | ${mod.technology.split("·")[0].trim()} · up to ${formatPct(mod.efficiency)}`,
    priceLabel: "View Details",
    image: PANEL_IMAGE,
    imageAlt: `TAEKMO ${mod.code} ${rangeLabel(mod)} solar module`,
    href: `/products/${slug}`,
  };
}

function buildDetail(
  product: Product,
  mod: OfficialModule,
): ProductDetail {
  const techShort = techLabel(mod);
  const { vmpp, impp, voc, isc } = mod.base;

  return {
    ...product,
    isDemoContent: false,
    badges: [
      { label: "Solar Panel" },
      { label: "TAEKMO Official" },
      { label: "Talesun / C&D Group" },
      { label: techShort },
      { label: mod.family },
    ],
    gallery: [
      {
        id: "main",
        src: PANEL_IMAGE,
        alt: `${product.name} — front view`,
      },
      {
        id: "install",
        src: "/images/solutions/residential.jpg",
        alt: "Rooftop installation featuring solar modules",
      },
      {
        id: "array",
        src: "/images/solutions/commercial.jpg",
        alt: "Commercial solar array detail",
      },
      {
        id: "field",
        src: "/images/hero/solar-farm.jpg",
        alt: "Solar farm field with modules at scale",
      },
    ],
    quickSpecs: [
      {
        id: "pmax",
        label: "Power Range",
        value: `${mod.wattMin}–${mod.wattMax} W`,
        icon: "power",
      },
      {
        id: "efficiency",
        label: "Module Efficiency",
        value: `Up to ${formatPct(mod.efficiency)}`,
        icon: "efficiency",
      },
      {
        id: "cell",
        label: "Cell Type",
        value: techShort,
        icon: "cell",
      },
      {
        id: "dimensions",
        label: "Dimensions",
        value: mod.dimensions,
        icon: "dimensions",
      },
    ],
    overview: {
      heading: `TAEKMO ${mod.code} — ${rangeLabel(mod)}`,
      paragraphs: [
        `TAEKMO ${mod.code} is a high-reliability N-type module for international utility, C&I, and distributed projects. TAEKMO is the international sub-brand of Talesun Solar under C&D Group.`,
        `${mod.technology}. ${mod.cells}. Frame: ${mod.frames}.`,
        `Power range: ${mod.wattMin}–${mod.wattMax} W (peak class in electrical table: ${mod.peakWatt} W). Confirm final values with your TAEKMO quote / datasheet.`,
      ],
      image: "/images/solutions/commercial.jpg",
      imageAlt: "Commercial solar installation with high-watt modules",
    },
    highlights: [
      {
        id: "official",
        title: "TAEKMO module series",
        description:
          "Built for international markets with Talesun / C&D Group manufacturing strength.",
        icon: "warranty",
      },
      {
        id: "eff",
        title: `Up to ${formatPct(mod.efficiency)}`,
        description: `Peak published module efficiency for ${mod.code}.`,
        icon: "efficiency",
      },
      {
        id: "tech",
        title: techShort,
        description: mod.technology,
        icon: "generic",
      },
      {
        id: "warranty",
        title: `${mod.warrantyPerformance} linear warranty`,
        description: `Product warranty ${mod.warrantyProduct}; linear output ${mod.warrantyPerformance}.`,
        icon: "warranty",
      },
    ],
    specifications: [
      { label: "Brand", value: "TAEKMO (Talesun Solar / C&D Group)" },
      { label: "Model Code", value: mod.code },
      { label: "Power Range", value: `${mod.wattMin}–${mod.wattMax} W` },
      { label: "Peak Class (table)", value: `${mod.peakWatt} W` },
      { label: "Family", value: mod.family },
      { label: "Module Efficiency", value: `Up to ${formatPct(mod.efficiency)}` },
      { label: "Cell Technology", value: mod.technology },
      { label: "Number of Cells", value: mod.cellCount },
      { label: "Cell Layout", value: mod.cells },
      { label: "Operating Voltage (Vmpp)", value: formatV(vmpp) },
      { label: "Operating Current (Impp)", value: formatA(impp) },
      { label: "Open-Circuit Voltage (Voc)", value: formatV(voc) },
      { label: "Short-Circuit Current (Isc)", value: formatA(isc) },
      { label: "Dimensions", value: mod.dimensions },
      { label: "Weight", value: mod.weight },
      { label: "Glass", value: mod.glass },
      { label: "Frame", value: mod.frames },
      { label: "Junction Box", value: "IP68, 3 bypass diodes" },
      { label: "Connectors", value: "MC4 Compatible / MC4 Original" },
      { label: "Maximum System Voltage", value: "DC 1500 V" },
      { label: "Operating Temperature", value: "−40°C to +85°C" },
      {
        label: "Reference",
        value: `https://taekmo-official.com/products/${mod.officialPath}`,
      },
    ],
    warranty: [
      {
        id: "product",
        title: "Product Warranty",
        duration: mod.warrantyProduct,
        description: `Materials and workmanship coverage for TAEKMO ${mod.code}.`,
      },
      {
        id: "performance",
        title: "Linear Performance Warranty",
        duration: mod.warrantyPerformance,
        description: mod.performanceNote,
      },
    ],
    documents: [
      {
        id: "datasheet",
        title: "Product Datasheet",
        fileName: `TAEKMO-${mod.code}-Datasheet.pdf`,
        type: "datasheet",
        available: false,
      },
      {
        id: "manual",
        title: "Installation Manual",
        fileName: `TAEKMO-${mod.code}-Installation-Manual.pdf`,
        type: "manual",
        available: false,
      },
      {
        id: "warranty-doc",
        title: "Warranty Document",
        fileName: `TAEKMO-${mod.code}-Warranty.pdf`,
        type: "warranty",
        available: false,
      },
    ],
    reviews: [],
  };
}

/** 6 separate models, already ordered low → high watt. */
export const products: Product[] = officialModules.map(buildProduct);

export const productDetails: ProductDetail[] = officialModules.map(
  (mod, i) => buildDetail(products[i], mod),
);

/** Home: first row only (4 cards), low → high. Rest on All Products. */
export const homeFeaturedProducts: Product[] = products.slice(0, 4);

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return productDetails.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return productDetails.map((p) => p.slug);
}

export function getCategoryPathLabel(
  category: Exclude<ProductCategory, "all">,
): string {
  return (
    productCategories.find((c) => c.id === category)?.label ?? "Products"
  );
}
