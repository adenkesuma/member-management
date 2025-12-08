"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Database, 
  Shield, 
  Clock, 
  Archive,
  AlertTriangle,
  Cpu
} from "lucide-react";

export default function AdvancedSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Database Settings */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="retentionDays">Retention Period (days)</Label>
              <Input id="retentionDays" type="number" defaultValue="30" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center gap-3">
              <Archive className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">Auto Backup</p>
                <p className="text-sm text-gray-500">Automatic database backups</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        {/* Security Settings */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Require 2FA for admin login</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">IP Whitelisting</Label>
                <p className="text-sm text-gray-500">Restrict admin access by IP</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Session Timeout</Label>
                <p className="text-sm text-gray-500">Auto logout after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="allowedIps">Allowed IP Addresses</Label>
            <Textarea
              id="allowedIps"
              placeholder="Enter IP addresses (one per line)"
              defaultValue="192.168.1.0/24\n10.0.0.0/8"
              rows={3}
            />
            <p className="text-xs text-gray-500">
              CIDR notation supported. Leave empty for no restrictions.
            </p>
          </div>
        </div>

        {/* Performance Settings */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Performance Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cacheTtl">Cache TTL (seconds)</Label>
              <Input id="cacheTtl" type="number" defaultValue="300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="queryTimeout">Query Timeout (seconds)</Label>
              <Input id="queryTimeout" type="number" defaultValue="30" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxConnections">Max Database Connections</Label>
            <Input id="maxConnections" type="number" defaultValue="20" />
          </div>
        </div>

        {/* Logging Settings */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Logging & Monitoring
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Enable Audit Logs</Label>
                <p className="text-sm text-gray-500">Log all admin activities</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Error Tracking</Label>
                <p className="text-sm text-gray-500">Track and report errors</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Performance Monitoring</Label>
                <p className="text-sm text-gray-500">Monitor system performance</p>
              </div>
              <Switch />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="logLevel">Log Level</Label>
            <Select defaultValue="info">
              <SelectTrigger>
                <SelectValue placeholder="Select log level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debug">Debug</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Maintenance Settings */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Maintenance Mode
          </h3>
          <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded">
            <div>
              <p className="font-medium text-yellow-800">Maintenance Mode</p>
              <p className="text-sm text-yellow-700">
                System will be unavailable to users
              </p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
            <Textarea
              id="maintenanceMessage"
              placeholder="Enter maintenance message for users"
              defaultValue="System is undergoing maintenance. We'll be back shortly."
              rows={2}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4 pt-6 border-t">
          <h3 className="font-medium text-red-700">Danger Zone</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded">
              <div>
                <p className="font-medium text-red-800">Reset All Settings</p>
                <p className="text-sm text-red-700">
                  Restore all settings to default values
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Reset
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded">
              <div>
                <p className="font-medium text-red-800">Purge All Data</p>
                <p className="text-sm text-red-700">
                  Delete all payment records (irreversible)
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Purge
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}