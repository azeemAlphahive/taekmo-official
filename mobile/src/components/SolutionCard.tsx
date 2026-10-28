import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { assetUrl } from "../config";
import { colors } from "../theme";

export function SolutionCard({
  index,
  title,
  description,
  image,
}: {
  index: number;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <Pressable style={styles.card} onPress={() => router.push("/solutions")}>
      <Image
        source={{ uri: assetUrl(image) }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={styles.grad} />
      <View style={styles.body}>
        <Text style={styles.badge}>
          {String(index + 1).padStart(2, "0")} · Solution
        </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc} numberOfLines={3}>
          {description}
        </Text>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>Explore</Text>
          <Ionicons
            name="arrow-up"
            size={14}
            color={colors.white}
            style={{ transform: [{ rotate: "45deg" }] }}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 240,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 14,
  },
  grad: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(4,16,10,0.55)",
  },
  body: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.12)",
    color: colors.mint,
    overflow: "hidden",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 10,
    color: colors.white,
    fontSize: 18,
    fontWeight: "800",
  },
  desc: {
    marginTop: 6,
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    lineHeight: 17,
  },
  cta: {
    marginTop: 12,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.green,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  ctaText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 13,
  },
});
