import React, { useContext, useMemo } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Calculate total order value
  const orderValue = useMemo(() => {
    return products.reduce((total, product) => {
      const qty = cart[product._id] || 0;
      return total + product.price * qty;
    }, 0);
  }, [cart, products]);

  // Increase quantity
  const increment = (id) => {
    setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 });
  };

  // Decrease quantity or remove from cart
  const decrement = (id) => {
    if (cart[id] > 1) {
      setCart({ ...cart, [id]: cart[id] - 1 });
    } else {
      const updatedCart = { ...cart };
      delete updatedCart[id];
      setCart(updatedCart);
    }
  };

  // Place the order
  const placeOrder = async () => {
    try {
      await axios.post(`${API}/orders/new`, {
        email: user.email,
        orderValue,
      });
      setCart({});
      navigate("/order");
    } catch (error) {
      console.error("Order error:", error);
      alert("Could not place order. Please try again.");
    }
  };

  const loginToOrder = () => {
    navigate("/login");
  };

  return (
    <div>
      <h2>My Cart</h2>
      <hr />
      {products
        .filter((p) => cart[p._id])
        .map((p) => (
          <div key={p._id}>
            {p.name} - ₹{p.price} -{" "}
            <button onClick={() => decrement(p._id)}>-</button>{" "}
            {cart[p._id]}{" "}
            <button onClick={() => increment(p._id)}>+</button> = ₹
            {p.price * cart[p._id]}
          </div>
        ))}
      <hr />
      <h3>Total: ₹{orderValue}</h3>
      <hr />
      {user?.name ? (
        <button onClick={placeOrder}>Place Order</button>
      ) : (
        <button onClick={loginToOrder}>Login to Order</button>
      )}
    </div>
  );
}
