// src/Product.jsx
import React from "react";
import "./styles/product.css"; // optional, for styling

export default function Product({ product }) {
  return (
    <div className="product-box">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
    </div>
  );
}