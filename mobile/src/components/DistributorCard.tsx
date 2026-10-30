import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { assetSource } from "../config";
import { colors } from "../theme";

export function DistributorCard({
  name,
  shortName,
  location,
  role,
  highlight,
  logo,
  logoOnDark,
  compact,
}: {
  name: string;
  shortName: string;
  location: string;
  role: string;
  highlight: string;
  logo: string;
  logoOnDark?: boolean;
  compact?: boolean;
}) {
  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <View
        style={[
          styles.logoWrap,
          compact && styles.logoWrapCompact,
          logoOnDark && styles.logoWrapDark,
        ]}
      >
        <Image
          source={assetSource(logo)}
          style={[styles.logo, compact && styles.logoCompact]}
          contentFit="contain"
        />
      </View>
      <Text style={styles.role}>
        {role}
        <Text style={styles.dot}> · </Text>
        {location}
      </Text>
      <Text style={[styles.shortName, compact && styles.shortNameCompact]}>
        {shortName}
      </Text>
      <Text style={styles.name} numberOfLines={compact ? 1 : undefined}>
        {name}
      </Text>
      <Text
        style={[styles.highlight, compact && styles.highlightCompact]}
        numberOfLines={compact ? 3 : undefined}
      >
        {highlight}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },
  cardCompact: {
    marginBottom: 0,
    height: 260,
  },
  logoWrap: {
    height: 76,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  logoWrapCompact: {
    height: 72,
  },
  logoWrapDark: {
    backgroundColor: colors.ink,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  logo: {
    width: "100%",
    height: 64,
  },
  logoCompact: {
    height: 56,
  },
  role: {
    marginTop: 12,
    color: colors.green,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  dot: {
    color: "rgba(9,156,45,0.45)",
  },
  shortName: {
    marginTop: 8,
    color: colors.ink,
    fontSize: 17,
    fontWeight: "800",
  },
  shortNameCompact: {
    fontSize: 16,
  },
  name: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 13,
  },
  highlight: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  highlightCompact: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 17,
  },
});
