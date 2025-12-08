import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Users,
  FileText,
  Bell,
  LogOut,
  ChevronRight
} from "lucide-react";

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin/payments/dashboard",
      icon: <Home className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Payment Management",
      href: "/admin/payments/dashboard",
      icon: <CreditCard className="h-5 w-5" />,
      active: true,
    },
    {
      title: "Reports",
      href: "/admin/payments/reports",
      icon: <BarChart3 className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Settings",
      href: "/admin/payments/settings",
      icon: <Settings className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Member Management",
      href: "/admin/members",
      icon: <Users className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Documents",
      href: "/admin/documents",
      icon: <FileText className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Notifications",
      href: "/admin/notifications",
      icon: <Bell className="h-5 w-5" />,
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">PDSKKI</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.title} href={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    item.active 
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.active && <ChevronRight className="h-4 w-4" />}
                </Button>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-3">
              Quick Stats
            </p>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Today's Revenue</p>
                <p className="text-lg font-bold">Rp 2.4jt</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-lg font-bold">15</p>
              </div>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
          <p className="text-xs text-gray-500 text-center mt-4">
            v2.5.1 • © 2025 PDSKKI
          </p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">PDSKKI Admin</h1>
              <p className="text-xs text-gray-500">Payment Management</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Menu
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Breadcrumb untuk desktop */}
        <div className="hidden lg:block bg-white border-b px-6 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/admin" className="hover:text-blue-600">
              Admin
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/admin/payments" className="hover:text-blue-600">
              Payments
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="font-medium text-gray-900">Dashboard</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-16 lg:pt-0">
          {children}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex justify-around p-3">
            <Link href="/admin/payments/dashboard">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
              </Button>
            </Link>
            <Link href="/admin/payments/reports">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">Reports</span>
              </Button>
            </Link>
            <Link href="/admin/payments/settings">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <Settings className="h-5 w-5" />
                <span className="text-xs">Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}