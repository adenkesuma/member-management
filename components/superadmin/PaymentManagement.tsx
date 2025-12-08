// components/superadmin/PaymentManagement.tsx
import { CreditCard, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PaymentManagementProps {
  selectedBranch: string;
}

export default function PaymentManagement({ selectedBranch }: PaymentManagementProps) {
  // Data dummy pembayaran
  const payments = [
    { id: 1, memberName: "Dr. Ahmad Hidayat", npa: "PDSKKI-2024-001", amount: "Rp 2.500.000", date: "15 Jan 2024", status: "verified", branch: "dki-jakarta" },
    { id: 2, memberName: "Dr. Siti Nurhaliza", npa: "PDSKKI-2024-002", amount: "Rp 2.500.000", date: "14 Jan 2024", status: "pending", branch: "jawa-barat" },
    { id: 3, memberName: "Dr. Budi Santoso", npa: "PDSKKI-2024-003", amount: "Rp 2.500.000", date: "13 Jan 2024", status: "rejected", branch: "jawa-tengah" },
    { id: 4, memberName: "Dr. Maya Indah", npa: "PDSKKI-2024-004", amount: "Rp 2.500.000", date: "12 Jan 2024", status: "verified", branch: "jawa-timur" },
    { id: 5, memberName: "Dr. Rizky Pratama", npa: "PDSKKI-2024-005", amount: "Rp 2.500.000", date: "11 Jan 2024", status: "pending", branch: "bali" },
  ];

  // Filter berdasarkan cabang
  const filteredPayments = selectedBranch === "all" 
    ? payments 
    : payments.filter(p => p.branch === selectedBranch);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified": return "Terverifikasi";
      case "pending": return "Menunggu";
      case "rejected": return "Ditolak";
      default: return status;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900">
          Pembayaran Terbaru ({filteredPayments.length})
        </h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Filter</Button>
          <Button size="sm">Verifikasi Semua</Button>
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-medium text-sm text-gray-600">
          <div className="col-span-5">Anggota</div>
          <div className="col-span-2">Jumlah</div>
          <div className="col-span-2">Tanggal</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Aksi</div>
        </div>
        
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="grid grid-cols-12 p-4 border-t hover:bg-gray-50">
            <div className="col-span-5">
              <p className="font-medium">{payment.memberName}</p>
              <p className="text-sm text-gray-500">{payment.npa}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="font-semibold">{payment.amount}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="text-gray-700">{payment.date}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <Badge className={`${getStatusColor(payment.status)} flex items-center gap-1`}>
                {getStatusIcon(payment.status)}
                {getStatusText(payment.status)}
              </Badge>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="flex gap-1">
                {payment.status === "pending" && (
                  <>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <CreditCard className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-600">
          Menampilkan {filteredPayments.length} dari 45 pembayaran
        </div>
        <Button variant="outline" size="sm">
          Lihat Semua Pembayaran
        </Button>
      </div>
    </div>
  );
}