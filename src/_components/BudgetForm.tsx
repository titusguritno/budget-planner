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
    if (!name.trim() || !amount.trim() || !date) return;

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
    <Card className="w-full rounded-xl border bg-white shadow-md p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Judul Form */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FaPlusCircle className="text-primary" />
          Add New Transaction
        </div>

        {/* Input Deskripsi & Jumlah */}
        <div className="flex flex-col md:flex-row gap-6">
          <Input
            placeholder="Description"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Toggle & Date */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex bg-gray-100 rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => setType("income")}
              className={`px-4 py-2 text-sm font-medium transition rounded-l-md ${
                type === "income" ? "bg-[#4361ee] text-white" : "text-gray-700"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`px-4 py-2 text-sm font-medium transition rounded-r-md ${
                type === "expense" ? "bg-[#4361ee] text-white" : "text-gray-700"
              }`}
            >
              Expense
            </button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "md:max-w-xs w-full justify-between text-left text-sm font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "dd/MM/yyyy") : <span>Select date</span>}
                <FaCalendarAlt className="ml-2 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Tombol Submit */}
        <Button
          type="submit"
          className=" flex items-center gap-2 px-6 py-4 text-base font-semibold text-white
             bg-gradient-to-r from-[#4361ee] to-[#3f37c9] border border-[#3f37c9] 
             rounded-md hover:opacity-90 transition"
        >
          <FaPlusCircle className="text-lg" />
          Add Transaction
        </Button>
      </form>
    </Card>
  );
}
