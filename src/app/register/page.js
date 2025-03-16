"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaDiscord, FaGamepad, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsSubscription, setNewsSubscription] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    console.log('Registro con:', formData, { acceptTerms, newsSubscription });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
        <Link 
        href="/" 
        className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white py-2 px-4 rounded-lg border border-gray-800 hover:border-red-500 transition-colors duration-300 group"
      >
        <FaArrowLeft className="text-red-500 group-hover:transform group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Volver al inicio</span>
      </Link>
      {/* Lado izquierdo - Formulario */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-black order-2 md:order-1">
        <div className="w-full max-w-md">
          {/* Logo móvil (visible solo en móviles) */}
          <div className="flex justify-center md:hidden mb-8">
            <div className="relative w-32 h-14">
              <Image
                src="/img/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Encabezado del formulario */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-red-500">Crear</span> Cuenta
            </h1>
            <p className="text-gray-400 mt-2">
              Únete a nuestra comunidad de gamers y disfruta de beneficios exclusivos
            </p>
          </div>

          {/* Contenedor del formulario con efecto de borde */}
          <div className="relative bg-gray-900/60 p-8 rounded-xl border border-gray-800">
            {/* Efecto de borde brillante */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 via-red-500/10 to-transparent rounded-xl blur-sm"></div>
            
            {/* Formulario real */}
            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              {/* Campo de nombre de usuario */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                  Nombre de usuario
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 bg-gray-800/70 text-white placeholder-gray-500 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors duration-200"
                    placeholder="GamerPro123"
                    required
                  />
                </div>
              </div>

              {/* Campo de email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                  Correo electrónico
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 bg-gray-800/70 text-white placeholder-gray-500 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors duration-200"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
              </div>

              {/* Campo de contraseña */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  Contraseña
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 bg-gray-800/70 text-white placeholder-gray-500 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors duration-200"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números
                </p>
              </div>

              {/* Campo de confirmar contraseña */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
                  Confirmar contraseña
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 bg-gray-800/70 text-white placeholder-gray-500 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors duration-200"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Aceptar términos y condiciones */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    required
                    className="w-4 h-4 accent-red-500 rounded focus:ring-red-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-400">
                    Acepto los <Link href="/terminos" className="text-red-500 hover:underline">términos y condiciones</Link> y la <Link href="/privacidad" className="text-red-500 hover:underline">política de privacidad</Link>
                  </label>
                </div>
              </div>

              {/* Suscripción a newsletter */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    type="checkbox"
                    checked={newsSubscription}
                    onChange={() => setNewsSubscription(!newsSubscription)}
                    className="w-4 h-4 accent-red-500 rounded focus:ring-red-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="text-gray-400">
                    Quiero recibir ofertas exclusivas, noticias y actualizaciones por correo electrónico
                  </label>
                </div>
              </div>

              {/* Botón de registro */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 mt-6"
              >
                <FaGamepad />
                <span>Crear cuenta</span>
              </button>

              {/* Separador */}
              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="px-4 text-sm text-gray-500">O regístrate con</span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              {/* Botones de redes sociales */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  type="button"
                  className="flex items-center justify-center py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors duration-200"
                >
                  <FaGoogle className="text-white/80" />
                </button>
                <button 
                  type="button"
                  className="flex items-center justify-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-blue-700 transition-colors duration-200"
                >
                  <FaFacebook className="text-white/80" />
                </button>
                <button 
                  type="button"
                  className="flex items-center justify-center py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg border border-indigo-700 transition-colors duration-200"
                >
                  <FaDiscord className="text-white/80" />
                </button>
              </div>
            </form>
          </div>

          {/* Enlace de inicio de sesión */}
          <p className="text-center mt-8 text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-red-500 hover:text-red-400 font-medium">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Lado derecho - Imagen y beneficios */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 relative order-1 md:order-2">
        <Image 
          src="/img/login-bg.jpg" 
          alt="Gaming Equipment" 
          fill
          className="object-cover opacity-70"
        />
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black/50 z-10"></div>
        
        {/* Contenido sobre la imagen */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-12">
          <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl max-w-lg border border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Beneficios de <span className="text-red-500">Unirse</span>
            </h2>
            
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <FaCheckCircle className="text-red-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Ofertas Exclusivas</h4>
                  <p className="text-gray-400 text-sm">Acceso anticipado a descuentos y promociones especiales solo para miembros.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <FaCheckCircle className="text-red-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Seguimiento de Pedidos</h4>
                  <p className="text-gray-400 text-sm">Visualiza el historial y estado de tus pedidos en tiempo real.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <FaCheckCircle className="text-red-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Programa de Recompensas</h4>
                  <p className="text-gray-400 text-sm">Gana puntos por cada compra que podrás canjear por descuentos.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <FaCheckCircle className="text-red-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Soporte Prioritario</h4>
                  <p className="text-gray-400 text-sm">Atención preferencial para cualquier consulta o problema técnico.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}