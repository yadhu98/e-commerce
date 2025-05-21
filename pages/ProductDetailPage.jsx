import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

function ProductDetailPage({ addToCart, cartItems, updateQuantity,removeItem }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  return (
    <div className="container">
      <ProductDetail product={product} addToCart={addToCart} cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem}/>
    </div>
  );
}

export default ProductDetailPage;