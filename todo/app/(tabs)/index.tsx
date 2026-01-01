import CategoryDropdown from "@/components/category/CategoryDropdown";
import FilterTabs from "@/components/todo/FilterTabs";
import TodoItem from "@/components/todo/TodoItem";
import TodoListHeader from "@/components/TodoListHeader";
import { TODO_FILTERS, TODO_STATUS } from "@/constants/todo.const";
import { getCategories } from "@/services/category.service";
import { deleteTodo, getTodos, updateTodo } from "@/services/todo.service";
import { Category } from "@/types/category.type";
import { Todo, TodoFilter } from "@/types/todo.type";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<TodoFilter>(TODO_FILTERS.ALL);
  const isFocused = useIsFocused();

  const hasCategories = categories.length > 0;

  useEffect(() => {
    if (isFocused) {
      getTodos().then(setTodos);
      getCategories().then(setCategories);
    }
  }, [isFocused]);

  const handleFilter = (filter: TodoFilter) => {
    setFilter(filter);
  };

  const handleAddTodo = () => {
    if (!hasCategories) {
      Alert.alert(
        "카테고리 필요",
        "할 일을 생성하려면 먼저 카테고리를 생성해주세요.\n카테고리 탭에서 카테고리를 추가할 수 있습니다.",
        [{ text: "확인", style: "default" }]
      );

      return;
    }
    router.push("/create-todo");
  };

  const handleToggle = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const newStatus = todo.status === TODO_STATUS.DONE ? TODO_STATUS.IN_PROGRESS : TODO_STATUS.DONE;
    const updated = await updateTodo(id, { status: newStatus });
    setTodos(updated);
  };

  const handleMore = (id: string) => {
    Alert.alert("할 일 관리", "원하는 작업을 선택하세요.", [
      {
        text: "수정",
        onPress: () => router.push({ pathname: "/edit-todo", params: { id } }),
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => handleDelete(id),
      },
      { text: "취소", style: "cancel" },
    ]);
  };

  const handleDelete = (id: string) => {
    Alert.alert("삭제 확인", "정말로 이 할 일을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          const updated = await deleteTodo(id);
          setTodos(updated);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TodoListHeader />
      <FilterTabs selected={filter} onSelect={handleFilter} />
      <CategoryDropdown />
      <View style={styles.todos}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onMore={handleMore} />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.fab, !hasCategories && styles.fabDisabled]}
        onPress={handleAddTodo}
        activeOpacity={hasCategories ? 0.7 : 1}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  todos: {
    flex: 1,
    paddingTop: 16,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabDisabled: {
    backgroundColor: "#9CA3AF",
    shadowOpacity: 0.15,
    elevation: 2,
  },
});
