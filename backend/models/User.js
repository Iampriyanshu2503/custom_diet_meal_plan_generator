const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Authentication
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  
  avatar: { type: String },
  // Profile Information
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  age: { type: Number, required: true },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other'], 
    required: true 
  },
  weight: { type: Number, required: true }, // in kg
  height: { type: Number, required: true }, // in cm
  activityLevel: { 
    type: String, 
    enum: ['sedentary', 'light', 'moderate', 'active', 'very active'], 
    required: true 
  },
  bmi: { type: Number },
  
  // Goals and Preferences
  goal: {
    type: String,
    enum: ['weight loss', 'weight gain', 'maintenance', 'muscle gain'],
    default: 'maintenance'
  },
  targetWeight: { type: Number },
  dietaryRestrictions: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'none']
  }],
  
  // Tracking Data
  dailyCalorieGoal: { type: Number, default: 2000 },
  waterGoal: { type: Number, default: 8 }, // glasses per day
  currentWeight: { type: Number }, // for tracking progress
  weightHistory: [{
    weight: Number,
    date: { type: Date, default: Date.now }
  }],
  
  // Meal Tracking
  meals: [{
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    date: { type: Date, default: Date.now },
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack']
    }
  }],
  
  // Water Tracking
  waterIntake: [{
    glasses: Number,
    date: { type: Date, default: Date.now }
  }],
  
  // Streaks and Stats
  loginStreak: { type: Number, default: 0 },
  lastLoginDate: { type: Date },
  totalMealsLogged: { type: Number, default: 0 },
  goalsMet: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to calculate BMI
userSchema.methods.calculateBMI = function() {
  const heightM = this.height / 100;
  this.bmi = +(this.weight / (heightM * heightM)).toFixed(2);
  return this.bmi;
};

// Method to get today's water intake
userSchema.methods.getTodayWaterIntake = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayEntry = this.waterIntake.find(entry => {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);
    return entryDate.getTime() === today.getTime();
  });
  
  return todayEntry ? todayEntry.glasses : 0;
};

// Method to get today's meals
userSchema.methods.getTodayMeals = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return this.meals.filter(meal => {
    const mealDate = new Date(meal.date);
    mealDate.setHours(0, 0, 0, 0);
    return mealDate.getTime() === today.getTime();
  });
};

// Method to get today's total calories
userSchema.methods.getTodayCalories = function() {
  const todayMeals = this.getTodayMeals();
  return todayMeals.reduce((total, meal) => total + meal.calories, 0);
};

module.exports = mongoose.model('User', userSchema); 