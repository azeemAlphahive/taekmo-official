import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton } from "../../src/components/BackButton";
import { PrimaryButton, Screen } from "../../src/components/ui";
import { Reveal, emitAppScroll } from "../../src/components/Reveal";
import { useToast } from "../../src/components/Toast";
import {
  verifyProduct,
  type VerifyPanelResult,
} from "../../src/api";
import { useScrollToTopOnFocus } from "../../src/hooks/useScrollToTopOnFocus";
import { assetUrl } from "../../src/config";
import { colors, spacing } from "../../src/theme";

export default function VerifyResultScreen() {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const scrollRef = useScrollToTopOnFocus();
  const { barcode } = useLocalSearchParams<{ barcode?: string }>();
  const code = String(barcode || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerifyPanelResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code || code.length < 6) {
      router.replace("/verify");
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await verifyProduct(code);
        if (cancelled) return;
        if (!res.ok || res.data.status === "not_found" || !res.data.result) {
          const msg =
            res.data.message ||
            "No TAEKMO panel record found for this product number.";
          setError(msg);
          setResult(null);
          toast.error("Product not found in authenticity database.");
        } else {
          setResult(res.data.result);
          toast.success("Authenticity confirmed.");
        }
      } catch {
        if (!cancelled) {
          setError("Network error. Check your connection and try again.");
          toast.error("Network error. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code]);

  const rows = result
    ? [
        { label: "Model", value: result.model },
        { label: "Product No.", value: result.barcode || code },
        { label: "Product type", value: result.productType },
        { label: "Pallet No.", value: result.palletNo },
        { label: "Label power", value: result.power },
        { label: "Pmax", value: result.pmax },
        { label: "FF", value: result.ff },
        { label: "Voc", value: result.voc },
        { label: "Isc", value: result.isc },
        { label: "Vpm", value: result.vpm },
        { label: "Ipm", value: result.ipm },
        { label: "Category", value: result.categoryLabel },
      ].filter((r) => r.value)
    : [];

  const productSlug =
    result?.productHref?.replace("/products/", "") ||
    (result?.model ? `taekmo-${result.model.toLowerCase()}` : null);

  return (
    <Screen style={{ backgroundColor: colors.ink }}>
      <BackButton />
      <Image
        source={{ uri: assetUrl("/images/solutions/solutions-bg.jpg") }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={styles.dim} />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 56, paddingBottom: 48 },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={emitAppScroll}
        scrollEventThrottle={64}
      >
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.mint} size="large" />
            <Text style={styles.loadingText}>Loading verification result…</Text>
          </View>
        ) : null}

        {!loading && error ? (
          <Reveal>
            <Text style={styles.eyebrow}>Verification result</Text>
            <View style={styles.badgeError}>
              <Ionicons name="alert-circle" size={16} color="#fecaca" />
              <Text style={styles.badgeErrorText}>Not found</Text>
            </View>
            <Text style={styles.title}>No match for this Product No.</Text>
            <Text style={styles.note}>{error}</Text>
            <Text style={styles.codeLine}>{code}</Text>
            <PrimaryButton
              label="Verify another"
              onPress={() => router.replace("/verify")}
            />
            <Pressable
              style={styles.outlineBtn}
              onPress={() => router.push("/contact")}
            >
              <Text style={styles.outlineText}>Contact support</Text>
            </Pressable>
          </Reveal>
        ) : null}

        {!loading && result ? (
          <>
            <Reveal>
              <Text style={styles.eyebrow}>Verification result</Text>
              <View style={styles.badgeOk}>
                <Ionicons name="checkmark-circle" size={16} color={colors.mint} />
                <Text style={styles.badgeOkText}>Authenticity confirmed</Text>
              </View>
              <Text style={styles.title}>
                {result.productName || "Genuine TAEKMO panel"}
              </Text>
              <Text style={styles.note}>
                {result.note ||
                  "This module is registered in the TAEKMO authenticity database."}
              </Text>
            </Reveal>

            <Reveal delay={80} style={styles.mediaCard}>
              <Image
                source={{
                  uri: assetUrl(
                    result.image ||
                      "/images/products/taekmo-solar-panel-white.jpg",
                  ),
                }}
                style={styles.mediaImage}
                contentFit="contain"
              />
              <View style={styles.mediaBody}>
                <Text style={styles.mediaCat}>
                  {result.categoryLabel || "Solar Panel"}
                </Text>
                <Text style={styles.mediaName}>{result.productName}</Text>
                <Text style={styles.mediaModel}>{result.model}</Text>
              </View>
            </Reveal>

            <Reveal delay={120} style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>Product details</Text>
              <Text style={styles.detailsSub}>
                Verified against the TAEKMO authenticity database.
              </Text>
              <View style={styles.grid}>
                {rows.map((row) => (
                  <View key={row.label} style={styles.detailItem}>
                    <Text style={styles.detailLabel}>{row.label}</Text>
                    <Text style={styles.detailValue}>{row.value}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actions}>
                {productSlug ? (
                  <PrimaryButton
                    label="View product page"
                    onPress={() => router.push(`/product/${productSlug}`)}
                  />
                ) : null}
                <Pressable
                  style={styles.outlineBtn}
                  onPress={() => router.replace("/verify")}
                >
                  <Text style={styles.outlineText}>Verify another</Text>
                </Pressable>
              </View>
            </Reveal>

            <Text style={styles.help}>
              Need assistance?{" "}
              <Text
                style={styles.helpLink}
                onPress={() => router.push("/contact")}
              >
                Contact support
              </Text>
            </Text>
          </>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(16,18,23,0.82)",
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  loading: {
    minHeight: 280,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
  },
  eyebrow: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 12,
  },
  badgeOk: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(9,156,45,0.4)",
    backgroundColor: "rgba(9,156,45,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  badgeOkText: {
    color: colors.mint,
    fontWeight: "700",
    fontSize: 13,
  },
  badgeError: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(248,113,113,0.4)",
    backgroundColor: "rgba(220,38,38,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  badgeErrorText: {
    color: "#fecaca",
    fontWeight: "700",
    fontSize: 13,
  },
  title: {
    marginTop: 14,
    color: colors.white,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  note: {
    marginTop: 10,
    marginBottom: 18,
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  codeLine: {
    color: colors.mint,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 18,
  },
  mediaCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(18,22,28,0.85)",
    overflow: "hidden",
    marginBottom: 14,
  },
  mediaImage: {
    width: "100%",
    height: 220,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  mediaBody: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    padding: 14,
  },
  mediaCat: {
    color: colors.mint,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  mediaName: {
    marginTop: 4,
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  mediaModel: {
    marginTop: 2,
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
  },
  detailsCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(18,22,28,0.88)",
    padding: 16,
  },
  detailsTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  detailsSub: {
    marginTop: 4,
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  detailItem: {
    width: "48%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 10,
  },
  detailLabel: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  detailValue: {
    marginTop: 4,
    color: colors.white,
    fontSize: 13,
    fontWeight: "600",
  },
  actions: {
    marginTop: 16,
    gap: 10,
  },
  outlineBtn: {
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineText: {
    color: colors.mint,
    fontWeight: "700",
  },
  help: {
    marginTop: 18,
    textAlign: "center",
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
  },
  helpLink: {
    color: colors.mint,
    fontWeight: "600",
  },
});
