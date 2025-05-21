import React from 'react';
import Cart from '../components/Cart';

function CartPage({ cartItems, updateQuantity, removeItem }) {
  return <Cart cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />;
}

export default CartPage;