import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {
  
   const [products, setProducts] = useState([]);

  useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=50").then((res) => {
            setProducts(res.data);
        });
    }, []);

  return (
    <>
      
      <h1>AXIOS</h1>
      <ul> 
       {products.map((p) => (
        <li>{p.title}</li>  
       ))}
      </ul> 
    </>  
  )
}

export default App;
