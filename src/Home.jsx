import React, { useState, useEffect } from 'react';
import './styles/home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://gcet-node-app-mauve.vercel.app/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

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
