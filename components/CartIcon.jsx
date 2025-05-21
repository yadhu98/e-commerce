import React from 'react';
import { Link } from 'react-router-dom';

function CartIcon({ cartCount }) {
    console.log(cartCount)
  return (
    <Link to="/cart" className="relative flex items-center">
      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h2l3.4 7.6-1.4 2.5c-.2.4 0 .9.4 1.1.7.4 1.6.6 2.6.6h8c.6 0 1-.4 1-1s-.4-1-1-1h-7.6l1.2-2.2h6.4c.4 0 .8-.2 1-.5l3.6-6.5c.3-.5.1-1.2-.4-1.5-.5-.3-1.2-.1-1.5.4l-3.2 5.8h-6.2L6.8 4H4c-.6 0-1 .4-1 1s.4 1 1 1zm16 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
      <span className="ml-1 text-primary">Cart</span>
      {cartCount > 0 && (
        <span className="absolute -top-2 -left-1 bg-blue-800 text-white rounded-full px-2 text-xs">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;