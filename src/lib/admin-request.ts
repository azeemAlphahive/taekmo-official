import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export async function isAdminRequestAuthorized(
  request: Request,
): Promise<boolean> {
  const secret = process.env.ADMIN_IMPORT_SECRET;
  const headerSecret = request.headers.get("x-admin-secret");
  if (secret && headerSecret === secret) return true;

  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${ADMIN_SESSION_COOKIE}=([^;]+)`),
  );
  const token = match?.[1] ? decodeURIComponent(match[1]) : null;
  return verifyAdminSessionToken(token);
}
