import { useCallback, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { DistributorCard } from "./DistributorCard";
import { useEnterViewport } from "../hooks/useEnterViewport";
import { spacing } from "../theme";

type Distributor = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  role: string;
  highlight: string;
  logo: string;
  logoOnDark?: boolean;
};

const GAP = 12;
const AUTO_MS = 3200;

export function DistributorCarousel({
  items,
}: {
  items: readonly Distributor[];
}) {
  const { width } = useWindowDimensions();
  const cardW = Math.min(280, width * 0.72);
  const step = cardW + GAP;
  const rootRef = useRef<View>(null);
  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(0);
  const draggingRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(true);

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
    // Only resume after a real user drag — auto scrollTo also ends here
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
        {items.map((d) => (
          <View key={d.id} style={[styles.cardWrap, { width: cardW }]}>
            <DistributorCard
              name={d.name}
              shortName={d.shortName}
              location={d.location}
              role={d.role}
              highlight={d.highlight}
              logo={d.logo}
              logoOnDark={d.logoOnDark}
              compact
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rail: {
    gap: GAP,
    paddingRight: spacing.lg,
    paddingBottom: 4,
  },
  cardWrap: {
    flexGrow: 0,
  },
});
