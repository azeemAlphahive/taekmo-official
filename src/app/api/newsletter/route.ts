import { NextResponse } from "next/server";
import { connection } from "next/server";
import { prisma } from "@/lib/db";
import { sendNewsletterNotification } from "@/lib/email";
import { isValidEmail } from "@/lib/site-settings";

export async function POST(request: Request) {
  await connection();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email },
  });

  let isNew = false;
  let subscriber;

  if (!existing) {
    isNew = true;
    subscriber = await prisma.newsletterSubscriber.create({
      data: { email, status: "active" },
    });
  } else if (existing.status !== "active") {
    subscriber = await prisma.newsletterSubscriber.update({
      where: { email },
      data: { status: "active" },
    });
  } else {
    subscriber = existing;
  }

  const shouldNotify = isNew || existing?.status !== "active";
  let mail = { ok: true, skipped: true as boolean | undefined, error: null as string | null };

  if (shouldNotify) {
    const result = await sendNewsletterNotification({
      email,
      isNew,
    });
    mail = {
      ok: result.ok,
      skipped: result.skipped,
      error: result.error ?? null,
    };
  }

  return NextResponse.json({
    status: "ok",
    id: subscriber.id,
    alreadySubscribed: !shouldNotify,
    emailSent: mail.ok && !mail.skipped,
    emailSkipped: Boolean(mail.skipped),
    emailError: mail.error,
  });
}
