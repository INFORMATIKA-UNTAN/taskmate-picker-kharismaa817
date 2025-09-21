import { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';

export default function AddCategoryModal({ visible, onClose, onSubmit, suggestedColor }) {
  const [name, setName] = useState('');

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert('Validasi', 'Nama kategori tidak boleh kosong.');
      return;
    }
    // Kirim data ke parent
    onSubmit?.({ key: trimmed, color: suggestedColor });
    setName('');
    onClose?.(); // otomatis tutup setelah simpan
  };

  const handleCancel = () => {
    setName('');
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        {/* klik area luar untuk tutup */}
        <Pressable style={{ flex: 1 }} onPress={handleCancel} />
        <View style={styles.card}>
          <Text style={styles.title}>Tambah Kategori Baru</Text>

          {/* Input nama kategori */}
          <TextInput
            placeholder="mis. Basis Data"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {/* Tombol aksi */}
          <View style={styles.actions}>
            <Button title="Batal" onPress={handleCancel} />
            <Button title="Simpan" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});
