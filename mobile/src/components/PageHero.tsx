import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { assetUrl } from "../config";
import { colors, spacing } from "../theme";

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc = "/images/hero/solar-farm.jpg",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc?: string;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 28 }]}>
      <Image
        source={{ uri: assetUrl(imageSrc) }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={styles.dim} />
      <View style={styles.inner}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.ink,
    paddingBottom: 36,
    overflow: "hidden",
  },
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(16,18,23,0.72)",
  },
  inner: {
    paddingHorizontal: spacing.lg,
  },
  eyebrow: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.4,
    lineHeight: 38,
  },
  body: {
    marginTop: 12,
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 420,
  },
});
