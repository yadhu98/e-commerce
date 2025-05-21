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
    const newItems = [...cartItems];
    let found = false;

    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].id === product.id) {
        newItems[i] = { ...newItems[i], quantity: newItems[i].quantity + 1 };
        found = true;
        break;
      }
    }

    if (!found) {
      newItems.push({ ...product, quantity: 1 });
    }

    setCartItems(newItems);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    const newItems = [...cartItems];
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].id === id) {
        newItems[i] = { ...newItems[i], quantity };
        break;
      }
    }

    setCartItems(newItems);
  };

  const removeItem = (id) => {
    const newItems = [];
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id !== id) {
        newItems.push(cartItems[i]);
      }
    }
    setCartItems(newItems);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen">
        <Header cartCount={totalItems} />
        <MegaMenu />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <ProductListing
                  addToCart={addToCart}
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetailPage
                  addToCart={addToCart}
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              }
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