import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI, userAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const steps = ['Basic Info', 'Activity Level', 'Dietary Preferences', 'Health Goals'];

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise', icon: '🛋️' },
  { value: 'lightly_active', label: 'Lightly Active', description: 'Light exercise 1-3 days/week', icon: '🚶‍♀️' },
  { value: 'moderately_active', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week', icon: '🏃‍♀️' },
  { value: 'very_active', label: 'Very Active', description: 'Hard exercise 6-7 days/week', icon: '💪' },
  { value: 'extremely_active', label: 'Extremely Active', description: 'Very hard exercise, physical job', icon: '🔥' },
];

const dietaryPreferences = [
  { value: 'Vegetarian', icon: '🥬' },
  { value: 'Vegan', icon: '🌱' },
  { value: 'Keto', icon: '🥑' },
  { value: 'Paleo', icon: '🥩' },
  { value: 'Mediterranean', icon: '🐟' },
  { value: 'Low-Carb', icon: '🥜' },
  { value: 'Gluten-Free', icon: '🌾' },
  { value: 'Dairy-Free', icon: '🥛' }
];

const healthGoals = [
  { value: 'lose_weight', label: 'Lose Weight', icon: '⚖️', color: 'accent' },
  { value: 'maintain', label: 'Maintain Weight', icon: '⚖️', color: 'primary' },
  { value: 'gain_muscle', label: 'Gain Muscle', icon: '💪', color: 'secondary' },
  { value: 'improve_health', label: 'Improve Health', icon: '❤️', color: 'success' },
];

const ProfileSetup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    dietaryPreferences: [],
    healthGoal: '',
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDietaryPreferenceToggle = (preference) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter(p => p !== preference)
        : [...prev.dietaryPreferences, preference]
    }));
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.age && formData.gender && formData.height && formData.weight;
      case 1:
        return formData.activityLevel;
      case 2:
        return formData.dietaryPreferences.length > 0;
      case 3:
        return formData.healthGoal;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient-primary mb-4">Tell us about yourself 📝</h2>
              <p className="text-gray-600">Let's start with the basics to personalize your experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  className="input-modern focus-ring"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className="input-modern focus-ring"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  className="input-modern focus-ring"
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="input-modern focus-ring"
                  placeholder="Enter your age"
                />
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="input-modern focus-ring"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="input-modern focus-ring"
                  placeholder="Enter your height"
                />
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="input-modern focus-ring"
                  placeholder="Enter your weight"
                />
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient-primary mb-4">How active are you? 🏃‍♀️</h2>
              <p className="text-gray-600">Choose the activity level that best describes your lifestyle</p>
            </div>
            
            <div className="space-y-4">
              {activityLevels.map((level, index) => (
                <motion.div
                  key={level.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <label className="block">
                    <input
                      type="radio"
                      name="activityLevel"
                      value={level.value}
                      checked={formData.activityLevel === level.value}
                      onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`card-modern p-6 cursor-pointer transition-all duration-300 ${
                      formData.activityLevel === level.value 
                        ? 'ring-2 ring-primary-500 bg-gradient-to-r from-primary-50 to-primary-100' 
                        : 'hover:shadow-lg hover:-translate-y-1'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{level.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">{level.label}</h3>
                          <p className="text-gray-600">{level.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.activityLevel === level.value 
                            ? 'border-primary-500 bg-primary-500' 
                            : 'border-gray-300'
                        }`}>
                          {formData.activityLevel === level.value && (
                            <motion.div
                              className="w-2 h-2 bg-white rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient-primary mb-4">What's your dietary preference? 🥗</h2>
              <p className="text-gray-600">Select all that apply to your diet</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dietaryPreferences.map((preference, index) => (
                <motion.button
                  key={preference.value}
                  onClick={() => handleDietaryPreferenceToggle(preference.value)}
                  className={`card-modern p-4 text-center transition-all duration-300 ${
                    formData.dietaryPreferences.includes(preference.value)
                      ? 'ring-2 ring-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 scale-105'
                      : 'hover:shadow-lg hover:-translate-y-1'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl mb-2">{preference.icon}</div>
                  <div className="text-sm font-medium text-gray-800">{preference.value}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient-primary mb-4">What's your main health goal? 🎯</h2>
              <p className="text-gray-600">Choose the goal that matters most to you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthGoals.map((goal, index) => (
                <motion.div
                  key={goal.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <label className="block">
                    <input
                      type="radio"
                      name="healthGoal"
                      value={goal.value}
                      checked={formData.healthGoal === goal.value}
                      onChange={(e) => handleInputChange('healthGoal', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`card-modern p-6 cursor-pointer transition-all duration-300 ${
                      formData.healthGoal === goal.value 
                        ? `ring-2 ring-${goal.color}-500 bg-gradient-to-r from-${goal.color}-50 to-${goal.color}-100` 
                        : 'hover:shadow-lg hover:-translate-y-1'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{goal.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800">{goal.label}</h3>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.healthGoal === goal.value 
                            ? `border-${goal.color}-500 bg-${goal.color}-500` 
                            : 'border-gray-300'
                        }`}>
                          {formData.healthGoal === goal.value && (
                            <motion.div
                              className="w-2 h-2 bg-white rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 bg-pattern-grid">
      <div className="container-responsive py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gradient-primary mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Set Up Your Profile 👤
            </motion.h1>
            <p className="text-xl text-gray-600">Let's create your personalized nutrition journey</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="progress-primary h-3 mb-4">
              <motion.div
                className="progress-primary-bar"
                initial={{ width: 0 }}
                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-center text-gray-600">
              Step {activeStep + 1} of {steps.length}
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    index <= activeStep 
                      ? 'bg-primary-500 text-white shadow-glow' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < activeStep ? '✓' : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      index < activeStep ? 'bg-primary-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="card-glass p-8 rounded-3xl mb-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <motion.button
              onClick={handleBack}
              disabled={activeStep === 0}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'btn-outline hover-lift'
              }`}
              whileHover={activeStep !== 0 ? { scale: 1.05 } : {}}
              whileTap={activeStep !== 0 ? { scale: 0.95 } : {}}
            >
              ← Back
            </motion.button>
            
            {activeStep === steps.length - 1 ? (
              <motion.button
                onClick={async () => {
                  setLoading(true);
                  setError('');
                  try {
                    const registrationData = {
                      ...formData,
                      goal: formData.healthGoal,
                      dietaryRestrictions: formData.dietaryPreferences
                    };
                    await authAPI.register(registrationData);
                    setProfileLoading(true);
                    await userAPI.getProfile(); // Optionally store or use profile data
                    setSuccess(true);
                    setTimeout(() => navigate('/profile'), 1000);
                  } catch (err) {
                    setError(err.message || 'Registration failed');
                  } finally {
                    setLoading(false);
                    setProfileLoading(false);
                  }
                }}
                disabled={!isStepValid() || loading || profileLoading}
                className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isStepValid()
                    ? 'btn-primary hover-lift'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={isStepValid() ? { scale: 1.05, y: -2 } : {}}
                whileTap={isStepValid() ? { scale: 0.95 } : {}}
              >
                {loading ? 'Submitting...' : profileLoading ? 'Fetching profile...' : 'Generate My Plan 🎯'}
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isStepValid()
                    ? 'btn-primary hover-lift'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={isStepValid() ? { scale: 1.05, y: -2 } : {}}
                whileTap={isStepValid() ? { scale: 0.95 } : {}}
              >
                Next →
              </motion.button>
            )}
          </div>
          {/* Error/Success Messages */}
          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
          {success && <div className="text-green-600 text-center mt-4">Registration successful! Redirecting...</div>}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileSetup; 