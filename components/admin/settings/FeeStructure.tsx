"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type FeeTier = {
  id: number;
  name: string;
  amount: string;
  description: string;
  currency: string;
};

export default function FeeStructure() {
  const [feeTiers, setFeeTiers] = useState<FeeTier[]>([
    { id: 1, name: "Regular Member", amount: "800000", description: "Anggota biasa", currency: "IDR" },
    { id: 2, name: "Premium Member", amount: "1200000", description: "Anggota premium", currency: "IDR" },
    { id: 3, name: "Corporate", amount: "2500000", description: "Perusahaan/organisasi", currency: "IDR" },
    { id: 4, name: "Student", amount: "400000", description: "Mahasiswa/pelajar", currency: "IDR" },
  ]);

  const addNewTier = () => {
    const newId = feeTiers.length > 0 ? Math.max(...feeTiers.map(t => t.id)) + 1 : 1;
    setFeeTiers([...feeTiers, {
      id: newId,
      name: "",
      amount: "",
      description: "",
      currency: "IDR"
    }]);
  };

  const removeTier = (id: number) => {
    setFeeTiers(feeTiers.filter(tier => tier.id !== id));
  };

  const updateTier = (id: number, field: keyof FeeTier, value: string) => {
    setFeeTiers(feeTiers.map(tier => 
      tier.id === id ? { ...tier, [field]: value } : tier
    ));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Fee Structure</CardTitle>
        <Button onClick={addNewTier} size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Tier
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 pb-2 border-b">
            <div className="col-span-3">Tier Name</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Currency</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-1">Action</div>
          </div>

          {/* Fee Tiers */}
          {feeTiers.map((tier) => (
            <div key={tier.id} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3">
                <Input
                  value={tier.name}
                  onChange={(e) => updateTier(tier.id, 'name', e.target.value)}
                  placeholder="Tier name"
                />
              </div>
              <div className="col-span-2">
                <Input
                  value={tier.amount}
                  onChange={(e) => updateTier(tier.id, 'amount', e.target.value)}
                  placeholder="Amount"
                  type="number"
                />
              </div>
              <div className="col-span-2">
                <select
                  value={tier.currency}
                  onChange={(e) => updateTier(tier.id, 'currency', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="IDR">IDR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div className="col-span-4">
                <Input
                  value={tier.description}
                  onChange={(e) => updateTier(tier.id, 'description', e.target.value)}
                  placeholder="Description"
                />
              </div>
              <div className="col-span-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTier(tier.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Additional Settings */}
          <div className="pt-6 border-t space-y-4">
            <h3 className="font-medium">Additional Fee Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lateFee">Late Payment Fee (%)</Label>
                <Input id="lateFee" defaultValue="5" />
                <p className="text-xs text-gray-500">Percentage of original fee</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gracePeriod">Grace Period (days)</Label>
                <Input id="gracePeriod" defaultValue="7" type="number" />
                <p className="text-xs text-gray-500">Days before late fee applies</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="earlyDiscount">Early Payment Discount (%)</Label>
                <Input id="earlyDiscount" defaultValue="3" />
                <p className="text-xs text-gray-500">Discount for paying early</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountDays">Discount Period (days)</Label>
                <Input id="discountDays" defaultValue="5" type="number" />
                <p className="text-xs text-gray-500">Days before due date for discount</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}