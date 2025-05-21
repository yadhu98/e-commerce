import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MegaMenu() {
  const [menuCategories, setMenuCategories] = useState({
    "Adhesives & Lubricants": [],
    "Bearings": [],
    "Power Transmission": [],
    "Maintenance Tools": [],
    "Oil Seals": [],
    "Brands": [],
    "Housings and Inserts": [],
    "Linear": [],
    "Super Precision": [],
    "Spherical Plains": []
  });

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((products) => {
        const adhesivesAndLubricants = [
          "Shell Lubricants",
          "Kluber Products",
          "Dow Corning Products",
          "Loctite Products"
        ];
        const bearings = ["SKF Bearings"];
        const powerTransmission = ["Power Transmission"];
        const maintenanceTools = ["Maintenance Tools"];
        const oilSeals = ["Oil Seals"];

        const adhesivesSubcategories = products
          .filter((product) => adhesivesAndLubricants.includes(product.category))
          .map((product) => ({
            category: product.category,
            subcategory: product.subcategory
          }))
          .reduce((acc, { category, subcategory }) => {
            if (!acc.find((item) => item.subcategory === subcategory)) {
              acc.push({ category, subcategory });
            }
            return acc;
          }, []);

        const bearingsSubcategories = products
          .filter((product) => bearings.includes(product.category))
          .map((product) => ({
            category: product.category,
            subcategory: product.subcategory
          }))
          .reduce((acc, { category, subcategory }) => {
            if (!acc.find((item) => item.subcategory === subcategory)) {
              acc.push({ category, subcategory });
            }
            return acc;
          }, []);

        const powerTransmissionSubcategories = products
          .filter((product) => powerTransmission.includes(product.category))
          .map((product) => ({
            category: product.category,
            subcategory: product.subcategory
          }))
          .reduce((acc, { category, subcategory }) => {
            if (!acc.find((item) => item.subcategory === subcategory)) {
              acc.push({ category, subcategory });
            }
            return acc;
          }, []);

        const maintenanceToolsSubcategories = products
          .filter((product) => maintenanceTools.includes(product.category))
          .map((product) => ({
            category: product.category,
            subcategory: product.subcategory
          }))
          .reduce((acc, { category, subcategory }) => {
            if (!acc.find((item) => item.subcategory === subcategory)) {
              acc.push({ category, subcategory });
            }
            return acc;
          }, []);

        const oilSealsSubcategories = products
          .filter((product) => oilSeals.includes(product.category))
          .map((product) => ({
            category: product.category,
            subcategory: product.subcategory
          }))
          .reduce((acc, { category, subcategory }) => {
            if (!acc.find((item) => item.subcategory === subcategory)) {
              acc.push({ category, subcategory });
            }
            return acc;
          }, []);

        fetch('/category.json')
          .then((response) => response.json())
          .then((categoriesData) => {
            const brands = categoriesData.map((category) => category.name);

            setMenuCategories((prev) => ({
              ...prev,
              "Adhesives & Lubricants": adhesivesSubcategories,
              "Bearings": bearingsSubcategories,
              "Power Transmission": powerTransmissionSubcategories,
              "Maintenance Tools": maintenanceToolsSubcategories,
              "Oil Seals": oilSealsSubcategories,
              "Brands": brands
            }));
          })
          .catch((error) => console.error('Error fetching category.json:', error));
      })
      .catch((error) => console.error('Error fetching products.json:', error));
  }, []);

  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
        {Object.keys(menuCategories).map((category) => (
          <div key={category} className="relative group">
            <button className="px-4 py-2 font-semibold hover:bg-blue-800 hover:text-white">
              {category} <span className="ml-1">▼</span>
            </button>
            {menuCategories[category].length > 0 && (
              <div className="absolute hidden group-hover:block bg-white text-gray-800 w-48 z-10 shadow-lg rounded-md">
                {menuCategories[category].map((item) => {
                  const displayText = typeof item === 'string' ? item : item.subcategory;
                  const linkPath =
                    typeof item === 'string'
                      ? `/products?category=${item.toLowerCase()}`
                      : `/products?category=${item.category.toLowerCase()}`;

                  return (
                    <Link
                      key={displayText}
                      to={linkPath}
                      className="block py-2 px-4 hover:text-primary hover:bg-blue-100"
                    >
                      {displayText}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default MegaMenu;