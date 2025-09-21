import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskItem({ task, onToggle, onDelete }) {
  const isDone = task.status === 'done';

  // warna card berdasarkan priority
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'High':
        return '#fecaca'; // merah muda
      case 'Medium':
        return '#fef9c3'; // kuning muda
      case 'Low':
        return '#e2e8f0'; // abu-abu muda
      default:
        return '#fff';
    }
  };

  // format deadline agar tanpa jam
  const formattedDeadline = task.deadline
    ? new Date(task.deadline).toISOString().split('T')[0]
    // atau pakai format Indonesia:
    // new Date(task.deadline).toLocaleDateString("id-ID")
    : null;

  // hitung selisih hari
  let deadlineInfo = '';
  let deadlineStyle = styles.deadlineNormal;

  if (task.deadline && !isDone) {
    const today = new Date();
    const deadlineDate = new Date(task.deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      deadlineInfo = 'Overdue';
      deadlineStyle = styles.deadlineOverdue;
    } else {
      deadlineInfo = `Sisa ${diffDays} hari`;
    }
  }

  return (
    <View style={[styles.card, { backgroundColor: getPriorityColor() }]}>
      {/* Bagian utama task */}
      <TouchableOpacity onPress={() => onToggle?.(task)} style={{ flex: 1 }}>
        <Text style={[styles.title, isDone && styles.strike]}>
          {task.title}
        </Text>

        {formattedDeadline && (
          <Text style={styles.deadline}>
            Deadline: {formattedDeadline}
          </Text>
        )}

        {/* Info overdue / sisa hari */}
        {deadlineInfo !== '' && (
          <Text style={[styles.deadline, deadlineStyle]}>
            {deadlineInfo}
          </Text>
        )}

        {!!task.description && (
          <Text style={styles.desc}>{task.description}</Text>
        )}

        {/* Badge kategori & priority */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>
            {task.category ?? 'Umum'}
          </Text>
          <Text style={styles.badge}>
            {task.priority ?? 'Medium'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Tombol delete */}
      <TouchableOpacity
        onPress={() => onDelete?.(task)}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  deadline: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 2,
  },
  deadlineNormal: {
    color: '#2563eb', // biru
  },
  deadlineOverdue: {
    color: 'red', // merah
    fontWeight: '600',
  },
  desc: {
    color: '#475569',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  badge: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    fontWeight: '600',
    color: '#0f172a',
  },
  deleteBtn: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
});
