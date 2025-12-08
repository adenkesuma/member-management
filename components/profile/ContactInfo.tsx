// components/profile/ContactInfo.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="mainEmail">Email Utama *</Label>
          <Input id="mainEmail" type="email" placeholder="email@example.com" />
          <p className="text-sm text-gray-500">Untuk login dan komunikasi resmi</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="altEmail">Email Alternatif</Label>
          <Input id="altEmail" type="email" placeholder="email.alternatif@example.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Nomor HP / WhatsApp *</Label>
          <Input id="phone" type="tel" placeholder="0812-3456-7890" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="practicePhone">Nomor Telepon Praktik</Label>
          <Input id="practicePhone" type="tel" placeholder="021-1234567" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="socialMedia">Media Sosial Profesional</Label>
        <div className="space-y-3">
          <Input placeholder="LinkedIn Profile URL" />
          <Input placeholder="Instagram Profesional" />
          <Input placeholder="Twitter/X" />
        </div>
        <p className="text-sm text-gray-500">Opsional</p>
      </div>
    </div>
  );
}