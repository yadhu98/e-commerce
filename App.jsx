import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MegaMenu from './components/MegaMenu';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  console.log(cartItems)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  console.log(cartCount)

  return (
    <Router>
      <div className="min-h-screen">
        <Header cartCount={cartCount} />
        <MegaMenu />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/products" 
              element={<ProductListing addToCart={addToCart} cartItems={cartItems} updateQuantity={updateQuantity} />} 
            />
            <Route 
              path="/product/:id" 
              element={<ProductDetailPage addToCart={addToCart} cartItems={cartItems} updateQuantity={updateQuantity} />} 
            />
            <Route
              path="/cart"
              element={<CartPage cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />}
            />
            <Route path="/login" element={<div className="container">Login Page (Placeholder)</div>} />
            <Route path="/register" element={<div className="container">Register Page (Placeholder)</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;