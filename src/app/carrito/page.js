"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaShoppingCart, 
  FaTrashAlt, 
  FaArrowLeft, 
  FaPlus, 
  FaMinus, 
  FaShieldAlt, 
  FaTruck, 
  FaLock, 
  FaCreditCard, 
  FaPaypal, 
  FaChevronRight 
} from 'react-icons/fa';

const CarritoPage = () => {
  // Estado para los productos en el carrito
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'ASUS ROG Strix G15',
      image: '/img/omenmax.png',
      price: 1299.99,
      quantity: 1,
      specs: 'Intel Core i7, RTX 3070, 16GB RAM, 1TB SSD',
      warranty: '2 años de garantía oficial'
    },
    {
      id: '2',
      name: 'MSI Katana GF66',
      image: '/img/omenmax.png',
      price: 999.99,
      quantity: 2,
      specs: 'Intel Core i5, RTX 3050 Ti, 16GB RAM, 512GB SSD',
      warranty: '1 año de garantía oficial'
    },
    {
      id: '3',
      name: 'Monitor ASUS ROG Swift 27"',
      image: '/img/omenmax.png',
      price: 549.99,
      quantity: 1,
      specs: '1440p, 165Hz, 1ms, G-Sync, HDR 600',
      warranty: '3 años de garantía oficial'
    }
  ]);

  // Estado para el cupón de descuento
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Estado para opciones de envío
  const [shippingOption, setShippingOption] = useState('free');

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

  // Función para aplicar cupón
  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'gaming10') {
      setCouponApplied(true);
      setCouponDiscount(0.1);
    }
  };

  // Cálculos de totales
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = couponApplied ? subtotal * couponDiscount : 0;
  const shippingCost = shippingOption === 'free' ? 0 : shippingOption === 'express' ? 15.99 : 9.99;
  const tax = (subtotal - discount) * 0.07; // 7% de impuesto ejemplo
  const total = subtotal - discount + shippingCost + tax;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header de la página */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-4 md:mb-0">
              <FaShoppingCart className="text-red-500" />
              <span>Mi <span className="text-red-500">Carrito</span> de Compras</span>
            </h1>
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors duration-300">
              <FaArrowLeft />
              <span>Continuar comprando</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-8xl text-gray-800 mb-6">
              <FaShoppingCart />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-400 text-center max-w-md mb-8">
              Parece que aún no has agregado productos a tu carrito. Descubre nuestras increíbles ofertas y encuentra el equipo gaming perfecto para ti.
            </p>
            <Link href="/productos" className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30">
              Ver productos destacados
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Lista de productos */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800/50 border-b border-gray-800 text-sm font-medium text-gray-400">
                  <div className="col-span-6">Producto</div>
                  <div className="col-span-2 text-center">Precio</div>
                  <div className="col-span-2 text-center">Cantidad</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                <div className="p-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-800 last:border-b-0">
                      {/* Producto e imagen */}
                      <div className="col-span-6 flex gap-4">
                        <div className="relative w-20 h-20 bg-gray-800/50 rounded-md overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            style={{ objectFit: 'contain' }}
                            className="p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm md:text-base">{item.name}</h3>
                          <p className="text-gray-400 text-xs mt-1">{item.specs}</p>
                          <p className="text-red-500 text-xs mt-1">{item.warranty}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-2 text-xs flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FaTrashAlt size={12} />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </div>

                      {/* Precio unitario */}
                      <div className="col-span-2 text-center">
                        <span className="text-white font-medium">${item.price.toFixed(2)}</span>
                      </div>

                      {/* Control de cantidad */}
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-l-md bg-gray-800 hover:bg-gray-700 text-white border-r border-gray-700"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="px-3 py-1 bg-gray-800 text-white font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-r-md bg-gray-800 hover:bg-gray-700 text-white border-l border-gray-700"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Precio total del item */}
                      <div className="col-span-2 text-center">
                        <span className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opciones de envío */}
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaTruck className="text-red-500" />
                  <span>Opciones de Envío</span>
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:border-red-500/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="free"
                        checked={shippingOption === 'free'}
                        onChange={() => setShippingOption('free')}
                        className="accent-red-500"
                      />
                      <div>
                        <p className="font-medium">Envío Estándar</p>
                        <p className="text-sm text-gray-400">Entrega en 3-5 días hábiles</p>
                      </div>
                    </div>
                    <span className="text-green-500 font-medium">Gratis</span>
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:border-red-500/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingOption === 'standard'}
                        onChange={() => setShippingOption('standard')}
                        className="accent-red-500"
                      />
                      <div>
                        <p className="font-medium">Envío Prioritario</p>
                        <p className="text-sm text-gray-400">Entrega en 2-3 días hábiles</p>
                      </div>
                    </div>
                    <span className="font-medium">$9.99</span>
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:border-red-500/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingOption === 'express'}
                        onChange={() => setShippingOption('express')}
                        className="accent-red-500"
                      />
                      <div>
                        <p className="font-medium">Envío Express</p>
                        <p className="text-sm text-gray-400">Entrega al día siguiente</p>
                      </div>
                    </div>
                    <span className="font-medium">$15.99</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Columna derecha - Resumen de la compra */}
            <div className="lg:col-span-1 space-y-6">
              {/* Cupón de descuento */}
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
                <h3 className="font-semibold mb-4">¿Tienes un cupón?</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Código promocional"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="px-4 py-2 flex-1 bg-gray-800 border border-gray-700 focus:border-red-500 rounded-l-lg focus:outline-none text-white"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-r-lg transition-colors duration-300"
                  >
                    Aplicar
                  </button>
                </div>
                {couponApplied && (
                  <div className="mt-3 text-sm text-green-500">
                    ¡Cupón aplicado! Descuento del 10% en tu compra.
                  </div>
                )}
              </div>

              {/* Resumen de la compra */}
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
                <h3 className="text-xl font-semibold mb-4">Resumen</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Descuento:</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Envío:</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-500">Gratis</span>
                    ) : (
                      <span className="text-white">${shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Impuestos:</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Botón de pago */}
                <button className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2">
                  <FaCreditCard />
                  <span>Proceder al pago</span>
                  <FaChevronRight size={12} />
                </button>

                {/* Métodos de pago */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <FaCreditCard className="text-gray-400" />
                  <FaPaypal className="text-gray-400" />
                  <div className="relative w-8 h-8">
                    <Image 
                      src="/logos/visa.png"
                      alt="Visa"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="relative w-8 h-8">
                    <Image 
                      src="/logos/mastercard.png"
                      alt="MasterCard"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>

              {/* Garantías y políticas */}
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaShieldAlt className="text-red-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Garantía de satisfacción</h4>
                      <p className="text-sm text-gray-400">30 días para devoluciones sin preguntas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaLock className="text-red-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Pago seguro</h4>
                      <p className="text-sm text-gray-400">Tus datos están protegidos con encriptación SSL</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaTruck className="text-red-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Envío asegurado</h4>
                      <p className="text-sm text-gray-400">Todos los envíos incluyen seguro de transporte</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarritoPage;