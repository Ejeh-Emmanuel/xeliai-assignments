import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFromAPI, formatRecipeData } from '../utils/apiHelpers';

export default function RecipeDetail({ favorites, toggleFavorite, addToShoppingList }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedAlert, setAddedAlert] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchFromAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (data.meals) {
          setRecipe(formatRecipeData(data.meals[0]));
        } else {
          setError("Recipe details not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Error loading recipe details.");
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [id]);

  if (loading) return <div className="loader">Loading structural specifications...</div>;
  if (error) return <div className="error-message">{error} <br/><Link to="/">Go Back Home</Link></div>;
  if (!recipe) return null;

  const isFavorite = favorites.some(fav => fav.id === recipe.id);

  const handleAddIngredients = () => {
    addToShoppingList(recipe.ingredients);
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 3000);
  };

  return (
    <div className="recipe-detail-page">
      <div className="detail-header">
        <img src={recipe.image} alt={recipe.title} />
        <div className="detail-meta">
          <h1>{recipe.title}</h1>
          <p><strong>Category:</strong> {recipe.category} | <strong>Cuisine:</strong> {recipe.area}</p>
          <div className="detail-actions">
            <button onClick={() => toggleFavorite(recipe)} className="fav-btn-large">
              {isFavorite ? '❤️ In Favorites' : '🤍 Add to Favorites'}
            </button>
            <button onClick={handleAddIngredients} className="shop-btn-large">
              🛒 Add Ingredients to Shopping List
            </button>
          </div>
          {addedAlert && <p className="alert-success">✨ Added items to your active Shopping List!</p>}
        </div>
      </div>

      <div className="detail-content">
        <div className="ingredients-box">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ing, index) => (
              <li key={index}>
                <strong>{ing.measure}</strong> {ing.name}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="instructions-box">
          <h2>Instructions</h2>
          <p className="instruction-text">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}