import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import Cart from './Cart.jsx';
import Login from './Login.jsx';
import SignIn from './SignIn.jsx';
import './App.css';

// ✅ Create and export context
export const AppContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'Guest' });

  return (
    <div>
      <AppContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;

