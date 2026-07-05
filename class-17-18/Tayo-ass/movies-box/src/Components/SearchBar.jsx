function SearchBar({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) {
  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-center items-center gap-2 mt-6"
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="w-full max-w-md rounded-md border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;