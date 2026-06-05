import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import RecipeDetail from './Pages/RecipeDetail';
import Favorites from './Pages/Favorites';
import ShoppingList from './Pages/ShoppingList';
import './App.css'; // Your global styles

export default function App() {
  // Synchronize favorites with localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('recipe_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Synchronize shopping list with localStorage
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('recipe_shopping_list');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recipe_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('recipe_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Helper functions to manage state
  const toggleFavorite = (recipe) => {
    setFavorites(prev => 
      prev.some(fav => fav.id === recipe.id)
        ? prev.filter(fav => fav.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  const addToShoppingList = (ingredients) => {
    setShoppingList(prev => {
      // Avoid adding duplicate ingredient names
      const existingNames = prev.map(item => item.name.toLowerCase());
      const newIngredients = ingredients.filter(
        ing => !existingNames.includes(ing.name.toLowerCase())
      );
      return [...prev, ...newIngredients];
    });
  };

  const removeFromShoppingList = (index) => {
    setShoppingList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route 
            path="/recipe/:id" 
            element={
              <RecipeDetail 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
                addToShoppingList={addToShoppingList} 
              />
            } 
          />
          <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route 
            path="/shopping-list" 
            element={<ShoppingList shoppingList={shoppingList} removeFromShoppingList={removeFromShoppingList} />} 
          />
        </Routes>
      </main>
    </div>
  );
}