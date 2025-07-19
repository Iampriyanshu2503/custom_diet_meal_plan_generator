import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProfileSetup from './pages/ProfileSetup';
import MealPlan from './pages/MealPlan';
import ProgressTracker from './pages/ProgressTracker';
import RecipeSuggestions from './pages/RecipeSuggestions';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { bmiAPI } from './services/api';
import Navbar from './components/Navbar';

// BMI Calculator Component
const bmiCategories = [
  { label: 'Underweight', min: 0, max: 18.4, color: 'bg-blue-200 text-blue-800', tip: 'Consider a balanced diet to gain healthy weight.' },
  { label: 'Normal', min: 18.5, max: 24.9, color: 'bg-green-200 text-green-800', tip: 'Great job! Maintain your healthy lifestyle.' },
  { label: 'Overweight', min: 25, max: 29.9, color: 'bg-yellow-200 text-yellow-800', tip: 'Try to incorporate more activity and balanced meals.' },
  { label: 'Obese', min: 30, max: 100, color: 'bg-red-200 text-red-800', tip: 'Consult a healthcare provider for personalized advice.' },
];

const getBMICategory = (bmi) => {
  if (!bmi) return null;
  return bmiCategories.find(cat => bmi >= cat.min && bmi <= cat.max) || null;
};

const BMICalculator = ({ onClose }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculateBMI = async () => {
    setShowResult(false);
    setError('');
    if (!weight || !height || weight <= 0 || height <= 0) {
      setError('Please enter valid weight and height.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await bmiAPI.calculateBMI(weight, height);
      if (response.bmi) {
        setBmi(response.bmi);
        setCategory(response.category || '');
        setTimeout(() => setShowResult(true), 300); // Animate result in
      } else {
        setError('Failed to calculate BMI');
      }
    } catch (error) {
      setError(error.message || 'Failed to calculate BMI');
    } finally {
      setIsLoading(false);
    }
  };

  const bmiCat = getBMICategory(bmi);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="card-glass p-8 rounded-3xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gradient-primary">BMI Calculator 📊</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
          >
            {error}
          </motion.div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input-modern focus-ring"
              placeholder="Enter your weight"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input-modern focus-ring"
              placeholder="Enter your height"
              min="1"
            />
          </div>
          <motion.button
            onClick={calculateBMI}
            className="btn-primary w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? 'Calculating...' : 'Calculate BMI'}
          </motion.button>
          {/* Animated Result Display */}
          <AnimatePresence>
            {showResult && bmi && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`text-center p-4 rounded-xl mt-4 ${bmiCat ? bmiCat.color : 'bg-gray-100 text-gray-800'}`}
              >
                <div className="text-3xl font-bold mb-2">{bmi}</div>
                <div className="text-lg font-semibold mb-1">{bmiCat ? bmiCat.label : category}</div>
                <div className="text-sm mb-2">Your BMI Result</div>
                {/* Health Tip */}
                {bmiCat && (
                  <div className="mt-2 text-base font-medium italic">💡 {bmiCat.tip}</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {/* BMI Reference Table */}
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-2">BMI Reference Table</h3>
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-2 text-left">Category</th>
                  <th className="py-2 px-2 text-left">BMI Range</th>
                </tr>
              </thead>
              <tbody>
                {bmiCategories.map(cat => (
                  <tr key={cat.label} className={cat.color + ' font-semibold'}>
                    <td className="py-1 px-2">{cat.label}</td>
                    <td className="py-1 px-2">
                      {cat.min} - {cat.max}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [showBMICalculator, setShowBMICalculator] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('profileDarkMode') === 'true';
  });

  return (
    <Router>
      {/* Pass isLoggedIn and setIsLoggedIn to Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <AnimatePresence>
          {showBMICalculator && (
            <BMICalculator onClose={() => setShowBMICalculator(false)} />
          )}
        </AnimatePresence>
        
        <Routes>
          <Route path="/profile" element={<Profile darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard onBMIClick={() => setShowBMICalculator(true)} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/recipes" element={<RecipeSuggestions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
