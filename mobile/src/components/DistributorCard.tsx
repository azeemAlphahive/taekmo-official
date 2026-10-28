import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { assetUrl } from "../config";
import { colors } from "../theme";

export function DistributorCard({
  name,
  shortName,
  location,
  role,
  highlight,
  logo,
  logoOnDark,
}: {
  name: string;
  shortName: string;
  location: string;
  role: string;
  highlight: string;
  logo: string;
  logoOnDark?: boolean;
}) {
  return (
    <View style={styles.card}>
      <View style={[styles.logoWrap, logoOnDark && styles.logoWrapDark]}>
        <Image
          source={{ uri: assetUrl(logo) }}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      <Text style={styles.role}>
        {role}
        <Text style={styles.dot}> · </Text>
        {location}
      </Text>
      <Text style={styles.shortName}>{shortName}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.highlight}>{highlight}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#04100a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  logoWrap: {
    height: 56,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  logoWrapDark: {
    backgroundColor: colors.ink,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  logo: {
    width: 160,
    height: 44,
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
});
