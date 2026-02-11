import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink,
  Building2,
  Users,
  Calendar,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import PDSKKILogo from "@/public/pdskki.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-primary via-primary to-[#1a3a8a] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 items-start gap-8">
          <div>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32">
                <Image
                  src={PDSKKILogo}
                  alt="PDSKKI Logo"
                  fill
                  className="object-contain w-32 shrink-0"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">PDSKKI</h3>
                <p className="text-sm text-blue-100">
                  Perhimpunan Dokter Spesialis Kedokteran Keluarga Indonesia
                </p>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Ikuti Kami</h5>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/pdskki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/pdskki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/pdskki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/pdskki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-300/30">
              Menu Utama
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <Building2 className="h-4 w-4" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <Users className="h-4 w-4" />
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  Acara & Webinar
                </Link>
              </li>
              <li>
                <Link
                  href="/members"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <Users className="h-4 w-4" />
                  Anggota
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Sumber Daya
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-300/30">
              Sumber Daya
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/guidelines"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Panduan Praktik
                </Link>
              </li>
              <li>
                <Link
                  href="/skp"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Program SKP
                </Link>
              </li>
              <li>
                <Link
                  href="/publications"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Publikasi
                </Link>
              </li>
              <li>
                <Link
                  href="/certification"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Sertifikasi
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-300/30">
              Kontak Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-300 shrink-0 mt-0.5" />
                <span className="text-blue-100 text-sm">
                  Gedung Ikatan Dokter Indonesia (IDI)
                  <br />
                  Jalan Dr. Sam Ratulangi No. 29
                  <br />
                  Jakarta Pusat 10350
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-300" />
                <a
                  href="tel:+62213910777"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  +62 21 391 0777
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <a
                  href="mailto:sekretariat@pdskki.id"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  sekretariat@pdskki.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#1a3a8a] border-t border-white/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-blue-200 text-sm">
              © {currentYear} PDSKKI. Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/terms"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Syarat & Ketentuan
              </Link>
              <Link
                href="/sitemap"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Peta Situs
              </Link>
              <Link
                href="/disclaimer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
