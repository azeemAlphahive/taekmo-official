import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mainNav } from "../data/content";
import { colors, spacing } from "../theme";

type AppHeaderProps = {
  /** Transparent over hero (website home style). */
  transparent?: boolean;
  showBack?: boolean;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppHeader({
  transparent = false,
  showBack = false,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function go(href: string) {
    setOpen(false);
    router.push(href as never);
  }

  return (
    <>
      <View
        style={[styles.wrap, { paddingTop: Math.max(insets.top, 8) }]}
        pointerEvents="box-none"
      >
        <View
          style={[
            styles.bar,
            transparent ? styles.barTransparent : styles.barSolid,
          ]}
        >
          {showBack ? (
            <Pressable
              onPress={() => router.back()}
              style={styles.iconBtn}
              hitSlop={8}
            >
              <Ionicons name="chevron-back" size={22} color={colors.white} />
            </Pressable>
          ) : (
            <Pressable onPress={() => go("/")} style={styles.logoBtn}>
              <Image
                source={require("../../assets/logo-light.png")}
                style={styles.logo}
                contentFit="contain"
              />
            </Pressable>
          )}

          {showBack ? (
            <Pressable onPress={() => go("/")} style={styles.logoCenter}>
              <Image
                source={require("../../assets/logo-light.png")}
                style={styles.logo}
                contentFit="contain"
              />
            </Pressable>
          ) : (
            <View style={{ flex: 1 }} />
          )}

          <View style={styles.actions}>
            <Pressable
              onPress={() => go("/contact")}
              style={styles.contactBtn}
            >
              <Text style={styles.contactText}>Contact Us</Text>
            </Pressable>
            <Pressable
              onPress={() => setOpen(true)}
              style={styles.iconBtn}
              accessibilityLabel="Open menu"
            >
              <Ionicons name="menu" size={22} color={colors.white} />
            </Pressable>
          </View>
        </View>
      </View>

      <Modal
        visible={open}
        animationType="fade"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <View style={[styles.menuRoot, { paddingTop: insets.top + 8 }]}>
          <View style={styles.menuCard}>
            <View style={styles.menuTop}>
              <Image
                source={require("../../assets/logo-light.png")}
                style={styles.logo}
                contentFit="contain"
              />
              <Pressable onPress={() => setOpen(false)} style={styles.iconBtn}>
                <Ionicons name="close" size={22} color={colors.white} />
              </Pressable>
            </View>
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Pressable
                  key={item.href}
                  onPress={() => go(item.href)}
                  style={[styles.menuItem, active && styles.menuItemActive]}
                >
                  <Text
                    style={[
                      styles.menuLabel,
                      active && styles.menuLabelActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
            <Pressable
              onPress={() => go("/contact")}
              style={styles.menuContact}
            >
              <Text style={styles.contactText}>Contact Us</Text>
            </Pressable>
          </View>
          <Pressable style={styles.menuDismiss} onPress={() => setOpen(false)} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 50,
    paddingHorizontal: spacing.sm,
  },
  bar: {
    minHeight: 52,
    borderRadius: 999,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  barTransparent: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  barSolid: {
    backgroundColor: "rgba(16,18,23,0.82)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  logoBtn: {
    paddingVertical: 4,
    paddingRight: 4,
  },
  logoCenter: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 118,
    height: 34,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  contactBtn: {
    backgroundColor: colors.green,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  contactText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  menuRoot: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: spacing.sm,
  },
  menuCard: {
    backgroundColor: "rgba(16,18,23,0.96)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    padding: 14,
  },
  menuTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  menuItem: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  menuItemActive: {
    backgroundColor: "rgba(9,156,45,0.15)",
  },
  menuLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    fontWeight: "600",
  },
  menuLabelActive: {
    color: colors.mint,
  },
  menuContact: {
    marginTop: 12,
    backgroundColor: colors.green,
    borderRadius: 999,
    alignItems: "center",
    paddingVertical: 12,
  },
  menuDismiss: {
    flex: 1,
  },
});
