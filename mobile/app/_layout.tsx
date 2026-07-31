import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MiniPlayer from "../components/MiniPlayer";
import { RadioPlayerProvider } from "../context/RadioPlayerContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <RadioPlayerProvider>
        <StatusBar style="dark" />
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerTitleStyle: { fontWeight: "700" } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="article/[slug]" options={{ title: "" }} />
            <Stack.Screen
              name="category/[slug]"
              options={{ title: "Section" }}
            />
          </Stack>
        </View>
        <MiniPlayer />
      </RadioPlayerProvider>
    </SafeAreaProvider>
  );
}
