import CategoryPickerModal from "@/components/create-todo/CategoryPickerModal";
import CreateTodoHeader from "@/components/create-todo/CreateTodoHeader";
import DateAlarmSection from "@/components/create-todo/DateAlarmSection";
import FormFooter from "@/components/create-todo/FormFooter";
import { TODO_STATUS } from "@/constants/todo.const";
import { getCategories } from "@/services/category.service";
import { addTodo } from "@/services/todo.service";
import { Category } from "@/types/category.type";
import { generateUUID } from "@/utils/uuid.util";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateTodoScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState(new Date());
  const [notification, setNotification] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) {
        setCategoryId(data[0].id);
      }
    };
    loadCategories();
  }, []);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  const handleSave = async () => {
    if (!title.trim() || !categoryId) {
      return;
    }

    await addTodo({
      id: generateUUID(),
      title: title.trim(),
      description: description.trim(),
      categoryId,
      dueDate: dueDate.toISOString(),
      status: TODO_STATUS.IN_PROGRESS,
      notification,
    });

    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CreateTodoHeader title="할 일 수" onBack={handleCancel} />

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

      <FormFooter onCancel={handleCancel} onSave={handleSave} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
