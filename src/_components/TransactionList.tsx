"use client";

import { BudgetItem } from "@/types/budget";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Wallet } from "lucide-react";

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function TransactionList({
  transactions,
}: {
  transactions: BudgetItem[];
}) {
  const totalBalance = transactions.reduce((acc, item) => {
    return item.type === "income" ? acc + item.amount : acc - item.amount;
  }, 0);

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
        <Wallet className="h-5 w-5" /> Riwayat Transaksi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 space-y-1">
          <h3 className="text-sm text-gray-600">Saldo Total</h3>
          <p
            className={`text-xl font-bold ${
              totalBalance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatRupiah(totalBalance)}
          </p>
        </Card>

        <Card className="p-4 space-y-1">
          <h3 className="text-sm text-gray-600">Total Pemasukan</h3>
          <p className="text-xl font-bold text-green-600">
            {formatRupiah(totalIncome)}
          </p>
        </Card>

        <Card className="p-4 space-y-1">
          <h3 className="text-sm text-gray-600">Total Pengeluaran</h3>
          <p className="text-xl font-bold text-red-600">
            {formatRupiah(totalExpenses)}
          </p>
        </Card>
      </div>

      {transactions.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          <p>Belum ada transaksi. Tambahkan transaksi pertama Anda!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {transactions.map((item) => (
            <Card
              key={item.id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      item.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.type === "income" ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}
                  {formatRupiah(item.amount)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
