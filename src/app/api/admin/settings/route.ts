import { NextResponse } from "next/server";
import { connection } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminRequestAuthorized } from "@/lib/admin-request";
import {
  getSiteSettingsRow,
  isValidEmail,
} from "@/lib/site-settings";

export async function GET(request: Request) {
  await connection();
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const settings = await getSiteSettingsRow();
  return NextResponse.json({
    notifyEmail: settings.notifyEmail ?? "",
    fromName: settings.fromName ?? "",
    fromEmail: settings.fromEmail ?? "",
    updatedAt: settings.updatedAt.toISOString(),
    hasResendKey: Boolean(process.env.RESEND_API_KEY?.trim()),
  });
}

export async function PUT(request: Request) {
  await connection();
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const notifyEmail =
    typeof body === "object" &&
    body !== null &&
    "notifyEmail" in body &&
    typeof (body as { notifyEmail: unknown }).notifyEmail === "string"
      ? (body as { notifyEmail: string }).notifyEmail.trim()
      : "";
  const fromName =
    typeof body === "object" &&
    body !== null &&
    "fromName" in body &&
    typeof (body as { fromName: unknown }).fromName === "string"
      ? (body as { fromName: string }).fromName.trim()
      : "";
  const fromEmail =
    typeof body === "object" &&
    body !== null &&
    "fromEmail" in body &&
    typeof (body as { fromEmail: unknown }).fromEmail === "string"
      ? (body as { fromEmail: string }).fromEmail.trim()
      : "";

  if (notifyEmail && !isValidEmail(notifyEmail)) {
    return NextResponse.json(
      { message: "Notify email is invalid." },
      { status: 400 },
    );
  }
  if (fromEmail && !isValidEmail(fromEmail)) {
    return NextResponse.json(
      { message: "From email is invalid." },
      { status: 400 },
    );
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      notifyEmail: notifyEmail || null,
      fromName: fromName || null,
      fromEmail: fromEmail || null,
    },
    update: {
      notifyEmail: notifyEmail || null,
      fromName: fromName || null,
      fromEmail: fromEmail || null,
    },
  });

  return NextResponse.json({
    status: "ok",
    notifyEmail: settings.notifyEmail ?? "",
    fromName: settings.fromName ?? "",
    fromEmail: settings.fromEmail ?? "",
    updatedAt: settings.updatedAt.toISOString(),
  });
}
