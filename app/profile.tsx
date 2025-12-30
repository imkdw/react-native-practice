import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ProfileScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title">
          {name ? `${name}'s Profile` : "Profile"}
        </ThemedText>
        <ThemedText style={styles.description}>
          This is the profile screen. You navigated here from Home!
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  description: {
    opacity: 0.7,
  },
});
