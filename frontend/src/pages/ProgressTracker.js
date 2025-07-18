import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mealAPI, waterAPI, progressAPI, userAPI } from '../services/api';
import { useEffect } from 'react';
import api from '../services/api';

// Sample data - in a real app, this would come from the backend
const weightData = [
  { date: '2024-01-01', weight: 75.2 },
  { date: '2024-01-08', weight: 74.8 },
  { date: '2024-01-15', weight: 74.1 },
  { date: '2024-01-22', weight: 73.5 },
  { date: '2024-01-29', weight: 72.9 },
  { date: '2024-02-05', weight: 72.3 },
  { date: '2024-02-12', weight: 71.8 },
];

const calorieData = [
  { date: '2024-01-01', calories: 1850 },
  { date: '2024-01-08', calories: 1820 },
  { date: '2024-01-15', calories: 1780 },
  { date: '2024-01-22', calories: 1750 },
  { date: '2024-01-29', calories: 1720 },
  { date: '2024-02-05', calories: 1700 },
  { date: '2024-02-12', calories: 1680 },
];

const ProgressTracker = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterGoal] = useState(8);
  const [openLogMeal, setOpenLogMeal] = useState(false);
  const [openUpdateWeight, setOpenUpdateWeight] = useState(false);
  const [logMealData, setLogMealData] = useState({
    meal: '',
    calories: '',
    time: '',
  });
  const [newWeight, setNewWeight] = useState('');
  const [mealLoading, setMealLoading] = useState(false);
  const [mealError, setMealError] = useState('');
  const [mealSuccess, setMealSuccess] = useState(false);
  const [waterLoading, setWaterLoading] = useState(false);
  const [waterError, setWaterError] = useState('');
  const [waterSuccess, setWaterSuccess] = useState(false);
  const [weightHistory, setWeightHistory] = useState([]);
  const [calorieHistory, setCalorieHistory] = useState([]);
  const [waterHistory, setWaterHistory] = useState([]); // used for real data
  const [mealLogError, setMealLogError] = useState('');
  const [loading, setLoading] = useState(true);
  const [progressError, setProgressError] = useState('');
  const [goalType, setGoalType] = useState(() => localStorage.getItem('goalType') || ''); // persist goal
  const [showGoalPrompt, setShowGoalPrompt] = useState(!goalType);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [aiMealPlan, setAiMealPlan] = useState(null);
  const cuisines = ['Indian', 'Italian', 'Chinese', 'Mexican', 'Mediterranean', 'American', 'Thai', 'Japanese'];
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      setProgressError('');
      try {
        const [weightRes, calorieRes, waterRes, profileRes] = await Promise.all([
          progressAPI.getWeightHistory(),
          progressAPI.getCalorieHistory(),
          progressAPI.getWaterHistory(),
          userAPI.getProfile()
        ]);
        setWeightHistory(weightRes.weightHistory || []);
        setCalorieHistory(calorieRes.calorieHistory || []);
        setWaterHistory(waterRes.waterHistory || []);
        setDailyCalorieGoal(profileRes.user?.dailyCalorieGoal || null);
      } catch (err) {
        setProgressError(err.message || 'Failed to fetch progress data');
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const handleWaterToggle = async () => {
    if (waterIntake < waterGoal) {
      setWaterLoading(true);
      setWaterError('');
      setWaterSuccess(false);
      try {
        await waterAPI.logWater(waterIntake + 1);
        setWaterIntake(prev => prev + 1);
        setWaterSuccess(true);
      } catch (err) {
        setWaterError(err.message || 'Failed to log water intake');
      } finally {
        setWaterLoading(false);
      }
    }
  };

  // Fix meal logging validation
  const handleLogMeal = async () => {
    setMealLogError('');
    if (!logMealData.meal || !logMealData.calories || !logMealData.time) {
      setMealLogError('Please provide meal name, calories, and meal type');
      return;
    }
    setMealLoading(true);
    setMealError('');
    setMealSuccess(false);
    try {
      await mealAPI.logMeal(logMealData);
      setMealSuccess(true);
      setOpenLogMeal(false);
      setLogMealData({ meal: '', calories: '', time: '' });
      setMealLogError('');
    } catch (err) {
      setMealError(err.message || 'Failed to log meal');
    } finally {
      setMealLoading(false);
    }
  };

  // Handle goal selection
  const handleGoalSelect = (goal) => {
    setGoalType(goal);
    setShowGoalPrompt(false);
    localStorage.setItem('goalType', goal);
  };

  // AI meal generation (placeholder)
  const handleGenerateAIMeal = () => {
    if (!selectedCuisine) return;
    setAiMealPlan({
      cuisine: selectedCuisine,
      meals: [
        { name: `${selectedCuisine} Breakfast Bowl`, time: 'Breakfast' },
        { name: `${selectedCuisine} Power Lunch`, time: 'Lunch' },
        { name: `${selectedCuisine} Snack Delight`, time: 'Snack' },
        { name: `${selectedCuisine} Healthy Dinner`, time: 'Dinner' }
      ]
    });
  };

  const handleUpdateWeight = async () => {
    if (!newWeight) return;
    try {
      await api.weight.logWeight(newWeight);
      // Refetch weight history
      const weightRes = await api.progress.getWeightHistory();
      setWeightHistory(weightRes.weightHistory || []);
      setOpenUpdateWeight(false);
      setNewWeight('');
    } catch (err) {
      alert('Failed to update weight.');
    }
  };

  const renderSimpleChart = (data, title, color, unit) => {
    const maxValue = Math.max(...data.map(d => d[unit]));
    const minValue = Math.min(...data.map(d => d[unit]));
    const range = maxValue - minValue;

    return (
      <div className="card-glass p-6 h-full">
        <h3 className={`text-xl font-semibold text-${color}-600 mb-4`}>{title}</h3>
        
        {/* Simple line chart visualization */}
        <div className="relative h-48 mb-4">
          <svg width="100%" height="100%" className="absolute inset-0">
            <polyline
              fill="none"
              stroke={`var(--tw-gradient-to-${color}-500)`}
              strokeWidth="3"
              points={data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((point[unit] - minValue) / range) * 80;
                return `${x}%,${y}%`;
              }).join(' ')}
            />
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((point[unit] - minValue) / range) * 80;
              return (
                <motion.circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill={`var(--tw-gradient-to-${color}-500)`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              );
            })}
          </svg>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>{maxValue}</span>
            <span>{minValue}</span>
          </div>
        </div>

        {/* Current value */}
        <div className="text-center">
          <div className={`text-3xl font-bold text-${color}-600`}>
            {data[data.length - 1][unit]}
            <span className="text-sm text-gray-500 ml-1">
              {unit === 'weight' ? ' kg' : ' cal'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // --- Dynamic Weekly Summary ---
  // Weight Lost/Gained
  let weightChange = 0;
  if (weightHistory.length > 1) {
    weightChange = parseFloat((weightHistory[weightHistory.length - 1].weight - weightHistory[0].weight).toFixed(1));
  }
  // Average Daily Calories
  const avgCalories = calorieHistory.length > 0 ? Math.round(calorieHistory.reduce((sum, d) => sum + (d.calories || 0), 0) / calorieHistory.length) : 0;
  // Days Tracked
  const daysTracked = weightHistory.length;
  // Goal Achievement (simple: % of days tracked out of 7)
  const goalAchievement = Math.round((daysTracked / 7) * 100);
  // Weight label
  const weightLabel = goalType === 'gain' ? 'Weight Gained' : 'Weight Lost';
  const weightValue = goalType === 'gain' ? (weightChange > 0 ? `+${weightChange} kg` : `${weightChange} kg`) : (weightChange < 0 ? `${weightChange} kg` : `+${weightChange} kg`);
  // --- End Dynamic Summary ---

  // Debug: Log modal state on every render
  console.log('Render: openLogMeal', openLogMeal, 'openUpdateWeight', openUpdateWeight);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 bg-pattern-dots">
      {/* Goal Type Selection (one-time) */}
      {showGoalPrompt && (
        <div className="max-w-xl mx-auto bg-white/80 rounded-xl shadow-lg p-6 mt-8 mb-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-gradient-primary">What is your current goal?</h2>
          <div className="flex gap-6">
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${goalType === 'lose' ? 'bg-primary-500 text-white shadow-glow' : 'bg-gray-100 text-gray-700 hover:bg-primary-100'}`}
              onClick={() => handleGoalSelect('lose')}
            >
              Lose Weight
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${goalType === 'gain' ? 'bg-secondary-500 text-white shadow-glow' : 'bg-gray-100 text-gray-700 hover:bg-secondary-100'}`}
              onClick={() => handleGoalSelect('gain')}
            >
              Gain Weight
            </button>
          </div>
        </div>
      )}
      {loading && <div className="text-center py-8">Loading progress data...</div>}
      {progressError && <div className="text-center text-red-500 py-8">{progressError}</div>}
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
              Progress Tracker 📊
            </motion.h1>
            <p className="text-xl text-gray-600">Monitor your health journey with detailed insights</p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              onClick={() => {
                setOpenLogMeal(true);
                console.log('Clicked Log a Meal, openLogMeal should be true');
              }}
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              disabled={mealLoading}
            >
              Log a Meal 🍽️
            </motion.button>
            <motion.button
              onClick={() => {
                setOpenUpdateWeight(true);
                console.log('Clicked Update Weight, openUpdateWeight should be true');
              }}
              className="btn-outline text-lg px-8 py-4"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Weight ⚖️
            </motion.button>
          </motion.div>
          {/* Meal/Water Feedback */}
          {mealError && <div className="text-center text-red-500 mt-2">{mealError}</div>}
          {mealSuccess && <div className="text-center text-green-600 mt-2">Meal logged successfully!</div>}
          {waterError && <div className="text-center text-red-500 mt-2">{waterError}</div>}
          {waterSuccess && <div className="text-center text-green-600 mt-2">Water intake logged!</div>}

          {/* Charts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Weight Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {renderSimpleChart(weightHistory.length ? weightHistory : [{ date: '', weight: 0 }], 'Weight Progress', 'primary', 'weight')}
            </motion.div>

            {/* Calorie Intake */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="relative">
                {renderSimpleChart(calorieHistory.length ? calorieHistory : [{ date: '', calories: 0 }], 'Calorie Intake', 'secondary', 'calories')}
                {dailyCalorieGoal && (
                  <div className="absolute top-2 right-4 text-xs text-secondary-700 bg-secondary-100 px-2 py-1 rounded shadow">
                    Target: {dailyCalorieGoal} cal
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Water Intake Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card-glass p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-gradient-secondary mb-6 text-center">💧 Water Intake Tracker</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
              {/* Water Bottle Animation */}
              <div className="relative">
                <div className="w-20 h-32 border-4 border-secondary-300 rounded-full relative overflow-hidden bg-gradient-to-b from-secondary-50 to-secondary-100">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary-500 to-secondary-400 rounded-b-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${(waterIntake / waterGoal) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="text-center mt-2">
                  <div className="text-2xl font-bold text-secondary-600">{waterIntake}/{waterGoal}</div>
                  <div className="text-sm text-gray-600">glasses</div>
                </div>
              </div>

              {/* Progress Info */}
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary-600 mb-2">
                  {Math.round((waterIntake / waterGoal) * 100)}%
                </div>
                <div className="text-gray-600 mb-4">Daily Goal Progress</div>
                <div className="progress-secondary h-3 w-48">
                  <motion.div
                    className="progress-secondary-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${(waterIntake / waterGoal) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Add Water Button */}
            <div className="text-center">
              <motion.button
                onClick={handleWaterToggle}
                disabled={waterLoading || waterIntake >= waterGoal}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  waterLoading || waterIntake >= waterGoal
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'btn-secondary hover-lift'
                }`}
                whileHover={waterIntake < waterGoal ? { scale: 1.05 } : {}}
                whileTap={waterIntake < waterGoal ? { scale: 0.95 } : {}}
              >
                {waterLoading ? 'Logging...' : waterIntake >= waterGoal ? 'Goal Reached! 🎉' : 'Add Glass of Water 💧'}
              </motion.button>
            </div>
          </motion.div>

          {/* Weekly Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="card-gradient p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-gradient-primary mb-6 text-center">📈 Weekly Summary</h3>
            {goalType && (
              <div className="mb-4 text-center text-lg font-semibold text-primary-700">
                Goal: {goalType === 'gain' ? 'Gain Weight' : 'Lose Weight'}
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-4xl mb-2 text-success-500">⚖️</div>
                <div className="text-2xl font-bold text-success-600 mb-1">{weightValue}</div>
                <div className="text-sm text-gray-600">{weightLabel}</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl mb-2 text-accent-500">🔥</div>
                <div className="text-2xl font-bold text-accent-600 mb-1">{avgCalories} cal</div>
                <div className="text-sm text-gray-600">Avg Daily Calories</div>
                {dailyCalorieGoal && (
                  <div className="text-xs text-secondary-700 mt-1">Target: {dailyCalorieGoal} cal</div>
                )}
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl mb-2 text-primary-500">📅</div>
                <div className="text-2xl font-bold text-primary-600 mb-1">{daysTracked}/7</div>
                <div className="text-sm text-gray-600">Days Tracked</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl mb-2 text-secondary-500">🎯</div>
                <div className="text-2xl font-bold text-secondary-600 mb-1">{goalAchievement}%</div>
                <div className="text-sm text-gray-600">Goal Achievement</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Log Meal Dialog */}
          <AnimatePresence>
            {openLogMeal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setOpenLogMeal(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="card-glass p-8 rounded-3xl max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-bold text-gradient-primary mb-6">Log a Meal 🍽️</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Meal Name</label>
                      <input
                        type="text"
                        value={logMealData.meal}
                        onChange={(e) => setLogMealData(prev => ({ ...prev, meal: e.target.value }))}
                        className="input-modern focus-ring"
                        placeholder="Enter meal name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Calories</label>
                      <input
                        type="number"
                        value={logMealData.calories}
                        onChange={(e) => setLogMealData(prev => ({ ...prev, calories: e.target.value }))}
                        className="input-modern focus-ring"
                        placeholder="Enter calories"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                      <select
                        value={logMealData.time}
                        onChange={(e) => setLogMealData(prev => ({ ...prev, time: e.target.value }))}
                        className="input-modern focus-ring"
                      >
                        <option value="">Select time</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>
                    {mealLogError && <div className="text-red-500 text-center mt-2">{mealLogError}</div>}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      onClick={() => setOpenLogMeal(false)}
                      className="btn-outline flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={handleLogMeal}
                      className="btn-primary flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Log Meal
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Update Weight Dialog */}
          <AnimatePresence>
            {openUpdateWeight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setOpenUpdateWeight(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="card-glass p-8 rounded-3xl max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-bold text-gradient-primary mb-6">Update Weight ⚖️</h2>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Weight (kg)</label>
                    <input
                      type="number"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      className="input-modern focus-ring"
                      placeholder="Enter your weight"
                      step="0.1"
                    />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      onClick={() => setOpenUpdateWeight(false)}
                      className="btn-outline flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={handleUpdateWeight}
                      className="btn-primary flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Update Weight
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Floating AI Chatbox Button and Chatbox */}
      {/* <AIChatboxLauncher /> */}
    </div>
  );
};

// Helper to format a detailed meal plan as a string
function formatMealPlan(mealPlan) {
  return mealPlan.meals.map(meal =>
    `**${meal.name}**\n${meal.description}\nCalories: ${meal.calories} | Protein: ${meal.protein}g | Carbs: ${meal.carbs}g | Fat: ${meal.fat}g\n`
  ).join('\n');
}

// AI Chatbox Component
const AIChatbox = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I can generate meal plans for you. Ask me for a meal plan by cuisine, dietary preference, or any nutrition goal!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // Real AI backend integration
  const getAIResponse = async (userMsg, chatHistory) => {
    try {
      const messages = [
        ...chatHistory.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
        { role: 'user', content: userMsg }
      ];
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      const data = await res.json();
      if (data.ai) return data.ai;
      return 'Sorry, I could not generate a meal plan right now.';
    } catch (err) {
      return 'Sorry, there was an error contacting the AI.';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setLoading(true);
    setInput('');
    const aiReply = await getAIResponse(input, newMessages);
    setMessages(msgs => [...msgs, { sender: 'ai', text: aiReply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[999] w-96 max-w-full bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
      <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-t-2xl px-4 py-3 font-bold text-primary-700 flex items-center justify-between">
        <span>AI Meal Plan Chat</span>
        <button onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700 font-bold">✕</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto max-h-80">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-xl whitespace-pre-line ${msg.sender === 'user' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-700'}`}>{msg.text.split('**').map((part, i) => i % 2 === 1 ? <b key={i}>{part}</b> : part)}</div>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">AI is typing...</div>}
      </div>
      <div className="flex border-t border-gray-200">
        <input
          className="flex-1 px-4 py-3 rounded-bl-2xl outline-none"
          type="text"
          placeholder="Ask for a meal plan..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          disabled={loading}
        />
        <button
          className="btn-primary rounded-br-2xl px-6 font-semibold"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Floating button to launch AIChatbox
function AIChatboxLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!open && (
        <button
          className="fixed bottom-8 right-8 z-[998] bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl hover:scale-105 transition-transform"
          onClick={() => setOpen(true)}
          title="Open AI Meal Plan Chat"
        >
          🤖
        </button>
      )}
      <AIChatbox open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default ProgressTracker; 