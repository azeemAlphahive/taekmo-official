import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

export function BackButton({ light = true }: { light?: boolean }) {
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      onPress={() => router.back()}
      style={[styles.btn, { top: Math.max(insets.top, 10) + 6 }]}
      hitSlop={10}
      accessibilityLabel="Go back"
    >
      <Ionicons
        name="chevron-back"
        size={22}
        color={light ? colors.white : colors.ink}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    left: 14,
    zIndex: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(16,18,23,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
});
