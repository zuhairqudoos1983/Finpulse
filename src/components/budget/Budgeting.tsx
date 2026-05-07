/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  PieChart as PieChartIcon, 
  Plus, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

export function Budgeting() {
  const budgets = [
    { category: 'Housing', limit: 1500, spent: 1500, color: 'bg-sky-500' },
    { category: 'Food & Dining', limit: 600, spent: 450, color: 'bg-sky-500' },
    { category: 'Transportation', limit: 300, spent: 340, color: 'bg-rose-500' },
    { category: 'Entertainment', limit: 200, spent: 45, color: 'bg-emerald-500' },
    { category: 'Shopping', limit: 400, spent: 120, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-400 mb-1">Fiscal Constraints</h2>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tighter">BUDGET_PROTOCOLS.CFG</h1>
            <div className="h-1 w-10 bg-sky-500 hidden sm:block"></div>
          </div>
        </div>
        <Button className="h-10 bg-sky-500 hover:bg-sky-600 text-slate-900 rounded-none font-bold text-xs uppercase tracking-widest px-6 italic">
          <Plus className="w-4 h-4 mr-2" />
          NEW_PROTOCOL
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percent = (budget.spent / budget.limit) * 100;
          const isOver = budget.spent > budget.limit;
          
          return (
            <Card key={budget.category} className="stat-card p-6 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100">{budget.category}</h3>
                {isOver ? (
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                ) : percent > 90 ? (
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between font-mono text-[10px] tracking-widest uppercase text-slate-500">
                  <span>Usage: <span className={cn("font-bold", isOver ? "text-rose-400" : "text-sky-400")}>${budget.spent}</span></span>
                  <span>Cap: <span className="text-slate-300">${budget.limit}</span></span>
                </div>
                
                <div className="h-1 bg-slate-800">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      isOver ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]" : "bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                    )} 
                    style={{ width: `${Math.min(percent, 100)}%` }} 
                  />
                </div>
                
                <div className="flex justify-between items-center bg-slate-900/50 p-2 border border-slate-800/50">
                  <span className={cn(
                    "text-[9px] font-mono tracking-wider uppercase",
                    isOver ? "text-rose-400" : "text-slate-500"
                  )}>
                    {isOver ? `DELTA_NEGATIVE: -$${budget.spent - budget.limit}` : `RESERVE: $${budget.limit - budget.spent}`}
                  </span>
                  <div className={cn(
                    "px-1.5 py-0.5 text-[9px] font-bold font-mono border",
                    isOver ? "border-rose-500/50 text-rose-400" : "border-sky-500/50 text-sky-400"
                  )}>
                    {Math.round(percent)}%
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="stat-card p-10 border-slate-700 bg-[#1E293B] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-sky-500/5 rotate-12 pointer-events-none group-hover:text-sky-500/10 transition-colors">
          <BrainCircuit className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-1 bg-sky-500"></div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-100">Intelligent Analysis</h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2 underline decoration-emerald-500/30 underline-offset-4">Anomaly: Consumption Decreased</h4>
                <p className="text-xs text-slate-400 leading-relaxed uppercase tracking-tight font-medium">'Food & Dining' resource consumption is 15% lower than previous cycle. Protocol efficiency increasing.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-2 underline decoration-rose-500/30 underline-offset-4">Error: Limit Violated</h4>
                <p className="text-xs text-slate-400 leading-relaxed uppercase tracking-tight font-medium">'Transportation' cap exceeded by $40. Cause: External energy costs. Adjusting next cycle parameters.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
