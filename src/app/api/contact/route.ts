import { NextResponse } from "next/server";
import { connection } from "next/server";
import { prisma } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import { isValidEmail } from "@/lib/site-settings";

export async function POST(request: Request) {
  await connection();

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON body." },
        { status: 400 },
      );
    }

    const name =
      typeof body === "object" &&
      body !== null &&
      "name" in body &&
      typeof (body as { name: unknown }).name === "string"
        ? (body as { name: string }).name.trim()
        : "";
    const email =
      typeof body === "object" &&
      body !== null &&
      "email" in body &&
      typeof (body as { email: unknown }).email === "string"
        ? (body as { email: string }).email.trim().toLowerCase()
        : "";
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as { message: unknown }).message === "string"
        ? (body as { message: string }).message.trim()
        : "";
    const subject =
      typeof body === "object" &&
      body !== null &&
      "subject" in body &&
      typeof (body as { subject: unknown }).subject === "string"
        ? (body as { subject: string }).subject.trim()
        : null;

    if (!name || !isValidEmail(email) || !message) {
      return NextResponse.json(
        {
          message: "Please enter your name, a valid email, and a message.",
        },
        { status: 400 },
      );
    }

    if (name.length > 120 || email.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { message: "One or more fields are too long." },
        { status: 400 },
      );
    }

    const saved = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        subject: subject || null,
        status: "new",
      },
    });

    let mail = {
      ok: true,
      skipped: true as boolean | undefined,
      error: null as string | null,
    };
    try {
      const result = await sendContactNotification({
        name,
        email,
        message,
        subject,
      });
      mail = {
        ok: result.ok,
        skipped: result.skipped,
        error: result.error ?? null,
      };
    } catch (err) {
      console.error("[contact] email send failed:", err);
      mail = {
        ok: false,
        skipped: false,
        error: err instanceof Error ? err.message : "Email send failed",
      };
    }

    return NextResponse.json({
      status: "ok",
      id: saved.id,
      emailSent: mail.ok && !mail.skipped,
      emailSkipped: Boolean(mail.skipped),
      emailError: mail.error,
    });
  } catch (err) {
    console.error("[contact] POST failed:", err);
    return NextResponse.json(
      {
        message:
          err instanceof Error
            ? err.message
            : "Could not save your message. Please try again.",
      },
      { status: 500 },
    );
  }
}
