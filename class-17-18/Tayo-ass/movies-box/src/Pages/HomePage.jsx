import { useEffect, useState } from "react";

import SearchBar from "../Components/SearchBar";
import MovieCard from "../Components/MovieCard";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import Pagination from "../Components/Pagination";

import { getPopularMovies, searchMovies } from "../Services/movieApi";
function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedGenre,
    setSelectedGenre] = useState("");

  const [selectedYear,
    setSelectedYear] = useState("");

    const [page, setPage] =
  useState(1);

  async function fetchPopularMovies() {
    try {
      setLoading(true);

      const data =
        await getPopularMovies();

      setMovies(data.results);
    } catch {
      setError(
        "Failed to load movies"
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredMovies =
  movies.filter((movie) => {

    const genreMatch =
      !selectedGenre ||
      movie.genre_ids.includes(
        Number(selectedGenre)
      );

    const yearMatch =
      !selectedYear ||
      movie.release_date.startsWith(
        selectedYear
      );

    return (
      genreMatch &&
      yearMatch
    );
  });

  async function handleSearch(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await searchMovies(
          searchTerm
        );

      setMovies(data.results);
    } catch {
      setError(
        "Search failed"
      );
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
  fetchPopularMovies();
}, [page]);

  useEffect(() => {
  function handleScroll() {
    if (
      window.innerHeight +
      window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setPage((prev) => prev + 1);
    }
  }

  window.addEventListener(
    "scroll",
    handleScroll
  );

  return () =>
    window.removeEventListener(
      "scroll",
      handleScroll
    );
}, []);

  useEffect(() => {
    // call async fetch inside effect to avoid setting state synchronously in the effect body
    (async () => {
      await fetchPopularMovies();
    })();
  }, []);

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      {loading && <Loading />}

      {error && (
        <ErrorMessage
          message={error}
        />
      )}

      <div className="movie-grid">
        {
  filteredMovies.map((movie) => (
    <MovieCard
      key={movie.id}
      movie={movie}
    />
  ))
}
      </div>

      <Pagination
  page={page}
  setPage={setPage}
/>
    </div>
  );
}

export default HomePage;