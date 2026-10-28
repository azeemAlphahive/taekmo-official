import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { PageHero } from "../../src/components/PageHero";
import { ProductCard } from "../../src/components/ProductCard";
import { Reveal, emitAppScroll } from "../../src/components/Reveal";
import { VerificationCard } from "../../src/components/VerificationCard";
import { Screen } from "../../src/components/ui";
import { useScrollToTopOnFocus } from "../../src/hooks/useScrollToTopOnFocus";
import { products } from "../../src/data/products";
import { colors, spacing } from "../../src/theme";

type FilterId = "all" | "solar-panels";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "solar-panels", label: "Solar Panels" },
];

export default function ProductsScreen() {
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<FilterId>("all");
  const gap = 12;
  const pad = spacing.lg;
  const cardWidth = (width - pad * 2 - gap) / 2;
  const listRef = useScrollToTopOnFocus();

  const filtered = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <Screen style={{ backgroundColor: colors.white }}>
      <FlatList
        ref={listRef}
        data={filtered}
        keyExtractor={(item) => item.slug}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        extraData={filter}
        onScroll={emitAppScroll}
        scrollEventThrottle={64}
        ListHeaderComponent={
          <View>
            <PageHero
              eyebrow="TAEKMO CATALOGUE"
              title="Our Product Range"
              description="High-reliability N-type modules for international utility, C&I, and distributed projects — matching the official TAEKMO catalogue."
              imageSrc="/images/solutions/commercial.jpg"
            />
            <Reveal style={styles.catalogueHead}>
              <Text style={styles.h2}>All Products</Text>
              <Text style={styles.sub}>
                TAEKMO N-type modules — sorted from lower to higher watt class.
              </Text>
              <View style={styles.filter}>
                {FILTERS.map((item) => {
                  const active = filter === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => setFilter(item.id)}
                      style={[
                        styles.filterChip,
                        active ? styles.filterActive : styles.filterIdle,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterText,
                          active ? styles.filterTextActive : styles.filterTextIdle,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Text style={styles.count}>
                {filtered.length} module{filtered.length === 1 ? "" : "s"}
              </Text>
            </Reveal>
          </View>
        }
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <Reveal delay={(index % 4) * 40} style={{ width: cardWidth }}>
            <ProductCard product={item} width={cardWidth} />
          </Reveal>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No products in this category yet.</Text>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.note}>
              Confirm exact datasheet values with your TAEKMO quote.
            </Text>
            <View style={styles.verifyWrap}>
              <Text style={styles.h2Light}>Verify your module</Text>
              <Text style={styles.subLight}>
                Confirm authenticity with the same Product No. database as the
                website.
              </Text>
              <VerificationCard />
            </View>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 120,
  },
  catalogueHead: {
    paddingHorizontal: spacing.lg,
    paddingTop: 24,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
  h2: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "800",
  },
  sub: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  filter: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
    marginBottom: 8,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  filterActive: {
    backgroundColor: colors.ink,
  },
  filterIdle: {
    backgroundColor: "#eef1ef",
  },
  filterText: {
    fontSize: 12,
    fontWeight: "700",
  },
  filterTextActive: {
    color: colors.white,
  },
  filterTextIdle: {
    color: colors.muted,
  },
  count: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    color: colors.muted,
    paddingVertical: 40,
    paddingHorizontal: spacing.lg,
  },
  row: {
    paddingHorizontal: spacing.lg,
    justifyContent: "space-between",
    marginBottom: 12,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: 8,
  },
  note: {
    color: colors.muted,
    fontSize: 11,
    marginBottom: 20,
  },
  verifyWrap: {
    backgroundColor: colors.ink,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  h2Light: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },
  subLight: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
});
