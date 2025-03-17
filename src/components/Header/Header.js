"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Simulación de la cantidad de productos en el carrito (esto deberías reemplazarlo con tu lógica real)
  const [cartItemCount, setCartItemCount] = useState(3);
  
  // Determinar si estamos en una página interna (no homepage)
  const isInternalPage = pathname !== '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`${isInternalPage ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent absolute'} top-0 left-0 w-full z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <nav className="hidden md:flex space-x-8">
          <Link className='hover:animate-pulse' href="/">
            <span className={`text-white font-designer text-lg hover:text-red-500 transition-colors ${pathname === '/' ? 'text-red-500' : ''}`}>Inicio</span>
          </Link>
          <Link className='hover:animate-pulse' href="/catalogo">
            <span className={`text-white font-designer text-lg hover:text-red-500 transition-colors ${pathname === '/catalogo' ? 'text-red-500' : ''}`}>Catálogo</span>
          </Link>
          <Link className='hover:animate-pulse' href="/contacto">
            <span className={`text-white font-designer text-lg hover:text-red-500 transition-colors ${pathname === '/contacto' ? 'text-red-500' : ''}`}>Contacto</span>
          </Link>
        </nav>
        
        <div className="text-2xl font-ka1 font-bold">
          <Link href="/">
            <span className='text-white'>Los <span className="text-red-500">Miserables</span></span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {/* Botón de inicio de sesión */}
          <Link href="/login" className="text-white font-designer hover:text-red-500 transition-colors flex items-center space-x-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>Iniciar Sesión</span>
          </Link>
          
          {/* Icono de carrito con contador */}
          <Link href="/carrito" className="text-white hover:text-red-500 transition-colors relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
        
        <div className="md:hidden flex items-center space-x-4">
          {/* Icono de carrito móvil */}
          <Link href="/carrito" className="text-white hover:text-red-500 transition-colors relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          {/* Botón de menú móvil */}
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
          <nav className="px-4 pt-2 pb-4 space-y-1 animate-slide-in">
            <Link href="/">
              <span className={`block animate-slide-one font-designer py-3 text-white hover:text-red-500 transition-colors ${pathname === '/' ? 'text-red-500' : ''} border-b border-gray-800`}>Inicio</span>
            </Link>
            <Link href="/catalogo">
              <span className={`block animate-slide-two font-designer py-3 text-white hover:text-red-500 transition-colors ${pathname === '/catalogo' ? 'text-red-500' : ''} border-b border-gray-800`}>Catálogo</span>
            </Link>
            <Link href="/contacto">
              <span className={`block animate-slide-three font-designer py-3 text-white hover:text-red-500 transition-colors ${pathname === '/contacto' ? 'text-red-500' : ''} border-b border-gray-800`}>Contacto</span>
            </Link>
            <Link href="/login">
              <span className={`block animate-slide-four font-designer py-3 text-white hover:text-red-500 transition-colors ${pathname === '/login' ? 'text-red-500' : ''} border-b border-gray-800`}>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span>Iniciar Sesión</span>
                </div>
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;