/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Wallet, 
  Target, 
  TrendingUp,
  Plus
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '../ui/card';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const data = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Apr', income: 2780, expenses: 3908 },
  { name: 'May', income: 1890, expenses: 4800 },
  { name: 'Jun', income: 2390, expenses: 3800 },
];

const categoryData = [
  { name: 'Housing', value: 1200 },
  { name: 'Food', value: 600 },
  { name: 'Travel', value: 300 },
  { name: 'Entertainment', value: 200 },
];

const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899'];

import { useLanguage } from '../../lib/LanguageContext';
import { useUser } from '../../lib/UserContext';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { TRANSACTION_CATEGORIES } from '../../constants';

export function Dashboard() {
  const { t, isRTL, formatValue } = useLanguage();
  const { userName, widgets, targets } = useUser();

  const totalInflow = 5200;
  const totalOutflow = 3150;
  const netSavings = totalInflow - totalOutflow;
  const goalPercent = Math.min((netSavings / targets.monthlySavingsGoal) * 100, 100).toFixed(1);
  const capPercent = (totalOutflow / targets.monthlyExpenseCap) * 100;

  return (
    <div className="space-y-10 pb-20">
      <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-6", isRTL && "sm:flex-row-reverse")}>
        <div className={isRTL ? "text-right" : "text-left"}>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-400 mb-1">
            {isRTL ? `خوش آمدید، ${userName}` : `GREETINGS, ${userName.toUpperCase()}`}
          </h2>
          <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
            <h1 className={cn("text-3xl font-black tracking-tighter", isRTL && "font-urdu")}>{t('dashboard.title')}</h1>
            <div className="h-1 w-10 bg-sky-500 hidden sm:block"></div>
          </div>
        </div>
        <div className={cn("flex gap-3", isRTL && "flex-row-reverse")}>
          <Button variant="outline" className="border-slate-800 text-[10px] uppercase font-bold tracking-widest bg-transparent hover:bg-slate-800">
            {isRTL ? 'تاریخچہ' : 'History'}
          </Button>
          
          <Dialog>
            <DialogTrigger render={<Button className="h-10 bg-sky-500 hover:bg-sky-600 text-slate-900 rounded-none font-bold text-xs uppercase tracking-widest px-6 italic" />}>
                {isRTL ? 'اندراج کریں' : 'Add Entry'}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#1E293B] border-slate-700 rounded-none">
              <DialogHeader>
                <DialogTitle className="text-sm font-bold uppercase tracking-widest text-slate-100">Quick Entry</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4 px-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-[10px] uppercase font-bold text-slate-400">Title</Label>
                  <Input id="title" placeholder="Description" className="col-span-3 bg-slate-900 border-slate-800 rounded-none text-xs text-slate-100" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-[10px] uppercase font-bold text-slate-400">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" className="col-span-3 bg-slate-900 border-slate-800 rounded-none text-xs text-slate-100" />
                </div>
              </div>
              <DialogFooter>
                <DialogTrigger render={<Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-slate-900 rounded-none font-bold text-[10px] uppercase tracking-widest px-6">
                  COMMIT_ENTRY
                </Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stat-card p-6">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-4">{t('dashboard.total_liquidity')}</span>
          <div className="text-3xl font-black tracking-tight text-sky-400">{formatValue(12450)}</div>
          <div className={cn("text-[10px] text-emerald-400 mt-2 font-mono flex items-center gap-1", isRTL && "flex-row-reverse")}>
             <ArrowUpRight className="w-3 h-3" /> +2.5% VS LAST MONTH
          </div>
        </Card>

        <Card className="stat-card p-6">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-4">{t('dashboard.inflow')}</span>
          <div className="text-3xl font-black tracking-tight">{formatValue(5200)}</div>
          <div className="text-[10px] text-slate-500 mt-2 font-mono">STATUS: OPTIMAL</div>
        </Card>

        <Card className="stat-card p-6">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-4">{t('dashboard.outflow')}</span>
          <div className="text-3xl font-black tracking-tight text-rose-500">{formatValue(3150)}</div>
          <div className={cn("text-[10px] text-rose-400 mt-2 font-mono flex items-center gap-1", isRTL && "flex-row-reverse")}>
             {capPercent > 90 ? (
               <><ArrowUpRight className="w-3 h-3" /> CRITICAL_LEVEL_ALERT</>
             ) : (
               <>STATUS: NOMINAL</>
             )}
          </div>
        </Card>

        <Card className="stat-card p-6">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-4">{t('dashboard.goal_progress')}</span>
          <div className="text-3xl font-black tracking-tight">{goalPercent}%</div>
          <div className="w-full bg-slate-800 h-1 mt-4">
            <div className={cn("h-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]", isRTL && "float-right")} style={{ width: `${goalPercent}%` }}></div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Main Chart */}
        {widgets.performance && (
          <Card className={cn("stat-card p-8 group", widgets.allocation ? "lg:col-span-5" : "lg:col-span-7")}>
          <div className={cn("flex justify-between items-center mb-10", isRTL && "flex-row-reverse")}>
            <div className={isRTL ? "text-right" : "text-left"}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">{t('dashboard.performance')}</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 italic">Real-time liquidity tracking</p>
            </div>
            <div className={cn("flex gap-4 text-[10px] font-bold tracking-widest font-mono", isRTL && "flex-row-reverse")}>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div> IN</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-slate-700"></div> OUT</div>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#1e293b" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} 
                  tickFormatter={(value) => formatValue(value)}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    borderRadius: '0px', 
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '11px',
                    fontFamily: 'monospace'
                  }} 
                />
                <Area 
                  type="stepAfter" 
                  dataKey="income" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                />
                <Area 
                  type="stepAfter" 
                  dataKey="expenses" 
                  stroke="#475569" 
                  strokeWidth={1}
                  fillOpacity={0} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        )}

        {/* Category Breakdown */}
        {widgets.allocation && (
        <Card className={cn("stat-card p-8", widgets.performance ? "lg:col-span-2" : "lg:col-span-7")}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100 mb-8">Asset Allocation</h2>
          <div className="space-y-6">
            {categoryData.map((item, index) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold tracking-widest text-slate-400">
                  <span>{item.name.toUpperCase()}</span>
                  <span className="text-white">{(item.value / 2300 * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1 bg-slate-800">
                  <div 
                    className="h-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.3)] transition-all duration-1000" 
                    style={{ width: `${(item.value / 2300 * 100)}%`, backgroundColor: COLORS[index] }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-2 border border-slate-700 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors">
            Analyze Metrics
          </button>
        </Card>
        )}
      </div>

      {/* Recent Activity */}
      {widgets.stream && (
      <Card className="stat-card p-8 overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">Live Transaction Stream</h2>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            LIVE_FEED_SYNCED
          </span>
        </div>
        <div className="space-y-1">
          {[
            { name: 'Apple Subscription', cat: 'Software', amount: -14.99, date: '11:04 AM' },
            { name: 'Client Payment #482', cat: 'Revenue', amount: 2500.00, date: '09:12 AM' },
            { name: 'Server Infrastructure', cat: 'Fixed Host', amount: -84.20, date: '08:45 AM' },
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-4 hover:bg-slate-800/30 transition-all border-b border-slate-800 last:border-0 group">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-slate-800 flex items-center justify-center font-mono text-[10px] group-hover:bg-sky-500 group-hover:text-slate-900 transition-colors">
                  0{i+1}
                </div>
                <div>
                  <div className="text-xs font-bold tracking-tight">{t.name}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">{t.cat} • {t.date}</div>
                </div>
              </div>
              <div className={cn(
                "text-xs font-mono font-bold",
                t.amount < 0 ? "text-rose-400" : "text-emerald-400"
              )}>
                {t.amount < 0 ? '-' : '+'}{formatValue(Math.abs(t.amount))}
              </div>
            </div>
          ))}
        </div>
      </Card>
      )}
    </div>
  );
}
