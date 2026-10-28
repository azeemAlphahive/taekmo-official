import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BackButton } from "../src/components/BackButton";
import { PageHero } from "../src/components/PageHero";
import { Reveal, emitAppScroll } from "../src/components/Reveal";
import { PrimaryButton, Screen } from "../src/components/ui";
import { useScrollToTopOnFocus } from "../src/hooks/useScrollToTopOnFocus";
import { technologyPage } from "../src/data/content";
import { useTheme } from "../src/theme-context";
import { spacing } from "../src/theme";

const ICONS = [
  "flash-outline",
  "layers-outline",
  "shield-checkmark-outline",
  "sunny-outline",
] as const;

export default function TechnologyScreen() {
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
          eyebrow={technologyPage.hero.eyebrow}
          title={technologyPage.hero.title}
          description={technologyPage.hero.description}
          imageSrc="/images/solutions/industrial.jpg"
        />
        <Reveal style={styles.content}>
          {technologyPage.items.map((item, i) => (
            <View
              key={item.title}
              style={[
                styles.card,
                { backgroundColor: t.surface, borderColor: t.border },
              ]}
            >
              <View style={styles.cardTop}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name={ICONS[i % ICONS.length]}
                    size={20}
                    color={t.green}
                  />
                </View>
                <Text style={[styles.index, { color: t.mint }]}>
                  {String(i + 1).padStart(2, "0")}
                </Text>
              </View>
              <Text style={[styles.title, { color: t.text }]}>{item.title}</Text>
              <Text style={[styles.body, { color: t.muted }]}>{item.body}</Text>
            </View>
          ))}
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
    gap: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(9,156,45,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  index: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: {
    fontWeight: "800",
    fontSize: 17,
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
  },
});
