import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native';
import TaskItem from '../src/components/TaskItem';
import { dummyTasks } from '../src/data/dummyTasks';

export default function HomeScreen() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [filter, setFilter] = useState("all"); // default All

  const handleToggle = (task) => {
    setTasks(prev =>
      prev.map(t => t.id === task.id
        ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
        : t
      )
    );
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "all") return true;
    if (filter === "todo") return t.status === "pending";
    if (filter === "done") return t.status === "done";
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {["all", "todo", "done"].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <TaskItem task={item} onToggle={handleToggle} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { fontSize: 20, fontWeight: '700', padding: 16 },
  filterRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8, marginHorizontal: 4, backgroundColor: '#e2e8f0' },
  filterBtnActive: { backgroundColor: '#3b82f6' },
  filterText: { fontSize: 14, fontWeight: '600', color: '#334155' },
  filterTextActive: { color: '#fff' },
});
