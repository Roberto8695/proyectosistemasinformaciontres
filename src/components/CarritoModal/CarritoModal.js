"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  FaTimes, 
  FaTrashAlt, 
  FaShoppingCart, 
  FaCreditCard, 
  FaChevronRight, 
  FaPlus, 
  FaMinus 
} from 'react-icons/fa';
import Link from 'next/link';

const CarritoModal = ({ isOpen, onClose }) => {
  // Estado para la animación
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Datos de ejemplo para los productos en el carrito
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'ASUS ROG Strix G15',
      image: '/img/omenmax.png',
      price: 1299.99,
      quantity: 1,
      specs: 'Intel Core i7, RTX 3070, 16GB RAM'
    },
    {
      id: '2',
      name: 'MSI Katana GF66',
      image: '/img/omenmax.png',
      price: 999.99,
      quantity: 2,
      specs: 'Intel Core i5, RTX 3050 Ti, 16GB RAM'
    },
    {
      id: '3',
      name: 'Monitor ASUS ROG Swift 27"',
      image: '/img/omenmax.png',
      price: 549.99,
      quantity: 1,
      specs: '1440p, 165Hz, 1ms, G-Sync'
    }
  ]);
  
  // Efectos de animación
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);
  
  // Calcular total
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 0; // Envío gratis
  const total = subtotal + shipping;
  
  // Función para eliminar un producto
  const removeItem = (id) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };
  
  // Función para actualizar la cantidad de un producto
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      )
    );
  };
  
  // Si no está abierto, no renderizar nada
  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Overlay con efecto de desenfoque */}
      <div 
        className={`fixed  inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal del carrito */}
      <div 
        className={`fixed  top-0 right-0 bottom-0 w-full sm:w-96 md:w-[450px] bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full' 
        }`}
        onTransitionEnd={() => {
          if (!isOpen) setIsAnimating(false);
        }}
      >
        {/* Borde decorativo izquierdo */}
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-red-500 via-red-600 to-transparent"></div>
        
        {/* Cabecera */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-3 text-white">
            <FaShoppingCart className="text-red-500 text-xl" />
            <h2 className="text-xl font-bold">Mi Carrito</h2>
            <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaTimes />
          </button>
        </div>

        {/* Cuerpo - Lista de productos */}
        <div className="overflow-y-auto h-[calc(100%-180px)] p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-10">
              <div className="text-6xl text-gray-700 mb-4">
                <FaShoppingCart />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-500 max-w-[250px]">Parece que aún no has añadido productos a tu carrito</p>
              <button 
                onClick={onClose}
                className="mt-6 px-5 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-sm font-medium rounded-lg transition-all duration-300"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id} 
                className="group flex gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-red-500/30 transition-all duration-200"
              >
                {/* Imagen del producto */}
                <div className="relative w-20 h-20 bg-gray-900/50 rounded-md overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="p-1"
                  />
                </div>
                
                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {item.name}
                    </h3>
                    <span className="text-sm font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-400 truncate mt-1">
                    {item.specs}
                  </p>
                  
                  {/* Controles de cantidad */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-xs p-1 rounded-l-md bg-gray-700 hover:bg-gray-600 text-white"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="px-2 text-xs bg-gray-700 text-white">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-xs p-1 rounded-r-md bg-gray-700 hover:bg-gray-600 text-white"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                    
                    {/* Botón eliminar */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors duration-200"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pie - Resumen y botones */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-5">
            {/* Resumen de costos */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Envío:</span>
                <span className="text-green-500 font-medium">Gratis</span>
              </div>
              <div className="h-px bg-gray-800 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-300 font-medium">Total:</span>
                <span className="text-white font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="grid grid-cols-2 gap-3">
                <Link className='' href="/carrito">
              <button 
                className="py-2.5 px-14 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg border border-gray-700 transition-colors duration-200 flex items-center justify-center gap-1.5"
              >
                <FaShoppingCart size={14} />
                <span>Ver carrito</span>
              </button>
              </Link>
                <Link className='' href="/carrito">
              <button 
                className="py-2.5 px-16 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-1.5"
              >
                <FaCreditCard size={14} />
                <span>Pagar</span>
                <FaChevronRight size={10} />
              </button>
                </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarritoModal;