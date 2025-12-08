// app/profile/page.tsx - Halaman Profil Utama
"use client"

import { useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import BasicIdentityInfo from "@/components/profile/BasicIdentityInfo";
import ContactInfo from "@/components/profile/ContactInfo";
import ProfessionalInfo from "@/components/profile/ProfessionalInfo";
import MembershipInfo from "@/components/profile/MembershipInfo";
import MembershipCard from "@/components/profile/MembershipCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Bell, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [expandedCards, setExpandedCards] = useState({
    basicInfo: true,
    contactInfo: true,
    professionalInfo: true,
    membershipInfo: true,
  });

  const toggleCard = (cardName: keyof typeof expandedCards) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardName]: !prev[cardName]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Profil Anggota</h1>
              <p className="text-gray-600 text-sm">Kelola informasi profil dan keanggotaan PDSKKI</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifikasi
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Simpan Perubahan
              </Button>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header dengan foto dan info singkat */}
          <ProfileHeader />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Kolom Kiri - 2/3 lebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informasi Identitas Dasar */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className={`bg-blue-600 p-6 ${expandedCards.basicInfo ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Informasi Identitas Dasar</CardTitle>
                      <CardDescription className="text-white mt-1">Data identitas sesuai KTP/SIP dan database PDSKKI</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 cursor-pointer hover:text-white"
                      onClick={() => toggleCard("basicInfo")}
                    >
                      {expandedCards.basicInfo ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.basicInfo && (
                  <CardContent className="p-6">
                    <BasicIdentityInfo />
                  </CardContent>
                )}
              </Card>

              {/* Informasi Kontak */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className={`bg-blue-600 p-6 ${expandedCards.contactInfo ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Informasi Kontak</CardTitle>
                      <CardDescription className="text-white mt-1">Kontak utama dan alternatif untuk komunikasi resmi</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 cursor-pointer hover:text-white"
                      onClick={() => toggleCard("contactInfo")}
                      >
                      {expandedCards.contactInfo ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.contactInfo && (
                  <CardContent className="p-6">
                    <ContactInfo />
                  </CardContent>
                )}
              </Card>

              {/* Informasi Keprofesian */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className={`bg-blue-600 p-6 ${expandedCards.professionalInfo ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Informasi Keprofesian</CardTitle>
                      <CardDescription className="text-white mt-1">Data STR, SIP, pendidikan, dan praktik</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 cursor-pointer hover:text-white"
                      onClick={() => toggleCard("professionalInfo")}
                      >
                      {expandedCards.professionalInfo ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.professionalInfo && (
                  <CardContent className="p-6">
                    <ProfessionalInfo />
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Kolom Kanan - 1/3 lebar */}
            <div className="space-y-6">
              {/* Kartu Keanggotaan */}
              <MembershipCard />

              {/* Quick Actions */}
              <Card className="rounded-2xl shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    📋 Upload Dokumen
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    📅 Kalender Kegiatan
                  </Button> */}
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Link href={'dashboard'}>
                      💳 Pembayaran Iuran
                    </Link>
                  </Button>
                  {/* <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    📊 Statistik Keanggotaan
                  </Button> */}
                </CardContent>
              </Card>

              {/* Informasi Keanggotaan PDSKKI */}
              <Card className="rounded-2xl shadow-sm p-0 border border-gray-200">
                <CardHeader className={`bg-blue-600 p-6 ${expandedCards.membershipInfo ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Informasi Keanggotaan PDSKKI</CardTitle>
                      <CardDescription className="text-white mt-1">Status, riwayat, dan kegiatan organisasi</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 cursor-pointer hover:text-white"
                      onClick={() => toggleCard("membershipInfo")}
                      >
                      {expandedCards.membershipInfo ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.membershipInfo && (
                  <CardContent className="p-6">
                    <MembershipInfo />
                  </CardContent>
                )}
              </Card>

              {/* Status Verifikasi */}
              <Card className="rounded-2xl shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Status Verifikasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Identitas Dasar</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Terverifikasi</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">STR & SIP</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Perlu Perpanjangan</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Keanggotaan</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Aktif</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}