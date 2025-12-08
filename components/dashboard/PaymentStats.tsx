// components/dashboard/PaymentStats.tsx
import { TrendingUp, CreditCard, CheckCircle, Calendar } from "lucide-react";

export default function PaymentStats() {
  const stats = [
    {
      title: "Total Pembayaran",
      value: "Rp 11.700.000",
      description: "2019-2024",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Transaksi Berhasil",
      value: "24",
      description: "100% success rate",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Metode Terbanyak",
      value: "Transfer Bank",
      description: "12 transaksi",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Tahun Aktif",
      value: "6 Tahun",
      description: "2019-2024",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">+12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="font-medium text-gray-700">{stat.title}</p>
          <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}