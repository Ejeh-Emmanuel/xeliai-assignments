import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { useEffect } from "react";
import { getRandomRecipe, searchRecipes } from "../services/recipeApi";

import Loading from "../components/Loading";
import Error from "../components/Error";


function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

 useEffect(() => {
   async function loadInitialRecipes() {
     try {
       setLoading(true);
       setError(null);

       // Run 8 requests in parallel
       const results = await Promise.all(
         Array.from({ length: 8 }, () => getRandomRecipe()),
       );

       setRecipes(results);
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   }

   loadInitialRecipes();
 }, []);

 async function handleSearch(e) {
   e.preventDefault();

   try {
     setLoading(true);
     setError(null);
     setNotFound(false);

     const data = await searchRecipes(search);

     if (!data || data.length === 0) {
       setRecipes([]);
       setNotFound(true);
       return;
     }

     setRecipes(data);
   } catch (err) {
     setError(err.message);
   } finally {
     setLoading(false);
   }
 }
  return (
    <div className="container">
      <h3 style={{ marginBottom: "10px" }}>
        What Food Recipe Are You Looking For?, Search Below 👇
      </h3>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />

      {loading && <Loading />}

      {error && <Error message={error} />}

      {notFound && (
        <div className="not-found">
          <h2>🍽️ Recipe Not Found</h2>
          <p>Try searching for something like "chicken", "pasta", or "rice".</p>
        </div>
      )}

      <div className="recipes">
        {recipes.length > 0
          ? recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          : !loading && !error && <p></p>}
      </div>
    </div>
  );
}

export default Home;
