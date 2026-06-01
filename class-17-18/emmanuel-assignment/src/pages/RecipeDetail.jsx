import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipeById } from "../services/recipeApi";

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

function saveToFavorites() {
  if (!recipe) return;

  const stored = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = stored.some((item) => item.idMeal === recipe.idMeal);

  if (exists) return;

  const updated = [...stored, recipe];

  localStorage.setItem("favorites", JSON.stringify(updated));

  console.log("Saved to favorites:", recipe.strMeal);
}

  function getIngredients(recipe) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }

    return ingredients;
  }

  function addToShoppingList() {
    const stored = JSON.parse(localStorage.getItem("shoppingList")) || [];

    const newItems = [];

    for (let i = 1; i <= 20; i++) {
      const meal = recipe[`strMeal${i}`];

      if (meal && meal.trim() !== "") {
        newItems.push(meal);
      }
    }

    const updated = [...new Set([...stored, ...newItems])];

    localStorage.setItem("shoppingList", JSON.stringify(updated));
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="container recipe-detail">
      <h1 className="recipe-title">{recipe.strMeal}</h1>

      <img
        className="recipe-image"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <button className="button-group" onClick={saveToFavorites}>
        ❤️ Save to Favorites
      </button>
      <button onClick={addToShoppingList}>🛒 Add to Shopping List</button>

      <section className="recipe-section">
        <h2>Instructions</h2>
        <p>{recipe.strInstructions}</p>

        <h2>Ingredients</h2>
        <ul>
          {getIngredients(recipe).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2>Nutrition</h2>
        <ul>
          <li>Calories: ~350 kcal</li>
          <li>Protein: ~25g</li>
          <li>Carbs: ~30g</li>
          <li>Fat: ~15g</li>
        </ul>
      </section>
    </div>
  );
}

export default RecipeDetail;
