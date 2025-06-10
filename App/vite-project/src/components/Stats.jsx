function Stats({
  total,
  maxPrice,
  minPrice,
  avgPrice,
  maxStock,
  minStock,
  avgStock,
  avgRating,
  productsByCategory,
  productsWithHighStock,
  productsWithHighRating,
  avgPriceByCategory,
  mostExpensiveAndCheapestByCategory,
  avgRatingByCategory,
}) {
  return (
    <div className="text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-700 dark:text-blue-400">
        Estadísticas del Catálogo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">Generales</h3>
          <p>
            <span className="font-medium">Productos totales:</span> {total}
          </p>
          <p>
            <span className="font-medium">Precio promedio:</span> ${avgPrice}
          </p>
          <p>
            <span className="font-medium">Precio máximo:</span> ${maxPrice}
          </p>
          <p>
            <span className="font-medium">Precio mínimo:</span> ${minPrice}
          </p>
          <p>
            <span className="font-medium">Stock promedio:</span> {avgStock}
          </p>
          <p>
            <span className="font-medium">Stock máximo:</span> {maxStock}
          </p>
          <p>
            <span className="font-medium">Stock mínimo:</span> {minStock}
          </p>
          <p>
            <span className="font-medium">Rating promedio:</span> {avgRating}
          </p>
          <p>
            <span className="font-medium">Productos con stock &gt; 50:</span> {productsWithHighStock}
          </p>
          <p>
            <span className="font-medium">Productos con rating &gt; 4.5:</span> {productsWithHighRating}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">Por Categoría</h3>
          <h4 className="font-semibold mt-2">Cantidad de productos:</h4>
          <ul className="list-disc list-inside ml-4">
            {Object.entries(productsByCategory).map(([category, count]) => (
              <li key={category}>
                {category}: {count}
              </li>
            ))}
          </ul>

          <h4 className="font-semibold mt-2">Precio promedio:</h4>
          <ul className="list-disc list-inside ml-4">
            {Object.entries(avgPriceByCategory).map(([category, avg]) => (
              <li key={category}>
                {category}: ${avg}
              </li>
            ))}
          </ul>

          <h4 className="font-semibold mt-2">Producto más caro y más barato:</h4>
          <ul className="list-disc list-inside ml-4">
            {Object.entries(mostExpensiveAndCheapestByCategory).map(([category, data]) => (
              <li key={category}>
                {category}: <br />
                <span className="ml-4">Más caro: {data.mostExpensive.title} (${data.mostExpensive.price})</span> <br />
                <span className="ml-4">Más barato: {data.cheapest.title} (${data.cheapest.price})</span>
              </li>
            ))}
          </ul>

          <h4 className="font-semibold mt-2">Promedio de rating:</h4>
          <ul className="list-disc list-inside ml-4">
            {Object.entries(avgRatingByCategory).map(([category, avg]) => (
              <li key={category}>
                {category}: {avg}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Stats;
