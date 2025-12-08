"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterControls() {
  const [filters, setFilters] = useState({
    search: "",
    branch: "all",
    status: "all",
    month: "all",
    year: "2025",
    amountRange: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      branch: "all",
      status: "all",
      month: "all",
      year: "2025",
      amountRange: "all",
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Cari nama anggota, email, atau member ID..."
          className="pl-10"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Cabang</Label>
          <Select value={filters.branch} onValueChange={(value) => handleFilterChange("branch", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Semua Cabang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Cabang</SelectItem>
              <SelectItem value="jakarta">Jakarta</SelectItem>
              <SelectItem value="bandung">Bandung</SelectItem>
              <SelectItem value="surabaya">Surabaya</SelectItem>
              <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status Pembayaran</Label>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="paid">Lunas</SelectItem>
              <SelectItem value="pending">Menunggu</SelectItem>
              <SelectItem value="overdue">Terlambat</SelectItem>
              <SelectItem value="unpaid">Belum Bayar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Bulan</Label>
          <Select value={filters.month} onValueChange={(value) => handleFilterChange("month", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Semua Bulan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Bulan</SelectItem>
              <SelectItem value="1">Januari</SelectItem>
              <SelectItem value="2">Februari</SelectItem>
              <SelectItem value="3">Maret</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">Mei</SelectItem>
              <SelectItem value="6">Juni</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tahun</Label>
          <Select value={filters.year} onValueChange={(value) => handleFilterChange("year", value)}>
            <SelectTrigger>
              <SelectValue placeholder="2025" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="space-y-2">
          <Label>Rentang Iuran</Label>
          <Select value={filters.amountRange} onValueChange={(value) => handleFilterChange("amountRange", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Semua Jumlah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jumlah</SelectItem>
              <SelectItem value="small">{"< Rp 500rb"}</SelectItem>
              <SelectItem value="medium">Rp 500rb - 1jt</SelectItem>
              <SelectItem value="large">{"> Rp 1jt"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="showOnlyActive" className="rounded" />
          <Label htmlFor="showOnlyActive" className="text-sm">
            Hanya anggota aktif
          </Label>
        </div>

        <div className="flex-1"></div>

        <Button
          variant="outline"
          onClick={clearFilters}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </Button>

        <Button className="bg-blue-600 hover:bg-blue-700">
          Terapkan Filter
        </Button>
      </div>
    </div>
  );
}