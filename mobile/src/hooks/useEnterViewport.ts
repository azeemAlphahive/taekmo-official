import { useEffect, useRef, type RefObject } from "react";
import { Dimensions, type View } from "react-native";

/**
 * Fires `onEnter` when the target becomes clearly visible after being
 * fully off-screen (avoids flicker resets that kill auto-scroll).
 */
export function useEnterViewport(
  ref: RefObject<View | null>,
  onEnter: () => void,
  enabled = true,
) {
  const wasVisible = useRef(false);
  const hiddenSince = useRef<number | null>(null);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      const node = ref.current;
      if (!node || typeof node.measureInWindow !== "function") return;

      node.measureInWindow((_x, y, _w, h) => {
        if (h <= 0) return;
        const { height: wh } = Dimensions.get("window");
        const visible = y < wh * 0.8 && y + h > wh * 0.2;
        const fullyHidden = y + h < 0 || y > wh;

        if (visible && !wasVisible.current) {
          wasVisible.current = true;
          hiddenSince.current = null;
          onEnterRef.current();
        } else if (fullyHidden) {
          if (hiddenSince.current == null) hiddenSince.current = Date.now();
          // Require a short fully-off period before next enter can fire
          if (Date.now() - (hiddenSince.current ?? 0) > 600) {
            wasVisible.current = false;
          }
        }
      });
    };

    const id = setInterval(tick, 500);
    tick();
    return () => clearInterval(id);
  }, [enabled, ref]);
}
