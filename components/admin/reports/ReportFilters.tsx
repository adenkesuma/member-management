"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function ReportFilters() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2025, 0, 1), // 1 Jan 2025
    to: new Date(2025, 2, 31), // 31 Mar 2025
  });
  const [reportType, setReportType] = useState("quarterly");
  const [branch, setBranch] = useState("all");
  const [currency, setCurrency] = useState("idr");

  const reportTypes = [
    { value: "daily", label: "Harian" },
    { value: "weekly", label: "Mingguan" },
    { value: "monthly", label: "Bulanan" },
    { value: "quarterly", label: "Kuartal" },
    { value: "yearly", label: "Tahunan" },
    { value: "custom", label: "Kustom" },
  ];

  const branches = [
    { value: "all", label: "Semua Cabang" },
    { value: "jakarta", label: "Jakarta" },
    { value: "bandung", label: "Bandung" },
    { value: "surabaya", label: "Surabaya" },
    { value: "yogyakarta", label: "Yogyakarta" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Report Type */}
        <div className="space-y-2">
          <Label>Jenis Laporan</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis laporan" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Branch */}
        <div className="space-y-2">
          <Label>Cabang</Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih cabang" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branchItem) => (
                <SelectItem key={branchItem.value} value={branchItem.value}>
                  {branchItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <Label>Mata Uang</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="IDR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idr">IDR (Rupiah)</SelectItem>
              <SelectItem value="usd">USD (Dollar)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <Label>Rentang Tanggal</Label>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">
                  {format(dateRange.from, "dd MMMM yyyy", { locale: id })}
                </span>
                <span className="text-gray-400">sampai</span>
                <span className="text-sm font-medium">
                  {format(dateRange.to, "dd MMMM yyyy", { locale: id })}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Periode: Q1 2025 (3 bulan)
              </p>
            </div>
          </div>
          <Button variant="outline">Pilih Tanggal</Button>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="space-y-4">
        <h3 className="font-medium">Filter Tambahan</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="includePending" className="rounded" defaultChecked />
            <Label htmlFor="includePending" className="text-sm">
              Termasuk pending
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="includeOverdue" className="rounded" defaultChecked />
            <Label htmlFor="includeOverdue" className="text-sm">
              Termasuk tunggakan
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="groupByBranch" className="rounded" />
            <Label htmlFor="groupByBranch" className="text-sm">
              Group by cabang
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="showChart" className="rounded" defaultChecked />
            <Label htmlFor="showChart" className="text-sm">
              Tampilkan chart
            </Label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          Generate Laporan
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Reset Filter
        </Button>
      </div>
    </div>
  );
}