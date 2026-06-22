import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFromAPI, formatRecipeData } from '../utils/apiHelpers';
import RecipeCard from '../Components/RecipeCard';

export default function Home({ favorites, toggleFavorite }) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Categories supported smoothly by TheMealDB APIs
  const categories = ["All", "Vegetarian", "Vegan", "Beef", "Chicken", "Seafood", "Dessert"];

  const searchRecipes = async (query = '', cat = 'All') => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      
      // Handle Category filter endpoint vs Search endpoint switch
      if (cat !== 'All' && !query) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`;
      }

      const data = await fetchFromAPI(url);
      if (data.meals) {
        const formatted = data.meals.map(meal => formatRecipeData(meal));
        // Note: The category endpoint returns less payload, filter client-side if needed, 
        // or just accept basic layout items.
        setRecipes(formatted);
      } else {
        setRecipes([]);
      }
    } catch {
      setError("Failed to fetch recipes. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };



  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchRecipes(searchTerm, category);
  };

  useEffect(() => {
    const fetchRecipesOnUpdate = async () => {
      await searchRecipes(searchTerm, category);
    };

    fetchRecipesOnUpdate();
  }, [searchTerm, category]);

  const handleRandomClick = async () => {
    setLoading(true);
    try {
      const data = await fetchFromAPI('https://www.themealdb.com/api/json/v1/1/random.php');
      if (data.meals) {
        const cleanMeal = formatRecipeData(data.meals[0]);
        navigate(`/recipe/${cleanMeal.id}`);
      }
    } catch {
      setError("Could not retrieve a random recipe.");
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input 
            type="text" 
            placeholder="Search recipes (e.g., chicken, pasta)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={handleRandomClick} className="random-btn">🎲 Random Recipe</button>
      </div>

      <div className="filter-bar">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={category === cat ? 'active' : ''} 
            onClick={() => { setCategory(cat); setSearchTerm(''); }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <div className="loader">Loading dynamic recipes...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="recipe-grid">
          {recipes.length > 0 ? (
            recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
              />
            ))
          ) : (
            <p className="no-results">No recipes found. Try another search or filter!</p>
          )}
        </div>
      )}
    </div>
  );
}