import { NextResponse } from "next/server";
import { connection } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminRequestAuthorized } from "@/lib/admin-request";
import { isValidEmail } from "@/lib/site-settings";

export async function GET(request: Request) {
  await connection();
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  return NextResponse.json({
    subscribers: subscribers.map((s) => ({
      id: s.id,
      email: s.email,
      status: s.status,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    })),
  });
}

export async function PATCH(request: Request) {
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

  const id =
    typeof body === "object" &&
    body !== null &&
    "id" in body &&
    typeof (body as { id: unknown }).id === "string"
      ? (body as { id: string }).id
      : "";

  if (!id) {
    return NextResponse.json({ message: "Missing id." }, { status: 400 });
  }

  const data: { email?: string; status?: string } = {};

  if (
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
  ) {
    const email = (body as { email: string }).email.trim().toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email." }, { status: 400 });
    }
    data.email = email;
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "status" in body &&
    typeof (body as { status: unknown }).status === "string"
  ) {
    const status = (body as { status: string }).status;
    if (!["active", "unsubscribed"].includes(status)) {
      return NextResponse.json({ message: "Invalid status." }, { status: 400 });
    }
    data.status = status;
  }

  try {
    const updated = await prisma.newsletterSubscriber.update({
      where: { id },
      data,
    });
    return NextResponse.json({ status: "ok", subscriber: updated });
  } catch (err) {
    const message =
      err instanceof Error && err.message.includes("Unique")
        ? "That email is already subscribed."
        : "Subscriber not found.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await connection();
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim() ?? "";
  if (!id) {
    return NextResponse.json({ message: "Missing id." }, { status: 400 });
  }

  try {
    await prisma.newsletterSubscriber.delete({ where: { id } });
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json(
      { message: "Subscriber not found." },
      { status: 404 },
    );
  }
}
