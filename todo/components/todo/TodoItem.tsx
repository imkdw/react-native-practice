import Badge from "@/components/common/Badge";
import { getCategoryById } from "@/constants/category.const";
import { TODO_STATUS } from "@/constants/todo.const";
import { Todo } from "@/types/todo.type";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onMore: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onMore }: Props) {
  const isDone = todo.status === TODO_STATUS.DONE;
  const category = getCategoryById(todo.categoryId)!;

  return (
    <View style={styles.container}>
      {/* 체크박스 */}
      <View style={styles.checkboxWrapper}>
        <Checkbox
          value={isDone}
          onValueChange={() => onToggle(todo.id)}
          color={isDone ? "#3B82F6" : undefined}
          style={styles.checkbox}
        />
      </View>

      {/* 컨텐츠 */}
      <View style={styles.content}>
        <Text style={[styles.title, isDone && styles.titleDone]}>{todo.title}</Text>
        <Text style={styles.description}>{todo.description}</Text>
        <Badge text={category.label} color={category.color} />
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={14} color="#6B7280" />
          <Text style={styles.dateText}>{todo.dueDate}</Text>
        </View>
      </View>

      {/* 우측 액션 버튼 */}
      <Pressable style={styles.moreButton} onPress={() => onMore(todo.id)}>
        <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F0F7FF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  checkboxWrapper: {
    justifyContent: "flex-start",
    paddingTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },
  content: {
    flex: 1,
    paddingLeft: 12,
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  dateText: {
    fontSize: 13,
    color: "#6B7280",
  },
  moreButton: {
    justifyContent: "flex-start",
    paddingLeft: 8,
  },
});
