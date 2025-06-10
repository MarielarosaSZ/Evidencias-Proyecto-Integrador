function FilterSortControls({
  categories,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
      <div className="w-full md:w-auto">
        <label htmlFor="category-filter" className="block text-white text-sm font-bold mb-2 dark:text-gray-300">
          Filtrar por Categoría:
        </label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "Todas" : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-auto">
        <label htmlFor="sort-by" className="block text-white text-sm font-bold mb-2 dark:text-gray-300">
          Ordenar por:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        >
          <option value="none">Sin Orden</option>
          <option value="price-asc">Precio Ascendente</option>
          <option value="price-desc">Precio Descendente</option>
          <option value="rating-asc">Rating Ascendente</option>
          <option value="rating-desc">Rating Descendente</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSortControls;