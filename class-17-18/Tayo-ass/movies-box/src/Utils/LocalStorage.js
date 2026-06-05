export function getWatchlist() {
  return JSON.parse(
    localStorage.getItem("watchlist")
  ) || [];
}

export function saveWatchlist(movies) {
  localStorage.setItem(
    "watchlist",
    JSON.stringify(movies)
  );
}