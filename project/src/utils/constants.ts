import { Currency, ExpenseMode } from '../types';

export const EXPENSE_MODES: ExpenseMode[] = [
  'Personal',
  'Business', 
  'Dropshipping',
  'Investment',
  'Travel'
];

export const PERSONAL_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Other'
];

export const BUSINESS_CATEGORIES = [
  'Office Supplies',
  'Marketing',
  'Software & Tools',
  'Travel & Meetings',
  'Equipment',
  'Legal & Professional',
  'Insurance',
  'Other'
];

export const DROPSHIPPING_CATEGORIES = [
  'Product Cost',
  'Advertising',
  'Shipping',
  'Platform Fees',
  'Tools & Software',
  'Returns & Refunds',
  'Packaging',
  'Other'
];

export const INVESTMENT_CATEGORIES = [
  'Stocks',
  'Bonds',
  'Real Estate',
  'Cryptocurrency',
  'Mutual Funds',
  'Commodities',
  'Education',
  'Other'
];

export const TRAVEL_CATEGORIES = [
  'Flights',
  'Accommodation',
  'Food & Dining',
  'Transportation',
  'Activities',
  'Shopping',
  'Insurance',
  'Other'
];

export const MODE_CATEGORIES: Record<ExpenseMode, string[]> = {
  Personal: PERSONAL_CATEGORIES,
  Business: BUSINESS_CATEGORIES,
  Dropshipping: DROPSHIPPING_CATEGORIES,
  Investment: INVESTMENT_CATEGORIES,
  Travel: TRAVEL_CATEGORIES
};

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' }
];