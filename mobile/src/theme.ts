export const brand = {
  green: "#099c2d",
  greenDark: "#077a24",
  mint: "#6ef74d",
  forest: "#12200d",
  navy: "#0f172a",
} as const;

/** Legacy brand palette — prefer `useTheme().colors` for surfaces/text. */
export const colors = {
  ink: "#101217",
  navy: brand.navy,
  green: brand.green,
  greenDark: brand.greenDark,
  forest: brand.forest,
  mint: brand.mint,
  surface: "#dfe7dc",
  white: "#ffffff",
  muted: "#5c6670",
  border: "#e2e8e0",
  page: "#f4f7f5",
} as const;

export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  mode: ThemeMode;
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textSecondary: string;
  muted: string;
  border: string;
  green: string;
  greenDark: string;
  mint: string;
  white: string;
  ink: string;
  inputBg: string;
  inputBorder: string;
  inputText: string;
  tabBarBg: string;
  tabBarBorder: string;
  tabIdle: string;
  tabActive: string;
  heroDim: string;
  cardShadow: string;
};

export const lightTheme: ThemeColors = {
  mode: "light",
  background: "#f4f7f5",
  surface: "#ffffff",
  surfaceMuted: "#eef2ef",
  text: "#101217",
  textSecondary: "#5c6670",
  muted: "#5c6670",
  border: "#e2e8e0",
  green: brand.green,
  greenDark: brand.greenDark,
  mint: brand.mint,
  white: "#ffffff",
  ink: "#101217",
  inputBg: "#ffffff",
  inputBorder: "#d7ded8",
  inputText: "#101217",
  tabBarBg: "rgba(16,18,23,0.88)",
  tabBarBorder: "rgba(255,255,255,0.16)",
  tabIdle: "rgba(255,255,255,0.55)",
  tabActive: brand.mint,
  heroDim: "rgba(16,18,23,0.72)",
  cardShadow: "rgba(16,18,23,0.08)",
};

export const darkTheme: ThemeColors = {
  mode: "dark",
  background: "#0b0d11",
  surface: "#151920",
  surfaceMuted: "#1c222b",
  text: "#f3f6f4",
  textSecondary: "#9aa3ad",
  muted: "#8b949e",
  border: "rgba(255,255,255,0.1)",
  green: brand.green,
  greenDark: brand.greenDark,
  mint: brand.mint,
  white: "#ffffff",
  ink: "#101217",
  inputBg: "rgba(255,255,255,0.05)",
  inputBorder: "rgba(255,255,255,0.14)",
  inputText: "#f3f6f4",
  tabBarBg: "rgba(10,12,16,0.92)",
  tabBarBorder: "rgba(255,255,255,0.12)",
  tabIdle: "rgba(255,255,255,0.5)",
  tabActive: brand.mint,
  heroDim: "rgba(8,10,14,0.78)",
  cardShadow: "rgba(0,0,0,0.35)",
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
} as const;
