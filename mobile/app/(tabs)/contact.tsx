import { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { PageHero } from "../../src/components/PageHero";
import { Reveal, emitAppScroll } from "../../src/components/Reveal";
import { useToast } from "../../src/components/Toast";
import {
  LightField,
  PrimaryButton,
  Screen,
} from "../../src/components/ui";
import { sendContact } from "../../src/api";
import { SalesDirectorModal } from "../../src/components/SalesDirectorModal";
import { salesLeadership, siteConfig } from "../../src/data/content";
import { assetSource } from "../../src/config";
import { useScrollToTopOnFocus } from "../../src/hooks/useScrollToTopOnFocus";
import { useTheme } from "../../src/theme-context";
import { spacing } from "../../src/theme";

export default function ContactScreen() {
  const toast = useToast();
  const { colors: t } = useTheme();
  const scrollRef = useScrollToTopOnFocus();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState<
    (typeof salesLeadership)[number] | null
  >(null);

  async function onSend() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill name, email, and message.");
      return;
    }
    setLoading(true);
    const loadingId = toast.loading("Sending message…");
    try {
      const extras = [
        phone.trim() ? `Phone: ${phone.trim()}` : "",
        company.trim() ? `Company: ${company.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      const res = await sendContact({
        name: name.trim(),
        email: email.trim(),
        message: extras ? `${message.trim()}\n\n${extras}` : message.trim(),
      });
      toast.dismiss(loadingId);
      if (!res.ok) {
        toast.error(res.data.message || "Could not send message.");
        return;
      }
      toast.success(
        res.data.emailSkipped
          ? "Message saved. Email delivery is currently unavailable."
          : "Message sent — we'll get back to you soon.",
      );
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
    } catch {
      toast.dismiss(loadingId);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const quickActions = [
    {
      icon: "mail-outline" as const,
      label: "Email",
      value: siteConfig.email,
      onPress: () => void Linking.openURL(`mailto:${siteConfig.email}`),
    },
    {
      icon: "call-outline" as const,
      label: "Phone",
      value: siteConfig.phone,
      onPress: () =>
        void Linking.openURL(`tel:${siteConfig.phone.replace(/\s/g, "")}`),
    },
  ];

  return (
    <Screen>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={emitAppScroll}
        scrollEventThrottle={64}
        keyboardShouldPersistTaps="handled"
      >
        <PageHero
          eyebrow="CONTACT"
          title="Contact Us"
          description="Tell us about your project or product needs. We will get back to you soon."
        />

        <View style={[styles.content, { backgroundColor: t.background }]}>
          <Reveal>
            <Text style={[styles.h2, { color: t.text }]}>Get in touch</Text>
            <Text style={[styles.sub, { color: t.textSecondary }]}>
              Prefer email or phone? Use a quick action below, or send a message
              with the form.
            </Text>

            <View style={styles.quickRow}>
              {quickActions.map((item) => (
                <Pressable
                  key={item.label}
                  onPress={item.onPress}
                  style={[
                    styles.quickCard,
                    {
                      backgroundColor: t.surface,
                      borderColor: t.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.quickIcon,
                      { backgroundColor: "rgba(9,156,45,0.12)" },
                    ]}
                  >
                    <Ionicons name={item.icon} size={18} color={t.green} />
                  </View>
                  <Text style={[styles.quickLabel, { color: t.muted }]}>
                    {item.label}
                  </Text>
                  <Text
                    style={[styles.quickValue, { color: t.text }]}
                    numberOfLines={1}
                  >
                    {item.value}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View
              style={[
                styles.addressCard,
                { backgroundColor: t.surface, borderColor: t.border },
              ]}
            >
              <Ionicons name="location-outline" size={18} color={t.green} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.infoLabel, { color: t.text }]}>
                  Headquarters
                </Text>
                <Text style={[styles.infoValue, { color: t.textSecondary }]}>
                  {siteConfig.address}
                </Text>
              </View>
            </View>
          </Reveal>

          <Text style={[styles.teamHeading, { color: t.text }]}>
            Meet our team
          </Text>
          {salesLeadership.map((person, i) => (
            <Reveal key={person.id} delay={40 + i * 20}>
              <Pressable
                onPress={() => setSelectedDirector(person)}
                style={({ pressed }) => [
                  styles.card,
                  styles.profileCard,
                  {
                    backgroundColor: t.surface,
                    borderColor: t.border,
                    opacity: pressed ? 0.92 : 1,
                    transform: [{ scale: pressed ? 0.985 : 1 }],
                  },
                ]}
              >
                <Image
                  source={assetSource(person.photo)}
                  style={styles.profilePhoto}
                  contentFit="cover"
                  contentPosition={person.photoPosition ?? "top"}
                />
                <View style={styles.profileBody}>
                  <Text style={[styles.headName, { color: t.text }]}>
                    {person.name}
                  </Text>
                  <Text style={[styles.profileTitle, { color: t.green }]}>
                    {person.title}
                  </Text>
                  <Text
                    style={[styles.body, { color: t.textSecondary }]}
                    numberOfLines={4}
                  >
                    {person.message}
                  </Text>
                  <View style={styles.profileFooter}>
                    <Text style={[styles.tapHint, { color: t.green }]}>
                      Tap for full details
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={t.green}
                    />
                  </View>
                </View>
              </Pressable>
            </Reveal>
          ))}

          <SalesDirectorModal
            person={selectedDirector}
            visible={!!selectedDirector}
            onClose={() => setSelectedDirector(null)}
          />

          <Reveal
            delay={60}
            style={[
              styles.card,
              {
                backgroundColor: t.surface,
                borderColor: t.border,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: t.text }]}>
              Send a message
            </Text>
            <Text style={[styles.formHint, { color: t.muted }]}>
              We typically reply within 1–2 business days.
            </Text>
            <LightField label="Full name" value={name} onChangeText={setName} />
            <LightField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.twoCol}>
              <View style={{ flex: 1 }}>
                <LightField
                  label="Phone (optional)"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={{ flex: 1 }}>
                <LightField
                  label="Company"
                  value={company}
                  onChangeText={setCompany}
                />
              </View>
            </View>
            <LightField
              label="Message"
              value={message}
              onChangeText={setMessage}
              multiline
              style={{ minHeight: 120, textAlignVertical: "top" }}
            />
            <PrimaryButton
              label="Send message"
              onPress={() => void onSend()}
              loading={loading}
            />
          </Reveal>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 140,
  },
  teamHeading: {
    marginTop: 8,
    marginBottom: 2,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  sub: {
    marginTop: 6,
    marginBottom: 16,
    fontSize: 14,
    lineHeight: 20,
  },
  quickRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  quickCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  quickIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  quickValue: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
  },
  addressCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  infoValue: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
  },
  card: {
    marginTop: 14,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  profileCard: {
    padding: 0,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "stretch",
  },
  profilePhoto: {
    width: 140,
    height: 210,
  },
  profileBody: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  cardHead: {
    marginBottom: 8,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontWeight: "800",
    fontSize: 17,
    marginBottom: 6,
  },
  profileTitle: {
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 8,
  },
  formHint: {
    fontSize: 12,
    marginBottom: 14,
    marginTop: -2,
  },
  headName: {
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 4,
  },
  body: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  link: {
    fontSize: 12,
    fontWeight: "700",
  },
  profileFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tapHint: {
    fontSize: 12,
    fontWeight: "700",
  },
  twoCol: {
    flexDirection: "row",
    gap: 10,
  },
});
