import React from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import { useUser } from '../../lib/UserContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Globe, Shield, User, Bell, Layout, Target, Settings2, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

export function Settings() {
  const { language, setLanguage, currency, setCurrency, t, isRTL } = useLanguage();
  const { widgets, setWidgets, targets, setTargets, notifications, setNotifications, userName, setUserName, resetData } = useUser();

  const handleSave = () => {
    toast.success('System configuration updated successfully.');
  };

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-400 mb-1">
          {isRTL ? 'انتظام' : 'MANAGEMENT_HUB'}
        </h2>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black tracking-tighter">{t('settings.title')}</h1>
          <div className="h-1 w-10 bg-sky-500 hidden sm:block"></div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Profile */}
        <Card className="stat-card p-8 md:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <User className="w-5 h-5 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">{t('settings.profile')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Profile Name</Label>
                <Input 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-slate-900 border-slate-800 rounded-none text-xs text-slate-300 focus:border-sky-500"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Entry Identifier</Label>
                <div className="p-3 bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">USER_ID: #8329-XQ-2026</div>
              </div>
              <div className="grid gap-2">
                <Label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Primary Email</Label>
                <div className="p-3 bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">v-zuhair.qudoos@gmail.com</div>
              </div>
            </div>
            <div className="space-y-6">
               <div className="p-6 bg-sky-900/10 border border-sky-500/20 rounded-none relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 text-sky-500/5 group-hover:text-sky-500/10 transition-colors">
                   <Shield className="w-12 h-12" />
                 </div>
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-2 italic">Account Security</h4>
                 <p className="text-[11px] text-slate-400 leading-relaxed uppercase tracking-tight">Your account is secured with AES-256-GCM encryption. Last login detected from IP: 182.161.x.x</p>
               </div>
               <Button onClick={handleSave} className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-slate-900 rounded-none font-bold text-xs uppercase tracking-[0.3em] italic">
                 {t('common.save')}
               </Button>
            </div>
          </div>
        </Card>

        {/* Dashboard Customization */}
        <Card className="stat-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Layout className="w-5 h-5 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">DASHBOARD_PERSONALIZATION</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Performance Graph</span>
                <span className="text-[9px] text-slate-500">TOGGLE_VIZ: CAPITAL_PERF</span>
              </div>
              <Switch checked={widgets.performance} onCheckedChange={(val) => setWidgets({...widgets, performance: val})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Asset Allocation</span>
                <span className="text-[9px] text-slate-500">TOGGLE_VIZ: ASSET_PIE</span>
              </div>
              <Switch checked={widgets.allocation} onCheckedChange={(val) => setWidgets({...widgets, allocation: val})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Live Stream</span>
                <span className="text-[9px] text-slate-500">TOGGLE_VIZ: TX_FEED</span>
              </div>
              <Switch checked={widgets.stream} onCheckedChange={(val) => setWidgets({...widgets, stream: val})} />
            </div>
          </div>
        </Card>

        {/* Financial Targets */}
        <Card className="stat-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">FINANCIAL_TARGETS</h2>
          </div>
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Monthly Savings Goal</Label>
              <Input 
                type="number"
                value={targets.monthlySavingsGoal}
                onChange={(e) => setTargets({...targets, monthlySavingsGoal: Number(e.target.value)})}
                className="bg-slate-900 border-slate-800 rounded-none text-xs text-emerald-400 focus:border-sky-500"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Monthly Expense Cap</Label>
              <Input 
                type="number"
                value={targets.monthlyExpenseCap}
                onChange={(e) => setTargets({...targets, monthlyExpenseCap: Number(e.target.value)})}
                className="bg-slate-900 border-slate-800 rounded-none text-xs text-rose-400 focus:border-sky-500"
              />
            </div>
          </div>
        </Card>

        {/* Language Selection */}
        <Card className="stat-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">{t('settings.language')}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                "p-4 border transition-all text-center",
                language === 'en' 
                  ? "border-sky-500 bg-sky-500/10 text-sky-400" 
                  : "border-slate-800 text-slate-500 hover:border-slate-700"
              )}
            >
              <div className="text-lg font-black mb-1">ENGLISH</div>
              <div className="text-[10px] uppercase tracking-widest font-mono">LATIN_UTF8</div>
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={cn(
                "p-4 border transition-all text-center",
                language === 'ur' 
                  ? "border-sky-500 bg-sky-500/10 text-sky-400" 
                  : "border-slate-800 text-slate-500 hover:border-slate-700"
              )}
            >
              <div className="text-lg font-urdu font-bold mb-1">اردو</div>
              <div className="text-[10px] uppercase tracking-widest font-mono">ARABIC_URDU</div>
            </button>
          </div>
        </Card>

        {/* Currency Selection */}
        <Card className="stat-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">{t('settings.currency')}</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              onClick={() => setCurrency('USD')}
              className={cn(
                "p-4 border transition-all text-center",
                currency === 'USD' 
                  ? "border-sky-500 bg-sky-500/10 text-sky-400" 
                  : "border-slate-800 text-slate-500 hover:border-slate-700"
              )}
            >
              <div className="text-lg font-black mb-1">$</div>
              <div className="text-[10px] uppercase tracking-widest font-mono">USD</div>
            </button>
            <button
              onClick={() => setCurrency('PKR')}
              className={cn(
                "p-4 border transition-all text-center",
                currency === 'PKR' 
                  ? "border-sky-500 bg-sky-500/10 text-sky-400" 
                  : "border-slate-800 text-slate-500 hover:border-slate-700"
              )}
            >
              <div className="text-lg font-black mb-1">Rs</div>
              <div className="text-[10px] uppercase tracking-widest font-mono">PKR</div>
            </button>
            <button
              onClick={() => setCurrency('AED')}
              className={cn(
                "p-4 border transition-all text-center",
                currency === 'AED' 
                  ? "border-sky-500 bg-sky-500/10 text-sky-400" 
                  : "border-slate-800 text-slate-500 hover:border-slate-700"
              )}
            >
              <div className="text-lg font-black mb-1">Dh</div>
              <div className="text-[10px] uppercase tracking-widest font-mono">AED</div>
            </button>
            <button
              onClick={() => setCurrency('SAR')}
              className={cn(
                "p-4 border transition-all text-center",
                currency === 'SAR' 
                  ? "border-sky-500 bg-sky-500/10 text-sky-400" 
                  : "border-slate-800 text-slate-500 hover:border-slate-700"
              )}
            >
              <div className="text-lg font-black mb-1">SR</div>
              <div className="text-[10px] uppercase tracking-widest font-mono">SAR</div>
            </button>
          </div>
        </Card>

        {/* Notif Selection */}
        <Card className="stat-card p-8 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">NOTIFICATION_PREFERENCES</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="flex items-center justify-between border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-8">
              <div className="grid gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Budget Violations</span>
                <span className="text-[9px] text-slate-500 italic">ALERTS: REALTIME</span>
              </div>
              <Switch checked={notifications.budgetAlerts} onCheckedChange={(val) => setNotifications({...notifications, budgetAlerts: val})} />
            </div>
            <div className="flex items-center justify-between border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-8">
              <div className="grid gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Daily Summaries</span>
                <span className="text-[9px] text-slate-500 italic">REPORTS: 08:00 AM</span>
              </div>
              <Switch checked={notifications.dailyDigest} onCheckedChange={(val) => setNotifications({...notifications, dailyDigest: val})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Large Transactions</span>
                <span className="text-[9px] text-slate-500 italic">HYPER_SENSITIVE: ON</span>
              </div>
              <Switch checked={notifications.largeTxAlerts} onCheckedChange={(val) => setNotifications({...notifications, largeTxAlerts: val})} />
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="stat-card p-8 md:col-span-2 border-rose-500/20 bg-rose-500/[0.02]">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="w-5 h-5 text-rose-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-rose-500">DANGER_ZONE.CRITICAL</h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">Wipe System Logs & Preferences</p>
              <p className="text-[10px] text-slate-500 leading-relaxed max-w-xl uppercase tracking-tighter">Executing this command will permanently purge the transaction stream and revert all financial protocols to factory defaults. This action is irreversible.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                const confirmed = window.confirm("PURGE ALL DATA: Are you sure?");
                if (confirmed) {
                  resetData();
                  toast.error("System logs purged successfully.");
                }
              }}
              className="border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-none font-bold text-[10px] uppercase tracking-[0.2em] px-8 py-6 h-auto"
            >
              PURGE_ALL_DATABASES
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
