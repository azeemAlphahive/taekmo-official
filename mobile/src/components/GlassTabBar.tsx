import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme-context";
import { colors } from "../theme"; // kept for commented theme-toggle styles

const ICONS: Record<
  string,
  { active: keyof typeof Ionicons.glyphMap; idle: keyof typeof Ionicons.glyphMap }
> = {
  index: { active: "home", idle: "home-outline" },
  products: { active: "grid", idle: "grid-outline" },
  verify: { active: "shield-checkmark", idle: "shield-checkmark-outline" },
  contact: { active: "mail", idle: "mail-outline" },
  more: { active: "menu", idle: "menu-outline" },
};

/** Expo Router 58 custom tab bar — glass floating pill + theme toggle. */
export function GlassTabBar(props: Record<string, unknown>) {
  const { colors: t } = useTheme();
  // Light/dark toggle — commented for now
  // const { colors: t, isDark, toggle } = useTheme();
  const state = props.state as {
    index: number;
    routes: { key: string; name: string }[];
  };
  const descriptors = props.descriptors as Record<
    string,
    { options: { title?: string; tabBarLabel?: unknown } }
  >;
  const emitter = props.emitter as {
    emit: (event: {
      type: string;
      target: string;
      canPreventDefault?: boolean;
    }) => { defaultPrevented: boolean };
  };
  const navigateToTab = props.navigateToTab as (routeKey: string) => void;
  const propInsets = props.insets as { bottom?: number } | undefined;
  const safe = useSafeAreaInsets();
  const bottom = Math.max(propInsets?.bottom ?? safe.bottom, 10);

  return (
    <View style={[styles.wrap, { bottom }]} pointerEvents="box-none">
      <View
        style={[
          styles.shell,
          {
            borderColor: t.tabBarBorder,
            backgroundColor: Platform.OS === "ios" ? "rgba(16,18,23,0.42)" : t.tabBarBg,
          },
        ]}
      >
        {Platform.OS === "ios" ? (
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: t.tabBarBg }]}
          />
        )}
        <View style={styles.shine} />
        <View style={styles.row}>
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const { options } = descriptors[route.key];
            const label =
              (typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : undefined) ||
              options.title ||
              route.name;
            const icons = ICONS[route.name] ?? {
              active: "ellipse" as const,
              idle: "ellipse-outline" as const,
            };

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={focused ? { selected: true } : {}}
                onPress={() => {
                  const event = emitter.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!focused && !event.defaultPrevented) {
                    navigateToTab(route.key);
                  }
                }}
                onLongPress={() =>
                  emitter.emit({
                    type: "tabLongPress",
                    target: route.key,
                  })
                }
                style={styles.item}
              >
                <View
                  style={[styles.iconWrap, focused && styles.iconWrapActive]}
                >
                  <Ionicons
                    name={focused ? icons.active : icons.idle}
                    size={20}
                    color={focused ? t.tabActive : t.tabIdle}
                  />
                </View>
                <Text
                  style={[
                    styles.label,
                    { color: focused ? t.tabActive : "rgba(255,255,255,0.45)" },
                    focused && styles.labelActive,
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}

          {/* Light / Dark mode toggle — commented for now
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            onPress={toggle}
            style={styles.themeItem}
          >
            <View style={styles.themeWrap}>
              <Ionicons
                name={isDark ? "sunny-outline" : "moon-outline"}
                size={18}
                color={colors.mint}
              />
            </View>
            <Text style={styles.themeLabel}>{isDark ? "Light" : "Dark"}</Text>
          </Pressable>
          */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 10,
    right: 10,
  },
  shell: {
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 18,
  },
  shine: {
    ...StyleSheet.absoluteFill,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 64,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  themeItem: {
    width: 52,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  iconWrap: {
    width: 36,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: "rgba(110,247,77,0.16)",
  },
  themeWrap: {
    width: 36,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(110,247,77,0.12)",
    borderWidth: 1,
    borderColor: "rgba(110,247,77,0.28)",
  },
  label: {
    fontSize: 9,
    fontWeight: "600",
  },
  labelActive: {
    fontWeight: "700",
  },
  themeLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.mint,
  },
});
