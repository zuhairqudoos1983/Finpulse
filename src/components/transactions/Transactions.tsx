/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Plus
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '../ui/dialog';
import { Label } from '../ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { TRANSACTION_CATEGORIES } from '../../constants';
import { cn } from '../../lib/utils';

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-400 mb-1">Activity Log</h2>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tighter">TRANS_HISTORY.LOG</h1>
            <div className="h-1 w-10 bg-sky-500 hidden sm:block"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10 border-slate-700 text-[10px] uppercase font-bold tracking-widest bg-transparent hover:bg-slate-800 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            EXPORT_RAW
          </Button>
          
          <Dialog>
            <DialogTrigger render={<Button className="h-10 bg-sky-500 hover:bg-sky-600 text-slate-900 rounded-none font-bold text-xs uppercase tracking-widest px-6 italic" />}>
                <Plus className="w-4 h-4 mr-2" />
                NEW_ENTRY
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#1E293B] border-slate-700 rounded-none">
              <DialogHeader>
                <DialogTitle className="text-sm font-bold uppercase tracking-widest text-slate-100">Add Transaction</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right text-[10px] uppercase font-bold text-slate-400">Title</Label>
                  <Input id="title" placeholder="Description" className="col-span-3 bg-slate-900 border-slate-800 rounded-none text-xs" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right text-[10px] uppercase font-bold text-slate-400">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" className="col-span-3 bg-slate-900 border-slate-800 rounded-none text-xs" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-[10px] uppercase font-bold text-slate-400">Type</Label>
                  <Select>
                    <SelectTrigger className="col-span-3 bg-slate-900 border-slate-800 rounded-none text-xs">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 rounded-none">
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-[10px] uppercase font-bold text-slate-400">Category</Label>
                  <Select>
                    <SelectTrigger className="col-span-3 bg-slate-900 border-slate-800 rounded-none text-xs">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 rounded-none">
                      {TRANSACTION_CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-slate-900 rounded-none font-bold text-[10px] uppercase tracking-widest px-6 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                  COMMIT_CHANGES
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input 
            className="pl-10 bg-slate-900 border-slate-800 rounded-none text-xs focus:border-sky-500 transition-colors" 
            placeholder="FILTER_STREAM..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="gap-2 flex-1 md:flex-none border-slate-800 text-[10px] uppercase font-bold tracking-widest bg-transparent hover:bg-slate-800">
            <Filter className="w-3 h-3" />
            FILTERS
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[150px] bg-slate-900 border-slate-800 rounded-none text-[10px] uppercase font-bold tracking-widest h-8">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800 rounded-none">
              <SelectItem value="all">All Categories</SelectItem>
              {TRANSACTION_CATEGORIES.slice(0, 5).map(cat => (
                <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="stat-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="w-[120px] text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Timestamp</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Event_Descriptor</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Classification</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Source_Account</TableHead>
              <TableHead className="text-right text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Delta_Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { date: '2024.05.05', name: 'Starbucks Coffee', cat: 'F&D', acc: 'VISA_4242', amount: -5.45, type: 'expense' },
              { date: '2024.05.04', name: 'Stripe Payout', cat: 'REV', acc: 'MAIN_WALLET', amount: 3200.00, type: 'income' },
              { date: '2024.05.03', name: 'Amazon.com', cat: 'SHOP', acc: 'CRED_8821', amount: -124.99, type: 'expense' },
              { date: '2024.05.01', name: 'Monthly Rent', cat: 'HOUSE', acc: 'AUTO_BANK', amount: -1500.00, type: 'expense' },
              { date: '2024.04.30', name: 'Grocery Store', cat: 'F&D', acc: 'VISA_4242', amount: -65.20, type: 'expense' },
              { date: '2024.04.28', name: 'Netflix Subscription', cat: 'ENT', acc: 'CRED_8821', amount: -19.99, type: 'expense' },
            ].map((row, i) => (
              <TableRow key={i} className="group border-slate-800 hover:bg-slate-800/20 transition-all">
                <TableCell className="font-mono text-[10px] text-slate-500">{row.date}</TableCell>
                <TableCell>
                  <div className="text-xs font-bold tracking-tight text-slate-100">{row.name}</div>
                </TableCell>
                <TableCell>
                  <div className="text-[10px] font-bold tracking-widest text-slate-400 py-1 bg-slate-800/50 w-fit px-2 border border-slate-700/50 group-hover:border-sky-500/30 transition-colors">
                    {row.cat}
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 font-mono text-[9px]">{row.acc}</TableCell>
                <TableCell className={cn(
                  "text-right font-mono text-xs font-bold",
                  row.type === 'income' ? "text-emerald-400" : "text-rose-400"
                )}>
                  {row.type === 'income' ? '+' : '-'}${Math.abs(row.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-[10px] font-mono text-slate-500 uppercase">SYS_LOG_ENTRIES: 128_ENTRIES_SYNCED</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled className="h-8 border-slate-800 text-[10px] uppercase font-bold tracking-widest opacity-50">PREV</Button>
          <Button variant="outline" size="sm" className="h-8 border-slate-800 text-[10px] uppercase font-bold tracking-widest hover:bg-slate-800">NEXT</Button>
        </div>
      </div>
    </div>
  );
}
