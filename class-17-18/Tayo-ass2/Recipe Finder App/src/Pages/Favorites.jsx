import RecipeCard from '../Components/RecipeCard';
import { Link } from 'react-router-dom';

export default function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="favorites-page">
      <h2>Your Saved Recipes</h2>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>You haven't added any favorites yet.</p>
          <Link to="/" className="browse-link">Find recipes to save</Link>
        </div>
      ) : (
        <div className="recipe-grid">
          {favorites.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
            />
          ))}
        </div>
      )}
    </div>
  );
}