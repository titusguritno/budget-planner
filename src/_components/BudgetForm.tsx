"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BudgetItem } from "@/types/budget";

type BudgetFormProps = {
  onAdd: (item: BudgetItem) => void;
};

export default function BudgetForm({ onAdd }: BudgetFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount.trim()) return;

    const newItem: BudgetItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString(),
    };

    onAdd(newItem);
    setName("");
    setAmount("");
    setType("income");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
    >
      {/* Nama Transaksi */}
      <div className="space-y-2">
        <Label htmlFor="name">Nama Transaksi</Label>
        <Input
          id="name"
          placeholder="Contoh: Gaji, Makan siang"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Jumlah */}
      <div className="space-y-2">
        <Label htmlFor="amount">Jumlah (Rp)</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          placeholder="Contoh: 100000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Jenis Transaksi */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Jenis</Label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="type"
              value="income"
              checked={type === "income"}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
              className="accent-green-600"
            />
            <span className="text-gray-600">Pemasukan</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
              className="accent-red-500"
            />
            <span className="text-gray-600">Pengeluaran</span>
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full text-base">
        Tambahkan Transaksi
      </Button>
    </form>
  );
}
