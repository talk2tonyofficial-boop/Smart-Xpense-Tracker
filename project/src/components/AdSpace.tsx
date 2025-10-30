import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function AdSpace() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.7; // Show after scrolling 70% of viewport height
      
      if (scrolled > threshold) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 text-center"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4"
      >
        <Zap className="text-white" size={32} />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        Ad Space — Coming Soon
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        This space will feature premium financial tools and services to enhance your budgeting experience.
      </p>
      
      <motion.div
        animate={{ 
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-gray-800/20 rounded-lg"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-gray-600 dark:text-gray-400">Advertisements loading...</span>
      </motion.div>
    </motion.div>
  );
}