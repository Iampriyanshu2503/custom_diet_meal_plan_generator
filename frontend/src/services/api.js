const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Authentication API
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await handleResponse(response);
    
    // Store token and user data
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await handleResponse(response);
    
    // Store token and user data
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// User Profile API
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    
    return handleResponse(response);
  }
};

// Meal Tracking API
export const mealAPI = {
  // Log a meal
  logMeal: async (mealData) => {
    const response = await fetch(`${API_BASE_URL}/users/meals`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(mealData)
    });
    
    return handleResponse(response);
  },

  // Get meal plan
  getMealPlan: async () => {
    const response = await fetch(`${API_BASE_URL}/users/mealplan`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }
};

// Water Tracking API
export const waterAPI = {
  // Log water intake
  logWater: async (glasses) => {
    const response = await fetch(`${API_BASE_URL}/users/water`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ glasses })
    });
    
    return handleResponse(response);
  }
};

// BMI Calculator API
export const bmiAPI = {
  // Calculate BMI
  calculateBMI: async (weight, height) => {
    const response = await fetch(`${API_BASE_URL}/users/bmi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ weight, height })
    });
    
    return handleResponse(response);
  }
};

// Progress API
export const progressAPI = {
  getWeightHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/users/progress/weight`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },
  getCalorieHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/users/progress/calories`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },
  getWaterHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/users/progress/water`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Weight API
export const weightAPI = {
  logWeight: async (weight) => {
    const response = await fetch(`${API_BASE_URL}/users/weight`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ weight })
    });
    return handleResponse(response);
  }
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError: (error) => {
    console.error('API Error:', error);
    return {
      success: false,
      message: error.message || 'Something went wrong'
    };
  },

  // Refresh user data
  refreshUserData: async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        return response.user;
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
    return null;
  }
};

// Export all APIs
export default {
  auth: authAPI,
  user: userAPI,
  meal: mealAPI,
  water: waterAPI,
  bmi: bmiAPI,
  utils: apiUtils,
  progress: progressAPI,
  weight: weightAPI
}; 