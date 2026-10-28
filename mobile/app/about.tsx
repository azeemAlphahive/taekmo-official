import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { BackButton } from "../src/components/BackButton";
import { PageHero } from "../src/components/PageHero";
import { Reveal, emitAppScroll } from "../src/components/Reveal";
import { PrimaryButton, Screen } from "../src/components/ui";
import { useScrollToTopOnFocus } from "../src/hooks/useScrollToTopOnFocus";
import { aboutPage, partners } from "../src/data/content";
import { assetUrl } from "../src/config";
import { useTheme } from "../src/theme-context";
import { spacing } from "../src/theme";

export default function AboutScreen() {
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
          eyebrow={aboutPage.hero.eyebrow}
          title={aboutPage.hero.title}
          description={aboutPage.hero.description}
          imageSrc="/images/solutions/commercial.jpg"
        />

        <Reveal style={styles.content}>
          <Image
            source={{ uri: assetUrl("/images/solutions/commercial.jpg") }}
            style={styles.heroImage}
            contentFit="cover"
          />

          <Text style={[styles.storyTitle, { color: t.text }]}>
            {aboutPage.story.title}
          </Text>
          <Text style={[styles.lead, { color: t.text }]}>
            {aboutPage.story.lead}
          </Text>
          {aboutPage.story.paragraphs.map((p) => (
            <Text key={p.slice(0, 40)} style={[styles.body, { color: t.muted }]}>
              {p}
            </Text>
          ))}
          <View
            style={[
              styles.hqCard,
              { backgroundColor: t.surface, borderColor: t.border },
            ]}
          >
            <Text style={[styles.hqLabel, { color: t.green }]}>
              {aboutPage.headquarters.label}
            </Text>
            <Text style={[styles.hqValue, { color: t.textSecondary }]}>
              {aboutPage.headquarters.address}
            </Text>
          </View>

          <Text style={[styles.greenEyebrow, { color: t.green }]}>
            {aboutPage.why.eyebrow}
          </Text>
          <Text style={[styles.h2, { color: t.text }]}>
            {aboutPage.why.title}
          </Text>
          {aboutPage.why.items.map((item, i) => (
            <View
              key={item.id}
              style={[
                styles.whyCard,
                { backgroundColor: t.surface, borderColor: t.border },
              ]}
            >
              <Text style={[styles.whyIndex, { color: t.mint }]}>
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Text style={[styles.whyTitle, { color: t.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.body, { color: t.muted }]}>
                {item.description}
              </Text>
            </View>
          ))}

          <Text style={[styles.greenEyebrow, { color: t.green }]}>
            Priority markets
          </Text>
          <Text style={[styles.h2, { color: t.text }]}>
            Focused where solar growth is accelerating
          </Text>
          <View style={styles.markets}>
            {aboutPage.markets.map((m) => (
              <View
                key={m.id}
                style={[styles.market, { backgroundColor: t.ink }]}
              >
                <Text style={[styles.marketRegion, { color: t.mint }]}>
                  {m.region}
                </Text>
                <Text style={styles.marketFocus}>{m.focus}</Text>
              </View>
            ))}
          </View>

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

          <PrimaryButton
            label="Contact us"
            onPress={() => router.push("/contact")}
          />
          <View style={{ height: 10 }} />
          <PrimaryButton
            label="View products"
            onPress={() => router.push("/products")}
          />
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
  heroImage: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    marginBottom: 18,
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
    marginBottom: 10,
  },
  lead: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    marginBottom: 10,
    opacity: 0.9,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 10,
  },
  hqCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  hqLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  hqValue: {
    fontSize: 13,
    lineHeight: 19,
  },
  greenEyebrow: {
    marginTop: 18,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  h2: {
    marginTop: 6,
    marginBottom: 12,
    fontSize: 22,
    fontWeight: "800",
  },
  whyCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  whyIndex: {
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 4,
  },
  whyTitle: {
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 4,
  },
  markets: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  market: {
    width: "47%",
    borderRadius: 14,
    padding: 14,
  },
  marketRegion: {
    fontWeight: "800",
    fontSize: 14,
  },
  marketFocus: {
    marginTop: 4,
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
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
});
