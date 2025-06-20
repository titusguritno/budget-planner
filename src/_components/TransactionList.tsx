import { BudgetItem } from "@/types/budget";
import { FaMoneyBillWave, FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

type Props = {
  items: BudgetItem[];
  onDelete: (id: string) => void; // Add onDelete prop
};

export default function TransactionList({ items, onDelete }: Props) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl text-gray-500 space-y-2">
        <FaMoneyBillWave className="text-4xl mx-auto" />
        <p>Belum ada transaksi</p>
        <p className="text-sm text-gray-400">
          Tambahkan transaksi terlebih dahulu
        </p>
      </div>
    );
  }

  const handleDelete = (id: string) => {
    // Show toast notification
    toast(`Transaksi akan dihapus.`, {
      description: "Klik lagi untuk mengonfirmasi penghapusan.",
      action: {
        label: "Hapus",
        onClick: () => {
          onDelete(id); // Call the onDelete function if confirmed
          toast.success("Transaksi berhasil dihapus.");
        },
      },
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow transition"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm text-white ${
                item.type === "income" ? "bg-cyan-500" : "bg-pink-500"
              }`}
            >
              {item.type === "income" ? (
                <FaMoneyBillWave />
              ) : (
                <FaMoneyCheckAlt />
              )}
            </div>
            <div>
              <p className="font-medium text-sm md:text-base">{item.name}</p>
              <p className="text-xs text-gray-400">
                {new Date(item.date).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`font-semibold text-sm md:text-base ${
                item.type === "income" ? "text-cyan-600" : "text-pink-500"
              }`}
            >
              {item.type === "income" ? "+" : "-"} Rp
              {item.amount.toLocaleString("id-ID")}
            </div>
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 hover:text-red-700 transition"
              aria-label="Delete transaction"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
