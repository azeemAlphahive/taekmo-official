import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

export function BarcodeScannerModal({
  visible,
  onClose,
  onScan,
}: {
  visible: boolean;
  onClose: () => void;
  onScan: (value: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (visible) setLocked(false);
  }, [visible]);

  useEffect(() => {
    if (visible && permission && !permission.granted) {
      void requestPermission();
    }
  }, [visible, permission, requestPermission]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        {permission?.granted ? (
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: [
                "qr",
                "code128",
                "code39",
                "ean13",
                "ean8",
                "upc_a",
                "upc_e",
                "datamatrix",
              ],
            }}
            onBarcodeScanned={
              locked
                ? undefined
                : ({ data }) => {
                    const value = String(data || "")
                      .trim()
                      .toUpperCase()
                      .replace(/\s+/g, "");
                    if (value.length < 4) return;
                    setLocked(true);
                    onScan(value);
                    onClose();
                  }
            }
          />
        ) : (
          <View style={styles.permission}>
            <Text style={styles.permissionTitle}>Camera access needed</Text>
            <Text style={styles.permissionBody}>
              Allow camera permission to scan the Product No. barcode on your
              module label.
            </Text>
            <Pressable style={styles.permBtn} onPress={() => void requestPermission()}>
              <Text style={styles.permBtnText}>Allow camera</Text>
            </Pressable>
          </View>
        )}

        <View style={[styles.top, { paddingTop: insets.top + 8 }]}>
          <Text style={styles.title}>Scan barcode</Text>
          <Pressable onPress={onClose} style={styles.close}>
            <Ionicons name="close" size={22} color={colors.white} />
          </Pressable>
        </View>
        <View style={styles.frameWrap} pointerEvents="none">
          <View style={styles.frame} />
          <Text style={styles.hint}>
            Align the Product No. barcode inside the frame
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  top: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  frameWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: "78%",
    aspectRatio: 1.6,
    borderWidth: 2,
    borderColor: colors.mint,
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  hint: {
    marginTop: 16,
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  permission: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  permissionTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800",
  },
  permissionBody: {
    marginTop: 10,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    lineHeight: 20,
  },
  permBtn: {
    marginTop: 18,
    backgroundColor: colors.green,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  permBtnText: {
    color: colors.white,
    fontWeight: "700",
  },
});
