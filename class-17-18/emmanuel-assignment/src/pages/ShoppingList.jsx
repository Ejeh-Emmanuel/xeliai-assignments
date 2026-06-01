import { useEffect, useState } from "react";

function ShoppingList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(stored);
  }, []);

  function getIngredients(recipe) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }

    return ingredients;
  }

  return (
    <div>
      <h1>Shopping List</h1>

      {favorites.length === 0 ? (
        <p>No saved meals yet.</p>
      ) : (
        favorites.map((recipe) => (
          <div key={recipe.idMeal}>
            {/* MEAL NAME (THIS WAS MISSING) */}
            <h2>{recipe.strMeal}</h2>

            {/* INGREDIENTS */}
            <ul>
              {getIngredients(recipe).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default ShoppingList;
