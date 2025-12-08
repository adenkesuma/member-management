"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, Filter } from "lucide-react";

export default function ReportTable() {
  const quarterlyData = [
    {
      quarter: "Q1 2025",
      totalRevenue: "Rp 185.2jt",
      avgPerMember: "Rp 567rb",
      paidMembers: "327",
      totalMembers: "342",
      growth: "+15.3%",
      status: "exceeded",
    },
    {
      quarter: "Q4 2024",
      totalRevenue: "Rp 160.5jt",
      avgPerMember: "Rp 538rb",
      paidMembers: "298",
      totalMembers: "312",
      growth: "+8.2%",
      status: "achieved",
    },
    {
      quarter: "Q3 2024",
      totalRevenue: "Rp 148.3jt",
      avgPerMember: "Rp 521rb",
      paidMembers: "285",
      totalMembers: "298",
      growth: "+5.1%",
      status: "achieved",
    },
    {
      quarter: "Q2 2024",
      totalRevenue: "Rp 141.2jt",
      avgPerMember: "Rp 495rb",
      paidMembers: "285",
      totalMembers: "298",
      growth: "-2.3%",
      status: "below",
    },
  ];

  const monthlyDetails = [
    { month: "Jan 2025", revenue: "28.5jt", newMembers: "12", churnRate: "2.1%" },
    { month: "Feb 2025", revenue: "32.0jt", newMembers: "18", churnRate: "1.8%" },
    { month: "Mar 2025", revenue: "38.5jt", newMembers: "22", churnRate: "2.3%" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Detail Laporan Quarter</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Quarterly Summary */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Quarter</th>
                <th className="text-left py-3">Total Revenue</th>
                <th className="text-left py-3">Avg/Member</th>
                <th className="text-left py-3">Anggota Bayar</th>
                <th className="text-left py-3">Growth</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {quarterlyData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{row.quarter}</td>
                  <td className="py-3 font-bold">{row.totalRevenue}</td>
                  <td className="py-3">{row.avgPerMember}</td>
                  <td className="py-3">
                    {row.paidMembers}/{row.totalMembers}
                    <p className="text-xs text-gray-500">
                      ({((parseInt(row.paidMembers) / parseInt(row.totalMembers)) * 100).toFixed(1)}%)
                    </p>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      row.growth.startsWith('+') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {row.growth}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      row.status === 'exceeded' 
                        ? 'bg-green-100 text-green-800' 
                        : row.status === 'achieved'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {row.status === 'exceeded' ? 'Melebihi Target' : 
                       row.status === 'achieved' ? 'Tercapai' : 'Dibawah Target'}
                    </span>
                  </td>
                  <td className="py-3">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Monthly Breakdown */}
        <div>
          <h3 className="font-medium mb-4">Breakdown Bulanan Q1 2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {monthlyDetails.map((month, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold">{month.month}</h4>
                  <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {month.revenue}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Members:</span>
                    <span className="font-medium">{month.newMembers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Churn Rate:</span>
                    <span className="font-medium">{month.churnRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ARPU:</span>
                    <span className="font-medium">Rp 567rb</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Lihat Detail
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2">📈 Insights Q1 2025</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Revenue tumbuh 15.3% dari Q4 2024</li>
            <li>• Pertumbuhan anggota baru tertinggi di Maret (+22 anggota)</li>
            <li>• Cabang Jakarta kontribusi 53% dari total revenue</li>
            <li>• Bank Transfer masih metode pembayaran dominan (72%)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}