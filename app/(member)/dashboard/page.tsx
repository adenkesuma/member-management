// app/dashboard/page.tsx
"use client"

import PaymentHistory from "@/components/dashboard/PaymentHistory";
import PaymentSummary from "@/components/dashboard/PaymentSummary";
import UpcomingPayments from "@/components/dashboard/UpcomingPayments";
import MembershipStatus from "@/components/dashboard/MembershipStatus";
import QuickPaymentActions from "@/components/dashboard/QuickPaymentActions";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Check, ChevronDown, ChevronUp, CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [expandedCards, setExpandedCards] = useState({
    paymentHistory: true,
    paymentSummary: true,
    recentTransactions: true,
    membershipStatus: true,
    upcomingPayments: true,
  });

  const toggleCard = (cardName: keyof typeof expandedCards) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardName]: !prev[cardName]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Pembayaran Member</h1>
              <p className="text-gray-600 text-sm">Selamat datang kembali, Dr. John Doe!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="font-medium">NPA: PDSKKI-2024-001</p>
                <p className="text-sm text-gray-500">
                  Status: <span className="text-green-600 font-semibold">Aktif</span>
                </p>
              </div>
              <Link href={"/profile"} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards Ringkas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="rounded-2xl shadow-sm border border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Iuran Tahun Ini</p>
                    <p className="text-2xl font-bold text-gray-900">Rp 2.500.000</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <span>Lunas 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Masa Aktif</p>
                    <p className="text-2xl font-bold text-gray-900">354 Hari</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <div className="h-6 w-6 text-blue-600 font-bold text-center">
                      <Calendar />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Berlaku hingga: 31 Des 2025</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tunggakan</p>
                    <p className="text-2xl font-bold text-gray-900">Rp 0</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <div className="h-6 w-6 text-green-600 font-bold text-center">
                      <Check />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <span>Tidak ada tunggakan</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Riwayat Transaksi</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Download className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                    Lihat semua transaksi →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Kolom Kiri - 2/3 lebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Riwayat Pembayaran Detail */}
              <Card className="rounded-2xl shadow-sm border p-0 border-gray-200">
                <CardHeader className={`p-6 bg-blue-600 ${expandedCards.paymentHistory ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Riwayat Pembayaran Detail</CardTitle>
                      <CardDescription className="text-white mt-1">Detail lengkap semua transaksi pembayaran iuran</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export Excel
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 cursor-pointer hover:text-white"
                        onClick={() => toggleCard("paymentHistory")}
                      >
                        {expandedCards.paymentHistory ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {expandedCards.paymentHistory && (
                  <CardContent className="p-6">
                    <PaymentHistory />
                  </CardContent>
                )}
              </Card>

              {/* Ringkasan Pembayaran */}
              <Card className="rounded-2xl p-0 shadow-sm border border-gray-200">
                <CardHeader className={`p-6 bg-blue-600 ${expandedCards.paymentSummary ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Ringkasan Pembayaran</CardTitle>
                      <CardDescription className="text-white mt-1">Analisis pembayaran berdasarkan periode</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 cursor-pointer hover:text-white"
                      onClick={() => toggleCard("paymentSummary")}
                    >
                      {expandedCards.paymentSummary ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.paymentSummary && (
                  <CardContent className="p-6">
                    <PaymentSummary />
                  </CardContent>
                )}
              </Card>

              {/* Transaksi Terbaru */}
              <Card className="rounded-2xl p-0 shadow-sm border border-gray-200">
                <CardHeader className={`p-6 bg-blue-600 ${expandedCards.recentTransactions ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Transaksi Terbaru</CardTitle>
                      <CardDescription className="mt-1 text-white">5 transaksi pembayaran terakhir</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 cursor-pointer hover:text-white"
                      onClick={() => toggleCard("recentTransactions")}
                    >
                      {expandedCards.recentTransactions ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.recentTransactions && (
                  <CardContent className="p-6">
                    <RecentTransactions />
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Kolom Kanan - 1/3 lebar */}
            <div className="space-y-6">
              {/* Status Keanggotaan */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className={`p-6 bg-blue-600 ${expandedCards.membershipStatus ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Status Keanggotaan</CardTitle>
                      <CardDescription className="mt-1 text-white">Informasi status keanggotaan Anda</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 cursor-pointer hover:text-white"
                      onClick={() => toggleCard("membershipStatus")}
                    >
                      {expandedCards.membershipStatus ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.membershipStatus && (
                  <CardContent className="p-6">
                    <MembershipStatus />
                  </CardContent>
                )}
              </Card>

              {/* Pembayaran Mendatang */}
              <Card className="rounded-2xl p-0 shadow-sm border border-gray-200">
                <CardHeader className={`p-6 bg-blue-600 ${expandedCards.upcomingPayments ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Pembayaran Mendatang</CardTitle>
                      <CardDescription className="text-white">Jadwal pembayaran yang akan datang</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 cursor-pointer hover:text-white"
                      onClick={() => toggleCard("upcomingPayments")}
                    >
                      {expandedCards.upcomingPayments ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.upcomingPayments && (
                  <CardContent className="p-6">
                    <UpcomingPayments />
                  </CardContent>
                )}
              </Card>

              {/* Aksi Cepat Pembayaran */}
              <Card className="rounded-2xl shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Bayar Iuran</CardTitle>
                  <CardDescription>Pilih metode pembayaran</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuickPaymentActions />
                </CardContent>
              </Card>

              {/* Profil Singkat */}
              <Card className="rounded-2xl shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Profil Singkat
                  </CardTitle>
                  <CardDescription>Informasi dasar keanggotaan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">NPA:</span>
                    <span className="font-medium">PDSKKI-2024-001</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cabang:</span>
                    <span className="font-medium">Jakarta Pusat</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bergabung:</span>
                    <span className="font-medium">15 Jan 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Jenis Anggota:</span>
                    <span className="font-medium">Spesialis KKLP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Iuran Tahunan:</span>
                    <span className="font-medium text-blue-600">Rp 2.500.000</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status Pembayaran:</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        LUNAS 2024
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}