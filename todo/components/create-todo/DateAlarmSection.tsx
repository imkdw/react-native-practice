import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

type Props = {
  dueDate: Date;
  notification: boolean;
  onDateChange: (date: Date) => void;
  onNotificationChange: (value: boolean) => void;
};

export default function DateAlarmSection({ dueDate, notification, onDateChange, onNotificationChange }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.label}>마감일 및 알림</Text>
        <View style={styles.dateAlarmContainer}>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.dateText}>{formatDate(dueDate)}</Text>
          </TouchableOpacity>

          <View style={styles.alarmToggle}>
            <Switch
              value={notification}
              onValueChange={onNotificationChange}
              trackColor={{ false: "#ddd", true: "#2563EB" }}
              thumbColor="#fff"
            />
            <Text style={styles.alarmText}>알림</Text>
          </View>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
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
  dateAlarmContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  alarmToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  alarmText: {
    fontSize: 14,
    color: "#333",
  },
});
