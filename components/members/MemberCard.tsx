// components/members/MemberCard.tsx - UPDATE
"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileModal from "@/components/members/ProfileModal";
import ContactModal from "@/components/members/ContactModal";

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
  strNumber?: string;
  sipNumber?: string;
  education?: string[];
  clinicalInterests?: string[];
  membershipType?: string;
  socialMedia?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

interface MemberCardProps {
  member: Member;
  viewMode: "grid" | "list";
}

export default function MemberCard({ member, viewMode }: MemberCardProps) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

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

  // Enhanced member data for modals
  const enhancedMember = {
    ...member,
    strNumber: member.strNumber || "123456789012",
    sipNumber: member.sipNumber || "SIP/JKT/2024/001",
    education: member.education || [
      "S1 Kedokteran - Universitas Indonesia",
      "Profesi Dokter - RSUPN Cipto Mangunkusumo",
      "Spesialis KKLP - Universitas Indonesia",
    ],
    clinicalInterests: member.clinicalInterests || [
      "PCC",
      "FOMC",
      "Chronic Disease Management",
      "Preventive Oncology",
    ],
    membershipType: member.membershipType || "Anggota Biasa",
    socialMedia: member.socialMedia || {
      linkedin: "https://linkedin.com/in/example",
      twitter: "https://twitter.com/example",
    },
  };

  if (viewMode === "list") {
    return (
      <>
        <div className="bg-white rounded-2xl border shadow-sm border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-gray-100">
                <AvatarImage src={member.photo} />
                <AvatarFallback className="bg-primary text-white text-lg">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status === "active"
                      ? "Aktif"
                      : member.status === "inactive"
                        ? "Nonaktif"
                        : "Dalam Proses"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{member.specialization}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <UserCheck className="h-4 w-4" />
                    <span>{member.npa}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Bergabung {member.yearJoined}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Practice */}
            <div className="md:ml-auto flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{member.city}</span>
                <Badge variant="outline" className="ml-2">
                  {getBranchLabel(member.branch)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{member.practiceType}</span>
              </div>
            </div>

            {/* Contact & Actions */}
            <div className="flex flex-col gap-2 min-w-[200px]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{member.phone}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowProfileModal(true)}
                >
                  Lihat Profil
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowContactModal(true)}
                >
                  Hubungi
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          member={enhancedMember}
        />
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          member={enhancedMember}
        />
      </>
    );
  }

  // Grid View
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Header with Status */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Badge className={`${getStatusColor(member.status)} mb-2`}>
                {member.status === "active"
                  ? "Aktif"
                  : member.status === "inactive"
                    ? "Nonaktif"
                    : "Dalam Proses"}
              </Badge>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {member.specialization}
              </p>
            </div>
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage src={member.photo} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* NPA & Join Year */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <UserCheck className="h-4 w-4" />
              <span className="font-medium">{member.npa}</span>
            </div>
            {/* <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Bergabung {member.yearJoined}</span>
            </div> */}
          </div>
        </div>

        {/* Divider */}
        <div className="px-6">
          <div className="border-t border-gray-100"></div>
        </div>

        {/* Details */}
        <div className="p-6 pt-4 space-y-4">
          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {member.city}
                </p>
                <Badge variant="outline" className="mt-1">
                  {getBranchLabel(member.branch)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Practice Type */}
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">{member.practiceType}</span>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 truncate">{member.email}</span>
            </div>
            {/* {member.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{member.phone}</span>
              </div>
            )} */}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => setShowProfileModal(true)}
            >
              Lihat Profil
            </Button>
            <Button
              size="sm"
              variant="default"
              className="flex-1 bg-primary hover:bg-primary"
              onClick={() => setShowContactModal(true)}
            >
              Hubungi
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        member={enhancedMember}
      />
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        member={enhancedMember}
      />
    </>
  );
}
