import { Routes, Route } from "react-router-dom";
import './App.css';
import CountryPage from "./Pages/CountryPage";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import NavBar from "./Component/NavBar";
import  AboutPage from "./Pages/AboutPage";






function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/country/:name" element={<CountryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;