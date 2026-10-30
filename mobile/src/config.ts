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

/**
 * Prefer bundled assets for distributor/team images so the app works
 * even before those files are deployed to the live website.
 */
const bundledAssets: Record<string, number> = {
  "/images/distributors/inb-solar-logo.png": require("../assets/images/distributors/inb-solar-logo.png"),
  "/images/distributors/ey-enterprise-logo.png": require("../assets/images/distributors/ey-enterprise-logo.png"),
  "/images/distributors/blaze-solar-logo.png": require("../assets/images/distributors/blaze-solar-logo.png"),
  "/images/distributors/prime-chem-logo.png": require("../assets/images/distributors/prime-chem-logo.png"),
  "/images/distributors/mateensons-logo.png": require("../assets/images/distributors/mateensons-logo.png"),
  "/images/distributors/taimoor-trading-logo.png": require("../assets/images/distributors/taimoor-trading-logo.png"),
  "/images/team/nibrass-zaman.jpg": require("../assets/images/team/nibrass-zaman.jpg"),
  "/images/team/sofia-li.jpg": require("../assets/images/team/sofia-li.jpg"),
};

export function assetSource(path: string): number | { uri: string } {
  const p = path.startsWith("/") ? path : `/${path}`;
  const local = bundledAssets[p];
  if (local != null) return local;
  return { uri: assetUrl(p) };
}
