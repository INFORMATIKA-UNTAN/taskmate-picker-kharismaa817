import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import TaskItem from "../src/components/TaskItem";
import { loadTasks, saveTasks } from "../src/storage/taskStorage";
import { Picker } from "@react-native-picker/picker";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProgress, setSelectedProgress] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  // load dari storage
  useEffect(() => {
    const fetchTasks = async () => {
      const stored = await loadTasks();
      // pastikan semua task punya kategori default "Umum" jika kosong
      const normalized = (stored || []).map((t) => ({
        ...t,
        category: t.category && t.category.trim() !== "" ? t.category : "Umum",
      }));
      setTasks(normalized);
    };
    fetchTasks();
  }, []);

  // toggle status selesai/belum
  const toggleTask = async (task) => {
    const updated = tasks.map((t) =>
      t.id === task.id
        ? { ...t, status: t.status === "done" ? "pending" : "done" }
        : t
    );
    setTasks(updated);
    await saveTasks(updated);
  };

  // hapus satu task
  const deleteTask = async (task) => {
    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
    await saveTasks(updated);
  };

  // hapus semua task selesai
  const clearDone = async () => {
    const updated = tasks.filter((t) => t.status !== "done");
    setTasks(updated);
    await saveTasks(updated);
  };

  // hapus semua task
  const clearAll = async () => {
    setTasks([]);
    await saveTasks([]);
  };

  // hitung statistik
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const overdueCount = tasks.filter(
    (t) => t.status !== "done" && new Date(t.deadline) < new Date()
  ).length;

  // filter task sesuai pilihan
  const filteredTasks = tasks.filter((task) => {
    const category =
      task.category && task.category.trim() !== "" ? task.category : "Umum";

    if (selectedCategory !== "All" && category !== selectedCategory) return false;
    if (selectedProgress !== "All" && task.status !== selectedProgress)
      return false;
    if (selectedPriority !== "All" && task.priority !== selectedPriority)
      return false;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      {/* Filter */}
      <View style={styles.filters}>
        <View style={styles.filterBox}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
            dropdownIconColor="#111"
          >
            <Picker.Item label="Category All" value="All" />
            <Picker.Item label="Umum" value="Umum" />
            <Picker.Item label="Mobile" value="Mobile" />
            <Picker.Item label="RPL" value="RPL" />
            <Picker.Item label="IoT" value="IoT" />
          </Picker>
        </View>

        <View style={styles.filterBox}>
          <Picker
            selectedValue={selectedProgress}
            onValueChange={(itemValue) => setSelectedProgress(itemValue)}
            style={styles.picker}
            dropdownIconColor="#111"
          >
            <Picker.Item label="Progress All" value="All" />
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Done" value="done" />
          </Picker>
        </View>

        <View style={styles.filterBox}>
          <Picker
            selectedValue={selectedPriority}
            onValueChange={(itemValue) => setSelectedPriority(itemValue)}
            style={styles.picker}
            dropdownIconColor="#111"
          >
            <Picker.Item label="Priority All" value="All" />
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>
      </View>

      {/* Statistik */}
      <View style={styles.statsBox}>
        <Text style={{ fontWeight: "600" }}>
          Done: {doneCount} / {tasks.length}
        </Text>
        {overdueCount > 0 && (
          <Text style={{ color: "red", fontWeight: "600" }}>
            Overdue: {overdueCount}
          </Text>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnClearDone} onPress={clearDone}>
            <Text style={styles.btnText}>CLEAR DONE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnClearAll} onPress={clearAll}>
            <Text style={styles.btnText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daftar Tugas */}
      <ScrollView>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8fafc" },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12 },

  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 10,
  },
  filterBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: "hidden", // biar tidak ada garis aneh
  },
  picker: {
    width: "100%",
    height: 40,
    color: "#0f172a",
    borderWidth: 0, // hilangin border default
    outlineStyle: "none", // Android 12+
    ...Platform.select({
      web: {
        outline: "none", // hilangin outline di Web
      },
    }),
  },

  statsBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  actions: { flexDirection: "row", gap: 10, marginTop: 10 },
  btnClearDone: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
  },
  btnClearAll: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
  