import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { BudgetData, ExpenseMode, Expense } from '../types';
import { MODE_CATEGORIES, CURRENCIES } from '../utils/constants';
import { getCurrencyByCode } from '../utils/currencyFormatter';

interface ExpenseEntryProps {
  budgetData: BudgetData;
  setBudgetData: (data: BudgetData) => void;
}

interface ExpenseEntry {
  id: string;
  category: string;
  amount: string;
  customCategory: string;
}

export default function ExpenseEntry({ budgetData, setBudgetData }: ExpenseEntryProps) {
  const [expenseEntries, setExpenseEntries] = useState<ExpenseEntry[]>([
    { id: '1', category: '', amount: '', customCategory: '' }
  ]);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const currency = getCurrencyByCode(budgetData.currency);
  const categories = MODE_CATEGORIES[budgetData.mode];

  const addExpenseEntry = () => {
    const newEntry: ExpenseEntry = {
      id: Date.now().toString(),
      category: '',
      amount: '',
      customCategory: ''
    };
    setExpenseEntries([...expenseEntries, newEntry]);
  };

  const removeExpenseEntry = (id: string) => {
    if (expenseEntries.length > 1) {
      setExpenseEntries(expenseEntries.filter(entry => entry.id !== id));
    }
  };

  const updateExpenseEntry = (id: string, field: keyof ExpenseEntry, value: string) => {
    setExpenseEntries(expenseEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleModeChange = (mode: ExpenseMode) => {
    setBudgetData({ ...budgetData, mode });
    // Reset entries when mode changes
    setExpenseEntries([{ id: '1', category: '', amount: '', customCategory: '' }]);
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setBudgetData({ ...budgetData, currency: currencyCode });
    setShowCurrencyDropdown(false);
  };

  const submitExpenses = () => {
    const validEntries = expenseEntries.filter(entry => {
      const category = entry.category === 'Other' ? entry.customCategory : entry.category;
      return category.trim() && entry.amount.trim() && parseFloat(entry.amount) > 0;
    });

    if (validEntries.length === 0) return;

    const newExpenses: Expense[] = validEntries.map(entry => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      category: entry.category === 'Other' ? entry.customCategory : entry.category,
      amount: parseFloat(entry.amount),
      timestamp: Date.now()
    }));

    setBudgetData({
      ...budgetData,
      expenses: [...budgetData.expenses, ...newExpenses]
    });

    // Reset entries after submission
    setExpenseEntries([{ id: '1', category: '', amount: '', customCategory: '' }]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Add Expenses</h2>
      
      {/* Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Expense Mode
        </label>
        <div className="flex flex-wrap gap-2">
          {['Personal', 'Business', 'Dropshipping', 'Investment', 'Travel'].map((mode) => (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeChange(mode as ExpenseMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                budgetData.mode === mode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/20 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30'
              }`}
            >
              {mode}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Currency Selection */}
      <div className="mb-6 relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Currency
        </label>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
          className="flex items-center gap-2 px-4 py-3 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-800/40 transition-all duration-300"
        >
          <span>{currency.symbol} {currency.code}</span>
          <ChevronDown size={16} className={`transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
        </motion.button>
        
        <AnimatePresence>
          {showCurrencyDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl border border-white/30 dark:border-gray-600/30 shadow-lg z-10 max-h-48 overflow-y-auto"
            >
              {CURRENCIES.map((curr) => (
                <motion.button
                  key={curr.code}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  onClick={() => handleCurrencyChange(curr.code)}
                  className="w-full px-4 py-3 text-left text-gray-800 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-700/20 transition-colors first:rounded-t-xl last:rounded-b-xl"
                >
                  <span className="font-medium">{curr.symbol} {curr.code}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{curr.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expense Entries */}
      <div className="space-y-4">
        <AnimatePresence>
          {expenseEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 p-4 bg-white/10 dark:bg-gray-700/20 rounded-xl border border-white/20 dark:border-gray-600/20"
            >
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={entry.category}
                  onChange={(e) => updateExpenseEntry(entry.id, 'category', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Custom Category Input (when "Other" is selected) */}
              <AnimatePresence>
                {entry.category === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Category
                    </label>
                    <input
                      type="text"
                      value={entry.customCategory}
                      onChange={(e) => updateExpenseEntry(entry.id, 'customCategory', e.target.value)}
                      placeholder="Enter custom category name"
                      className="w-full px-4 py-3 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Amount Input (appears when category is selected) */}
              <AnimatePresence>
                {entry.category && (entry.category !== 'Other' || entry.customCategory.trim()) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Enter amount spent in this category
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={entry.amount}
                        onChange={(e) => updateExpenseEntry(entry.id, 'amount', e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Remove Button */}
              {expenseEntries.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeExpenseEntry(entry.id)}
                  className="flex items-center gap-2 px-3 py-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                >
                  <Trash2 size={16} />
                  <span className="text-sm">Remove</span>
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addExpenseEntry}
          className="flex items-center gap-2 px-4 py-3 bg-white/20 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={submitExpenses}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          Add Expenses
        </motion.button>
      </div>
    </motion.div>
  );
}