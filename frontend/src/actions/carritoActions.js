"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

// Proveedor del contexto del carrito
export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [carritoId, setCarritoId] = useState(null);

  // Inicializar el carrito al cargar la página
  useEffect(() => {
    const initCarrito = async () => {
      // Intentar obtener el ID del carrito del localStorage
      const storedCarritoId = localStorage.getItem('carritoId');
      
      if (storedCarritoId) {
        setCarritoId(parseInt(storedCarritoId));
        await cargarItemsCarrito(parseInt(storedCarritoId));
      } else {
        // Si no hay ID de carrito, crear uno nuevo
        await crearNuevoCarrito();
      }
    };
    
    initCarrito();
  }, []);

  // Crear un nuevo carrito
  const crearNuevoCarrito = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post('/carritos', {
        // Puedes incluir datos adicionales como el ID del usuario si está autenticado
      });
      
      const nuevoCarritoId = response.data.id_carrito;
      setCarritoId(nuevoCarritoId);
      localStorage.setItem('carritoId', nuevoCarritoId.toString());
      
      setItems([]);
      setTotal(0);
      setError(null);
    } catch (err) {
      console.error('Error al crear nuevo carrito:', err);
      setError('No se pudo crear un nuevo carrito');
    } finally {
      setLoading(false);
    }
  };

  // Cargar los items del carrito desde la API
  const cargarItemsCarrito = async (id) => {
    if (!id) return;
    
    try {
      setLoading(true);
      const response = await apiClient.get(`/detalles/carrito/${id}`);
      setItems(response.data);
      
      // Calcular el total
      const totalResponse = await apiClient.get(`/detalles/carrito/${id}/total`);
      setTotal(totalResponse.data.total || 0);
      
      setError(null);
    } catch (err) {
      console.error('Error al cargar items del carrito:', err);
      setError('No se pudieron cargar los productos del carrito');
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Añadir un producto al carrito
  const agregarProducto = async (producto, cantidad = 1) => {
    if (!carritoId) return;
    
    try {
      setLoading(true);
      const response = await apiClient.post('/detalles', {
        id_carrito: carritoId,
        id_producto: producto.id_producto,
        cantidad
      });
      
      // Actualizar los items del carrito
      await cargarItemsCarrito(carritoId);
      
      return response.data;
    } catch (err) {
      console.error('Error al agregar producto al carrito:', err);
      setError(err.response?.data?.error || 'No se pudo agregar el producto al carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = async (detalleId, cantidad) => {
    if (!carritoId) return;
    
    try {
      setLoading(true);
      const response = await apiClient.put(`/detalles/${detalleId}`, {
        cantidad
      });
      
      // Actualizar los items del carrito
      await cargarItemsCarrito(carritoId);
      
      return response.data;
    } catch (err) {
      console.error('Error al actualizar cantidad del producto:', err);
      setError(err.response?.data?.error || 'No se pudo actualizar la cantidad del producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un producto del carrito
  const eliminarProducto = async (detalleId) => {
    if (!carritoId) return;
    
    try {
      setLoading(true);
      const response = await apiClient.delete(`/detalles/${detalleId}`);
      
      // Actualizar los items del carrito
      await cargarItemsCarrito(carritoId);
      
      return response.data;
    } catch (err) {
      console.error('Error al eliminar producto del carrito:', err);
      setError('No se pudo eliminar el producto del carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Vaciar el carrito
  const vaciarCarrito = async () => {
    if (!carritoId) return;
    
    try {
      setLoading(true);
      const response = await apiClient.delete(`/detalles/carrito/${carritoId}`);
      
      setItems([]);
      setTotal(0);
      
      return response.data;
    } catch (err) {
      console.error('Error al vaciar el carrito:', err);
      setError('No se pudo vaciar el carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Calcular el número total de items en el carrito
  const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

  // Valor del contexto
  const value = {
    items,
    loading,
    error,
    total,
    cantidadTotal,
    carritoId,
    agregarProducto,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
    cargarItemsCarrito
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};
