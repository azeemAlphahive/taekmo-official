import { useCallback, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { assetSource } from "../config";
import { useEnterViewport } from "../hooks/useEnterViewport";
import { colors, spacing } from "../theme";
import {
  SalesDirectorModal,
  type SalesDirector,
} from "./SalesDirectorModal";

const GAP = 12;
const AUTO_MS = 3500;

export function TeamCarousel({
  items,
}: {
  items: readonly SalesDirector[];
}) {
  const { width } = useWindowDimensions();
  const cardW = Math.min(268, width * 0.7);
  const step = cardW + GAP;
  const rootRef = useRef<View>(null);
  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(0);
  const draggingRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(true);
  const [selected, setSelected] = useState<SalesDirector | null>(null);

  const resetToStart = useCallback(() => {
    indexRef.current = 0;
    scrollRef.current?.scrollTo({ x: 0, animated: false });
    setPaused(false);
  }, []);

  useEnterViewport(rootRef, () => {
    setActive(true);
    resetToStart();
  });

  useFocusEffect(
    useCallback(() => {
      resetToStart();
      setActive(true);
      return () => setActive(false);
    }, [resetToStart]),
  );

  useEffect(() => {
    if (!active || paused || items.length <= 1) return;

    const id = setInterval(() => {
      if (draggingRef.current) return;
      const atEnd = indexRef.current >= items.length - 1;
      const next = atEnd ? 0 : indexRef.current + 1;
      indexRef.current = next;
      scrollRef.current?.scrollTo({
        x: next * step,
        animated: !atEnd,
      });
    }, AUTO_MS);

    return () => clearInterval(id);
  }, [active, paused, items.length, step]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  function pauseForUser() {
    draggingRef.current = true;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }

  function resumeSoon() {
    draggingRef.current = false;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 2200);
  }

  function onScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    indexRef.current = Math.round(x / step);
    if (draggingRef.current) resumeSoon();
  }

  return (
    <View ref={rootRef} collapsable={false}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={step}
        snapToAlignment="start"
        disableIntervalMomentum
        contentContainerStyle={styles.rail}
        onScrollBeginDrag={pauseForUser}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
      >
        {items.map((person) => (
          <Pressable
            key={person.id}
            onPress={() => setSelected(person)}
            style={({ pressed }) => [
              styles.card,
              { width: cardW, opacity: pressed ? 0.94 : 1 },
            ]}
          >
            <Image
              source={assetSource(person.photo)}
              style={styles.photo}
              contentFit="cover"
              contentPosition={person.photoPosition ?? "top"}
            />
            <View style={styles.body}>
              <Text style={styles.name}>{person.name}</Text>
              <Text style={styles.title}>{person.title}</Text>
              <Text style={styles.message} numberOfLines={3}>
                {person.message}
              </Text>
              <View style={styles.footer}>
                <Text style={styles.tapHint}>Tap for details</Text>
                <Ionicons name="chevron-forward" size={15} color={colors.green} />
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <SalesDirectorModal
        person={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rail: {
    gap: GAP,
    paddingRight: spacing.lg,
    paddingBottom: 4,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: 210,
    backgroundColor: colors.ink,
  },
  body: {
    padding: 14,
  },
  name: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "800",
  },
  title: {
    marginTop: 4,
    color: colors.green,
    fontSize: 12,
    fontWeight: "700",
  },
  message: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tapHint: {
    color: colors.green,
    fontSize: 12,
    fontWeight: "700",
  },
});
