/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  History, 
  Plus, 
  ExternalLink,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

const performanceData = [
  { date: 'Jan', value: 10000 },
  { date: 'Feb', value: 10500 },
  { date: 'Mar', value: 11200 },
  { date: 'Apr', value: 10800 },
  { date: 'May', value: 12450 },
];

export function Investments() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Investment Portfolio</h2>
          <p className="text-slate-500 dark:text-slate-400">Track and analyze your assets and market performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" />
            History
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Asset
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$12,450.32</div>
            <div className="flex items-center gap-1 text-xs text-green-500 mt-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              +$1,240.12 (11.2%) all time
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Day Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">-$154.20</div>
            <div className="flex items-center gap-1 text-xs text-red-500 mt-1 font-medium">
              <TrendingDown className="w-3 h-3" />
              -1.24% today
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Cash Reserved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$2,100.50</div>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 font-medium">
              Ready to invest
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
            <CardDescription>Value growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Stocks', value: 65, color: 'bg-blue-500' },
              { label: 'Crypto', value: 20, color: 'bg-orange-500' },
              { label: 'Real Estate', value: 10, color: 'bg-green-500' },
              { label: 'Bonds', value: 5, color: 'bg-slate-400' },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-slate-500">{item.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
          <CardDescription>Your active investment positions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Holdings</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="text-right">Profit/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { symbol: 'AAPL', name: 'Apple Inc.', price: 182.40, shares: 10, change: 2.5, type: 'Stock' },
                { symbol: 'BTC', name: 'Bitcoin', price: 62450.00, shares: 0.05, change: -1.2, type: 'Crypto' },
                { symbol: 'VTI', name: 'Vanguard Total Stock', price: 254.12, shares: 15, change: 0.8, type: 'ETF' },
              ].map((row) => (
                <TableRow key={row.symbol}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold">{row.symbol}</span>
                      <span className="text-xs text-slate-500">{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${row.price.toLocaleString()}</TableCell>
                  <TableCell className="text-slate-500">{row.shares} shares</TableCell>
                  <TableCell className="font-semibold">${(row.price * row.shares).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={row.change > 0 ? "text-green-600 border-green-200 bg-green-50" : "text-red-600 border-red-200 bg-red-50"}>
                      {row.change > 0 ? '+' : ''}{row.change}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
