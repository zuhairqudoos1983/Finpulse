/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Target, 
  TrendingUp, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X,
  Wallet,
  BookOpen
} from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { cn } from '../../lib/utils';

interface ShellProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: Receipt },
  { id: 'budget', label: 'Budgeting', icon: PieChart },
  { id: 'goals', label: 'Savings Goals', icon: Target },
  { id: 'investments', label: 'Investments', icon: TrendingUp },
  { id: 'reminders', label: 'Bill Reminders', icon: Bell },
  { id: 'resources', label: 'Literacy Hub', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
];

import { useLanguage } from '../../lib/LanguageContext';

export function Shell({ children, activeTab, setActiveTab }: ShellProps) {
  const { t, isRTL } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'transactions', label: t('nav.transactions'), icon: Receipt },
    { id: 'budget', label: t('nav.budgets'), icon: PieChart },
    { id: 'goals', label: t('nav.goals'), icon: Target },
    { id: 'investments', label: t('nav.investments'), icon: TrendingUp },
    { id: 'reminders', label: t('nav.reminders'), icon: Bell },
    { id: 'resources', label: t('nav.resources'), icon: BookOpen },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const SidebarContent = () => (
    <div className={cn(
      "flex flex-col h-full bg-[#0F172A] border-slate-800 text-slate-50 p-6",
      isRTL ? "border-l" : "border-r"
    )}>
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-sky-500 rounded-sm flex items-center justify-center font-bold text-slate-900">F</div>
        <span className="text-xl font-bold tracking-tight uppercase">FinPulse</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 transition-all text-sm font-semibold uppercase tracking-wider",
              isRTL ? "text-right" : "text-left",
              activeTab === item.id 
                ? "nav-active" 
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span className={isRTL ? "font-urdu" : ""}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 bg-sky-900/20 border border-sky-500/30 rounded-sm mt-6">
        <p className="text-[10px] uppercase tracking-widest text-sky-400 font-bold mb-1">
          {isRTL ? 'مالیاتی حیثیت' : 'Financial Status'}
        </p>
        <p className="text-xs leading-relaxed text-slate-300">
          {isRTL ? 'آپ کا پورٹ فولیو مارکیٹ اوسط سے 4.2% بہتر کارکردگی دکھا رہا ہے۔' : 'Your portfolio is performing 4.2% above market average.'}
        </p>
      </div>

      <div className="pt-4 mt-6 border-t border-slate-800">
        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-3">
          <LogOut className="w-4 h-4" />
          <span className={isRTL ? "font-urdu" : ""}>{isRTL ? 'لاگ آؤٹ' : 'Logout'}</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className={cn(
      "flex h-screen bg-[#0F172A] text-slate-50 overflow-hidden font-sans select-none",
      isRTL ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 flex flex-col z-10">
          <SidebarContent />
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative grid-bg overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#0F172A]/80 backdrop-blur-sm z-10 shadow-2xl">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Sheet>
                <SheetTrigger render={<Button variant="ghost" size="icon" />}>
                    <Menu className="w-6 h-6 text-slate-400" />
                </SheetTrigger>
                <SheetContent side={isRTL ? "right" : "left"} className="p-0 w-64 border-none bg-[#0F172A]">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            )}
            <div className="hidden sm:flex items-center gap-6">
              <div className="text-[10px] text-slate-400 font-mono tracking-wider">
                {t('header.status')}: <span className="text-emerald-400">{t('header.encrypted')}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider">
                {t('header.currency')}: <span className="text-white">USD ($)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="h-8 border-slate-700 text-[10px] uppercase font-bold tracking-widest bg-transparent hover:bg-slate-800 text-slate-300">
              {t('common.export')}
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                <Bell className="w-4 h-4" />
              </Button>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sky-500 rounded-full" />
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold ring-2 ring-slate-800">
              ZQ
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
