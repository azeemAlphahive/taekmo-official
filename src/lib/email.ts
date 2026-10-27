import { readFileSync } from "fs";
import path from "path";
import { Resend } from "resend";
import { resolveEmailSettings } from "@/lib/site-settings";
import {
  EMAIL_LOGO_CID,
  contactAdminEmailHtml,
  contactAutoReplyHtml,
  newsletterAdminEmailHtml,
  newsletterWelcomeHtml,
} from "@/lib/email-templates";

export interface SendMailResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
  id?: string;
}

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

function getEmailLogoAttachment():
  | { filename: string; content: Buffer; contentId: string }
  | undefined {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "images",
      "brand",
      "email-logo.png",
    );
    return {
      filename: "taekmo-logo.png",
      content: readFileSync(filePath),
      contentId: EMAIL_LOGO_CID,
    };
  } catch (err) {
    console.warn("[email] Could not load logo attachment:", err);
    return undefined;
  }
}

async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendMailResult> {
  const client = getResendClient();
  const settings = await resolveEmailSettings();

  if (!client) {
    console.warn(
      "[email] RESEND_API_KEY not set — message saved to DB but email was not sent.",
    );
    return { ok: true, skipped: true };
  }

  if (!options.to) {
    console.warn("[email] No recipient configured — skipping send.");
    return { ok: true, skipped: true, error: "No recipient email configured." };
  }

  try {
    const logo = getEmailLogoAttachment();
    const { data, error } = await client.emails.send({
      from: settings.fromHeader,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      attachments: logo ? [logo] : undefined,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, error: error.message };
    }

    return { ok: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Email send failed";
    console.error("[email]", message);
    return { ok: false, error: message };
  }
}

export async function sendContactNotification(input: {
  name: string;
  email: string;
  message: string;
  subject?: string | null;
}): Promise<SendMailResult> {
  const settings = await resolveEmailSettings();
  const topic = input.subject?.trim() || "Website contact";

  const adminResult = await sendEmail({
    to: settings.notifyEmail,
    subject: `[TAEKMO] ${topic} — ${input.name}`,
    replyTo: input.email,
    html: contactAdminEmailHtml(input),
  });

  // Best-effort auto-reply; do not fail the request if this fails.
  if (settings.notifyEmail) {
    await sendEmail({
      to: input.email,
      subject: "We received your message — TAEKMO",
      html: contactAutoReplyHtml({ name: input.name }),
    });
  }

  return adminResult;
}

export async function sendNewsletterNotification(input: {
  email: string;
  isNew: boolean;
}): Promise<SendMailResult> {
  const settings = await resolveEmailSettings();

  const adminResult = await sendEmail({
    to: settings.notifyEmail,
    subject: input.isNew
      ? `[TAEKMO] New newsletter subscriber`
      : `[TAEKMO] Newsletter subscriber re-activated`,
    html: newsletterAdminEmailHtml(input),
  });

  await sendEmail({
    to: input.email,
    subject: "Welcome to the TAEKMO newsletter",
    html: newsletterWelcomeHtml(),
  });

  return adminResult;
}
