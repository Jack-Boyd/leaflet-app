function FilterComponent({ setFilter }) {
  return (
    <div className="filter-container">
      <label htmlFor="filter">Filter by type:</label>
      <select id="filter" onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="restaurant">Restaurant</option>
        <option value="cafe">Cafe</option>
        <option value="fast_food">Fast Food</option>
        <option value="bar">Bar</option>
        <option value="pub">Pub</option>
      </select>
    </div>
  );
}

export default FilterComponent;
