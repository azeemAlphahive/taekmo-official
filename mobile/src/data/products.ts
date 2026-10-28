export type Product = {
  id: string;
  slug: string;
  code: string;
  name: string;
  family: "BC" | "N-Type";
  category: "solar-panels";
  categoryLabel: string;
  wattMin: number;
  wattMax: number;
  peakWatt: number;
  wattLabel: string;
  efficiency: number;
  technology: string;
  description: string;
  featureLine: string;
  priceLabel: string;
  image: string;
  cells: string;
  cellCount: string;
  dimensions: string;
  weight: string;
  glass: string;
  frames: string;
  warrantyProduct: string;
  warrantyPerformance: string;
  performanceNote: string;
  specs: { label: string; value: string }[];
  overview: string[];
  highlights: { title: string; description: string }[];
};

const PANEL_IMAGE = "/images/products/taekmo-solar-panel-white.jpg";

type OfficialModule = {
  code: string;
  family: "BC" | "N-Type";
  wattMin: number;
  wattMax: number;
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
  base: { vmpp: number; impp: number; voc: number; isc: number };
};

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
    base: { vmpp: 44.2, impp: 16.18, voc: 52.8, isc: 17.05 },
  },
];

function formatPct(n: number) {
  return `${n.toFixed(2)}%`;
}

function techLabel(mod: OfficialModule) {
  if (mod.family === "BC") return "N-Type TBC (Back Contact)";
  return "N-Type Mono-Crystalline";
}

function buildProduct(mod: OfficialModule): Product {
  const slug = `taekmo-${mod.code.toLowerCase()}`;
  const wattLabel = `${mod.wattMin}–${mod.wattMax} W`;
  const techShort = techLabel(mod);
  const { vmpp, impp, voc, isc } = mod.base;

  return {
    id: mod.code.toLowerCase(),
    slug,
    code: mod.code,
    name: `TAEKMO ${mod.code}`,
    family: mod.family,
    category: "solar-panels",
    categoryLabel: "Solar Panels",
    wattMin: mod.wattMin,
    wattMax: mod.wattMax,
    peakWatt: mod.peakWatt,
    wattLabel,
    efficiency: mod.efficiency,
    technology: mod.technology,
    description: `TAEKMO ${mod.code} · ${mod.wattMin}–${mod.wattMax}W · ${mod.technology}`,
    featureLine: `${mod.family} | ${mod.technology.split("·")[0].trim()} · up to ${formatPct(mod.efficiency)}`,
    priceLabel: "View Details",
    image: PANEL_IMAGE,
    cells: mod.cells,
    cellCount: mod.cellCount,
    dimensions: mod.dimensions,
    weight: mod.weight,
    glass: mod.glass,
    frames: mod.frames,
    warrantyProduct: mod.warrantyProduct,
    warrantyPerformance: mod.warrantyPerformance,
    performanceNote: mod.performanceNote,
    overview: [
      `TAEKMO ${mod.code} is a high-reliability N-type module for international utility, C&I, and distributed projects. TAEKMO is the international sub-brand of Talesun Solar under C&D Group.`,
      `${mod.technology}. ${mod.cells}. Frame: ${mod.frames}.`,
      `Power range: ${mod.wattMin}–${mod.wattMax} W (peak class: ${mod.peakWatt} W). Confirm final values with your TAEKMO quote / datasheet.`,
    ],
    highlights: [
      {
        title: "TAEKMO module series",
        description:
          "Built for international markets with Talesun / C&D Group manufacturing strength.",
      },
      {
        title: `Up to ${formatPct(mod.efficiency)}`,
        description: `Peak published module efficiency for ${mod.code}.`,
      },
      {
        title: techShort,
        description: mod.technology,
      },
      {
        title: `${mod.warrantyPerformance} linear warranty`,
        description: `Product warranty ${mod.warrantyProduct}; linear output ${mod.warrantyPerformance}.`,
      },
    ],
    specs: [
      { label: "Brand", value: "TAEKMO (Talesun Solar / C&D Group)" },
      { label: "Model Code", value: mod.code },
      { label: "Power Range", value: wattLabel },
      { label: "Peak Class", value: `${mod.peakWatt} W` },
      { label: "Family", value: mod.family },
      { label: "Module Efficiency", value: `Up to ${formatPct(mod.efficiency)}` },
      { label: "Cell Technology", value: mod.technology },
      { label: "Number of Cells", value: mod.cellCount },
      { label: "Cell Layout", value: mod.cells },
      { label: "Operating Voltage (Vmpp)", value: `${vmpp.toFixed(2)} V` },
      { label: "Operating Current (Impp)", value: `${impp.toFixed(2)} A` },
      { label: "Open-Circuit Voltage (Voc)", value: `${voc.toFixed(2)} V` },
      { label: "Short-Circuit Current (Isc)", value: `${isc.toFixed(2)} A` },
      { label: "Dimensions", value: mod.dimensions },
      { label: "Weight", value: mod.weight },
      { label: "Glass", value: mod.glass },
      { label: "Frame", value: mod.frames },
      { label: "Junction Box", value: "IP68, 3 bypass diodes" },
      { label: "Connectors", value: "MC4 Compatible / MC4 Original" },
      { label: "Maximum System Voltage", value: "DC 1500 V" },
      { label: "Operating Temperature", value: "−40°C to +85°C" },
      {
        label: "Warranty",
        value: `${mod.warrantyProduct} product · ${mod.warrantyPerformance} linear`,
      },
    ],
  };
}

export const products: Product[] = officialModules.map(buildProduct);

export const featuredProducts = products.slice(0, 4);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
