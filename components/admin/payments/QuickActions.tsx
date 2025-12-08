import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Download, 
  Mail, 
  BarChart3, 
  Settings,
  Users,
  Plus
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      icon: <Bell className="h-4 w-4" />,
      label: "Kirim Reminder",
      description: "Pengingat pembayaran",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Buat Invoice",
      description: "Generate invoice baru",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <Download className="h-4 w-4" />,
      label: "Export Excel",
      description: "Data pembayaran",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: "Laporan Tahunan",
      description: "Generate report 2025",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Anggota Baru",
      description: "Tambah anggota",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Pengaturan",
      description: "Konfigurasi iuran",
      color: "bg-gray-50 text-gray-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Aksi Cepat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50"
            >
              <div className={`${action.color} p-2 rounded-full`}>
                {action.icon}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{action.label}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}