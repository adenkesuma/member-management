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
  Linkedin,
} from "lucide-react";
import PDSKKILogo from "@/public/pdskki.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#1e3a8a] to-[#0f2b6a] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          {/* Logo & Deskripsi */}
          <div className="flex-1">
            <div className="flex items-start gap-5">
              <div className="relative w-24 h-24 shrink-0">
                <Image
                  src={PDSKKILogo}
                  alt="PDSKKI Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">PDSKKI</h3>
                <p className="text-sm text-blue-100/90 leading-relaxed max-w-xs">
                  Perhimpunan Dokter Spesialis Kedokteran Keluarga Indonesia
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex-1">
            <h4 className="text-base font-semibold mb-4 tracking-wide">
              Ikuti Kami
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://facebook.com/pdskki"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/pdskki"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/pdskki"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com/pdskki"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/pdskki"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Kontak */}
          <div className="flex-1">
            <h4 className="text-base font-semibold mb-4 tracking-wide">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-300 shrink-0 mt-0.5" />
                <span className="text-sm text-blue-100/90">
                  Gedung IDI, Jl. Dr. Sam Ratulangi No. 29
                  <br />
                  Jakarta Pusat 10350
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-300 shrink-0" />
                <a
                  href="tel:+62213910777"
                  className="text-sm text-blue-100/90 hover:text-white transition-colors"
                >
                  +62 21 391 0777
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-300 shrink-0" />
                <a
                  href="mailto:sekretariat@pdskki.id"
                  className="text-sm text-blue-100/90 hover:text-white transition-colors"
                >
                  sekretariat@pdskki.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-[#0f2b6a]/50 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-xs text-blue-200/80">
              © {currentYear} PDSKKI. All rights reserved.
            </div>
            <div className="flex gap-4 text-xs">
              <Link
                href="/privacy"
                className="text-blue-200/80 hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <span className="text-blue-400/30">•</span>
              <Link
                href="/terms"
                className="text-blue-200/80 hover:text-white transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
