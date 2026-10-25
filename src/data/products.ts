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
 * Talesun / TAEKMO panel catalogue sourced from Talesun official datasheets
 * (BC Back Contact + BIPRO TOPCon + HYPRO HJT, BloombergNEF Tier 1).
 * Watt steps follow published series ranges (typically 5 W bins).
 */
type PanelFamily = "BC" | "BIPRO" | "HYPRO";

type PanelSeries = {
  code: string;
  family: PanelFamily;
  technology: string;
  cells: string;
  cellCount: string;
  dimensions: string;
  weight: string;
  glass: string;
  frames: string;
  warrantyProduct: string;
  warrantyPerformance: string;
  watts: number[];
  /** Approximate STC efficiency at min → max watt (linear interpolate). */
  efficiencyMin: number;
  efficiencyMax: number;
  /** Approximate Vmpp / Impp / Voc / Isc at min watt; scale lightly with watt. */
  base: {
    vmpp: number;
    impp: number;
    voc: number;
    isc: number;
  };
};

const panelSeries: PanelSeries[] = [
  // —— BC (Back Contact) — high-demand / best-selling platform ——
  {
    code: "TM9C54M",
    family: "BC",
    technology: "N-type Back Contact (BC) monofacial · high-efficiency cells",
    cells: "108 half-cut (BC 182)",
    cellCount: "108",
    dimensions: "1762 × 1134 × 30 mm",
    weight: "21.5 kg",
    glass: "3.2 mm tempered front glass",
    frames: "Full black · Silver",
    warrantyProduct: "25 years",
    warrantyPerformance: "30 years",
    watts: [475, 480, 485, 490, 495],
    efficiencyMin: 23.5,
    efficiencyMax: 24.5,
    base: { vmpp: 34.8, impp: 13.65, voc: 41.6, isc: 14.35 },
  },
  {
    code: "TN9C54M",
    family: "BC",
    technology: "N-type Back Contact (BC) bifacial dual glass · high-efficiency cells",
    cells: "108 half-cut (BC 182)",
    cellCount: "108",
    dimensions: "1762 × 1134 × 30 mm",
    weight: "24.0 kg",
    glass: "2.0 mm dual glass",
    frames: "Full black · Transparent · Silver",
    warrantyProduct: "25 years",
    warrantyPerformance: "30 years",
    watts: [475, 480, 485, 490, 495],
    efficiencyMin: 23.4,
    efficiencyMax: 24.4,
    base: { vmpp: 34.6, impp: 13.73, voc: 41.4, isc: 14.42 },
  },
  {
    code: "TM9C72M",
    family: "BC",
    technology: "N-type Back Contact (BC) monofacial · high-efficiency cells",
    cells: "144 half-cut (BC 182)",
    cellCount: "144",
    dimensions: "2278 × 1134 × 30 mm",
    weight: "27.5 kg",
    glass: "3.2 mm tempered front glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "15 years",
    warrantyPerformance: "30 years",
    watts: [645, 650, 655, 660, 665],
    efficiencyMin: 23.6,
    efficiencyMax: 24.5,
    base: { vmpp: 44.9, impp: 14.37, voc: 53.6, isc: 15.1 },
  },
  {
    code: "TN9C72M",
    family: "BC",
    technology: "N-type Back Contact (BC) bifacial dual glass · high-efficiency cells",
    cells: "144 half-cut (BC 182)",
    cellCount: "144",
    dimensions: "2278 × 1134 × 30 mm",
    weight: "31.0 kg",
    glass: "2.0 mm dual glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "15 years",
    warrantyPerformance: "30 years",
    watts: [645, 650, 655, 660, 665],
    efficiencyMin: 23.5,
    efficiencyMax: 24.4,
    base: { vmpp: 44.7, impp: 14.43, voc: 53.4, isc: 15.18 },
  },
  // —— BIPRO (TOPCon) ——
  {
    code: "TM3G48M",
    family: "BIPRO",
    technology: "N-type TOPCon bifacial dual glass · 16BB half-cut",
    cells: "96 half-cut (TOPCon 210R)",
    cellCount: "96",
    dimensions: "1762 × 1134 × 30 mm",
    weight: "24.5 kg",
    glass: "2.0 mm dual glass",
    frames: "Full black · Transparent · Silver",
    warrantyProduct: "15 years",
    warrantyPerformance: "30 years",
    watts: [435, 440, 445, 450, 455],
    efficiencyMin: 21.8,
    efficiencyMax: 22.8,
    base: { vmpp: 29.22, impp: 14.89, voc: 34.98, isc: 15.76 },
  },
  {
    code: "TM7G54M",
    family: "BIPRO",
    technology: "N-type TOPCon bifacial dual glass · 16BB half-cut",
    cells: "108 half-cut (TOPCon 182)",
    cellCount: "108",
    dimensions: "1722 × 1134 × 30 mm",
    weight: "24.0 kg",
    glass: "2.0 mm dual glass",
    frames: "Full black · Transparent · Silver",
    warrantyProduct: "25 years",
    warrantyPerformance: "30 years",
    watts: [435, 440, 445, 450, 455],
    efficiencyMin: 22.0,
    efficiencyMax: 23.0,
    base: { vmpp: 32.81, impp: 13.26, voc: 39.15, isc: 13.72 },
  },
  {
    code: "TM3G54M",
    family: "BIPRO",
    technology: "N-type TOPCon bifacial dual glass · 16BB half-cut",
    cells: "108 half-cut (TOPCon 210R)",
    cellCount: "108",
    dimensions: "1961 × 1134 × 30 mm",
    weight: "27.5 kg",
    glass: "2.0 mm dual glass",
    frames: "Full black · Transparent · Silver",
    warrantyProduct: "15 years",
    warrantyPerformance: "30 years",
    watts: [490, 495, 500, 505, 510, 515, 520],
    efficiencyMin: 22.26,
    efficiencyMax: 23.38,
    base: { vmpp: 33.14, impp: 14.94, voc: 39.85, isc: 15.83 },
  },
  {
    code: "TM7G60M",
    family: "BIPRO",
    technology: "N-type TOPCon bifacial dual glass · 16BB half-cut",
    cells: "120 half-cut (TOPCon 182)",
    cellCount: "120",
    dimensions: "1903 × 1134 × 30 mm",
    weight: "26.5 kg",
    glass: "2.0 mm dual glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    watts: [485, 490, 495, 500, 505],
    efficiencyMin: 22.4,
    efficiencyMax: 23.3,
    base: { vmpp: 36.4, impp: 13.35, voc: 43.5, isc: 14.0 },
  },
  {
    code: "TM7G72M",
    family: "BIPRO",
    technology: "N-type TOPCon bifacial dual glass · 16BB half-cut",
    cells: "144 half-cut (TOPCon 182)",
    cellCount: "144",
    dimensions: "2278 × 1134 × 30 mm",
    weight: "31.5 kg",
    glass: "2.0 mm dual glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    watts: [585, 590, 595, 600, 605],
    efficiencyMin: 22.6,
    efficiencyMax: 23.4,
    base: { vmpp: 44.22, impp: 13.23, voc: 52.17, isc: 13.89 },
  },
  {
    code: "TM3G66M",
    family: "BIPRO",
    technology: "N-type TOPCon bifacial dual glass · 16BB half-cut",
    cells: "132 half-cut (TOPCon 210R)",
    cellCount: "132",
    dimensions: "2382 × 1134 × 30 mm",
    weight: "33.7 kg",
    glass: "2.0 mm dual glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    watts: [620, 625, 630, 635, 640, 645, 650],
    efficiencyMin: 22.95,
    efficiencyMax: 24.06,
    base: { vmpp: 41.2, impp: 15.05, voc: 49.6, isc: 15.94 },
  },
  {
    code: "TM7G78M",
    family: "BIPRO",
    technology: "N-type TOPCon bifacial dual glass · 16BB half-cut",
    cells: "156 half-cut (TOPCon 182)",
    cellCount: "156",
    dimensions: "2465 × 1134 × 35 mm",
    weight: "35.0 kg",
    glass: "2.0 mm dual glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    watts: [640, 645, 650, 655, 660],
    efficiencyMin: 22.9,
    efficiencyMax: 23.6,
    base: { vmpp: 45.5, impp: 14.07, voc: 54.2, isc: 14.7 },
  },
  {
    code: "TM8G60M",
    family: "BIPRO",
    technology: "N-type TOPCon bifacial dual glass · 18BB half-cut",
    cells: "120 half-cut (TOPCon 210)",
    cellCount: "120",
    dimensions: "2172 × 1303 × 33 mm",
    weight: "34.5 kg",
    glass: "2.0 mm dual glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    watts: [640, 645, 650, 655, 660],
    efficiencyMin: 22.8,
    efficiencyMax: 23.5,
    base: { vmpp: 41.8, impp: 15.31, voc: 49.9, isc: 16.1 },
  },
  {
    code: "TM8G66M",
    family: "BIPRO",
    technology: "N-type TOPCon bifacial dual glass · 18BB half-cut",
    cells: "132 half-cut (TOPCon 210)",
    cellCount: "132",
    dimensions: "2384 × 1303 × 33 mm",
    weight: "38.0 kg",
    glass: "2.0 mm dual glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "12 years",
    warrantyPerformance: "30 years",
    watts: [705, 710, 715, 720, 725],
    efficiencyMin: 22.7,
    efficiencyMax: 23.4,
    base: { vmpp: 44.2, impp: 15.95, voc: 52.8, isc: 16.7 },
  },
  {
    code: "TH3G48M",
    family: "HYPRO",
    technology: "N-type HJT bifacial dual glass · 0BB half-cut",
    cells: "96 half-cut (HJT)",
    cellCount: "96",
    dimensions: "1762 × 1134 × 30 mm",
    weight: "24.0 kg",
    glass: "2.0 mm dual glass",
    frames: "Full black · Transparent · Silver",
    warrantyProduct: "15 years",
    warrantyPerformance: "30 years",
    watts: [435, 440, 445, 450, 455, 460],
    efficiencyMin: 21.9,
    efficiencyMax: 23.1,
    base: { vmpp: 29.5, impp: 14.75, voc: 35.2, isc: 15.5 },
  },
  {
    code: "TH3G66M",
    family: "HYPRO",
    technology: "N-type HJT bifacial dual glass · 0BB half-cut",
    cells: "132 half-cut (HJT)",
    cellCount: "132",
    dimensions: "2382 × 1134 × 30 mm",
    weight: "32.6 kg",
    glass: "2.0 mm dual glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "15 years",
    warrantyPerformance: "30 years",
    watts: [600, 605, 610, 615, 620, 625, 630, 635],
    efficiencyMin: 22.2,
    efficiencyMax: 23.5,
    base: { vmpp: 40.69, impp: 14.76, voc: 48.75, isc: 15.56 },
  },
  {
    code: "TH8G66M",
    family: "HYPRO",
    technology: "N-type HJT bifacial dual glass · 0BB half-cut",
    cells: "132 half-cut (HJT 210)",
    cellCount: "132",
    dimensions: "2384 × 1303 × 33 mm",
    weight: "37.5 kg",
    glass: "2.0 mm dual glass",
    frames: "Anodised aluminium · Black · Silver",
    warrantyProduct: "15 years",
    warrantyPerformance: "30 years",
    watts: [700, 705, 710, 715, 720, 725, 730, 735],
    efficiencyMin: 22.5,
    efficiencyMax: 23.7,
    base: { vmpp: 43.8, impp: 15.98, voc: 52.4, isc: 16.8 },
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function formatPct(n: number) {
  return `${n.toFixed(2)}%`;
}

function formatV(n: number) {
  return `${n.toFixed(2)} V`;
}

function formatA(n: number) {
  return `${n.toFixed(2)} A`;
}

type PanelModel = {
  series: PanelSeries;
  watt: number;
  efficiency: number;
  vmpp: number;
  impp: number;
  voc: number;
  isc: number;
};

function expandModels(): PanelModel[] {
  const models: PanelModel[] = [];
  for (const series of panelSeries) {
    const minW = series.watts[0];
    const maxW = series.watts[series.watts.length - 1];
    for (const watt of series.watts) {
      const t = maxW === minW ? 1 : (watt - minW) / (maxW - minW);
      const efficiency = lerp(series.efficiencyMin, series.efficiencyMax, t);
      const scale = watt / minW;
      models.push({
        series,
        watt,
        efficiency,
        vmpp: series.base.vmpp * (1 + t * 0.04),
        impp: series.base.impp * scale * 0.98,
        voc: series.base.voc * (1 + t * 0.035),
        isc: series.base.isc * scale * 0.99,
      });
    }
  }
  // BC first (best-selling), then higher watt classes
  const familyRank: Record<PanelFamily, number> = { BC: 0, HYPRO: 1, BIPRO: 2 };
  return models.sort(
    (a, b) =>
      familyRank[a.series.family] - familyRank[b.series.family] ||
      b.watt - a.watt ||
      a.series.code.localeCompare(b.series.code),
  );
}

const allModels = expandModels();

function buildProduct(model: PanelModel): Product {
  const { series, watt, efficiency } = model;
  const slug = `taekmo-${series.family.toLowerCase()}-${series.code.toLowerCase()}-${watt}`;
  return {
    id: `${series.code.toLowerCase()}-${watt}`,
    slug,
    name: `TAEKMO ${series.family} ${series.code}`,
    category: "solar-panels",
    categoryLabel: "Solar Panels",
    description: `Talesun ${series.family} · BloombergNEF Tier 1 · ${series.technology}`,
    wattLabel: `${watt}W`,
    featureLine: `${series.family} | ${series.technology.split("·")[0].trim()} · ${formatPct(efficiency)}`,
    priceLabel: "View Details",
    image: PANEL_IMAGE,
    imageAlt: `TAEKMO ${series.family} ${series.code}-${watt}W solar panel`,
    href: `/products/${slug}`,
  };
}

function techLabel(series: PanelSeries): string {
  if (series.family === "HYPRO") return "HJT Bifacial";
  if (series.family === "BC") {
    return series.technology.toLowerCase().includes("bifacial")
      ? "BC Bifacial"
      : "Back Contact (BC)";
  }
  return "TOPCon Bifacial";
}

function buildDetail(product: Product, model: PanelModel): ProductDetail {
  const { series, watt, efficiency, vmpp, impp, voc, isc } = model;
  const techShort = techLabel(series);

  return {
    ...product,
    isDemoContent: false,
    badges: [
      { label: "Solar Panel" },
      { label: "BloombergNEF Tier 1" },
      { label: "Talesun / TAEKMO" },
      { label: techShort },
      { label: series.family },
    ],
    gallery: [
      {
        id: "main",
        src: PANEL_IMAGE,
        alt: `${product.name} ${watt}W — front view`,
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
        label: "Maximum Power (Pmax)",
        value: `${watt} W`,
        icon: "power",
      },
      {
        id: "efficiency",
        label: "Module Efficiency",
        value: formatPct(efficiency),
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
        value: series.dimensions,
        icon: "dimensions",
      },
    ],
    overview: {
      heading: `${product.name}-${watt}W — Talesun Tier 1 ${series.family}`,
      paragraphs: [
        `TAEKMO supplies this module on the Talesun ${series.family} ${series.code} platform. Talesun is listed on the BloombergNEF (BNEF) Tier 1 PV module manufacturer list — a bankability reference for project finance.`,
        `${series.technology}. ${series.cells} configuration. Frame options: ${series.frames}.`,
        `Series power range on this platform: ${series.watts[0]}–${series.watts[series.watts.length - 1]} W. Confirm final electrical values from the official Talesun datasheet with your TAEKMO quote.`,
      ],
      image: "/images/solutions/commercial.jpg",
      imageAlt: "Commercial solar installation with high-watt modules",
    },
    highlights: [
      {
        id: "tier1",
        title: "BloombergNEF Tier 1",
        description:
          "Talesun OEM platform on the BNEF Tier 1 module manufacturer list.",
        icon: "warranty",
      },
      {
        id: "eff",
        title: `${formatPct(efficiency)} Efficiency`,
        description: `STC module efficiency for the ${watt} W rating on ${series.code}.`,
        icon: "efficiency",
      },
      {
        id: "tech",
        title: techShort,
        description: series.technology,
        icon: "generic",
      },
      {
        id: "frames",
        title: "Frame Options",
        description: series.frames,
        icon: "generic",
      },
    ],
    specifications: [
      { label: "Brand", value: "TAEKMO (Talesun / TAEKMO)" },
      { label: "Series Family", value: `Talesun ${series.family}` },
      { label: "Model Code", value: `${series.code}-${watt}` },
      { label: "Tier Rating", value: "BloombergNEF (BNEF) Tier 1 manufacturer" },
      { label: "Rated Power (Pmax)", value: `${watt} W` },
      { label: "Module Efficiency", value: formatPct(efficiency) },
      { label: "Cell Technology", value: series.technology },
      { label: "Number of Cells", value: series.cellCount },
      { label: "Cell Layout", value: series.cells },
      { label: "Operating Voltage (Vmpp)", value: formatV(vmpp) },
      { label: "Operating Current (Impp)", value: formatA(impp) },
      { label: "Open-Circuit Voltage (Voc)", value: formatV(voc) },
      { label: "Short-Circuit Current (Isc)", value: formatA(isc) },
      { label: "Dimensions", value: series.dimensions },
      { label: "Weight", value: series.weight },
      { label: "Glass", value: series.glass },
      { label: "Frame Options", value: series.frames },
      { label: "Junction Box", value: "IP68, bypass diodes" },
      { label: "Connectors", value: "MC4 / MC4-EVO2 compatible" },
      { label: "Maximum System Voltage", value: "1500 V DC" },
      { label: "Operating Temperature", value: "−40°C to +85°C" },
      {
        label: "Certifications (platform)",
        value: "IEC 61215 / IEC 61730 / UL 61730",
      },
      {
        label: "Source",
        value:
          series.family === "BC"
            ? "Talesun official BC module datasheet / warranty ranges"
            : "Talesun official BIPRO / HYPRO datasheet ranges",
      },
    ],
    warranty: [
      {
        id: "product",
        title: "Product Warranty",
        duration: series.warrantyProduct,
        description: `Materials and workmanship coverage aligned to Talesun ${series.family} ${series.code}.`,
      },
      {
        id: "performance",
        title: "Linear Performance Warranty",
        duration: series.warrantyPerformance,
        description:
          series.family === "BC"
            ? "BC platform: ≤1% first-year, then ≤0.35%/yr — ≥88.85% by year 30 (confirm certificate with order)."
            : "Linear power output warranty on the Talesun platform (confirm certificate with order).",
      },
    ],
    documents: [
      {
        id: "datasheet",
        title: "Product Datasheet",
        fileName: `TAEKMO-${series.family}-${series.code}-${watt}-Datasheet.pdf`,
        type: "datasheet",
        available: false,
      },
      {
        id: "manual",
        title: "Installation Manual",
        fileName: `TAEKMO-${series.family}-${series.code}-Installation-Manual.pdf`,
        type: "manual",
        available: false,
      },
      {
        id: "warranty-doc",
        title: "Warranty Document",
        fileName: `TAEKMO-${series.family}-${series.code}-Warranty.pdf`,
        type: "warranty",
        available: false,
      },
    ],
    reviews: [],
  };
}

/** Full TAEKMO / Talesun solar panel catalogue (BC + BIPRO + HYPRO). */
export const products: Product[] = allModels.map(buildProduct);

export const productDetails: ProductDetail[] = allModels.map((model, i) =>
  buildDetail(products[i], model),
);

/** Home page: one card per BC bestseller series (max watt in range). */
export const HOME_BC_SERIES = [
  "TM9C54M",
  "TN9C54M",
  "TM9C72M",
  "TN9C72M",
] as const;

export const homeFeaturedProducts: Product[] = HOME_BC_SERIES.map((code) => {
  const matches = products.filter((p) =>
    p.id.startsWith(`${code.toLowerCase()}-`),
  );
  return matches[0]; // catalogue sorted watt-desc within BC family
}).filter(Boolean);

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
