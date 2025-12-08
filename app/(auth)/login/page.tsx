import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang</h1>
          <p className="text-gray-600 text-sm mt-2">Masuk ke akun PDSKKI Anda</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <LoginForm />
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          © 2025 PDSKKI. Hak cipta dilindungi undang-undang.
        </div>
      </div>
    </div>
  );
}