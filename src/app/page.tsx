"use client";

import { useEffect, useState } from "react";
import BudgetForm from "@/_components/BudgetForm";
import TransactionList from "@/_components/TransactionList";
import { BudgetItem } from "@/types/budget";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [transactions, setTransactions] = useState<BudgetItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTransactions = localStorage.getItem("transactions");
      setTransactions(savedTransactions ? JSON.parse(savedTransactions) : []);
    }
  }, []);

  const handleAddTransaction = (item: BudgetItem) => {
    const newTransactions = [item, ...transactions];
    setTransactions(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-start justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-2xl space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            💰 Catatan Keuangan
          </h1>
          <p className="text-gray-600">Kelola pemasukan dan pengeluaran Anda</p>
        </header>

        <Card className="p-6 shadow-sm">
          <BudgetForm onAdd={handleAddTransaction} />
        </Card>

        <Card className="p-6 shadow-sm">
          <TransactionList transactions={transactions} />
        </Card>
      </div>
    </main>
  );
}
