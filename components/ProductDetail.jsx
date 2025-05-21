import React from 'react';

function ProductDetail({ product, addToCart, cartItems, updateQuantity }) {
    if (!product) return <div className="text-center text-gray-600">Loading...</div>;
    const cartItem = cartItems.find((item) => item.id === product.id);
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

    return (
        <div className="
            bg-white rounded-xl shadow-lg flex flex-col lg:flex-row gap-8 p-4 sm:p-8 lg:p-12 max-w-full lg:max-w-6xl mx-auto my-8 min-h-[450px]">
            <div className=" flex-1 flex items-center justify-center bg-gray-50 rounded-lg p-4 sm:p-8 min-w-[220px] max-w-[400px] mx-auto lg:mx-0 ">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-[300px] h-auto object-contain"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-gray-700 text-sm sm:text-base mb-6">{product.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="text-2xl font-bold text-blue-900">
                            {product.currency || '₹'}{product.price.toFixed(2)}
                        </span>
                        <span className={product?.inStock ? "text-green-600 font-semibold text-sm" : "text-red-600 font-semibold text-sm"}>
                            {product?.inStock ? 'In stock' : 'Out of stock'}
                        </span>
                    </div>
                </div>
                {quantity === 0 ? (
                    <button
                        disabled={!product?.inStock}
                        onClick={handleAddToCart}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg text-lg transition disabled:opacity-30">
                        Add to Cart
                    </button>
                ) : (
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={handleDecrease}
                            className="w-10 h-10 border border-gray-300 rounded-lg text-xl font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span className="text-lg font-semibold">{quantity}</span>
                        <button
                            onClick={handleIncrease}
                            className="w-10 h-10 border border-gray-300 rounded-lg text-xl font-bold bg-white hover:bg-gray-100 transition">
                            +
                        </button>
                        <button
                            className="ml-0 lg:ml-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition flex-1 lg:flex-none">
                            Buy Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
