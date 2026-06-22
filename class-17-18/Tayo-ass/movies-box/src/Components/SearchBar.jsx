function SearchBar({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;