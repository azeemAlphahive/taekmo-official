import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
// import { useColorScheme } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  // darkTheme,
  lightTheme,
  type ThemeColors,
  type ThemeMode,
} from "./theme";

// const STORAGE_KEY = "taekmo-theme-mode";

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Light / dark mode — temporarily forced to LIGHT.
 * Uncomment dark-mode logic below when re-enabling the toggle.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // --- dark mode (commented for now) ---
  // const system = useColorScheme();
  // const [mode, setModeState] = useState<ThemeMode>(
  //   system === "dark" ? "dark" : "light",
  // );
  // const [ready, setReady] = useState(false);
  // useEffect(() => {
  //   let cancelled = false;
  //   (async () => {
  //     try {
  //       const saved = await AsyncStorage.getItem(STORAGE_KEY);
  //       if (!cancelled && (saved === "light" || saved === "dark")) {
  //         setModeState(saved);
  //       }
  //     } catch {
  //       /* keep system default */
  //     } finally {
  //       if (!cancelled) setReady(true);
  //     }
  //   })();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);
  // const setMode = useCallback((next: ThemeMode) => {
  //   setModeState(next);
  //   void AsyncStorage.setItem(STORAGE_KEY, next).catch(() => undefined);
  // }, []);
  // const toggle = useCallback(() => {
  //   setMode(mode === "dark" ? "light" : "dark");
  // }, [mode, setMode]);

  const mode: ThemeMode = "light";

  const setMode = useCallback((_next: ThemeMode) => {
    // Dark mode disabled for now — no-op
  }, []);

  const toggle = useCallback(() => {
    // Dark mode disabled for now — no-op
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      // colors: mode === "dark" ? darkTheme : lightTheme,
      colors: lightTheme,
      isDark: false,
      setMode,
      toggle,
    }),
    [mode, setMode, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
