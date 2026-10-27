import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const jar = await cookies();
  const ok = await verifyAdminSessionToken(
    jar.get(ADMIN_SESSION_COOKIE)?.value,
  );
  if (!ok) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const [total, latest] = await Promise.all([
    prisma.panel.count(),
    prisma.panel.findFirst({
      orderBy: { importedAt: "desc" },
      select: { importedAt: true, sourceFile: true },
    }),
  ]);

  return NextResponse.json({
    total,
    latestImportAt: latest?.importedAt ?? null,
    latestSourceFile: latest?.sourceFile ?? null,
  });
}
