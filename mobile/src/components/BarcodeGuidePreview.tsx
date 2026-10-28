import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

/** Visual guide matching the website barcode-example.svg */
const BARS = [
  3, 2, 4, 2, 3, 1, 5, 2, 3, 1, 4, 2, 3, 1, 5, 2, 3, 4, 1, 3, 2, 5, 2, 1, 4, 3, 2,
  5, 1, 3, 2, 4, 1, 3, 2, 5, 2, 3, 1, 4, 2, 3,
];

export function BarcodeGuidePreview() {
  return (
    <View style={styles.root}>
      <View style={styles.labelCard}>
        <View style={styles.bars}>
          {BARS.map((w, i) => (
            <View key={`${i}-${w}`} style={[styles.bar, { width: w }]} />
          ))}
        </View>
        <Text style={styles.code}>TM-6A2B-84592173</Text>
      </View>
      <View style={styles.side}>
        <Text style={styles.sideTitle}>Module label</Text>
        <Text style={styles.sideSub}>example only</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#E8ECE9",
    borderRadius: 10,
    padding: 12,
  },
  labelCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#C5CEC8",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 8,
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 48,
    gap: 1.5,
    overflow: "hidden",
  },
  bar: {
    height: 48,
    backgroundColor: colors.ink,
    borderRadius: 0.5,
  },
  code: {
    marginTop: 8,
    fontFamily: "monospace",
    fontSize: 11,
    color: colors.ink,
    letterSpacing: 0.3,
  },
  side: {
    width: 88,
    height: 88,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#B7C4B9",
    backgroundColor: "#D7E0D8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  sideTitle: {
    color: "#12200D",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  sideSub: {
    marginTop: 4,
    color: "#5C6670",
    fontSize: 10,
    textAlign: "center",
  },
});
