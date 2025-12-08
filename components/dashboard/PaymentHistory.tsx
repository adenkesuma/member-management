// components/dashboard/PaymentHistory.tsx
import { Button } from "@/components/ui/button";
import { Download, Eye, Receipt } from "lucide-react";
import Link from "next/link";

const paymentHistory = [
  {
    id: 1,
    invoice: "INV-2024-001",
    date: "15 Jan 2024",
    amount: "Rp 2.500.000",
    method: "Transfer Bank",
    status: "success",
    description: "Iuran Tahunan 2024"
  },
  {
    id: 2,
    invoice: "INV-2023-012",
    date: "20 Dec 2023",
    amount: "Rp 2.500.000",
    method: "Virtual Account",
    status: "success",
    description: "Iuran Tahunan 2023"
  },
  {
    id: 3,
    invoice: "INV-2022-011",
    date: "18 Dec 2022",
    amount: "Rp 2.300.000",
    method: "Credit Card",
    status: "success",
    description: "Iuran Tahunan 2022"
  },
  {
    id: 4,
    invoice: "INV-2021-010",
    date: "10 Dec 2021",
    amount: "Rp 2.300.000",
    method: "Transfer Bank",
    status: "success",
    description: "Iuran Tahunan 2021"
  },
  {
    id: 5,
    invoice: "INV-2020-009",
    date: "05 Dec 2020",
    amount: "Rp 2.100.000",
    method: "Virtual Account",
    status: "success",
    description: "Iuran Tahunan 2020"
  }
];

export default function PaymentHistory() {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Invoice</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tanggal</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Jumlah</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Metode</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium">{payment.invoice}</p>
                    <p className="text-sm text-gray-500">{payment.description}</p>
                  </div>
                </td>
                <td className="py-3 px-4">{payment.date}</td>
                <td className="py-3 px-4 font-semibold">{payment.amount}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {payment.method}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    payment.status === 'success' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {payment.status === 'success' ? 'Berhasil' : 'Gagal'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Receipt className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t">
        <p className="text-sm text-gray-600">Menampilkan 5 dari 24 transaksi</p>
        <Link href="/dashboard/payments">
          <Button variant="outline">Lihat Semua Riwayat</Button>
        </Link> 
      </div>
    </div>
  );
}