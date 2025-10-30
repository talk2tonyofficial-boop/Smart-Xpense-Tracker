import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar } from 'lucide-react';
import { BudgetData, Expense } from '../types';
import { formatCurrency, getCurrencyByCode } from '../utils/currencyFormatter';

interface ExpenseListProps {
  budgetData: BudgetData;
  setBudgetData: (data: BudgetData) => void;
}

export default function ExpenseList({ budgetData, setBudgetData }: ExpenseListProps) {
  const currency = getCurrencyByCode(budgetData.currency);

  const removeExpense = (id: string) => {
    setBudgetData({
      ...budgetData,
      expenses: budgetData.expenses.filter(expense => expense.id !== id)
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (budgetData.expenses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 text-center"
      >
        <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No Expenses Recorded</h3>
        <p className="text-gray-600 dark:text-gray-400">Your expense history will appear here once you add some expenses.</p>
      </motion.div>
    );
  }

  // Sort expenses by timestamp (newest first)
  const sortedExpenses = [...budgetData.expenses].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Recent Expenses</h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {sortedExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/20 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/30 transition-all duration-300"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{expense.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={14} />
                  <span>{formatDate(expense.timestamp)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-800 dark:text-gray-200">
                    {formatCurrency(expense.amount, currency.code, currency.symbol)}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeExpense(expense.id)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}