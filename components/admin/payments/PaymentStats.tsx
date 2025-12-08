import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, AlertCircle, CheckCircle } from "lucide-react";

export default function PaymentStats() {
  const stats = [
    {
      title: "Total Penerimaan",
      value: "Rp 48.500.000",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-green-50 text-green-600",
      description: "Bulan ini",
    },
    {
      title: "Anggota Aktif",
      value: "342",
      change: "+8.2%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-50 text-blue-600",
      description: "Pembayar iuran",
    },
    {
      title: "Tertunggak",
      value: "Rp 6.200.000",
      change: "-3.1%",
      trend: "down",
      icon: <AlertCircle className="h-5 w-5" />,
      color: "bg-red-50 text-red-600",
      description: "Dari 15 anggota",
    },
    {
      title: "Lunas",
      value: "89%",
      change: "+5.3%",
      trend: "up",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-purple-50 text-purple-600",
      description: "327/342 anggota",
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
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
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