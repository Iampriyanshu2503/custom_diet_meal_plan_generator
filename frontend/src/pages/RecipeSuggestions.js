import recipesData from '../constants/recipes.json';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mealTypes = [
  { label: 'All', value: 'All' },
  { label: 'Breakfast', value: 'Breakfast' },
  { label: 'Lunch', value: 'Lunch' },
  { label: 'Dinner', value: 'Dinner' },
  { label: 'Snack', value: 'Snack' },
  { label: 'Extras', value: 'Extra' }
];

const RecipeSuggestions = () => {
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTags, setSelectedTags] = useState(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [sortBy, setSortBy] = useState('rating');
  const [goalType, setGoalType] = useState('All');
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  // Updated filtering logic
  const filteredRecipes = recipesData.filter(recipe => {
    // Meal Type
    const mealTypeMatch = selectedMealType === 'All' || recipe.mealType === selectedMealType;
    // Cuisine
    const cuisineMatch = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;
    // Difficulty
    const difficultyMatch = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
    // Goal Type
    const goalTypeMatch = goalType === 'All' || recipe.goalType === goalType;
    // Tags (Dietary Preferences)
    const tagsMatch = selectedTags.includes('All') || selectedTags.every(tag => recipe.tags.includes(tag));
    // Search Query
    const searchMatch =
      searchQuery.trim() === '' ||
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.ingredients && recipe.ingredients.join(' ').toLowerCase().includes(searchQuery.toLowerCase()));
    return mealTypeMatch && cuisineMatch && difficultyMatch && goalTypeMatch && tagsMatch && searchMatch;
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

          {/* Meal Type Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {mealTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setSelectedMealType(type.value)}
                className={`px-4 py-2 rounded-full font-semibold border transition-all duration-200 ${selectedMealType === type.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-primary-600 border-primary-200 hover:bg-primary-50'}`}
              >
                {type.label}
              </button>
            ))}
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
                  {/* cuisines.map(cuisine => ( */}
                    <option key="All" value="All">All</option>
                    <option key="Indian" value="Indian">Indian</option>
                    <option key="Mediterranean" value="Mediterranean">Mediterranean</option>
                    <option key="Asian" value="Asian">Asian</option>
                    <option key="American" value="American">American</option>
                    <option key="Italian" value="Italian">Italian</option>
                    <option key="Mexican" value="Mexican">Mexican</option>
                  {/* ))} */}
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
                  {/* difficulties.map(difficulty => ( */}
                    <option key="All" value="All">All</option>
                    <option key="Easy" value="Easy">Easy</option>
                    <option key="Medium" value="Medium">Medium</option>
                    <option key="Hard" value="Hard">Hard</option>
                  {/* ))} */}
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
                {/* tags.map(tag => ( */}
                  <motion.button
                    key="All"
                    onClick={() => handleTagToggle('All')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes('All')
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    All
                  </motion.button>
                  <motion.button
                    key="Vegetarian"
                    onClick={() => handleTagToggle('Vegetarian')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes('Vegetarian')
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Vegetarian
                  </motion.button>
                  <motion.button
                    key="High Protein"
                    onClick={() => handleTagToggle('High Protein')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes('High Protein')
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    High Protein
                  </motion.button>
                  <motion.button
                    key="Gluten-Free"
                    onClick={() => handleTagToggle('Gluten-Free')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes('Gluten-Free')
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Gluten-Free
                  </motion.button>
                  <motion.button
                    key="Quick"
                    onClick={() => handleTagToggle('Quick')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes('Quick')
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Quick
                  </motion.button>
                  <motion.button
                    key="Low Carb"
                    onClick={() => handleTagToggle('Low Carb')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes('Low Carb')
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Low Carb
                  </motion.button>
                  <motion.button
                    key="High Fiber"
                    onClick={() => handleTagToggle('High Fiber')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes('High Fiber')
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    High Fiber
                  </motion.button>
                  <motion.button
                    key="Low Fat"
                    onClick={() => handleTagToggle('Low Fat')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes('Low Fat')
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Low Fat
                  </motion.button>
                  <motion.button
                    key="Omega-3"
                    onClick={() => handleTagToggle('Omega-3')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes('Omega-3')
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Omega-3
                  </motion.button>
                {/* ))} */}
              </div>
            </div>

            {/* Goal Type Filter */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Type</label>
              <div className="flex flex-wrap gap-2">
                {/* goalTypes.map(type => ( */}
                  <motion.button
                    key="All"
                    onClick={() => setGoalType('All')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      goalType === 'All'
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    All
                  </motion.button>
                  <motion.button
                    key="Weight Loss"
                    onClick={() => setGoalType('Weight Loss')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      goalType === 'Weight Loss'
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Weight Loss
                  </motion.button>
                  <motion.button
                    key="Weight Gain"
                    onClick={() => setGoalType('Weight Gain')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      goalType === 'Weight Gain'
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Weight Gain
                  </motion.button>
                {/* ))} */}
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
                onClick={() => { setSelectedRecipe(null); setShowFullInstructions(false); }}
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
                      onClick={() => { setSelectedRecipe(null); setShowFullInstructions(false); }}
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
                      {showFullInstructions && (
                        <div className="mt-6">
                          <h3 className="font-semibold text-gray-800 mb-2">Full Recipe Instructions</h3>
                          <div className="text-gray-700 whitespace-pre-line">
                            {selectedRecipe.fullRecipe
                              ? selectedRecipe.fullRecipe
                              : selectedRecipe.instructions || 'No detailed instructions available.'}
                          </div>
                        </div>
                      )}
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
                      className={`btn-outline flex-1 ${showFullInstructions ? 'bg-primary-100' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowFullInstructions((prev) => !prev)}
                    >
                      {showFullInstructions ? 'Hide Full Recipe' : 'View Full Recipe'} 📖
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