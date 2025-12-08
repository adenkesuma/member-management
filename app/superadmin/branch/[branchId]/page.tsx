// app/superadmin/branches/[branchId]/page.tsx - SOLUSI FIX
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import BranchStats from "@/components/superadmin/branch/BranchStats";
import BranchMembers from "@/components/superadmin/branch/BranchMembers";
import BranchPayments from "@/components/superadmin/branch/BranchPayments";
import BranchActivities from "@/components/superadmin/branch/BranchActivities";
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
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Data cabang PDSKKI
const branchesData = {
  "dki-jakarta": { id: "dki-jakarta", name: "DKI Jakarta", memberCount: 250, activeMembers: 210, pendingPayments: 12, city: "Jakarta Pusat", address: "Jl. Medan Merdeka Selatan No. 13" },
  "jawa-barat": { id: "jawa-barat", name: "Jawa Barat", memberCount: 180, activeMembers: 150, pendingPayments: 8, city: "Bandung", address: "Jl. Asia Afrika No. 65" },
  "jawa-tengah": { id: "jawa-tengah", name: "Jawa Tengah", memberCount: 160, activeMembers: 135, pendingPayments: 6, city: "Semarang", address: "Jl. Pemuda No. 118" },
  "jawa-timur": { id: "jawa-timur", name: "Jawa Timur", memberCount: 170, activeMembers: 145, pendingPayments: 7, city: "Surabaya", address: "Jl. Tunjungan No. 1" },
  "bali": { id: "bali", name: "Bali", memberCount: 90, activeMembers: 75, pendingPayments: 4, city: "Denpasar", address: "Jl. Hayam Wuruk No. 139" },
  "sumatera-utara": { id: "sumatera-utara", name: "Sumatera Utara", memberCount: 120, activeMembers: 95, pendingPayments: 5, city: "Medan", address: "Jl. Balai Kota No. 1" },
  "sumatera-barat": { id: "sumatera-barat", name: "Sumatera Barat", memberCount: 85, activeMembers: 70, pendingPayments: 3, city: "Padang", address: "Jl. Khatib Sulaiman No. 1" },
  "sulawesi-selatan": { id: "sulawesi-selatan", name: "Sulawesi Selatan", memberCount: 95, activeMembers: 80, pendingPayments: 4, city: "Makassar", address: "Jl. Jenderal Sudirman No. 1" },
  "yogyakarta": { id: "yogyakarta", name: "Yogyakarta", memberCount: 75, activeMembers: 65, pendingPayments: 2, city: "Yogyakarta", address: "Jl. Malioboro No. 1" },
  "banten": { id: "banten", name: "Banten", memberCount: 110, activeMembers: 90, pendingPayments: 5, city: "Serang", address: "Jl. Syech Nawawi Al-Bantani No. 1" },
  "riau": { id: "riau", name: "Riau", memberCount: 70, activeMembers: 60, pendingPayments: 3, city: "Pekanbaru", address: "Jl. Jenderal Sudirman No. 460" },
  "kepulauan-riau": { id: "kepulauan-riau", name: "Kepulauan Riau", memberCount: 45, activeMembers: 40, pendingPayments: 2, city: "Tanjung Pinang", address: "Jl. Raja H. Fisabilillah No. 1" },
  "lampung": { id: "lampung", name: "Lampung", memberCount: 65, activeMembers: 55, pendingPayments: 3, city: "Bandar Lampung", address: "Jl. W.R. Supratman No. 1" },
  "sumatera-selatan": { id: "sumatera-selatan", name: "Sumatera Selatan", memberCount: 60, activeMembers: 50, pendingPayments: 2, city: "Palembang", address: "Jl. Kapten A. Rivai No. 1" },
  "jambi": { id: "jambi", name: "Jambi", memberCount: 50, activeMembers: 45, pendingPayments: 2, city: "Jambi", address: "Jl. Jenderal Basuki Rahmat No. 1" },
  "aceh": { id: "aceh", name: "Aceh", memberCount: 40, activeMembers: 35, pendingPayments: 1, city: "Banda Aceh", address: "Jl. T. Nyak Arief No. 1" },
  "sulawesi-utara": { id: "sulawesi-utara", name: "Sulawesi Utara", memberCount: 55, activeMembers: 45, pendingPayments: 2, city: "Manado", address: "Jl. Sam Ratulangi No. 1" },
} as const;

type BranchId = keyof typeof branchesData;
type BranchData = typeof branchesData[BranchId];

export default function BranchDashboardPage() {
  const params = useParams();
  const router = useRouter();
  
  // HANYA gunakan state untuk data yang benar-benar perlu diupdate setelah mount
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Gunakan useMemo untuk mendapatkan branch data secara synchronous
  const branchId = params.branchId;
  const idBranch = Array.isArray(branchId) ? branchId[0] : branchId || '';
  console.log(typeof branchId)  

  const branch = branchId 
    ? (branchesData as Record<string, BranchData>)[idBranch]
    : undefined;

  // Simulasi loading data - hanya di client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Redirect jika cabang tidak ditemukan - hanya di client side
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading && (!branchId || !branch)) {
      router.push("/superadmin/dashboard");
    }
  }, [branchId, branch, isLoading, router]);

  // Jika tidak ada branchId atau branch tidak ditemukan setelah loading
  if (!branchId || !branch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Cabang tidak ditemukan</h2>
          <p className="text-gray-600 mb-3">
            Cabang dengan ID <strong>{branchId}</strong> tidak ditemukan
          </p>
          <Button onClick={() => router.push("/superadmin/dashboard")}>
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleExportData = () => {
    alert(`Export data cabang ${branch.name}`);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/superadmin/dashboard")}
                className="h-10 w-10"
              >
                <ArrowLeft className="size-8" />
              </Button> */}
              
              <div className={`p-2 rounded-lg bg-blue-100`}>
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Superadmin Cabang {branch.name}
                </h1>
                <p className="text-gray-600 text-xs">
                  Dashboard Pengelolaan Anggota Cabang {branch.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {branch.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Branch Info & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 pt-4 border-t">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{branch.city}</p>
                  <p className="text-xs text-gray-500">{branch.address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{branch.memberCount} Anggota</p>
                  <p className="text-xs text-gray-500">{branch.activeMembers} Aktif</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="gap-2"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => router.push(`/superadmin/branches/${branchId}/settings`)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button size="sm" onClick={handleExportData} className="gap-2 bg-blue-600">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Branch Stats */}
          <BranchStats branch={branch} />

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-gray-900">Filter Data</h3>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-48">
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <SelectValue placeholder="Tahun" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status Anggota" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Nonaktif</SelectItem>
                      <SelectItem value="pending">Menunggu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter Lainnya
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Kolom Kiri - 2/3 lebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Branch Members */}
              <Card className="rounded-2xl shadow-sm border p-0 border-gray-200">
                <CardHeader className="bg-blue-600 p-6 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Anggota Cabang</CardTitle>
                      <CardDescription className="text-white mt-1">
                        Daftar anggota cabang {branch.name}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Users className="h-4 w-4" />
                      Tambah Anggota
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <BranchMembers 
                    branchId={idBranch}
                    filters={{ year: selectedYear, status: selectedStatus }}
                  />
                </CardContent>
              </Card>

              {/* Branch Payments */}
              <Card className="rounded-2xl p-0 shadow-sm border border-gray-200">
                <CardHeader className="p-6 rounded-t-2xl bg-blue-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Pembayaran Cabang</CardTitle>
                      <CardDescription className="text-white mt-1">
                        Manajemen iuran anggota cabang
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Verifikasi Pembayaran
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <BranchPayments branchId={idBranch} />
                </CardContent>
              </Card>
            </div>

            {/* Kolom Kanan - 1/3 lebar */}
            <div className="space-y-6">
              {/* Branch Activities */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className="bg-blue-600 p-6 rounded-t-2xl">
                  <CardTitle className="text-white">Aktivitas Cabang</CardTitle>
                  <CardDescription className="text-white mt-1">Aktivitas 24 jam terakhir</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <BranchActivities branchId={idBranch} />
                </CardContent>
              </Card>

              {/* Branch Info */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className="bg-blue-600 p-6 rounded-t-2xl">
                  <CardTitle className="text-white">Info Cabang</CardTitle>
                  <CardDescription className="text-white mt-1">Detail informasi cabang</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{branch.name}</p>
                      <p className="text-sm text-gray-500">ID: {branch.id.toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{branch.city}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Kontak Admin Cabang</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">admin.{branch.id}@pdskki.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">0812-3456-7890</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="rounded-2xl shadow-sm border p-0 border-gray-200">
                <CardHeader className="bg-blue-600 p-6 rounded-t-2xl">
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-white">Aksi cepat untuk cabang</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 p-6 pt-0">
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Mail className="h-4 w-4" />
                    Kirim Broadcast Email
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Users className="h-4 w-4" />
                    Approve Anggota Baru
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <CreditCard className="h-4 w-4" />
                    Verifikasi Pembayaran
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <BarChart3 className="h-4 w-4" />
                    Laporan Cabang
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Download className="h-4 w-4" />
                    Export Data Cabang
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