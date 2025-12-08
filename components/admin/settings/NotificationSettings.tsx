"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="font-medium">Email Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Invoice Sent</Label>
                <p className="text-sm text-gray-500">Send invoice via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Payment Confirmation</Label>
                <p className="text-sm text-gray-500">Confirm successful payment</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Payment Reminder</Label>
                <p className="text-sm text-gray-500">Remind before due date</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Reminder Settings */}
        <div className="space-y-4">
          <h3 className="font-medium">Reminder Schedule</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Reminder</Label>
                <Select defaultValue="7">
                  <SelectTrigger>
                    <SelectValue placeholder="Days before" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="14">14 days before</SelectItem>
                    <SelectItem value="7">7 days before</SelectItem>
                    <SelectItem value="5">5 days before</SelectItem>
                    <SelectItem value="3">3 days before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Second Reminder</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue placeholder="Days before" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days before</SelectItem>
                    <SelectItem value="3">3 days before</SelectItem>
                    <SelectItem value="2">2 days before</SelectItem>
                    <SelectItem value="1">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminderTime">Reminder Time</Label>
              <Input id="reminderTime" defaultValue="09:00" type="time" />
              <p className="text-xs text-gray-500">Time to send reminders</p>
            </div>
          </div>
        </div>

        {/* Notification Templates */}
        <div className="space-y-4">
          <h3 className="font-medium">Email Templates</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Custom Templates</Label>
                <p className="text-sm text-gray-500">Use custom email templates</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderEmail">Sender Email</Label>
              <Input id="senderEmail" defaultValue="noreply@pdskki.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderName">Sender Name</Label>
              <Input id="senderName" defaultValue="PDSKKI Payment System" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}