import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BackButton } from "./BackButton";
import { PageHero } from "./PageHero";
import { Reveal, emitAppScroll } from "./Reveal";
import { Screen } from "./ui";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import {
  legalDocuments,
  type LegalDocument,
} from "../data/legal";
import { useTheme } from "../theme-context";
import { spacing } from "../theme";

export function LegalDocumentScreen({
  slug,
}: {
  slug: LegalDocument["slug"];
}) {
  const doc = legalDocuments[slug];
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
        contentContainerStyle={styles.bottomPad}
      >
        <PageHero
          eyebrow={doc.eyebrow}
          title={doc.title}
          description={doc.description}
          imageSrc="/images/hero/solar-farm.jpg"
        />

        <Reveal style={styles.content}>
          <Text style={[styles.updated, { color: t.muted }]}>
            Last updated · {doc.lastUpdated}
          </Text>

          {doc.sections.map((section) => (
            <View
              key={section.heading}
              style={[
                styles.card,
                { backgroundColor: t.surface, borderColor: t.border },
              ]}
            >
              <Text style={[styles.heading, { color: t.text }]}>
                {section.heading}
              </Text>
              {section.paragraphs.map((p) => (
                <Text
                  key={p.slice(0, 40)}
                  style={[styles.body, { color: t.muted }]}
                >
                  {p}
                </Text>
              ))}
              {section.bullets?.map((b) => (
                <Text
                  key={b.slice(0, 36)}
                  style={[styles.bullet, { color: t.muted }]}
                >
                  • {b}
                </Text>
              ))}
            </View>
          ))}
        </Reveal>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bottomPad: {
    paddingBottom: 48,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: 18,
    gap: 12,
  },
  updated: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  body: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
  },
  bullet: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    paddingLeft: 2,
  },
});
