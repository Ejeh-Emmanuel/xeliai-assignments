import { Link } from "react-router-dom";
import WatchlistButton from "./WatchlistButton";
function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <h3>{movie.title}</h3>

        <p>
          Rating: {movie.vote_average}
        </p>

        <WatchlistButton movie={movie} />
      </div>
    </Link>
  );
}

export default MovieCard;