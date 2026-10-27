import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RNWebView from "react-native-webview";
import { BRAND, WEB_URL } from "./src/config";

// RN 0.88 typings for react-native-webview can resolve to `never`.
const WebView = RNWebView as unknown as React.ComponentType<Record<string, unknown>>;

type WebViewRef = {
  goBack: () => void;
  reload: () => void;
};

SplashScreen.preventAutoHideAsync().catch(() => {
  /* already hidden */
});

export default function App() {
  const webRef = useRef<WebViewRef | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(BRAND.ink);
  }, []);

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack && webRef.current) {
        webRef.current.goBack();
        return true;
      }
      return false;
    });

    return () => sub.remove();
  }, [canGoBack]);

  const hideSplash = useCallback(() => {
    void SplashScreen.hideAsync();
  }, []);

  const reload = useCallback(() => {
    setError(null);
    setLoading(true);
    webRef.current?.reload();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <StatusBar style="light" />

        <View style={styles.frame}>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorTitle}>Connection issue</Text>
              <Text style={styles.errorBody}>
                Could not load the TAEKMO website. Check your internet and try
                again.
              </Text>
              <Text style={styles.errorUrl}>{WEB_URL}</Text>
              <Pressable style={styles.retryBtn} onPress={reload}>
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            </View>
          ) : (
            <WebView
              ref={webRef}
              source={{ uri: WEB_URL }}
              style={styles.webview}
              onLoadStart={() => {
                setLoading(true);
                setError(null);
              }}
              onLoadEnd={() => {
                setLoading(false);
                hideSplash();
              }}
              onNavigationStateChange={(nav: { canGoBack?: boolean }) => {
                setCanGoBack(Boolean(nav.canGoBack));
              }}
              onError={() => {
                setLoading(false);
                setError("load_failed");
                hideSplash();
              }}
              onHttpError={() => {
                setLoading(false);
                setError("http_error");
                hideSplash();
              }}
              pullToRefreshEnabled
              allowsBackForwardNavigationGestures
              startInLoadingState
              javaScriptEnabled
              domStorageEnabled
              sharedCookiesEnabled
              thirdPartyCookiesEnabled
              mediaPlaybackRequiresUserAction={false}
              allowsInlineMediaPlayback
              setSupportMultipleWindows={false}
              applicationNameForUserAgent="TAEKMOSolarApp/1.0"
            />
          )}

          {loading && !error ? (
            <View style={styles.loadingOverlay} pointerEvents="none">
              <Image
                source={require("./assets/logo-light.png")}
                style={styles.loadingLogo}
                resizeMode="contain"
                accessibilityLabel="TAEKMO"
              />
              <ActivityIndicator size="small" color={BRAND.mint} />
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BRAND.ink,
  },
  frame: {
    flex: 1,
    backgroundColor: BRAND.white,
  },
  webview: {
    flex: 1,
    backgroundColor: BRAND.white,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BRAND.ink,
    gap: 20,
    paddingHorizontal: 40,
  },
  loadingLogo: {
    width: "72%",
    maxWidth: 280,
    height: 88,
  },
  errorBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    backgroundColor: BRAND.ink,
    gap: 12,
  },
  errorTitle: {
    color: BRAND.white,
    fontSize: 20,
    fontWeight: "700",
  },
  errorBody: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  errorUrl: {
    color: BRAND.mint,
    fontSize: 12,
    marginTop: 4,
  },
  retryBtn: {
    marginTop: 12,
    backgroundColor: BRAND.green,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryText: {
    color: BRAND.white,
    fontWeight: "700",
    fontSize: 14,
  },
});
