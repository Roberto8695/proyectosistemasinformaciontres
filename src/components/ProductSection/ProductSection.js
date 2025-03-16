"use client";

import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { FaTrophy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductSection = () => {
  // Datos de ejemplo para los productos más vendidos
  const bestSellerProducts = [
    {
      id: '1',
      name: 'ASUS ROG Strix G15',
      category: 'Gaming Laptop',
      price: 1299.99,
      originalPrice: 1499.99,
      image: '/img/omenmax.png',
      specs: {
        processor: 'Intel Core i7',
        gpu: 'RTX 3070',
        ram: '16GB DDR4',
        storage: '1TB SSD'
      },
      discount: 13,
      isNew: true,
    },
    {
      id: '2',
      name: 'Lenovo Legion Pro 5',
      category: 'Gaming Laptop',
      price: 1199.99,
      originalPrice: 1399.99,
      image: '/img/omenmax.png',
      specs: {
        processor: 'AMD Ryzen 9',
        gpu: 'RTX 3060',
        ram: '32GB DDR4',
        storage: '1TB SSD'
      },
      discount: 14,
      isNew: false,
    },
    {
      id: '3',
      name: 'MSI Katana GF66',
      category: 'Gaming Laptop',
      price: 999.99,
      originalPrice: 1199.99,
      image: '/img/omenmax.png',
      specs: {
        processor: 'Intel Core i5',
        gpu: 'RTX 3050 Ti',
        ram: '16GB DDR4',
        storage: '512GB SSD'
      },
      discount: 16,
      isNew: false,
    },
    {
      id: '4',
      name: 'Acer Predator 300',
      category: 'Gaming Laptop',
      price: 1399.99,
      originalPrice: 1599.99,
      image: '/img/omenmax.png',
      specs: {
        processor: 'Intel Core i9',
        gpu: 'RTX 3080',
        ram: '32GB DDR5',
        storage: '2TB SSD'
      },
      discount: 12,
      isNew: true,
    }
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <FaTrophy className="text-red-500 text-3xl" />
            <h2 className="text-3xl md:text-4xl font-bold font-designer text-white">
              <span className="text-red-500 ">Productos</span> más vendidos
            </h2>
          </div>
          
          {/* Botones de navegación para futura implementación de carrusel */}
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-full bg-gray-800 hover:bg-red-600 text-white transition-colors duration-300">
              <FaChevronLeft />
            </button>
            <button className="p-3 rounded-full bg-gray-800 hover:bg-red-600 text-white transition-colors duration-300">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Línea separadora con gradiente */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mb-10"></div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {bestSellerProducts.map((product) => (
            <div key={product.id} className="transform transition-all duration-300 hover:scale-102">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Botón "Ver todos" */}
        <div className="flex justify-center mt-10">
          <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30">
            Ver todos los productos
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;