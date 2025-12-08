// // app/members/page.tsx - Halaman Semua Member
// "use client";

// import { useState, useEffect, useMemo } from "react";
// import MemberCard from "@/components/members/MemberCard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuCheckboxItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Search,
//   Filter,
//   ChevronDown,
//   Users,
//   MapPin,
//   GraduationCap,
//   Building2,
// } from "lucide-react";

// interface Member {
//   id: number;
//   name: string;
//   npa: string;
//   branch: string;
//   specialization: string;
//   status: "active" | "inactive" | "pending";
//   yearJoined: number;
//   practiceType: string;
//   city: string;
//   email: string;
//   phone?: string;
//   photo?: string;
// }

// export default function MembersPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [branchFilter, setBranchFilter] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("");
//   const [yearFilter, setYearFilter] = useState<string>("");
//   const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [loading, setLoading] = useState(true);
//   const [members, setMembers] = useState<Member[]>([]);

//   // Data cabang
//   const branches = [
//     { value: "aceh", label: "Aceh" },
//     { value: "bali", label: "Bali" },
//     { value: "banten", label: "Banten" },
//     { value: "dki-jakarta", label: "DKI Jakarta" },
//     { value: "jambi", label: "Jambi" },
//     { value: "jawa-barat", label: "Jawa Barat" },
//     { value: "jawa-tengah", label: "Jawa Tengah" },
//     { value: "jawa-timur", label: "Jawa Timur" },
//     { value: "kepulauan-riau", label: "Kepulauan Riau" },
//     { value: "lampung", label: "Lampung" },
//     { value: "riau", label: "Riau" },
//     { value: "sulawesi-selatan", label: "Sulawesi Selatan" },
//     { value: "sulawesi-utara", label: "Sulawesi Utara" },
//     { value: "sumatera-barat", label: "Sumatera Barat" },
//     { value: "sumatera-selatan", label: "Sumatera Selatan" },
//     { value: "sumatera-utara", label: "Sumatera Utara" },
//     { value: "yogyakarta", label: "Yogyakarta" },
//   ];

//   // Data status
//   const statuses = [
//     { value: "active", label: "Aktif", color: "bg-green-500" },
//     { value: "inactive", label: "Nonaktif", color: "bg-gray-500" },
//     { value: "pending", label: "Dalam Proses", color: "bg-yellow-500" },
//   ];

//   // Data tahun bergabung (5 tahun terakhir)
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

//   // Simulasi fetching data
//   useEffect(() => {
//     // Simulasi data dari API
//     const fetchMembers = async () => {
//       setLoading(true);
//       try {
//         // Data dummy berdasarkan data PDSKKI
//         const dummyMembers: Member[] = [
//           {
//             id: 1,
//             name: "Dr. Ahmad Hidayat, Sp.KKLP",
//             npa: "PDSKKI-2024-001",
//             branch: "dki-jakarta",
//             specialization: "Kedokteran Keluarga Layanan Primer",
//             status: "active",
//             yearJoined: 2024,
//             practiceType: "Rumah Sakit",
//             city: "Jakarta Pusat",
//             email: "ahmad.hidayat@example.com",
//             phone: "081234567890",
//           },
//           {
//             id: 2,
//             name: "Dr. Siti Nurhaliza, Sp.KKLP",
//             npa: "PDSKKI-2024-002",
//             branch: "jawa-barat",
//             specialization: "Dokter Keluarga",
//             status: "active",
//             yearJoined: 2023,
//             practiceType: "Puskesmas",
//             city: "Bandung",
//             email: "siti.nurhaliza@example.com",
//             phone: "081298765432",
//           },
//           {
//             id: 3,
//             name: "Dr. Budi Santoso, Sp.KKLP",
//             npa: "PDSKKI-2024-003",
//             branch: "jawa-tengah",
//             specialization: "Spesialis KKLP",
//             status: "active",
//             yearJoined: 2022,
//             practiceType: "Klinik Utama",
//             city: "Semarang",
//             email: "budi.santoso@example.com",
//             phone: "081312345678",
//           },
//           {
//             id: 4,
//             name: "Dr. Maya Indah, Sp.KKLP",
//             npa: "PDSKKI-2024-004",
//             branch: "jawa-timur",
//             specialization: "Kedokteran Keluarga",
//             status: "active",
//             yearJoined: 2024,
//             practiceType: "Rumah Sakit",
//             city: "Surabaya",
//             email: "maya.indah@example.com",
//             phone: "081323456789",
//           },
//           {
//             id: 5,
//             name: "Dr. Rizky Pratama, Sp.KKLP",
//             npa: "PDSKKI-2024-005",
//             branch: "bali",
//             specialization: "Dokter Keluarga",
//             status: "active",
//             yearJoined: 2023,
//             practiceType: "Praktek Mandiri",
//             city: "Denpasar",
//             email: "rizky.pratama@example.com",
//             phone: "081334567890",
//           },
//           {
//             id: 6,
//             name: "Dr. Ani Wijaya, Sp.KKLP",
//             npa: "PDSKKI-2024-006",
//             branch: "sumatera-utara",
//             specialization: "Spesialis KKLP",
//             status: "active",
//             yearJoined: 2022,
//             practiceType: "Rumah Sakit",
//             city: "Medan",
//             email: "ani.wijaya@example.com",
//             phone: "081345678901",
//           },
//           {
//             id: 7,
//             name: "Dr. Hendra Gunawan, Sp.KKLP",
//             npa: "PDSKKI-2024-007",
//             branch: "sulawesi-selatan",
//             specialization: "Kedokteran Keluarga Layanan Primer",
//             status: "inactive",
//             yearJoined: 2021,
//             practiceType: "Puskesmas",
//             city: "Makassar",
//             email: "hendra.gunawan@example.com",
//             phone: "081356789012",
//           },
//           {
//             id: 8,
//             name: "Dr. Dewi Lestari, Sp.KKLP",
//             npa: "PDSKKI-2024-008",
//             branch: "yogyakarta",
//             specialization: "Dokter Keluarga",
//             status: "active",
//             yearJoined: 2024,
//             practiceType: "Universitas",
//             city: "Yogyakarta",
//             email: "dewi.lestari@example.com",
//             phone: "081367890123",
//           },
//           {
//             id: 9,
//             name: "Dr. Agus Setiawan, Sp.KKLP",
//             npa: "PDSKKI-2024-009",
//             branch: "banten",
//             specialization: "Spesialis KKLP",
//             status: "pending",
//             yearJoined: 2024,
//             practiceType: "Klinik Utama",
//             city: "Tangerang",
//             email: "agus.setiawan@example.com",
//             phone: "081378901234",
//           },
//           {
//             id: 10,
//             name: "Dr. Linda Sari, Sp.KKLP",
//             npa: "PDSKKI-2024-010",
//             branch: "sumatera-barat",
//             specialization: "Kedokteran Keluarga",
//             status: "active",
//             yearJoined: 2023,
//             practiceType: "Rumah Sakit",
//             city: "Padang",
//             email: "linda.sari@example.com",
//             phone: "081389012345",
//           },
//           {
//             id: 11,
//             name: "Dr. Fajar Nugroho, Sp.KKLP",
//             npa: "PDSKKI-2024-011",
//             branch: "lampung",
//             specialization: "Dokter Keluarga",
//             status: "active",
//             yearJoined: 2022,
//             practiceType: "Praktek Mandiri",
//             city: "Bandar Lampung",
//             email: "fajar.nugroho@example.com",
//             phone: "081390123456",
//           },
//           {
//             id: 12,
//             name: "Dr. Rina Astuti, Sp.KKLP",
//             npa: "PDSKKI-2024-012",
//             branch: "riau",
//             specialization: "Spesialis KKLP",
//             status: "active",
//             yearJoined: 2024,
//             practiceType: "Rumah Sakit",
//             city: "Pekanbaru",
//             email: "rina.astuti@example.com",
//             phone: "081301234567",
//           },
//         ];
        
//         // Simulasi delay
//         setTimeout(() => {
//           setMembers(dummyMembers);
//           setLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error("Error fetching members:", error);
//         setLoading(false);
//       }
//     };

//     fetchMembers();
//   }, []);

//   // Filter members
//   const filteredMembers = useMemo(() => {
//     return members.filter(member => {
//       // Filter pencarian
//       if (searchQuery) {
//         const query = searchQuery.toLowerCase();
//         return (
//           member.name.toLowerCase().includes(query) ||
//           member.npa.toLowerCase().includes(query) ||
//           member.city.toLowerCase().includes(query) ||
//           member.specialization.toLowerCase().includes(query)
//         );
//       }

//       // Filter cabang
//       if (branchFilter && member.branch !== branchFilter) return false;

//       // Filter status
//       if (statusFilter && member.status !== statusFilter) return false;

//       // Filter tahun bergabung
//       if (yearFilter && member.yearJoined.toString() !== yearFilter) return false;

//       return true;
//     });
//   }, [members, searchQuery, branchFilter, statusFilter, yearFilter]);

//   // Reset semua filter
//   const resetFilters = () => {
//     setSearchQuery("");
//     setBranchFilter("");
//     setStatusFilter("");
//     setYearFilter("");
//   };

//   // Get branch label
//   const getBranchLabel = (branchValue: string) => {
//     const branch = branches.find(b => b.value === branchValue);
//     return branch ? branch.label : branchValue;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b">
//         <div className="px-6 py-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
//                   <Users className="h-5 w-5 text-blue-600" />
//                   Anggota PDSKKI
//                 </h1>
//                 <p className="text-sm text-gray-600 mt-2">
//                   Temukan dan hubungi anggota Perhimpunan Dokter Spesialis Kedokteran Keluarga Indonesia
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="text-right">
//                   <p className="text-sm text-gray-500">Total Anggota</p>
//                   <p className="text-2xl font-bold text-blue-600">{members.length}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Filter Section */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <h2 className="text-xl font-bold text-gray-900">Filter Anggota</h2>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="outline"
//                     onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
//                     className="gap-2"
//                   >
//                     <Filter className="h-4 w-4" />
//                     {showAdvancedFilter ? "Sederhana" : "Lanjutan"}
//                   </Button>
//                   <Button
//                     variant={viewMode === "grid" ? "default" : "outline"}
//                     onClick={() => setViewMode("grid")}
//                   >
//                     Grid
//                   </Button>
//                   <Button
//                     variant={viewMode === "list" ? "default" : "outline"}
//                     onClick={() => setViewMode("list")}
//                   >
//                     List
//                   </Button>
//                 </div>
                
//                 {(searchQuery || branchFilter || statusFilter || yearFilter) && (
//                   <Button variant="ghost" size="sm" onClick={resetFilters}>
//                     Reset Filter
//                   </Button>
//                 )}
//               </div>
//             </div>

//             {/* Basic Filters */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//               {/* Search */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   placeholder="Cari nama, NPA, atau kota..."
//                   className="pl-10"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>

//               {/* Branch Filter */}
//               <Select value={branchFilter} onValueChange={setBranchFilter}>
//                 <SelectTrigger className="w-full">
//                   <div className="flex items-center gap-2">
//                     <MapPin className="h-4 w-4 text-gray-500" />
//                     <SelectValue placeholder="Semua Cabang" />
//                   </div>
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Semua Cabang</SelectItem>
//                   {branches.map((branch) => (
//                     <SelectItem key={branch.value} value={branch.value}>
//                       {branch.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               {/* Status Filter */}
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Semua Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Semua Status</SelectItem>
//                   {statuses.map((status) => (
//                     <SelectItem key={status.value} value={status.value}>
//                       <div className="flex items-center gap-2">
//                         <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
//                         {status.label}
//                       </div>
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               {/* Year Filter */}
//               <Select value={yearFilter} onValueChange={setYearFilter}>
//                 <SelectTrigger className="w-full">
//                   <div className="flex items-center gap-2">
//                     <GraduationCap className="h-4 w-4 text-gray-500" />
//                     <SelectValue placeholder="Tahun Bergabung" />
//                   </div>
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Semua Tahun</SelectItem>
//                   {years.map((year) => (
//                     <SelectItem key={year} value={year}>
//                       {year}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Advanced Filters */}
//             {showAdvancedFilter && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
//                 {/* Practice Type Filter */}
//                 <Select>
//                   <SelectTrigger className="w-full">
//                     <div className="flex items-center gap-2">
//                       <Building2 className="h-4 w-4 text-gray-500" />
//                       <SelectValue placeholder="Tipe Praktik" />
//                     </div>
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">Semua Tipe</SelectItem>
//                     <SelectItem value="hospital">Rumah Sakit</SelectItem>
//                     <SelectItem value="clinic">Klinik</SelectItem>
//                     <SelectItem value="health-center">Puskesmas</SelectItem>
//                     <SelectItem value="private">Praktek Mandiri</SelectItem>
//                     <SelectItem value="university">Universitas</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 {/* Specialization Filter */}
//                 <Select>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Spesialisasi" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">Semua Spesialisasi</SelectItem>
//                     <SelectItem value="sp-kklp">Spesialis KKLP</SelectItem>
//                     <SelectItem value="family-doctor">Dokter Keluarga</SelectItem>
//                     <SelectItem value="general-practitioner">Dokter Umum</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 {/* Sort By */}
//                 <Select>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Urutkan Berdasarkan" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="name-asc">Nama A-Z</SelectItem>
//                     <SelectItem value="name-desc">Nama Z-A</SelectItem>
//                     <SelectItem value="year-asc">Tahun Bergabung (Lama)</SelectItem>
//                     <SelectItem value="year-desc">Tahun Bergabung (Baru)</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             {/* Active Filters */}
//             {(searchQuery || branchFilter || statusFilter || yearFilter) && (
//               <div className="mt-4 pt-4 border-t">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-600">Filter aktif:</span>
//                   <div className="flex flex-wrap gap-2">
//                     {searchQuery && (
//                       <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
//                         <Search className="h-3 w-3" />
//                         "{searchQuery}"
//                         <button
//                           onClick={() => setSearchQuery("")}
//                           className="ml-1 text-blue-500 hover:text-blue-700"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     )}
//                     {branchFilter && (
//                       <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
//                         <MapPin className="h-3 w-3" />
//                         {getBranchLabel(branchFilter)}
//                         <button
//                           onClick={() => setBranchFilter("")}
//                           className="ml-1 text-green-500 hover:text-green-700"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     )}
//                     {statusFilter && (
//                       <div className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
//                         <div className={`w-2 h-2 rounded-full ${
//                           statusFilter === "active" ? "bg-green-500" :
//                           statusFilter === "inactive" ? "bg-gray-500" : "bg-yellow-500"
//                         }`}></div>
//                         {statusFilter === "active" ? "Aktif" : statusFilter === "inactive" ? "Nonaktif" : "Dalam Proses"}
//                         <button
//                           onClick={() => setStatusFilter("")}
//                           className="ml-1 text-purple-500 hover:text-purple-700"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     )}
//                     {yearFilter && (
//                       <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">
//                         <GraduationCap className="h-3 w-3" />
//                         Tahun: {yearFilter}
//                         <button
//                           onClick={() => setYearFilter("")}
//                           className="ml-1 text-amber-500 hover:text-amber-700"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Results Stats */}
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {filteredMembers.length} Anggota Ditemukan
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 {searchQuery && `Hasil pencarian untuk "${searchQuery}"`}
//                 {branchFilter && ` • Cabang: ${getBranchLabel(branchFilter)}`}
//                 {statusFilter && ` • Status: ${statusFilter === "active" ? "Aktif" : statusFilter === "inactive" ? "Nonaktif" : "Dalam Proses"}`}
//                 {yearFilter && ` • Tahun Bergabung: ${yearFilter}`}
//               </p>
//             </div>
//             <div className="text-sm text-gray-600">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="gap-2">
//                     Export
//                     <ChevronDown className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuCheckboxItem>
//                     Export ke Excel
//                   </DropdownMenuCheckboxItem>
//                   <DropdownMenuCheckboxItem>
//                     Export ke PDF
//                   </DropdownMenuCheckboxItem>
//                   <DropdownMenuCheckboxItem>
//                     Cetak Daftar
//                   </DropdownMenuCheckboxItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {/* Loading State */}
//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Memuat data anggota...</p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* Members Grid/List */}
//               {filteredMembers.length > 0 ? (
//                 viewMode === "grid" ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredMembers.map((member) => (
//                       <MemberCard key={member.id} member={member} viewMode="grid" />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {filteredMembers.map((member) => (
//                       <MemberCard key={member.id} member={member} viewMode="list" />
//                     ))}
//                   </div>
//                 )
//               ) : (
//                 <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
//                   <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                   <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                     Tidak ada anggota ditemukan
//                   </h3>
//                   <p className="text-gray-500 max-w-md mx-auto">
//                     Tidak ada anggota yang cocok dengan filter yang Anda pilih. Coba gunakan kata kunci pencarian yang berbeda atau reset filter.
//                   </p>
//                   <Button onClick={resetFilters} className="mt-4">
//                     Reset Semua Filter
//                   </Button>
//                 </div>
//               )}

//               {/* Pagination */}
//               {filteredMembers.length > 0 && (
//                 <div className="flex justify-center items-center gap-4 mt-8 pt-8 border-t">
//                   <Button variant="outline" disabled>
//                     Sebelumnya
//                   </Button>
//                   <div className="flex gap-2">
//                     {[1, 2, 3].map((page) => (
//                       <Button
//                         key={page}
//                         variant="outline"
//                         className={page === 1 ? "bg-blue-50 border-blue-200" : ""}
//                       >
//                         {page}
//                       </Button>
//                     ))}
//                   </div>
//                   <Button variant="outline">
//                     Selanjutnya
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}

        
//         </div>
//       </main>
//     </div>
//   );
// }


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
import dynamic from 'next/dynamic';

// Import peta secara dinamis untuk menghindari SSR
const MapChart = dynamic(() => import('../components/members/MopChart'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-[400px] bg-gray-200 rounded-xl mb-6"></div>
      </div>
    </div>
  ),
});

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

// Data cabang dengan koordinat geografis yang benar
const branchData = [
  { id: "aceh", name: "Aceh", latitude: 4.6951, longitude: 96.7494, members: 0 },
  { id: "sumatera-utara", name: "Sumatera Utara", latitude: 2.1154, longitude: 99.5451, members: 0 },
  { id: "sumatera-barat", name: "Sumatera Barat", latitude: -0.7399, longitude: 100.8000, members: 0 },
  { id: "riau", name: "Riau", latitude: 0.2933, longitude: 101.7068, members: 0 },
  { id: "kepulauan-riau", name: "Kepulauan Riau", latitude: 3.9456, longitude: 108.1429, members: 0 },
  { id: "jambi", name: "Jambi", latitude: -1.6101, longitude: 103.6071, members: 0 },
  { id: "sumatera-selatan", name: "Sumatera Selatan", latitude: -3.3194, longitude: 103.9144, members: 0 },
  { id: "lampung", name: "Lampung", latitude: -5.4291, longitude: 105.2669, members: 0 },
  { id: "banten", name: "Banten", latitude: -6.1200, longitude: 106.1503, members: 0 },
  { id: "dki-jakarta", name: "DKI Jakarta", latitude: -6.2088, longitude: 106.8456, members: 0 },
  { id: "jawa-barat", name: "Jawa Barat", latitude: -6.9147, longitude: 107.6098, members: 0 },
  { id: "jawa-tengah", name: "Jawa Tengah", latitude: -7.1509, longitude: 110.1403, members: 0 },
  { id: "yogyakarta", name: "Yogyakarta", latitude: -7.7956, longitude: 110.3695, members: 0 },
  { id: "jawa-timur", name: "Jawa Timur", latitude: -7.5361, longitude: 112.2384, members: 0 },
  { id: "bali", name: "Bali", latitude: -8.4095, longitude: 115.1889, members: 0 },
  { id: "sulawesi-utara", name: "Sulawesi Utara", latitude: 1.4748, longitude: 124.8421, members: 0 },
  { id: "sulawesi-selatan", name: "Sulawesi Selatan", latitude: -5.1477, longitude: 119.4327, members: 0 },
];

// Komponen wrapper untuk IndonesiaMap
function IndonesiaMap({ 
  members, 
  onBranchClick 
}: { 
  members: Member[], 
  onBranchClick?: (branchValue: string) => void 
}) {
  // Hitung jumlah member per cabang
  const branchesWithCounts = useMemo(() => {
    const branchCounts: Record<string, number> = {};
    
    // Hitung total anggota per cabang
    members.forEach(member => {
      branchCounts[member.branch] = (branchCounts[member.branch] || 0) + 1;
    });
    
    // Update branch data dengan jumlah anggota
    return branchData.map(branch => ({
      ...branch,
      members: branchCounts[branch.id] || 0
    }));
  }, [members]);

  // Hitung statistik
  const stats = useMemo(() => {
    const totalMembers = members.length;
    const totalBranches = branchData.length;
    const avgMembersPerBranch = Math.round(totalMembers / totalBranches);
    
    // Cari cabang dengan anggota terbanyak
    let maxBranch = branchesWithCounts[0];
    branchesWithCounts.forEach(branch => {
      if (branch.members > maxBranch.members) {
        maxBranch = branch;
      }
    });

    return {
      totalMembers,
      totalBranches,
      avgMembersPerBranch,
      maxBranch: maxBranch.name,
      maxBranchCount: maxBranch.members
    };
  }, [members, branchesWithCounts]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Distribusi Anggota Berdasarkan Cabang
        </h2>
        <div className="text-sm text-gray-600">
          Total: <span className="font-bold text-blue-600">{stats.totalMembers}</span> anggota tersebar di <span className="font-bold text-blue-600">{stats.totalBranches}</span> cabang
        </div>
      </div>
      
      <div className="relative">
        {/* Map Chart */}
        <div className="w-full h-[400px] rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
          <MapChart 
            branches={branchesWithCounts} 
            onBranchClick={onBranchClick}
          />
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Legenda Cabang:</h3>
            <div className="text-sm text-gray-600">
              <span className="inline-flex items-center gap-1 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Anggota 1-5</span>
              </span>
              <span className="inline-flex items-center gap-1 mr-4">
                <div className="w-4 h-4 rounded-full bg-red-600"></div>
                <span>Anggota 6-10</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-red-700"></div>
                <span>Anggota 11+</span>
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {branchesWithCounts.map((branch) => (
              <div 
                key={branch.id}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => onBranchClick?.(branch.id)}
                title={`${branch.name}: ${branch.members} anggota`}
              >
                <div className="relative">
                  <div 
                    className={`rounded-full bg-red-500 ${
                      branch.members <= 5 ? 'w-3 h-3' :
                      branch.members <= 10 ? 'w-4 h-4' : 'w-5 h-5'
                    }`}
                  ></div>
                  {branch.members > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">
                      {branch.members}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium truncate max-w-[100px]">{branch.name}</div>
                  <div className="text-xs text-gray-500">{branch.members} anggota</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Branch statistics summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 border p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-700">Cabang Terbanyak</div>
                <div className="text-xl font-bold text-blue-900 truncate">
                  {stats.maxBranch}
                </div>
                <div className="text-sm text-blue-600">{stats.maxBranchCount} anggota</div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-gray-50 border p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-700">Total Cabang</div>
                <div className="text-xl font-bold text-blue-900">{stats.totalBranches} Cabang</div>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-gray-50 border p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-700">Rata-rata Anggota</div>
                <div className="text-xl font-bold text-blue-900">
                  {stats.avgMembersPerBranch} / cabang
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">Ø</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

  // Data cabang untuk dropdown filter
  const branches = branchData.map(branch => ({
    value: branch.id,
    label: branch.name
  }));

  // Data status
  const statuses = [
    { value: "active", label: "Aktif", color: "bg-green-500" },
    { value: "inactive", label: "Nonaktif", color: "bg-gray-500" },
    { value: "pending", label: "Dalam Proses", color: "bg-yellow-500" },
  ];

  // Data tahun bergabung (5 tahun terakhir)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

  // Handle branch click from map
  const handleBranchClick = (branchValue: string) => {
    setBranchFilter(branchValue);
    // Scroll to filter section
    document.getElementById("filter-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Simulasi fetching data - Data akan sesuai dengan branch yang ada
  useEffect(() => {
    // Simulasi data dari API
    const fetchMembers = async () => {
      setLoading(true);
      try {
        // Data dummy dengan distribusi yang realistis
        const dummyMembers: Member[] = [
          // DKI Jakarta - 3 anggota
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
            id: 13,
            name: "Dr. Rudi Hermawan, Sp.KKLP",
            npa: "PDSKKI-2024-013",
            branch: "dki-jakarta",
            specialization: "Dokter Keluarga",
            status: "active",
            yearJoined: 2023,
            practiceType: "Klinik Utama",
            city: "Jakarta Selatan",
            email: "rudi.hermawan@example.com",
            phone: "081412345678",
          },
          {
            id: 14,
            name: "Dr. Maya Sari, Sp.KKLP",
            npa: "PDSKKI-2024-014",
            branch: "dki-jakarta",
            specialization: "Spesialis KKLP",
            status: "active",
            yearJoined: 2022,
            practiceType: "Puskesmas",
            city: "Jakarta Timur",
            email: "maya.sari@example.com",
            phone: "081423456789",
          },
          // Jawa Barat - 2 anggota
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
            id: 15,
            name: "Dr. Agung Prabowo, Sp.KKLP",
            npa: "PDSKKI-2024-015",
            branch: "jawa-barat",
            specialization: "Kedokteran Keluarga",
            status: "active",
            yearJoined: 2024,
            practiceType: "Rumah Sakit",
            city: "Bekasi",
            email: "agung.prabowo@example.com",
            phone: "081434567890",
          },
          // Jawa Tengah - 1 anggota
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
          // Jawa Timur - 2 anggota
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
            id: 16,
            name: "Dr. Hendro Wibowo, Sp.KKLP",
            npa: "PDSKKI-2024-016",
            branch: "jawa-timur",
            specialization: "Dokter Keluarga",
            status: "active",
            yearJoined: 2023,
            practiceType: "Praktek Mandiri",
            city: "Malang",
            email: "hendro.wibowo@example.com",
            phone: "081445678901",
          },
          // Bali - 1 anggota
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
          // Sumatera Utara - 2 anggota
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
            id: 17,
            name: "Dr. Rina Dewi, Sp.KKLP",
            npa: "PDSKKI-2024-017",
            branch: "sumatera-utara",
            specialization: "Kedokteran Keluarga",
            status: "active",
            yearJoined: 2024,
            practiceType: "Puskesmas",
            city: "Binjai",
            email: "rina.dewi@example.com",
            phone: "081456789012",
          },
          // Sulawesi Selatan - 1 anggota
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
          // Yogyakarta - 1 anggota
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
          // Banten - 1 anggota
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
          // Sumatera Barat - 1 anggota
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
          // Lampung - 1 anggota
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
          // Riau - 1 anggota
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
          // Tambahan untuk cabang lainnya untuk mencapai total 17 anggota
          {
            id: 18,
            name: "Dr. Andi Surya, Sp.KKLP",
            npa: "PDSKKI-2024-018",
            branch: "aceh",
            specialization: "Dokter Keluarga",
            status: "active",
            yearJoined: 2023,
            practiceType: "Rumah Sakit",
            city: "Banda Aceh",
            email: "andi.surya@example.com",
            phone: "081467890123",
          },
          {
            id: 19,
            name: "Dr. Sari Utami, Sp.KKLP",
            npa: "PDSKKI-2024-019",
            branch: "kepulauan-riau",
            specialization: "Spesialis KKLP",
            status: "active",
            yearJoined: 2024,
            practiceType: "Klinik Utama",
            city: "Batam",
            email: "sari.utami@example.com",
            phone: "081478901234",
          },
          {
            id: 20,
            name: "Dr. Joko Widodo, Sp.KKLP",
            npa: "PDSKKI-2024-020",
            branch: "jambi",
            specialization: "Kedokteran Keluarga",
            status: "active",
            yearJoined: 2022,
            practiceType: "Puskesmas",
            city: "Jambi",
            email: "joko.widodo@example.com",
            phone: "081489012345",
          },
          {
            id: 21,
            name: "Dr. Siska Wijaya, Sp.KKLP",
            npa: "PDSKKI-2024-021",
            branch: "sumatera-selatan",
            specialization: "Dokter Keluarga",
            status: "active",
            yearJoined: 2023,
            practiceType: "Rumah Sakit",
            city: "Palembang",
            email: "siska.wijaya@example.com",
            phone: "081490123456",
          },
          {
            id: 22,
            name: "Dr. Bambang Sugianto, Sp.KKLP",
            npa: "PDSKKI-2024-022",
            branch: "sulawesi-utara",
            specialization: "Spesialis KKLP",
            status: "active",
            yearJoined: 2024,
            practiceType: "Rumah Sakit",
            city: "Manado",
            email: "bambang.sugianto@example.com",
            phone: "081501234567",
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
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  Anggota PDSKKI
                </h1>
                <p className="text-sm text-gray-600 mt-2">
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
          {/* Map Section */}
          <IndonesiaMap 
            members={members} 
            onBranchClick={handleBranchClick}
          />

          {/* Filter Section */}
          <div id="filter-section" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            {/* ... (sisa kode filter tetap sama) ... */}
            {/* Filter Section yang sama seperti sebelumnya */}
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