import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useEffect } from "react";
import axios from "axios";
import "./Order.css";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/orders/${user.email}`);
      setOrders(res.data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email) {
      fetchOrders();
    }
  }, [user.email]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  // Merge product details from products state into order products
  const mergeOrderProducts = (orderProducts) => {
    if (!orderProducts) return [];
    return orderProducts.map((op) => {
      const product = products.find((p) => p._id === op.productId);
      return {
        name: product ? product.name : "Unknown Product",
        quantity: op.quantity,
        price: product ? product.price : 0,
      };
    });
  };

  return (
    <div className="order-container">
      <h3>My Orders</h3>
      {orders && orders.length > 0 ? (
        <table className="order-table" border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>Order Value</th>
              <th>Date</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const mergedProducts = mergeOrderProducts(order.products);
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>₹{order.orderValue}</td>
                  <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : "N/A"}</td>
                  <td>
                    {mergedProducts.length > 0 ? (
                      <ul>
                        {mergedProducts.map((prod, index) => (
                          <li key={index}>
                            {prod.name} - Qty: {prod.quantity} - Price: ₹{prod.price}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No products"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
