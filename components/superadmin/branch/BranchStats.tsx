// components/superadmin/branch/BranchStats.tsx
import { Users, CreditCard, TrendingUp, Calendar, UserCheck, UserX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Branch {
  id: string;
  name: string;
  memberCount: number;
  activeMembers: number;
  pendingPayments: number;
  city: string;
  address: string;
}

interface BranchStatsProps {
  branch: Branch;
}

export default function BranchStats({ branch }: BranchStatsProps) {
  const stats = [
    {
      title: "Total Anggota",
      value: branch.memberCount.toString(),
      description: `+${Math.floor(branch.memberCount * 0.12)} dari tahun lalu`,
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600",
      trend: "up"
    },
    {
      title: "Anggota Aktif",
      value: branch.activeMembers.toString(),
      description: `${Math.round((branch.activeMembers / branch.memberCount) * 100)}% dari total`,
      icon: <UserCheck className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
      trend: "up"
    },
    {
      title: "Pembayaran Tertunda",
      value: branch.pendingPayments.toString(),
      description: "Perlu verifikasi",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-600",
      trend: "down"
    },
    {
      title: "Anggota Baru (30 hari)",
      value: "12",
      description: "Bergabung bulan ini",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600",
      trend: "up"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="rounded-2xl shadow-sm border border-gray-200">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-right">
                {stat.trend === "up" ? (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +12%
                  </span>
                ) : (
                  <span className="text-sm text-red-600 flex items-center gap-1">
                    <UserX className="h-3 w-3" /> -3%
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="font-medium text-gray-700">{stat.title}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}