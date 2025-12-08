"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Send,
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PaymentTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const payments = [
    {
      id: "1",
      memberId: "PDSKKI-2025-001",
      name: "John Doe",
      email: "john@example.com",
      branch: "Jakarta",
      amount: "Rp 800.000",
      period: "Maret 2025",
      dueDate: "10 Mar 2025",
      status: "pending",
      statusText: "Menunggu",
      paymentMethod: "Bank Transfer",
      lastReminder: "2 hari lalu",
    },
    {
      id: "2",
      memberId: "PDSKKI-2025-002",
      name: "Jane Smith",
      email: "jane@example.com",
      branch: "Bandung",
      amount: "Rp 800.000",
      period: "Maret 2025",
      dueDate: "10 Mar 2025",
      status: "paid",
      statusText: "Lunas",
      paymentMethod: "Credit Card",
      lastReminder: "-",
    },
    {
      id: "3",
      memberId: "PDSKKI-2025-003",
      name: "Budi Santoso",
      email: "budi@example.com",
      branch: "Surabaya",
      amount: "Rp 800.000",
      period: "Februari 2025",
      dueDate: "10 Feb 2025",
      status: "overdue",
      statusText: "Terlambat",
      paymentMethod: "-",
      lastReminder: "1 minggu lalu",
    },
    {
      id: "4",
      memberId: "PDSKKI-2025-004",
      name: "Siti Aisyah",
      email: "siti@example.com",
      branch: "Yogyakarta",
      amount: "Rp 800.000",
      period: "Maret 2025",
      dueDate: "10 Mar 2025",
      status: "unpaid",
      statusText: "Belum Bayar",
      paymentMethod: "-",
      lastReminder: "Belum",
    },
    {
      id: "5",
      memberId: "PDSKKI-2025-005",
      name: "Andi Wijaya",
      email: "andi@example.com",
      branch: "Jakarta",
      amount: "Rp 1.000.000",
      period: "Maret 2025",
      dueDate: "10 Mar 2025",
      status: "paid",
      statusText: "Lunas",
      paymentMethod: "E-Wallet",
      lastReminder: "-",
    },
  ];

  const toggleRow = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === payments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(payments.map(p => p.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "unpaid": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Data Pembayaran</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {selectedRows.length > 0 ? `${selectedRows.length} terpilih` : ""}
          </span>
          {selectedRows.length > 0 && (
            <Button variant="outline" size="sm">
              Kirim Pengingat Massal
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 w-12">
                  <Checkbox 
                    checked={selectedRows.length === payments.length && payments.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left py-3">Anggota</th>
                <th className="text-left py-3">Cabang</th>
                <th className="text-left py-3">Periode</th>
                <th className="text-left py-3">Jumlah</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Metode</th>
                <th className="text-left py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <Checkbox 
                      checked={selectedRows.includes(payment.id)}
                      onCheckedChange={() => toggleRow(payment.id)}
                    />
                  </td>
                  <td className="py-3">
                    <div>
                      <p className="font-medium">{payment.name}</p>
                      <p className="text-gray-500 text-xs">{payment.memberId}</p>
                      <p className="text-gray-500 text-xs">{payment.email}</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                      {payment.branch}
                    </span>
                  </td>
                  <td className="py-3">
                    <div>
                      <p className="font-medium">{payment.period}</p>
                      <p className="text-gray-500 text-xs">Jatuh tempo: {payment.dueDate}</p>
                    </div>
                  </td>
                  <td className="py-3 font-medium">{payment.amount}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                      {payment.statusText}
                    </span>
                    {payment.lastReminder !== "-" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Reminder: {payment.lastReminder}
                      </p>
                    )}
                  </td>
                  <td className="py-3">
                    {payment.paymentMethod !== "-" ? (
                      <span className="text-gray-700">{payment.paymentMethod}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Pembayaran
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            Kirim Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Menampilkan 1-5 dari 342 data
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="sm">
              10
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}