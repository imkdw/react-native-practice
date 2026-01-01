import { Category } from "@/types/category.type";
import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  categories: Category[];
  selectedLabel: string;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (categoryId: string) => void;
};

export default function CategoryPickerModal({ visible, categories, selectedLabel, onOpen, onClose, onSelect }: Props) {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.label}>카테고리</Text>
        <TouchableOpacity style={styles.dropdown} onPress={onOpen}>
          <Text style={styles.dropdownText}>{selectedLabel}</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
          <View style={styles.modalContent}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.modalItem}
                onPress={() => {
                  onSelect(category.id);
                  onClose();
                }}
              >
                <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                <Text style={styles.modalItemText}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
  },
});
