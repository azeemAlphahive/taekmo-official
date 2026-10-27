import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createAdminSessionToken,
  validateAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON." }, { status: 400 });
  }

  const username =
    typeof body === "object" &&
    body !== null &&
    "username" in body &&
    typeof (body as { username: unknown }).username === "string"
      ? (body as { username: string }).username.trim()
      : "";
  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required." },
      { status: 400 },
    );
  }

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json(
      { message: "Invalid username or password." },
      { status: 401 },
    );
  }

  try {
    const token = await createAdminSessionToken();
    const response = NextResponse.json({ status: "ok" });
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      token,
      adminSessionCookieOptions(),
    );
    return response;
  } catch {
    return NextResponse.json(
      {
        message:
          "Admin session is not configured. Set ADMIN_SESSION_SECRET and credentials in .env.",
      },
      { status: 500 },
    );
  }
}
