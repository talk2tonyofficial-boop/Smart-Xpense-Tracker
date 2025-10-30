import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ClearDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClearDataModal({ isOpen, onClose, onConfirm }: ClearDataModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 border border-white/30 dark:border-gray-600/30 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-xl">
                  <AlertTriangle className="text-red-500" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Clear All Data</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Are you sure you want to clear all your data? This action will permanently delete:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>• All expense records</li>
                <li>• Budget settings</li>
                <li>• Currency preferences</li>
                <li>• Expense mode settings</li>
              </ul>
              <p className="text-red-600 dark:text-red-400 text-sm mt-3 font-medium">
                This action cannot be undone!
              </p>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Clear All Data
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}