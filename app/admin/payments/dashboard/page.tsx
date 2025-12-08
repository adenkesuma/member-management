import PaymentOverview from "@/components/admin/payments/PaymentOverview";
import PaymentStats from "@/components/admin/payments/PaymentStats";
import PaymentTable from "@/components/admin/payments/PaymentTable";
import FilterControls from "@/components/admin/payments/FilterControls";
import QuickActions from "@/components/admin/payments/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Plus, RefreshCw } from "lucide-react";

export default function AdminPaymentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
              <p className="text-gray-600">Dashboard monitoring iuran anggota PDSKKI</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Tambah Iuran
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <PaymentStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Kolom Kiri */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Overview Chart */}
              <PaymentOverview />

              {/* Filter Controls */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter & Pencarian
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    Reset Filter
                  </Button>
                </CardHeader>
                <CardContent>
                  <FilterControls />
                </CardContent>
              </Card>

              {/* Payment Table */}
              <PaymentTable />
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions />

              {/* Export Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12 flex-col gap-1">
                      <span className="text-xs">PDF</span>
                      <span className="text-sm font-medium">Laporan</span>
                    </Button>
                    <Button variant="outline" className="h-12 flex-col gap-1">
                      <span className="text-xs">Excel</span>
                      <span className="text-sm font-medium">Data Lengkap</span>
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Invoice Massal
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Kirim Pengingat
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Generate Laporan Tahunan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { user: "Andi Wijaya", action: "membayar iuran Maret 2025", time: "5 menit lalu" },
                      { user: "Siti Aisyah", action: "mengubah metode pembayaran", time: "15 menit lalu" },
                      { user: "Budi Santoso", action: "menerima invoice", time: "1 jam lalu" },
                      { user: "Admin", action: "menambah iuran baru", time: "2 jam lalu" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">A</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
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