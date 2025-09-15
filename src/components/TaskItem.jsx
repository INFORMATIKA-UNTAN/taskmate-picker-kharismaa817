import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Komponen TaskItem menerima props: task, onToggle, onDelete
export default function TaskItem({ task, onToggle, onDelete }) {
  const isDone = task.status === 'done'; // cek apakah status Done

  return (
    <View style={[styles.card, isDone && styles.cardDone]}>
      {/* Bagian teks bisa diklik → toggle status */}
      <TouchableOpacity onPress={() => onToggle?.(task)} style={{ flex: 1 }}>
        <Text style={[styles.title, isDone && styles.strike]}>{task.title}</Text>
        {!!task.description && (
          <Text style={styles.desc}>{task.description}</Text>
        )}
        <Text style={styles.meta}>{task.category ?? 'Umum'}</Text>
      </TouchableOpacity>

      {/* Tombol hapus */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete?.(task)}
      >
        <Text style={styles.deleteText}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

// Style
const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',

    // Shadow Android
    elevation: 2,
    // Shadow iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardDone: {
    backgroundColor: '#f1f5f9',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#0f172a',
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  desc: {
    color: '#475569',
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    color: '#64748b',
  },
  deleteBtn: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
  },
  deleteText: {
    fontSize: 16,
  },
});
