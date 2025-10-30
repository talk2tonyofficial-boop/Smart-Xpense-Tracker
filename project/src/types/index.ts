export interface Expense {
  id: string;
  category: string;
  amount: number;
  timestamp: number;
}

export interface BudgetData {
  monthlyBudget: number;
  expenses: Expense[];
  currency: string;
  mode: ExpenseMode;
}

export type ExpenseMode = 'Personal' | 'Business' | 'Dropshipping' | 'Investment' | 'Travel';

export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export type ChartType = 'pie' | 'bar';