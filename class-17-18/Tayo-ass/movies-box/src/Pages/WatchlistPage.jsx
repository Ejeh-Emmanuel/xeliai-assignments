import { useState }
from "react";

import { getWatchlist }
from "../Utils/LocalStorage";

import MovieCard
from "../Components/MovieCard";

function WatchlistPage() {
  const [movies] = useState(getWatchlist());

  return (
    <div>
      <h1>My Watchlist</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

export default WatchlistPage;