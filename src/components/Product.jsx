import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./product.css";

export default function Product() {
  const { user, products, setProducts, cart, setCart } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    if (user && user.token) {
      console.log("Fetching products with token:", user.token);
      try {
        const res = await axios.get(`${API}/products/all`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProducts(res.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access - possibly invalid or expired token.");
        } else {
          console.error("Error fetching products:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (user && user.token) {
      fetchProducts();
    } else {
      setProducts([]); // Clear products if not logged in
    }
  }, [user]);

  const addToCart = (id) => {
    setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  };

  if (!user || !user.token) {
    return <div>Please login to see products.</div>;
  }

  return (
    <div className="product-container">
      <h3>Welcome {user.name}! </h3>
      <div className="App-Product-Row">
        {products &&
          products.map((value) => (
            <div key={value._id} className="product-box">
              <h3>{value.name}</h3>
              <h4>{value.price}</h4>
              <button onClick={() => addToCart(value._id)}>Add to Cart</button>
            </div>
          ))}
      </div>
    </div>
  );
}
