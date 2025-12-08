// components/dashboard/PaymentDetailModal.tsx
import { X, Copy, Check, Download, Calendar, CreditCard, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Payment {
  id: number;
  invoice: string;
  date: string;
  amount: number;
  method: string;
  status: "success" | "pending" | "failed";
  description: string;
  category: string;
  proof?: string;
}

interface PaymentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
}

export default function PaymentDetailModal({ isOpen, onClose, payment }: PaymentDetailModalProps) {
  if (!payment) return null;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Berhasil';
      case 'pending': return 'Menunggu';
      case 'failed': return 'Gagal';
      default: return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Detail Pembayaran
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-bold text-lg">{payment.invoice}</h3>
                <p className="text-gray-600">{payment.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                {getStatusText(payment.status)}
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{formatRupiah(payment.amount)}</p>
          </div>

          {/* Detail Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Tanggal Transaksi</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="font-medium">{payment.date}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Metode Pembayaran</p>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-400" />
                <p className="font-medium">{payment.method}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Kategori</p>
              <p className="font-medium">{payment.category}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Status Verifikasi</p>
              <p className="font-medium text-green-600">✓ Terverifikasi</p>
            </div>
          </div>

          {/* Keterangan */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Keterangan Pembayaran</h4>
            <p className="text-gray-700 text-sm">
              Pembayaran {payment.description.toLowerCase()} untuk keanggotaan PDSKKI tahun {payment.date.slice(-4)}.
              Status pembayaran sudah diverifikasi oleh admin.
            </p>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Keterangan Transfer:</strong> {payment.invoice} - {payment.description}
              </p>
            </div>
          </div>

          {/* Bukti Pembayaran */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Bukti Pembayaran</h4>
            {payment.proof ? (
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Bukti transfer tersedia</p>
                  <Button variant="outline" className="mt-2 gap-2">
                    <Download className="h-4 w-4" />
                    Download Bukti Transfer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Tidak ada bukti transfer yang diunggah</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Tutup
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2">
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}