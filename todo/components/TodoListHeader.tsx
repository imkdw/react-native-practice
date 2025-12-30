import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TodoListHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
        </View>
        <Text style={styles.title}>My Tasks</Text>
      </View>

      <TouchableOpacity>
        <Ionicons name="search-outline" size={26} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBox: {
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3B82F6",
  },
});
