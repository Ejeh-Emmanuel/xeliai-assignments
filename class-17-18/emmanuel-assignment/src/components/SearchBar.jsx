function SearchBar({ search, setSearch, onSearch }) {
  return (
    <form onSubmit={onSearch} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
