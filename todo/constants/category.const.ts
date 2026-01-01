import { Category } from "@/types/category.type";

export const CATEGORIES: Category[] = [
  { id: "WORK", label: "업무", color: "#3B82F6" },
  { id: "PERSONAL", label: "개인", color: "#8B5CF6" },
  { id: "SHOPPING", label: "쇼핑", color: "#EF4444" },
  { id: "HEALTH", label: "건강", color: "#10B981" },
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find((category) => category.id === id);
};
