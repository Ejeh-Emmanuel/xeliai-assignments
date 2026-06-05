import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import HomePage from "./Pages/HomePage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import NotFoundPage from "./Pages/NotFoundPage";
import WatchlistPage
from "./Pages/WatchlistPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/movie/:id"
          element={<MovieDetailPage />}
        />

        <Route
          path="/watchlist"
          element={<WatchlistPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
