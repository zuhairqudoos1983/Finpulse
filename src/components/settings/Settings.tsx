import React from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Globe, Shield, User, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Settings() {
  const { language, setLanguage, t, isRTL } = useLanguage();

  return (
    <div className="space-y-10">
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

        {/* Security / Profile Mock */}
        <Card className="stat-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">Security Protocols</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">2FA Status</span>
              <span className="text-[10px] font-mono text-emerald-400">ENABLED</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Encryption Level</span>
              <span className="text-[10px] font-mono text-sky-400">AES_256_GCM</span>
            </div>
            <Button variant="outline" className="w-full border-slate-700 text-[10px] uppercase font-bold tracking-[0.2em] h-10">
              Rotate Access Keys
            </Button>
          </div>
        </Card>

        {/* User Profile */}
        <Card className="stat-card p-8 md:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <User className="w-5 h-5 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">{t('settings.profile')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Entry Identifier</Label>
                <div className="p-3 bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">USER_ID: #8329-XQ-2026</div>
              </div>
              <div className="grid gap-2">
                <Label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Primary Email</Label>
                <div className="p-3 bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">zuhair.qudoos@gmail.com</div>
              </div>
            </div>
            <div className="space-y-4">
               <div className="p-6 bg-sky-900/10 border border-sky-500/20 rounded-none relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 text-sky-500/5 group-hover:text-sky-500/10 transition-colors">
                   <Bell className="w-12 h-12" />
                 </div>
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-2 italic">Notification Log</h4>
                 <p className="text-[11px] text-slate-400 leading-relaxed uppercase tracking-tight">System will dispatch alerts for high-value transactions and budget violations automatically based on current heuristics.</p>
               </div>
               <Button className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-slate-900 rounded-none font-bold text-xs uppercase tracking-[0.3em] italic">
                 {t('common.save')}
               </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
