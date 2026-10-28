import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../theme-context";
import { colors, spacing } from "../theme";

export function Screen({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { colors: t } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: t.background }, style]}>
      {children}
    </View>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  const { colors: t } = useTheme();
  return (
    <View style={styles.sectionHead}>
      {eyebrow ? (
        <Text
          style={[
            styles.eyebrow,
            { color: light ? t.mint : t.green },
            light && styles.eyebrowLight,
          ]}
        >
          {eyebrow}
        </Text>
      ) : null}
      <Text
        style={[
          styles.title,
          { color: light ? t.white : t.text },
        ]}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={[
            styles.subtitle,
            {
              color: light ? "rgba(255,255,255,0.7)" : t.textSecondary,
            },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  loading,
  disabled,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.primaryBtn,
        (disabled || loading) && styles.btnDisabled,
        pressed && { opacity: 0.9 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.primaryBtnText}>{label}</Text>
      )}
    </Pressable>
  );
}

export function Field({
  label,
  ...props
}: { label: string } & TextInputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor="rgba(255,255,255,0.35)"
        style={styles.input}
        {...props}
      />
    </View>
  );
}

export function LightField({
  label,
  ...props
}: { label: string } & TextInputProps) {
  const { colors: t } = useTheme();
  return (
    <View style={styles.field}>
      <Text style={[styles.lightLabel, { color: t.text }]}>{label}</Text>
      <TextInput
        placeholderTextColor={t.muted}
        style={[
          styles.lightInput,
          {
            borderColor: t.inputBorder,
            backgroundColor: t.inputBg,
            color: t.inputText,
          },
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  sectionHead: {
    marginBottom: spacing.md,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  eyebrowLight: {
    color: colors.mint,
  },
  primaryBtn: {
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  primaryBtnText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  field: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 14,
    color: colors.white,
    fontSize: 15,
  },
  lightLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  lightInput: {
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
});
