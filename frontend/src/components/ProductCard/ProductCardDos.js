"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaStar, FaEye, FaBolt } from 'react-icons/fa';

const ProductCardDos = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Si no hay producto, no renderizar nada
  if (!product) return null;

  // Calcular descuento si hay precio de oferta
  const hasDiscount = product.precio_oferta && product.precio_oferta < product.precio;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.precio - product.precio_oferta) / product.precio) * 100) 
    : 0;

  // URL base para imágenes
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  // Formatear precio con separador de miles
  const formatPrice = (price) => {
    return price.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div 
      className="group relative bg-gray-900 border border-gray-800 hover:border-red-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Descuento tag */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPercentage}%
        </div>
      )}
      
      {/* Imagen */}
      <div className="relative h-56 w-full bg-gray-800 overflow-hidden">
        <Link href={`/producto/${product.id_producto}`}>
          <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
            {product.imagen ? (
              <div className="w-full h-full">
                <img
                  src={`${API_URL}${product.imagen}`}
                  alt={product.nombre}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                Sin imagen
              </div>
            )}
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
        <Link href={`/producto/${product.id_producto}`}>
          <h3 className="font-semibold text-white hover:text-red-500 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.nombre}
          </h3>
        </Link>
        
        {/* Descripción corta */}
        {product.descripcion && (
          <p className="text-sm text-gray-400 line-clamp-2">
            {product.descripcion}
          </p>
        )}
        
        <div className="flex justify-between items-end pt-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-white">${formatPrice(product.precio)}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">${formatPrice(product.precio_oferta)}</span>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-green-500 text-xs">
              <FaBolt />
              <span>{product.cantidad > 0 ? `${product.cantidad} en stock` : 'Agotado'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDos;