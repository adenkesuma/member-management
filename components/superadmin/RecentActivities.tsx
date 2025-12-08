// components/superadmin/RecentActivities.tsx
import { Users, CreditCard, FileText, Bell, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function RecentActivities() {
  const activities = [
    { id: 1, action: "Pembayaran diverifikasi", member: "Dr. Ahmad Hidayat", time: "5 menit lalu", type: "payment", status: "success" },
    { id: 2, action: "Anggota baru ditambahkan", member: "Dr. Siti Nurhaliza", time: "15 menit lalu", type: "member", status: "success" },
    { id: 3, action: "Pembayaran ditolak", member: "Dr. Budi Santoso", time: "1 jam lalu", type: "payment", status: "error" },
    { id: 4, action: "Data anggota diperbarui", member: "Dr. Maya Indah", time: "2 jam lalu", type: "member", status: "success" },
    { id: 5, action: "Notifikasi dikirim", member: "Semua anggota cabang Jakarta", time: "3 jam lalu", type: "notification", status: "info" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "payment": return <CreditCard className="h-4 w-4" />;
      case "member": return <Users className="h-4 w-4" />;
      case "notification": return <Bell className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-3 w-3 text-green-500" />;
      case "error": return <XCircle className="h-3 w-3 text-red-500" />;
      case "info": return <AlertCircle className="h-3 w-3 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <div className="p-2 bg-gray-100 rounded-lg">
            {getIcon(activity.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-medium text-sm">{activity.action}</p>
              {getStatusIcon(activity.status)}
            </div>
            <p className="text-sm text-gray-600">{activity.member}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
      
      <div className="pt-4 border-t">
        <div className="text-center">
          <Button variant="outline" size="sm" className="w-full">
            Lihat Log Aktivitas Lengkap
          </Button>
        </div>
      </div>
    </div>
  );
}