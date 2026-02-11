// components/dashboard/QuickPaymentActions.tsx - UPDATE
"use client";

import { useState } from "react";
import { CreditCard, Building, Smartphone, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentModal from "@/components/dashboard/PaymentModal";

export default function QuickPaymentActions() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const paymentMethods = [
    {
      icon: <Building className="h-5 w-5" />,
      name: "Transfer Bank",
      description: "BNI, BRI, BCA, Mandiri",
    },
    // { icon: <CreditCard className="h-5 w-5" />, name: "Kartu Kredit", description: "Visa, Mastercard" },
    // { icon: <Smartphone className="h-5 w-5" />, name: "E-Wallet", description: "OVO, GoPay, Dana" },
    // { icon: <Wallet className="h-5 w-5" />, name: "Virtual Account", description: "VA Billing" },
  ];

  const handlePaymentClick = () => {
    setShowPaymentModal(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((method, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:border-blue-300 hover:bg-blue-50"
              onClick={handlePaymentClick}
            >
              <div className="text-primary">{method.icon}</div>
              <div className="text-center">
                <p className="font-medium text-sm">{method.name}</p>
                <p className="text-xs text-gray-500">{method.description}</p>
              </div>
            </Button>
          ))}
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Jumlah yang harus dibayar:</span>
            <span className="text-lg font-bold text-gray-900">
              Rp 2.500.000
            </span>
          </div>
          <Button onClick={handlePaymentClick} className="w-full bg-0">
            Bayar Sekarang
          </Button>
          <p className="text-xs text-center text-gray-500">
            Pembayaran akan diproses dalam 1x24 jam
          </p>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={2500000}
      />
    </>
  );
}
