"use client";

import { useState, useEffect } from "react";
import BudgetForm from "@/_components/BudgetForm";
import { BudgetItem } from "@/types/budget";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { FaPlusCircle, FaMoneyBillWave, FaMoneyCheckAlt } from "react-icons/fa";

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

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-blue-50 to-white text-gray-800">
      <div className="w-full max-w-2xl p-8 md:p-12 space-y-10 bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight leading-tight">
            📊 Budget Planner
          </h1>
          <p className="text-gray-600 text-base text-center leading-relaxed">
            Catat dan kelola keuangan pribadi kamu dengan cepat &amp; mudah.
          </p>
        </div>

        {/* Form Input */}
        <BudgetForm onAdd={handleAdd} />

        {/* List Transaksi */}
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-base text-gray-500 flex flex-col items-center space-y-4">
            <FaPlusCircle className="text-3xl" />
            <span>
              Belum ada data transaksi. Silakan tambahkan dari form di atas.
            </span>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-6 rounded-lg border shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-200"
              >
                <div className="flex items-center gap-4">
                  {item.type === "income" ? (
                    <FaMoneyBillWave
                      className="text-green-600 flex-shrink-0"
                      size={28}
                    />
                  ) : (
                    <FaMoneyCheckAlt
                      className="text-red-500 flex-shrink-0"
                      size={28}
                    />
                  )}
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.type === "income" ? "Pemasukan" : "Pengeluaran"}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-bold text-xl ${
                    item.type === "income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  Rp{item.amount.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
