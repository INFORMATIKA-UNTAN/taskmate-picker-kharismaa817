import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { saveTasks, loadTasks } from "../src/storage/taskStorage";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function Add() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Umum");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  // fungsi simpan
  const handleSave = async () => {
    const stored = (await loadTasks()) || [];
    const newTask = {
      id: Date.now(),
      title,
      description: desc, // ✅ konsisten dengan TaskItem
      category,
      priority,
      deadline: deadline.toISOString(),
      status: "pending",
    };
    const updated = [...stored, newTask];
    await saveTasks(updated);
    navigation.navigate("Home");
  };

  // fungsi pending
  const handlePending = async () => {
    const stored = (await loadTasks()) || [];
    const newTask = {
      id: Date.now(),
      title,
      description: desc, // ✅ konsisten dengan TaskItem
      category,
      priority,
      deadline: deadline.toISOString(),
      status: "pending",
    };
    const updated = [...stored, newTask];
    await saveTasks(updated);
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tambah Tugas</Text>

      <Text style={styles.label}>Judul</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan judul"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={styles.input}
        placeholder="Deskripsi singkat"
        value={desc}
        onChangeText={setDesc}
      />

      <Text style={styles.label}>Kategori</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Umum" value="Umum" />
          <Picker.Item label="Mobile" value="Mobile" />
          <Picker.Item label="RPL" value="RPL" />
          <Picker.Item label="IoT" value="IoT" />
        </Picker>
      </View>

      <Text style={styles.label}>Prioritas</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
        >
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>

      <Text style={styles.label}>Deadline</Text>
      {Platform.OS === "web" ? (
        // Fallback web pakai <input type="date" />
        <input
          type="date"
          value={deadline.toISOString().split("T")[0]}
          onChange={(e) => setDeadline(new Date(e.target.value))}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #d1d5db",
            marginBottom: 8,
          }}
        />
      ) : (
        <>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDate(true)}
          >
            <Text style={styles.dateText}>
              {deadline.toLocaleDateString("id-ID")}
            </Text>
            <Ionicons name="calendar-outline" size={22} color="#555" />
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={deadline}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (event.type === "set" && selectedDate) {
                  setDeadline(selectedDate);
                }
                setShowDate(false);
              }}
            />
          )}
        </>
      )}

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnBlue} onPress={handleSave}>
          <Text style={styles.btnText}>SIMPAN TUGAS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnBlue} onPress={handlePending}>
          <Text style={styles.btnText}>PENDING</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
  label: { fontWeight: "600", marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: { fontSize: 14, color: "#111" },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
    marginBottom: 40,
  },
  btnBlue: {
    flex: 1,
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
