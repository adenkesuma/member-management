// components/superadmin/StatsCards.tsx
import { Users, CreditCard, Building2, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  selectedBranch: string;
  branchData?: {
    id: string;
    name: string;
    memberCount: number;
    activeMembers: number;
    pendingPayments: number;
  };
  userRole: "main" | "branch";
}

export default function StatsCards({ selectedBranch, branchData, userRole }: StatsCardsProps) {
  const stats = [
    {
      title: userRole === "main" && selectedBranch === "all" ? "Total Anggota Nasional" : "Total Anggota",
      value: branchData ? branchData.memberCount.toLocaleString() : "1,250",
      change: "+12%",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Anggota Aktif",
      value: branchData ? branchData.activeMembers.toLocaleString() : "980",
      change: "+8%",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Pembayaran Tertunda",
      value: branchData ? branchData.pendingPayments.toString() : "45",
      change: "-3%",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: userRole === "main" ? "Total Cabang" : "Status Cabang",
      value: userRole === "main" ? "17" : "Aktif",
      change: userRole === "main" ? "±0" : "",
      icon: <Building2 className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600"
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
                <span className="text-sm text-gray-500">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="font-medium text-gray-700">{stat.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}