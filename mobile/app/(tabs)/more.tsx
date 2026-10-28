import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FadeIn } from "../../src/components/FadeIn";
import { Screen } from "../../src/components/ui";
import { useScrollToTopOnFocus } from "../../src/hooks/useScrollToTopOnFocus";
import { siteConfig } from "../../src/data/content";
import { useTheme } from "../../src/theme-context";
import { spacing } from "../../src/theme";

const links = [
  {
    title: "Official Website",
    subtitle: siteConfig.url.replace("https://", ""),
    href: "website",
    icon: "globe-outline" as const,
  },
  {
    title: "About TAEKMO",
    subtitle: "Talesun international brand under C&D Group",
    href: "/about",
    icon: "information-circle-outline" as const,
  },
  {
    title: "Solutions",
    subtitle: "Residential, C&I, industrial & utility",
    href: "/solutions",
    icon: "sunny-outline" as const,
  },
  {
    title: "Technology",
    subtitle: "BIPRO TOPCon & HYPRO HJT platforms",
    href: "/technology",
    icon: "flash-outline" as const,
  },
  {
    title: "Verify products",
    subtitle: "Check authenticity by Product No.",
    href: "/verify",
    icon: "shield-checkmark-outline" as const,
  },
  {
    title: "Contact Us",
    subtitle: "Message the TAEKMO sales team",
    href: "/contact",
    icon: "mail-outline" as const,
  },
];

export default function MoreScreen() {
  const insets = useSafeAreaInsets();
  const { colors: t } = useTheme();
  const scrollRef = useScrollToTopOnFocus();
  // Light/dark — commented for now
  // const { colors: t, isDark, toggle, mode } = useTheme();

  function onPress(href: string) {
    if (href === "website") {
      void Linking.openURL(siteConfig.url);
      return;
    }
    router.push(href as never);
  }

  return (
    <Screen>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn>
          <Text style={[styles.eyebrow, { color: t.green }]}>Menu</Text>
          <Text style={[styles.heading, { color: t.text }]}>
            {siteConfig.name}
          </Text>
          <Text style={[styles.tagline, { color: t.textSecondary }]}>
            {siteConfig.tagline}
          </Text>
        </FadeIn>

        {/* Appearance / Light-Dark toggle — commented for now
        <FadeIn delay={40}>
          <Pressable
            onPress={toggle}
            style={[
              styles.themeCard,
              {
                backgroundColor: t.surface,
                borderColor: t.border,
              },
            ]}
          >
            <View
              style={[
                styles.themeIcon,
                { backgroundColor: "rgba(9,156,45,0.12)" },
              ]}
            >
              <Ionicons
                name={isDark ? "sunny" : "moon"}
                size={20}
                color={t.green}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.themeTitle, { color: t.text }]}>
                Appearance
              </Text>
              <Text style={[styles.themeSub, { color: t.muted }]}>
                Currently {mode} mode
              </Text>
            </View>
            <View
              style={[
                styles.togglePill,
                {
                  backgroundColor: isDark
                    ? "rgba(110,247,77,0.16)"
                    : "rgba(9,156,45,0.12)",
                },
              ]}
            >
              <Text style={[styles.toggleText, { color: t.green }]}>
                {isDark ? "Light" : "Dark"}
              </Text>
            </View>
          </Pressable>
        </FadeIn>
        */}

        <Text style={[styles.sectionLabel, { color: t.muted }]}>Explore</Text>

        {links.map((item, i) => (
          <FadeIn key={item.href} delay={60 + i * 35}>
            <Pressable
              style={[
                styles.row,
                {
                  backgroundColor: t.surface,
                  borderColor: t.border,
                },
              ]}
              onPress={() => onPress(item.href)}
            >
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: "rgba(9,156,45,0.1)" },
                ]}
              >
                <Ionicons name={item.icon} size={20} color={t.green} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: t.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.sub, { color: t.muted }]}>
                  {item.subtitle}
                </Text>
              </View>
              <Ionicons
                name={
                  item.href === "website" ? "open-outline" : "chevron-forward"
                }
                size={18}
                color={t.muted}
              />
            </Pressable>
          </FadeIn>
        ))}

        <Text style={[styles.footer, { color: t.muted }]}>
          Official TAEKMO app · {siteConfig.email}
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 120,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  tagline: {
    marginTop: 6,
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 20,
  },
  themeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 20,
  },
  themeIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  themeTitle: {
    fontWeight: "700",
    fontSize: 15,
  },
  themeSub: {
    marginTop: 2,
    fontSize: 12,
  },
  togglePill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "800",
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
  },
  sub: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 12,
  },
});
