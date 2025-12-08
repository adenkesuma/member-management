"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, PieChart } from "lucide-react";

export default function ReportCharts() {
  const monthlyData = [
    { month: "Jan", revenue: 28500000, target: 30000000 },
    { month: "Feb", revenue: 32000000, target: 30000000 },
    { month: "Mar", revenue: 38500000, target: 35000000 },
  ];

  const branchData = [
    { branch: "Jakarta", value: 98500000, percentage: 53 },
    { branch: "Bandung", value: 42500000, percentage: 23 },
    { branch: "Surabaya", value: 28500000, percentage: 15 },
    { branch: "Yogyakarta", value: 15700000, percentage: 9 },
  ];

  const paymentMethodData = [
    { method: "Bank Transfer", count: 245, percentage: 72 },
    { method: "Credit Card", count: 58, percentage: 17 },
    { method: "E-Wallet", count: 24, percentage: 7 },
    { method: "Lainnya", count: 12, percentage: 4 },
  ];

  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue="revenue" className="w-full">
          <div className="flex items-center justify-between">
            <CardTitle>Visualisasi Data</CardTitle>
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="branch">By Cabang</TabsTrigger>
              <TabsTrigger value="method">By Metode</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue">
          <TabsContent value="revenue" className="space-y-6">
            {/* Revenue Chart */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Pertumbuhan Revenue Q1 2025</h3>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">+15.3%</span>
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className="space-y-4">
                {monthlyData.map((item) => {
                  const achievement = (item.revenue / item.target) * 100;
                  return (
                    <div key={item.month} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.month}</span>
                        <div className="text-right">
                          <p className="font-medium">Rp {(item.revenue / 1000000).toFixed(1)}jt</p>
                          <p className="text-sm text-gray-500">
                            Target: Rp {(item.target / 1000000).toFixed(1)}jt
                          </p>
                        </div>
                      </div>
                      <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`absolute h-full rounded-full ${
                            achievement >= 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(achievement, 100)}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            {achievement.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="branch">
            {/* Branch Distribution */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Distribusi per Cabang</h3>
                <div className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span>Total: Rp 185.2jt</span>
                </div>
              </div>

              <div className="space-y-4">
                {branchData.map((item) => (
                  <div key={item.branch} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.branch}</span>
                      <div className="text-right">
                        <p className="font-medium">Rp {(item.value / 1000000).toFixed(1)}jt</p>
                        <p className="text-sm text-gray-500">{item.percentage}% dari total</p>
                      </div>
                    </div>
                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-blue-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="method">
            {/* Payment Method Distribution */}
            <div className="space-y-6">
              <h3 className="font-medium">Distribusi Metode Pembayaran</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart Visualization */}
                <div className="relative h-64 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Segmen Pie Chart */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 rounded-full border-8 border-blue-500" 
                        style={{ clipPath: 'inset(0 50% 0 0)' }}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-green-500" 
                        style={{ clipPath: 'inset(0 0 50% 50%)' }}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-purple-500" 
                        style={{ clipPath: 'inset(50% 0 0 50%)' }}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-orange-500" 
                        style={{ clipPath: 'inset(50% 50% 0 0)' }}></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold">342</p>
                        <p className="text-sm text-gray-600">Transaksi</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-4">
                  {paymentMethodData.map((item, index) => {
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
                    return (
                      <div key={item.method} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                          <span className="font-medium">{item.method}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.count} transaksi</p>
                          <p className="text-sm text-gray-500">{item.percentage}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}