/**
 * Same backend as the Next.js website.
 * Override for local: EXPO_PUBLIC_API_URL=http://192.168.x.x:3000
 */
export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_WEB_URL ||
  "https://taekmo-official.com"
).replace(/\/$/, "");

export function assetUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${p}`;
}
