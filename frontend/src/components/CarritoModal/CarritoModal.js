"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTimes, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCarrito } from '../../actions/carritoActions';
import Link from 'next/link';

const CarritoModal = ({ isOpen, onClose }) => {
  const { 
    items, 
    loading, 
    error, 
    total, 
    cantidadTotal,
    actualizarCantidad, 
    eliminarProducto, 
    vaciarCarrito 
  } = useCarrito();

  // Formatear precio con separador de miles
  const formatPrice = (price) => {
    if (price === undefined || price === null) return '0.00';
    return Number(price).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Manejar cambio de cantidad
  const handleCantidadChange = async (detalleId, cantidad, currentCantidad) => {
    const nuevaCantidad = currentCantidad + cantidad;
    if (nuevaCantidad < 1) return;
    
    try {
      await actualizarCantidad(detalleId, nuevaCantidad);
    } catch (error) {
      // El error ya se maneja en el contexto
    }
  };

  // Manejar eliminación de producto
  const handleEliminarProducto = async (detalleId) => {
    try {
      await eliminarProducto(detalleId);
    } catch (error) {
      // El error ya se maneja en el contexto
    }
  };

  // Manejar vaciado del carrito
  const handleVaciarCarrito = async () => {
    try {
      await vaciarCarrito();
    } catch (error) {
      // El error ya se maneja en el contexto
    }
  };

  // URL base para imágenes
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center">
            <FaShoppingCart className="mr-2 text-red-500" />
            Carrito de Compras
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex flex-col h-[calc(100%-8rem)]">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center p-4 text-center">
              <div>
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
              <FaShoppingCart className="text-gray-700 text-6xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-400 mb-6">Añade algunos productos para comenzar a comprar</p>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id_detalle_carrito} 
                  className="flex bg-gray-800 rounded-lg overflow-hidden"
                >
                  {/* Imagen del producto */}
                  <div className="w-24 h-24 bg-gray-700 flex-shrink-0">
                    {item.imagen ? (
                      <img 
                        src={`${API_URL}${item.imagen}`}
                        alt={item.nombre}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  
                  {/* Información del producto */}
                  <div className="flex-1 p-3 flex flex-col">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-white line-clamp-1">{item.nombre}</h4>
                      <button 
                        onClick={() => handleEliminarProducto(item.id_detalle_carrito)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-2">
                      {item.marca_nombre || 'Sin marca'}
                    </p>
                    
                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleCantidadChange(item.id_detalle_carrito, -1, item.cantidad)}
                          className="p-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600"
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="text-white">{item.cantidad}</span>
                        <button 
                          onClick={() => handleCantidadChange(item.id_detalle_carrito, 1, item.cantidad)}
                          className="p-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          ${formatPrice(item.precio_unitario)} c/u
                        </p>
                        <p className="text-white font-medium">
                          ${formatPrice(item.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Subtotal ({cantidadTotal} productos):</span>
              <span className="text-xl font-bold text-white">${formatPrice(total)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleVaciarCarrito}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Vaciar carrito
              </button>
              <Link 
                href="/checkout"
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-center"
                onClick={onClose}
              >
                Proceder al pago
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarritoModal;