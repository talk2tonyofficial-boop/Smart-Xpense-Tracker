import { motion } from 'framer-motion';
import { Moon, Sun, DollarSign } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-b border-white/20 dark:border-gray-700/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <DollarSign size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Smart Expense Tracker
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                Budget & Analytics
              </p>
            </div>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-3 rounded-xl bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-300"
          >
            <motion.div
              initial={false}
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}