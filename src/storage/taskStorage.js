// Import AsyncStorage dari library resmi
import AsyncStorage from '@react-native-async-storage/async-storage';

// Key untuk menyimpan data di AsyncStorage
const STORAGE_KEY = 'TASKMATE_TASKS';

/**
 * Simpan array tugas ke AsyncStorage
 * @param {Array} tasks - daftar tugas
 */
export async function saveTasks(tasks) {
  try {
    // Pastikan selalu array
    const data = Array.isArray(tasks) ? tasks : [];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('❌ Gagal menyimpan data tugas:', e);
  }
}

/**
 * Ambil array tugas dari AsyncStorage
 * @returns {Promise<Array>} daftar tugas
 */
export async function loadTasks() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('❌ Gagal membaca data tugas:', e);
    return [];
  }
}
