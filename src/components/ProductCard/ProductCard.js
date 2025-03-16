"use client";

import React, { useState } from 'react';
import { FaShoppingCart, FaFire } from 'react-icons/fa';
import Image from 'next/image';

const ProductCard = ({ product }) => {
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
  } = product || {};

  return (
    <div 
      className={`relative flex flex-col md:flex-row rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-red-500/10 shadow-xl transition-all duration-300 ${
        isHovered ? 'transform md:translate-y-[-5px] shadow-red-500/20' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges / Etiquetas */}
      <div className="absolute top-3 left-3 z-30 flex flex-col gap-2">
        {discount > 0 && (
          <span className="px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-md">
            -{discount}%
          </span>
        )}
        {isNew && (
          <span className="px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-md">
            NEW
          </span>
        )}
      </div>

      {/* Sección de imagen */}
      <div className="relative md:w-2/5 h-[200px] md:h-auto flex items-center justify-center bg-gradient-to-r from-zinc-800 to-zinc-900 p-4 overflow-visible">
        <div className={`relative w-full h-full transition-all duration-500 ${
          isHovered ? 'scale-110 rotate-2' : 'scale-100'
        }`}>
          {/* La imagen está contenida en un div que puede desbordarse */}
          <div className="absolute inset-0 flex items-center justify-center md:-left-8">
            <Image 
              src={image} 
              alt={name}
              width={350}
              height={250}
              className="object-contain w-full h-full drop-shadow-[0_10px_10px_rgba(255,0,0,0.2)]"
            />
          </div>
        </div>
      </div>

      {/* Contenido / Información */}
      <div className="flex-1 flex flex-col justify-between p-5 bg-zinc-900">
        {/* Encabezado */}
        <div>
          <span className="block text-xs font-medium text-red-500 uppercase tracking-wider mb-1">
            {category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2">
            {name}
          </h3>
          
          {/* Especificaciones */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-xs text-zinc-400">CPU:</span>
              <span className="text-xs text-white font-semibold">{specs.processor}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-zinc-400">GPU:</span>
              <span className="text-xs text-white font-semibold">{specs.gpu}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-zinc-400">RAM:</span>
              <span className="text-xs text-white font-semibold">{specs.ram}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-zinc-400">SSD:</span>
              <span className="text-xs text-white font-semibold">{specs.storage}</span>
            </div>
          </div>
        </div>
        
        {/* Footer con precio y botón */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-3">
          <div className="flex items-baseline gap-2">
            {originalPrice > price && (
              <span className="text-sm text-zinc-500 line-through">
                ${originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-white">
              ${price}
            </span>
          </div>
          
          <button className={`group flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${
            isHovered ? 'shadow-lg shadow-red-600/30' : ''
          }`}>
            <FaShoppingCart className="text-sm" />
            <span className="text-sm">Añadir al carrito</span>
          </button>
        </div>
      </div>

      {/* Hot Deal Badge */}
      {discount >= 10 && (
        <div className="absolute -top-2 right-5 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold py-1 px-3 rounded-b-lg flex items-center gap-1 shadow-lg">
          <FaFire className="text-yellow-300" />
          <span>HOT</span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
