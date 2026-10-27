import type { Panel } from "@prisma/client";

export type VerifyStatus = "authentic" | "not_found";

export interface VerifyResult {
  status: "authentic";
  productName: string;
  model: string;
  barcode: string;
  serialNumber: string;
  productType: string;
  palletNo: string;
  category: string;
  categoryLabel: string;
  power: string;
  pmax: string;
  ff: string;
  voc: string;
  isc: string;
  vpm: string;
  ipm: string;
  image: string;
  imageAlt: string;
  productHref: string;
  note: string;
}

const PANEL_IMAGE = "/images/products/taekmo-solar-panel-white.jpg";

function formatNum(value: number | null | undefined, digits = 2): string {
  if (value == null || Number.isNaN(value)) return "—";
  return value.toFixed(digits);
}

function panelModel(panel: Panel): string {
  if (/^TKM/i.test(panel.serialNo)) return panel.serialNo;
  if (panel.productType && /^TKM/i.test(panel.productType)) return panel.productType;
  return panel.serialNo;
}

export function panelToVerifyResult(panel: Panel): VerifyResult {
  const model = panelModel(panel);
  const slug = `taekmo-${model.toLowerCase()}`;
  const power =
    panel.labelWatt != null
      ? `${panel.labelWatt}W`
      : `${formatNum(panel.pmax, 0)}W`;

  return {
    status: "authentic",
    productName: `TAEKMO ${model}`,
    model,
    barcode: panel.productNo,
    serialNumber: panel.productNo,
    productType: panel.productType ?? "—",
    palletNo: panel.palletNo ?? "—",
    category: "solar-panels",
    categoryLabel: "Solar Panel",
    power,
    pmax: panel.pmax != null ? `${formatNum(panel.pmax)} W` : "—",
    ff: formatNum(panel.ff, 2),
    voc: panel.voc != null ? `${formatNum(panel.voc)} V` : "—",
    isc: panel.isc != null ? `${formatNum(panel.isc)} A` : "—",
    vpm: panel.vpm != null ? `${formatNum(panel.vpm)} V` : "—",
    ipm: panel.ipm != null ? `${formatNum(panel.ipm)} A` : "—",
    image: PANEL_IMAGE,
    imageAlt: `TAEKMO ${model} solar panel module`,
    productHref: `/products/${slug}`,
    note: "This module is registered in the TAEKMO authenticity database.",
  };
}

/** Server-side lookup used by the result page. */
export async function lookupPanelByProductNo(
  code: string,
): Promise<VerifyResult | null> {
  const { prisma } = await import("@/lib/db");
  const normalized = code.trim().toUpperCase().replace(/\s+/g, "");
  if (!normalized || normalized.length < 6) return null;

  const panel = await prisma.panel.findUnique({
    where: { productNo: normalized },
  });

  return panel ? panelToVerifyResult(panel) : null;
}
