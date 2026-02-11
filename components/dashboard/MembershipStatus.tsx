// components/dashboard/MembershipStatus.tsx
import { CheckCircle, Clock, AlertCircle, Check } from "lucide-react";

export default function MembershipStatus() {
  return (
    <div className="space-y-4">
      {/* Status Aktif */}
      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium">Status Keanggotaan</p>
            <p className="text-sm text-green-600">Aktif</p>
          </div>
        </div>
        <span className="font-bold text-green-700">
          <Check />
        </span>
      </div>

      {/* Masa Aktif */}
      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Masa Aktif</p>
            <p className="text-sm text-primary">354 hari tersisa</p>
          </div>
        </div>
        <span className="font-bold text-primary">31 Des 2025</span>
      </div>

      {/* Tingkat Keanggotaan */}
      <div className="p-3 bg-purple-50 rounded-lg">
        <p className="font-medium mb-2">Tingkat Keanggotaan</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Spesialis KKLP</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
            PREMIUM
          </span>
        </div>
      </div>

      {/* Status Pembayaran */}
      <div className="p-3 bg-emerald-50 rounded-lg">
        <p className="font-medium mb-2">Status Pembayaran</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">2024</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              LUNAS
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">2023</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              LUNAS
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">2022</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              LUNAS
            </span>
          </div>
        </div>
      </div>

      {/* Peringatan */}
      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Peringatan</p>
            <p className="text-sm text-amber-600">
              Iuran 2025 akan jatuh tempo dalam 45 hari. Silakan siapkan
              pembayaran.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
