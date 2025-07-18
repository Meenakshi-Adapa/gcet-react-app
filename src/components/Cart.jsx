import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
const Navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    setOrderValue(
      products.reduce((sum, value) => {
        return sum + value.price * (cart[value.pid] ?? 0);
      }, 0)
    );
  }, [cart, products]);

  const increment = (id) => {
    setCart({...cart,[id]:(cart[id] || 0) + 1})
  };
  const decrement = (id) => {
    if (cart[id] > 1) {
      setCart({...cart,[id]:cart[id]-1})
    } else {
      const newCart = {...cart};
      delete newCart[id];
      setCart(newCart);
    }
  };

  const placeOrder = async () => {
    const url = `${API}/orders/new`;
    await axios.post(url, { email: user.email, orderValue: orderValue });
    setCart({});
    Navigate("/order")
  };

  const loginToOrder = () => {
    Navigate("/login")
  }
  return (
    <div className="cart-container">
      My Cart
      {products &&
      products.map(
        (value) =>
          cart[value._id] && (
            <div key={value._id} className="cart-item">
              <span className="cart-item-name">{value.name}</span>
              <span className="cart-item-price">${value.price.toFixed(2)}</span>
              <div className="cart-item-quantity">
                <button onClick={() => decrement(value._id)}>-</button>
                <span>{cart[value._id]}</span>
                <button onClick={() => increment(value._id)}>+</button>
              </div>
              <span className="cart-item-total">${(value.price * cart[value._id]).toFixed(2)}</span>
            </div>
          )
      )}
      <hr />
      <h3 className="cart-total">Order Value:{orderValue}</h3>
      <hr />
      <div className="cart-actions">
        {user.name ? (
          <button onClick={placeOrder}>Place Order</button>
        ) : (
          <button onClick={loginToOrder}>Login to Order</button>
        )}
      </div>
      <hr />
    </div>
  );
}
