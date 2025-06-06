import React from "react";
import App, { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <div className="header-body">
      <h1 className="header-title">My Online Shop</h1>
      <ul className="header-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/order">Order</Link></li>
        <li>
          {(user.token || user.email) ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </div>
  );
}
