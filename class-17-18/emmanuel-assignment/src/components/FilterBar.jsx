function FilterBar({ selectedDiet, setSelectedDiet }) {
  return (
    <select
      value={selectedDiet}
      onChange={(e) => setSelectedDiet(e.target.value)}
    >
      <option value="">All Diets</option>

      <option value="vegetarian">Vegetarian</option>

      <option value="vegan">Vegan</option>

      <option value="gluten-free">Gluten Free</option>
    </select>
  );
}

export default FilterBar;
