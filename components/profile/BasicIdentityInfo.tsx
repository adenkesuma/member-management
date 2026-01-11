// components/profile/BasicIdentityInfo.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BasicIdentityInfo() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nama lengkap sesuai KTP/SIP</Label>
          <Input id="fullName" placeholder="Masukkan nama lengkap" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="npa">NPA / Nomor Keanggotaan PDSKKI</Label>
          <Input id="npa" placeholder="Masukkan NPA" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="upload-npa">
            Upload NPA / Nomor Keanggotaan PDSKKI
          </Label>
          <Input type="file" accept="image/*" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nik">NIK / No. KTP</Label>
          <Input id="nik" placeholder="Masukkan NIK" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="birthDate">Tanggal Lahir</Label>
          <Input id="birthDate" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Jenis Kelamin</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Laki-laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="domicile">Alamat Domisili</Label>
        <div className="space-y-3">
          <Input placeholder="Alamat lengkap" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Input placeholder="Kelurahan" />
            <Input placeholder="Kecamatan" />
            <Input placeholder="Kota" />
            <Input placeholder="Provinsi" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="practiceAddress">Alamat Praktik Utama</Label>
        <div className="space-y-3">
          <Input placeholder="Alamat praktik lengkap" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Input placeholder="Kelurahan" />
            <Input placeholder="Kecamatan" />
            <Input placeholder="Kota" />
            <Input placeholder="Provinsi" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Foto Profil</Label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xs">Upload Foto</span>
          </div>
          <div className="flex-1">
            <Input type="file" accept="image/*" />
            <p className="text-sm text-gray-500 mt-1">Ukuran maksimal 5MB</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="branch">Cabang (Sesuai Database)</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih cabang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aceh">Aceh</SelectItem>
            <SelectItem value="bali">Bali</SelectItem>
            <SelectItem value="banten">Banten</SelectItem>
            <SelectItem value="dki-jakarta">DKI Jakarta</SelectItem>
            <SelectItem value="jambi">Jambi</SelectItem>
            <SelectItem value="jawa-barat">Jawa Barat</SelectItem>
            <SelectItem value="jawa-tengah">Jawa Tengah</SelectItem>
            <SelectItem value="jawa-timur">Jawa Timur</SelectItem>
            <SelectItem value="kepulauan-riau">Kepulauan Riau</SelectItem>
            <SelectItem value="lampung">Lampung</SelectItem>
            <SelectItem value="riau">Riau</SelectItem>
            <SelectItem value="sulawesi-selatan">Sulawesi Selatan</SelectItem>
            <SelectItem value="sulawesi-utara">Sulawesi Utara</SelectItem>
            <SelectItem value="sumatera-barat">Sumatera Barat</SelectItem>
            <SelectItem value="sumatera-selatan">Sumatera Selatan</SelectItem>
            <SelectItem value="sumatera-utara">Sumatera Utara</SelectItem>
            <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
