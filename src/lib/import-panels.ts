import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { FlashPanelRow } from "@/lib/pdf/parse-flash-report";

/** Keep each statement under typical Postgres parameter limits. */
const CHUNK = 250;

/**
 * Bulk upsert panels with one INSERT … ON CONFLICT per chunk.
 * Per-row Prisma upserts are too slow over Railway (minutes) and cause
 * admin PDF uploads to time out before anything appears “saved”.
 */
export async function upsertPanelRows(
  rows: FlashPanelRow[],
  sourceFile: string,
): Promise<number> {
  if (rows.length === 0) return 0;

  const importedAt = new Date();
  let upserted = 0;

  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const values = chunk.map(
      (row) => Prisma.sql`(
        ${randomUUID()},
        ${row.productNo},
        ${row.serialNo},
        ${row.productType},
        ${row.palletNo},
        ${row.labelWatt},
        ${row.pmax},
        ${row.ff},
        ${row.voc},
        ${row.isc},
        ${row.vpm},
        ${row.ipm},
        ${sourceFile},
        ${importedAt}
      )`,
    );

    await prisma.$executeRaw`
      INSERT INTO "Panel" (
        id,
        "productNo",
        "serialNo",
        "productType",
        "palletNo",
        "labelWatt",
        pmax,
        ff,
        voc,
        isc,
        vpm,
        ipm,
        "sourceFile",
        "importedAt"
      )
      VALUES ${Prisma.join(values)}
      ON CONFLICT ("productNo") DO UPDATE SET
        "serialNo" = EXCLUDED."serialNo",
        "productType" = EXCLUDED."productType",
        "palletNo" = EXCLUDED."palletNo",
        "labelWatt" = EXCLUDED."labelWatt",
        pmax = EXCLUDED.pmax,
        ff = EXCLUDED.ff,
        voc = EXCLUDED.voc,
        isc = EXCLUDED.isc,
        vpm = EXCLUDED.vpm,
        ipm = EXCLUDED.ipm,
        "sourceFile" = EXCLUDED."sourceFile",
        "importedAt" = EXCLUDED."importedAt"
    `;

    upserted += chunk.length;
  }

  return upserted;
}
