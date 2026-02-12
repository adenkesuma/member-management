"use client";

import { useState, useEffect, useMemo } from "react";
import MemberCard from "@/components/members/MemberCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PDSKKILogo from "@/public/pdskki.png";
import MapsImage from "@/public/maps.png";
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
  ChevronRight,
  ChevronLeft,
  Download,
  Star,
  TrendingUp,
  UserCheck,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const branchData = [
  {
    id: "aceh",
    name: "Aceh",
    latitude: 4.6951,
    longitude: 96.7494,
    members: 0,
  },
  {
    id: "sumatera-utara",
    name: "Sumatera Utara",
    latitude: 2.1154,
    longitude: 99.5451,
    members: 0,
  },
  {
    id: "sumatera-barat",
    name: "Sumatera Barat",
    latitude: -0.7399,
    longitude: 100.8,
    members: 0,
  },
  {
    id: "riau",
    name: "Riau",
    latitude: 0.2933,
    longitude: 101.7068,
    members: 0,
  },
  {
    id: "kepulauan-riau",
    name: "Kepulauan Riau",
    latitude: 3.9456,
    longitude: 108.1429,
    members: 0,
  },
  {
    id: "jambi",
    name: "Jambi",
    latitude: -1.6101,
    longitude: 103.6071,
    members: 0,
  },
  {
    id: "sumatera-selatan",
    name: "Sumatera Selatan",
    latitude: -3.3194,
    longitude: 103.9144,
    members: 0,
  },
  {
    id: "lampung",
    name: "Lampung",
    latitude: -5.4291,
    longitude: 105.2669,
    members: 0,
  },
  {
    id: "banten",
    name: "Banten",
    latitude: -6.12,
    longitude: 106.1503,
    members: 0,
  },
  {
    id: "dki-jakarta",
    name: "DKI Jakarta",
    latitude: -6.2088,
    longitude: 106.8456,
    members: 0,
  },
  {
    id: "jawa-barat",
    name: "Jawa Barat",
    latitude: -6.9147,
    longitude: 107.6098,
    members: 0,
  },
  {
    id: "jawa-tengah",
    name: "Jawa Tengah",
    latitude: -7.1509,
    longitude: 110.1403,
    members: 0,
  },
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    latitude: -7.7956,
    longitude: 110.3695,
    members: 0,
  },
  {
    id: "jawa-timur",
    name: "Jawa Timur",
    latitude: -7.5361,
    longitude: 112.2384,
    members: 0,
  },
  {
    id: "bali",
    name: "Bali",
    latitude: -8.4095,
    longitude: 115.1889,
    members: 0,
  },
  {
    id: "sulawesi-utara",
    name: "Sulawesi Utara",
    latitude: 1.4748,
    longitude: 124.8421,
    members: 0,
  },
  {
    id: "sulawesi-selatan",
    name: "Sulawesi Selatan",
    latitude: -5.1477,
    longitude: 119.4327,
    members: 0,
  },
];

function IndonesiaMap({
  members,
  onBranchClick,
}: {
  members: Member[];
  onBranchClick?: (branchValue: string) => void;
}) {
  const branchesWithCounts = useMemo(() => {
    const branchCounts: Record<string, number> = {};

    members.forEach((member) => {
      branchCounts[member.branch] = (branchCounts[member.branch] || 0) + 1;
    });

    return branchData.map((branch) => ({
      ...branch,
      members: branchCounts[branch.id] || 0,
    }));
  }, [members]);

  const stats = useMemo(() => {
    const totalMembers = members.length;
    const totalBranches = branchData.length;
    const avgMembersPerBranch = Math.round(totalMembers / totalBranches);

    let maxBranch = branchesWithCounts[0];
    branchesWithCounts.forEach((branch) => {
      if (branch.members > maxBranch.members) {
        maxBranch = branch;
      }
    });

    return {
      totalMembers,
      totalBranches,
      avgMembersPerBranch,
      maxBranch: maxBranch.name,
      maxBranchCount: maxBranch.members,
    };
  }, [members, branchesWithCounts]);

  // Top 5 cabang dengan anggota terbanyak
  const topBranches = useMemo(() => {
    return [...branchesWithCounts]
      .filter((b) => b.members > 0)
      .sort((a, b) => b.members - a.members)
      .slice(0, 5);
  }, [branchesWithCounts]);

  // Fungsi untuk mengkonversi koordinat ke posisi CSS (persentase)
  const getMarkerPosition = (lat: number, lng: number) => {
    // Konversi koordinat ke persentase untuk positioning di background image
    // Indonesia: longitude 95-141, latitude -11-6
    const left = ((lng - 95) / (141 - 95)) * 100;
    const top = ((6 - lat) / (6 - -11)) * 100;

    return {
      left: `${Math.min(Math.max(left, 5), 95)}%`,
      top: `${Math.min(Math.max(top, 5), 90)}%`,
    };
  };

  // Dapatkan warna marker berdasarkan jumlah anggota
  const getMarkerColor = (members: number) => {
    if (members >= 11) return "bg-red-600";
    if (members >= 6) return "bg-red-500";
    if (members >= 1) return "bg-red-400";
    return "bg-gray-300";
  };

  // Dapatkan ukuran marker berdasarkan jumlah anggota
  const getMarkerSize = (members: number) => {
    if (members >= 11) return "w-7 h-7";
    if (members >= 6) return "w-6 h-6";
    if (members >= 1) return "w-5 h-5";
    return "w-3 h-3";
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Distribusi Anggota
            </h2>
          </div>
          <p className="text-gray-500 text-sm ml-2">
            Sebaran anggota PDSKKI di seluruh Indonesia
          </p>
        </div>
      </div>

      {/* Maps Container - Background Image dengan Markers Dinamis */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-inner">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={MapsImage}
            alt="Peta Indonesia"
            fill
            className="object-cover"
            priority
          />
          {/* Soft Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10" />
        </div>

        {/* Grid Pattern untuk efek peta */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(39,70,152,0.03) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Dynamic Markers berdasarkan data branch */}
        {branchesWithCounts.map((branch) => {
          if (!branch.latitude || !branch.longitude) return null;

          const position = getMarkerPosition(branch.latitude, branch.longitude);
          const markerColor = getMarkerColor(branch.members);
          const markerSize = getMarkerSize(branch.members);

          return (
            <div
              key={branch.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: position.left, top: position.top }}
              onClick={() => onBranchClick?.(branch.id)}
            >
              {/* Pulse Effect untuk cabang dengan anggota */}
              {branch.members > 0 && (
                <div
                  className={`absolute inset-0 ${markerColor} rounded-full animate-ping opacity-30`}
                  style={{
                    width: "150%",
                    height: "150%",
                    left: "-25%",
                    top: "-25%",
                  }}
                />
              )}

              {/* Marker Utama */}
              <div
                className={`relative ${markerSize} ${markerColor} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover:scale-110 transition-all duration-300 border-2 border-white`}
              >
                {branch.members > 0 ? branch.members : ""}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-3 whitespace-nowrap shadow-lg">
                  <span className="font-semibold">{branch.name}</span>
                  <span className="text-gray-300 ml-1">
                    • {branch.members} anggota
                  </span>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Legenda
          </h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-white shadow-sm"></div>
              <span className="text-xs text-gray-600">1-5 Anggota</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
              <span className="text-xs text-gray-600">6-10 Anggota</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow-sm"></div>
              <span className="text-xs text-gray-600">11+ Anggota</span>
            </div>
            <div className="flex items-center gap-2 mt-1 pt-2 border-t border-gray-200">
              <div className="w-3 h-3 rounded-full bg-gray-300 border border-white"></div>
              <span className="text-xs text-gray-600">Belum ada anggota</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Modern Minimalist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Cabang Terbanyak
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {stats.maxBranch}
              </h3>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {stats.maxBranchCount} anggota
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/5 to-transparent rounded-2xl p-6 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Cabang
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {stats.totalBranches} Cabang
              </h3>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500">
                  Aktif seluruh Indonesia
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Rata-rata Anggota
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {stats.avgMembersPerBranch}
              </h3>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white font-bold">
                  Ø
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  anggota per cabang
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gray-200/50 flex items-center justify-center">
              <Users className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Branches & Branch List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Branches */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-primary/5 to-yellow-500/5 rounded-2xl p-6 border border-primary/10 h-full">
            <div className="flex items-center gap-2 mb-5">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <h3 className="font-semibold text-gray-900">Top 5 Cabang</h3>
            </div>

            <div className="space-y-4">
              {topBranches.length > 0 ? (
                topBranches.map((branch, index) => (
                  <div
                    key={branch.id}
                    className="flex items-center justify-between group cursor-pointer"
                    onClick={() => onBranchClick?.(branch.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-white"
                            : index === 1
                              ? "bg-gray-400 text-white"
                              : index === 2
                                ? "bg-amber-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm group-hover:text-primary transition-colors">
                          {branch.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {branch.members} anggota
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Belum ada data anggota
                </p>
              )}
            </div>
          </div>
        </div>

        {/* All Branches Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Daftar Cabang</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {branchesWithCounts.filter((b) => b.members > 0).length} aktif
                dari {branchData.length}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {branchesWithCounts.map((branch) => (
                <div
                  key={branch.id}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    branch.members > 0
                      ? "hover:bg-primary/5 hover:border-primary/20 border border-transparent"
                      : "opacity-60 hover:bg-gray-50 border border-transparent"
                  }`}
                  onClick={() => onBranchClick?.(branch.id)}
                >
                  <div className="relative">
                    <div
                      className={`rounded-full ${
                        branch.members <= 0
                          ? "bg-gray-300 w-2.5 h-2.5"
                          : branch.members <= 5
                            ? "bg-red-400 w-3 h-3"
                            : branch.members <= 10
                              ? "bg-red-500 w-3.5 h-3.5"
                              : "bg-red-600 w-4 h-4"
                      }`}
                    />
                    {branch.members > 0 && (
                      <div className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-yellow-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center px-1 border border-white">
                        {branch.members}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-700 truncate">
                      {branch.name}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {branch.members > 0
                        ? `${branch.members} anggota`
                        : "Belum ada"}
                    </div>
                  </div>
                </div>
              ))}
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Data cabang untuk dropdown filter
  const branches = branchData.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const statuses = [
    { value: "active", label: "Aktif", color: "bg-green-500" },
    { value: "inactive", label: "Nonaktif", color: "bg-gray-500" },
    { value: "pending", label: "Dalam Proses", color: "bg-yellow-500" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString(),
  );

  const handleBranchClick = (branchValue: string) => {
    setBranchFilter(branchValue);
    document
      .getElementById("filter-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
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

        setTimeout(() => {
          setMembers(dummyMembers);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching members:", error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          member.name.toLowerCase().includes(query) ||
          member.npa.toLowerCase().includes(query) ||
          member.city.toLowerCase().includes(query) ||
          member.specialization.toLowerCase().includes(query)
        );
      }

      if (branchFilter && member.branch !== branchFilter) return false;
      if (statusFilter && member.status !== statusFilter) return false;
      if (yearFilter && member.yearJoined.toString() !== yearFilter)
        return false;

      return true;
    });
  }, [members, searchQuery, branchFilter, statusFilter, yearFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const resetFilters = () => {
    setSearchQuery("");
    setBranchFilter("");
    setStatusFilter("");
    setYearFilter("");
    setCurrentPage(1);
  };

  const getBranchLabel = (branchValue: string) => {
    const branch = branches.find((b) => b.value === branchValue);
    return branch ? branch.label : branchValue;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Minimalist & Clean */}
      <header className="bg-primary border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md">
        <div className="px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-4 items-center justify-center">
                  <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    Anggota PDSKKI
                  </h1>
                  <span className="text-xs py-1 px-3 rounded-full border border-yellow-500 text-yellow-500">
                    Official Website
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Image
                  src={PDSKKILogo}
                  alt="PDSKKI Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Map Component */}
          <IndonesiaMap members={members} onBranchClick={handleBranchClick} />

          {/* Filter Section - Modern Glassmorphism */}
          <div
            id="filter-section"
            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-gray-200/50 p-6 mb-8 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Filter Anggota
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    onClick={() => setViewMode("grid")}
                    className={`rounded-lg px-4 ${
                      viewMode === "grid"
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "text-gray-600 hover:text-primary hover:bg-white"
                    }`}
                    size="sm"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    onClick={() => setViewMode("list")}
                    className={`rounded-lg px-4 ${
                      viewMode === "list"
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "text-gray-600 hover:text-primary hover:bg-white"
                    }`}
                    size="sm"
                  >
                    List
                  </Button>
                </div>

                {(searchQuery ||
                  branchFilter ||
                  statusFilter ||
                  yearFilter) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-gray-500 hover:text-primary hover:bg-primary/5 rounded-xl"
                  >
                    Reset Filter
                  </Button>
                )}
              </div>
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Cari nama, NPA, atau kota..."
                  className="pl-10 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl h-11"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-full border-gray-200 rounded-xl h-11">
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

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full border-gray-200 rounded-xl h-11">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${status.color}`}
                        />
                        {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-full border-gray-200 rounded-xl h-11">
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

            {/* Active Filters */}
            {(searchQuery || branchFilter || statusFilter || yearFilter) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-medium text-gray-500">
                    Filter aktif:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <div className="inline-flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20">
                        <Search className="h-3 w-3" />"{searchQuery}"
                        <button
                          onClick={() => setSearchQuery("")}
                          className="ml-1 hover:text-primary/70"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {branchFilter && (
                      <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium border border-green-200">
                        <MapPin className="h-3 w-3" />
                        {getBranchLabel(branchFilter)}
                        <button
                          onClick={() => setBranchFilter("")}
                          className="ml-1 hover:text-green-900"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {statusFilter && (
                      <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium border border-purple-200">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            statusFilter === "active"
                              ? "bg-green-500"
                              : statusFilter === "inactive"
                                ? "bg-gray-500"
                                : "bg-yellow-500"
                          }`}
                        />
                        {statusFilter === "active"
                          ? "Aktif"
                          : statusFilter === "inactive"
                            ? "Nonaktif"
                            : "Dalam Proses"}
                        <button
                          onClick={() => setStatusFilter("")}
                          className="ml-1 hover:text-purple-900"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {yearFilter && (
                      <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium border border-amber-200">
                        <Calendar className="h-3 w-3" />
                        {yearFilter}
                        <button
                          onClick={() => setYearFilter("")}
                          className="ml-1 hover:text-amber-900"
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

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {filteredMembers.length} Anggota Ditemukan
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery && `Pencarian: "${searchQuery}"`}
                {branchFilter && ` • Cabang: ${getBranchLabel(branchFilter)}`}
                {statusFilter &&
                  ` • Status: ${
                    statusFilter === "active"
                      ? "Aktif"
                      : statusFilter === "inactive"
                        ? "Nonaktif"
                        : "Dalam Proses"
                  }`}
                {yearFilter && ` • Tahun: ${yearFilter}`}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 rounded-xl border-gray-200 hover:border-primary hover:bg-primary/5"
                >
                  <Download className="h-4 w-4" />
                  Export
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl p-2">
                <DropdownMenuCheckboxItem className="rounded-lg hover:bg-primary/5">
                  Export ke Excel
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="rounded-lg hover:bg-primary/5">
                  Export ke PDF
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="rounded-lg hover:bg-primary/5">
                  Cetak Daftar
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Members Grid/List */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-primary mx-auto mb-4" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary/50" />
                  </div>
                </div>
                <p className="text-gray-600 font-medium">
                  Memuat data anggota...
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Mohon tunggu sebentar
                </p>
              </div>
            </div>
          ) : (
            <>
              {paginatedMembers.length > 0 ? (
                <>
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedMembers.map((member) => (
                        <MemberCard
                          key={member.id}
                          member={member}
                          viewMode="grid"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paginatedMembers.map((member) => (
                        <MemberCard
                          key={member.id}
                          member={member}
                          viewMode="list"
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination - Modern */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-10 pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="rounded-xl w-10 h-10 p-0 border-gray-200 hover:border-primary hover:bg-primary/5 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <div className="flex gap-2">
                        {Array.from(
                          { length: Math.min(totalPages, 5) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <Button
                                key={i}
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className={`rounded-xl w-10 h-10 p-0 ${
                                  currentPage === pageNum
                                    ? "bg-primary text-white hover:bg-primary/90 border-primary"
                                    : "border-gray-200 hover:border-primary hover:bg-primary/5"
                                }`}
                              >
                                {pageNum}
                              </Button>
                            );
                          },
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="rounded-xl w-10 h-10 p-0 border-gray-200 hover:border-primary hover:bg-primary/5 disabled:opacity-50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-200">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Tidak ada anggota ditemukan
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Tidak ada anggota yang cocok dengan filter yang Anda pilih.
                    Coba gunakan kata kunci pencarian yang berbeda atau reset
                    filter.
                  </p>
                  <Button
                    onClick={resetFilters}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-5"
                  >
                    Reset Semua Filter
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
