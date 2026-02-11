// components/dashboard/UpcomingPayments.tsx - UPDATE
"use client";

import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentModal from "@/components/dashboard/PaymentModal";

export default function UpcomingPayments() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(2500000);

  const upcoming = [
    {
      id: 1,
      description: "Iuran Tahunan 2025",
      dueDate: "15 Jan 2025",
      amount: 2500000,
      daysLeft: 45,
    },
    {
      id: 2,
      description: "Iuran Keanggotaan Q2 2024",
      dueDate: "30 Mar 2024",
      amount: 625000,
      daysLeft: 12,
    },
  ];

  const handlePayNow = (amount: number) => {
    setSelectedAmount(amount);
    setShowPaymentModal(true);
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div className="space-y-4">
        {upcoming.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-xl hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900">
                  {item.description}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Jatuh tempo: {item.dueDate}</span>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {formatRupiah(item.amount)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="text-amber-600 font-medium">
                  {item.daysLeft} hari lagi
                </span>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary"
                onClick={() => handlePayNow(item.amount)}
              >
                Bayar Sekarang
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Tidak ada pembayaran mendatang lainnya
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Lihat Jadwal Lengkap
            </Button>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={selectedAmount}
      />
    </>
  );
}
