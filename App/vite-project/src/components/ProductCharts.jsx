
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

function ProductCharts({ products }) {
  // Datos para el gráfico de barras (cantidad de productos por categoría)
  const productsByCategoryData = products.reduce((acc, product) => {
    const existingCategory = acc.find((item) => item.name === product.category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: product.category, value: 1 });
    }
    return acc;
  }, []);

  // Datos para el Pie Chart (proporción de productos según stock)
  const inStock = products.filter((p) => p.stock > 0).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const stockData = [
    { name: "Con Stock", value: inStock, color: "#82ca9d" },
    { name: "Sin Stock", value: outOfStock, color: "#ffc658" },
  ];

  // Datos para el gráfico de líneas (simulación de evolución de precios)
  // Para una evolución real, necesitarías datos históricos. Aquí, simulamos
  // ordenando por precio y tomando una muestra.
  const priceEvolutionData = products
    .sort((a, b) => a.price - b.price)
    .slice(0, 10) // Tomamos los primeros 10 productos ordenados por precio para simular
    .map((p, index) => ({
      name: p.title,
      price: p.price,
      index: index, // Para una visualización de evolución
    }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl mt-8 dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
        Visualización de Datos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Gráfico de barras: Cantidad de productos por categoría */}
        <div className="col-span-full md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Productos por Categoría
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productsByCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Proporción de productos según stock */}
        <div className="col-span-full md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Proporción de Stock
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de líneas: Evolución simulada de precios */}
        <div className="col-span-full md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Evolución Simulada de Precios
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceEvolutionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ProductCharts;