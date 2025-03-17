"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaStar, FaEye, FaBolt } from 'react-icons/fa';

const ProductCardDos = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Si no se proporciona un producto, usar datos por defecto
  const {
    id = '1',
    name = 'ASUS ROG Strix G15',
    category = 'Gaming Laptop',
    price = 1299.99,
    originalPrice = 1499.99,
    image = './img/omenmax.png',
    specs = {
      processor: 'Intel Core i7',
      gpu: 'RTX 3070',
      ram: '16GB DDR4',
      storage: '1TB SSD'
    },
    discount = 13,
    isNew = true,
    rating = 4.5,
    reviewCount = 120,
    inStock = true
  } = product || {};

  return (
    <div 
      className="group relative bg-gray-900 border border-gray-800 hover:border-red-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Descuento tag */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discount}%
        </div>
      )}
      
      {/* New tag */}
      {isNew && (
        <div className="absolute top-3 right-3 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
          NUEVO
        </div>
      )}
      
      {/* Imagen */}
      <div className="relative h-56 w-full bg-gray-800 overflow-hidden">
        <Link href={`/producto/${id}`}>
          <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
            <Image
              src={image}
              alt={name}
              fill
              style={{ objectFit: 'contain' }}
              className="p-4"
            />
          </div>
        </Link>
        
        {/* Acciones overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm py-3 px-4 transform transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex justify-between items-center">
            <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
              <FaShoppingCart size={14} />
              <span>Añadir Al Carrito</span>
            </button>
            
            <div className="flex gap-2">
              <button className="bg-gray-800 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors">
                <FaHeart size={16} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors">
                <FaEye size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Información del producto */}
      <div className="p-4 space-y-2">
        <Link href={`/producto/${id}`}>
          <h3 className="font-semibold text-white hover:text-red-500 transition-colors line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1">
          <div className="text-yellow-500 flex items-center gap-1">
            <FaStar size={14} />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          <div className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">
            {specs.processor}
          </div>
          <div className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">
            {specs.gpu}
          </div>
          <div className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">
            {specs.ram}
          </div>
        </div>
        
        <div className="flex justify-between items-end pt-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-white">${price}</span>
              {originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
              )}
            </div>
            
            {inStock ? (
              <div className="flex items-center gap-1 text-green-500 text-xs">
                <FaBolt />
                <span>En stock</span>
              </div>
            ) : (
              <div className="text-gray-500 text-xs">Agotado</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDos;