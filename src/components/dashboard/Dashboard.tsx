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

export function Dashboard() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-400 mb-1">System Overview</h2>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tighter">FINANCE.DASHBOARD</h1>
            <div className="h-1 w-10 bg-sky-500 hidden sm:block"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-800 text-[10px] uppercase font-bold tracking-widest bg-transparent hover:bg-slate-800">
            History
          </Button>
          <Button className="h-10 bg-sky-500 hover:bg-sky-600 text-slate-900 rounded-none font-bold text-xs uppercase tracking-widest px-6 italic">
            Add Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stat-card p-6">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-4">Total Liquidity</span>
          <div className="text-3xl font-black tracking-tight text-sky-400">$12,450.00</div>
          <div className="text-[10px] text-emerald-400 mt-2 font-mono flex items-center gap-1">
             <ArrowUpRight className="w-3 h-3" /> +2.5% VS LAST MONTH
          </div>
        </Card>

        <Card className="stat-card p-6">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-4">Inflow / Monthly</span>
          <div className="text-3xl font-black tracking-tight">$5,200.00</div>
          <div className="text-[10px] text-slate-500 mt-2 font-mono">STATUS: OPTIMAL</div>
        </Card>

        <Card className="stat-card p-6">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-4">Outflow / Monthly</span>
          <div className="text-3xl font-black tracking-tight text-rose-500">$3,150.00</div>
          <div className="text-[10px] text-rose-400 mt-2 font-mono flex items-center gap-1">
             <ArrowUpRight className="w-3 h-3" /> CRITICAL_LEVEL_ALERT
          </div>
        </Card>

        <Card className="stat-card p-6">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-4">Active Goal Progress</span>
          <div className="text-3xl font-black tracking-tight">75.0%</div>
          <div className="w-full bg-slate-800 h-1 mt-4">
            <div className="bg-sky-500 h-full w-[75%] shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="lg:col-span-5 stat-card p-8 group">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">Capital Performance</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 italic">Real-time liquidity tracking</p>
            </div>
            <div className="flex gap-4 text-[10px] font-bold tracking-widest font-mono">
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
                  tickFormatter={(value) => `$${value}`}
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

        {/* Category Breakdown */}
        <Card className="lg:col-span-2 stat-card p-8">
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
      </div>

      {/* Recent Activity */}
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
                {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
