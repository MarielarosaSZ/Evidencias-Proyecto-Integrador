
function ProductItem({ product }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-700 dark:border-gray-600">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
        {product.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Precio:</span> ${product.price.toFixed(2)}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Categoría:</span> {product.category}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Stock:</span> {product.stock}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Rating:</span> {product.rating}
      </p>
    </div>
  );
}

export default ProductItem;
