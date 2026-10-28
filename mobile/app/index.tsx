import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { siteConfig } from "../src/data/content";
import { colors } from "../src/theme";

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function AnimatedSplashScreen() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(14)).current;
  const exitOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    void SplashScreen.hideAsync();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 7,
          tension: 58,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true,
        }),
        Animated.timing(textY, {
          toValue: 0,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(900),
      Animated.timing(exitOpacity, {
        toValue: 0,
        duration: 320,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) router.replace("/(tabs)");
    });
  }, [exitOpacity, logoOpacity, logoScale, textOpacity, textY]);

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#062010", "#0a3d1c", "#04100a", "#0b1a12"]}
        locations={[0, 0.35, 0.7, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["transparent", "rgba(9,156,45,0.22)", "transparent"]}
        start={{ x: 0.5, y: 0.15 }}
        end={{ x: 0.5, y: 0.85 }}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.content, { opacity: exitOpacity }]}>
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
            backgroundColor: "transparent",
          }}
        >
          <Image
            source={require("../assets/logo-light.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textY }],
            alignItems: "center",
          }}
        >
          <Text style={styles.tagline}>{siteConfig.tagline}</Text>
          <Text style={styles.brand}>TAEKMO Solar</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "transparent",
  },
  logo: {
    width: 280,
    height: 92,
    backgroundColor: "transparent",
  },
  tagline: {
    marginTop: 22,
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  brand: {
    marginTop: 6,
    color: colors.mint,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
});
