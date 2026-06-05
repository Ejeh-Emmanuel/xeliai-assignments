import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(stored);
  }, []);

  return (
    <div className="container">
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="recipes">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
