// components/superadmin/branch/BranchMembers.tsx
"use client";

import { useState } from "react";
import { Users, UserCheck, UserX, Clock, Mail, Phone, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BranchMembersProps {
  branchId: string;
  filters: {
    year: string;
    status: string;
  };
}

interface Member {
  id: number;
  name: string;
  npa: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  specialization: string;
  practiceType: string;
}

export default function BranchMembers({ branchId, filters }: BranchMembersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Data dummy anggota berdasarkan cabang
  const getMembersByBranch = (branchId: string): Member[] => {
    const baseMembers: Member[] = [
      { id: 1, name: "Dr. Ahmad Hidayat, Sp.KKLP", npa: `PDSKKI-${branchId.toUpperCase()}-001`, email: "ahmad@example.com", phone: "081234567890", status: "active", joinDate: "15 Jan 2024", specialization: "Kedokteran Keluarga", practiceType: "Rumah Sakit" },
      { id: 2, name: "Dr. Siti Nurhaliza, Sp.KKLP", npa: `PDSKKI-${branchId.toUpperCase()}-002`, email: "siti@example.com", phone: "081298765432", status: "active", joinDate: "14 Jan 2024", specialization: "Dokter Keluarga", practiceType: "Puskesmas" },
      { id: 3, name: "Dr. Budi Santoso, Sp.KKLP", npa: `PDSKKI-${branchId.toUpperCase()}-003`, email: "budi@example.com", phone: "081312345678", status: "pending", joinDate: "13 Jan 2024", specialization: "Spesialis KKLP", practiceType: "Klinik Utama" },
      { id: 4, name: "Dr. Maya Indah, Sp.KKLP", npa: `PDSKKI-${branchId.toUpperCase()}-004`, email: "maya@example.com", phone: "081323456789", status: "active", joinDate: "12 Jan 2024", specialization: "Kedokteran Keluarga", practiceType: "Rumah Sakit" },
      { id: 5, name: "Dr. Rizky Pratama, Sp.KKLP", npa: `PDSKKI-${branchId.toUpperCase()}-005`, email: "rizky@example.com", phone: "081334567890", status: "inactive", joinDate: "11 Jan 2024", specialization: "Dokter Keluarga", practiceType: "Praktek Mandiri" },
      { id: 6, name: "Dr. Ani Wijaya, Sp.KKLP", npa: `PDSKKI-${branchId.toUpperCase()}-006`, email: "ani@example.com", phone: "081345678901", status: "active", joinDate: "10 Jan 2024", specialization: "Spesialis KKLP", practiceType: "Rumah Sakit" },
      { id: 7, name: "Dr. Hendra Gunawan, Sp.KKLP", npa: `PDSKKI-${branchId.toUpperCase()}-007`, email: "hendra@example.com", phone: "081356789012", status: "active", joinDate: "09 Jan 2024", specialization: "Kedokteran Keluarga", practiceType: "Puskesmas" },
    ];

    // Filter berdasarkan status
    if (filters.status !== "all") {
      return baseMembers.filter(member => member.status === filters.status);
    }

    return baseMembers;
  };

  const members = getMembersByBranch(branchId);
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = members.slice(startIndex, startIndex + itemsPerPage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <UserCheck className="h-4 w-4 text-green-500" />;
      case "inactive": return <UserX className="h-4 w-4 text-gray-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Aktif";
      case "inactive": return "Nonaktif";
      case "pending": return "Menunggu";
      default: return status;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900">
          Daftar Anggota ({members.length})
        </h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Filter</Button>
          <Button size="sm">Tambah Anggota</Button>
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-medium text-sm text-gray-600">
          <div className="col-span-5">Nama</div>
          <div className="col-span-2">NPA</div>
          <div className="col-span-2">Bergabung</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Aksi</div>
        </div>
        
        {currentMembers.map((member) => (
          <div key={member.id} className="grid grid-cols-12 p-4 border-t hover:bg-gray-50">
            <div className="col-span-4">
              <p className="font-medium">{member.name}</p>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="truncate">{member.email}</span>
                </div>
              </div>
            </div>
            <div className="col-span-3 flex items-center">
              <span className="font-medium text-sm">{member.npa}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="text-gray-700 text-sm">{member.joinDate}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <Badge className={`${getStatusColor(member.status)} flex items-center gap-1 text-xs`}>
                {getStatusIcon(member.status)}
                {getStatusText(member.status)}
              </Badge>
            </div>
            <div className="col-span-1 flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Lihat Profil</DropdownMenuItem>
                  <DropdownMenuItem>Edit Data</DropdownMenuItem>
                  <DropdownMenuItem>Kirim Notifikasi</DropdownMenuItem>
                  {member.status === "pending" && <DropdownMenuItem>Approve</DropdownMenuItem>}
                  {member.status === "active" && <DropdownMenuItem>Nonaktifkan</DropdownMenuItem>}
                  <DropdownMenuItem className="text-red-600">Hapus</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-600">
          Menampilkan {startIndex + 1}-{startIndex + currentMembers.length} dari {members.length} anggota
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(0, 3)
              .map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}