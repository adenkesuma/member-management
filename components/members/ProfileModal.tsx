// components/members/ProfileModal.tsx
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  UserCheck,
  GraduationCap,
  BriefcaseMedical,
  FileText,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Member {
  id: number;
  name: string;
  npa: string;
  branch: string;
  specialization: string;
  status: "active" | "inactive" | "pending";
  yearJoined: number;
  practiceType: string;
  city: string;
  email: string;
  phone?: string;
  photo?: string;
  // Additional profile details
  strNumber?: string;
  sipNumber?: string;
  education?: string[];
  clinicalInterests?: string[];
  membershipType?: string;
  socialMedia?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

export default function ProfileModal({
  isOpen,
  onClose,
  member,
}: ProfileModalProps) {
  if (!member) return null;

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Profil Lengkap Anggota
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={member.photo} />
                <AvatarFallback className="bg-yellow-500 text-white text-2xl">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {member.name}
                      </h2>
                      <Badge className={`${getStatusColor(member.status)}`}>
                        {member.status === "active"
                          ? "Aktif"
                          : member.status === "inactive"
                            ? "Nonaktif"
                            : "Dalam Proses"}
                      </Badge>
                    </div>
                    <p className="text-lg text-primary font-medium">
                      {member.specialization}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <UserCheck className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{member.npa}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Bergabung {member.yearJoined}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Download CV
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 bg-primary hover:bg-primary"
                    >
                      <Phone className="h-4 w-4" />
                      Hubungi
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                Lokasi & Praktik
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{member.city}</p>
                    <Badge variant="outline" className="mt-1">
                      {getBranchLabel(member.branch)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Tempat Praktik</p>
                    <p className="text-gray-600">{member.practiceType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                Kontak
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-primary hover:underline"
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Telepon</p>
                      <a
                        href={`tel:${member.phone}`}
                        className="text-primary hover:underline"
                      >
                        {member.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="border-t pt-6 space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              Informasi Profesional
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {member.strNumber && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>STR</span>
                  </div>
                  <p className="font-medium">{member.strNumber}</p>
                </div>
              )}

              {member.sipNumber && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>SIP</span>
                  </div>
                  <p className="font-medium">{member.sipNumber}</p>
                </div>
              )}

              {member.membershipType && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    <span>Jenis Keanggotaan</span>
                  </div>
                  <p className="font-medium">{member.membershipType}</p>
                </div>
              )}
            </div>

            {/* Education */}
            {member.education && member.education.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Pendidikan
                </h4>
                <ul className="space-y-2">
                  {member.education.map((edu, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clinical Interests */}
            {member.clinicalInterests &&
              member.clinicalInterests.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Minat Klinis</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.clinicalInterests.map((interest, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-50 text-primary"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Social Media */}
          {member.socialMedia && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium text-gray-900">
                Media Sosial Profesional
              </h3>
              <div className="flex gap-4">
                {member.socialMedia.linkedin && (
                  <a
                    href={member.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-blue-800"
                  >
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <span className="font-bold">in</span>
                    </div>
                    <span>LinkedIn</span>
                  </a>
                )}
                {member.socialMedia.twitter && (
                  <a
                    href={member.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary"
                  >
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <span className="font-bold">𝕏</span>
                    </div>
                    <span>Twitter/X</span>
                  </a>
                )}
                {member.socialMedia.instagram && (
                  <a
                    href={member.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pink-600 hover:text-pink-800"
                  >
                    <div className="p-2 bg-pink-50 rounded-lg">
                      <span className="font-bold">IG</span>
                    </div>
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Tutup
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary gap-2">
            <Phone className="h-4 w-4" />
            Hubungi Sekarang
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
