// src/storage/categoryStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CAT_KEY = 'TASKMATE_CATEGORIES';

// Default kategori
export const DEFAULT_CATEGORIES = [
  { key: 'Umum',   color: '#334155' },
  { key: 'Mobile', color: '#2563eb' },
  { key: 'RPL',    color: '#16a34a' },
  { key: 'IoT',    color: '#f59e0b' },
];

// Muat kategori dari storage (atau default)
export async function loadCategories() {
  try {
    const raw = await AsyncStorage.getItem(CAT_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

// Simpan kategori ke storage
export async function saveCategories(categories) {
  try {
    await AsyncStorage.setItem(CAT_KEY, JSON.stringify(categories));
  } catch {}
}
