import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { panelToVerifyResult } from "@/data/verify";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const code =
    typeof body === "object" &&
    body !== null &&
    "code" in body &&
    typeof (body as { code: unknown }).code === "string"
      ? (body as { code: string }).code.trim()
      : "";

  if (!code || code.length < 6) {
    return NextResponse.json(
      {
        status: "error",
        message: "Please provide a product number of at least 6 characters.",
      },
      { status: 400 },
    );
  }

  const normalized = code.toUpperCase().replace(/\s+/g, "");

  const panel = await prisma.panel.findUnique({
    where: { productNo: normalized },
  });

  if (!panel) {
    return NextResponse.json(
      {
        status: "not_found",
        message:
          "No TAEKMO panel record found for this product number. Check the label and try again.",
        code: normalized,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    status: "authentic",
    result: panelToVerifyResult(panel),
  });
}
