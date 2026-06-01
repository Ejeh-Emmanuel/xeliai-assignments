import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";
import ShoppingList from "./pages/ShoppingList";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/recipe/:id" element={<RecipeDetail />} />

        <Route path="/favourites" element={<Favourites />} />

        <Route path="/shopping-list" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;
