const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getProfile, 
  updateProfile,
  logMeal,
  logWater,
  logWeight,
  getMealPlan,
  calculateBMI,
  createUser, // legacy
  getWeightHistory,
  getCalorieHistory,
  getWaterHistory
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/bmi', calculateBMI);
router.post('/', createUser); // legacy route

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/meals', protect, logMeal);
router.post('/water', protect, logWater);
router.post('/weight', protect, logWeight);
router.get('/mealplan', protect, getMealPlan);

// Progress data routes
router.get('/progress/weight', protect, getWeightHistory);
router.get('/progress/calories', protect, getCalorieHistory);
router.get('/progress/water', protect, getWaterHistory);

module.exports = router; 