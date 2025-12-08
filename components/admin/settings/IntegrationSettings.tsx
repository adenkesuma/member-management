"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Globe,
  Key,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

type PaymentGateway = {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
  apiKey: string;
  secretKey: string;
};

export default function IntegrationSettings() {
  const [gateways, setGateways] = useState<PaymentGateway[]>([
    {
      id: "midtrans",
      name: "Midtrans",
      icon: <CreditCard className="h-5 w-5" />,
      enabled: true,
      apiKey: "**********",
      secretKey: "**********",
    },
    {
      id: "xendit",
      name: "Xendit",
      icon: <Banknote className="h-5 w-5" />,
      enabled: true,
      apiKey: "**********",
      secretKey: "**********",
    },
    {
      id: "doku",
      name: "DOKU",
      icon: <Smartphone className="h-5 w-5" />,
      enabled: false,
      apiKey: "",
      secretKey: "",
    },
    {
      id: "ipaymu",
      name: "iPaymu",
      icon: <Globe className="h-5 w-5" />,
      enabled: false,
      apiKey: "",
      secretKey: "",
    },
  ]);

  const toggleGateway = (id: string) => {
    setGateways(gateways.map(gateway => 
      gateway.id === id ? { ...gateway, enabled: !gateway.enabled } : gateway
    ));
  };

  const updateGatewayKey = (id: string, field: 'apiKey' | 'secretKey', value: string) => {
    setGateways(gateways.map(gateway => 
      gateway.id === id ? { ...gateway, [field]: value } : gateway
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Gateway Integrations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gateway List */}
        <div className="space-y-4">
          <h3 className="font-medium">Available Gateways</h3>
          <div className="space-y-4">
            {gateways.map((gateway) => (
              <div key={gateway.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      gateway.enabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {gateway.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{gateway.name}</h4>
                      <p className="text-sm text-gray-500">
                        Status: <span className={gateway.enabled ? "text-green-600" : "text-gray-500"}>
                          {gateway.enabled ? "Active" : "Inactive"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={gateway.enabled}
                    onCheckedChange={() => toggleGateway(gateway.id)}
                  />
                </div>

                {gateway.enabled && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${gateway.id}-api`} className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          API Key
                        </Label>
                        <div className="relative">
                          <Input
                            id={`${gateway.id}-api`}
                            type="password"
                            value={gateway.apiKey}
                            onChange={(e) => updateGatewayKey(gateway.id, 'apiKey', e.target.value)}
                            placeholder="Enter API key"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => {
                              // Toggle password visibility logic
                              const input = document.getElementById(`${gateway.id}-api`) as HTMLInputElement;
                              if (input) {
                                input.type = input.type === 'password' ? 'text' : 'password';
                              }
                            }}
                          >
                            👁️
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`${gateway.id}-secret`} className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          Secret Key
                        </Label>
                        <div className="relative">
                          <Input
                            id={`${gateway.id}-secret`}
                            type="password"
                            value={gateway.secretKey}
                            onChange={(e) => updateGatewayKey(gateway.id, 'secretKey', e.target.value)}
                            placeholder="Enter secret key"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => {
                              const input = document.getElementById(`${gateway.id}-secret`) as HTMLInputElement;
                              if (input) {
                                input.type = input.type === 'password' ? 'text' : 'password';
                              }
                            }}
                          >
                            👁️
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Test Connection */}
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Test Connection
                      </Button>
                      <Button variant="outline" size="sm">
                        View Logs
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Webhook Configuration */}
        <div className="space-y-4">
          <h3 className="font-medium">Webhook Configuration</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                defaultValue="https://api.pdskki.com/webhook/payment"
                placeholder="https://your-domain.com/webhook"
              />
              <p className="text-xs text-gray-500">
                URL untuk menerima payment notifications dari gateway
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookSecret">Webhook Secret</Label>
              <Input
                id="webhookSecret"
                type="password"
                defaultValue="**********"
                placeholder="Enter webhook secret"
              />
              <p className="text-xs text-gray-500">
                Secret untuk verifikasi webhook signature
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Enable Webhook</p>
                <p className="text-sm text-gray-500">Receive real-time payment updates</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="space-y-4">
          <h3 className="font-medium">API Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiBaseUrl">API Base URL</Label>
              <Input
                id="apiBaseUrl"
                defaultValue="https://api.pdskki.com/v1"
                placeholder="https://your-api-domain.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiTimeout">API Timeout (ms)</Label>
              <Input
                id="apiTimeout"
                type="number"
                defaultValue="30000"
                placeholder="30000"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Enable API Documentation</Label>
                <p className="text-sm text-gray-500">Swagger/OpenAPI documentation</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Enable Rate Limiting</Label>
                <p className="text-sm text-gray-500">Limit API requests per minute</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}