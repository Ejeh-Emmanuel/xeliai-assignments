import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";
import ShoppingList from "./pages/ShoppingList";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR GLOBAL */}
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
