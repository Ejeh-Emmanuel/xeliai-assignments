// Sanitizes the messy API response into a clean UI-ready object
export function formatRecipeData(meal) {
  if (!meal) return null;
  
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ""
      });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    instructions: meal.strInstructions,
    category: meal.strCategory,
    area: meal.strArea,
    ingredients: ingredients
  };
}

// Global fetch wrapper with error handling
export async function fetchFromAPI(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}