// components/dashboard/AllPaymentHistory.tsx - UPDATE
"use client";

import { useState, useEffect, useMemo } from "react";
import { Eye, Download, Receipt, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentDetailModal from "@/components/dashboard/PaymentDetailModal";

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
  year: string;
}

interface AllPaymentHistoryProps {
  filters?: {
    year?: string;
    status?: string;
    search?: string;
  };
}

export default function AllPaymentHistory({ filters = {} }: AllPaymentHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const itemsPerPage = 10;
  
  // Data lengkap 24 transaksi
  const allPayments: Payment[] = useMemo(() => [
    // 2024
    { id: 1, invoice: "INV-2024-001", date: "15 Jan 2024", amount: 2500000, method: "Transfer Bank", status: "success", description: "Iuran Tahunan 2024", category: "Tahunan", year: "2024" },
    { id: 2, invoice: "INV-2024-002", date: "15 Mar 2024", amount: 625000, method: "Virtual Account", status: "success", description: "Iuran Q1 2024", category: "Kuartal", year: "2024" },
    { id: 3, invoice: "INV-2024-003", date: "15 Jun 2024", amount: 625000, method: "Credit Card", status: "success", description: "Iuran Q2 2024", category: "Kuartal", year: "2024" },
    { id: 4, invoice: "INV-2024-004", date: "15 Sep 2024", amount: 625000, method: "Transfer Bank", status: "success", description: "Iuran Q3 2024", category: "Kuartal", year: "2024" },
    
    // 2023
    { id: 5, invoice: "INV-2023-012", date: "20 Dec 2023", amount: 2500000, method: "Virtual Account", status: "success", description: "Iuran Tahunan 2023", category: "Tahunan", year: "2023" },
    { id: 6, invoice: "INV-2023-011", date: "15 Sep 2023", amount: 625000, method: "Transfer Bank", status: "success", description: "Iuran Q3 2023", category: "Kuartal", year: "2023" },
    { id: 7, invoice: "INV-2023-010", date: "15 Jun 2023", amount: 625000, method: "Virtual Account", status: "success", description: "Iuran Q2 2023", category: "Kuartal", year: "2023" },
    { id: 8, invoice: "INV-2023-009", date: "15 Mar 2023", amount: 625000, method: "Credit Card", status: "success", description: "Iuran Q1 2023", category: "Kuartal", year: "2023" },
    
    // 2022
    { id: 9, invoice: "INV-2022-011", date: "18 Dec 2022", amount: 2300000, method: "Credit Card", status: "success", description: "Iuran Tahunan 2022", category: "Tahunan", year: "2022" },
    { id: 10, invoice: "INV-2022-010", date: "15 Sep 2022", amount: 575000, method: "Transfer Bank", status: "success", description: "Iuran Q3 2022", category: "Kuartal", year: "2022" },
    { id: 11, invoice: "INV-2022-009", date: "15 Jun 2022", amount: 575000, method: "Virtual Account", status: "success", description: "Iuran Q2 2022", category: "Kuartal", year: "2022" },
    { id: 12, invoice: "INV-2022-008", date: "15 Mar 2022", amount: 575000, method: "Transfer Bank", status: "success", description: "Iuran Q1 2022", category: "Kuartal", year: "2022" },
    
    // 2021
    { id: 13, invoice: "INV-2021-010", date: "10 Dec 2021", amount: 2300000, method: "Transfer Bank", status: "success", description: "Iuran Tahunan 2021", category: "Tahunan", year: "2021" },
    { id: 14, invoice: "INV-2021-009", date: "15 Sep 2021", amount: 575000, method: "Virtual Account", status: "success", description: "Iuran Q3 2021", category: "Kuartal", year: "2021" },
    { id: 15, invoice: "INV-2021-008", date: "15 Jun 2021", amount: 575000, method: "Credit Card", status: "success", description: "Iuran Q2 2021", category: "Kuartal", year: "2021" },
    { id: 16, invoice: "INV-2021-007", date: "15 Mar 2021", amount: 575000, method: "Transfer Bank", status: "success", description: "Iuran Q1 2021", category: "Kuartal", year: "2021" },
    
    // 2020
    { id: 17, invoice: "INV-2020-009", date: "05 Dec 2020", amount: 2100000, method: "Virtual Account", status: "success", description: "Iuran Tahunan 2020", category: "Tahunan", year: "2020" },
    { id: 18, invoice: "INV-2020-008", date: "15 Sep 2020", amount: 525000, method: "Transfer Bank", status: "success", description: "Iuran Q3 2020", category: "Kuartal", year: "2020" },
    { id: 19, invoice: "INV-2020-007", date: "15 Jun 2020", amount: 525000, method: "Credit Card", status: "success", description: "Iuran Q2 2020", category: "Kuartal", year: "2020" },
    { id: 20, invoice: "INV-2020-006", date: "15 Mar 2020", amount: 525000, method: "Virtual Account", status: "success", description: "Iuran Q1 2020", category: "Kuartal", year: "2020" },
    
    // 2019
    { id: 21, invoice: "INV-2019-008", date: "10 Dec 2019", amount: 2000000, method: "Transfer Bank", status: "success", description: "Iuran Tahunan 2019", category: "Tahunan", year: "2019" },
    { id: 22, invoice: "INV-2019-007", date: "15 Sep 2019", amount: 500000, method: "Virtual Account", status: "success", description: "Iuran Q3 2019", category: "Kuartal", year: "2019" },
    { id: 23, invoice: "INV-2019-006", date: "15 Jun 2019", amount: 500000, method: "Transfer Bank", status: "success", description: "Iuran Q2 2019", category: "Kuartal", year: "2019" },
    { id: 24, invoice: "INV-2019-005", date: "15 Mar 2019", amount: 500000, method: "Credit Card", status: "success", description: "Iuran Q1 2019", category: "Kuartal", year: "2019" },
  ], []);

  // Filter payments berdasarkan filter yang aktif
  const filteredPayments = useMemo(() => {
    return allPayments.filter(payment => {
      // Filter tahun
      if (filters.year && payment.year !== filters.year) return false;
      
      // Filter status
      if (filters.status && payment.status !== filters.status) return false;
      
      // Filter pencarian
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          payment.invoice.toLowerCase().includes(searchLower) ||
          payment.description.toLowerCase().includes(searchLower) ||
          payment.method.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [allPayments, filters]);

  useEffect(() => {
    setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
  }, [filters]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleViewDetail = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const handleDownloadReceipt = (payment: Payment) => {
    // Simulasi download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${payment.invoice}.pdf`;
    link.click();
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
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600">
            Menampilkan {filteredPayments.length} transaksi
            {filters.year && ` dari tahun ${filters.year}`}
            {filters.status && ` dengan status ${getStatusText(filters.status)}`}
          </p>
          <div className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Invoice</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Jumlah</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Kategori</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Metode</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.length > 0 ? (
                currentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{payment.invoice}</p>
                        <p className="text-sm text-gray-500">{payment.description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{payment.date}</td>
                    <td className="py-3 px-4 font-semibold">{formatRupiah(payment.amount)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {payment.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {payment.method}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusText(payment.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewDetail(payment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownloadReceipt(payment)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownloadReceipt(payment)}
                        >
                          <Receipt className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    Tidak ada transaksi yang ditemukan dengan filter yang dipilih
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredPayments.length > 0 && (
          <div className="flex justify-between items-center pt-4">
            <p className="text-sm text-gray-600">
              Menampilkan {startIndex + 1}-{endIndex} dari {filteredPayments.length} transaksi
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, index, array) => (
                    <div key={page} className="flex items-center">
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className="w-10 h-10 p-0"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    </div>
                  ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="gap-2"
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Detail Pembayaran */}
      <PaymentDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedPayment(null);
        }}
        payment={selectedPayment}
      />
    </>
  );
}