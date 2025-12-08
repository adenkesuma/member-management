import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Percent } from "lucide-react";

export default function ReportStats() {
  const stats = [
    {
      title: "Total Pendapatan",
      value: "Rp 185.2jt",
      change: "+15.3%",
      trend: "up",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-green-50 text-green-600",
      period: "Q1 2025",
    },
    {
      title: "Anggota Membayar",
      value: "327",
      change: "+8.7%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-50 text-blue-600",
      period: "Dari 342 total",
    },
    {
      title: "Rata-rata Pembayaran",
      value: "Rp 567rb",
      change: "+5.2%",
      trend: "up",
      icon: <CreditCard className="h-5 w-5" />,
      color: "bg-purple-50 text-purple-600",
      period: "Per anggota",
    },
    {
      title: "Growth Rate",
      value: "12.4%",
      change: "+2.1%",
      trend: "up",
      icon: <Percent className="h-5 w-5" />,
      color: "bg-orange-50 text-orange-600",
      period: "vs Q4 2024",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-end gap-2 mt-2">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className={`text-sm font-medium flex items-center gap-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.period}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}