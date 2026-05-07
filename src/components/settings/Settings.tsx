/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  ShieldCheck, 
  Moon, 
  Sun,
  LayoutGrid,
  Link2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { CURRENCIES } from '../../constants';
import { Badge } from '../ui/badge';

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage your account and app preferences.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-500" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>Update your personal details and how others see you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Zuhair Qudoos" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="zuhair.qudoos@gmail.com" disabled />
              </div>
            </div>
            <Button size="sm">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Financial Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-slate-500" />
              <CardTitle>Preferences</CardTitle>
            </div>
            <CardDescription>Customize your financial experience and display settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Base Currency</Label>
                <p className="text-sm text-slate-500">The primary currency used for totals and charts.</p>
              </div>
              <Select defaultValue="USD">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map(curr => (
                    <SelectItem key={curr.code} value={curr.code}>{curr.code} ({curr.symbol})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-slate-500">Enable high-contrast night viewing mode.</p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-slate-400" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="w-4 h-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Integration */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Link2 className="w-5 h-5" />
              <CardTitle>Bank Integration</CardTitle>
            </div>
            <CardDescription>Connect your bank accounts securely via Plaid or Stripe Financial.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="p-4 rounded-xl border border-primary/10 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-500" />
                   </div>
                   <div>
                      <div className="font-semibold">Chase Personal Checking</div>
                      <div className="text-xs text-slate-500">Connected • Last synced 2 mins ago</div>
                   </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2 py-0 h-6 flex gap-1">
                   <CheckCircle2 className="w-3 h-3" /> Active
                </Badge>
             </div>

             <div className="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed border-primary/20 rounded-xl space-y-4">
                <ShieldCheck className="w-10 h-10 text-primary opacity-50" />
                <div className="space-y-1">
                   <h4 className="font-semibold">Add New Institution</h4>
                   <p className="text-sm text-slate-500 max-w-xs">Secure, read-only access to your transactions using bank-grade encryption.</p>
                </div>
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                   Connect a Bank
                </Button>
             </div>
          </CardContent>
        </Card>

        {/* Security / Data */}
        <Card>
           <CardHeader>
              <div className="flex items-center gap-2">
                 <Lock className="w-5 h-5 text-slate-500" />
                 <CardTitle>Security & Privacy</CardTitle>
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex gap-3">
                 <AlertCircle className="w-5 h-5 text-slate-400 shrink-0" />
                 <p className="text-sm text-slate-600 leading-tight">
                    Your data is protected with AES-256 encryption. We never store your bank login credentials directly on our servers.
                 </p>
              </div>
              <div className="flex gap-3 pt-2">
                 <Button variant="outline" size="sm">Export All Data (JSON)</Button>
                 <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">Delete Account</Button>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
