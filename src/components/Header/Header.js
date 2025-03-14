"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-transparent  absolute top-0 left-0 w-full  z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
        
        <nav className="hidden md:flex space-x-8">
          <Link className='hover:animate-pulse' href="/">
            <span className="text-white font-semibold text-lg hover:text-[#45ffff]">Inicio</span>
          </Link>
          <Link className='hover:animate-pulse' href="/">
            <span className="text-white font-semibold text-lg hover:text-[#45ffff]">Nosotros</span>
          </Link>
          <Link className='hover:animate-pulse' href="/">
            <span className="text-white font-semibold text-lg hover:text-[#45ffff]">Servicios</span>
          </Link>
          <Link className='hover:animate-pulse' href="/">
            <span className="text-white font-semibold text-lg hover:text-[#45ffff]">Contacto</span>
          </Link>
        </nav>
        <div className="text-2xl font-bold">
          <Link href="/">
            <span className='text-white'>Los Miserables</span>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black ">
          <nav className="px-2 pt-2 pb-4 space-y-1 animate-slide-in">
            <Link href="/">
              <span className="block animate-slide-one text-white hover:text-gray-300 transition duration-300 ease-in-out transform translate-x-0 delay-[100ms] border-b border-gray-300">Inicio</span>
            </Link>
            <Link href="/">
              <span className="block animate-slide-two pt-2 text-white hover:text-gray-300 transition duration-300 ease-in-out transform translate-x-0 delay-[200ms] border-b border-gray-300">Nosotros</span>
            </Link>
            <Link href="/">
              <span className="block animate-slide-three pt-2 text-white hover:text-gray-300 transition duration-300 ease-in-out transform translate-x-0 delay-[300ms] border-b border-gray-300">Servicios</span>
            </Link>
            <Link href="/">
              <span className="block animate-slide-four pt-2 text-white hover:text-gray-300 transition duration-300 ease-in-out transform translate-x-0 delay-[400ms] border-b border-gray-300">Contacto</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
