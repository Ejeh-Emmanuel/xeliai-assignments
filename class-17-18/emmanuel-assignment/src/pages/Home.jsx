import { useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import RecipeCard from "../components/RecipeCard";
import { useEffect } from "react";
import { getRandomRecipe, searchRecipes } from "../services/recipeApi";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import Error from "../components/Error";


function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);



async function loadInitialRecipes() {
  try {
    setLoading(true);
    setError(null);
    setNotFound(false);

    const results = await Promise.all(
      Array.from({ length: 20 }, () => getRandomRecipe()),
    );

    // REMOVE DUPLICATES
    const unique = Array.from(
      new Map(results.map((r) => [r.idMeal, r])).values(),
    );

    setRecipes(unique);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

 useEffect(() => {
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
   <div className="min-h-screen bg-gray-50">

     {/* HERO SECTION */}
     <div className="text-center py-10 px-4">
       <h1 className="text-4xl font-bold text-gray-800">
         Discover Delicious Recipes 🍽️
       </h1>

       <p className="text-gray-500 mt-2">
         Search, explore and save your favorite meals below 👇
       </p>
     </div>

     {/* SEARCH + FILTER SECTION */}
     <div className="max-w-7xl mx-auto px-4 space-y-6">
       <SearchBar
         search={search}
         setSearch={setSearch}
         onSearch={handleSearch}
       />

       <FilterBar
         selectedDiet={selectedDiet}
         setSelectedDiet={setSelectedDiet}
         onRandom={loadInitialRecipes}
       />

       {/* STATES */}
       {loading && (
         <div className="flex justify-center py-10">
           <Loading />
         </div>
       )}

       {error && (
         <div className="text-center text-red-500 font-medium">
           <Error message={error} />
         </div>
       )}

       {notFound && (
         <div className="text-center text-gray-500 py-6">
           No recipes found. Try another search 🔍
         </div>
       )}
       {!loading && recipes.length === 0 && !notFound && (
         <div className="text-center text-gray-500 py-10">
           Start by searching for a recipe 🍜
         </div>
       )}

       {/* GRID */}
       {!loading && recipes.length > 0 && (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
           {recipes.map((recipe) => (
             <RecipeCard key={recipe.idMeal} recipe={recipe} />
           ))}
         </div>
       )}
     </div>
   </div>
 );
}

export default Home;
