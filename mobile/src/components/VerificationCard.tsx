import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BarcodeScannerModal } from "./BarcodeScannerModal";
import { useToast } from "./Toast";
import { verificationContent } from "../data/content";
import { colors } from "../theme";

function normalizeCode(raw: string) {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function VerificationCard() {
  const toast = useToast();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);

  function openResult(raw: string) {
    const value = normalizeCode(raw);
    if (value.length < 6) {
      toast.error("Enter a product number with at least 6 characters.");
      return;
    }
    setLoading(true);
    setCode("");
    router.push({
      pathname: "/verify/result",
      params: { barcode: value },
    });
    setLoading(false);
  }

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <View style={styles.qrWrap}>
          <Ionicons name="qr-code-outline" size={18} color={colors.green} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{verificationContent.title}</Text>
          <Text style={styles.instruction}>
            {verificationContent.instruction}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder={verificationContent.placeholder}
            placeholderTextColor="rgba(255,255,255,0.35)"
            autoCapitalize="characters"
            style={styles.input}
          />
          <Pressable
            onPress={() => setScanOpen(true)}
            style={styles.scanBtn}
            accessibilityLabel="Scan barcode with camera"
          >
            <Ionicons name="barcode-outline" size={20} color={colors.mint} />
          </Pressable>
        </View>
        <Pressable onPress={() => openResult(code)} style={styles.submit}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Ionicons name="arrow-forward" size={18} color={colors.white} />
          )}
        </Pressable>
      </View>

      <BarcodeScannerModal
        visible={scanOpen}
        onClose={() => setScanOpen(false)}
        onScan={(value) => {
          setScanOpen(false);
          setCode("");
          openResult(value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(9,156,45,0.55)",
    backgroundColor: "rgba(18,22,28,0.88)",
    padding: 14,
  },
  head: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  qrWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(9,156,45,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
  instruction: {
    marginTop: 3,
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    lineHeight: 17,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  inputWrap: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    color: colors.white,
    fontSize: 14,
  },
  scanBtn: {
    width: 42,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  submit: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
});
