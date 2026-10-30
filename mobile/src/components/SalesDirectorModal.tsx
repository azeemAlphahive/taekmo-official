import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { assetSource } from "../config";
import { colors } from "../theme";

export type SalesDirector = {
  id: string;
  name: string;
  title: string;
  photo: string;
  /** expo-image object-position — use for tight/close-up portraits */
  photoPosition?: "center" | "top" | "bottom" | { top?: string; left?: string };
  message: string;
  email: string;
  phone: string;
};

export function SalesDirectorModal({
  person,
  visible,
  onClose,
}: {
  person: SalesDirector | null;
  visible: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  if (!person) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <View style={styles.handle} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.sheetScroll}
          >
            <Image
              source={assetSource(person.photo)}
              style={styles.photo}
              contentFit="cover"
              contentPosition={person.photoPosition ?? "top"}
            />
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.title}>{person.title}</Text>
            <Text style={styles.message}>{person.message}</Text>

            <Pressable
              style={styles.action}
              onPress={() => void Linking.openURL(`mailto:${person.email}`)}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="mail-outline" size={18} color={colors.green} />
              </View>
              <Text style={styles.actionText}>{person.email}</Text>
            </Pressable>

            {person.phone ? (
              <>
                <Pressable
                  style={styles.action}
                  onPress={() =>
                    void Linking.openURL(
                      `tel:${person.phone.replace(/\s/g, "")}`,
                    )
                  }
                >
                  <View style={styles.actionIcon}>
                    <Ionicons
                      name="call-outline"
                      size={18}
                      color={colors.green}
                    />
                  </View>
                  <Text style={styles.actionText}>{person.phone}</Text>
                </Pressable>
                <Pressable
                  style={styles.action}
                  onPress={() =>
                    void Linking.openURL(
                      `https://wa.me/${person.phone.replace(/\D/g, "")}`,
                    )
                  }
                >
                  <View style={styles.actionIcon}>
                    <Ionicons
                      name="logo-whatsapp"
                      size={18}
                      color={colors.green}
                    />
                  </View>
                  <Text style={styles.actionText}>{person.phone}</Text>
                </Pressable>
              </>
            ) : null}

            <Pressable style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(4,16,10,0.45)",
  },
  sheet: {
    maxHeight: "88%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sheetScroll: {
    paddingBottom: 8,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: 14,
  },
  photo: {
    width: "100%",
    height: 320,
    borderRadius: 16,
    backgroundColor: colors.ink,
  },
  name: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "800",
    color: colors.ink,
  },
  title: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: colors.green,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
  },
  action: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.page,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  actionIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: colors.ink,
  },
  closeBtn: {
    marginTop: 16,
    alignItems: "center",
    paddingVertical: 12,
  },
  closeText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.muted,
  },
});
