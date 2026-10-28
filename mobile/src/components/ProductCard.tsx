import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { Product } from "../data/products";
import { assetUrl } from "../config";
import { colors } from "../theme";

export function ProductCard({
  product,
  width,
}: {
  product: Product;
  width?: number | `${number}%`;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        width != null ? { width } : null,
        pressed && styles.pressed,
      ]}
      onPress={() => router.push(`/product/${product.slug}`)}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: assetUrl(product.image) }}
          style={styles.image}
          contentFit="contain"
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.badge}>{product.categoryLabel}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.watt}>{product.wattLabel}</Text>
        <Text style={styles.feature} numberOfLines={2}>
          {product.featureLine}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{product.priceLabel}</Text>
          <View style={styles.arrow}>
            <Ionicons name="arrow-up" size={14} color={colors.white} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    shadowColor: "#04100a",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  pressed: {
    transform: [{ translateY: -4 }],
    shadowOpacity: 0.18,
  },
  imageWrap: {
    aspectRatio: 4 / 3,
    backgroundColor: "#f3f5f4",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  body: {
    padding: 12,
    flex: 1,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#eef1ef",
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden",
  },
  name: {
    marginTop: 8,
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 17,
  },
  watt: {
    marginTop: 4,
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800",
  },
  feature: {
    marginTop: 6,
    color: "#7a8f9c",
    fontSize: 11,
    lineHeight: 15,
    flexGrow: 1,
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    color: colors.green,
    fontSize: 12,
    fontWeight: "700",
  },
  arrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "45deg" }],
  },
});
