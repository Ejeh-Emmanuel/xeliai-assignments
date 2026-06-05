import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, favorites, toggleFavorite }) {
  const isFavorite = favorites.some(fav => fav.id === recipe.id);

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-card-img" />
      <div className="recipe-card-body">
        <h3>{recipe.title}</h3>
        <p className="recipe-tag">{recipe.category || "Meal"}</p>
        <div className="recipe-card-actions">
          <Link to={`/recipe/${recipe.id}`} className="view-btn">View Recipe</Link>
          <button 
            onClick={() => toggleFavorite(recipe)} 
            className={`fav-btn ${isFavorite ? 'active' : ''}`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}