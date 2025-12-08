// components/profile/ProfileHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfileHeader() {
  return (
    <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="w-24 h-24 border-4 border-white/20">
          <AvatarImage src="/api/placeholder/96/96" />
          <AvatarFallback className="text-2xl text-blue-600">JD</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Dr. John Doe, Sp.KKLP</h2>
              <p className="text-blue-100 mt-1">Anggota Aktif PDSKKI</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  Cabang Jakarta Pusat
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-100 border-0">
                  Status Aktif
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-100 border-0">
                  NPA: PDSKKI-2024-001
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm opacity-90">Bergabung sejak</p>
              <p className="text-lg font-semibold">15 Januari 2024</p>
              <p className="text-sm opacity-90 mt-2">Masa aktif hingga</p>
              <p className="text-lg font-semibold">31 Desember 2025</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
            <div>
              <p className="text-sm opacity-90">STR</p>
              <p className="font-medium">123456789012</p>
            </div>
            <div>
              <p className="text-sm opacity-90">SIP</p>
              <p className="font-medium">SIP/123/IV/2024</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Kategori</p>
              <p className="font-medium">Spesialis KKLP</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Praktik</p>
              <p className="font-medium">RS Sentral Medika</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}