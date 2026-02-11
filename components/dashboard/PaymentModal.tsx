// components/dashboard/PaymentModal.tsx
"use client";

import { useState } from "react";
import { X, Copy, Check, Banknote, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  amount,
}: PaymentModalProps) {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Data rekening tujuan
  const bankAccounts = [
    {
      id: "bca",
      bank: "BCA",
      accountNumber: "1234567890",
      accountName: "PDSKKI CABANG JAKARTA PUSAT",
    },
    {
      id: "bni",
      bank: "BNI",
      accountNumber: "0987654321",
      accountName: "PDSKKI CABANG JAKARTA PUSAT",
    },
    {
      id: "mandiri",
      bank: "Mandiri",
      accountNumber: "1122334455",
      accountName: "PDSKKI PUSAT",
    },
    {
      id: "bri",
      bank: "BRI",
      accountNumber: "5566778899",
      accountName: "PDSKKI PUSAT",
    },
  ];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(type);
    setCopySuccess("Berhasil disalin!");

    setTimeout(() => {
      setCopySuccess(null);
      setCopiedBank(null);
    }, 2000);
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-3xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5 text-primary" />
            Detail Pembayaran Iuran
          </DialogTitle>
          <DialogDescription>
            Silakan transfer ke salah satu rekening berikut
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informasi Pembayaran */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Jumlah yang harus dibayar:</span>
              <span className="text-xl font-bold text-primary">
                {formatRupiah(amount)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                Jatuh tempo: <strong>31 Desember 2024</strong>
              </span>
            </div>
          </div>

          {/* Copy Success Message */}
          {copySuccess && (
            <div className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2 text-sm">
              <Check className="h-4 w-4" />
              {copySuccess}
            </div>
          )}

          {/* Daftar Rekening Tujuan */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">
              Rekening Tujuan Transfer:
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            account.bank === "BCA"
                              ? "bg-blue-100 text-primary"
                              : account.bank === "BNI"
                                ? "bg-green-100 text-green-600"
                                : account.bank === "Mandiri"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          <span className="font-bold text-sm">
                            {account.bank.charAt(0)}
                          </span>
                        </div>
                        <h4 className="font-medium">{account.bank}</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Atas Nama: {account.accountName}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() =>
                        handleCopy(account.accountNumber, account.id)
                      }
                    >
                      {copiedBank === account.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      Salin
                    </Button>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        No. Rekening:
                      </span>
                      <div className="flex items-center gap-2">
                        <code className="text-lg font-bold tracking-wider text-gray-900">
                          {account.accountNumber}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instruksi Pembayaran */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <h4 className="font-medium text-amber-800">
                Instruksi Pembayaran:
              </h4>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-sm text-amber-700">
              <li>Transfer ke salah satu rekening di atas</li>
              <li>Gunakan NPA Anda sebagai keterangan transfer</li>
              <li>Simpan bukti transfer</li>
              <li>Status pembayaran akan diperbarui dalam 1x24 jam</li>
            </ol>
          </div>

          {/* Info Tambahan */}
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Keterangan Transfer:</strong> NPA-PDSKKI-2024-001
            </p>
            <p>
              <strong>Untuk konfirmasi:</strong> Kirim bukti transfer ke
              WhatsApp Admin: 0812-3456-7890
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Tutup
          </Button>
          <Button
            onClick={() => handleCopy("NPA-PDSKKI-2024-001", "keterangan")}
            className="flex-1 bg-primary hover:bg-primary"
          >
            Salin Keterangan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
