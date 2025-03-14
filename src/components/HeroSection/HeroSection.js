"use client";

import React from 'react';
import { ReactTyped } from "react-typed";
import ParticlesBackground from '../ParticlesBg/ParticlesBackground';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, SpotLight } from '@react-three/drei';
import AnimaLaptop from '../Animations/AnimaLaptop';
import './HeroSection.css'; // Importa tu CSS personalizado

const HeroSection = () => {
  return (
    <section className="relative bg-black bg-cover bg-center h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Fondo de partículas */}
      <ParticlesBackground />

      {/* Overlay (opcional) */}
      <div className="absolute inset-0"></div>

      {/* Contenedor principal */}
      <div className="container mx-auto px-4 text-center relative flex flex-col md:flex-row items-center justify-between">
        {/* Texto del Hero */}
        <div className="text-left z-10 md:w-1/2">
          <h1 className="select-none text-4xl animate-slide-four md:text-6xl font-bold text-white mb-4">
            <ReactTyped
              strings={['Transforma tu Visión en Realidad Digital']}
              typeSpeed={50}
              backSpeed={50}
              loop={false}
            />
          </h1>

          <p className="select-none text-lg animate-slide-four md:text-ms text-white mb-8">
            ¿Listo para llevar tu presencia en línea al siguiente nivel? Como desarrollador web especializado, creo sitios web a medida que no solo son visualmente impactantes, sino también funcionales y optimizados para resultados. ¡Hagamos que tu proyecto cobre vida! Contáctame hoy y comencemos a construir algo extraordinario.
          </p>

          <button className="bg-red-600 animate-slide-four text-white py-2 px-6 rounded-full text-lg md:text-xl hover:bg-red-700 transition duration-300 select-none">
            Contáctame
          </button>
        </div>
      </div>

      {/* Sección del Modelo 3D sin contenedor */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 h-full flex items-center justify-center z-999">
        <Canvas   style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 45 }} >
          {/* Luces de la escena */}
          <ambientLight  intensity={0.5} />
          <directionalLight
            intensity={10}
            position={[3, 8, 2]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <SpotLight
            position={[0, 3.5, 0]}
            angle={0.3}
            penumbra={2}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Modelo 3D Animado */}
          <AnimaLaptop  />

          {/* Controles de cámara */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={true} 
            autoRotateSpeed={1} // puedes ajustar la velocidad
          />
        </Canvas>
      </div>

      {/* Icono de scroll */}
      <div className="absolute bottom-10 animate-bounce">
        <a href='#mvvsection'>
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a> 
      </div>
    </section>
  );
};

export default HeroSection;
