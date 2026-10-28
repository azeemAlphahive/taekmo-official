import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "./Toast";
import { subscribeNewsletter } from "../api";
import { siteConfig } from "../data/content";
import { colors, spacing } from "../theme";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubscribe() {
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      toast.error("Enter a valid email address.");
      return;
    }
    setLoading(true);
    const loadingId = toast.loading("Subscribing…");
    try {
      const res = await subscribeNewsletter(value);
      toast.dismiss(loadingId);
      if (!res.ok) {
        toast.error(res.data.message || "Could not subscribe.");
        return;
      }
      toast.success(
        res.data.alreadySubscribed
          ? "You are already subscribed."
          : res.data.emailSkipped
            ? "Subscribed and saved. Email delivery is not configured yet."
            : "Thanks for subscribing.",
      );
      setEmail("");
    } catch {
      toast.dismiss(loadingId);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <Image
        source={require("../../assets/logo-light.png")}
        style={styles.logo}
        contentFit="contain"
      />
      <Text style={styles.tagline}>{siteConfig.tagline}</Text>
      <Text style={styles.description}>{siteConfig.description}</Text>

      <Text style={styles.label}>Newsletter</Text>
      <View style={styles.row}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          returnKeyType="send"
          onSubmitEditing={() => void onSubscribe()}
        />
        <Pressable
          onPress={() => void onSubscribe()}
          disabled={loading}
          style={styles.submit}
          accessibilityLabel="Subscribe to newsletter"
        >
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Ionicons name="arrow-forward" size={18} color={colors.white} />
          )}
        </Pressable>
      </View>
      <Text style={styles.hint}>
        Product updates, project news, and authenticity tips — no spam.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.ink,
    paddingHorizontal: spacing.lg,
    paddingTop: 28,
    paddingBottom: 120,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  logo: {
    width: 160,
    height: 48,
    backgroundColor: "transparent",
    marginBottom: 12,
  },
  tagline: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 320,
  },
  description: {
    marginTop: 8,
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 360,
    marginBottom: 20,
  },
  label: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.05)",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 46,
    paddingHorizontal: 14,
    color: colors.white,
    fontSize: 14,
  },
  submit: {
    width: 48,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  hint: {
    marginTop: 10,
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
    lineHeight: 16,
  },
});
