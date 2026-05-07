/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Plus, Flame, Calendar, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

export function Goals() {
  const goals = [
    { name: 'Emergency Fund', target: 10000, current: 8500, deadline: 'Dec 2024', color: 'bg-green-500' },
    { name: 'New Car', target: 25000, current: 4200, deadline: 'Mar 2026', color: 'bg-blue-500' },
    { name: 'Vacation', target: 3000, current: 2800, deadline: 'Aug 2024', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Savings Goals</h2>
          <p className="text-slate-500 dark:text-slate-400">Save for what matters most to you.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Goal
        </Button>
      </div>

      <div className="grid gap-6">
        {goals.map((goal) => {
          const percent = (goal.current / goal.target) * 100;
          return (
            <Card key={goal.name} className="overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{goal.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          Target Date: {goal.deadline}
                        </div>
                      </div>
                    </div>
                    <Badge variant={percent > 90 ? "default" : "secondary"}>
                      {Math.round(percent)}% Complete
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>${goal.current.toLocaleString()}</span>
                      <span className="text-slate-400">of ${goal.target.toLocaleString()}</span>
                    </div>
                    <Progress value={percent} className="h-2.5" />
                  </div>
                </div>
                
                <div className="bg-slate-50 border-l border-slate-200 p-6 w-full md:w-64 flex flex-col justify-center gap-4">
                   <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">$450 saved this month</span>
                   </div>
                   <Button variant="outline" size="sm" className="w-full">Add Funds</Button>
                   <Button variant="ghost" size="sm" className="w-full text-slate-500">Edit Details</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="border-dashed border-2 shadow-none hover:bg-slate-50/50 transition-colors cursor-pointer group">
         <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
               <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Start another goal</h3>
            <p className="text-sm text-slate-500 max-w-xs mt-2">Whether it's a home, wedding, or retirement, we'll help you get there.</p>
         </CardContent>
      </Card>
    </div>
  );
}
