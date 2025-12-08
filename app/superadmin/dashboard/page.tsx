// app/superadmin/dashboard/page.tsx - Dashboard Superadmin
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import BranchOverview from "@/components/superadmin/BranchOverview";
import PaymentManagement from "@/components/superadmin/PaymentManagement";
import MemberManagement from "@/components/superadmin/MemberManagement";
import RecentActivities from "@/components/superadmin/RecentActivities";
import StatsCards from "@/components/superadmin/StatsCards";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Users,
  CreditCard,
  Download,
  Bell,
  BarChart3,
  Filter,
  RefreshCw,
  Shield,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Data cabang PDSKKI
const branches = [
  { id: "all", name: "Semua Cabang", memberCount: 1250, activeMembers: 980, pendingPayments: 45 },
  { id: "dki-jakarta", name: "DKI Jakarta", memberCount: 250, activeMembers: 210, pendingPayments: 12 },
  { id: "jawa-barat", name: "Jawa Barat", memberCount: 180, activeMembers: 150, pendingPayments: 8 },
  { id: "jawa-tengah", name: "Jawa Tengah", memberCount: 160, activeMembers: 135, pendingPayments: 6 },
  { id: "jawa-timur", name: "Jawa Timur", memberCount: 170, activeMembers: 145, pendingPayments: 7 },
  { id: "bali", name: "Bali", memberCount: 90, activeMembers: 75, pendingPayments: 4 },
  { id: "sumatera-utara", name: "Sumatera Utara", memberCount: 120, activeMembers: 95, pendingPayments: 5 },
  { id: "sumatera-barat", name: "Sumatera Barat", memberCount: 85, activeMembers: 70, pendingPayments: 3 },
  { id: "sulawesi-selatan", name: "Sulawesi Selatan", memberCount: 95, activeMembers: 80, pendingPayments: 4 },
  { id: "yogyakarta", name: "Yogyakarta", memberCount: 75, activeMembers: 65, pendingPayments: 2 },
  { id: "banten", name: "Banten", memberCount: 110, activeMembers: 90, pendingPayments: 5 },
  { id: "riau", name: "Riau", memberCount: 70, activeMembers: 60, pendingPayments: 3 },
  { id: "kepulauan-riau", name: "Kepulauan Riau", memberCount: 45, activeMembers: 40, pendingPayments: 2 },
  { id: "lampung", name: "Lampung", memberCount: 65, activeMembers: 55, pendingPayments: 3 },
  { id: "sumatera-selatan", name: "Sumatera Selatan", memberCount: 60, activeMembers: 50, pendingPayments: 2 },
  { id: "jambi", name: "Jambi", memberCount: 50, activeMembers: 45, pendingPayments: 2 },
  { id: "aceh", name: "Aceh", memberCount: 40, activeMembers: 35, pendingPayments: 1 },
  { id: "sulawesi-utara", name: "Sulawesi Utara", memberCount: 55, activeMembers: 45, pendingPayments: 2 },
];

export default function SuperAdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [userRole, setUserRole] = useState<"main" | "branch">("main");
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // State untuk track client-side

  // Cek apakah sudah di client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simulasi autentikasi user - hanya dijalankan di client-side
  useEffect(() => {
    if (!isClient) return; // Tunggu sampai client-side

    const simulateAuth = async () => {
      setLoading(true);
      // Simulasi delay
      setTimeout(() => {
        const isBranchAdmin = pathname.includes("branch");
        setUserRole(isBranchAdmin ? "branch" : "main");
        setLoading(false);
      }, 500);
    };
    
    simulateAuth();
  }, [isClient, pathname]); // Tambahkan dependency

  const handleExportData = () => {
    // Logic untuk export data
    alert(`Export data untuk ${selectedBranch === "all" ? "semua cabang" : branches.find(b => b.id === selectedBranch)?.name}`);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulasi refresh data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const currentBranch = branches.find(b => b.id === selectedBranch);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${userRole === "main" ? "bg-purple-100" : "bg-blue-100"}`}>
                {userRole === "main" ? (
                  <Shield className="h-6 w-6 text-blue-600" />
                ) : (
                  <Building2 className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {userRole === "main" ? "Superadmin Pusat" : "Superadmin Cabang"}
                </h1>
                <p className="text-gray-600 text-xs">
                  {userRole === "main" 
                    ? "Dashboard Pengelolaan Nasional PDSKKI" 
                    : `Dashboard Pengelolaan ${currentBranch?.name}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden md:inline">Notifikasi</span>
              </Button> */}
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                SA
              </div>
            </div>
          </div>

          {/* Branch Selector & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="w-64">
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Pilih Cabang" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        <div className="flex items-center justify-between">
                          <span>{branch.name}</span>
                          {branch.id !== "all" && (
                            <span className="text-xs text-gray-500">{branch.memberCount} anggota</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {userRole === "main" && selectedBranch !== "all" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/superadmin/branch/${selectedBranch}`)}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Masuk ke Dashboard Cabang
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="gap-2"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button size="sm" onClick={handleExportData} className="bg-blue-600 gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Overview */}
          <StatsCards 
            selectedBranch={selectedBranch} 
            branchData={currentBranch}
            userRole={userRole}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Kolom Kiri - 2/3 lebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Branch Overview */}
              <Card className="rounded-2xl shadow-sm border p-0 border-gray-200">
                <CardHeader className="bg-blue-600 p-6 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Gambaran Cabang</CardTitle>
                      <CardDescription className="text-white mt-1">
                        {selectedBranch === "all" 
                          ? "Overview semua cabang PDSKKI" 
                          : `Detail cabang ${currentBranch?.name}`}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Laporan Lengkap
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <BranchOverview 
                    selectedBranch={selectedBranch} 
                    branches={branches}
                  />
                </CardContent>
              </Card>

              {/* Payment Management */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className="bg-blue-600 p-6 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Manajemen Pembayaran</CardTitle>
                      <CardDescription className="mt-1 text-white">
                        Kelola iuran dan pembayaran anggota
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Verifikasi Pembayaran
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <PaymentManagement selectedBranch={selectedBranch} />
                </CardContent>
              </Card>

              {/* Member Management */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className="p-6 bg-blue-600 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Manajemen Anggota</CardTitle>
                      <CardDescription className="text-white mt-1">
                        Kelola data dan status keanggotaan
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Users className="h-4 w-4" />
                      Tambah Anggota
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <MemberManagement selectedBranch={selectedBranch} />
                </CardContent>
              </Card>
            </div>

            {/* Kolom Kanan - 1/3 lebar */}
            <div className="space-y-6">
              {/* Recent Activities */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className="bg-blue-600 p-6 rounded-t-2xl">
                  <CardTitle className="text-white">Aktivitas Terbaru</CardTitle>
                  <CardDescription className="mt-1 text-white">Aktivitas sistem 24 jam terakhir</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <RecentActivities />
                </CardContent>
              </Card>

              {/* Branch Summary (for main admin) */}
              {userRole === "main" && (
                <Card className="rounded-2xl p-0 shadow-sm border border-gray-200">
                  <CardHeader className="bg-blue-600 p-6 rounded-t-2xl">
                    <CardTitle className="text-white">Ringkasan Cabang</CardTitle>
                    <CardDescription className="text-white">3 cabang dengan anggota terbanyak</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-3">
                      {branches
                        .filter(b => b.id !== "all")
                        .sort((a, b) => b.memberCount - a.memberCount)
                        .slice(0, 3)
                        .map((branch) => (
                          <div key={branch.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{branch.name}</p>
                              <p className="text-sm text-gray-500">{branch.activeMembers} anggota aktif</p>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                              {branch.memberCount}
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card className="rounded-2xl shadow-sm border p-0 border-gray-200">
                <CardHeader className="bg-blue-600 p-6 rounded-t-2xl">
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-white">Aksi cepat untuk superadmin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 p-6 pt-0">
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Users className="h-4 w-4" />
                    Approve Anggota Baru
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <CreditCard className="h-4 w-4" />
                    Verifikasi Pembayaran
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Building2 className="h-4 w-4" />
                    Kelola Cabang
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <BarChart3 className="h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>

              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}