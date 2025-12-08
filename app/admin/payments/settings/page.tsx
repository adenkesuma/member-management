import PaymentConfig from "@/components/admin/settings/PaymentConfig";
import FeeStructure from "@/components/admin/settings/FeeStructure";
import NotificationSettings from "@/components/admin/settings/NotificationSettings";
import IntegrationSettings from "@/components/admin/settings/IntegrationSettings";
import AdvancedSettings from "@/components/admin/settings/AdvancedSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Settings as SettingsIcon, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Settings</h1>
              <p className="text-gray-600">Konfigurasi sistem pembayaran iuran</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Settings Navigation */}
          <div className="mb-6">
            <div className="flex space-x-1 overflow-x-auto">
              {[
                "Payment Config",
                "Fee Structure", 
                "Notifications",
                "Integrations",
                "Advanced"
              ].map((tab, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`whitespace-nowrap ${
                    index === 0 ? "bg-blue-50 text-blue-600 border-blue-200" : ""
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Kolom Kiri */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Configuration */}
              <PaymentConfig />

              {/* Fee Structure */}
              <FeeStructure />

              {/* Integration Settings */}
              <IntegrationSettings />
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6">
              {/* Notification Settings */}
              <NotificationSettings />

              {/* Advanced Settings */}
              <AdvancedSettings />

              {/* Settings Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    Info Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">15 Mar 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Updated By:</span>
                    <span className="font-medium">Admin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Config Version:</span>
                    <span className="font-medium">v2.5.1</span>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      Backup Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}