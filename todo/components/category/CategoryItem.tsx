import { Category } from "@/types/category.type";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
};

export default function CategoryItem({ category, onEdit, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={[styles.colorDot, { backgroundColor: category.color }]} />
        <Text style={styles.label}>{category.label}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(category)}>
          <Ionicons name="pencil-outline" size={22} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(category.id)}>
          <Ionicons name="trash-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "#374151",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
});

