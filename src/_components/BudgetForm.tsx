"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BudgetItem } from "@/types/budget";
import { Plus } from "lucide-react";

export default function BudgetForm({
  onAdd,
}: {
  onAdd: (item: BudgetItem) => void;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount.replace(/\./g, ""));

    if (!name.trim() || isNaN(amountValue) || amountValue <= 0) {
      alert("Mohon masukkan deskripsi dan jumlah yang valid");
      return;
    }

    const newItem: BudgetItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: amountValue,
      type,
      date,
    };

    onAdd(newItem);
    setName("");
    setAmount("");
  };

  const formatCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
        <Plus className="h-5 w-5" /> Tambah Transaksi Baru
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Deskripsi
            </label>
            <Input
              id="description"
              placeholder="Contoh: Gaji, Belanja"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700"
            >
              Jumlah (Rp)
            </label>
            <Input
              id="amount"
              type="text"
              placeholder="0"
              value={amount}
              onChange={formatCurrency}
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Jenis</label>
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <button
                type="button"
                onClick={() => setType("income")}
                className={`px-4 py-2 text-sm font-medium flex-1 transition-colors ${
                  type === "income"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Pemasukan
              </button>
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`px-4 py-2 text-sm font-medium flex-1 transition-colors ${
                  type === "expense"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Pengeluaran
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-700">
              Tanggal
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <Button
            type="submit"
            className="px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambahkan
          </Button>
        </div>
      </form>
    </div>
  );
}
