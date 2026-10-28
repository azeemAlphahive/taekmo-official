import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BackButton } from "../src/components/BackButton";
import { PageHero } from "../src/components/PageHero";
import { Reveal, emitAppScroll } from "../src/components/Reveal";
import { PrimaryButton, Screen } from "../src/components/ui";
import {
  partners,
  solutionPillars,
  solutionsPage,
  techChips,
} from "../src/data/content";
import { assetUrl } from "../src/config";
import { Image } from "expo-image";
import { useScrollToTopOnFocus } from "../src/hooks/useScrollToTopOnFocus";
import { useTheme } from "../src/theme-context";
import { spacing } from "../src/theme";

export default function SolutionsScreen() {
  const { colors: t } = useTheme();
  const scrollRef = useScrollToTopOnFocus();

  return (
    <Screen>
      <BackButton />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={emitAppScroll}
        scrollEventThrottle={64}
      >
        <PageHero
          eyebrow={solutionsPage.hero.eyebrow}
          title={solutionsPage.hero.title}
          description={solutionsPage.hero.description}
          imageSrc="/images/hero/taekmo-hero-background.jpg"
        />

        <Reveal style={styles.content}>
          <Text style={[styles.greenEyebrow, { color: t.green }]}>
            About the brand
          </Text>
          <Text style={[styles.aboutTitle, { color: t.text }]}>
            {solutionsPage.about.title}
          </Text>
          <Text style={[styles.lead, { color: t.text }]}>
            {solutionsPage.about.lead}
          </Text>
          {solutionsPage.about.paragraphs.map((p) => (
            <Text key={p.slice(0, 40)} style={[styles.body, { color: t.muted }]}>
              {p}
            </Text>
          ))}
          <Pressable onPress={() => router.push("/about")}>
            <Text style={[styles.link, { color: t.green }]}>
              About TAEKMO →
            </Text>
          </Pressable>

          <View style={styles.chipRow}>
            {techChips.map((chip) => (
              <View
                key={chip.id}
                style={[
                  styles.chip,
                  { backgroundColor: t.surface, borderColor: t.border },
                ]}
              >
                <View style={styles.chipIcon}>
                  <Ionicons name={chip.icon} size={18} color={t.green} />
                </View>
                <Text style={[styles.chipTitle, { color: t.text }]}>
                  {chip.title}
                </Text>
                <Text style={[styles.chipBody, { color: t.muted }]}>
                  {chip.description}
                </Text>
              </View>
            ))}
          </View>

          <Text style={[styles.h2, { color: t.text }]}>
            {solutionsPage.scaleTitle}
          </Text>
          {solutionPillars.map((pillar, i) => (
            <View
              key={pillar.id}
              style={[
                styles.pillar,
                { backgroundColor: t.surface, borderColor: t.border },
              ]}
            >
              <View style={styles.pillarIcon}>
                <Ionicons name={pillar.icon} size={22} color={t.green} />
              </View>
              <Text style={[styles.pillarBadge, { color: t.green }]}>
                {String(i + 1).padStart(2, "0")} · Solution
              </Text>
              <Text style={[styles.pillarTitle, { color: t.text }]}>
                {pillar.title}
              </Text>
              <Text style={[styles.body, { color: t.muted }]}>
                {pillar.description}
              </Text>
            </View>
          ))}

          <Text style={[styles.greenEyebrow, { color: t.green }]}>
            Our partners
          </Text>
          <Text style={[styles.h2, { color: t.text }]}>
            Backed by C&D Xiamen and Talesun
          </Text>
          {partners.map((p) => (
            <View
              key={p.id}
              style={[
                styles.partnerCard,
                { backgroundColor: t.surface, borderColor: t.border },
              ]}
            >
              <Image
                source={{ uri: assetUrl(p.logo) }}
                style={[
                  styles.partnerLogo,
                  { backgroundColor: t.surfaceMuted },
                ]}
                contentFit="contain"
              />
              <Text style={[styles.partnerName, { color: t.text }]}>
                {p.name}
              </Text>
              <Text style={[styles.body, { color: t.muted }]}>
                {p.role} · {p.credential}
              </Text>
              <Text style={[styles.highlight, { color: t.green }]}>
                {p.highlight}
              </Text>
            </View>
          ))}

          <View style={[styles.cta, { backgroundColor: t.ink }]}>
            <Text style={[styles.mintEyebrow, { color: t.mint }]}>
              Ready to start
            </Text>
            <Text style={styles.ctaTitle}>{solutionsPage.ctaTitle}</Text>
            <Text style={styles.ctaBody}>{solutionsPage.ctaBody}</Text>
            <PrimaryButton
              label="Contact us"
              onPress={() => router.push("/contact")}
            />
            <Pressable
              onPress={() => router.push("/products")}
              style={styles.outlineBtn}
            >
              <Text style={styles.outlineText}>View products</Text>
            </Pressable>
          </View>
        </Reveal>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 48,
  },
  greenEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  mintEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  lead: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    marginBottom: 10,
    opacity: 0.9,
  },
  body: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  link: {
    fontWeight: "700",
    marginBottom: 18,
  },
  chipRow: {
    gap: 10,
    marginBottom: 8,
  },
  chip: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  chipIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(9,156,45,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  chipTitle: {
    fontWeight: "800",
    fontSize: 15,
  },
  chipBody: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 17,
  },
  h2: {
    marginTop: 18,
    marginBottom: 12,
    fontSize: 22,
    fontWeight: "800",
  },
  pillar: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  pillarIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(9,156,45,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  pillarBadge: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  pillarTitle: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "800",
  },
  partnerCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  partnerLogo: {
    width: 120,
    height: 40,
    marginBottom: 10,
    borderRadius: 8,
  },
  partnerName: {
    fontWeight: "800",
    fontSize: 16,
  },
  highlight: {
    fontWeight: "600",
    fontSize: 13,
  },
  cta: {
    marginTop: 16,
    borderRadius: 18,
    padding: 18,
  },
  ctaTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  ctaBody: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  outlineBtn: {
    marginTop: 10,
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  outlineText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
