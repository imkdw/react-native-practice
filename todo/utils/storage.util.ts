import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  CATEGORIES: "@todo/categories",
  TODOS: "@todo/todos",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const setObject = async <T>(key: StorageKey, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`[Storage] setObject 실패 - key: ${key}`, error);
    throw error;
  }
};

export const getObject = async <T>(key: StorageKey): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error(`[Storage] getObject 실패 - key: ${key}`, error);
    throw error;
  }
};
