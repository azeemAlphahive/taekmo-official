import { useCallback, useRef, type RefObject } from "react";
import { useFocusEffect } from "expo-router";

type ScrollHost = {
  scrollTo?: (opts: { x?: number; y?: number; animated?: boolean }) => void;
  scrollToOffset?: (opts: { offset: number; animated?: boolean }) => void;
};

/** When the screen gains focus, jump scroll back to the top. */
export function useScrollToTopOnFocus(): RefObject<null> {
  const ref = useRef<ScrollHost | null>(null);

  useFocusEffect(
    useCallback(() => {
      requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        if (typeof node.scrollToOffset === "function") {
          node.scrollToOffset({ offset: 0, animated: false });
        } else if (typeof node.scrollTo === "function") {
          node.scrollTo({ y: 0, animated: false });
        }
      });
    }, []),
  );

  return ref as RefObject<null>;
}
