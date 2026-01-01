import CategoryItem from "@/components/category/CategoryItem";
import CategoryModal from "@/components/category/CategoryModal";
import { Category } from "@/types/category.type";
import { generateUUID } from "@/utils/uuid.util";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const INITIAL_CATEGORIES: Category[] = [
  { id: "1", label: "개인", color: "#4ADE80" },
  { id: "2", label: "직장", color: "#3B82F6" },
  { id: "3", label: "건강", color: "#F59E0B" },
  { id: "4", label: "학습", color: "#6366F1" },
  { id: "5", label: "재정", color: "#14B8A6" },
];

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const openAddModal = () => {
    setEditingCategory(null);
    setModalVisible(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  const handleSave = (name: string, color: string) => {
    if (!name.trim()) {
      Alert.alert("오류", "카테고리 이름을 입력해주세요.");
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? { ...cat, label: name.trim(), color } : cat))
      );
    } else {
      const newCategory: Category = {
        id: generateUUID(),
        label: name.trim(),
        color,
      };
      setCategories((prev) => [...prev, newCategory]);
    }

    setModalVisible(false);
    setEditingCategory(null);
  };

  const handleDelete = (categoryId: string) => {
    Alert.alert("삭제 확인", "이 카테고리를 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => setCategories((prev) => prev.filter((cat) => cat.id !== categoryId)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>카테고리</Text>
          <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>추가</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CategoryItem category={item} onEdit={openEditModal} onDelete={handleDelete} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <CategoryModal
        visible={modalVisible}
        editingCategory={editingCategory}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
});
