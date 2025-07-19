import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
  const [showFAB] = useState(false); // Hide the floating action button (chatbot)

  const navItems = [
    { label: 'Dashboard', icon: '🏠', path: '/' },
    { label: 'Meal Plan', icon: '🍽️', path: '/meal-plan' },
    { label: 'Recipes', icon: '📖', path: '/recipes' },
    { label: 'Progress', icon: '📊', path: '/progress' },
    { label: 'Profile', icon: '👤', path: '/profile' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className={isLoggedIn ? "pt-24 pb-20" : "pt-24"}>
        {children}
      </main>

      {/* Mobile Bottom Navigation - Only show when logged in */}
      <AnimatePresence>
        {isLoggedIn && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            {/* Glass morphism background */}
            <div className="glass-card mx-4 mb-4 rounded-2xl border border-white/20">
              <div className="flex items-center justify-around p-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 text-gray-600 hover:text-primary-600 hover:bg-white/50`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs font-medium">{item.label}</div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button - Only show when logged in */}
      <AnimatePresence>
        {showFAB && isLoggedIn && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <motion.button
              className="w-16 h-16 bg-gradient-primary rounded-full shadow-glow-lg flex items-center justify-center text-white text-2xl"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 30px rgba(76, 175, 80, 0.6)" 
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                // In a real app, this would open a quick action menu
                console.log('Quick action menu');
              }}
            >
              ➕
            </motion.button>
            
            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-primary rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Menu (Hidden by default) */}
      <AnimatePresence>
        {false && ( // Set to true to show quick actions
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-32 right-6 z-40"
          >
            <div className="space-y-3">
              {[
                { icon: '🍽️', label: 'Log Meal', action: () => console.log('Log meal') },
                { icon: '⚖️', label: 'Update Weight', action: () => console.log('Update weight') },
                { icon: '💧', label: 'Add Water', action: () => console.log('Add water') },
                { icon: '📝', label: 'Quick Note', action: () => console.log('Quick note') }
              ].map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/20"
                  onClick={action.action}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{action.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {false && ( // Set to true when scrolled down
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-24 left-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 flex items-center justify-center text-gray-600 hover:text-primary-600"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout; 