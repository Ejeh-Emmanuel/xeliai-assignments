import { getWatchlist, saveWatchlist }
from "../Utils/LocalStorage";

function WatchlistButton({ movie }) {
  const addToWatchlist = () => {
    const watchlist = getWatchlist();

    const exists = watchlist.find(
      (item) => item.id === movie.id
    );

    if (!exists) {
      watchlist.push(movie);
      saveWatchlist(watchlist);
    }
  };

  return (
    <button onClick={addToWatchlist}>
      Add to Watchlist
    </button>
  );
}

export default WatchlistButton;