import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.transactions': 'Transactions',
    'nav.investments': 'Investments',
    'nav.budgets': 'Budgets',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'header.status': 'SYS_STATUS',
    'header.encrypted': 'ENCRYPTED',
    'header.currency': 'CURRENCY',
    'dashboard.title': 'FINANCE.DASHBOARD',
    'dashboard.subtitle': 'System Overview',
    'dashboard.total_liquidity': 'Total Liquidity',
    'dashboard.inflow': 'Inflow / Monthly',
    'dashboard.outflow': 'Outflow / Monthly',
    'dashboard.goal_progress': 'Active Goal Progress',
    'dashboard.performance': 'Capital Performance',
    'dashboard.allocation': 'Asset Allocation',
    'dashboard.live_stream': 'Live Transaction Stream',
    'settings.title': 'SYSTEM_SETTINGS.CFG',
    'settings.language': 'Language Selection',
    'settings.theme': 'Visual Interface',
    'settings.profile': 'User Profile',
    'common.save': 'COMMIT_CHANGES',
    'common.export': 'EXPORT .CSV',
  },
  ur: {
    'nav.dashboard': 'ڈیش بورڈ',
    'nav.transactions': 'لین دین',
    'nav.investments': 'سرمایہ کاری',
    'nav.budgets': 'بجٹ',
    'nav.reports': 'رپورٹس',
    'nav.settings': 'ترتیبات',
    'header.status': 'سسٹم کی حیثیت',
    'header.encrypted': 'محفوظ',
    'header.currency': 'کرنسی',
    'dashboard.title': 'مالیاتی ڈیش بورڈ',
    'dashboard.subtitle': 'سسٹم کا جائزہ',
    'dashboard.total_liquidity': 'کل نقد رقم',
    'dashboard.inflow': 'ماہانہ آمدنی',
    'dashboard.outflow': 'ماہانہ اخراجات',
    'dashboard.goal_progress': 'ہدف کی پیشرفت',
    'dashboard.performance': 'سرمایے کی کارکردگی',
    'dashboard.allocation': 'اثاثوں کی تقسیم',
    'dashboard.live_stream': 'لین دین کی لائیو سٹریم',
    'settings.title': 'سسٹم کی ترتیبات',
    'settings.language': 'زبان کا انتخاب',
    'settings.theme': 'انٹرفیس کی ترتیب',
    'settings.profile': 'صارف کی پروفائل',
    'common.save': 'تبدیلیوں کی تصدیق',
    'common.export': 'ایکسپورٹ فائل',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ur';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-urdu' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
