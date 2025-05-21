import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, addToCart, cartItems, updateQuantity }) {
  const cartItem = cartItems?.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  console.log("product",product.inStock)

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
    <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
      </Link>
          <div className="mt-4">
        <Link to={`/product/${product.id}`}>
          <h2 className="text-lg font-semibold hover:text-primary">{product.name}</h2>
        </Link>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        <p className="text-lg font-bold mt-2">₹{product.price.toFixed(2)}</p>
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="mt-4 bg-blue-900  text-white px-4 py-2 rounded hover:bg-black w-full disabled:opacity-50"
          >
            {
                !product.inStock ? 'Out of Stock' : ' Add to Cart'
            }
          </button>
        ) : (
          
          <div className="mt-4 flex items-center justify-center space-x-2">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 bg-blue-800 text-white rounded hover:bg-gray-300 disabled:opacity-50"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 bg-blue-800 text-white rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
          
          
        )}
      </div>
    </div>
  );
}

export default ProductCard;