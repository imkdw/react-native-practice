import CategoryItem from "@/components/category/CategoryItem";
import CategoryModal from "@/components/category/CategoryModal";
import {
  addCategory,
  deleteCategory as deleteCategoryService,
  getCategories,
  updateCategory,
} from "@/services/category.service";
import { Category } from "@/types/category.type";
import { generateUUID } from "@/utils/uuid.util";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      Alert.alert("오류", "카테고리를 불러오는데 실패했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const openAddModal = () => {
    setEditingCategory(null);
    setModalVisible(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  const handleSave = async (name: string, color: string) => {
    if (!name.trim()) {
      Alert.alert("오류", "카테고리 이름을 입력해주세요.");
      return;
    }

    try {
      if (editingCategory) {
        const updated = await updateCategory(editingCategory.id, {
          label: name.trim(),
          color,
        });
        setCategories(updated);
      } else {
        const newCategory: Category = {
          id: generateUUID(),
          label: name.trim(),
          color,
        };
        const updated = await addCategory(newCategory);
        setCategories(updated);
      }
    } catch (error) {
      Alert.alert("오류", "카테고리 저장에 실패했습니다.");
      console.error(error);
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
        onPress: async () => {
          try {
            const updated = await deleteCategoryService(categoryId);
            setCategories(updated);
          } catch (error) {
            Alert.alert("오류", "카테고리 삭제에 실패했습니다.");
            console.error(error);
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
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
