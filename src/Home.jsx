import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./App";
import axios from "axios";
import Product from "./Product";
import "./styles/home.css";

export default function Home() {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://gcet-node-app-mauve.vercel.app/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Welcome {user?.name || "Guest"}!</h2>
      <p>This is the main page of the store.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="product-container">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}


