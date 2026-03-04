import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/pdskki.png";
import Background from "@/public/background.png";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <Image src={Background} alt="background" className="w-1/2 h-full" />
      <div className="w-1/2">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center mb-8">
            <Image src={Logo} alt="logo" className="w-20" />
            <h1 className="text-2xl font-bold text-gray-900">Lupa Password</h1>
            <p className="text-gray-600 mt-2">
              Masukkan email Anda untuk menerima link reset password
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <ForgotPasswordForm />

            <div className="mt-6 text-center text-sm text-gray-600">
              <Link
                href="/login"
                className="flex items-center justify-center gap-1 text-primary hover:text-primary font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Kembali ke halaman login
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Butuh bantuan?{" "}
            <a
              href="mailto:support@pdskki.com"
              className="text-primary hover:underline"
            >
              Hubungi support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
