import {
  useEffect,
  useRef,
  type ElementRef,
  type ReactNode,
} from "react";
import {
  Animated,
  DeviceEventEmitter,
  Dimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

const SCROLL_EVENT = "taekmo-scroll";

export function emitAppScroll() {
  DeviceEventEmitter.emit(SCROLL_EVENT);
}

type Host = ElementRef<typeof View>;

/** Fade/slide in when the section enters the viewport while scrolling. */
export function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(26)).current;
  const scale = useRef(new Animated.Value(0.97)).current;
  const done = useRef(false);
  const hostRef = useRef<Host>(null);

  function reveal() {
    if (done.current) return;
    done.current = true;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 520,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 520,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 520,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function check() {
    if (done.current) return;
    const node = hostRef.current as Host & {
      measureInWindow?: (
        cb: (x: number, y: number, w: number, h: number) => void,
      ) => void;
    };
    node?.measureInWindow?.((_x, y, _w, h) => {
      const screenH = Dimensions.get("window").height;
      if (y < screenH - 48 && y + h > 40) reveal();
    });
  }

  useEffect(() => {
    const t = setTimeout(check, 80);
    const sub = DeviceEventEmitter.addListener(SCROLL_EVENT, check);
    return () => {
      clearTimeout(t);
      sub.remove();
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
        style,
      ]}
    >
      <View ref={hostRef} collapsable={false} onLayout={check}>
        {children}
      </View>
    </Animated.View>
  );
}
