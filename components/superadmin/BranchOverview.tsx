// components/superadmin/BranchOverview.tsx
import {
  Building2,
  Users,
  CreditCard,
  MapPin,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Branch {
  id: string;
  name: string;
  memberCount: number;
  activeMembers: number;
  pendingPayments: number;
}

interface BranchOverviewProps {
  selectedBranch: string;
  branches: Branch[];
}

export default function BranchOverview({
  selectedBranch,
  branches,
}: BranchOverviewProps) {
  const getBranchData = () => {
    if (selectedBranch === "all") {
      return {
        totalMembers: branches
          .filter((b) => b.id !== "all")
          .reduce((sum, b) => sum + b.memberCount, 0),
        activeMembers: branches
          .filter((b) => b.id !== "all")
          .reduce((sum, b) => sum + b.activeMembers, 0),
        pendingPayments: branches
          .filter((b) => b.id !== "all")
          .reduce((sum, b) => sum + b.pendingPayments, 0),
      };
    }
    const branch = branches.find((b) => b.id === selectedBranch);
    return {
      totalMembers: branch?.memberCount || 0,
      activeMembers: branch?.activeMembers || 0,
      pendingPayments: branch?.pendingPayments || 0,
    };
  };

  const data = getBranchData();

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Anggota</p>
              <p className="text-2xl font-bold text-primary">
                {data.totalMembers.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+12% dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Anggota Aktif</p>
              <p className="text-2xl font-bold text-green-700">
                {data.activeMembers.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+8% dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pembayaran Tertunda</p>
              <p className="text-2xl font-bold text-amber-700">
                {data.pendingPayments}
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm text-red-600">
            <TrendingDown className="h-4 w-4 mr-1" />
            <span>-3% dari bulan lalu</span>
          </div>
        </div>
      </div>

      {/* Branch List (only for main admin viewing all) */}
      {selectedBranch === "all" && (
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Daftar Cabang</h3>
          <div className="border rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 p-4 font-medium text-sm text-gray-600">
              <div className="col-span-6">Nama Cabang</div>
              <div className="col-span-2">Total Anggota</div>
              <div className="col-span-2">Aktif</div>
              <div className="col-span-2">Aksi</div>
            </div>
            {branches
              .filter((b) => b.id !== "all")
              .slice(0, 5)
              .map((branch) => (
                <div
                  key={branch.id}
                  className="grid grid-cols-12 p-4 border-t hover:bg-gray-50"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{branch.name}</p>
                      <p className="text-sm text-gray-500">
                        ID: {branch.id.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="font-medium">{branch.memberCount}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="font-medium text-green-600">
                      {branch.activeMembers}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <Button size="sm" variant="outline">
                      Kelola
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" className="w-full">
              Lihat Semua Cabang
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
