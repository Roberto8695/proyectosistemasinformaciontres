"use client";

import React, { useState } from 'react';
import { FaHome, FaBox, FaUsers, FaShoppingCart, FaTags, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import ProductoTable from './components/producto/productoTable';
import MarcaTable from './components/marca/marcaTable';

const Dashboard = () => {
  // Estado para controlar la sección activa
  const [activeSection, setActiveSection] = useState('overview');

  // Datos de ejemplo para el dashboard
  const dashboardData = {
    totalVentas: 12850.75,
    totalPedidos: 156,
    nuevosClientes: 28,
    productosAgotados: 5
  };

  // Datos de ejemplo para productos recientes
  const productosRecientes = [
    { id: 1, nombre: "RTX 4070 Ti", categoria: "GPU", precio: 899.99, stock: 12 },
    { id: 2, nombre: "Intel i9-13900K", categoria: "CPU", precio: 599.99, stock: 8 },
    { id: 3, nombre: "ASUS ROG Strix Z790", categoria: "Motherboard", precio: 429.99, stock: 15 },
    { id: 4, nombre: "Corsair 32GB DDR5", categoria: "RAM", precio: 189.99, stock: 20 },
  ];

  // Datos de ejemplo para ventas recientes
  const ventasRecientes = [
    { id: 101, cliente: "Carlos Mendoza", productos: 3, total: 1255.99, fecha: "2023-11-15", estado: "Completado" },
    { id: 102, cliente: "Ana García", productos: 1, total: 899.99, fecha: "2023-11-14", estado: "Enviado" },
    { id: 103, cliente: "Miguel Torres", productos: 5, total: 2450.50, fecha: "2023-11-13", estado: "Procesando" },
    { id: 104, cliente: "Laura Sánchez", productos: 2, total: 599.99, fecha: "2023-11-12", estado: "Completado" },
  ];

  // Renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Panel General</h2>
            
            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="Ventas Totales" 
                value={`$${dashboardData.totalVentas.toLocaleString()}`} 
                icon={<FaChartLine />} 
                color="from-blue-600 to-blue-400" 
              />
              <StatCard 
                title="Pedidos" 
                value={dashboardData.totalPedidos} 
                icon={<FaShoppingCart />} 
                color="from-green-600 to-green-400" 
              />
              <StatCard 
                title="Nuevos Clientes" 
                value={dashboardData.nuevosClientes} 
                icon={<FaUsers />} 
                color="from-purple-600 to-purple-400" 
              />
              <StatCard 
                title="Productos Agotados" 
                value={dashboardData.productosAgotados} 
                icon={<FaBox />} 
                color="from-red-600 to-red-400" 
              />
            </div>
            
            {/* Productos recientes */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Productos Recientes</h3>
                <button 
                  className="text-red-500 hover:text-red-400 text-sm font-medium"
                  onClick={() => setActiveSection('products')}
                >
                  Ver todos
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Producto</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Categoría</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Precio</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {productosRecientes.map((producto) => (
                      <tr key={producto.id} className="hover:bg-gray-800">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{producto.nombre}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{producto.categoria}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">${producto.precio}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            producto.stock > 10 ? 'bg-green-900 text-green-300' : 
                            producto.stock > 5 ? 'bg-yellow-900 text-yellow-300' : 
                            'bg-red-900 text-red-300'
                          }`}>
                            {producto.stock} unidades
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <button className="text-blue-500 hover:text-blue-400 mr-3">Editar</button>
                          <button className="text-red-500 hover:text-red-400">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Ventas recientes */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Ventas Recientes</h3>
                <button className="text-red-500 hover:text-red-400 text-sm font-medium">Ver todas</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cliente</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Productos</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {ventasRecientes.map((venta) => (
                      <tr key={venta.id} className="hover:bg-gray-800">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">#{venta.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{venta.cliente}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{venta.productos}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">${formatNumber(venta.total)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{venta.fecha}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            venta.estado === 'Completado' ? 'bg-green-900 text-green-300' : 
                            venta.estado === 'Enviado' ? 'bg-blue-900 text-blue-300' : 
                            'bg-yellow-900 text-yellow-300'
                          }`}>
                            {venta.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'products':
        return <ProductoTable />;
      case 'customers':
        return <h2 className="text-2xl font-bold text-white">Gestión de Clientes</h2>;
      case 'sales':
        return <h2 className="text-2xl font-bold text-white">Gestión de Ventas</h2>;
      case 'brands':
        return <MarcaTable />;
      case 'settings':
        return <h2 className="text-2xl font-bold text-white">Configuración</h2>;
      default:
        return <h2 className="text-2xl font-bold text-white">Panel General</h2>;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 shadow-lg">
        <div className="p-6 border-b border-gray-800">
        <div className="text-2xl font-ka1 font-bold">
          
            <span className='text-white'>Los <span className="text-red-500">Miserables</span></span>
          
        </div>
          <p className="text-sm text-gray-400 mt-1">Panel de Administración</p>
        </div>
        
        <nav className="mt-6 px-4">
          <SidebarLink 
            icon={<FaHome />} 
            text="Panel General" 
            active={activeSection === 'overview'} 
            onClick={() => setActiveSection('overview')} 
          />
          <SidebarLink 
            icon={<FaBox />} 
            text="Productos" 
            active={activeSection === 'products'} 
            onClick={() => setActiveSection('products')} 
          />
          <SidebarLink 
            icon={<FaUsers />} 
            text="Clientes" 
            active={activeSection === 'customers'} 
            onClick={() => setActiveSection('customers')} 
          />
          <SidebarLink 
            icon={<FaShoppingCart />} 
            text="Ventas" 
            active={activeSection === 'sales'} 
            onClick={() => setActiveSection('sales')} 
          />
          <SidebarLink 
            icon={<FaTags />} 
            text="Marcas" 
            active={activeSection === 'brands'} 
            onClick={() => setActiveSection('brands')} 
          />
          
          <div className="mt-8 pt-4 border-t border-gray-800">
            <SidebarLink 
              icon={<FaCog />} 
              text="Configuración" 
              active={activeSection === 'settings'} 
              onClick={() => setActiveSection('settings')} 
            />
            <SidebarLink 
              icon={<FaSignOutAlt />} 
              text="Cerrar Sesión" 
              onClick={() => console.log('Cerrar sesión')} 
            />
          </div>
        </nav>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-gray-900 shadow-md">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {activeSection === 'overview' && 'Panel General'}
              {activeSection === 'products' && 'Gestión de Productos'}
              {activeSection === 'customers' && 'Gestión de Clientes'}
              {activeSection === 'sales' && 'Gestión de Ventas'}
              {activeSection === 'brands' && 'Gestión de Marcas'}
              {activeSection === 'settings' && 'Configuración'}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="py-2 pl-10 pr-4 w-64 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center">
                <img 
                  src="/img/user.jpg" 
                  alt="Admin" 
                  className="h-8 w-8 rounded-full object-cover border-2 border-red-500" 
                />
                <span className="ml-2 text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Contenido principal */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Componente para los enlaces del sidebar
const SidebarLink = ({ icon, text, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-colors ${
        active ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
};

// Componente para las tarjetas de estadísticas
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-gradient-to-r ${color} rounded-xl p-6 shadow-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white text-opacity-80 text-sm font-medium">{title}</p>
          <h3 className="text-white text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-white bg-opacity-30 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

const formatNumber = (number) => {
  // Usar un formato que sea consistente independientemente de la configuración regional
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default Dashboard;
