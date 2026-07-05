function FilterBar({ selectedDiet, setSelectedDiet, onRandom }) {
  return (
    <div className="flex gap-4 items-center">
      <select
        value={selectedDiet}
        onChange={(e) => setSelectedDiet(e.target.value)}
        className="border px-3 py-2 rounded-lg"
      >
        <option value="">All Diets</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten Free</option>
      </select>

      <button
        onClick={onRandom}
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
      >
        🎲 Random
      </button>
    </div>
  );
}

export default FilterBar;
