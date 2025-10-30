import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { BudgetData, ChartType } from '../types';
import { formatCurrency, getCurrencyByCode } from '../utils/currencyFormatter';

interface AnalyticsProps {
  budgetData: BudgetData;
  showAnalytics: boolean;
  setShowAnalytics: (show: boolean) => void;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B', '#EC4899', '#06B6D4', '#84CC16'];

export default function Analytics({ budgetData, showAnalytics, setShowAnalytics }: AnalyticsProps) {
  const [chartType, setChartType] = useState<ChartType>('pie');
  
  const currency = getCurrencyByCode(budgetData.currency);

  const categoryData = budgetData.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / Object.values(categoryData).reduce((sum, val) => sum + val, 0)) * 100).toFixed(1)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 rounded-lg border border-white/30 dark:border-gray-600/30 shadow-lg">
          <p className="font-medium text-gray-800 dark:text-gray-200">{label || data.payload.name}</p>
          <p className="text-blue-600 dark:text-blue-400">
            Amount: {formatCurrency(data.value, currency.code, currency.symbol)}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Percentage: {data.payload.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (budgetData.expenses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 text-center"
      >
        <TrendingUp className="mx-auto mb-4 text-gray-400" size={48} />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No Expenses Yet</h3>
        <p className="text-gray-600 dark:text-gray-400">Add some expenses to see analytics and insights.</p>
      </motion.div>
    );
  }

  return (
    <>
      {!showAnalytics ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAnalytics(true)}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <TrendingUp size={20} />
          <span>Show Analytics</span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Expense Analytics</h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChartType('pie')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  chartType === 'pie'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 dark:bg-gray-700/20 text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-gray-700/30'
                }`}
              >
                <PieChartIcon size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChartType('bar')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  chartType === 'bar'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 dark:bg-gray-700/20 text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-gray-700/30'
                }`}
              >
                <BarChartIcon size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAnalytics(false)}
                className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all duration-300"
              >
                Close
              </motion.button>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 mb-6">
            <AnimatePresence mode="wait">
              {chartType === 'pie' ? (
                <motion.div
                  key="pie"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              ) : (
                <motion.div
                  key="bar"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category List */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Category Breakdown</h3>
            {chartData.sort((a, b) => b.value - a.value).map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/10 dark:bg-gray-700/20 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800 dark:text-gray-200">
                    {formatCurrency(item.value, currency.code, currency.symbol)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.percentage}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}