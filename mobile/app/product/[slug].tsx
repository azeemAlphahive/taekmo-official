import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton } from "../../src/components/BackButton";
import { FadeIn } from "../../src/components/FadeIn";
import { useToast } from "../../src/components/Toast";
import {
  LightField,
  PrimaryButton,
  Screen,
} from "../../src/components/ui";
import { sendContact } from "../../src/api";
import { useScrollToTopOnFocus } from "../../src/hooks/useScrollToTopOnFocus";
import { getProduct } from "../../src/data/products";
import { assetUrl } from "../../src/config";
import { colors, spacing } from "../../src/theme";

const TABS = ["Overview", "Specifications", "Warranty"] as const;

export default function ProductDetailScreen() {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const scrollRef = useScrollToTopOnFocus();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const product = getProduct(String(slug || ""));
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!product) {
    return (
      <Screen>
        <BackButton light={false} />
        <View style={styles.missing}>
          <Text style={styles.name}>Product not found</Text>
        </View>
      </Screen>
    );
  }

  const gallery = [
    product.image,
    "/images/solutions/residential.jpg",
    "/images/solutions/commercial.jpg",
    "/images/hero/solar-farm.jpg",
  ];

  async function onInquire() {
    if (!product) return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill name, email, and message.");
      return;
    }
    setLoading(true);
    const loadingId = toast.loading("Sending inquiry…");
    try {
      const res = await sendContact({
        name: name.trim(),
        email: email.trim(),
        message: `Product inquiry: ${product.name}\n\n${message.trim()}`,
      });
      toast.dismiss(loadingId);
      if (!res.ok) {
        toast.error(res.data.message || "Could not send inquiry.");
        return;
      }
      toast.success(
        res.data.emailSkipped
          ? "Inquiry saved. Email delivery is currently unavailable."
          : "Inquiry sent successfully.",
      );
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.dismiss(loadingId);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen style={{ backgroundColor: colors.white }}>
      <BackButton light={false} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 56 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn>
          <Text style={styles.crumbs}>Home / Products / {product.code}</Text>
          <View style={styles.imageCard}>
            <Image
              source={{ uri: assetUrl(gallery[galleryIndex]) }}
              style={styles.image}
              contentFit="contain"
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbs}
          >
            {gallery.map((src, i) => (
              <Pressable key={src + i} onPress={() => setGalleryIndex(i)}>
                <Image
                  source={{ uri: assetUrl(src) }}
                  style={[
                    styles.thumb,
                    galleryIndex === i && styles.thumbActive,
                  ]}
                  contentFit="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        </FadeIn>

        <FadeIn delay={80}>
          <View style={styles.badges}>
            <Text style={styles.badge}>Solar Panel</Text>
            <Text style={styles.badge}>TAEKMO Official</Text>
            <Text style={styles.badge}>Talesun / C&D Group</Text>
            <Text style={styles.badge}>{product.family}</Text>
          </View>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.desc}>{product.description}</Text>
          <Text style={styles.price}>{product.priceLabel}</Text>

          <View style={styles.quickGrid}>
            <View style={styles.quickItem}>
              <Text style={styles.quickLabel}>Power Range</Text>
              <Text style={styles.quickValue}>{product.wattLabel}</Text>
            </View>
            <View style={styles.quickItem}>
              <Text style={styles.quickLabel}>Efficiency</Text>
              <Text style={styles.quickValue}>
                Up to {product.efficiency.toFixed(2)}%
              </Text>
            </View>
            <View style={styles.quickItem}>
              <Text style={styles.quickLabel}>Cell Type</Text>
              <Text style={styles.quickValue}>{product.family}</Text>
            </View>
            <View style={styles.quickItem}>
              <Text style={styles.quickLabel}>Dimensions</Text>
              <Text style={styles.quickValue}>{product.dimensions}</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <PrimaryButton
              label="Inquire Now"
              onPress={() =>
                setMessage((m) =>
                  m.trim()
                    ? m
                    : `I would like pricing and availability for ${product.name}.`,
                )
              }
            />
            <Pressable
              style={styles.outlineBtn}
              onPress={() => router.push("/contact")}
            >
              <Text style={styles.outlineText}>Contact sales</Text>
            </Pressable>
          </View>
        </FadeIn>

        <View style={styles.tabs}>
          {TABS.map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tab, tab === t && styles.tabActive]}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t}
              </Text>
            </Pressable>
          ))}
        </View>

        {tab === "Overview" ? (
          <View style={styles.block}>
            <Text style={styles.blockTitle}>
              {product.name} — {product.wattLabel}
            </Text>
            {product.overview.map((p) => (
              <Text key={p.slice(0, 40)} style={styles.body}>
                {p}
              </Text>
            ))}
            {product.highlights.map((h) => (
              <View key={h.title} style={styles.highlight}>
                <Text style={styles.highlightTitle}>{h.title}</Text>
                <Text style={styles.body}>{h.description}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {tab === "Specifications" ? (
          <View style={styles.block}>
            {product.specs.map((spec) => (
              <View key={spec.label} style={styles.specRow}>
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {tab === "Warranty" ? (
          <View style={styles.block}>
            <View style={styles.highlight}>
              <Text style={styles.highlightTitle}>Product Warranty</Text>
              <Text style={styles.body}>
                {product.warrantyProduct} — materials and workmanship coverage
                for {product.code}.
              </Text>
            </View>
            <View style={styles.highlight}>
              <Text style={styles.highlightTitle}>Linear Performance</Text>
              <Text style={styles.body}>
                {product.warrantyPerformance} — {product.performanceNote}
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.inquire}>
          <Text style={styles.blockTitle}>Product inquiry</Text>
          <Text style={styles.body}>
            Ask about {product.name} supply, datasheets, or project pricing.
          </Text>
          <LightField label="Full name" value={name} onChangeText={setName} />
          <LightField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <LightField
            label="Message"
            value={message}
            onChangeText={setMessage}
            multiline
            style={{ minHeight: 90, textAlignVertical: "top" }}
          />
          <PrimaryButton
            label="Send inquiry"
            onPress={() => void onInquire()}
            loading={loading}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 48,
  },
  missing: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 120,
  },
  crumbs: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 12,
  },
  imageCard: {
    backgroundColor: "#f3f5f4",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 220,
  },
  thumbs: {
    gap: 8,
    paddingVertical: 10,
  },
  thumb: {
    width: 64,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumbActive: {
    borderColor: colors.green,
    borderWidth: 2,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#eef1ef",
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
  },
  name: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "800",
  },
  desc: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  price: {
    marginTop: 12,
    color: colors.green,
    fontSize: 22,
    fontWeight: "800",
  },
  quickGrid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  quickItem: {
    width: "47%",
    backgroundColor: colors.page,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  quickLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
  },
  quickValue: {
    marginTop: 4,
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  actions: {
    marginTop: 16,
    gap: 10,
  },
  outlineBtn: {
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineText: {
    color: colors.ink,
    fontWeight: "700",
  },
  tabs: {
    flexDirection: "row",
    gap: 8,
    marginTop: 22,
    marginBottom: 12,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#eef1ef",
  },
  tabActive: {
    backgroundColor: colors.ink,
  },
  tabText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  tabTextActive: {
    color: colors.white,
  },
  block: {
    backgroundColor: colors.page,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  blockTitle: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 8,
  },
  body: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  highlight: {
    marginBottom: 10,
  },
  highlightTitle: {
    color: colors.ink,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  specRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  specLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 2,
  },
  specValue: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "600",
  },
  inquire: {
    marginTop: 18,
    backgroundColor: colors.page,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
});
