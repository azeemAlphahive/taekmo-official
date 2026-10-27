import { prisma } from "@/lib/db";

export interface ResolvedEmailSettings {
  notifyEmail: string;
  fromName: string;
  fromEmail: string;
  /** Formatted From header: "Name <email>" */
  fromHeader: string;
}

function parseEnvFrom(): { name: string; email: string } {
  const raw = (process.env.EMAIL_FROM ?? "").trim();
  const match = raw.match(/^(.*?)\s*<([^>]+)>$/);
  if (match) {
    return {
      name: match[1].replace(/^["']|["']$/g, "").trim() || "TAEKMO",
      email: match[2].trim(),
    };
  }
  if (raw.includes("@")) {
    return { name: "TAEKMO", email: raw };
  }
  return { name: "TAEKMO", email: "onboarding@resend.dev" };
}

export async function getSiteSettingsRow() {
  return prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      notifyEmail: process.env.NOTIFY_EMAIL?.trim() || null,
      fromName: parseEnvFrom().name,
      fromEmail: parseEnvFrom().email,
    },
    update: {},
  });
}

export async function resolveEmailSettings(): Promise<ResolvedEmailSettings> {
  const row = await getSiteSettingsRow();
  const envFrom = parseEnvFrom();
  const notifyEmail =
    row.notifyEmail?.trim() ||
    process.env.NOTIFY_EMAIL?.trim() ||
    "";
  const fromName = row.fromName?.trim() || envFrom.name;
  const fromEmail = row.fromEmail?.trim() || envFrom.email;

  return {
    notifyEmail,
    fromName,
    fromEmail,
    fromHeader: `${fromName} <${fromEmail}>`,
  };
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
