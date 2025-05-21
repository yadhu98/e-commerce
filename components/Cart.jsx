import React from 'react';
import DeleteIcon from './DeleteIcon';

function Cart({ cartItems, updateQuantity, removeItem }) {

function totalPrice(price,quantity){
    return Math.round(price * quantity)
}

const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border p-4 rounded-lg bg-white">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price.toFixed(2)}/-</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <span className='text-lg font-semibold'>Total : ₹{item.price.toFixed(2)} X {item.quantity} = ₹{totalPrice(item.price.toFixed(2),item.quantity)} </span>
              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 text-secondary hover:text-red-700"
              >
                <DeleteIcon/>
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </h2>
      </div>
      </>
      )}
    </div>
  );
}

export default Cart;