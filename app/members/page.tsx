// app/members/page.tsx - Halaman Semua Member
"use client";

import { useState, useEffect, useMemo } from "react";
import MemberCard from "@/components/members/MemberCard";
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
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  ChevronDown,
  Users,
  MapPin,
  GraduationCap,
  Building2,
} from "lucide-react";

interface Member {
  id: number;
  name: string;
  npa: string;
  branch: string;
  specialization: string;
  status: "active" | "inactive" | "pending";
  yearJoined: number;
  practiceType: string;
  city: string;
  email: string;
  phone?: string;
  photo?: string;
}

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);

  // Data cabang
  const branches = [
    { value: "aceh", label: "Aceh" },
    { value: "bali", label: "Bali" },
    { value: "banten", label: "Banten" },
    { value: "dki-jakarta", label: "DKI Jakarta" },
    { value: "jambi", label: "Jambi" },
    { value: "jawa-barat", label: "Jawa Barat" },
    { value: "jawa-tengah", label: "Jawa Tengah" },
    { value: "jawa-timur", label: "Jawa Timur" },
    { value: "kepulauan-riau", label: "Kepulauan Riau" },
    { value: "lampung", label: "Lampung" },
    { value: "riau", label: "Riau" },
    { value: "sulawesi-selatan", label: "Sulawesi Selatan" },
    { value: "sulawesi-utara", label: "Sulawesi Utara" },
    { value: "sumatera-barat", label: "Sumatera Barat" },
    { value: "sumatera-selatan", label: "Sumatera Selatan" },
    { value: "sumatera-utara", label: "Sumatera Utara" },
    { value: "yogyakarta", label: "Yogyakarta" },
  ];

  // Data status
  const statuses = [
    { value: "active", label: "Aktif", color: "bg-green-500" },
    { value: "inactive", label: "Nonaktif", color: "bg-gray-500" },
    { value: "pending", label: "Dalam Proses", color: "bg-yellow-500" },
  ];

  // Data tahun bergabung (5 tahun terakhir)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

  // Simulasi fetching data
  useEffect(() => {
    // Simulasi data dari API
    const fetchMembers = async () => {
      setLoading(true);
      try {
        // Data dummy berdasarkan data PDSKKI
        const dummyMembers: Member[] = [
          {
            id: 1,
            name: "Dr. Ahmad Hidayat, Sp.KKLP",
            npa: "PDSKKI-2024-001",
            branch: "dki-jakarta",
            specialization: "Kedokteran Keluarga Layanan Primer",
            status: "active",
            yearJoined: 2024,
            practiceType: "Rumah Sakit",
            city: "Jakarta Pusat",
            email: "ahmad.hidayat@example.com",
            phone: "081234567890",
          },
          {
            id: 2,
            name: "Dr. Siti Nurhaliza, Sp.KKLP",
            npa: "PDSKKI-2024-002",
            branch: "jawa-barat",
            specialization: "Dokter Keluarga",
            status: "active",
            yearJoined: 2023,
            practiceType: "Puskesmas",
            city: "Bandung",
            email: "siti.nurhaliza@example.com",
            phone: "081298765432",
          },
          {
            id: 3,
            name: "Dr. Budi Santoso, Sp.KKLP",
            npa: "PDSKKI-2024-003",
            branch: "jawa-tengah",
            specialization: "Spesialis KKLP",
            status: "active",
            yearJoined: 2022,
            practiceType: "Klinik Utama",
            city: "Semarang",
            email: "budi.santoso@example.com",
            phone: "081312345678",
          },
          {
            id: 4,
            name: "Dr. Maya Indah, Sp.KKLP",
            npa: "PDSKKI-2024-004",
            branch: "jawa-timur",
            specialization: "Kedokteran Keluarga",
            status: "active",
            yearJoined: 2024,
            practiceType: "Rumah Sakit",
            city: "Surabaya",
            email: "maya.indah@example.com",
            phone: "081323456789",
          },
          {
            id: 5,
            name: "Dr. Rizky Pratama, Sp.KKLP",
            npa: "PDSKKI-2024-005",
            branch: "bali",
            specialization: "Dokter Keluarga",
            status: "active",
            yearJoined: 2023,
            practiceType: "Praktek Mandiri",
            city: "Denpasar",
            email: "rizky.pratama@example.com",
            phone: "081334567890",
          },
          {
            id: 6,
            name: "Dr. Ani Wijaya, Sp.KKLP",
            npa: "PDSKKI-2024-006",
            branch: "sumatera-utara",
            specialization: "Spesialis KKLP",
            status: "active",
            yearJoined: 2022,
            practiceType: "Rumah Sakit",
            city: "Medan",
            email: "ani.wijaya@example.com",
            phone: "081345678901",
          },
          {
            id: 7,
            name: "Dr. Hendra Gunawan, Sp.KKLP",
            npa: "PDSKKI-2024-007",
            branch: "sulawesi-selatan",
            specialization: "Kedokteran Keluarga Layanan Primer",
            status: "inactive",
            yearJoined: 2021,
            practiceType: "Puskesmas",
            city: "Makassar",
            email: "hendra.gunawan@example.com",
            phone: "081356789012",
          },
          {
            id: 8,
            name: "Dr. Dewi Lestari, Sp.KKLP",
            npa: "PDSKKI-2024-008",
            branch: "yogyakarta",
            specialization: "Dokter Keluarga",
            status: "active",
            yearJoined: 2024,
            practiceType: "Universitas",
            city: "Yogyakarta",
            email: "dewi.lestari@example.com",
            phone: "081367890123",
          },
          {
            id: 9,
            name: "Dr. Agus Setiawan, Sp.KKLP",
            npa: "PDSKKI-2024-009",
            branch: "banten",
            specialization: "Spesialis KKLP",
            status: "pending",
            yearJoined: 2024,
            practiceType: "Klinik Utama",
            city: "Tangerang",
            email: "agus.setiawan@example.com",
            phone: "081378901234",
          },
          {
            id: 10,
            name: "Dr. Linda Sari, Sp.KKLP",
            npa: "PDSKKI-2024-010",
            branch: "sumatera-barat",
            specialization: "Kedokteran Keluarga",
            status: "active",
            yearJoined: 2023,
            practiceType: "Rumah Sakit",
            city: "Padang",
            email: "linda.sari@example.com",
            phone: "081389012345",
          },
          {
            id: 11,
            name: "Dr. Fajar Nugroho, Sp.KKLP",
            npa: "PDSKKI-2024-011",
            branch: "lampung",
            specialization: "Dokter Keluarga",
            status: "active",
            yearJoined: 2022,
            practiceType: "Praktek Mandiri",
            city: "Bandar Lampung",
            email: "fajar.nugroho@example.com",
            phone: "081390123456",
          },
          {
            id: 12,
            name: "Dr. Rina Astuti, Sp.KKLP",
            npa: "PDSKKI-2024-012",
            branch: "riau",
            specialization: "Spesialis KKLP",
            status: "active",
            yearJoined: 2024,
            practiceType: "Rumah Sakit",
            city: "Pekanbaru",
            email: "rina.astuti@example.com",
            phone: "081301234567",
          },
        ];
        
        // Simulasi delay
        setTimeout(() => {
          setMembers(dummyMembers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching members:", error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter members
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      // Filter pencarian
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          member.name.toLowerCase().includes(query) ||
          member.npa.toLowerCase().includes(query) ||
          member.city.toLowerCase().includes(query) ||
          member.specialization.toLowerCase().includes(query)
        );
      }

      // Filter cabang
      if (branchFilter && member.branch !== branchFilter) return false;

      // Filter status
      if (statusFilter && member.status !== statusFilter) return false;

      // Filter tahun bergabung
      if (yearFilter && member.yearJoined.toString() !== yearFilter) return false;

      return true;
    });
  }, [members, searchQuery, branchFilter, statusFilter, yearFilter]);

  // Reset semua filter
  const resetFilters = () => {
    setSearchQuery("");
    setBranchFilter("");
    setStatusFilter("");
    setYearFilter("");
  };

  // Get branch label
  const getBranchLabel = (branchValue: string) => {
    const branch = branches.find(b => b.value === branchValue);
    return branch ? branch.label : branchValue;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-600" />
                  Anggota PDSKKI
                </h1>
                <p className="text-gray-600 mt-2">
                  Temukan dan hubungi anggota Perhimpunan Dokter Spesialis Kedokteran Keluarga Indonesia
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Anggota</p>
                  <p className="text-2xl font-bold text-blue-600">{members.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">Filter Anggota</h2>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                    className="gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    {showAdvancedFilter ? "Sederhana" : "Lanjutan"}
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                </div>
                
                {(searchQuery || branchFilter || statusFilter || yearFilter) && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset Filter
                  </Button>
                )}
              </div>
            </div>

            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari nama, NPA, atau kota..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Branch Filter */}
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Semua Cabang" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Cabang</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch.value} value={branch.value}>
                      {branch.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
                        {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Year Filter */}
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Tahun Bergabung" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tahun</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilter && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                {/* Practice Type Filter */}
                <Select>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Tipe Praktik" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="hospital">Rumah Sakit</SelectItem>
                    <SelectItem value="clinic">Klinik</SelectItem>
                    <SelectItem value="health-center">Puskesmas</SelectItem>
                    <SelectItem value="private">Praktek Mandiri</SelectItem>
                    <SelectItem value="university">Universitas</SelectItem>
                  </SelectContent>
                </Select>

                {/* Specialization Filter */}
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Spesialisasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Spesialisasi</SelectItem>
                    <SelectItem value="sp-kklp">Spesialis KKLP</SelectItem>
                    <SelectItem value="family-doctor">Dokter Keluarga</SelectItem>
                    <SelectItem value="general-practitioner">Dokter Umum</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort By */}
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Urutkan Berdasarkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Nama A-Z</SelectItem>
                    <SelectItem value="name-desc">Nama Z-A</SelectItem>
                    <SelectItem value="year-asc">Tahun Bergabung (Lama)</SelectItem>
                    <SelectItem value="year-desc">Tahun Bergabung (Baru)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Active Filters */}
            {(searchQuery || branchFilter || statusFilter || yearFilter) && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Filter aktif:</span>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        <Search className="h-3 w-3" />
                        "{searchQuery}"
                        <button
                          onClick={() => setSearchQuery("")}
                          className="ml-1 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {branchFilter && (
                      <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                        <MapPin className="h-3 w-3" />
                        {getBranchLabel(branchFilter)}
                        <button
                          onClick={() => setBranchFilter("")}
                          className="ml-1 text-green-500 hover:text-green-700"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {statusFilter && (
                      <div className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          statusFilter === "active" ? "bg-green-500" :
                          statusFilter === "inactive" ? "bg-gray-500" : "bg-yellow-500"
                        }`}></div>
                        {statusFilter === "active" ? "Aktif" : statusFilter === "inactive" ? "Nonaktif" : "Dalam Proses"}
                        <button
                          onClick={() => setStatusFilter("")}
                          className="ml-1 text-purple-500 hover:text-purple-700"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {yearFilter && (
                      <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">
                        <GraduationCap className="h-3 w-3" />
                        Tahun: {yearFilter}
                        <button
                          onClick={() => setYearFilter("")}
                          className="ml-1 text-amber-500 hover:text-amber-700"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Stats */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {filteredMembers.length} Anggota Ditemukan
              </h3>
              <p className="text-gray-600 text-sm">
                {searchQuery && `Hasil pencarian untuk "${searchQuery}"`}
                {branchFilter && ` • Cabang: ${getBranchLabel(branchFilter)}`}
                {statusFilter && ` • Status: ${statusFilter === "active" ? "Aktif" : statusFilter === "inactive" ? "Nonaktif" : "Dalam Proses"}`}
                {yearFilter && ` • Tahun Bergabung: ${yearFilter}`}
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Export
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem>
                    Export ke Excel
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Export ke PDF
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Cetak Daftar
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat data anggota...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Members Grid/List */}
              {filteredMembers.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMembers.map((member) => (
                      <MemberCard key={member.id} member={member} viewMode="grid" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMembers.map((member) => (
                      <MemberCard key={member.id} member={member} viewMode="list" />
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Tidak ada anggota ditemukan
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Tidak ada anggota yang cocok dengan filter yang Anda pilih. Coba gunakan kata kunci pencarian yang berbeda atau reset filter.
                  </p>
                  <Button onClick={resetFilters} className="mt-4">
                    Reset Semua Filter
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {filteredMembers.length > 0 && (
                <div className="flex justify-center items-center gap-4 mt-8 pt-8 border-t">
                  <Button variant="outline" disabled>
                    Sebelumnya
                  </Button>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((page) => (
                      <Button
                        key={page}
                        variant="outline"
                        className={page === 1 ? "bg-blue-50 border-blue-200" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline">
                    Selanjutnya
                  </Button>
                </div>
              )}
            </>
          )}

        
        </div>
      </main>
    </div>
  );
}