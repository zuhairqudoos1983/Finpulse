/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bell, Plus, Calendar, Clock, CheckCircle, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

export function BillReminders() {
  const bills = [
    { title: 'Home Rent', amount: 1500, due: 'May 10', category: 'Housing', status: 'upcoming' },
    { title: 'Electricity Bill', amount: 84.50, due: 'May 12', category: 'Utilities', status: 'upcoming' },
    { title: 'Netflix Premium', amount: 19.99, due: 'May 05', category: 'Entertainment', status: 'paid' },
    { title: 'Car Insurance', amount: 120.00, due: 'May 15', category: 'Insurance', status: 'upcoming' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bill Reminders</h2>
          <p className="text-slate-500 dark:text-slate-400">Never miss a payment with automated alerts.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Reminder
        </Button>
      </div>

      <div className="grid gap-4">
        {bills.map((bill, i) => (
          <Card key={i} className={cn(
            "transition-all duration-200 border-l-4",
            bill.status === 'paid' ? "border-l-green-500 bg-green-50/10" : "border-l-indigo-500"
          )}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 lg:p-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                    bill.status === 'paid' ? "bg-green-100 text-green-600" : "bg-indigo-100 text-indigo-600"
                  )}>
                    {bill.status === 'paid' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{bill.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Due {bill.due}
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5" />
                        {bill.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="flex flex-col md:items-end">
                    <span className="text-xl font-bold text-slate-900">${bill.amount.toFixed(2)}</span>
                    <Badge variant={bill.status === 'paid' ? "default" : "secondary"} className={cn(
                      "mt-1 text-[10px] uppercase font-bold px-2 py-0",
                      bill.status === 'paid' && "bg-green-100 text-green-700 hover:bg-green-100"
                    )}>
                      {bill.status}
                    </Badge>
                  </div>
                  <Button variant={bill.status === 'paid' ? "outline" : "default"} size="sm" className="w-24">
                    {bill.status === 'paid' ? 'View Receipt' : 'Pay Now'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
         <div className="relative z-10 max-w-lg">
            <h3 className="text-2xl font-bold mb-2">Smart Bill Insights</h3>
            <p className="text-indigo-100 mb-6">You have $1,704.50 in bills due in the next 7 days. Your current balance covers this comfortably.</p>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
               Analyze Cash Flow
            </Button>
         </div>
         <Bell className="absolute -bottom-6 -right-6 w-48 h-48 text-white/10 rotate-12" />
      </div>
    </div>
  );
}
