import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDSKKI - Admin Panel",
  description: "Administration panel for PDSKKI Member Management System",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {/* Admin-specific global styles or providers bisa ditambahkan di sini */}
        {children}
      </body>
    </html>
  );
}