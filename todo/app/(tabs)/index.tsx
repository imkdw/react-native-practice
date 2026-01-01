import CategoryDropdown from "@/components/todo/CategoryDropdown";
import FilterTabs from "@/components/todo/FilterTabs";
import TodoListHeader from "@/components/TodoListHeader";
import { TODO_FILTERS } from "@/constants/todo.const";
import { TodoFilter } from "@/types/todo.type";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoScreen() {
  const [filter, setFilter] = useState<TodoFilter>(TODO_FILTERS.ALL);

  const handleFilter = (filter: TodoFilter) => {
    setFilter(filter);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TodoListHeader />
      <FilterTabs selected={filter} onSelect={handleFilter} />
      <CategoryDropdown />
      <View style={{ flex: 1, padding: 16 }}>
        <Text>할일 목록 페이지</Text>
      </View>
    </SafeAreaView>
  );
}
