// components/profile/ProfessionalInfo.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function ProfessionalInfo() {
  const [sipEntries, setSipEntries] = useState([{ id: 1 }]);

  const addSipEntry = () => {
    setSipEntries([...sipEntries, { id: sipEntries.length + 1 }]);
  };

  const removeSipEntry = (id: number) => {
    if (sipEntries.length > 1) {
      setSipEntries(sipEntries.filter(entry => entry.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* STR Section */}
      <div className="space-y-4 p-4 border rounded-xl">
        <h3 className="font-semibold text-lg">STR (Surat Tanda Registrasi)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="strNumber">Nomor STR</Label>
            <Input id="strNumber" placeholder="Masukkan nomor STR" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="strExpiry">Berlaku Hingga</Label>
            <Input id="strExpiry" type="date" />
            <p className="text-sm text-gray-500">Kosongkan jika seumur hidup</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Scan/Unggahan STR</Label>
          <Input type="file" accept="image/*" />
          <p className="text-sm text-gray-500">Image, maksimal 5MB</p>
        </div>
      </div>

      {/* SIP Section */}
      <div className="space-y-4 p-4 border rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">SIP (Surat Izin Praktik)</h3>
          <Button type="button" variant="outline" size="sm" onClick={addSipEntry} className="gap-2">
            <Plus className="h-4 w-4" /> Tambah SIP
          </Button>
        </div>
        <p className="text-sm text-gray-500">Optional - bisa lebih dari 1 lokasi praktik</p>

        {sipEntries.map((entry, index) => (
          <div key={entry.id} className="space-y-4 p-4 border rounded-lg relative">
            {sipEntries.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSipEntry(entry.id)}
                className="absolute right-2 top-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Nomor SIP</Label>
                <Input placeholder="Masukkan nomor SIP" />
              </div>
              <div className="space-y-2">
                <Label>Berlaku Hingga</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Lokasi Fasilitas Layanan Kesehatan</Label>
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
              <Label>Upload SIP</Label>
              <Input type="file" accept="image/*" />
              <p className="text-sm text-gray-500">Image, maksimal 5MB</p>
            </div>
          </div>
        ))}
      </div>

      {/* Status Anggota dan Pendidikan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="memberStatus">Status Anggota</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status anggota" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">Anggota Biasa</SelectItem>
              <SelectItem value="sp-kklp">Sp.KKLP</SelectItem>
              <SelectItem value="family-doctor">Dokter Keluarga</SelectItem>
              <SelectItem value="resident">Residen</SelectItem>
              <SelectItem value="honorary">Kehormatan</SelectItem>
            </SelectContent>
          </Select>
          {/* <p className="text-sm text-gray-500">
            Sp.KKLP: Spesialis Kedokteran Keluarga Layanan Primer<br/>
            Dokter Keluarga: Dokter praktik umum keluarga<br/>
            Anggota Biasa: Dokter umum/spesialis lain
          </p> */}
          <p className="text-sm text-gray-500">
            Apa bedanya Dokter Keluarga dengan SP.KKLP, serta Anggota Biasa. Status Keanggotaan Residen dan Kehormatan bagaimana
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="graduationYear">Tahun Lulus PPDS / Profesi</Label>
          <Input id="graduationYear" type="number" placeholder="Contoh: 2020" />
        </div>
      </div>

      {/* Institusi Pendidikan */}
      <div className="space-y-4 p-4 border rounded-xl">
        <h3 className="font-semibold text-lg">Institusi Pendidikan</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>S1 Kedokteran</Label>
            <Input placeholder="Universitas" />
          </div>
          <div className="space-y-2">
            <Label>Profesi Dokter</Label>
            <Input placeholder="Institusi" />
          </div>
          <div className="space-y-2">
            <Label>Spesialis KKLP</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jalur spesialisasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pemutihan">Pemutihan</SelectItem>
                <SelectItem value="rkl">RKL</SelectItem>
                <SelectItem value="rpl">RPL</SelectItem>
                <SelectItem value="university">Universitas</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Institusi" className="mt-2" />
          </div>
        </div>
      </div>

      {/* Tempat Praktik */}
      <div className="space-y-4 p-4 border rounded-xl">
        <h3 className="font-semibold text-lg">Tempat Praktik</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Jenis Tempat Praktik</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tempat praktik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="puskesmas">Puskesmas</SelectItem>
                <SelectItem value="clinic">Klinik Utama</SelectItem>
                <SelectItem value="hospital">RS</SelectItem>
                <SelectItem value="private">Praktek Mandiri</SelectItem>
                <SelectItem value="university">Universitas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Jam Praktik</Label>
            <Input placeholder="Contoh: 08:00 - 16:00" />
          </div>
        </div>
      </div>

      {/* Subkompetensi */}
      <div className="space-y-2">
        <Label>Subkompetensi atau Minat Klinis</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="pcc" />
            <Label htmlFor="pcc" className="font-normal">PCC</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="fomc" />
            <Label htmlFor="fomc" className="font-normal">FOMC</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="copc" />
            <Label htmlFor="copc" className="font-normal">COPC</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="preventive-oncology" />
            <Label htmlFor="preventive-oncology" className="font-normal">Preventive Oncology</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="chronic-disease" />
            <Label htmlFor="chronic-disease" className="font-normal">Chronic Disease Management</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="other" />
            <Label htmlFor="other" className="font-normal">Lainnya</Label>
          </div>
        </div>
        <Textarea placeholder="Minat klinis lainnya..." className="mt-2" />
      </div>
    </div>
  );
}