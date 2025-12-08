// components/superadmin/branch/BranchPayments.tsx
"use client";

import { CreditCard, CheckCircle, XCircle, Clock, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface BranchPaymentsProps {
  branchId: string;
}

interface Payment {
  id: number;
  memberName: string;
  npa: string;
  amount: string;
  date: string;
  dueDate: string;
  status: "verified" | "pending" | "overdue" | "rejected";
  method: string;
  invoice: string;
}

export default function BranchPayments({ branchId }: BranchPaymentsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Data dummy pembayaran berdasarkan cabang
  const getPaymentsByBranch = (branchId: string): Payment[] => {
    return [
      { id: 1, memberName: "Dr. Ahmad Hidayat", npa: `PDSKKI-${branchId.toUpperCase()}-001`, amount: "Rp 2.500.000", date: "15 Jan 2024", dueDate: "31 Jan 2024", status: "verified", method: "Transfer Bank", invoice: "INV-2024-001" },
      { id: 2, memberName: "Dr. Siti Nurhaliza", npa: `PDSKKI-${branchId.toUpperCase()}-002`, amount: "Rp 2.500.000", date: "14 Jan 2024", dueDate: "31 Jan 2024", status: "pending", method: "Virtual Account", invoice: "INV-2024-002" },
      { id: 3, memberName: "Dr. Budi Santoso", npa: `PDSKKI-${branchId.toUpperCase()}-003`, amount: "Rp 2.500.000", date: "13 Jan 2024", dueDate: "31 Jan 2024", status: "overdue", method: "Credit Card", invoice: "INV-2024-003" },
      { id: 4, memberName: "Dr. Maya Indah", npa: `PDSKKI-${branchId.toUpperCase()}-004`, amount: "Rp 2.500.000", date: "12 Jan 2024", dueDate: "31 Jan 2024", status: "verified", method: "Transfer Bank", invoice: "INV-2024-004" },
      { id: 5, memberName: "Dr. Rizky Pratama", npa: `PDSKKI-${branchId.toUpperCase()}-005`, amount: "Rp 2.500.000", date: "11 Jan 2024", dueDate: "31 Jan 2024", status: "rejected", method: "E-Wallet", invoice: "INV-2024-005" },
      { id: 6, memberName: "Dr. Ani Wijaya", npa: `PDSKKI-${branchId.toUpperCase()}-006`, amount: "Rp 2.500.000", date: "10 Jan 2024", dueDate: "31 Jan 2024", status: "verified", method: "Transfer Bank", invoice: "INV-2024-006" },
      { id: 7, memberName: "Dr. Hendra Gunawan", npa: `PDSKKI-${branchId.toUpperCase()}-007`, amount: "Rp 2.500.000", date: "09 Jan 2024", dueDate: "31 Jan 2024", status: "pending", method: "Virtual Account", invoice: "INV-2024-007" },
    ];
  };

  const payments = getPaymentsByBranch(branchId);
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(startIndex, startIndex + itemsPerPage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "overdue": return <Clock className="h-4 w-4 text-red-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified": return "Terverifikasi";
      case "pending": return "Menunggu";
      case "overdue": return "Terlambat";
      case "rejected": return "Ditolak";
      default: return status;
    }
  };

  const handleVerify = (paymentId: number) => {
    alert(`Verifikasi pembayaran ${paymentId}`);
  };

  const handleReject = (paymentId: number) => {
    alert(`Tolak pembayaran ${paymentId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900">
          Daftar Pembayaran ({payments.length})
        </h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Filter</Button>
          <Button size="sm">Verifikasi Semua</Button>
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-medium text-sm text-gray-600">
          <div className="col-span-4">Anggota</div>
          <div className="col-span-2">Jumlah</div>
          <div className="col-span-2">Jatuh Tempo</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Aksi</div>
        </div>
        
        {currentPayments.map((payment) => (
          <div key={payment.id} className="grid grid-cols-12 p-4 border-t hover:bg-gray-50">
            <div className="col-span-4">
              <p className="font-medium">{payment.memberName}</p>
              <p className="text-sm text-gray-500">{payment.npa}</p>
              <p className="text-xs text-gray-400">{payment.invoice}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="font-semibold">{payment.amount}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="text-gray-700">{payment.dueDate}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <Badge className={`${getStatusColor(payment.status)} flex items-center gap-1`}>
                {getStatusIcon(payment.status)}
                {getStatusText(payment.status)}
              </Badge>
            </div>
            <div className="col-span-2 flex items-center">
              <div className="flex gap-1">
                {payment.status === "pending" || payment.status === "overdue" ? (
                  <>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-green-600"
                      onClick={() => handleVerify(payment.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => handleReject(payment.id)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </>
                ) : null}
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-600">
          Menampilkan {startIndex + 1}-{startIndex + currentPayments.length} dari {payments.length} pembayaran
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(0, 3)
              .map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}