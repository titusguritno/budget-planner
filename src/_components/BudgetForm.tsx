"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BudgetItem } from "@/types/budget";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { FaPlusCircle, FaCalendarAlt } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function BudgetForm({
  onAdd,
}: {
  onAdd: (item: BudgetItem) => void;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !amount.trim() || !date) {
      toast.error("Harap isi semua data transaksi terlebih dahulu!");
      return;
    }

    const newItem: BudgetItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: parseFloat(amount),
      type,
      date: date.toISOString(),
    };

    onAdd(newItem);
    setName("");
    setAmount("");
    setType("income");
    setDate(new Date());

    toast.success("Transaksi berhasil ditambahkan!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto rounded-xl border bg-white shadow-md px-6 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Judul Form */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FaPlusCircle className="text-primary" />
          Tambahkan Transaksi Baru
        </div>

        {/* Input Deskripsi & Jumlah */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Contoh: gaji, belanja, dll"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
          <Input
            type="number"
            placeholder="Jumlah"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Toggle & Date */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex bg-gray-100 rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => setType("income")}
              className={`px-4 py-2 text-sm font-medium transition rounded-l-md ${
                type === "income" ? "bg-[#4361ee] text-white" : "text-gray-700"
              }`}
            >
              Pemasukan
            </button>
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`px-4 py-2 text-sm font-medium transition rounded-r-md ${
                type === "expense" ? "bg-[#4361ee] text-white" : "text-gray-700"
              }`}
            >
              Pengeluaran
            </button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-60 justify-between text-left text-sm font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "dd/MM/yyyy") : <span>Pilih tanggal</span>}
                <FaCalendarAlt className="ml-2 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Tombol Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#4361ee] to-[#3f37c9]
        text-white text-sm font-semibold uppercase rounded-md px-6 py-3 hover:opacity-90 transition"
          >
            <FaPlusCircle className="text-base" />
            Simpan Transaksi
          </Button>
        </div>
      </form>
    </Card>
  );
}
