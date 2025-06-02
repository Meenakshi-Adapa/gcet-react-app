import React from 'react';
import { Link } from 'react-router-dom';
import Home from './Home.jsx';
export default function Header() {
  return (
    <div className="header-body">
      <h1 className="header-title">My Online Shopping Store</h1>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', padding: 0 }}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signIn">SignIn</Link></li>
      </ul>
    </div>
  );
}
