import { NextResponse } from "next/server";
import { connection } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin-request";
import { upsertPanelRows } from "@/lib/import-panels";
import { parseFlashReportPdf } from "@/lib/pdf/parse-flash-report";

export async function POST(request: Request) {
  await connection();

  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "Expected multipart form data with a PDF file." },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: 'Missing PDF file field "file".' },
      { status: 400 },
    );
  }

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json(
      { message: "Only PDF uploads are supported." },
      { status: 400 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { rows, textPreview, textLength } = await parseFlashReportPdf(buffer);

    if (rows.length === 0) {
      const noText = textLength < 40;
      return NextResponse.json(
        {
          message: noText
            ? "Could not read text from this PDF (it may be a scanned image). Export a text-based Flash Testing Report and try again."
            : "No panel rows matched in this PDF. It must include columns like Product Type, Serial No. (TKM…), Product No., Pallet, Label, and flash values.",
          debug: {
            textLength,
            preview: textPreview.slice(0, 500),
          },
        },
        { status: 422 },
      );
    }

    const sourceFile = file.name;
    const upserted = await upsertPanelRows(rows, sourceFile);

    return NextResponse.json({
      status: "ok",
      sourceFile,
      parsed: rows.length,
      upserted,
      sampleProductNo: rows[0]?.productNo,
    });
  } catch (err) {
    console.error("[admin/import-pdf]", err);
    const detail =
      err instanceof Error && err.message
        ? err.message.slice(0, 200)
        : "Unknown error";
    return NextResponse.json(
      {
        message: `Failed to save panels to the database: ${detail}`,
      },
      { status: 500 },
    );
  }
}
