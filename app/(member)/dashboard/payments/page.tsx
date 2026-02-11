// app/dashboard/payments/page.tsx - Halaman Semua Riwayat Pembayaran
"use client";

import { useState } from "react";
import AllPaymentHistory from "@/components/dashboard/AllPaymentHistory";
import PaymentStats from "@/components/dashboard/PaymentStats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Download,
  Filter,
  Search,
  Calendar,
  FileText,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export default function PaymentsPage() {
  const [yearFilter, setYearFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <ArrowLeft className="size-8" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Semua Riwayat Pembayaran
                </h1>
                <p className="text-gray-600">
                  Detail lengkap semua transaksi pembayaran iuran
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <FileText className="h-4 w-4" />
                    Export Excel (.xlsx)
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <FileText className="h-4 w-4" />
                    Export PDF (.pdf)
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <FileText className="h-4 w-4" />
                    Export CSV (.csv)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Statistik Ringkas */}
          <PaymentStats />

          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  24 Transaksi Pembayaran
                </h2>
                <p className="text-gray-600">
                  Riwayat lengkap dari tahun 2020 - 2024
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter Lanjutan
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari invoice atau keterangan..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Year Filter */}
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Semua Tahun" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tahun</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="success">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Berhasil
                    </div>
                  </SelectItem>
                  <SelectItem value="pending">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Menunggu
                    </div>
                  </SelectItem>
                  <SelectItem value="failed">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      Gagal
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Applied Filters */}
            {(yearFilter || statusFilter || searchQuery) && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Filter aktif:</span>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <div className="inline-flex items-center gap-1 bg-blue-50 text-primary px-3 py-1 rounded-full text-sm">
                        "{searchQuery}"
                        <button
                          onClick={() => setSearchQuery("")}
                          className="ml-1 text-primary hover:text-primary"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {yearFilter && (
                      <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                        Tahun: {yearFilter}
                        <button
                          onClick={() => setYearFilter("")}
                          className="ml-1 text-green-500 hover:text-green-700"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {statusFilter && (
                      <div className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                        Status:{" "}
                        {statusFilter === "success"
                          ? "Berhasil"
                          : statusFilter === "pending"
                            ? "Menunggu"
                            : "Gagal"}
                        <button
                          onClick={() => setStatusFilter("")}
                          className="ml-1 text-purple-500 hover:text-purple-700"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setYearFilter("");
                      setStatusFilter("");
                      setSearchQuery("");
                    }}
                    className="ml-auto text-sm"
                  >
                    Reset semua filter
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Tabel Semua Riwayat */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6">
              <AllPaymentHistory
                filters={{
                  year: yearFilter,
                  status: statusFilter,
                  search: searchQuery,
                }}
              />
            </div>
          </div>

          {/* Info Tambahan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <div className="h-6 w-6 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-blue-800 mb-2">
                    Ringkasan Total
                  </h3>
                  <p className="text-gray-700">
                    Total semua pembayaran:{" "}
                    <strong className="text-primary">Rp 11.700.000</strong>
                    <br />
                    Rata-rata per tahun:{" "}
                    <strong className="text-primary">Rp 2.340.000</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <div className="h-6 w-6 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-green-800 mb-2">
                    Status Pembayaran
                  </h3>
                  <p className="text-gray-700">
                    Transaksi berhasil:{" "}
                    <strong className="text-green-700">24</strong>
                    <br />
                    Tunggakan: <strong className="text-green-700">0</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <div className="h-6 w-6 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-amber-800 mb-2">Informasi</h3>
                  <p className="text-gray-700 text-sm">
                    Untuk pertanyaan mengenai transaksi, hubungi admin di
                    WhatsApp: <strong>0812-3456-7890</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
