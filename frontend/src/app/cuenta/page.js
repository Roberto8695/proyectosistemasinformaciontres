"use client";

import React, { useState } from 'react';
import { FaUser, FaShoppingBag, FaHeart, FaAddressCard, FaKey, FaSignOutAlt, FaEdit, FaDownload } from 'react-icons/fa';

const CuentaPage = () => {
  // Estado para controlar la sección activa
  const [activeSection, setActiveSection] = useState('perfil');

  // Datos de ejemplo del usuario
  const userData = {
    nombre: "Carlos Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    telefono: "+34 612 345 678",
    fechaRegistro: "15/03/2023",
    direccion: {
      calle: "Calle Principal 123",
      ciudad: "Madrid",
      codigoPostal: "28001",
      pais: "España"
    }
  };

  // Datos de ejemplo de pedidos
  const pedidos = [
    { id: "ORD-2023-001", fecha: "10/11/2023", total: 1299.99, estado: "Entregado", productos: 3 },
    { id: "ORD-2023-002", fecha: "25/10/2023", total: 599.50, estado: "Enviado", productos: 2 },
    { id: "ORD-2023-003", fecha: "15/09/2023", total: 899.99, estado: "Entregado", productos: 1 },
    { id: "ORD-2023-004", fecha: "02/08/2023", total: 1450.75, estado: "Entregado", productos: 4 },
  ];

  // Datos de ejemplo de productos favoritos
  const favoritos = [
    { id: 1, nombre: "RTX 4080", precio: 1199.99, imagen: "/img/omenmax.png" },
    { id: 2, nombre: "Monitor ASUS ROG 27\"", precio: 349.99, imagen: "/img/omenmax.png" },
    { id: 3, nombre: "Teclado Mecánico Logitech", precio: 129.99, imagen: "/img/omenmax.png" },
  ];

  // Renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case 'perfil':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Mi Perfil</h2>
            
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-600 to-red-400 flex items-center justify-center text-white text-4xl font-bold mb-4 md:mb-0 md:mr-6">
                  {userData.nombre.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{userData.nombre}</h3>
                  <p className="text-gray-400">Cliente desde {userData.fechaRegistro}</p>
                  <button className="mt-2 flex items-center text-red-500 hover:text-red-400">
                    <FaEdit className="mr-1" /> Editar foto de perfil
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Información Personal</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Nombre completo</p>
                      <p className="text-white">{userData.nombre}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Correo electrónico</p>
                      <p className="text-white">{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Teléfono</p>
                      <p className="text-white">{userData.telefono}</p>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all flex items-center">
                    <FaEdit className="mr-2" /> Editar información
                  </button>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Dirección de Envío</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Dirección</p>
                      <p className="text-white">{userData.direccion.calle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Ciudad</p>
                      <p className="text-white">{userData.direccion.ciudad}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Código Postal</p>
                      <p className="text-white">{userData.direccion.codigoPostal}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">País</p>
                      <p className="text-white">{userData.direccion.pais}</p>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all flex items-center">
                    <FaEdit className="mr-2" /> Editar dirección
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'pedidos':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Mis Pedidos</h2>
            
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pedido</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Productos</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {pedidos.map((pedido) => (
                      <tr key={pedido.id} className="hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{pedido.id}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{pedido.fecha}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{pedido.productos}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">${pedido.total.toLocaleString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            pedido.estado === 'Entregado' ? 'bg-green-900 text-green-300' : 
                            pedido.estado === 'Enviado' ? 'bg-blue-900 text-blue-300' : 
                            'bg-yellow-900 text-yellow-300'
                          }`}>
                            {pedido.estado}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                          <button className="text-blue-500 hover:text-blue-400 mr-3 flex items-center">
                            <FaDownload className="mr-1" /> Factura
                          </button>
                          <button className="text-red-500 hover:text-red-400 mt-1 flex items-center">
                            Detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {pedidos.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No tienes pedidos realizados todavía.</p>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all">
                    Explorar productos
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'favoritos':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Mis Favoritos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritos.map((producto) => (
                <div key={producto.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <div className="h-48 bg-gray-800 flex items-center justify-center">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x200?text=Producto";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white">{producto.nombre}</h3>
                    <p className="text-red-500 font-bold mt-1">${producto.precio.toLocaleString()}</p>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all text-sm">
                        Añadir al carrito
                      </button>
                      <button className="px-3 py-2 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-all text-sm">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {favoritos.length === 0 && (
              <div className="text-center py-8 bg-gray-900 rounded-xl p-6 shadow-lg">
                <p className="text-gray-400">No tienes productos favoritos guardados.</p>
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all">
                  Explorar productos
                </button>
              </div>
            )}
          </div>
        );
      case 'direcciones':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Mis Direcciones</h2>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all text-sm">
                Añadir nueva dirección
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-red-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-2 py-1 bg-red-900 text-red-300 text-xs rounded-full">Principal</span>
                    <h3 className="text-lg font-semibold text-white mt-2">Casa</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-400">
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p>{userData.nombre}</p>
                  <p>{userData.direccion.calle}</p>
                  <p>{userData.direccion.ciudad}, {userData.direccion.codigoPostal}</p>
                  <p>{userData.direccion.pais}</p>
                  <p className="text-gray-400 mt-2">{userData.telefono}</p>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Oficina</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-400">
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p>{userData.nombre}</p>
                  <p>Avenida Empresarial 45, Piso 3</p>
                  <p>Madrid, 28002</p>
                  <p>España</p>
                  <p className="text-gray-400 mt-2">+34 912 345 678</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="text-sm text-red-500 hover:text-red-400">Eliminar</button>
                  <button className="text-sm text-blue-500 hover:text-blue-400">Establecer como principal</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'seguridad':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Seguridad</h2>
            
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Cambiar Contraseña</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-400 mb-1">
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-400 mb-1">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-400 mb-1">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all"
                >
                  Actualizar contraseña
                </button>
              </form>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Sesiones Activas</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-900 text-green-300 rounded-full mr-4">
                      <FaUser />
                    </div>
                    <div>
                      <p className="text-white font-medium">Este dispositivo</p>
                      <p className="text-sm text-gray-400">Madrid, España • Hace 2 minutos</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full">Activo</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-700 text-gray-300 rounded-full mr-4">
                      <FaUser />
                    </div>
                    <div>
                      <p className="text-white font-medium">iPhone 13</p>
                      <p className="text-sm text-gray-400">Barcelona, España • Hace 2 días</p>
                    </div>
                  </div>
                  <button className="text-red-500 hover:text-red-400 text-sm">Cerrar sesión</button>
                </div>
              </div>
              
              <button className="mt-4 text-red-500 hover:text-red-400 text-sm font-medium">
                Cerrar todas las sesiones
              </button>
            </div>
          </div>
        );
      default:
        return <h2 className="text-2xl font-bold text-white">Mi Perfil</h2>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-red-500">Mi Cuenta</h1>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-900 rounded-xl shadow-lg p-6 h-fit">
            <nav className="space-y-2">
              <SidebarLink 
                icon={<FaUser />} 
                text="Mi Perfil" 
                active={activeSection === 'perfil'} 
                onClick={() => setActiveSection('perfil')} 
              />
              <SidebarLink 
                icon={<FaShoppingBag />} 
                text="Mis Pedidos" 
                active={activeSection === 'pedidos'} 
                onClick={() => setActiveSection('pedidos')} 
              />
              <SidebarLink 
                icon={<FaHeart />} 
                text="Mis Favoritos" 
                active={activeSection === 'favoritos'} 
                onClick={() => setActiveSection('favoritos')} 
              />
              <SidebarLink 
                icon={<FaAddressCard />} 
                text="Mis Direcciones" 
                active={activeSection === 'direcciones'} 
                onClick={() => setActiveSection('direcciones')} 
              />
              <SidebarLink 
                icon={<FaKey />} 
                text="Seguridad" 
                active={activeSection === 'seguridad'} 
                onClick={() => setActiveSection('seguridad')} 
              />
              <SidebarLink 
                icon={<FaSignOutAlt />} 
                text="Cerrar Sesión" 
                onClick={() => console.log('Cerrar sesión')} 
              />
            </nav>
          </div>
          
          {/* Contenido principal */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para los enlaces del sidebar
const SidebarLink = ({ icon, text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default CuentaPage;
