import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <h3>{recipe.strMeal}</h3>

      <Link to={`/recipe/${recipe.idMeal}`} className="view-recipe-btn">
        View Recipe
      </Link>
    </div>
  );
}

export default RecipeCard;
