/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Transaction, Budget, Goal, Investment, BillReminder } from '../types/finance';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const financeService = {
  // Transactions
  subscribeToTransactions: (callback: (transactions: Transaction[]) => void) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return () => {};

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      orderBy('date', 'desc'),
      limit(100)
    );

    return onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: (doc.data().date as Timestamp).toDate()
      })) as Transaction[];
      callback(transactions);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'transactions');
    });
  },

  addTransaction: async (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    try {
      await addDoc(collection(db, 'transactions'), {
        ...transaction,
        userId,
        date: Timestamp.fromDate(transaction.date)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'transactions');
    }
  },

  // Budgets
  subscribeToBudgets: (callback: (budgets: Budget[]) => void) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return () => {};

    const q = query(
      collection(db, 'budgets'),
      where('userId', '==', userId)
    );

    return onSnapshot(q, (snapshot) => {
      const budgets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Budget[];
      callback(budgets);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'budgets');
    });
  },

  updateBudget: async (budgetId: string, spent: number) => {
    try {
      await updateDoc(doc(db, 'budgets', budgetId), { spent });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `budgets/${budgetId}`);
    }
  },

  // Goals
  subscribeToGoals: (callback: (goals: Goal[]) => void) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return () => {};

    const q = query(
      collection(db, 'goals'),
      where('userId', '==', userId)
    );

    return onSnapshot(q, (snapshot) => {
      const goals = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        deadline: (doc.data().deadline as Timestamp).toDate()
      })) as Goal[];
      callback(goals);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'goals');
    });
  }
};
