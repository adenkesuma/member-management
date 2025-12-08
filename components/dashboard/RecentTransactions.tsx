// components/dashboard/RecentTransactions.tsx
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function RecentTransactions() {
  const transactions = [
    { id: 1, invoice: "INV-2024-001", date: "15 Jan 2024", amount: "Rp 2.500.000", status: "success" },
    { id: 2, invoice: "INV-2023-012", date: "20 Dec 2023", amount: "Rp 2.500.000", status: "success" },
    { id: 3, invoice: "INV-2023-011", date: "15 Mar 2023", amount: "Rp 625.000", status: "success" },
    { id: 4, invoice: "INV-2022-010", date: "18 Dec 2022", amount: "Rp 2.300.000", status: "success" },
    { id: 5, invoice: "INV-2022-009", date: "15 Mar 2022", amount: "Rp 575.000", status: "success" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            {getStatusIcon(transaction.status)}
            <div>
              <p className="font-medium text-sm">{transaction.invoice}</p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">{transaction.amount}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              transaction.status === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {transaction.status === 'success' ? 'Berhasil' : 'Gagal'}
            </span>
          </div>
        </div>
      ))}
      
      <div className="pt-3 border-t">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Total 5 transaksi:</span>
          <span className="font-bold text-gray-900">Rp 8.550.000</span>
        </div>
      </div>
    </div>
  );
}