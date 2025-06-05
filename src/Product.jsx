import React, { useContext } from "react";
import { AppContext } from "./App.jsx";
import "./styles/product.css"; // optional, for styling

export default function Product({ product }) {
  const { addToCart } = useContext(AppContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    // Redirect to cart or checkout page logic can be added here
    alert("Proceeding to buy now for " + product.name);
  };

  return (
    <div className="product-box">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <div className="product-buttons">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="buy-now-btn" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
