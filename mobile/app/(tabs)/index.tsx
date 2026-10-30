import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FadeIn } from "../../src/components/FadeIn";
import { ProductCard } from "../../src/components/ProductCard";
import { Reveal, emitAppScroll } from "../../src/components/Reveal";
import { SolutionCard } from "../../src/components/SolutionCard";
import { DistributorCarousel } from "../../src/components/DistributorCarousel";
import { TeamCarousel } from "../../src/components/TeamCarousel";
import { NewsletterSection } from "../../src/components/NewsletterSection";
import { VerificationCard } from "../../src/components/VerificationCard";
import { PrimaryButton, Screen } from "../../src/components/ui";
import { useScrollToTopOnFocus } from "../../src/hooks/useScrollToTopOnFocus";
import {
  distributors,
  features,
  heroContent,
  insights,
  partners,
  salesLeadership,
  solutions,
  stats,
} from "../../src/data/content";
import { featuredProducts } from "../../src/data/products";
import { assetUrl } from "../../src/config";
import { colors, spacing } from "../../src/theme";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const cardW = Math.min(210, width * 0.62);
  const scrollRef = useScrollToTopOnFocus();

  return (
    <Screen>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        bounces
        onScroll={emitAppScroll}
        scrollEventThrottle={64}
      >
        <View style={styles.hero}>
          <Image
            source={{
              uri: assetUrl("/images/hero/taekmo-hero-background.jpg"),
            }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <View style={styles.heroDim} />
          <View style={[styles.heroInner, { paddingTop: insets.top + 12 }]}>
            <FadeIn delay={40} style={styles.heroLogoWrap}>
              <Image
                source={require("../../assets/logo-light.png")}
                style={styles.heroLogo}
                contentFit="contain"
              />
            </FadeIn>
            <FadeIn delay={100}>
              <Text style={styles.eyebrow}>{heroContent.eyebrow}</Text>
            </FadeIn>
            <FadeIn delay={160}>
              <Text style={styles.heroTitle}>
                {heroContent.headline}{" "}
                <Text style={{ color: colors.mint }}>
                  {heroContent.headlineAccent}
                </Text>
              </Text>
            </FadeIn>
            <FadeIn delay={180}>
              <Text style={styles.heroBody}>{heroContent.description}</Text>
            </FadeIn>
            <FadeIn delay={240} style={styles.heroActions}>
              <PrimaryButton
                label={heroContent.primaryCta}
                onPress={() => router.push("/products")}
              />
              <Pressable
                onPress={() => router.push("/about")}
                style={styles.ghostBtn}
              >
                <View style={styles.playDot}>
                  <Ionicons name="play" size={12} color={colors.white} />
                </View>
                <Text style={styles.ghostText}>{heroContent.secondaryCta}</Text>
              </Pressable>
            </FadeIn>
            <FadeIn delay={320} style={{ marginTop: 16 }}>
              <VerificationCard />
            </FadeIn>
          </View>
        </View>

        <Reveal
          style={[
            styles.section,
            {
              backgroundColor: colors.white,
              paddingTop: 28,
              paddingBottom: 24,
            },
          ]}
        >
          <Text style={styles.greenEyebrow}>Our partners</Text>
          <Text style={styles.h2}>Backed by C&D Xiamen and Talesun</Text>
          <Text style={styles.sub}>
            TAEKMO stands on a Fortune Global 500 industrial group and a BNEF
            Tier 1 module manufacturer.
          </Text>
          {partners.map((p, i) => (
            <Reveal key={p.id} delay={i * 50} style={styles.partnerCard}>
              <Image
                source={{ uri: assetUrl(p.logo) }}
                style={styles.partnerLogo}
                contentFit="contain"
                contentPosition="left"
              />
              <View style={styles.partnerDivider} />
              <Text style={styles.partnerRole}>
                {p.role} · {p.credential}
              </Text>
              <Text style={styles.partnerName}>{p.shortName}</Text>
              <Text style={styles.partnerFull}>{p.name}</Text>
              <Text style={styles.partnerHighlight}>{p.highlight}</Text>
            </Reveal>
          ))}
        </Reveal>

        <Reveal style={[styles.section, { backgroundColor: colors.page }]}>
          <Text style={styles.greenEyebrow}>Pakistan network</Text>
          <Text style={styles.h2}>Our distributors in Pakistan</Text>
          <Text style={styles.sub}>
            Authorized local partners for genuine TAEKMO modules — supply,
            project support, and nationwide reach.
          </Text>
        </Reveal>
        <View style={styles.distributorRail}>
          <DistributorCarousel items={distributors} />
        </View>

        <Reveal style={[styles.section, { backgroundColor: colors.white }]}>
          <Text style={styles.greenEyebrow}>TAEKMO · Pakistan</Text>
          <Text style={styles.h2}>Meet our team</Text>
          <Text style={styles.sub}>
            Local leadership for distributor partnerships, sales support, and
            project follow-through.
          </Text>
        </Reveal>
        <View style={styles.teamRail}>
          <TeamCarousel items={salesLeadership} />
        </View>

        <Reveal style={[styles.section, { backgroundColor: colors.page }]}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.h2}>Our Product Range</Text>
              <Text style={styles.sub}>
                High-reliability N-type modules — from lower to higher watt
                class.
              </Text>
            </View>
            <Pressable onPress={() => router.push("/products")}>
              <Text style={styles.link}>View All</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productRail}
            decelerationRate="fast"
            snapToInterval={cardW + 12}
          >
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} width={cardW} />
            ))}
          </ScrollView>
        </Reveal>

        <Reveal style={styles.statsSection}>
          {stats.map((s) => (
            <View key={s.id} style={styles.statRow}>
              <View style={styles.statIcon}>
                <Ionicons name={s.icon} size={22} color={colors.green} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            </View>
          ))}
        </Reveal>

        <Reveal style={styles.solutionsSection}>
          <Image
            source={{ uri: assetUrl("/images/solutions/solutions-bg.jpg") }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <View style={styles.solutionsDim} />
          <View style={styles.sectionPad}>
            <Text style={styles.mintEyebrow}>Applications</Text>
            <Text style={styles.h2Light}>
              Solar Solutions for Every Application
            </Text>
            <Text style={styles.subLight}>
              From rooftops to utility-scale farms, TAEKMO designs systems
              matched to your energy goals.
            </Text>
            <Pressable
              onPress={() => router.push("/solutions")}
              style={styles.outlineBtn}
            >
              <Text style={styles.outlineText}>Explore Solutions</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.mint} />
            </Pressable>
            {solutions.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <SolutionCard
                  index={i}
                  title={s.title}
                  description={s.description}
                  image={s.image}
                />
              </Reveal>
            ))}
          </View>
        </Reveal>

        <Reveal style={[styles.section, { backgroundColor: colors.white }]}>
          <Text style={styles.h2}>Why Choose TAEKMO?</Text>
          <Text style={styles.sub}>
            Built for performance, reliability, and a cleaner energy future.
          </Text>
          {features.map((f, i) => (
            <Reveal key={f.id} delay={i * 40} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Ionicons name={f.icon} size={20} color={colors.green} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureBody}>{f.description}</Text>
              </View>
            </Reveal>
          ))}
          <Pressable
            style={styles.storyCard}
            onPress={() => router.push("/about")}
          >
            <Image
              source={{ uri: assetUrl("/images/promo/technician.jpg") }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
            <View style={styles.storyDim} />
            <View style={styles.storyBody}>
              <View style={{ flex: 1 }}>
                <Text style={styles.mintEyebrow}>Our Story</Text>
                <Text style={styles.storyTitle}>
                  The Power of Solar in Your Hands
                </Text>
              </View>
              <View style={styles.playCircle}>
                <Ionicons name="play" size={18} color={colors.white} />
              </View>
            </View>
          </Pressable>
        </Reveal>

        <Reveal style={styles.section}>
          <Text style={styles.greenEyebrow}>Trending · Insights</Text>
          <Text style={styles.h2}>Latest from TAEKMO & Talesun</Text>
          <Text style={styles.sub}>
            Bankability updates, brand news, and technology highlights that
            matter for your next project.
          </Text>
          {insights.map((item, i) => (
            <Reveal key={item.id} delay={i * 50} style={styles.insightCard}>
              <Image
                source={{ uri: assetUrl(item.image) }}
                style={styles.insightImg}
                contentFit="cover"
              />
              <View style={styles.insightBody}>
                <Text style={styles.insightMeta}>
                  {item.category} · {item.date}
                </Text>
                <Text style={styles.insightTitle}>{item.title}</Text>
                <Text style={styles.insightExcerpt}>{item.excerpt}</Text>
              </View>
            </Reveal>
          ))}
        </Reveal>

        <Reveal style={styles.bottomBand}>
          <Image
            source={{ uri: assetUrl("/images/solutions/solutions-bg.jpg") }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <View style={styles.bottomDim} />
          <Text style={styles.mintEyebrow}>Ready to start</Text>
          <Text style={styles.h2Light}>Shaping the future of energy</Text>
          <Text style={styles.subLight}>
            Spec BIPRO or HYPRO modules with C&D Xiamen and Talesun behind every
            watt — talk to TAEKMO about your next rooftop or utility project.
          </Text>
          <View style={styles.bottomActions}>
            <PrimaryButton
              label="Contact us"
              onPress={() => router.push("/contact")}
            />
            <Pressable
              onPress={() => router.push("/products")}
              style={styles.ghostBtn}
            >
              <Text style={styles.ghostText}>View products</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 18 }}>
            <VerificationCard />
          </View>
        </Reveal>

        <Reveal>
          <NewsletterSection />
        </Reveal>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.white,
    paddingBottom: 20,
    minHeight: 560,
  },
  heroDim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  heroInner: {
    paddingHorizontal: spacing.lg,
  },
  heroLogoWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    backgroundColor: "transparent",
  },
  heroLogo: {
    width: 280,
    height: 88,
    backgroundColor: "transparent",
  },
  productRail: {
    gap: 12,
    paddingRight: 4,
    paddingBottom: 4,
  },
  eyebrow: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
  },
  heroBody: {
    marginTop: 10,
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    lineHeight: 21,
  },
  heroActions: {
    marginTop: 16,
    gap: 10,
  },
  ghostBtn: {
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
  },
  playDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  ghostText: {
    color: colors.white,
    fontWeight: "700",
  },
  statsSection: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: 24,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.page,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    marginBottom: 10,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(9,156,45,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 13,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 28,
  },
  distributorRail: {
    marginTop: -8,
    paddingLeft: spacing.lg,
    paddingBottom: 20,
    backgroundColor: colors.page,
  },
  teamRail: {
    marginTop: -8,
    paddingLeft: spacing.lg,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },
  sectionPad: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 28,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  h2: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  h2Light: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 6,
  },
  sub: {
    marginTop: 6,
    marginBottom: 14,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  subLight: {
    marginTop: 8,
    marginBottom: 14,
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    color: colors.green,
    fontWeight: "700",
    marginBottom: 4,
  },
  solutionsSection: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#04100a",
  },
  solutionsDim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(4,16,10,0.88)",
  },
  mintEyebrow: {
    color: colors.mint,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  greenEyebrow: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  outlineBtn: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
  },
  outlineText: {
    color: colors.mint,
    fontWeight: "700",
  },
  featureRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(9,156,45,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    color: colors.ink,
    fontWeight: "700",
    fontSize: 14,
  },
  featureBody: {
    marginTop: 3,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  storyCard: {
    marginTop: 10,
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
  },
  storyDim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(4,16,10,0.45)",
  },
  storyBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 16,
    gap: 12,
  },
  storyTitle: {
    marginTop: 4,
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  insightCard: {
    backgroundColor: "#eef3ef",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  insightImg: {
    width: "100%",
    height: 140,
  },
  insightBody: {
    padding: 14,
  },
  insightMeta: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "700",
  },
  insightTitle: {
    marginTop: 6,
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
  },
  insightExcerpt: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  partnerCard: {
    backgroundColor: colors.page,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },
  partnerLogo: {
    width: "100%",
    maxWidth: 180,
    height: 52,
    marginBottom: 4,
    alignSelf: "flex-start",
    backgroundColor: "transparent",
  },
  partnerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  partnerRole: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  partnerName: {
    marginTop: 4,
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800",
  },
  partnerFull: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 13,
  },
  partnerHighlight: {
    marginTop: 8,
    color: colors.green,
    fontSize: 13,
    fontWeight: "600",
  },
  bottomBand: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 32,
    paddingBottom: 28,
    backgroundColor: colors.ink,
  },
  bottomDim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(16,18,23,0.82)",
  },
  bottomActions: {
    gap: 10,
  },
});
