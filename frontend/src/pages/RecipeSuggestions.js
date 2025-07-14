import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample recipe data - in a real app, this would come from the backend
const recipes = [
  {
    id: 1,
    name: 'Quinoa Buddha Bowl',
    image: '🥗',
    calories: 420,
    prepTime: '20 min',
    difficulty: 'Easy',
    cuisine: 'Mediterranean',
    tags: ['Vegetarian', 'High Protein', 'Gluten-Free'],
    ingredients: ['Quinoa', 'Chickpeas', 'Avocado', 'Cherry tomatoes', 'Cucumber', 'Lemon'],
    rating: 4.8,
    reviews: 124,
    description: 'A nutritious and colorful bowl packed with protein and fresh vegetables.'
  },
  {
    id: 2,
    name: 'Grilled Salmon with Asparagus',
    image: '🐟',
    calories: 580,
    prepTime: '25 min',
    difficulty: 'Medium',
    cuisine: 'Mediterranean',
    tags: ['High Protein', 'Omega-3', 'Low Carb'],
    ingredients: ['Salmon fillet', 'Asparagus', 'Olive oil', 'Lemon', 'Garlic', 'Herbs'],
    rating: 4.9,
    reviews: 89,
    description: 'Perfectly grilled salmon with tender asparagus and zesty lemon.'
  },
  {
    id: 3,
    name: 'Chicken Stir-Fry',
    image: '🍳',
    calories: 380,
    prepTime: '15 min',
    difficulty: 'Easy',
    cuisine: 'Asian',
    tags: ['High Protein', 'Quick', 'Low Fat'],
    ingredients: ['Chicken breast', 'Broccoli', 'Bell peppers', 'Soy sauce', 'Ginger', 'Garlic'],
    rating: 4.6,
    reviews: 156,
    description: 'A quick and healthy stir-fry loaded with vegetables and lean protein.'
  },
  {
    id: 4,
    name: 'Avocado Toast with Eggs',
    image: '🥑',
    calories: 320,
    prepTime: '10 min',
    difficulty: 'Easy',
    cuisine: 'American',
    tags: ['Vegetarian', 'Quick', 'High Protein'],
    ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Microgreens'],
    rating: 4.7,
    reviews: 203,
    description: 'A classic breakfast with creamy avocado and perfectly poached eggs.'
  },
  {
    id: 5,
    name: 'Greek Yogurt Parfait',
    image: '🍓',
    calories: 280,
    prepTime: '5 min',
    difficulty: 'Easy',
    cuisine: 'Mediterranean',
    tags: ['Vegetarian', 'High Protein', 'Quick'],
    ingredients: ['Greek yogurt', 'Berries', 'Granola', 'Honey', 'Chia seeds'],
    rating: 4.5,
    reviews: 167,
    description: 'A protein-rich parfait with fresh berries and crunchy granola.'
  },
  {
    id: 6,
    name: 'Lentil Soup',
    image: '🥣',
    calories: 240,
    prepTime: '35 min',
    difficulty: 'Easy',
    cuisine: 'Mediterranean',
    tags: ['Vegetarian', 'High Fiber', 'Low Fat'],
    ingredients: ['Red lentils', 'Onion', 'Carrots', 'Celery', 'Spices', 'Vegetable broth'],
    rating: 4.4,
    reviews: 98,
    description: 'A hearty and warming soup packed with plant-based protein.'
  }
];

const cuisines = ['All', 'Mediterranean', 'Asian', 'American', 'Italian', 'Mexican'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
const tags = ['All', 'Vegetarian', 'High Protein', 'Gluten-Free', 'Quick', 'Low Carb', 'High Fiber', 'Low Fat', 'Omega-3'];

const RecipeSuggestions = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTags, setSelectedTags] = useState(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [sortBy, setSortBy] = useState('rating');

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCuisine = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;
    const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
    const matchesTags = selectedTags.includes('All') || 
      selectedTags.some(tag => recipe.tags.includes(tag));
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCuisine && matchesDifficulty && matchesTags && matchesSearch;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'calories':
        return a.calories - b.calories;
      case 'prepTime':
        return parseInt(a.prepTime) - parseInt(b.prepTime);
      default:
        return 0;
    }
  });

  const handleTagToggle = (tag) => {
    if (tag === 'All') {
      setSelectedTags(['All']);
    } else {
      setSelectedTags(prev => {
        const newTags = prev.filter(t => t !== 'All');
        if (newTags.includes(tag)) {
          return newTags.filter(t => t !== tag);
        } else {
          return [...newTags, tag];
        }
      });
    }
  };

  const renderRecipeCard = (recipe) => (
    <motion.div
      key={recipe.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card-glass p-6 h-full"
    >
      {/* Recipe Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{recipe.image}</div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">{recipe.calories}</div>
          <div className="text-sm text-gray-500">calories</div>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>⏱️ {recipe.prepTime}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {recipe.difficulty}
          </span>
          <span>🌍 {recipe.cuisine}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(recipe.rating) ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {recipe.rating} ({recipe.reviews} reviews)
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {recipe.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          onClick={() => setSelectedRecipe(recipe)}
          className="flex-1 btn-outline py-2 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Recipe 👁️
        </motion.button>
        <motion.button
          className="flex-1 btn-primary py-2 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add to Plan ➕
        </motion.button>
      </div>
    </motion.div>
  );

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
              Recipe Suggestions 🍳
            </motion.h1>
            <p className="text-xl text-gray-600">Discover delicious and healthy recipes tailored to your preferences</p>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-glass p-6 rounded-3xl"
          >
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-modern pl-12 focus-ring"
                  placeholder="Search recipes by name or ingredients..."
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Cuisine Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cuisine</label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="input-modern focus-ring"
                >
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="input-modern focus-ring"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-modern focus-ring"
                >
                  <option value="rating">Rating</option>
                  <option value="calories">Calories (Low to High)</option>
                  <option value="prepTime">Prep Time</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="text-center w-full">
                  <div className="text-2xl font-bold text-primary-600">{sortedRecipes.length}</div>
                  <div className="text-sm text-gray-600">recipes found</div>
                </div>
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Preferences</label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <motion.button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recipe Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {sortedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedRecipes.map((recipe) => (
                  <div key={recipe.id}>
                    {renderRecipeCard(recipe)}
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No recipes found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </motion.div>
            )}
          </motion.div>

          {/* Recipe Detail Modal */}
          <AnimatePresence>
            {selectedRecipe && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedRecipe(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="card-glass p-8 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gradient-primary">{selectedRecipe.name}</h2>
                    <button
                      onClick={() => setSelectedRecipe(null)}
                      className="text-2xl text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-8xl mb-4 text-center">{selectedRecipe.image}</div>
                      <div className="space-y-2 text-gray-600 mb-6">
                        <p>⏱️ Prep Time: {selectedRecipe.prepTime}</p>
                        <p>🔥 Calories: {selectedRecipe.calories}</p>
                        <p>📊 Difficulty: {selectedRecipe.difficulty}</p>
                        <p>🌍 Cuisine: {selectedRecipe.cuisine}</p>
                      </div>
                      
                      <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(selectedRecipe.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {selectedRecipe.rating} ({selectedRecipe.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedRecipe.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">Description</h3>
                      <p className="text-gray-600 mb-6">{selectedRecipe.description}</p>
                      
                      <h3 className="font-semibold text-gray-800 mb-4">Ingredients</h3>
                      <ul className="space-y-2 mb-6">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      className="btn-primary flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add to Meal Plan ➕
                    </motion.button>
                    <motion.button
                      className="btn-outline flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Full Recipe 📖
                    </motion.button>
                    <motion.button
                      className="btn-secondary flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save to Favorites ❤️
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

export default RecipeSuggestions; 