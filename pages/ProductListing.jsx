import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function ProductListing({ addToCart, cartItems, updateQuantity }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get('category') || '';

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        if (category) {
          setFilteredProducts(data.filter((product) => product.category.toLowerCase() === category));
        } else {
          setFilteredProducts(data);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [category]);

  const categories = [...new Set(products.map((product) => product.category))];

  const selectedCategory = category
    ? categories.find((cat) => cat.toLowerCase() === category) || 'All Products'
    : 'All Products';

  const getDescription = () => {
    if (!category) {
      return 'Discover our wide range of high-quality lubricants, adhesives, and bearings for all your industrial needs.';
    }
    switch (selectedCategory.toLowerCase()) {
      case 'shell lubricants':
        return `Explore the high-flying world of ${selectedCategory}, where aviation excellence meets uncompromising quality and reliability.`;
      case 'kluber products':
        return `Experience the durability of ${selectedCategory}, designed for high-load applications with superior performance.`;
      case 'loctite products':
        return `Secure your applications with ${selectedCategory}, offering reliable adhesives and sealants for various industries.`;
      case 'dow corning products':
        return `Enhance your operations with ${selectedCategory}, providing top-tier silicone solutions for sealing and lubrication.`;
      case 'skf bearings':
        return `Power your machinery with ${selectedCategory}, delivering robust bearings for heavy-duty applications.`;
      default:
        return `Browse our selection of ${selectedCategory} to find the perfect solution for your needs.`;
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        <div className="w-full md:w-1/4 pr-0 md:pr-4">
          <h2 className="text-lg font-semibold mb-2 sm:text-xl">
            {category ? selectedCategory : 'Categories'}
          </h2>
          <ul className="text-sm sm:text-base">
            {categories.map((cat) => (
              <li key={cat} className="mb-1">
                <Link
                  to={`/products?category=${cat.toLowerCase()}`}
                  className={`hover:text-primary ${
                    category === cat.toLowerCase() ? 'text-primary font-semibold' : ''
                  }`}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          <h1 className="text-2xl font-bold mb-4 sm:text-3xl lg:text-4xl">
            {category ? selectedCategory : 'All Products'}
          </h1>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            {getDescription()}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                cartItems={cartItems}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;