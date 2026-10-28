import { useCallback, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FadeIn } from "../../src/components/FadeIn";
import { BarcodeGuidePreview } from "../../src/components/BarcodeGuidePreview";
import { BarcodeScannerModal } from "../../src/components/BarcodeScannerModal";
import { Reveal, emitAppScroll } from "../../src/components/Reveal";
import { PrimaryButton, Screen } from "../../src/components/ui";
import { useToast } from "../../src/components/Toast";
import { useScrollToTopOnFocus } from "../../src/hooks/useScrollToTopOnFocus";
import { verificationContent } from "../../src/data/content";
import { assetUrl } from "../../src/config";
import { useTheme } from "../../src/theme-context";
import { colors, spacing } from "../../src/theme";

function makeCaptcha() {
  const a = 3 + Math.floor(Math.random() * 7);
  const b = 2 + Math.floor(Math.random() * 8);
  return { a, b, answer: String(a + b) };
}

function normalizeCode(raw: string) {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export default function VerifyScreen() {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const { colors: t } = useTheme();
  const [code, setCode] = useState("");
  const [captcha, setCaptcha] = useState(makeCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const captchaLabel = useMemo(
    () => `${captcha.a} + ${captcha.b} = ?`,
    [captcha],
  );
  const scrollRef = useScrollToTopOnFocus();

  const resetForm = useCallback(() => {
    setCode("");
    setCaptchaInput("");
    setCaptcha(makeCaptcha());
    setLoading(false);
    setScanOpen(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetForm();
      };
    }, [resetForm]),
  );

  function openResult(raw: string) {
    const value = normalizeCode(raw);
    if (value.length < 6) {
      toast.error("Enter a product number with at least 6 characters.");
      return;
    }
    setLoading(true);
    resetForm();
    router.push({
      pathname: "/verify/result",
      params: { barcode: value },
    });
  }

  function onVerify() {
    const value = normalizeCode(code);
    if (value.length < 6) {
      toast.error("Enter a product number with at least 6 characters.");
      return;
    }
    if (captchaInput.trim() !== captcha.answer) {
      toast.error("Solve the verification code correctly.");
      setCaptcha(makeCaptcha());
      setCaptchaInput("");
      return;
    }
    openResult(value);
  }

  return (
    <Screen style={{ backgroundColor: colors.ink }}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={emitAppScroll}
        scrollEventThrottle={64}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.hero, { paddingTop: insets.top + 28 }]}>
          <Image
            source={{ uri: assetUrl("/images/solutions/solutions-bg.jpg") }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <View style={styles.dim} />
          <FadeIn style={styles.heroInner}>
            <Text style={styles.eyebrow}>Product authenticity</Text>
            <Text style={styles.title}>Verify Your Product</Text>
            <Text style={styles.subtitle}>
              Enter the Product No. from your module label and the on-screen
              verification code — or scan the barcode to verify instantly.
            </Text>

            <View style={styles.card}>
              <View style={styles.guideHead}>
                <View style={styles.guideIcon}>
                  <Ionicons name="qr-code-outline" size={18} color={colors.mint} />
                </View>
                <Text style={styles.guideTag}>Guide</Text>
              </View>
              <Text style={styles.cardTitle}>Verification form</Text>
              <Text style={styles.cardHint}>
                Enter the Product No. from your module label and the on-screen
                verification code.
              </Text>
              <Text style={styles.cardExample}>
                Product No. is the unique code on the module (e.g.
                2604D72F2882009720).
              </Text>

              <Text style={styles.label}>Product No.</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  autoCapitalize="characters"
                  placeholder={verificationContent.placeholder}
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  style={styles.input}
                />
                <Pressable
                  onPress={() => setScanOpen(true)}
                  style={styles.scanBtn}
                  accessibilityLabel="Scan barcode with camera"
                >
                  <Ionicons
                    name="barcode-outline"
                    size={22}
                    color={colors.mint}
                  />
                </Pressable>
              </View>

              <Text style={styles.label}>Verification code</Text>
              <Text style={styles.captchaHint}>{captchaLabel}</Text>
              <TextInput
                value={captchaInput}
                onChangeText={setCaptchaInput}
                keyboardType="number-pad"
                placeholder="Enter code"
                placeholderTextColor="rgba(255,255,255,0.35)"
                style={styles.plainInput}
              />
              <PrimaryButton
                label="Search"
                onPress={onVerify}
                loading={loading}
              />

              <View style={styles.guideBlock}>
                <Text style={styles.guideBody}>
                  Type the Product No. or tap the camera icon to scan the
                  barcode on the module label. Scanning opens the result
                  directly.
                </Text>
                <BarcodeGuidePreview />
              </View>
            </View>
          </FadeIn>
        </View>

        <Reveal
          style={[styles.help, { backgroundColor: t.background }]}
        >
          <Text style={[styles.helpTitle, { color: t.text }]}>Need help?</Text>
          <Text style={[styles.helpBody, { color: t.textSecondary }]}>
            If your Product No. is not found, contact support with a clear photo
            of the module label.
          </Text>
          <PrimaryButton
            label="Contact Us"
            onPress={() => router.push("/contact")}
          />
        </Reveal>
      </ScrollView>

      <BarcodeScannerModal
        visible={scanOpen}
        onClose={() => setScanOpen(false)}
        onScan={(value) => {
          setScanOpen(false);
          openResult(value);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 520,
    paddingBottom: 32,
    paddingHorizontal: spacing.lg,
  },
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(16,18,23,0.78)",
  },
  heroInner: {
    maxWidth: 480,
    alignSelf: "center",
    width: "100%",
  },
  eyebrow: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(18,22,28,0.88)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(9,156,45,0.45)",
    padding: 16,
  },
  guideHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  guideIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(9,156,45,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  guideTag: {
    color: colors.mint,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  cardTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  cardHint: {
    marginTop: 6,
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    lineHeight: 17,
  },
  cardExample: {
    marginTop: 8,
    marginBottom: 14,
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    lineHeight: 16,
  },
  label: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  captchaHint: {
    color: colors.mint,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  inputWrap: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 46,
    paddingHorizontal: 14,
    color: colors.white,
    fontSize: 15,
  },
  scanBtn: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  plainInput: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 14,
    color: colors.white,
    fontSize: 15,
    marginBottom: 12,
  },
  guideBlock: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    gap: 10,
  },
  guideBody: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    lineHeight: 16,
  },
  help: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 28,
    paddingBottom: 120,
    gap: 10,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  helpBody: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginBottom: 6,
  },
});
