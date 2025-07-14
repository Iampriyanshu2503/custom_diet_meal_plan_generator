import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI, userAPI, mealAPI, waterAPI } from '../services/api';

const dailyTips = [
  "Drink more water today! 💧",
  "Try adding more vegetables to your meals 🥬",
  "Take a 10-minute walk after meals 🚶‍♀️",
  "Don't skip breakfast - it's the most important meal! 🍳",
  "Practice mindful eating - savor each bite 🧘‍♀️",
  "Get 7-8 hours of sleep for better metabolism 😴"
];

const features = [
  {
    icon: '🎯',
    title: 'Personalized Meal Plans',
    description: 'AI-powered meal suggestions based on your goals, preferences, and dietary restrictions'
  },
  {
    icon: '📊',
    title: 'Smart Progress Tracking',
    description: 'Monitor your nutrition, weight, and fitness goals with beautiful charts and insights'
  },
  {
    icon: '🍽️',
    title: 'Recipe Database',
    description: 'Access thousands of healthy recipes with nutritional information and cooking instructions'
  },
  {
    icon: '⚖️',
    title: 'BMI Calculator',
    description: 'Calculate your BMI and get personalized recommendations for your health journey'
  },
  {
    icon: '💧',
    title: 'Hydration Tracker',
    description: 'Stay on top of your daily water intake with smart reminders and progress tracking'
  },
  {
    icon: '🎨',
    title: 'Customizable Dashboard',
    description: 'Personalize your experience with customizable widgets and themes'
  }
];

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Fitness Enthusiast',
    content: 'Lost 15kg in 6 months! The personalized meal plans made all the difference.',
    avatar: '🏃‍♂️',
    rating: 5
  },
  {
    name: 'Sarah Chen',
    role: 'Busy Professional',
    content: 'Finally found a way to eat healthy with my crazy schedule. Love the quick recipes!',
    avatar: '👩‍💼',
    rating: 5
  },
  {
    name: 'Mike Rodriguez',
    role: 'Health Coach',
    content: 'As a trainer, I recommend NutriPlan to all my clients. The progress tracking is excellent.',
    avatar: '💪',
    rating: 5
  }
];

const stats = [
  { number: '50K+', label: 'Active Users', icon: '👥' },
  { number: '100K+', label: 'Meals Generated', icon: '🍽️' },
  { number: '95%', label: 'Success Rate', icon: '📈' },
  { number: '4.9', label: 'App Rating', icon: '⭐' }
];

const Dashboard = ({ onBMIClick, isLoggedIn, setIsLoggedIn }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'maintenance'
  });
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn && user) {
      loadUserProfile();
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % dailyTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkAuthStatus = () => {
    const currentUser = authAPI.getCurrentUser();
    if (currentUser && authAPI.isAuthenticated()) {
      setUser(currentUser);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  };

  const loadUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.success) {
        setUserProfile(response.user);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setError('Failed to load user data');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await authAPI.login(loginForm.email, loginForm.password);
      if (response.success) {
        setUser(response.user);
        setIsLoggedIn(true);
        setLoginForm({ email: '', password: '' });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await authAPI.register(registerForm);
      if (response.success) {
        setUser(response.user);
        setIsLoggedIn(true);
        setRegisterForm({
          name: '',
          email: '',
          password: '',
          age: '',
          gender: 'male',
          weight: '',
          height: '',
          activityLevel: 'moderate',
          goal: 'maintenance'
        });
        setShowRegister(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setUserProfile(null);
    setIsLoggedIn(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-16 h-16 mx-auto mb-4"></div>
          <div className="loading-dots mx-auto">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600 mt-4 animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 bg-pattern-dots">
      <div className="container-responsive py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="glass-card p-8 rounded-3xl mb-6">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gradient-primary mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {!isLoggedIn ? (
                  <>
                    Welcome to NutriPlan! 🎉
                  </>
                ) : (
                  <>
                    {getGreeting()}, {user?.name || 'User'}! 👋
                  </>
                )}
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {!isLoggedIn ? (
                  "Your personalized nutrition journey starts here"
                ) : (
                  "Ready to crush your nutrition goals today?"
                )}
              </motion.p>
              
              {/* Login/Register Forms or Action Buttons */}
              <AnimatePresence mode="wait">
                {!isLoggedIn ? (
                  <motion.div
                    key="auth-forms"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                      >
                        {error}
                      </motion.div>
                    )}

                    {!showRegister ? (
                      // Login Form
                      <motion.form
                        onSubmit={handleLogin}
                        className="space-y-4 max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div>
                          <input
                            type="email"
                            placeholder="Email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            className="input-modern w-full"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="Password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            className="input-modern w-full"
                            required
                          />
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                          <motion.button
                            type="submit"
                            className="btn-primary text-lg px-8 py-4"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Login 🚀
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={() => setShowRegister(true)}
                            className="btn-outline text-lg px-8 py-4"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Sign Up ✨
                          </motion.button>
                        </div>
                      </motion.form>
                    ) : (
                      // Register Form
                      <motion.form
                        onSubmit={handleRegister}
                        className="space-y-4 max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                            className="input-modern"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                            className="input-modern"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="password"
                            placeholder="Password"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                            className="input-modern"
                            required
                          />
                          <input
                            type="number"
                            placeholder="Age"
                            value={registerForm.age}
                            onChange={(e) => setRegisterForm({...registerForm, age: e.target.value})}
                            className="input-modern"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <select
                            value={registerForm.gender}
                            onChange={(e) => setRegisterForm({...registerForm, gender: e.target.value})}
                            className="input-modern"
                            required
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <select
                            value={registerForm.activityLevel}
                            onChange={(e) => setRegisterForm({...registerForm, activityLevel: e.target.value})}
                            className="input-modern"
                            required
                          >
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Light</option>
                            <option value="moderate">Moderate</option>
                            <option value="active">Active</option>
                            <option value="very active">Very Active</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="number"
                            placeholder="Weight (kg)"
                            value={registerForm.weight}
                            onChange={(e) => setRegisterForm({...registerForm, weight: e.target.value})}
                            className="input-modern"
                            required
                          />
                          <input
                            type="number"
                            placeholder="Height (cm)"
                            value={registerForm.height}
                            onChange={(e) => setRegisterForm({...registerForm, height: e.target.value})}
                            className="input-modern"
                            required
                          />
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                          <motion.button
                            type="submit"
                            className="btn-primary text-lg px-8 py-4"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Create Account 🚀
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={() => setShowRegister(false)}
                            className="btn-outline text-lg px-8 py-4"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Back to Login
                          </motion.button>
                        </div>
                      </motion.form>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="action-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-wrap justify-center gap-4"
                  >
                    <motion.button
                      className="btn-primary text-lg px-8 py-4"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Generate Plan 🎯
                    </motion.button>
                    <motion.button
                      className="btn-outline text-lg px-8 py-4"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Update Profile ⚙️
                    </motion.button>
                    <motion.button
                      onClick={onBMIClick}
                      className="btn-secondary text-lg px-8 py-4"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      BMI Calculator 📊
                    </motion.button>
                    <motion.button
                      onClick={handleLogout}
                      className="btn-outline text-lg px-8 py-4"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Logout 🚪
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Pre-Login Content */}
          <AnimatePresence>
            {!isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Stats Section */}
                <motion.div variants={itemVariants} className="text-center">
                  <h2 className="text-3xl font-bold text-gradient-primary mb-8">Trusted by Thousands</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="card-glass p-6 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.05 }}
                      >
                        <div className="text-4xl mb-2">{stat.icon}</div>
                        <div className="text-3xl font-bold text-primary-600 mb-1">{stat.number}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Features Section */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-gradient-primary text-center mb-8">Why Choose NutriPlan?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="card-glass p-6 hover-lift"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8, rotateY: 5 }}
                      >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-primary-600 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Testimonials Section */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-gradient-primary text-center mb-8">What Our Users Say</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        className="card-glass p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="text-3xl mr-3">{testimonial.avatar}</div>
                          <div>
                            <div className="font-semibold text-gray-800">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Demo Section */}
                <motion.div variants={itemVariants} className="card-gradient p-8 rounded-3xl text-center">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    🎬
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gradient-rainbow mb-4">
                    See NutriPlan in Action
                  </h2>
                  <p className="text-gray-600 mb-6">Watch how easy it is to create personalized meal plans and track your progress</p>
                  <motion.button
                    className="btn-primary text-lg px-8 py-4"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch Demo Video 📹
                  </motion.button>
                </motion.div>

                {/* Final CTA Section */}
                <motion.div variants={itemVariants} className="text-center">
                  <div className="glass-card p-8 rounded-3xl">
                    <h2 className="text-3xl font-bold text-gradient-primary mb-4">Ready to Transform Your Health?</h2>
                    <p className="text-xl text-gray-600 mb-6">Join thousands of users who have already achieved their nutrition goals</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <motion.button
                        className="btn-primary text-lg px-8 py-4"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowRegister(true)}
                      >
                        Start Your Journey 🚀
                      </motion.button>
                      <motion.button
                        className="btn-outline text-lg px-8 py-4"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More 📚
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dashboard Content - Only show when logged in */}
          <AnimatePresence>
            {isLoggedIn && userProfile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Overview Cards Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Today's Meals Card */}
                  <motion.div
                    className="card-glass p-6 hover-lift"
                    whileHover={{ y: -8, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-primary-600">🍽️ Today's Meals</h3>
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {userProfile.todayMeals?.length || 0}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{userProfile.todayMeals?.length || 0} meals logged today</p>
                    <div className="space-y-2">
                      {userProfile.todayMeals?.slice(0, 3).map((meal, index) => (
                        <motion.div
                          key={index}
                          className="flex justify-between items-center p-3 bg-white/50 rounded-lg backdrop-blur-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="font-medium">{meal.name}</span>
                          <span className="text-primary-600 font-semibold">{meal.calories} cal</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Water Intake Card */}
                  <motion.div
                    className="card-glass p-6 hover-lift"
                    whileHover={{ y: -8, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-secondary-600">💧 Water Intake</h3>
                      <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {userProfile.todayWater || 0}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">glasses today</p>
                    <div className="progress-secondary h-3 mb-4">
                      <motion.div
                        className="progress-secondary-bar"
                        initial={{ width: 0 }}
                        animate={{ width: `${((userProfile.todayWater || 0) / userProfile.waterGoal) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0</span>
                      <span>{userProfile.waterGoal} glasses</span>
                    </div>
                  </motion.div>

                  {/* Calorie Goal Progress Card */}
                  <motion.div
                    className="card-glass p-6 hover-lift"
                    whileHover={{ y: -8, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-accent-600">🔥 Calorie Progress</h3>
                      <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {Math.round(((userProfile.todayCalories || 0) / userProfile.dailyCalorieGoal) * 100)}%
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">calories consumed</p>
                    <div className="progress-accent h-3 mb-4">
                      <motion.div
                        className="progress-accent-bar"
                        initial={{ width: 0 }}
                        animate={{ width: `${((userProfile.todayCalories || 0) / userProfile.dailyCalorieGoal) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{userProfile.todayCalories || 0}</span>
                      <span>{userProfile.dailyCalorieGoal} cal</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Daily Tip Carousel */}
                <motion.div variants={itemVariants} className="card-glass p-8 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gradient-primary mb-4">💡 Daily Tip</h3>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={currentTipIndex}
                          className="text-xl text-gray-700 leading-relaxed"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          {dailyTips[currentTipIndex]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    <div className="flex gap-2 ml-6">
                      {dailyTips.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentTipIndex 
                              ? 'bg-primary-500 shadow-glow' 
                              : 'bg-gray-300'
                          }`}
                          whileHover={{ scale: 1.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Days Streak', value: userProfile.loginStreak || 0, icon: '🔥', color: 'accent' },
                    { label: 'Weight', value: `${userProfile.weight}kg`, icon: '⚖️', color: 'success' },
                    { label: 'Meals Logged', value: userProfile.totalMealsLogged || 0, icon: '📝', color: 'primary' },
                    { label: 'BMI', value: userProfile.bmi || 0, icon: '📊', color: 'secondary' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="card-modern p-4 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <div className={`text-3xl mb-2 text-${stat.color}-500`}>{stat.icon}</div>
                      <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Motivational Quote */}
                <motion.div 
                  variants={itemVariants}
                  className="card-gradient p-8 rounded-3xl text-center"
                >
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    🌟
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gradient-rainbow mb-4">
                    "Every healthy choice you make today is an investment in your future self."
                  </h2>
                  <p className="text-gray-600">Keep going, you're doing amazing! 💪</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 