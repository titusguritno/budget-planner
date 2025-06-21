"use client";

import { useState, useEffect } from "react";
import BudgetForm from "@/_components/BudgetForm";
import SummaryCards from "@/_components/SummaryCards";
import TransactionList from "@/_components/TransactionList";
import { BudgetItem } from "@/types/budget";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { FaWallet } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [items, setItems] = useState<BudgetItem[]>([]);

  useEffect(() => {
    const data = loadFromStorage();
    setItems(data);
  }, []);

  const handleAdd = (item: BudgetItem) => {
    const newItems = [item, ...items];
    setItems(newItems);
    saveToStorage(newItems);
  };

  const handleDelete = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveToStorage(updatedItems); // Update storage if necessary
  };

  // Calculate income, expense, and balance based on the current items
  const income = items
    .filter((i) => i.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const expense = items
    .filter((i) => i.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-start justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
        <section className="bg-white rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="relative h-[140px] bg-gradient-to-r from-[#4361ee] to-[#3f37c9] text-white text-center px-6 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <FaWallet className="text-2xl" /> Catatan Keuangan
            </h1>
            <p className="text-sm md:text-base opacity-90 mt-2">
              Catat dan kendalikan keuangan mu dengan mudah
            </p>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-white rounded-t-2xl z-0" />
          </div>

          {/* Content Container */}
          <div className="pt-10 pb-12 px-6 md:px-8 bg-white relative z-10">
            <div className="w-full flex flex-col gap-10 items-center">
              {/* Budget Form */}
              <Card className="w-full max-w-2xl">
                <CardContent className="p-6 md:p-8">
                  <BudgetForm onAdd={handleAdd} />
                </CardContent>
              </Card>

              {/* Summary Cards */}
              <Card className="w-full max-w-2xl">
                <CardContent className="p-6 md:p-8">
                  <SummaryCards
                    income={income}
                    expense={expense}
                    balance={balance}
                  />
                </CardContent>
              </Card>

              {/* Transaction List */}
              <Card className="w-full max-w-2xl">
                <CardContent className="p-6 md:p-8">
                  <TransactionList items={items} onDelete={handleDelete} />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
