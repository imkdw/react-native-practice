import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "할일",
          tabBarIcon: ({ color, size }) => <Ionicons name="checkbox-outline" size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "카테고리",
          tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
          headerTitleAlign: "center",
        }}
      />
    </Tabs>
  );
}
