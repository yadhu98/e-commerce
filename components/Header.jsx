import React from 'react';
import CartIcon from './CartIcon';
import { Link } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <header className="bg-white text-black p-4 flex flex-col md:flex-row justify-between items-center shadow-md">
      <div className="flex items-center mb-2 md:mb-0">
        <img src="https://cdn11.bigcommerce.com/s-03842/images/stencil/1200w/qbol_web_logo_1577699469__78699.original.png?compression=lossy" alt="Bearing Market Logo" className="h-10" />
    <Link className='ml-10' to="/">Home</Link>

      </div>
      <div className="flex items-center mt-2 md:mt-0">
        
        <CartIcon cartCount={cartCount} />
      </div>
    </header>
  );
}

export default Header;