// components/members/ContactModal.tsx
import {
  X,
  Mail,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Globe,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Member {
  id: number;
  name: string;
  npa: string;
  email: string;
  phone?: string;
  city: string;
  branch: string;
  // Social media
  socialMedia?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

export default function ContactModal({
  isOpen,
  onClose,
  member,
}: ContactModalProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  if (!member) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setCopySuccess(`${type} berhasil disalin!`);

    setTimeout(() => {
      setCopySuccess(null);
      setCopiedType(null);
    }, 2000);
  };

  const getBranchLabel = (branchValue: string) => {
    const branches: Record<string, string> = {
      aceh: "Aceh",
      bali: "Bali",
      banten: "Banten",
      "dki-jakarta": "DKI Jakarta",
      jambi: "Jambi",
      "jawa-barat": "Jawa Barat",
      "jawa-tengah": "Jawa Tengah",
      "jawa-timur": "Jawa Timur",
      "kepulauan-riau": "Kepulauan Riau",
      lampung: "Lampung",
      riau: "Riau",
      "sulawesi-selatan": "Sulawesi Selatan",
      "sulawesi-utara": "Sulawesi Utara",
      "sumatera-barat": "Sumatera Barat",
      "sumatera-selatan": "Sumatera Selatan",
      "sumatera-utara": "Sumatera Utara",
      yogyakarta: "Yogyakarta",
    };
    return branches[branchValue] || branchValue;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Hubungi {member.name.split(" ")[0]}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Success Message */}
          {copySuccess && (
            <div className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
              <Check className="h-4 w-4" />
              {copySuccess}
            </div>
          )}

          {/* Member Info */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Anda akan menghubungi</p>
            <p className="text-lg font-bold text-blue-800">{member.name}</p>
            <p className="text-sm text-gray-600 mt-1">
              {member.city} • {getBranchLabel(member.branch)}
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              {/* Email */}
              <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <p className="text-sm text-gray-600">
                        Untuk komunikasi formal
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    onClick={() => handleCopy(member.email, "Email")}
                  >
                    {copiedType === "email" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    Salin
                  </Button>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-blue-600 hover:text-blue-800 font-medium break-all"
                  >
                    {member.email}
                  </a>
                </div>
                <div className="mt-3">
                  <a href={`mailto:${member.email}`}>
                    <Button className="w-full gap-2">
                      <Mail className="h-4 w-4" />
                      Kirim Email
                    </Button>
                  </a>
                </div>
              </div>

              {/* Phone */}
              {/* {member.phone && (
                <div className="border rounded-lg p-4 hover:border-green-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Telepon/WhatsApp</h4>
                        <p className="text-sm text-gray-600">Untuk komunikasi langsung</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() => handleCopy(member.phone!, "Nomor telepon")}
                    >
                      {copiedType === "phone" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      Salin
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <a
                      href={`tel:${member.phone}`}
                      className="text-green-600 hover:text-green-800 font-medium"
                    >
                      {member.phone}
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <a href={`tel:${member.phone}`}>
                      <Button variant="outline" className="w-full gap-2">
                        <Phone className="h-4 w-4" />
                        Telepon
                      </Button>
                    </a>
                    <a href={`https://wa.me/${member.phone?.replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                        <MessageSquare className="h-4 w-4" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              )} */}
            </div>

            {/* Social Media */}
            {/* {member.socialMedia && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Media Sosial</h4>
                <div className="grid grid-cols-2 gap-3">
                  {member.socialMedia.linkedin && (
                    <a
                      href={member.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Linkedin className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">LinkedIn</span>
                      </div>
                    </a>
                  )}
                  {member.socialMedia.website && (
                    <a
                      href={member.socialMedia.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border rounded-lg p-4 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Globe className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="font-medium">Website</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )} */}
          </div>

          {/* Contact Guidelines */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">
              📌 Etika Menghubungi
            </h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Sampaikan maksud dengan jelas dan sopan</li>
              <li>• Sebutkan nama dan afiliasi Anda</li>
              <li>• Hormati waktu praktik dokter</li>
              <li>• Gunakan bahasa yang profesional</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Tutup
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() =>
              handleCopy(member.email, "Email dan informasi kontak")
            }
          >
            <Copy className="h-4 w-4" />
            Salin Semua
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
