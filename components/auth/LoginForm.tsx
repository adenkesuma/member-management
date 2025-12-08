"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi login
    console.log("Login attempt:", formData);
    
    // Redirect ke dashboard setelah 1.5 detik
    setTimeout(() => {
      setIsLoading(false);
      // Untuk demo, redirect ke dashboard member
      router.push("/member/dashboard");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email atau Username</Label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a 
              href="/forget-password" 
              className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
            >
              Lupa password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          name="remember"
          checked={formData.remember}
          onCheckedChange={(checked) => 
            setFormData({ ...formData, remember: checked as boolean })
          }
        />
        <Label 
          htmlFor="remember" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Ingat saya
        </Label>
      </div>

      <Button
        size={'default'}
        type="submit"
        className="w-full h-11 bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="mr-2">⏳</span> Memproses...
          </>
        ) : (
          "Masuk"
        )}
      </Button>
    </form>
  );
}