import React, { createContext, useContext, useState, useEffect } from 'react';

interface DashboardWidgets {
  performance: boolean;
  allocation: boolean;
  stream: boolean;
}

interface FinancialTargets {
  monthlySavingsGoal: number;
  monthlyExpenseCap: number;
}

interface NotificationPrefs {
  budgetAlerts: boolean;
  dailyDigest: boolean;
  largeTxAlerts: boolean;
}

interface Transaction {
  date: string;
  name: string;
  cat: string;
  acc: string;
  amount: number;
  type: string;
}

interface UserContextType {
  widgets: DashboardWidgets;
  setWidgets: (widgets: DashboardWidgets) => void;
  targets: FinancialTargets;
  setTargets: (targets: FinancialTargets) => void;
  notifications: NotificationPrefs;
  setNotifications: (notifications: NotificationPrefs) => void;
  userName: string;
  setUserName: (name: string) => void;
  transactions: Transaction[];
  setTransactions: (txs: Transaction[]) => void;
  resetData: () => void;
}

const DEFAULT_TRANSACTIONS: Transaction[] = [
  { date: '2024.05.05', name: 'Starbucks Coffee', cat: 'F&D', acc: 'VISA_4242', amount: -5.45, type: 'expense' },
  { date: '2024.05.04', name: 'Stripe Payout', cat: 'REV', acc: 'MAIN_WALLET', amount: 3200.00, type: 'income' },
  { date: '2024.05.03', name: 'Amazon.com', cat: 'SHOP', acc: 'CRED_8821', amount: -124.99, type: 'expense' },
  { date: '2024.05.01', name: 'Monthly Rent', cat: 'HOUSE', acc: 'AUTO_BANK', amount: -1500.00, type: 'expense' },
  { date: '2024.04.30', name: 'Grocery Store', cat: 'F&D', acc: 'VISA_4242', amount: -65.20, type: 'expense' },
  { date: '2024.04.28', name: 'Netflix Subscription', cat: 'ENT', acc: 'CRED_8821', amount: -19.99, type: 'expense' },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [widgets, setWidgets] = useState<DashboardWidgets>({
    performance: true,
    allocation: true,
    stream: true,
  });

  const [targets, setTargets] = useState<FinancialTargets>({
    monthlySavingsGoal: 2000,
    monthlyExpenseCap: 3500,
  });

  const [notifications, setNotifications] = useState<NotificationPrefs>({
    budgetAlerts: true,
    dailyDigest: false,
    largeTxAlerts: true,
  });

  const [userName, setUserName] = useState('Zuhair Qudoos');
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS);

  const resetData = () => {
    setTransactions([]);
    setTargets({
      monthlySavingsGoal: 2000,
      monthlyExpenseCap: 3500,
    });
    setWidgets({
      performance: true,
      allocation: true,
      stream: true,
    });
  };

  return (
    <UserContext.Provider value={{
      widgets, setWidgets,
      targets, setTargets,
      notifications, setNotifications,
      userName, setUserName,
      transactions, setTransactions,
      resetData
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
