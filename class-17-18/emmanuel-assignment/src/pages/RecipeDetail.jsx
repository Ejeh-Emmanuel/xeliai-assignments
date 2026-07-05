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
  if (!recipe?.idMeal) return;

  const stored = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = stored.some((item) => item.idMeal === recipe.idMeal);

  if (exists) return;

  const updated = [...stored, recipe];

  localStorage.setItem("favorites", JSON.stringify(updated));
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
    if (!recipe) return;

    const stored = JSON.parse(localStorage.getItem("shoppingList")) || [];

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(ingredient);
      }
    }

    const updated = [...stored, ...ingredients];

    localStorage.setItem("shoppingList", JSON.stringify(updated));
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-112.5 object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {recipe.strMeal}
          </h1>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={saveToFavorites}
              className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition"
            >
              ❤️ Save to Favorites
            </button>

            <button
              onClick={addToShoppingList}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              🛒 Add to Shopping List
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>

              <ul className="space-y-3">
                {getIngredients(recipe).map((item, index) => (
                  <li key={index} className="bg-gray-100 p-3 rounded-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Nutrition</h2>

              <div className="space-y-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  Calories: ~350 kcal
                </div>

                <div className="bg-gray-100 p-3 rounded-lg">Protein: ~25g</div>

                <div className="bg-gray-100 p-3 rounded-lg">Carbs: ~30g</div>

                <div className="bg-gray-100 p-3 rounded-lg">Fat: ~15g</div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>

            <p className="text-gray-700 leading-8 whitespace-pre-line">
              {recipe.strInstructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
