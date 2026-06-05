const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  "https://api.themoviedb.org/3";

export async function getPopularMovies(
  page = 1
) {
  const response =
    await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );

  return response.json();
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  return response.json();
}

export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );

  return response.json();
}