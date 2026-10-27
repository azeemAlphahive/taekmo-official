import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "taekmo_admin_session";

const SESSION_DAYS = 7;

function getSecretKey() {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_IMPORT_SECRET ||
    process.env.ADMIN_PASSWORD;
  if (!secret || secret.length < 8) {
    throw new Error(
      "Set ADMIN_SESSION_SECRET (or ADMIN_IMPORT_SECRET) in environment.",
    );
  }
  return new TextEncoder().encode(secret);
}

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  return { username, password };
}

export function validateAdminCredentials(
  username: string,
  password: string,
): boolean {
  const creds = getAdminCredentials();
  if (!creds.username || !creds.password) return false;
  return username === creds.username && password === creds.password;
}

export async function createAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecretKey());
}

export async function verifyAdminSessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value);
}

export function adminSessionCookieOptions(maxAgeSeconds = SESSION_DAYS * 86400) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
