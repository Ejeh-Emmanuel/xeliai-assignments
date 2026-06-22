import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const [fav, setFav] = useState(false);

  // 🔍 Check if already in favorites
  function isFavorite() {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    return stored.some((item) => item.idMeal === recipe.idMeal);
  }

  // ❤️ Toggle favorite (add/remove)
  function toggleFavorite() {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = stored.some((item) => item.idMeal === recipe.idMeal);

    let updated;

    if (exists) {
      updated = stored.filter((item) => item.idMeal !== recipe.idMeal);
    } else {
      updated = [...stored, recipe];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));

    setFav(!exists);
  }

  // 🧠 Sync UI on first render
  useEffect(() => {
    setFav(isFavorite());
  }, []);

  // 🛒 Add to shopping list
  function addToShoppingList() {
    const stored = JSON.parse(localStorage.getItem("shoppingList")) || [];

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient) ingredients.push(ingredient);
    }

    localStorage.setItem(
      "shoppingList",
      JSON.stringify([...stored, ...ingredients]),
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* IMAGE + HEART */}
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover"
        />

        {/* ❤️ HEART TOGGLE */}
        <button
          onClick={toggleFavorite}
          className="
            absolute top-2 right-2
            text-2xl
            bg-white/80
            rounded-full
            p-1
            shadow
            cursor-pointer
            hover:scale-110
            transition
          "
        >
          {fav ? "❤️" : "🤍"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <h2 className="font-bold text-lg text-gray-800">{recipe.strMeal}</h2>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-2">
          <Link
            to={`/recipe/${recipe.idMeal}`}
            className="
              text-center
              bg-orange-500
              text-white
              py-2
              rounded-lg
              hover:bg-orange-600
              transition
              cursor-pointer
            "
          >
            View Recipe
          </Link>

          <button
            onClick={addToShoppingList}
            className="
              bg-gray-900
              text-white
              py-2
              rounded-lg
              hover:bg-black
              transition
              cursor-pointer
            "
          >
            🛒 Add to Shopping List
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
