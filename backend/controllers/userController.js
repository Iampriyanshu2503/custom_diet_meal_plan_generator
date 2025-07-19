const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  });
};

// Helper to calculate BMI
function calculateBMI(weight, height) {
  const heightM = height / 100;
  return +(weight / (heightM * heightM)).toFixed(2);
}

// Helper to calculate daily calorie needs
function calculateDailyCalories(user) {
  const { age, gender, weight, height, activityLevel, goal } = user;
  
  // BMR calculation using Mifflin-St Jeor Equation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  // Activity multiplier
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very active': 1.9
  };
  
  let tdee = bmr * activityMultipliers[activityLevel];
  
  // Goal adjustment
  const goalAdjustments = {
    'weight loss': 0.85,
    'weight gain': 1.15,
    'maintenance': 1,
    'muscle gain': 1.1
  };
  
  return Math.round(tdee * goalAdjustments[goal]);
}

// Helper to generate meal plan based on user data
function generateMealPlan(user) {
  const dailyCalories = calculateDailyCalories(user);
  const { goal } = user;
  
  // Macro split based on goal
  let macroSplit;
  switch (goal) {
    case 'weight loss':
      macroSplit = { carbs: 40, protein: 35, fat: 25 };
      break;
    case 'muscle gain':
      macroSplit = { carbs: 45, protein: 30, fat: 25 };
      break;
    case 'weight gain':
      macroSplit = { carbs: 55, protein: 20, fat: 25 };
      break;
    default: // maintenance
      macroSplit = { carbs: 50, protein: 25, fat: 25 };
  }
  
  const meals = [
    { 
      name: 'Breakfast', 
      calories: Math.round(dailyCalories * 0.25),
      time: '8:00 AM',
      suggestions: ['Oatmeal with berries', 'Greek yogurt with nuts', 'Whole grain toast with eggs']
    },
    { 
      name: 'Lunch', 
      calories: Math.round(dailyCalories * 0.3),
      time: '1:00 PM',
      suggestions: ['Grilled chicken salad', 'Quinoa bowl', 'Turkey sandwich']
    },
    { 
      name: 'Snack', 
      calories: Math.round(dailyCalories * 0.15),
      time: '4:00 PM',
      suggestions: ['Apple with peanut butter', 'Protein shake', 'Mixed nuts']
    },
    { 
      name: 'Dinner', 
      calories: Math.round(dailyCalories * 0.3),
      time: '7:00 PM',
      suggestions: ['Salmon with vegetables', 'Lean beef stir-fry', 'Vegetarian pasta']
    }
  ];

  return {
    goal,
    dailyCalories,
    macroSplit,
    meals,
    message: `Personalized plan for ${goal} at ${dailyCalories} kcal/day.`
  };
}

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      age, 
      gender, 
      weight, 
      height, 
      activityLevel,
      goal = 'maintenance',
      targetWeight,
      dietaryRestrictions = []
    } = req.body;

    // Validation
    if (!name || !email || !password || !age || !gender || !weight || !height || !activityLevel) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      age,
      gender,
      weight,
      height,
      activityLevel,
      goal,
      targetWeight,
      dietaryRestrictions,
      currentWeight: weight
    });

    // Calculate BMI
    user.calculateBMI();
    
    // Calculate daily calorie goal
    user.dailyCalorieGoal = calculateDailyCalories(user);

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bmi: user.bmi,
        goal: user.goal,
        dailyCalorieGoal: user.dailyCalorieGoal
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and password' 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Update login streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!user.lastLoginDate) {
      user.loginStreak = 1;
    } else {
      const lastLogin = new Date(user.lastLoginDate);
      lastLogin.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        user.loginStreak += 1;
      } else if (diffDays > 1) {
        user.loginStreak = 1;
      }
    }
    
    user.lastLoginDate = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bmi: user.bmi,
        goal: user.goal,
        dailyCalorieGoal: user.dailyCalorieGoal,
        loginStreak: user.loginStreak
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Get today's stats
    const todayWater = user.getTodayWaterIntake();
    const todayMeals = user.getTodayMeals();
    const todayCalories = user.getTodayCalories();

    res.json({
      success: true,
      user: {
        ...user.toObject(),
        todayWater,
        todayMeals,
        todayCalories
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const allowedUpdates = [
      'name', 'age', 'gender', 'weight', 'height', 'activityLevel', 
      'goal', 'targetWeight', 'dietaryRestrictions', 'dailyCalorieGoal', 'waterGoal', 'avatar'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Recalculate BMI if weight or height changed
    if (req.body.weight || req.body.height) {
      user.calculateBMI();
    }

    // Recalculate daily calorie goal if relevant fields changed
    if (req.body.weight || req.body.height || req.body.age || req.body.gender || req.body.activityLevel || req.body.goal) {
      user.dailyCalorieGoal = calculateDailyCalories(user);
    }

    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bmi: user.bmi,
        goal: user.goal,
        dailyCalorieGoal: user.dailyCalorieGoal,
        avatar: user.avatar,
        age: user.age,
        gender: user.gender,
        weight: user.weight,
        height: user.height,
        activityLevel: user.activityLevel,
        targetWeight: user.targetWeight,
        dietaryRestrictions: user.dietaryRestrictions,
        waterGoal: user.waterGoal
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Log a meal
// @route   POST /api/users/meals
// @access  Private
exports.logMeal = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat, mealType } = req.body;

    if (!name || !calories || !mealType) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide meal name, calories, and meal type' 
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const meal = {
      name,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0,
      mealType,
      date: new Date()
    };

    user.meals.push(meal);
    user.totalMealsLogged += 1;
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Meal logged successfully',
      meal
    });

  } catch (error) {
    console.error('Log meal error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Log water intake
// @route   POST /api/users/water
// @access  Private
exports.logWater = async (req, res) => {
  try {
    const { glasses } = req.body;

    if (!glasses || glasses <= 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide valid number of glasses' 
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const waterEntry = {
      glasses,
      date: new Date()
    };

    user.waterIntake.push(waterEntry);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Water intake logged successfully',
      waterEntry
    });

  } catch (error) {
    console.error('Log water error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get meal plan
// @route   GET /api/users/mealplan
// @access  Private
exports.getMealPlan = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const mealPlan = generateMealPlan(user);

    res.json({
      success: true,
      mealPlan
    });

  } catch (error) {
    console.error('Get meal plan error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Calculate BMI
// @route   POST /api/users/bmi
// @access  Public
exports.calculateBMI = async (req, res) => {
  try {
    const { weight, height } = req.body;

    if (!weight || !height) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide weight and height' 
      });
    }

    const bmi = calculateBMI(weight, height);
    
    let category;
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    res.json({
      success: true,
      bmi,
      category
    });

  } catch (error) {
    console.error('Calculate BMI error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get weight history
// @route   GET /api/users/progress/weight
// @access  Private
exports.getWeightHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, weightHistory: user.weightHistory || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// @desc    Get calorie intake history
// @route   GET /api/users/progress/calories
// @access  Private
exports.getCalorieHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, calorieHistory: user.calorieHistory || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// @desc    Get water intake history
// @route   GET /api/users/progress/water
// @access  Private
exports.getWaterHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, waterHistory: user.waterHistory || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// @desc    Log a new weight entry
// @route   POST /api/users/weight
// @access  Private
exports.logWeight = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const { weight } = req.body;
    if (!weight) return res.status(400).json({ success: false, message: 'Weight is required' });
    const entry = { date: new Date().toISOString().slice(0, 10), weight: parseFloat(weight) };
    user.weightHistory = user.weightHistory || [];
    user.weightHistory.push(entry);
    user.currentWeight = parseFloat(weight);
    await user.save();
    res.json({ success: true, weightHistory: user.weightHistory });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Legacy function for backward compatibility
exports.createUser = async (req, res) => {
  return exports.register(req, res);
}; 