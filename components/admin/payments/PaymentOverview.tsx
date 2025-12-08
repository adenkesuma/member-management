"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar } from "lucide-react";
import { useState } from "react";

export default function PaymentOverview() {
  const [timeRange, setTimeRange] = useState("monthly");

  const monthlyData = [
    { month: "Jan", paid: 28000000, unpaid: 3200000 },
    { month: "Feb", paid: 32000000, unpaid: 2800000 },
    { month: "Mar", paid: 38500000, unpaid: 6200000 },
    { month: "Apr", paid: 0, unpaid: 0 },
    { month: "Mei", paid: 0, unpaid: 0 },
    { month: "Jun", paid: 0, unpaid: 0 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.paid + d.unpaid));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Overview Pembayaran
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("monthly")}
          >
            Bulanan
          </Button>
          <Button
            variant={timeRange === "quarterly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("quarterly")}
          >
            Kuartal
          </Button>
          <Button
            variant={timeRange === "yearly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("yearly")}
          >
            Tahunan
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Legend */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm">Lunas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm">Tunggakan</span>
            </div>
          </div>

          {/* Chart Bars */}
          <div className="flex items-end justify-between h-64">
            {monthlyData.map((data, index) => {
              const total = data.paid + data.unpaid;
              const paidPercentage = (data.paid / maxValue) * 100;
              const unpaidPercentage = (data.unpaid / maxValue) * 100;

              return (
                <div key={index} className="flex flex-col items-center w-16">
                  {/* Stacked Bar */}
                  <div className="relative w-10">
                    {/* Paid (Green) */}
                    <div 
                      className="bg-green-500 rounded-t"
                      style={{ height: `${paidPercentage}%` }}
                    ></div>
                    {/* Unpaid (Red) */}
                    <div 
                      className="bg-red-500 rounded-b"
                      style={{ height: `${unpaidPercentage}%` }}
                    ></div>
                  </div>
                  
                  {/* Labels */}
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">{data.month}</p>
                    <p className="text-xs text-gray-500">
                      {total > 0 ? `Rp ${(total / 1000000).toFixed(1)}jt` : '-'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Rata-rata Bulanan</p>
              <p className="text-lg font-bold">Rp 32.8jt</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Target 2025</p>
              <p className="text-lg font-bold">Rp 400jt</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Pencapaian</p>
              <p className="text-lg font-bold text-green-600">82%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}