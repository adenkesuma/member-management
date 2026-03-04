import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";
import Logo from "@/public/pdskki.png";
import Background from "@/public/background.png";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Image src={Background} alt="background" className="w-1/2 h-full" />
      <div className="w-1/2">
        <div className="flex w-full flex-col items-center justify-center">
          <Image src={Logo} alt="logo image" className="w-20" />
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Selamat Datang</h1>
            <p className="text-gray-600 text-sm mt-2">
              Masuk ke akun PDSKKI Anda
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 w-1/2 border border-gray-200">
            <LoginForm />
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            © 2025 PDSKKI. Hak cipta dilindungi undang-undang.
          </div>
        </div>
      </div>
    </div>
  );
}
