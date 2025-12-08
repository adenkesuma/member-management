"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PaymentConfig() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <h3 className="font-medium">Basic Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentCycle">Payment Cycle</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue placeholder="Select cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" defaultValue="10" />
              <p className="text-xs text-gray-500">Setiap bulan tanggal berapa</p>
            </div>
          </div>
        </div>

        {/* Currency Settings */}
        <div className="space-y-4">
          <h3 className="font-medium">Currency & Format</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="idr">
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idr">IDR (Rupiah)</SelectItem>
                  <SelectItem value="usd">USD (Dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currencySymbol">Currency Symbol</Label>
              <Input id="currencySymbol" defaultValue="Rp" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decimalPlaces">Decimal Places</Label>
              <Input id="decimalPlaces" defaultValue="0" type="number" />
            </div>
          </div>
        </div>

        {/* Tax & Fees */}
        <div className="space-y-4">
          <h3 className="font-medium">Tax & Additional Fees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input id="taxRate" defaultValue="11" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminFee">Admin Fee</Label>
              <Input id="adminFee" defaultValue="2500" />
            </div>
          </div>
        </div>

        {/* Switches */}
        <div className="space-y-4">
          <h3 className="font-medium">Payment Features</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Auto Renewal</Label>
                <p className="text-sm text-gray-500">Enable automatic payment renewal</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Partial Payment</Label>
                <p className="text-sm text-gray-500">Allow members to pay partially</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Early Payment Discount</Label>
                <p className="text-sm text-gray-500">Offer discount for early payment</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Late Payment Penalty</Label>
                <p className="text-sm text-gray-500">Apply penalty for late payment</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}