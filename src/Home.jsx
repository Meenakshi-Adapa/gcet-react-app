import React, { useState, useEffect } from 'react';
import './styles/home.css';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/product')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>This is the main page of the store.</p>
      <div className="product-container">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-box">
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
