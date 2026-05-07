/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: Date;
  currency: string;
  bankAccountId?: string;
}

export interface Budget {
  id: string;
  userId: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
  currency: string;
}

export interface Goal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  currency: string;
}

export interface Investment {
  id: string;
  userId: string;
  symbol: string;
  name: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  assetType: 'stock' | 'crypto' | 'bond' | 'real-estate';
  lastUpdated: Date;
}

export interface BillReminder {
  id: string;
  userId: string;
  title: string;
  amount: number;
  dueDate: Date;
  isPaid: boolean;
  frequency: 'once' | 'monthly' | 'yearly';
}

export interface UserPreferences {
  currency: string;
  isDarkMode: boolean;
  notificationsEnabled: boolean;
}
