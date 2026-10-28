import { Tabs } from "expo-router";
import { GlassTabBar } from "../../src/components/GlassTabBar";
import { useTheme } from "../../src/theme-context";

export default function TabsLayout() {
  const { colors: t } = useTheme();
  return (
    <Tabs
      tabBar={(props) => {
        return <GlassTabBar {...props} />;
      }}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: t.background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="products" options={{ title: "Products" }} />
      <Tabs.Screen name="verify" options={{ title: "Verify" }} />
      <Tabs.Screen name="contact" options={{ title: "Contact" }} />
      <Tabs.Screen name="more" options={{ title: "More" }} />
    </Tabs>
  );
}
