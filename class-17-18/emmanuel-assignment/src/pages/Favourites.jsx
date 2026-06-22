import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  function removeFavorite(id) {
    const updated = favorites.filter((item) => item.idMeal !== id);

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">❤️ Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites added yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal} className="relative">
              <RecipeCard recipe={recipe} />

              <button
                onClick={() => removeFavorite(recipe.idMeal)}
                className="
                  absolute top-2 right-2
                  bg-red-600 text-white
                  text-xs px-2 py-1
                  rounded hover:bg-red-700
                  cursor-pointer
                "
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
