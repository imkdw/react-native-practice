import CategoryDropdown from "@/components/todo/CategoryDropdown";
import FilterTabs from "@/components/todo/FilterTabs";
import TodoItem from "@/components/todo/TodoItem";
import TodoListHeader from "@/components/TodoListHeader";
import { CATEGORIES } from "@/constants/category.const";
import { TODO_FILTERS, TODO_STATUS } from "@/constants/todo.const";
import { Todo, TodoFilter } from "@/types/todo.type";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const todos: Todo[] = [
  {
    id: "1",
    title: "Todo 1",
    description: "Description 1",
    categoryId: CATEGORIES[0].id,
    dueDate: "2026-01-01",
    status: TODO_STATUS.IN_PROGRESS,
  },
  {
    id: "2",
    title: "Todo 1",
    description: "Description 1",
    categoryId: CATEGORIES[1].id,
    dueDate: "2026-01-01",
    status: TODO_STATUS.IN_PROGRESS,
  },
  {
    id: "3",
    title: "Todo 1",
    description: "Description 1",
    categoryId: CATEGORIES[2].id,
    dueDate: "2026-01-01",
    status: TODO_STATUS.DONE,
  },
];

export default function TodoScreen() {
  const [filter, setFilter] = useState<TodoFilter>(TODO_FILTERS.ALL);

  const handleFilter = (filter: TodoFilter) => {
    setFilter(filter);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TodoListHeader />
      <FilterTabs selected={filter} onSelect={handleFilter} />
      <CategoryDropdown />
      <View style={styles.todos}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={() => {}} onMore={() => {}} />
        ))}
      </View>
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
});
