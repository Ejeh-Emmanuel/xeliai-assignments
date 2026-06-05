function YearFilter({
  selectedYear,
  setSelectedYear,
}) {
  return (
    <input
      type="number"
      placeholder="Year"
      value={selectedYear}
      onChange={(e) =>
        setSelectedYear(e.target.value)
      }
    />
  );
}

export default YearFilter;