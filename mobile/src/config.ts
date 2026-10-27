/**
 * Website URL loaded inside the app WebView.
 * Override locally with EXPO_PUBLIC_WEB_URL (e.g. http://192.168.x.x:3000 for device testing).
 */
export const WEB_URL = (
  process.env.EXPO_PUBLIC_WEB_URL || "https://www.taekmosolar.com"
).replace(/\/$/, "");

export const BRAND = {
  name: "TAEKMO Solar",
  ink: "#101217",
  green: "#099c2d",
  mint: "#6ef74d",
  white: "#ffffff",
} as const;
