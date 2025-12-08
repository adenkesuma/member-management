// components/profile/MembershipInfo.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MembershipInfo() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="membershipStatus">Status Keanggotaan</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Nonaktif</SelectItem>
              <SelectItem value="process">Dalam Proses</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="joinDate">Tanggal Bergabung</Label>
          <Input id="joinDate" type="date" />
        </div>
      </div>

      {/* Riwayat Pembayaran */}
      <div className="space-y-2">
        <Label>Riwayat Pembayaran Iuran Anggota</Label>
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">2024</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Lunas</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">2023</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Lunas</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">2022</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Menunggu</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Data otomatis sesuai pembayaran</p>
        </div>
      </div>

      {/* Riwayat Kegiatan */}
      <div className="space-y-2">
        <Label>Riwayat Keikutsertaan Kegiatan PDSKKI</Label>
        <Textarea placeholder="Tuliskan kegiatan yang pernah diikuti..." className="min-h-[100px]" />
        <div className="space-y-2">
          <Label>Upload Sertifikat/Foto Kegiatan</Label>
          <Input type="file" multiple />
          <p className="text-sm text-gray-500">Bisa lebih dari 1 file</p>
        </div>
        <Button type="button" variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Tambah Kegiatan
        </Button>
      </div>

      {/* Riwayat Jabatan Organisasi */}
      <div className="space-y-2">
        <Label>Riwayat Jabatan Organisasi</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih jabatan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Tidak ada</SelectItem>
            <SelectItem value="branch">Pengurus Cabang</SelectItem>
            <SelectItem value="central">Pengurus Pusat</SelectItem>
            <SelectItem value="committee">Komite Tertentu</SelectItem>
            <SelectItem value="other">Lainnya</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Detail jabatan (opsional)" className="mt-2" />
      </div>
    </div>
  );
}