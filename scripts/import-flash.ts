/**
 * CLI: import a Flash Testing Report PDF into the database.
 *
 *   npx tsx scripts/import-flash.ts path/to/FLASH_REPORT.pdf
 */

import fs from "node:fs";
import path from "node:path";
import { prisma } from "../src/lib/db";
import { upsertPanelRows } from "../src/lib/import-panels";
import { parseFlashReportPdf } from "../src/lib/pdf/parse-flash-report";

async function main() {
  const fileArg = process.argv[2];
  if (!fileArg) {
    console.error("Usage: npx tsx scripts/import-flash.ts <path-to-pdf>");
    process.exit(1);
  }

  const filePath = path.resolve(fileArg);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const buffer = fs.readFileSync(filePath);
  console.log(`Parsing ${path.basename(filePath)} (${buffer.length} bytes)…`);

  const { rows, textPreview, textLength } = await parseFlashReportPdf(buffer);
  console.log(`Parsed ${rows.length} panel rows (text length ${textLength}).`);

  if (rows.length === 0) {
    console.error("No rows matched. Check PDF format / parser.");
    console.error("Text preview:\n", textPreview);
    process.exit(1);
  }

  const sourceFile = path.basename(filePath);
  try {
    const upserted = await upsertPanelRows(rows, sourceFile);
    console.log(`Upserted ${upserted} panels from ${sourceFile}.`);
    console.log(`Sample Product No. for verify: ${rows[0].productNo}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
