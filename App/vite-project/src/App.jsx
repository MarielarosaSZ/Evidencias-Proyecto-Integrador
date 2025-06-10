import React from 'react';

import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";
import './index.css';
import Stats from "./components/Stats";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import FilterSortControls from "./components/FilterSortControls";
import ProductCharts from "./components/ProductCharts"; // Nuevo componente para gráficos
import ExportButtons from "./components/ExportButtons"; // Nuevo componente para exportación



function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showStats, setShowStats] = useState(true); // no pude repetirlo en el boton de modo oscuro
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none"); 
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(10); 

  const appRef = useRef(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://dummyjson.com/products?limit=100");
        setProducts(res.data.products);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Hubo un error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Modo oscuro simple (usando useRef para manipular el DOM directamente)
  const toggleDarkMode = () => {
    if (appRef.current) {
      appRef.current.classList.toggle("dark");
    }
  };

  // Filtrado y ordenamiento de productos
  const filteredAndSortedProducts = useMemo(() => {
    let currentProducts = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (categoryFilter !== "all") {
      currentProducts = currentProducts.filter(
        (p) => p.category === categoryFilter
      );
    }

    switch (sortBy) {
      case "price-asc":
        currentProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        currentProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating-asc":
        currentProducts.sort((a, b) => a.rating - b.rating);
        break;
      case "rating-desc":
        currentProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // No sort
        break;
    }
    return currentProducts;
  }, [products, search, categoryFilter, sortBy]);

  // Paginación
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

  // Cálculos para estadísticas
  const totalProducts = filteredAndSortedProducts.length;
  const maxProductPrice =
    totalProducts > 0 ? Math.max(...filteredAndSortedProducts.map((p) => p.price)) : 0;
  const minProductPrice =
    totalProducts > 0 ? Math.min(...filteredAndSortedProducts.map((p) => p.price)) : 0;
  const sumPrices = filteredAndSortedProducts.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = totalProducts > 0 ? sumPrices / totalProducts : 0;

  const maxStock =
    totalProducts > 0 ? Math.max(...filteredAndSortedProducts.map((p) => p.stock)) : 0;
  const minStock =
    totalProducts > 0 ? Math.min(...filteredAndSortedProducts.map((p) => p.stock)) : 0;
  const sumStock = filteredAndSortedProducts.reduce((sum, p) => sum + p.stock, 0);
  const avgStock = totalProducts > 0 ? sumStock / totalProducts : 0;

  const totalRating = filteredAndSortedProducts.reduce((sum, p) => sum + p.rating, 0);
  const avgRating = totalProducts > 0 ? totalRating / totalProducts : 0;

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((p) => p.category)),
    ].sort();
    return ["all", ...uniqueCategories];
  }, [products]);

  // Estadísticas avanzadas
  const productsByCategory = filteredAndSortedProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const productsWithHighStock = filteredAndSortedProducts.filter(
    (p) => p.stock > 50
  ).length;
  const productsWithHighRating = filteredAndSortedProducts.filter(
    (p) => p.rating > 4.5
  ).length;

  const avgPriceByCategory = useMemo(() => {
    const pricesByCategory = filteredAndSortedProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { sum: 0, count: 0 };
      }
      acc[product.category].sum += product.price;
      acc[product.category].count += 1;
      return acc;
    }, {});

    const result = {};
    for (const category in pricesByCategory) {
      result[category] = (
        pricesByCategory[category].sum / pricesByCategory[category].count
      ).toFixed(2);
    }
    return result;
  }, [filteredAndSortedProducts]);

  const mostExpensiveAndCheapestByCategory = useMemo(() => {
    const result = {};
    filteredAndSortedProducts.forEach(product => {
      if (!result[product.category]) {
        result[product.category] = {
          mostExpensive: product,
          cheapest: product,
        };
      } else {
        if (product.price > result[product.category].mostExpensive.price) {
          result[product.category].mostExpensive = product;
        }
        if (product.price < result[product.category].cheapest.price) {
          result[product.category].cheapest = product;
        }
      }
    });
    return result;
  }, [filteredAndSortedProducts]);

  const avgRatingByCategory = useMemo(() => {
    const ratingsByCategory = filteredAndSortedProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { sum: 0, count: 0 };
      }
      acc[product.category].sum += product.rating;
      acc[product.category].count += 1;
      return acc;
    }, {});

    const result = {};
    for (const category in ratingsByCategory) {
      result[category] = (
        ratingsByCategory[category].sum / ratingsByCategory[category].count
      ).toFixed(2);
    }
    return result;
  }, [filteredAndSortedProducts]);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div
      ref={appRef}
      className="min-h-screen bg-blue-600  font-sans p-4 md:p-8 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100"
    >
      <h1 className="text-4xl font-black text-orange-700 text-center mb-8 dark:text-green-500">
        CATÁLOGOS DE PRODUCTOS
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={toggleDarkMode}
          className="bg-gray-700 hover:bg-gray-600  font-bold py-2 px-4 rounded focus:outline-none 
          focus:shadow-outline dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          Modo Oscuro/Claro 
        </button> 
        
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <FilterSortControls
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="flex justify-center my-6">
        <button
          onClick={() => setShowStats(!showStats)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          {showStats ? "Ocultar Estadísticas" : "Mostrar Estadísticas"}
        </button>
      </div>

      {showStats && (
        <div className="bg-green-200 p-6 rounded-lg shadow-xl border border-blue-200 max-w-3xl mx-auto mt-8 dark:bg-gray-800 dark:border-gray-700">
          <Stats
            total={totalProducts}
            maxPrice={maxProductPrice}
            minPrice={minProductPrice}
            avgPrice={avgPrice.toFixed(2)}
            maxStock={maxStock}
            minStock={minStock}
            avgStock={avgStock.toFixed(0)}
            avgRating={avgRating.toFixed(2)}
            productsByCategory={productsByCategory}
            productsWithHighStock={productsWithHighStock}
            productsWithHighRating={productsWithHighRating}
            avgPriceByCategory={avgPriceByCategory}
            mostExpensiveAndCheapestByCategory={mostExpensiveAndCheapestByCategory}
            avgRatingByCategory={avgRatingByCategory}
          />
        </div>
      )}

      {loading && (
        <p className="text-center text-xl text-yellow-300 mt-8">Cargando productos...</p>
      )}

      {error && (
        <p className="text-center text-xl text-red-500 mt-8">{error}</p>
      )}

      {!loading && !error && (
        <>
          <ExportButtons products={filteredAndSortedProducts} />

          <ProductCharts products={filteredAndSortedProducts} />

          {currentProducts.length > 0 ? (
            <ProductList products={currentProducts} />
          ) : (
            <p className="text-center text-xl text-yellow-300 mt-8">
              No hay productos que coincidan con tu búsqueda o filtros.
            </p>
          )}

          {/* Paginación */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`py-2 px-4 rounded-lg font-bold ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-blue-300 text-blue-900 hover:bg-blue-400"
                } transition-colors duration-200`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;