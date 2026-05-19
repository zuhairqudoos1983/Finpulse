/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shell } from './components/layout/Shell';
import { Dashboard } from './components/dashboard/Dashboard';
import { Transactions } from './components/transactions/Transactions';
import { ResourceHub } from './components/resources/ResourceHub';
import { Budgeting } from './components/budget/Budgeting';
import { Investments } from './components/investments/Investments';
import { Goals } from './components/goals/Goals';
import { BillReminders } from './components/bills/BillReminders';
import { Settings } from './components/settings/Settings';
import { Toaster } from './components/ui/sonner';

import { LanguageProvider } from './lib/LanguageContext';
import { UserProvider } from './lib/UserContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'budget':
        return <Budgeting />;
      case 'goals':
        return <Goals />;
      case 'investments':
        return <Investments />;
      case 'reminders':
        return <BillReminders />;
      case 'resources':
        return <ResourceHub />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <h2 className="text-xl font-semibold mb-2">Section Coming Soon</h2>
            <p>We're still polishing the {activeTab.replace('-', ' ')} feature.</p>
          </div>
        );
    }
  };

  return (
    <LanguageProvider>
      <UserProvider>
        <Shell activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderContent()}
        </Shell>
        <Toaster position="top-right" richColors />
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
