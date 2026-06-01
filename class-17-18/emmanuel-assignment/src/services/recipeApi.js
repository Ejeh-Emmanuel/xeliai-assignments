const BASE_URL =
    "https://www.themealdb.com/api/json/v1/1";

export async function searchRecipes(query) {
    const response = await fetch(
        `${BASE_URL}/search.php?s=${query}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();

    return data.meals || [];
}

export async function getRecipeById(id) {
    const response = await fetch(
        `${BASE_URL}/lookup.php?i=${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recipe");
    }

    const data = await response.json();

    return data.meals[0];
}

export async function getRandomRecipe() {
    const response = await fetch(
        `${BASE_URL}/random.php`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recipe");
    }

    const data = await response.json();

    return data.meals[0];
}