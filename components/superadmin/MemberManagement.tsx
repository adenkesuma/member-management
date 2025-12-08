// components/superadmin/MemberManagement.tsx
import { Users, UserCheck, UserX, Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MemberManagementProps {
  selectedBranch: string;
}

export default function MemberManagement({ selectedBranch }: MemberManagementProps) {
  // Data dummy anggota
  const members = [
    { id: 1, name: "Dr. Ahmad Hidayat", npa: "PDSKKI-2024-001", email: "ahmad@example.com", status: "active", joinDate: "15 Jan 2024", branch: "dki-jakarta" },
    { id: 2, name: "Dr. Siti Nurhaliza", npa: "PDSKKI-2024-002", email: "siti@example.com", status: "pending", joinDate: "14 Jan 2024", branch: "jawa-barat" },
    { id: 3, name: "Dr. Budi Santoso", npa: "PDSKKI-2024-003", email: "budi@example.com", status: "inactive", joinDate: "13 Jan 2024", branch: "jawa-tengah" },
    { id: 4, name: "Dr. Maya Indah", npa: "PDSKKI-2024-004", email: "maya@example.com", status: "active", joinDate: "12 Jan 2024", branch: "jawa-timur" },
    { id: 5, name: "Dr. Rizky Pratama", npa: "PDSKKI-2024-005", email: "rizky@example.com", status: "active", joinDate: "11 Jan 2024", branch: "bali" },
  ];

  // Filter berdasarkan cabang
  const filteredMembers = selectedBranch === "all" 
    ? members 
    : members.filter(m => m.branch === selectedBranch);

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
          Anggota Terbaru ({filteredMembers.length})
        </h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Filter</Button>
          <Button size="sm">Tambah Anggota</Button>
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-medium text-sm text-gray-600">
          <div className="col-span-4">Nama</div>
          <div className="col-span-3">NPA</div>
          <div className="col-span-2">Bergabung</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Aksi</div>
        </div>
        
        {filteredMembers.map((member) => (
          <div key={member.id} className="grid grid-cols-12 p-4 border-t hover:bg-gray-50">
            <div className="col-span-4">
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-gray-500 truncate">{member.email}</p>
            </div>
            <div className="col-span-3 flex items-center">
              <span className="font-medium">{member.npa}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="text-gray-700">{member.joinDate}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <Badge className={`${getStatusColor(member.status)} flex items-center gap-1`}>
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

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-600">
          Menampilkan {filteredMembers.length} dari 250 anggota
        </div>
        <Button variant="outline" size="sm">
          Lihat Semua Anggota
        </Button>
      </div>
    </div>
  );
}