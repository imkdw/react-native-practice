import { getCategories } from "@/services/category.service";
import { Category } from "@/types/category.type";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoryDropdown() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await getCategories();
      const ALL_CATEGORY: Category = { id: "ALL", label: "전체", color: "#EF4444" };
      setCategories([ALL_CATEGORY, ...categories]);
    };

    loadCategories();
  }, []);

  const selectedLabel = selected ? categories.find((c) => c.id === selected)?.label : "카테고리 선택";

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{selectedLabel}</Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.item]}
                onPress={() => {
                  setSelected(category.id);
                  setVisible(false);
                }}
              >
                <Text style={styles.itemText}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
});
