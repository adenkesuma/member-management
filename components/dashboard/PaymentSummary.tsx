// components/dashboard/PaymentSummary.tsx

export default function PaymentSummary() {
  const yearlyPayments = [
    { year: "2024", amount: 2500000, status: "paid" },
    { year: "2023", amount: 2500000, status: "paid" },
    { year: "2022", amount: 2300000, status: "paid" },
    { year: "2021", amount: 2300000, status: "paid" },
    { year: "2020", amount: 2100000, status: "paid" },
  ];

  const paymentMethods = [
    { method: "Transfer Bank", count: 3, percentage: 60 },
    { method: "Virtual Account", count: 2, percentage: 40 },
    { method: "Credit Card", count: 1, percentage: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Ringkasan per Tahun */}
      <div>
        <h3 className="font-medium text-gray-700 mb-3">
          Riwayat Iuran Tahunan
        </h3>
        <div className="space-y-3">
          {yearlyPayments.map((item) => (
            <div key={item.year} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium">{item.year}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">
                  Rp {item.amount.toLocaleString()}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  LUNAS
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metode Pembayaran */}
      <div>
        <h3 className="font-medium text-gray-700 mb-3">
          Metode Pembayaran Favorit
        </h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.method} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">{method.method}</span>
                <span className="text-sm font-medium">
                  {method.count} transaksi
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${method.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Summary */}
      <div className="p-4 bg-blue-50 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Pembayaran 5 Tahun</p>
            <p className="text-2xl font-bold text-gray-900">Rp 11.700.000</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Rata-rata per Tahun</p>
            <p className="text-lg font-semibold text-primary">Rp 2.340.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
