export type BudgetItem = {
  id: string;
  name: string;
  amount: number;
  type: "income" | "expense";
  date: string;
};
