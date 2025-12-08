import ReportStats from "@/components/admin/reports/ReportStats";
import ReportFilters from "@/components/admin/reports/ReportFilters";
import ReportCharts from "@/components/admin/reports/ReportCharts";
import ReportTable from "@/components/admin/reports/ReportTable";
import ExportPanel from "@/components/admin/reports/ExportPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, Calendar, FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Reports</h1>
              <p className="text-gray-600">Laporan dan analisis keuangan iuran anggota</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <ReportStats />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            {/* Kolom Kiri */}
            <div className="lg:col-span-3 space-y-6">
              {/* Report Filters */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Filter Laporan
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    Tahun Berjalan
                  </Button>
                </CardHeader>
                <CardContent>
                  <ReportFilters />
                </CardContent>
              </Card>

              {/* Charts Section */}
              <ReportCharts />

              {/* Detailed Report Table */}
              <ReportTable />
            </div>

            {/* Kolom Kanan - Export & Quick Actions */}
            <div className="space-y-6">
              <ExportPanel />

              {/* Report Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Jenis Laporan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Laporan Harian", count: "7 hari terakhir" },
                    { name: "Laporan Mingguan", count: "4 minggu terakhir" },
                    { name: "Laporan Bulanan", count: "12 bulan terakhir" },
                    { name: "Laporan Tahunan", count: "5 tahun terakhir" },
                    { name: "Laporan Cabang", count: "Per cabang" },
                    { name: "Laporan Status", count: "Per status pembayaran" },
                  ].map((report, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto py-3"
                    >
                      <div className="text-left">
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-gray-500">{report.count}</p>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Saved Reports */}
              <Card>
                <CardHeader>
                  <CardTitle>Laporan Tersimpan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Q1 2025 Summary", date: "31 Mar 2025" },
                      { name: "Annual Report 2024", date: "31 Dec 2024" },
                      { name: "Tax Report 2024", date: "15 Jan 2025" },
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-xs text-gray-500">{report.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
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