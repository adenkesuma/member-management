// components/profile/MembershipCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, QrCode } from "lucide-react";

export default function MembershipCard() {
  return (
    <Card className="rounded-2xl shadow-xl border-0 bg-gradient-to-br from-gray-900 to-black text-white">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white">
              Kartu Keanggotaan Digital
            </CardTitle>
            <CardDescription className="text-gray-300">
              PDSKKI - Official Member Card
            </CardDescription>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs font-bold px-3 py-1 rounded-full">
            PREMIUM
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Logo dan Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight">PDSKKI</h3>
              <p className="text-sm text-gray-400">
                Perhimpunan Dokter Spesialis Kedokteran Keluarga Indonesia
              </p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl">
              <QrCode className="h-12 w-12" />
            </div>
          </div>

          {/* Member Info */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Member ID</p>
              <p className="text-xl font-bold tracking-wider">
                PDSKKI-2024-001
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Nama Lengkap</p>
              <p className="text-lg font-semibold">Dr. John Doe, Sp.KKLP</p>
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Bergabung</p>
                <p className="font-medium">15 Jan 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Berlaku Hingga</p>
                <p className="font-medium text-green-400">31 Des 2025</p>
              </div>
            </div> */}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Cabang</p>
                <p className="font-medium">Jakarta Pusat</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Status</p>
                <p className="font-bold text-green-400">AKTIF</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 gap-2 bg-white/10 hover:bg-white/20 border-white/20"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Share2 className="h-4 w-4" />
              Bagikan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
