import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Wallet } from 'lucide-react';
import { BudgetData } from '../types';
import { formatCurrency, getCurrencyByCode } from '../utils/currencyFormatter';

interface DashboardProps {
  budgetData: BudgetData;
  setBudgetData: (data: BudgetData) => void;
}

export default function Dashboard({ budgetData, setBudgetData }: DashboardProps) {
  const totalExpenses = budgetData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budgetData.monthlyBudget - totalExpenses;
  const isOverBudget = remainingBudget < 0;
  const budgetPercentage = budgetData.monthlyBudget > 0 ? (totalExpenses / budgetData.monthlyBudget) * 100 : 0;

  const currency = getCurrencyByCode(budgetData.currency);

  const topCategory = budgetData.expenses.length > 0 
    ? budgetData.expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>)
    : {};

  const topSpendingCategory = Object.keys(topCategory).length > 0
    ? Object.entries(topCategory).sort(([, a], [, b]) => b - a)[0]
    : null;

  const handleBudgetChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const budget = parseFloat(formData.get('budget') as string) || 0;
    setBudgetData({ ...budgetData, monthlyBudget: budget });
  };

  return (
    <div className="space-y-6">
      {/* Budget Setting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Target className="text-blue-500" size={24} />
          Monthly Budget
        </h2>
        <form onSubmit={handleBudgetChange} className="flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
              {currency.symbol}
            </span>
            <input
              type="number"
              name="budget"
              step="0.01"
              min="0"
              placeholder="Enter monthly budget"
              defaultValue={budgetData.monthlyBudget || ''}
              className="w-full pl-8 pr-4 py-3 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Save
          </motion.button>
        </form>
      </motion.div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Budget</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {formatCurrency(budgetData.monthlyBudget, currency.code, currency.symbol)}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Wallet className="text-blue-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {formatCurrency(totalExpenses, currency.code, currency.symbol)}
              </p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-xl">
              <TrendingUp className="text-red-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Remaining</p>
              <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                {formatCurrency(Math.abs(remainingBudget), currency.code, currency.symbol)}
              </p>
            </div>
            <div className={`p-3 ${isOverBudget ? 'bg-red-500/20' : 'bg-green-500/20'} rounded-xl`}>
              {isOverBudget ? (
                <TrendingDown className="text-red-500" size={24} />
              ) : (
                <TrendingUp className="text-green-500" size={24} />
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Budget Used</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {budgetPercentage.toFixed(1)}%
              </p>
            </div>
            <div className={`p-3 ${budgetPercentage > 100 ? 'bg-red-500/20' : budgetPercentage > 80 ? 'bg-yellow-500/20' : 'bg-green-500/20'} rounded-xl`}>
              <Target className={`${budgetPercentage > 100 ? 'text-red-500' : budgetPercentage > 80 ? 'text-yellow-500' : 'text-green-500'}`} size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Budget Warning */}
      {isOverBudget && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 dark:bg-red-900/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/30 dark:border-red-500/20"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={24} />
            <div>
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400">⚠️ Over Budget!</h3>
              <p className="text-red-500 dark:text-red-300">
                You've exceeded your monthly budget by {formatCurrency(Math.abs(remainingBudget), currency.code, currency.symbol)}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Top Spending Category */}
      {topSpendingCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Top Spending Category</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">{topSpendingCategory[0]}</span>
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {formatCurrency(topSpendingCategory[1], currency.code, currency.symbol)}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}