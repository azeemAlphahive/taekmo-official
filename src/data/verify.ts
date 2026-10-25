export interface VerifyResult {
  status: "authentic";
  productName: string;
  model: string;
  barcode: string;
  serialNumber: string;
  category: string;
  categoryLabel: string;
  manufactureDate: string;
  shipDate: string;
  warrantyStatus: string;
  origin: string;
  power: string;
  efficiency: string;
  cellType: string;
  image: string;
  imageAlt: string;
  productHref: string;
  note: string;
}

const PANEL_IMAGE = "/images/products/taekmo-solar-panel-white.jpg";

const defaultPanel: Omit<
  VerifyResult,
  "barcode" | "serialNumber" | "status" | "note"
> = {
  productName: "TAEKMO BIPRO TM3G66M",
  model: "TM3G66M-650",
  category: "solar-panels",
  categoryLabel: "Solar Panel",
  manufactureDate: "2024-08-14",
  shipDate: "2024-09-02",
  warrantyStatus: "Active (illustrative)",
  origin: "TAEKMO authorised channel · Talesun / TAEKMO",
  power: "650W",
  efficiency: "24.06%",
  cellType: "N-Type TOPCon Bifacial",
  image: PANEL_IMAGE,
  imageAlt: "TAEKMO BIPRO TM3G66M solar panel module",
  productHref: "/products/taekmo-bipro-tm3g66m-650",
};

export function buildVerifyResult(barcode: string): VerifyResult {
  const trimmed = barcode.trim();
  const wattMatch = trimmed.match(/(\d{3})\s*w?/i);
  const watt = wattMatch ? wattMatch[1] : "650";
  const seriesMatch = trimmed.match(/(tm|th)\w+/i);
  const series = seriesMatch
    ? seriesMatch[0].toUpperCase()
    : "TM3G66M";
  const family = series.startsWith("TH") ? "HYPRO" : "BIPRO";
  const slug = `taekmo-${family.toLowerCase()}-${series.toLowerCase()}-${watt}`;

  return {
    status: "authentic",
    ...defaultPanel,
    productName: `TAEKMO ${family} ${series}`,
    model: `${series}-${watt}`,
    power: `${watt}W`,
    productHref: `/products/${slug}`,
    imageAlt: `TAEKMO ${family} ${series} solar panel module`,
    barcode: trimmed,
    serialNumber: `TM-${trimmed.slice(-4).toUpperCase().padEnd(4, "0")}-${trimmed.replace(/\W/g, "").slice(0, 8).toUpperCase() || "DEMO0001"}`,
    note: "Dummy demo result for UI testing — not a real authenticity confirmation.",
  };
}
