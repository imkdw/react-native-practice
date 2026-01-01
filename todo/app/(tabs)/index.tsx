import CategoryDropdown from "@/components/category/CategoryDropdown";
import FilterTabs from "@/components/todo/FilterTabs";
import TodoItem from "@/components/todo/TodoItem";
import TodoListHeader from "@/components/TodoListHeader";
import { TODO_FILTERS } from "@/constants/todo.const";
import { Todo, TodoFilter } from "@/types/todo.type";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoScreen() {
  const [todos] = useState<Todo[]>([]);
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
