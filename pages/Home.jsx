import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/category.json')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4 sm:text-4xl lg:text-5xl">Welcome to Bearing Market</h1>
      <p className="text-gray-600 mb-8 text-base sm:text-lg">
        Explore our range of high-quality bearings and lubricants. Find the perfect solution for your industrial needs.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold sm:text-xl text-center">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;