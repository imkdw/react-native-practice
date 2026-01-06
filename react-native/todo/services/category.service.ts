import { Category } from "@/types/category.type";
import { getObject, setObject, STORAGE_KEYS } from "@/utils/storage.util";

export const getCategories = async (): Promise<Category[]> => {
  const categories = await getObject<Category[]>(STORAGE_KEYS.CATEGORIES);
  return categories ?? [];
};

export const saveCategories = async (categories: Category[]): Promise<void> => {
  await setObject(STORAGE_KEYS.CATEGORIES, categories);
};

export const addCategory = async (category: Category): Promise<Category[]> => {
  const categories = await getCategories();
  const updated = [...categories, category];
  await saveCategories(updated);
  return updated;
};

export const updateCategory = async (
  categoryId: string,
  updates: Partial<Omit<Category, "id">>
): Promise<Category[]> => {
  const categories = await getCategories();
  const updated = categories.map((cat) => (cat.id === categoryId ? { ...cat, ...updates } : cat));
  await saveCategories(updated);
  return updated;
};

export const deleteCategory = async (categoryId: string): Promise<Category[]> => {
  const categories = await getCategories();
  const updated = categories.filter((cat) => cat.id !== categoryId);
  await saveCategories(updated);
  return updated;
};

export const findCategoryById = async (categoryId: string): Promise<Category> => {
  const categories = await getCategories();

  const category = categories.find((category) => category.id === categoryId);

  if (!category) {
    throw new Error("카테고리를 찾을 수 없습니다.");
  }

  return category;
};
