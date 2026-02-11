// components/superadmin/branch/BranchActivities.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Users,
  CreditCard,
  FileText,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserPlus,
  Mail,
} from "lucide-react";

interface BranchActivitiesProps {
  branchId: string;
}

export default function BranchActivities({ branchId }: BranchActivitiesProps) {
  // Data dummy aktivitas berdasarkan cabang
  const getActivitiesByBranch = (branchId: string) => {
    return [
      {
        id: 1,
        action: "Pembayaran diverifikasi",
        member: "Dr. Ahmad Hidayat",
        time: "5 menit lalu",
        type: "payment",
        status: "success",
        branch: branchId,
      },
      {
        id: 2,
        action: "Anggota baru ditambahkan",
        member: "Dr. Siti Nurhaliza",
        time: "15 menit lalu",
        type: "member",
        status: "success",
        branch: branchId,
      },
      {
        id: 3,
        action: "Pembayaran ditolak",
        member: "Dr. Budi Santoso",
        time: "1 jam lalu",
        type: "payment",
        status: "error",
        branch: branchId,
      },
      {
        id: 4,
        action: "Email broadcast dikirim",
        member: "Semua anggota cabang",
        time: "2 jam lalu",
        type: "notification",
        status: "info",
        branch: branchId,
      },
      {
        id: 5,
        action: "Data anggota diperbarui",
        member: "Dr. Maya Indah",
        time: "3 jam lalu",
        type: "member",
        status: "success",
        branch: branchId,
      },
      {
        id: 6,
        action: "Notifikasi pembayaran",
        member: "Anggota dengan iuran tertunda",
        time: "4 jam lalu",
        type: "payment",
        status: "info",
        branch: branchId,
      },
      {
        id: 7,
        action: "Approval anggota baru",
        member: "Dr. Rizky Pratama",
        time: "5 jam lalu",
        type: "member",
        status: "success",
        branch: branchId,
      },
    ];
  };

  const activities = getActivitiesByBranch(branchId);

  const getIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CreditCard className="h-4 w-4" />;
      case "member":
        return type === "member" &&
          activities.find((a) => a.id === 2)?.action.includes("baru") ? (
          <UserPlus className="h-4 w-4" />
        ) : (
          <Users className="h-4 w-4" />
        );
      case "notification":
        return <Bell className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "payment":
        return "text-primary";
      case "member":
        return "text-green-600";
      case "notification":
        return "text-purple-600";
      case "email":
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case "error":
        return <XCircle className="h-3 w-3 text-red-500" />;
      case "info":
        return <AlertCircle className="h-3 w-3 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
        >
          <div
            className={`p-2 rounded-lg ${getIconColor(activity.type).replace("text-", "bg-").replace("-600", "-100")}`}
          >
            <div className={getIconColor(activity.type)}>
              {getIcon(activity.type)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <p className="font-medium text-sm truncate">{activity.action}</p>
              {getStatusIcon(activity.status)}
            </div>
            <p className="text-sm text-gray-600 truncate">{activity.member}</p>
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
