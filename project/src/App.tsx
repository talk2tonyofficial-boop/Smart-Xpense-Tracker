import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseEntry from './components/ExpenseEntry';
import ExpenseList from './components/ExpenseList';
import Analytics from './components/Analytics';
import AdSpace from './components/AdSpace';
import ClearDataModal from './components/ClearDataModal';

import { useLocalStorage } from './hooks/useLocalStorage';
import { BudgetData } from './types';

const initialBudgetData: BudgetData = {
  monthlyBudget: 0,
  expenses: [],
  currency: 'USD',
  mode: 'Personal'
};

function App() {
  const [budgetData, setBudgetData] = useLocalStorage<BudgetData>('expense-tracker-data', initialBudgetData);
  const [darkMode, setDarkMode] = useLocalStorage('expense-tracker-theme', false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const clearAllData = () => {
    setBudgetData(initialBudgetData);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Dashboard */}
          <Dashboard budgetData={budgetData} setBudgetData={setBudgetData} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Expense Entry */}
            <ExpenseEntry budgetData={budgetData} setBudgetData={setBudgetData} />
            
            {/* Expense List */}
            <ExpenseList budgetData={budgetData} setBudgetData={setBudgetData} />
          </div>
          
          {/* Analytics */}
          <Analytics 
            budgetData={budgetData} 
            showAnalytics={showAnalytics} 
            setShowAnalytics={setShowAnalytics} 
          />
          
          {/* Clear Data Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowClearModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/20 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-500/30 dark:border-red-500/20 rounded-xl hover:bg-red-500/30 dark:hover:bg-red-900/30 transition-all duration-300"
            >
              <Trash2 size={20} />
              <span>Clear All Data</span>
            </motion.button>
          </motion.div>
          
          {/* Ad Space */}
          <AdSpace />
        </div>
      </main>
      
      {/* Clear Data Modal */}
      <ClearDataModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={clearAllData}
      />
    </div>
  );
}

export default App;