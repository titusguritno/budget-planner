import { BudgetItem } from "@/types/budget";

const STORAGE_KEY = `BUDGET-DATA`;

export function saveToStorage(data: BudgetItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadFromStorage(): BudgetItem[] {
  if (typeof window === `undefined`) return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
