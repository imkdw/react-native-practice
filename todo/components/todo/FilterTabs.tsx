import { TODO_FILTERS } from "@/constants/todo.const";
import { TodoFilter, TodoFilterItem } from "@/types/todo.types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  selected: TodoFilter;
  onSelect: (filter: TodoFilter) => void;
}

const filterItems: TodoFilterItem[] = [
  { key: TODO_FILTERS.ALL, label: "전체" },
  { key: TODO_FILTERS.DONE, label: "완료" },
  { key: TODO_FILTERS.IN_PROGRESS, label: "미완료" },
];

export default function FilterTabs({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {filterItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[styles.tab, selected === item.key && styles.tabActive]}
          onPress={() => onSelect(item.key)}
        >
          <Text style={[styles.tabText, selected === item.key && styles.tabTextActive]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 4,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#3B82F6",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  tabTextActive: {
    color: "#fff",
  },
});
