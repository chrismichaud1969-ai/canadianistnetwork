import { Tabs } from "expo-router";
import { Text } from "react-native";

function TabIcon({ symbol }: { symbol: string }) {
  return <Text style={{ fontSize: 18 }}>{symbol}</Text>;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#dc2626",
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "The Canadianist",
          tabBarIcon: () => <TabIcon symbol="📰" />,
        }}
      />
      <Tabs.Screen
        name="subscribe"
        options={{
          title: "Subscribe",
          tabBarIcon: () => <TabIcon symbol="✉️" />,
        }}
      />
    </Tabs>
  );
}
