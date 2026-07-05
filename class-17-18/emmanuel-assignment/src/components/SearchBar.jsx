function SearchBar({ search, setSearch, onSearch }) {
  return (
    <form
      onSubmit={onSearch}
      className="w-full flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        placeholder="Search recipes by name or ingredient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          flex-1
          border
          border-gray-300
          bg-white
          rounded-xl
          px-4
          py-3
          text-gray-700
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-orange-400
          focus:border-orange-400
        "
      />

      <button
        type="submit"
        className="
          bg-orange-500
          hover:bg-orange-600
          text-white
          font-medium
          px-6
          py-3
          rounded-xl
          shadow-sm
          transition
          duration-200
          active:scale-95
          cursor-pointer
        "
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
