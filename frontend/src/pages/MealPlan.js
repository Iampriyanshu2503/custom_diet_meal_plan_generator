import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mealAPI } from '../services/api';

const MealPlan = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [swappingMeal, setSwappingMeal] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tabLabels = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];

  useEffect(() => {
    const fetchMealPlan = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await mealAPI.getMealPlan();
        // Assume backend returns { meals: [...] } or similar structure
        // Transform as needed for UI
        if (data.meals) {
          // Group meals by type for tabs
          const grouped = { breakfast: [], lunch: [], dinner: [], snacks: [] };
          data.meals.forEach(meal => {
            if (grouped[meal.name.toLowerCase()]) {
              grouped[meal.name.toLowerCase()].push(meal);
            }
          });
          setMealData(grouped);
        } else {
          setMealData(null);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch meal plan');
      } finally {
        setLoading(false);
      }
    };
    fetchMealPlan();
  }, []);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  const handleSwapMeal = (mealId) => {
    setSwappingMeal(mealId);
    // Simulate API call for meal replacement
    setTimeout(() => {
      setSwappingMeal(null);
    }, 2000);
  };

  const calculateMacroPercentage = (macro, total) => {
    return Math.round((macro / total) * 100);
  };

  const renderMealCard = (meal) => {
    const totalCalories = meal.carbs * 4 + meal.protein * 4 + meal.fat * 9;
    
    return (
      <motion.div
        key={meal.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="card-glass p-6 h-full"
      >
        {/* Meal Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{meal.image}</div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">{meal.calories}</div>
            <div className="text-sm text-gray-500">calories</div>
          </div>
        </div>

        {/* Meal Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{meal.name}</h3>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span>🕐 {meal.time}</span>
            <span>⏱️ {meal.prepTime}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              meal.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              meal.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {meal.difficulty}
            </span>
          </div>
        </div>

        {/* Macro Progress Bars */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-green-600 font-medium">Carbs {meal.carbs}g</span>
              <span className="text-gray-600">{calculateMacroPercentage(meal.carbs * 4, totalCalories)}%</span>
            </div>
            <div className="progress-primary h-2">
              <motion.div
                className="progress-primary-bar"
                initial={{ width: 0 }}
                animate={{ width: `${calculateMacroPercentage(meal.carbs * 4, totalCalories)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-600 font-medium">Protein {meal.protein}g</span>
              <span className="text-gray-600">{calculateMacroPercentage(meal.protein * 4, totalCalories)}%</span>
            </div>
            <div className="progress-secondary h-2">
              <motion.div
                className="progress-secondary-bar"
                initial={{ width: 0 }}
                animate={{ width: `${calculateMacroPercentage(meal.protein * 4, totalCalories)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-orange-600 font-medium">Fat {meal.fat}g</span>
              <span className="text-gray-600">{calculateMacroPercentage(meal.fat * 9, totalCalories)}%</span>
            </div>
            <div className="progress-accent h-2">
              <motion.div
                className="progress-accent-bar"
                initial={{ width: 0 }}
                animate={{ width: `${calculateMacroPercentage(meal.fat * 9, totalCalories)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Ingredients:</h4>
          <div className="flex flex-wrap gap-1">
            {meal.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/50 rounded-full text-xs text-gray-600 border border-gray-200"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => setSelectedMeal(meal)}
            className="flex-1 btn-outline py-2 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details 👁️
          </motion.button>
          <motion.button
            onClick={() => handleSwapMeal(meal.id)}
            disabled={swappingMeal === meal.id}
            className="flex-1 btn-secondary py-2 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {swappingMeal === meal.id ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner w-4 h-4 mr-2"></div>
                Finding...
              </div>
            ) : (
              'Swap 🔄'
            )}
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 bg-pattern-waves">
      <div className="container-responsive py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gradient-primary mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Your Meal Plan 🍽️
            </motion.h1>
            <p className="text-xl text-gray-600">Personalized nutrition plan for today</p>
          </div>

          {/* Tabs */}
          <div className="card-glass p-2 rounded-2xl">
            <div className="flex bg-white/50 rounded-xl p-1">
              {tabLabels.map((label, index) => (
                <motion.button
                  key={label}
                  onClick={() => handleTabChange(index)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Meal Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {loading && <div className="text-center py-8">Loading meal plan...</div>}
              {error && <div className="text-center text-red-500 py-8">{error}</div>}
              {!loading && !error && mealData && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mealData[mealTypes[activeTab]] && mealData[mealTypes[activeTab]].map((meal) => (
                    <div key={meal.id}>
                      {renderMealCard(meal)}
                    </div>
                  ))}
                </div>
              )}
              {!loading && !error && !mealData && (
                <div className="text-center py-8">No meal plan available.</div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-gradient p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-gradient-primary mb-6 text-center">📊 Daily Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Calories', value: '1,850', icon: '🔥', color: 'primary' },
                { label: 'Carbs', value: '45%', icon: '🌾', color: 'secondary' },
                { label: 'Protein', value: '30%', icon: '🥩', color: 'accent' },
                { label: 'Fat', value: '25%', icon: '🥑', color: 'success' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`text-4xl mb-2 text-${stat.color}-500`}>{stat.icon}</div>
                  <div className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Meal Detail Modal */}
          <AnimatePresence>
            {selectedMeal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedMeal(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="card-glass p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gradient-primary">{selectedMeal.name}</h2>
                    <button
                      onClick={() => setSelectedMeal(null)}
                      className="text-2xl text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-6xl mb-4">{selectedMeal.image}</div>
                      <div className="space-y-2 text-gray-600">
                        <p>🕐 Time: {selectedMeal.time}</p>
                        <p>⏱️ Prep: {selectedMeal.prepTime}</p>
                        <p>🔥 Calories: {selectedMeal.calories}</p>
                        <p>📊 Difficulty: {selectedMeal.difficulty}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Ingredients:</h3>
                      <ul className="space-y-1">
                        {selectedMeal.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-gray-600">• {ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <motion.button
                      className="btn-primary flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add to Favorites ❤️
                    </motion.button>
                    <motion.button
                      className="btn-outline flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Recipe 📖
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MealPlan; 