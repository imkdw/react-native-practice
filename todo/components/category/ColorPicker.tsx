import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const PRESET_COLORS = [
  "#4ADE80",
  "#3B82F6",
  "#F97316",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F59E0B",
  "#6366F1",
  "#78716C",
];

type Props = {
  selectedColor: string;
  onSelect: (color: string) => void;
};

export default function ColorPicker({ selectedColor, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {PRESET_COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          style={[styles.colorOption, { backgroundColor: color }, selectedColor === color && styles.colorOptionSelected]}
          onPress={() => onSelect(color)}
        >
          {selectedColor === color && <Ionicons name="checkmark" size={18} color="#fff" />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

