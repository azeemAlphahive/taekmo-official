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

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      message: m.message,
      subject: m.subject,
      status: m.status,
      adminNote: m.adminNote,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
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

  const data: {
    name?: string;
    email?: string;
    message?: string;
    subject?: string | null;
    status?: string;
    adminNote?: string | null;
  } = {};

  if (
    typeof body === "object" &&
    body !== null &&
    "name" in body &&
    typeof (body as { name: unknown }).name === "string"
  ) {
    data.name = (body as { name: string }).name.trim();
  }
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
    "message" in body &&
    typeof (body as { message: unknown }).message === "string"
  ) {
    data.message = (body as { message: string }).message.trim();
  }
  if (
    typeof body === "object" &&
    body !== null &&
    "subject" in body &&
    typeof (body as { subject: unknown }).subject === "string"
  ) {
    data.subject = (body as { subject: string }).subject.trim() || null;
  }
  if (
    typeof body === "object" &&
    body !== null &&
    "status" in body &&
    typeof (body as { status: unknown }).status === "string"
  ) {
    const status = (body as { status: string }).status;
    if (!["new", "read", "archived"].includes(status)) {
      return NextResponse.json({ message: "Invalid status." }, { status: 400 });
    }
    data.status = status;
  }
  if (
    typeof body === "object" &&
    body !== null &&
    "adminNote" in body &&
    typeof (body as { adminNote: unknown }).adminNote === "string"
  ) {
    data.adminNote = (body as { adminNote: string }).adminNote.trim() || null;
  }

  try {
    const updated = await prisma.contactMessage.update({
      where: { id },
      data,
    });
    return NextResponse.json({ status: "ok", message: updated });
  } catch {
    return NextResponse.json({ message: "Message not found." }, { status: 404 });
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
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ message: "Message not found." }, { status: 404 });
  }
}
