import axios from "axios";
import { useEffect, useState } from "react";
import Stats from "./components/Stats";

function App() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(true);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=50").then((res) => {
            setProducts(res.data.products)
            .catch(err => console.error(err));

        });
    }, []);

    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

    const totalProducts = filteredProducts.length;
    const maxProduct = Math.max(...filteredProducts.map((p) => p.price));
    const minProduct = Math.min(...filteredProducts.map((p) => p.price));
    const maxStock = Math.max(...filteredProducts.map((p) => p.stock));
    const minStock = Math.min(...filteredProducts.map((p) => p.stock));


    return (
        
        
        <div className="min-h-screen bg-blue-800 font-arial p-4 md:p-8">
            
            <h1 className="text-4xl font-extrabold text-green-700 text-center mb-8">
                Catálogo de Productos
            </h1>

        
            <h1>Axios</h1>

        
            <input
                type="text"
                placeholder="Buscar producto"
                                className="w-1/2 p-5 border border-blue-800 rounded-lg mb-6
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-yelow mx-auto"

                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {filteredProducts.map(p => (
            <div key={p.id} className="border p-4 rounded shadow">
                <p>Cantidad en Stock = {p.stock}
                </p>
                <p className="font-bold">Producto {p.title}</p>
                <p>Precio ${p.price}</p>
            </div>
            ))}
             </div>
            

           

            <button onClick={() => setShow(!show)}>{show ? "Ocultar" : "Mostrar"}</button>

          
            {show && (<div
               
                className="bg-green-200 p-6 rounded-lg shadow-xl border border-blue-200
                           max-w-3xl mx-auto mt-8" 
            >
            <Stats total={totalProducts} max={maxProduct} min={minProduct} maxs={maxStock} mins={minStock}/>
            </div>
            )}
            {filteredProducts.length === 0 && <div> No se encontraron productos </div>}
        </div>
    );
}

export default App;
