type Props = {
  income: number;
  expense: number;
  balance: number;
};

export default function SummaryCards({ income, expense, balance }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-sm text-muted-foreground">Total Saldo</h3>
        <p className="text-xl font-bold text-blue-700">
          Rp{balance.toLocaleString("id-ID")}
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-sm text-muted-foreground">Pemasukan</h3>
        <p className="text-xl font-bold text-cyan-600">
          Rp{income.toLocaleString("id-ID")}
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-sm text-muted-foreground">Pengeluaran</h3>
        <p className="text-xl font-bold text-pink-500">
          Rp{expense.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
