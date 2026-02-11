"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi kirim email
    console.log("Reset password for:", email);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      // Reset form dan kembali ke login setelah 3 detik
      setTimeout(() => {
        router.push("/login?reset=true");
      }, 3000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Email Terkirim!
        </h3>
        <p className="text-gray-600 mb-6">
          Kami telah mengirim link reset password ke{" "}
          <span className="font-medium">{email}</span>. Silakan cek inbox atau
          folder spam Anda.
        </p>
        <div className="animate-pulse text-sm text-gray-500">
          Mengarahkan ke halaman login...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Terdaftar</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
          <p className="text-sm text-gray-500">
            Masukkan email yang terdaftar di akun PDSKKI Anda.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-primary hover:bg-primary"
        disabled={isLoading || !email}
      >
        {isLoading ? "Mengirim..." : "Kirim Link Reset Password"}
      </Button>
    </form>
  );
}
