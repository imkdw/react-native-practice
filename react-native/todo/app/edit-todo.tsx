import CategoryPickerModal from "@/components/create-todo/CategoryPickerModal";
import TodoHeader from "@/components/create-todo/CreateTodoHeader";
import DateAlarmSection from "@/components/create-todo/DateAlarmSection";
import FormFooter from "@/components/create-todo/FormFooter";
import { getCategories } from "@/services/category.service";
import { findTodoById, updateTodo } from "@/services/todo.service";
import { Category } from "@/types/category.type";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditTodoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState(new Date());
  const [notification, setNotification] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, todoData] = await Promise.all([getCategories(), findTodoById(id)]);

        setCategories(categoriesData);
        setTitle(todoData.title);
        setDescription(todoData.description);
        setCategoryId(todoData.categoryId);
        setDueDate(new Date(todoData.dueDate));
        setNotification(todoData.notification);
      } catch {
        router.back();
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  const handleSave = async () => {
    if (!title.trim() || !categoryId) {
      return;
    }

    await updateTodo(id, {
      title: title.trim(),
      description: description.trim(),
      categoryId,
      dueDate: dueDate.toISOString(),
      notification,
    });

    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TodoHeader title="할 일 수정" onBack={handleCancel} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 제목 */}
        <View style={styles.section}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력하세요"
            placeholderTextColor="#999"
          />
        </View>

        {/* 상세 내용 */}
        <View style={styles.section}>
          <Text style={styles.label}>상세 내용</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="상세 내용을 입력하세요"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* 카테고리 */}
        <CategoryPickerModal
          visible={categoryModalVisible}
          categories={categories}
          selectedLabel={selectedCategory?.label ?? "카테고리 선택"}
          onOpen={() => setCategoryModalVisible(true)}
          onClose={() => setCategoryModalVisible(false)}
          onSelect={setCategoryId}
        />

        {/* 마감일 및 알림 */}
        <DateAlarmSection
          dueDate={dueDate}
          notification={notification}
          onDateChange={setDueDate}
          onNotificationChange={setNotification}
        />
      </ScrollView>

      <FormFooter onCancel={handleCancel} onSave={handleSave} saveLabel="수정" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
});
