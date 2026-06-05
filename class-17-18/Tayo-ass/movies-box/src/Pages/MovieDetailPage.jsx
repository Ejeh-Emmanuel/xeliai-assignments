import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";

import { getMovieDetails } from "../Services/movieApi";

function MovieDetailPage() {
  const { id } = useParams();

  const [movie, setMovie] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  

  async function fetchMovie() {
    try {
      setLoading(true);

      const data =
        await getMovieDetails(id);

      setMovie(data);
    } catch {
      setError(
        "Failed to load movie"
      );
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchMovie();
  }, []);

  if (loading) return <Loading />;

  if (error)
    return (
      <ErrorMessage
        message={error}
      />
    );

  return (
    <div>
      <h1>{movie?.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        alt={movie?.title}
      />

      <p>{movie?.overview}</p>

      <p>
        Release Date:
        {movie?.release_date}
      </p>

      <p>
        Rating:
        {movie?.vote_average}
      </p>

      <h2>Cast</h2>

      {movie?.credits?.cast
        ?.slice(0, 5)
        .map((actor) => (
          <p key={actor.id}>
            {actor.name}
          </p>
        ))}
    </div>
  );
}

export default MovieDetailPage;