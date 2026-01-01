import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#ffffff");
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="create-todo" />
    </Stack>
  );
}
