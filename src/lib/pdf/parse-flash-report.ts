/**
 * Parses TAEKMO / Talesun Flash Testing Report PDFs.
 *
 * Both reports use the same columns:
 *   Product Type | Serial No. | Product No. | Pallet No. | Label | Pmax | FF | Voc | Isc | Vpm | Ipm
 *
 * Values are read by header x-position (not raw text order), because some PDFs
 * emit cell text out of order even when the on-page columns are identical.
 */

export interface FlashPanelRow {
  productType: string;
  serialNo: string;
  productNo: string;
  palletNo: string;
  labelWatt: number;
  pmax: number;
  ff: number;
  voc: number;
  isc: number;
  vpm: number;
  ipm: number;
}

type TextItem = { str: string; x: number; y: number };

const HEADER_KEYS = [
  "productType",
  "serialNo",
  "productNo",
  "palletNo",
  "label",
  "pmax",
  "ff",
  "voc",
  "isc",
  "vpm",
  "ipm",
] as const;

type HeaderKey = (typeof HEADER_KEYS)[number];

const HEADER_LABEL: Record<HeaderKey, RegExp> = {
  productType: /^product\s*type$/i,
  serialNo: /^serial\s*no\.?$/i,
  productNo: /^product\s*no\.?$/i,
  palletNo: /^pallet\s*no\.?$/i,
  label: /^label$/i,
  pmax: /^pmax$/i,
  ff: /^ff$/i,
  voc: /^voc$/i,
  isc: /^isc$/i,
  vpm: /^vpm$/i,
  ipm: /^ipm$/i,
};

function roundY(y: number): number {
  return Math.round(y);
}

function itemsFromContent(content: unknown): TextItem[] {
  const items =
    content &&
    typeof content === "object" &&
    "items" in content &&
    Array.isArray((content as { items: unknown }).items)
      ? ((content as { items: unknown[] }).items)
      : [];

  const out: TextItem[] = [];
  for (const raw of items) {
    if (!raw || typeof raw !== "object") continue;
    const it = raw as { str?: unknown; transform?: unknown };
    if (typeof it.str !== "string" || !it.str.trim()) continue;
    const t = Array.isArray(it.transform)
      ? (it.transform as number[])
      : [1, 0, 0, 1, 0, 0];
    out.push({
      str: it.str.trim(),
      x: t[4] ?? 0,
      y: t[5] ?? 0,
    });
  }
  return out;
}

function findHeaderCenters(items: TextItem[]): Partial<Record<HeaderKey, number>> | null {
  const byY = new Map<number, TextItem[]>();
  for (const it of items) {
    const y = roundY(it.y);
    if (!byY.has(y)) byY.set(y, []);
    byY.get(y)!.push(it);
  }

  for (const y of [...byY.keys()].sort((a, b) => b - a)) {
    const row = byY.get(y)!.slice().sort((a, b) => a.x - b.x);
    const centers: Partial<Record<HeaderKey, number>> = {};
    for (const cell of row) {
      for (const key of HEADER_KEYS) {
        if (HEADER_LABEL[key].test(cell.str)) {
          centers[key] = cell.x;
        }
      }
    }
    if (
      centers.productType != null &&
      centers.serialNo != null &&
      centers.productNo != null &&
      centers.palletNo != null &&
      centers.label != null &&
      centers.pmax != null
    ) {
      return centers;
    }
  }
  return null;
}

function nearestKey(
  x: number,
  centers: Partial<Record<HeaderKey, number>>,
): HeaderKey | null {
  let best: HeaderKey | null = null;
  let bestDist = Infinity;
  for (const key of HEADER_KEYS) {
    const cx = centers[key];
    if (cx == null) continue;
    const d = Math.abs(x - cx);
    if (d < bestDist) {
      bestDist = d;
      best = key;
    }
  }
  // Ignore far-right trailing ids that aren't under a known header.
  if (best == null || bestDist > 45) return null;
  return best;
}

function rowFromCells(
  cells: Partial<Record<HeaderKey, string>>,
): FlashPanelRow | null {
  const productType = cells.productType?.trim();
  const serialNo = cells.serialNo?.trim();
  const productNo = cells.productNo?.trim();
  const palletNo = cells.palletNo?.trim();
  if (!productType || !serialNo || !productNo || !palletNo) return null;
  if (!/TKM/i.test(productType) && !/TKM/i.test(serialNo)) return null;

  const labelWatt = Number(cells.label);
  const pmax = Number(cells.pmax);
  const ff = Number(cells.ff);
  const voc = Number(cells.voc);
  const isc = Number(cells.isc);
  const vpm = Number(cells.vpm);
  const ipm = Number(cells.ipm);
  if (
    ![labelWatt, pmax, ff, voc, isc, vpm, ipm].every((n) => Number.isFinite(n))
  ) {
    return null;
  }

  return {
    productType: productType.toUpperCase(),
    serialNo: serialNo.toUpperCase(),
    productNo: productNo.toUpperCase(),
    palletNo: palletNo.toUpperCase(),
    labelWatt,
    pmax,
    ff,
    voc,
    isc,
    vpm,
    ipm,
  };
}

function parsePageItems(
  items: TextItem[],
  centers: Partial<Record<HeaderKey, number>>,
  seen: Set<string>,
  rows: FlashPanelRow[],
) {
  const byY = new Map<number, TextItem[]>();
  for (const it of items) {
    const y = roundY(it.y);
    if (!byY.has(y)) byY.set(y, []);
    byY.get(y)!.push(it);
  }

  // Merge nearly-adjacent y bands (some rows split by a fraction of a point).
  const ys = [...byY.keys()].sort((a, b) => b - a);
  const bands: number[][] = [];
  for (const y of ys) {
    const last = bands[bands.length - 1];
    if (last && Math.abs(last[0] - y) <= 2) last.push(y);
    else bands.push([y]);
  }

  for (const band of bands) {
    const cells: Partial<Record<HeaderKey, string>> = {};
    const bandItems = band
      .flatMap((y) => byY.get(y) ?? [])
      .sort((a, b) => a.x - b.x);

    for (const it of bandItems) {
      const key = nearestKey(it.x, centers);
      if (!key) continue;
      // Keep first value for a column in this band.
      if (!cells[key]) cells[key] = it.str;
    }

    const row = rowFromCells(cells);
    if (!row) continue;
    if (seen.has(row.productNo)) continue;
    seen.add(row.productNo);
    rows.push(row);
  }
}

/** Fallback when position parse fails: same columns, token shape (order-independent). */
export function parseFlashReportText(text: string): FlashPanelRow[] {
  const lines = text.split(/\r?\n/);
  const rows: FlashPanelRow[] = [];
  const seen = new Set<string>();

  for (const raw of lines) {
    const tokens = raw.trim().replace(/\s+/g, " ").split(" ").filter(Boolean);
    if (tokens.length < 11) continue;
    if (/product\s+type/i.test(raw) && /serial/i.test(raw)) continue;

    const serialIdx = tokens.findIndex((t) => /^TKM[A-Z0-9]+$/i.test(t));
    const productNoIdx = tokens.findIndex(
      (t) =>
        /^[A-Z0-9]{12,32}$/i.test(t) &&
        !/^TKM/i.test(t) &&
        !/^F\d{6,}$/i.test(t),
    );
    const palletIdx = tokens.findIndex((t) => /^F\d{6,}$/i.test(t));
    if (serialIdx < 0 || productNoIdx < 0 || palletIdx < 0) continue;

    const typeIdx = tokens.findIndex(
      (t, i) =>
        i !== serialIdx &&
        i !== productNoIdx &&
        i !== palletIdx &&
        /^[A-Z0-9][A-Z0-9._-]{2,}$/i.test(t) &&
        !/^\d+(\.\d+)?$/.test(t),
    );
    if (typeIdx < 0) continue;

    const flash = tokens.slice(palletIdx + 1);
    if (flash.length < 7) continue;
    const nums = flash.slice(0, 7).map(Number);
    if (!nums.every((n) => Number.isFinite(n))) continue;

    // Same field names as the PDF header. Some files put TKM under Product Type,
    // others under Serial No. — keep column roles by detecting which token is TKM
    // only for the model elsewhere; here store header roles using left-to-right
    // when text order matches header, else map by token type into the same fields:
    // productType = non-TKM batch code, serialNo = TKM model (app model field).
    const productType = tokens[typeIdx].toUpperCase();
    const serialNo = tokens[serialIdx].toUpperCase();
    const productNo = tokens[productNoIdx].toUpperCase();
    if (seen.has(productNo)) continue;
    seen.add(productNo);

    rows.push({
      productType,
      serialNo,
      productNo,
      palletNo: tokens[palletIdx].toUpperCase(),
      labelWatt: nums[0],
      pmax: nums[1],
      ff: nums[2],
      voc: nums[3],
      isc: nums[4],
      vpm: nums[5],
      ipm: nums[6],
    });
  }

  return rows;
}

export async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    const { extractText, getDocumentProxy } = await import("unpdf");
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    if (typeof text === "string" && text.trim()) return text;
    if (Array.isArray(text)) return text.join("\n");
  } catch {
    // fall through
  }

  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  const result = await parser.getText();
  const text =
    typeof result === "string"
      ? result
      : typeof result?.text === "string"
        ? result.text
        : "";
  return text;
}

async function parseByColumnPositions(
  buffer: Buffer,
): Promise<FlashPanelRow[] | null> {
  try {
    const { getDocumentProxy } = await import("unpdf");
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const page1 = await pdf.getPage(1);
    const centers = findHeaderCenters(
      itemsFromContent(await page1.getTextContent()),
    );
    if (!centers) return null;

    const rows: FlashPanelRow[] = [];
    const seen = new Set<string>();
    const pageCount = pdf.numPages ?? 1;

    for (let i = 1; i <= pageCount; i++) {
      const page = i === 1 ? page1 : await pdf.getPage(i);
      const items = itemsFromContent(await page.getTextContent());
      // Re-detect headers per page when present; else reuse page-1 centers.
      const pageCenters =
        findHeaderCenters(items) ?? centers;
      parsePageItems(items, pageCenters, seen, rows);
    }

    return rows.length > 0 ? rows : null;
  } catch {
    return null;
  }
}

/**
 * Ensure app model field (serialNo) always holds the TKM… code when the PDF
 * placed it under Product Type instead of Serial No. (same columns, swapped cells).
 */
function normalizeModelFields(row: FlashPanelRow): FlashPanelRow {
  const typeIsTkm = /^TKM/i.test(row.productType);
  const serialIsTkm = /^TKM/i.test(row.serialNo);
  if (typeIsTkm && !serialIsTkm) {
    return {
      ...row,
      productType: row.serialNo,
      serialNo: row.productType,
    };
  }
  return row;
}

export async function parseFlashReportPdf(
  buffer: Buffer,
): Promise<{ rows: FlashPanelRow[]; textPreview: string; textLength: number }> {
  const positioned = await parseByColumnPositions(buffer);
  const text = await extractPdfText(buffer);
  const rawRows = positioned ?? parseFlashReportText(text);
  const rows = rawRows.map(normalizeModelFields);

  const preview = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 12)
    .join("\n");

  return { rows, textPreview: preview, textLength: text.length };
}
